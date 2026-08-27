// Stands in for Node built-ins that the browser bundle can never use.
//
// jsonpath's generated parser has a require('fs') behind a CLI-only guard that no browser ever
// reaches. Browserify used to substitute an empty module silently; esbuild refuses to resolve it,
// which is the better default, so the substitution is declared here instead of being magic.
module.exports = {};
