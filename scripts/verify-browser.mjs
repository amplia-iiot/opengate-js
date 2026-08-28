#!/usr/bin/env node
/**
 * Drives test/browser/transport-checks.js inside a real browser engine.
 *
 *   yarn verify:browser                      # real Chrome, the build in dist/
 *   OGAPI_BROWSER=obscura yarn verify:browser
 *   OGAPI_BUNDLE=/path/to/other-bundle.js yarn verify:browser
 *
 * Serves the built IIFE bundle, the checks and a set of local fixture endpoints from a single
 * origin, so multipart uploads, binary bodies, slow responses and header echoes can all be
 * exercised without writing anything to a real platform. The four checks that talk to OpenGate run
 * only when OGAPI_URL, OGAPI_USER, OGAPI_PASSWORD and OGAPI_ORG are set, and they are reads.
 *
 * `OGAPI_BUNDLE` is what makes this useful beyond a pass or fail: point it at a bundle built from
 * the previous revision and compare, in the same engine. A check that fails on both is a limit of
 * the engine, not a regression. Measured this way, Obscura 0.2.1 emits no XHR progress events and
 * lightpanda emits no upload ones, while real Chrome does.
 *
 * Needs puppeteer-core, which lives in ~/.local/share/lightpanda-driver rather than in this
 * repository, and either Chrome on PATH or the named engine serving CDP.
 */
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BROWSER = process.env.OGAPI_BROWSER || 'chrome';
const DRIVER = process.env.OGAPI_DRIVER || path.join(process.env.HOME, '.local', 'share', 'lightpanda-driver');
const PORT = Number(process.env.OGAPI_VERIFY_PORT || 8793);
const CDP_PORT = Number(process.env.OGAPI_VERIFY_CDP_PORT || 9333);
const CHROME = process.env.OGAPI_CHROME || '/usr/bin/google-chrome';

const config = {
    url: process.env.OGAPI_URL || null,
    user: process.env.OGAPI_USER || null,
    password: process.env.OGAPI_PASSWORD || null,
    organization: process.env.OGAPI_ORG || null,
    local: `http://127.0.0.1:${PORT}`
};

const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
const bundle = process.env.OGAPI_BUNDLE || path.join(root, 'dist', `opengate-api-bower-${pkg.version}.js`);
if (!existsSync(bundle)) {
    console.error(`${bundle} is missing. Run yarn build first.`);
    process.exit(2);
}

const page = `<!doctype html>
<html><head><meta charset="utf-8"><title>opengate-js transport verification</title></head>
<body><script src="./bundle.js"></script><script src="./checks.js"></script></body></html>`;

/** The local fixtures. Everything here is served from the page's own origin. */
function fixture(req, res, url) {
    const route = url.pathname.replace(/^\/fixture\//, '');
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
        const body = Buffer.concat(chunks);
        if (route === 'json') {
            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ hello: 'world' }));
        } else if (route === 'echo-headers') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(req.headers));
        } else if (route === 'created') {
            res.writeHead(201, { Location: '/thing/7' });
            res.end();
        } else if (route === 'missing') {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ errors: [{ code: 404, message: 'not found' }] }));
        } else if (route === 'binary') {
            res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
            res.end(Buffer.from([1, 2, 3, 4]));
        } else if (route === 'slow') {
            setTimeout(() => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end('{}');
            }, 4000);
        } else if (route === 'echo-upload') {
            const contentType = req.headers['content-type'] || '';
            const parts = (body.toString('latin1').match(/content-disposition/gi) || []).length;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ bytes: body.length, parts: parts, multipart: contentType.indexOf('multipart/form-data') === 0 }));
        } else {
            res.writeHead(418);
            res.end();
        }
    });
}

const server = createServer(async (req, res) => {
    const url = new URL(req.url, config.local);
    if (url.pathname.startsWith('/fixture/')) return void fixture(req, res, url);
    if (url.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return void res.end(page);
    }
    if (url.pathname === '/bundle.js') {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        return void res.end(await readFile(bundle));
    }
    if (url.pathname === '/checks.js') {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        return void res.end(await readFile(path.join(root, 'test', 'browser', 'transport-checks.js')));
    }
    res.writeHead(404);
    res.end();
});
await new Promise(resolve => server.listen(PORT, '127.0.0.1', resolve));

const isChrome = BROWSER === 'chrome';
let browser = null;
let stderr = '';
if (!isChrome) {
    const args =
        BROWSER === 'obscura'
            ? ['--allow-private-network', 'serve', '--host', '127.0.0.1', '--port', String(CDP_PORT)]
            : ['serve', '--host', '127.0.0.1', '--port', String(CDP_PORT)];
    browser = spawn(BROWSER, args, { env: { ...process.env, LIGHTPANDA_DISABLE_TELEMETRY: 'true' }, stdio: ['ignore', 'pipe', 'pipe'] });
    browser.stderr.on('data', d => (stderr += d));
    browser.stdout.on('data', d => (stderr += d));
}

let launched = null;
let profileDir = null;
const stop = () => {
    try {
        if (launched) launched.process().kill('SIGKILL');
        if (browser) browser.kill('SIGKILL');
    } catch {
        /* already gone */
    }
    server.close();
    if (profileDir) rm(profileDir, { recursive: true, force: true }).catch(() => {});
};

try {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const driverRequire = createRequire(path.join(DRIVER, 'noop.js'));
    const { default: puppeteer } = await import(pathToFileURL(driverRequire.resolve('puppeteer-core')).href);
    let conn;
    if (isChrome) {
        // --disable-web-security only so the page may call the real platform cross-origin. It is a
        // property of this harness, not of the library: the GUI is served from the platform's own
        // origin and needs no such thing.
        profileDir = await mkdtemp(path.join(tmpdir(), 'ogapi-verify-'));
        launched = await puppeteer.launch({
            executablePath: CHROME,
            headless: 'shell',
            args: ['--disable-web-security', '--no-sandbox', `--user-data-dir=${profileDir}`]
        });
        conn = launched;
    } else {
        conn = await puppeteer.connect({ browserWSEndpoint: `ws://127.0.0.1:${CDP_PORT}` });
    }
    const tab = await conn.newPage();
    tab.on('pageerror', e => console.error('[pageerror]', e.message));
    tab.on('console', m => process.env.VERBOSE && console.error('[console]', m.text()));

    await tab.goto(`${config.local}/`, { waitUntil: 'load' });

    const outcome = await tab.evaluate(async cfg => {
        if (typeof window.OpenGateAPI !== 'function') return { error: 'window.OpenGateAPI is not a function' };
        if (typeof window.__ogapiTransportChecks !== 'function') return { error: 'the checks did not load' };
        return await window.__ogapiTransportChecks(window.OpenGateAPI, cfg);
    }, config);

    if (isChrome) await conn.close();
    else await conn.disconnect();

    if (outcome.error) {
        console.error('could not run: ' + outcome.error);
        if (stderr) console.error(BROWSER + ' said:', stderr.slice(0, 600));
        stop();
        process.exit(1);
    }

    console.log(`\nopengate-js transport verification — ${BROWSER} — ${path.basename(bundle)}\n`);
    if (outcome.userAgent) console.log(`  ${outcome.userAgent}\n`);
    for (const r of outcome.results) {
        console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${String(r.ms).padStart(5)}ms  ${r.name}`);
        console.log(`        ${r.detail}`);
    }
    const failed = outcome.results.filter(r => !r.ok).length;
    console.log(`\n${outcome.results.length - failed}/${outcome.results.length} checks passed\n`);
    stop();
    process.exit(failed ? 1 : 0);
} catch (error) {
    console.error('failed to run:', error.message);
    if (stderr) console.error(BROWSER + ' said:', stderr.slice(0, 800));
    stop();
    process.exit(1);
}
