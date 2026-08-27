#!/usr/bin/env node
/**
 * Runs the read-only smoke checks under Node, against the built CommonJS bundle.
 *
 *   OGAPI_URL=… OGAPI_USER=… OGAPI_PASSWORD=… OGAPI_ORG=… node scripts/smoke.mjs
 *
 * Read-only: see the warning at the top of test/smoke/checks.js. Requires `yarn build` first,
 * because dist/ is not in the repository.
 *
 * Exits non-zero if any check fails, so it can gate a release.
 */
import { createRequire } from 'node:module';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

const config = {
    url: process.env.OGAPI_URL,
    user: process.env.OGAPI_USER,
    password: process.env.OGAPI_PASSWORD,
    organization: process.env.OGAPI_ORG
};

const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => 'OGAPI_' + (key === 'organization' ? 'ORG' : key.toUpperCase()));
if (missing.length) {
    console.error('Missing environment variables: ' + missing.join(', '));
    process.exit(2);
}

const bundle = path.join(root, 'dist', 'opengate-api-npm.js');
if (!existsSync(bundle)) {
    console.error('dist/ is missing. Run `yarn build` first.');
    process.exit(2);
}

const OpenGateAPI = require(bundle);
const runSmoke = require(path.join(root, 'test', 'smoke', 'checks.js'));

const { runtime, results } = await runSmoke(OpenGateAPI.default || OpenGateAPI, config);

console.log(`\nopengate-js smoke — ${runtime} — ${config.url}\n`);
for (const r of results) {
    console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${String(r.ms).padStart(5)}ms  ${r.name}`);
    console.log(`        ${r.detail}`);
}

const failed = results.filter(r => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} checks passed\n`);
process.exit(failed ? 1 : 0);
