#!/usr/bin/env node
/**
 * Runs the same read-only smoke checks inside a real browser, against the IIFE bundle.
 *
 *   OGAPI_URL=… OGAPI_USER=… OGAPI_PASSWORD=… OGAPI_ORG=… node scripts/smoke-browser.mjs
 *
 * A unit test in jsdom proves the bundle parses. It does not prove the library can talk to
 * OpenGate from a browser: jsdom is not a browser, and the transport is exactly what is being
 * changed. This drives Lightpanda over CDP instead, so the request really leaves a browser engine.
 *
 * Two Lightpanda constraints shape this script:
 *
 *   - `evaluate` calls do not share `window`. Anything planted in one reads back as null in the
 *     next, so the bundle and the checks are loaded by real <script src> tags and the whole run
 *     happens inside a single evaluate.
 *   - It is the right tool for "does this load, run and get an answer", not for focus or layout.
 *     For anything subtler, drive real Chrome over CDP on a port other than 9222.
 *
 * Needs the `lightpanda` binary on PATH and puppeteer-core in ~/.local/share/lightpanda-driver.
 */
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// The driver directory is shared across projects on purpose: puppeteer-core is never installed
// into an individual repository just to script a browser. Resolve it the way Node would, rather
// than hard-coding an internal path that changes between puppeteer versions.
const DRIVER = path.join(process.env.HOME, '.local', 'share', 'lightpanda-driver');
const PORT = Number(process.env.OGAPI_SMOKE_PORT ?? 8791);
const CDP_PORT = Number(process.env.OGAPI_SMOKE_CDP_PORT ?? 9222);

const config = {
    url: process.env.OGAPI_URL,
    user: process.env.OGAPI_USER,
    password: process.env.OGAPI_PASSWORD,
    organization: process.env.OGAPI_ORG
};
const missing = Object.entries(config)
    .filter(([, v]) => !v)
    .map(([k]) => 'OGAPI_' + (k === 'organization' ? 'ORG' : k.toUpperCase()));
if (missing.length) {
    console.error('Missing environment variables: ' + missing.join(', '));
    process.exit(2);
}

const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
const bundle = path.join(root, 'dist', `opengate-api-bower-${pkg.version}.js`);
if (!existsSync(bundle)) {
    console.error(`${path.relative(root, bundle)} is missing. Run \`yarn build\` first.`);
    process.exit(2);
}

const page = `<!doctype html>
<html><head><meta charset="utf-8"><title>opengate-js smoke</title></head>
<body><script src="./bundle.js"></script><script src="./checks.js"></script></body></html>`;

const files = {
    '/': { body: page, type: 'text/html' },
    '/bundle.js': { path: bundle, type: 'application/javascript' },
    '/checks.js': { path: path.join(root, 'test', 'smoke', 'checks.js'), type: 'application/javascript' }
};

const server = createServer(async (req, res) => {
    const entry = files[req.url.split('?')[0]];
    if (!entry) return void (res.writeHead(404), res.end());
    res.writeHead(200, { 'Content-Type': entry.type });
    res.end(entry.body ?? (await readFile(entry.path)));
});
await new Promise(resolve => server.listen(PORT, '127.0.0.1', resolve));

const lightpanda = spawn('lightpanda', ['serve', '--host', '127.0.0.1', '--port', String(CDP_PORT)], {
    env: { ...process.env, LIGHTPANDA_DISABLE_TELEMETRY: 'true' },
    stdio: ['ignore', 'ignore', 'pipe']
});
let lightpandaStderr = '';
lightpanda.stderr.on('data', d => (lightpandaStderr += d));

const stop = () => {
    lightpanda.kill();
    server.close();
};

try {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const driverRequire = createRequire(path.join(DRIVER, 'noop.js'));
    const { default: puppeteer } = await import(pathToFileURL(driverRequire.resolve('puppeteer-core')).href);
    const browser = await puppeteer.connect({ browserWSEndpoint: `ws://127.0.0.1:${CDP_PORT}` });
    const tab = await browser.newPage();
    tab.on('pageerror', e => console.error('[browser pageerror]', e.message));
    tab.on('console', m => console.error('[browser]', m.text()));

    await tab.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'load' });

    const outcome = await tab.evaluate(cfg => {
        if (typeof window.OpenGateAPI !== 'function') return { error: 'window.OpenGateAPI is not a function' };
        if (typeof window.__ogapiSmoke !== 'function') return { error: 'the checks did not load' };
        return window.__ogapiSmoke(window.OpenGateAPI, cfg);
    }, config);

    await browser.disconnect();

    if (outcome.error) {
        console.error('smoke could not run: ' + outcome.error);
        stop();
        process.exit(1);
    }

    console.log(`\nopengate-js smoke — ${outcome.runtime} (lightpanda) — ${config.url}\n`);
    for (const r of outcome.results) {
        console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${String(r.ms).padStart(5)}ms  ${r.name}`);
        console.log(`        ${r.detail}`);
    }
    const failed = outcome.results.filter(r => !r.ok).length;
    console.log(`\n${outcome.results.length - failed}/${outcome.results.length} checks passed\n`);
    stop();
    process.exit(failed ? 1 : 0);
} catch (error) {
    console.error('smoke failed to run:', error.message);
    if (lightpandaStderr) console.error('lightpanda said:', lightpandaStderr.slice(0, 500));
    stop();
    process.exit(1);
}
