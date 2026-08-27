'use strict';

/**
 * Builds the error a fluent builder throws when it rejects one of its parameters.
 *
 * The codebase used to write `throw new Error({ message: 'CODE', parameter: 'name' })` in 56
 * places. Error stringifies whatever it is handed, so every one of those produced the message
 * "[object Object]" and threw the code away: callers could see that something was refused, never
 * what. The code now lands in `message`, where every consumer already looks, and the accompanying
 * fields stay reachable as properties of the error.
 *
 * @param {!string} message - the OGAPI_ code describing what was rejected.
 * @param {object} [properties] - extra fields to expose on the error, typically `parameter`.
 * @return {Error} the error, ready to be thrown.
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = parameterError;

function parameterError(message, properties) {
  return Object.assign(new Error(message), properties);
}

module.exports = exports['default'];
//# sourceMappingURL=parameterError.js.map
