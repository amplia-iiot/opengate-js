// browserify injected a `process` global into the browser bundle (insertGlobals: true). esbuild
// does not, and several runtime dependencies -- q above all -- reference `process` directly rather
// than behind a typeof guard, so the bundle throws on load without it. Same shim browserify used.
import process from 'process/browser.js';

export { process };
