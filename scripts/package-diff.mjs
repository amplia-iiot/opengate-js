#!/usr/bin/env node
/**
 * Compares two builds of what the package publishes and prints a Markdown report.
 *
 *   node scripts/package-diff.mjs <base-dir> <head-dir>
 *
 * Each directory holds `dist/`, `types/` and `build/api-model.json` as `yarn build && yarn apidoc`
 * leave them. CI runs it on every pull request (.github/workflows/package-diff.yml), so a dependency
 * bump says by itself whether it reaches consumers: a dev-only bump reports no change at all.
 *
 * The browser bundle inlines its dependencies, so a changed bundle is broken down by the module
 * markers esbuild writes (`// node_modules/<pkg>/...`, `// src/...`) to name what actually moved.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const PUBLISHED = ['dist', 'types', 'build/api-model.json'];
// The browser bundles carry the version in their names; strip it so a release bump compares like with like.
const VERSIONED_NAME = /-\d+\.\d+\.\d+(?=\.)/;
const BROWSER_BUNDLE = /^dist\/opengate-api-bower\.js$/;
const MODULE_MARKER = /^ {2}\/\/ ((?:node_modules|src)\/\S+|[\w.-]+\.js)$/;

function listFiles(root) {
    const files = new Map();
    for (const entry of PUBLISHED) {
        const start = join(root, entry);
        if (!existsSync(start)) continue;
        const walk = path => {
            if (statSync(path).isDirectory()) {
                for (const name of readdirSync(path)) walk(join(path, name));
                return;
            }
            const key = relative(root, path).replace(VERSIONED_NAME, '');
            // Source maps change whenever what they map changes; listing them is noise.
            if (!key.endsWith('.map')) files.set(key, path);
        };
        walk(start);
    }
    return files;
}

/** The bundle split into its modules, keyed by package name or by `src/...` path. */
function modulesOf(source) {
    const modules = new Map();
    let current = null;
    for (const line of source.split('\n')) {
        const marker = MODULE_MARKER.exec(line);
        if (marker) {
            const path = marker[1];
            if (path.startsWith('node_modules/')) current = /^node_modules\/((?:@[^/]+\/)?[^/]+)/.exec(path)[1];
            else if (path.startsWith('src/')) current = path;
            // The entry file comes last, followed by the licence banners of what was inlined: a
            // dependency's version bump shows up here too.
            else current = path + ' (entry point and licence banners)';
            if (!modules.has(current)) modules.set(current, []);
        }
        if (current) modules.get(current).push(line);
    }
    return new Map([...modules].map(([key, lines]) => [key, lines.join('\n')]));
}

function compareBundles(basePath, headPath) {
    const base = modulesOf(readFileSync(basePath, 'utf8'));
    const head = modulesOf(readFileSync(headPath, 'utf8'));
    const changes = [];
    for (const key of new Set([...base.keys(), ...head.keys()])) {
        if (!base.has(key)) changes.push(['added', key]);
        else if (!head.has(key)) changes.push(['removed', key]);
        else if (base.get(key) !== head.get(key)) changes.push(['changed', key]);
    }
    return changes.sort((a, b) => a[1].localeCompare(b[1]));
}

function report(baseDir, headDir) {
    const base = listFiles(baseDir);
    const head = listFiles(headDir);
    const rows = [];
    for (const key of [...new Set([...base.keys(), ...head.keys()])].sort()) {
        if (!base.has(key)) rows.push(['added', key]);
        else if (!head.has(key)) rows.push(['removed', key]);
        else if (!readFileSync(base.get(key)).equals(readFileSync(head.get(key)))) rows.push(['changed', key]);
    }

    const out = ['## Published package'];
    if (rows.length === 0) {
        out.push('', 'No change: `dist/`, `types/` and the API model are byte-identical to the base branch.');
        out.push('This pull request does not reach consumers of the package.');
        return out.join('\n');
    }

    out.push('', `**${rows.length} published file(s) differ from the base branch.** Consumers will see this change.`, '');
    out.push('| | File |', '|---|---|');
    for (const [kind, key] of rows) out.push(`| ${kind} | \`${key}\` |`);

    const bundle = rows.find(([kind, key]) => kind === 'changed' && BROWSER_BUNDLE.test(key));
    if (bundle) {
        const changes = compareBundles(base.get(bundle[1]), head.get(bundle[1]));
        out.push('', '### Inside the browser bundle', '');
        if (changes.length === 0) out.push('The modules are identical; only the wrapper changed.');
        else for (const [kind, key] of changes) out.push(`- ${kind}: \`${key}\``);
    }
    return out.join('\n');
}

const [baseDir, headDir] = process.argv.slice(2);
if (!baseDir || !headDir) {
    console.error('usage: node scripts/package-diff.mjs <base-dir> <head-dir>');
    process.exit(2);
}
console.log(report(baseDir, headDir));
