#!/usr/bin/env node
/**
 * Serves test/e2e/index.html and drives it through a real browser engine.
 *
 *   yarn e2e:coverage                                  # real Chrome, headless, logs in for a JWT
 *   OGAPI_AUTH=apikey yarn e2e:coverage                # the same run with X-ApiKey instead
 *   OGAPI_BROWSER=obscura yarn e2e:coverage
 *   OGAPI_E2E_SERVE=1 yarn e2e:coverage                # just serve it; open the URL yourself
 *
 * The page is the deliverable: it renders the whole coverage matrix, and it works when opened by
 * hand in any browser, because the platform sends `access-control-allow-origin: *`. This script
 * exists so the same page can also gate a release without anybody clicking anything.
 *
 * The target comes from OGAPI_URL / OGAPI_USER / OGAPI_PASSWORD / OGAPI_ORG and is handed to the
 * page over a loopback-only `/config` endpoint, so credentials never enter the HTML, the repository
 * or a command line the page can read.
 *
 * After the browser run it runs the **same suite under Node** and compares. That comparison is the
 * point: a check that passes in Node and is blocked in the browser is the environment -- several
 * OpenGate service paths answer the CORS preflight with 401/403, which no browser can get past and
 * Node never asks. A check that fails in both is the library or the platform, and that is the column
 * worth reading. Skip it with OGAPI_E2E_NO_NODE=1.
 *
 * Writes are off unless OGAPI_ALLOW_WRITES=1. Read the write lane in
 * test/e2e/coverage-checks.js before turning it on: it creates, updates and deletes one Area. The
 * Node cross-check never writes, whatever that flag says.
 */
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BROWSER = process.env.OGAPI_BROWSER || 'chrome';
const CHROME = process.env.OGAPI_CHROME || '/usr/bin/google-chrome';
const DRIVER = process.env.OGAPI_DRIVER || path.join(process.env.HOME, '.local', 'share', 'lightpanda-driver');
const PORT = Number(process.env.OGAPI_E2E_PORT || 8801);
const CDP_PORT = Number(process.env.OGAPI_E2E_CDP_PORT || 9401);
const SERVE_ONLY = process.env.OGAPI_E2E_SERVE === '1';

const config = {
    url: process.env.OGAPI_URL || '',
    user: process.env.OGAPI_USER || '',
    password: process.env.OGAPI_PASSWORD || '',
    organization: process.env.OGAPI_ORG || '',
    delayMs: Number(process.env.OGAPI_E2E_DELAY || 30),
    allowWrites: process.env.OGAPI_ALLOW_WRITES === '1',
    // 'jwt' logs in and sends Authorization: Bearer, which is what a browser application does.
    // 'apikey' sends X-ApiKey instead; the two are not interchangeable on this platform.
    authMode: process.env.OGAPI_AUTH === 'apikey' ? 'apikey' : 'jwt'
};

const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
const bundle = process.env.OGAPI_BUNDLE || path.join(root, 'dist', `opengate-api-bower-${pkg.version}.js`);
if (!existsSync(bundle)) {
    console.error(`${path.relative(root, bundle)} is missing. Run \`yarn build\` first.`);
    process.exit(2);
}

const FILES = {
    '/': { file: path.join(root, 'test', 'e2e', 'index.html'), type: 'text/html; charset=utf-8' },
    '/bundle.js': { file: bundle, type: 'application/javascript' },
    '/coverage-checks.js': { file: path.join(root, 'test', 'e2e', 'coverage-checks.js'), type: 'application/javascript' }
};

const server = createServer(async (req, res) => {
    const route = req.url.split('?')[0];
    if (route === '/config') {
        // Loopback only: the page is served from here and nothing else should be asking.
        const from = req.socket.remoteAddress || '';
        if (!from.includes('127.0.0.1') && !from.includes('::1')) {
            res.writeHead(403);
            return void res.end();
        }
        res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
        return void res.end(JSON.stringify(config));
    }
    const entry = FILES[route];
    if (!entry) {
        res.writeHead(404);
        return void res.end();
    }
    res.writeHead(200, { 'Content-Type': entry.type, 'Cache-Control': 'no-store' });
    res.end(await readFile(entry.file));
});
await new Promise(resolve => server.listen(PORT, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${PORT}`;

if (SERVE_ONLY) {
    console.log(`\nopengate-js coverage page: ${origin}\n`);
    console.log(`  bundle:  ${path.relative(root, bundle)}`);
    console.log(`  target:  ${config.url || '(not configured — fill the form in)'}`);
    console.log(`  writes:  ${config.allowWrites ? 'ENABLED' : 'off'}\n`);
    console.log('Ctrl-C to stop.\n');
} else {
    await drive();
}

async function drive() {
    let engine = null;
    let launched = null;
    let profile = null;
    let log = '';

    if (BROWSER !== 'chrome') {
        const args =
            BROWSER === 'obscura'
                ? ['--allow-private-network', 'serve', '--host', '127.0.0.1', '--port', String(CDP_PORT)]
                : ['serve', '--host', '127.0.0.1', '--port', String(CDP_PORT)];
        engine = spawn(BROWSER, args, { env: { ...process.env, LIGHTPANDA_DISABLE_TELEMETRY: 'true' }, stdio: ['ignore', 'pipe', 'pipe'] });
        engine.stderr.on('data', d => (log += d));
        engine.stdout.on('data', d => (log += d));
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    const stop = () => {
        try {
            if (launched) launched.close();
            if (engine) engine.kill('SIGKILL');
        } catch {
            /* already gone */
        }
        server.close();
        if (profile) rm(profile, { recursive: true, force: true }).catch(() => {});
    };

    try {
        const driverRequire = createRequire(path.join(DRIVER, 'noop.js'));
        const { default: puppeteer } = await import(pathToFileURL(driverRequire.resolve('puppeteer-core')).href);

        let conn;
        if (BROWSER === 'chrome') {
            profile = await mkdtemp(path.join(tmpdir(), 'ogapi-e2e-'));
            // No --disable-web-security: the platform sends access-control-allow-origin, so the page
            // reaches it the same way a real application would.
            launched = await puppeteer.launch({
                executablePath: CHROME,
                headless: 'shell',
                args: ['--no-sandbox', `--user-data-dir=${profile}`]
            });
            conn = launched;
        } else {
            conn = await puppeteer.connect({ browserWSEndpoint: `ws://127.0.0.1:${CDP_PORT}` });
        }

        const tab = await conn.newPage();
        tab.on('pageerror', e => console.error('[pageerror]', e.message));
        tab.on('console', m => process.env.VERBOSE && console.error('[console]', m.text()));
        await tab.goto(`${origin}/`, { waitUntil: 'load' });

        const outcome = await tab.evaluate(async cfg => {
            if (typeof window.OpenGateAPI !== 'function') return { error: 'window.OpenGateAPI is not a function' };
            if (typeof window.__ogapiRun !== 'function') return { error: 'the page did not initialise' };
            return await window.__ogapiRun(cfg);
        }, config);

        if (launched) await conn.close();
        else await conn.disconnect();
        launched = null;

        report(outcome, log);

        let node = null;
        if (!outcome.error && process.env.OGAPI_E2E_NO_NODE !== '1') {
            node = await runUnderNode();
            compare(outcome, node);
        }

        stop();
        const failed = tally(outcome).fail || (node ? tally(node).fail : 0);
        process.exit(outcome.error || failed ? 1 : 0);
    } catch (error) {
        console.error('the run failed:', error.message);
        if (log) console.error(`${BROWSER} said:`, log.slice(0, 600));
        stop();
        process.exit(1);
    }
}

/**
 * Runs the identical suite under Node, against the CommonJS bundle. Writes stay off here whatever
 * the flag says: one write lane per run is enough, and the browser is the one being proven.
 * @return {Promise<?object>}
 */
async function runUnderNode() {
    const npmBundle = path.join(root, 'dist', 'opengate-api-npm.js');
    if (!existsSync(npmBundle)) return null;
    const require = createRequire(import.meta.url);
    const OpenGateAPI = require(npmBundle);
    const suite = require(path.join(root, 'test', 'e2e', 'coverage-checks.js'));
    return suite.run(OpenGateAPI.default || OpenGateAPI, { ...config, allowWrites: false });
}

/**
 * Lines up the two runs check by check and reports only where they disagree.
 * @param {!object} browser
 * @param {?object} node
 */
function compare(browser, node) {
    if (!node) return;
    const key = row => `${row.lane}|${row.name}|${row.detail}`;
    const inNode = new Map(node.results.map(row => [key(row), row]));

    const rows = [];
    for (const row of browser.results) {
        const other = inNode.get(key(row));
        if (!other || other.outcome === row.outcome) continue;
        rows.push({ name: `${row.name} ${row.detail}`, browser: row.outcome, node: other.outcome, note: row.note });
    }

    console.log(`  ── the same suite under Node: ${node.results.length} checks, ${node.requests} HTTP requests ──`);
    const nodeCounts = tally(node);
    console.log(
        '  ' +
            ['pass', 'empty', 'denied', 'absent', 'blocked', 'fail', 'skip']
                .filter(k => nodeCounts[k])
                .map(k => `${k}: ${nodeCounts[k]}`)
                .join('   ')
    );

    if (!rows.length) {
        console.log('\n  the two runtimes agree on every check\n');
        return;
    }
    console.log(`\n  ${rows.length} check(s) where the runtimes disagree:\n`);
    for (const r of rows) {
        const label = r.name.length > 62 ? r.name.slice(0, 61) + '…' : r.name;
        console.log(`  browser ${r.browser.padEnd(8)} node ${r.node.padEnd(8)} ${label}`);
    }
    const envOnly = rows.filter(r => r.browser === 'blocked' && r.node !== 'blocked' && r.node !== 'fail');
    if (envOnly.length) {
        console.log(
            `\n  ${envOnly.length} of those are blocked in the browser and fine under Node: the library composes the\n` +
                '  call correctly and the browser never sends it. Check the CORS preflight on those paths.\n'
        );
    }
}

function tally(outcome) {
    return (outcome.results || []).reduce((acc, r) => ((acc[r.outcome] = (acc[r.outcome] || 0) + 1), acc), {});
}

function report(outcome, log) {
    if (outcome.error) {
        console.error('could not run: ' + outcome.error);
        if (log) console.error(log.slice(0, 600));
        return;
    }
    const counts = tally(outcome);
    console.log(`\nopengate-js API coverage — ${BROWSER} — ${outcome.runtime} — ${config.url}`);
    console.log(
        `  credential: ${outcome.authMode === 'apikey' ? 'X-ApiKey' : 'Authorization: Bearer <jwt>, from usersBuilder().login()'}\n`
    );

    const byLane = {};
    for (const r of outcome.results) (byLane[r.lane] = byLane[r.lane] || []).push(r);

    for (const lane of Object.keys(byLane)) {
        console.log(`  ── ${lane} ──`);
        for (const r of byLane[lane]) {
            const label = `${r.name} ${r.detail}`;
            console.log(
                `  ${r.outcome.padEnd(6)} ${String(r.ms || '').padStart(5)}  ${label.length > 68 ? label.slice(0, 67) + '…' : label}`
            );
            if (r.outcome === 'fail' || r.outcome === 'skip') console.log(`         ${r.note}`);
        }
        console.log('');
    }

    console.log(
        '  ' +
            ['pass', 'empty', 'denied', 'absent', 'blocked', 'fail', 'skip']
                .filter(k => counts[k])
                .map(k => `${k}: ${counts[k]}`)
                .join('   ')
    );
    console.log(`  ${outcome.results.length} checks, ${outcome.requests} HTTP requests`);
    if (outcome.context) {
        const chained = Object.keys(outcome.context).filter(k => outcome.context[k]);
        console.log(`  identifiers harvested and chained: ${chained.length ? chained.join(', ') : 'none'}`);
    }
    console.log(counts.fail ? `\n  ${counts.fail} FAILED\n` : '\n  nothing failed\n');
}
