#!/usr/bin/env node
/**
 * Builds dist/ with esbuild, replacing the gulp + browserify + Babel 5 pipeline.
 *
 * The output contract is deliberately unchanged: the same file names, in the same places, with the
 * same module semantics. Consumers deep-import `dist/src/...`, the acceptance suite requires
 * `dist/opengate-api-npm`, and the versioned browser bundle name appears in published documentation.
 * Modernising the toolchain is not a reason to break any of that; dropping those paths, if it ever
 * happens, belongs in a major version and in its own change.
 *
 * What is new: an ESM entry point, which the old pipeline could not produce at all.
 *
 *   node scripts/build.mjs [--no-minify]
 */
import { readFile, rm, mkdir, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));

const ENTRY_NPM = 'opengate-api-npm.js';
const ENTRY_BROWSER = 'opengate-api-bower.js';

/**
 * Babel 5 ended the npm entry point with `module.exports = exports['default']`, so
 * `require('opengate-js')` hands back the class itself rather than `{ default: class }`. Babel 6
 * dropped that behaviour and esbuild never had it, so it has to be restored explicitly or every
 * consumer breaks at once. Node's ESM interop then makes `import OpenGateAPI from 'opengate-js'`
 * resolve to the same class, which is what it already did.
 */
const CJS_DEFAULT_INTEROP = '\nif (module.exports && module.exports.default) module.exports = module.exports.default;\n';

const shared = {
    logLevel: 'warning',
    sourcemap: true,
    // src/ is published alongside dist/, so embedding the sources in the maps as well would only
    // inflate the package. The gulp pipeline did not embed them either.
    sourcesContent: false,
    // The published bundles have always been ES5-compatible. Nothing here needs to regress that,
    // and consumers on old browsers are the reason the bundle exists at all.
    target: ['es2015']
};

// readdir with recursive lands in Node 20.1; fs/promises.glob only exists from Node 22, and
// package.json supports Node 20. CI caught that on its first run, which is what the matrix is for.
async function collectSources() {
    const entries = await readdir(path.join(root, 'src'), { recursive: true });
    return [ENTRY_NPM, ...entries.filter(name => name.endsWith('.js')).map(name => path.join('src', name))].sort();
}

/**
 * Transpiles every source file one to one into dist/, preserving the tree. This is what the gulp
 * `npm` task did, and it is what keeps `dist/src/...` importable.
 */
async function buildTree(sources) {
    await esbuild.build({
        ...shared,
        entryPoints: sources,
        outdir: dist,
        outbase: '.',
        format: 'cjs',
        platform: 'neutral',
        bundle: false
    });

    const entry = path.join(dist, ENTRY_NPM);
    await writeFile(entry, (await readFile(entry, 'utf8')) + CJS_DEFAULT_INTEROP);
}

/** The ESM entry the old pipeline could not produce. */
async function buildEsm() {
    await esbuild.build({
        ...shared,
        entryPoints: [ENTRY_NPM],
        outfile: path.join(dist, 'opengate-api-npm.mjs'),
        format: 'esm',
        platform: 'neutral',
        bundle: true,
        packages: 'external'
    });
}

/**
 * Node built-ins reached by two runtime dependencies. browserify used to substitute these without
 * saying so: path-browserify for path, an empty module for fs. esbuild refuses to resolve them,
 * which is the better default, so the same substitutions are declared here in the open.
 *
 * jsonpath only requires fs behind a CLI-only guard; mime-types genuinely calls path.extname, and
 * the multipart helper depends on it to pick a content type.
 */
const BROWSER_SHIMS = {
    path: path.join(root, 'node_modules', 'path-browserify'),
    buffer: path.join(root, 'node_modules', 'buffer'),
    assert: path.join(root, 'node_modules', 'assert'),
    util: path.join(root, 'node_modules', 'util'),
    fs: path.join(root, 'scripts', 'browser-shims', 'empty.js'),
    // The multipart helper reaches for node:fs to turn a file path into a Blob, behind a runtime
    // check for Node. The check keeps it from ever running in a browser, but esbuild still has to
    // resolve the specifier to bundle the file at all.
    'node:fs': path.join(root, 'scripts', 'browser-shims', 'empty.js'),
    // iconv-lite, reached through urlencode, requires string_decoder unconditionally. This shim was
    // missing and the build still worked, because the npm package of that name happened to sit in
    // node_modules as a transitive of superagent; removing superagent broke the browser bundle and
    // nothing else. Declared here, and depended on explicitly, so the bundle no longer relies on
    // another package's tree for a module it needs itself.
    string_decoder: path.join(root, 'node_modules', 'string_decoder')
};

/** The browser bundle, under the same versioned name the documentation already points at. */
async function buildBrowser({ minify }) {
    const name = `opengate-api-bower-${pkg.version}${minify ? '.min' : ''}.js`;
    await esbuild.build({
        ...shared,
        entryPoints: [ENTRY_BROWSER],
        outfile: path.join(dist, name),
        format: 'iife',
        platform: 'browser',
        bundle: true,
        minify,
        alias: BROWSER_SHIMS,
        inject: [path.join(root, 'scripts', 'browser-shims', 'process-global.mjs')]
    });
    return name;
}

const minify = !process.argv.includes('--no-minify');

if (existsSync(dist)) await rm(dist, { recursive: true });
await mkdir(dist, { recursive: true });

const sources = await collectSources();
await buildTree(sources);
await buildEsm();
const browser = await buildBrowser({ minify: false });
const browserMin = minify ? await buildBrowser({ minify: true }) : null;

console.log(`dist/ built for opengate-js ${pkg.version}`);
console.log(`  ${sources.length} files transpiled into dist/, entry ${ENTRY_NPM}`);
console.log(`  dist/opengate-api-npm.mjs`);
console.log(`  dist/${browser}${browserMin ? `\n  dist/${browserMin}` : ''}`);
