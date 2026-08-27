#!/usr/bin/env node
/**
 * Runs the Cucumber acceptance suite against a live OpenGate, replacing the gulp `cucumber` task.
 *
 * It needs a real instance: see the Testing section of README.md for the environment variables.
 *
 *   node scripts/e2e.mjs [--tags '@wip'] [--report]
 */
import { mkdir } from 'node:fs/promises';
import { readdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);

const tagsIndex = argv.indexOf('--tags');
const tags = tagsIndex === -1 ? 'not @ignore' : argv[tagsIndex + 1];
const wantsReport = argv.includes('--report');

await mkdir(path.join(root, 'target'), { recursive: true });
await mkdir(path.join(root, 'html-report'), { recursive: true });

const env = { ...process.env };

// The gulp task set this unconditionally, which turns off certificate verification for the whole
// process. Test instances tend to carry self-signed certificates, so the default is kept rather
// than breaking every existing run -- but it is now said out loud, and it can be turned off with
// OGAPI_E2E_STRICT_TLS=1 once those instances have certificates that validate.
if (env.OGAPI_E2E_STRICT_TLS === '1') {
    console.log('TLS certificate verification: ON');
} else {
    console.warn('TLS certificate verification is DISABLED for this run. Set OGAPI_E2E_STRICT_TLS=1 to keep it on.');
    env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

/**
 * cucumber@3 does not expand globs: --require takes a file or a directory, and pointing it at a
 * directory recurses. That would pull in features/step_definitions/file_test/, which holds payloads
 * OpenGate executes server-side and which throw when required as Node modules. The gulp task used
 * single-level globs, so the file list is expanded here to exactly the same set.
 */
function topLevelScripts(dir) {
    return readdirSync(path.join(root, dir))
        .filter(name => name.endsWith('.js'))
        .sort()
        .flatMap(name => ['--require', path.join(dir, name)]);
}

const args = [
    'features/features',
    ...topLevelScripts('features/step_definitions'),
    ...topLevelScripts('features/support'),
    '--format',
    'json:target/resultTESTS.json',
    '--tags',
    tags
];

console.log(`cucumber-js ${args.join(' ')}`);

const cucumber = spawn(path.join(root, 'node_modules', '.bin', 'cucumber-js'), args, {
    cwd: root,
    env,
    stdio: 'inherit'
});

cucumber.on('exit', async code => {
    if (wantsReport) {
        const { default: reporter } = await import('multiple-cucumber-html-reporter');
        reporter.generate({ jsonDir: './target/', reportPath: './html-report/' });
        console.log('Report written to html-report/');
    }
    process.exit(code ?? 1);
});
