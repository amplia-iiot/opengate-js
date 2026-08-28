'use strict';

/**
 * The library's logger, injectable through the `logger` client option.
 *
 * It exists because a library has no business writing to a host application's console. Before this,
 * every request printed its verb and URL with `console.info`, every failed request dumped a
 * serialised error, the mock plumbing announced itself, and two builders logged the string
 * `'!errrrror!!!!!!'`. In a browser console -- and the OpenGate web GUI is built on this library --
 * that is noise at best, and URLs carrying identifiers at worst.
 *
 * The levels are split by who the message is for:
 *
 *   - `debug` and `info` are for whoever is debugging the library. **Silent by default.** Per-request
 *     logging lives here.
 *   - `warn` and `error` tell the caller they have misused the API -- a value outside an enum, a
 *     filter with both `and` and `or`, a response that would not parse. **Printed by default**,
 *     because losing them would hide real mistakes.
 *
 * Configure it with the `logger` option:
 *
 *     new OpenGateAPI({ url, apiKey })                        // the default above
 *     new OpenGateAPI({ url, apiKey, logger: false })         // silent
 *     new OpenGateAPI({ url, apiKey, logger: true })          // everything, for debugging
 *     new OpenGateAPI({ url, apiKey, logger: myLogger })      // { debug, info, warn, error }
 *
 * A supplied object is authoritative: levels it omits are silent rather than falling back to the
 * console. Like `hooks.beforeStart`, the setting is process-wide and the last one wins.
 */

const LEVELS = ['debug', 'info', 'warn', 'error'];

function _console(level) {
    return function () {
        if (typeof console === 'undefined') return;
        const fn = console[level] || console.log;
        if (fn) fn.apply(console, arguments);
    };
}

function _noop() {}

const SILENT = { debug: _noop, info: _noop, warn: _noop, error: _noop };
const VERBOSE = { debug: _console('debug'), info: _console('info'), warn: _console('warn'), error: _console('error') };
const DEFAULT = { debug: _noop, info: _noop, warn: _console('warn'), error: _console('error') };

let active = DEFAULT;

/**
 * Chooses where the library's messages go.
 * @param {(boolean|object|null|undefined)} logger - `false` or `null` for silence, `true` for
 *     everything on the console, an object with any of `debug`, `info`, `warn` and `error` to take
 *     over, `undefined` to restore the default.
 */
export function configureLogger(logger) {
    if (logger === undefined) {
        active = DEFAULT;
        return;
    }
    if (logger === false || logger === null) {
        active = SILENT;
        return;
    }
    if (logger === true) {
        active = VERBOSE;
        return;
    }
    if (typeof logger === 'object') {
        const next = {};
        LEVELS.forEach(level => {
            next[level] = typeof logger[level] === 'function' ? logger[level].bind(logger) : _noop;
        });
        active = next;
        return;
    }
    active = DEFAULT;
}

/**
 * The object the library logs through. Its methods delegate, so a module may import it once at load
 * time and still see a logger configured later.
 */
export default {
    debug: function () {
        active.debug.apply(null, arguments);
    },
    info: function () {
        active.info.apply(null, arguments);
    },
    warn: function () {
        active.warn.apply(null, arguments);
    },
    error: function () {
        active.error.apply(null, arguments);
    }
};
