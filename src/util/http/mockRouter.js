'use strict';

/**
 * The route registry that replaces superagent-mocker.
 *
 * Dropping superagent takes superagent-mocker with it, and the Cucumber suite mocks through the
 * client's `mocks` option, so the mechanism has to be reimplemented rather than removed. It is
 * reproduced deliberately, quirks included, because the mocks in features/support/mocks depend on
 * how it actually behaved:
 *
 *   - The registry is module-level, exactly as superagent-mocker's was. Routes registered by one
 *     client are visible to every other client in the process, and they accumulate for the lifetime
 *     of the process. That leak is load-bearing for nothing, but changing it changes behaviour, so
 *     it is left alone and documented here instead.
 *   - Patterns are matched against the *whole* URL, origin and query string included -- which is
 *     why a pattern has to carry the `north/v80` prefix to match anything at all.
 *   - When several routes match, the last one registered wins.
 *   - `:name` matches one path segment. Everything else in the pattern is literal, including `?`.
 *     Matching is case-insensitive and a trailing slash is optional, which is what
 *     path-to-regexp gave us with superagent-mocker's options.
 */

const routes = [];

const METHODS = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    del: 'DELETE',
    delete: 'DELETE',
    patch: 'PATCH'
};

function _compile(pattern) {
    const keys = [];
    // Split on `:name` so the literal halves can be escaped wholesale. Anything a regular
    // expression would read as syntax -- `?`, `.`, `+`, `(` -- has to survive as itself.
    const source = pattern
        .split(/:([A-Za-z0-9_]+)/)
        .map((part, index) => {
            if (index % 2 === 1) {
                keys.push(part);
                return '([^/]+)';
            }
            return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        })
        .join('');

    return { regexp: new RegExp('^' + source + '/?$', 'i'), keys: keys };
}

/**
 * Registers one mocked route.
 * @param {!string} method - `get`, `post`, `put`, `del`, `delete` or `patch`, or an HTTP verb.
 * @param {!string} pattern - the whole URL to match, with `:name` for the parts that vary.
 * @param {!function} handler - receives `{ url, params, body, headers, query }`, returns the response.
 */
export function register(method, pattern, handler) {
    const verb = METHODS[String(method).toLowerCase()] || String(method).toUpperCase();
    const compiled = _compile(pattern);
    routes.push({ method: verb, pattern: pattern, handler: handler, regexp: compiled.regexp, keys: compiled.keys });
}

/**
 * Finds the route that should answer a request, or null when none does.
 * @param {!string} method - the HTTP verb.
 * @param {!string} url - the whole URL the request would have gone to.
 * @return {?function} a function that takes the request and returns the mocked response.
 */
export function match(method, url) {
    const verb = String(method).toUpperCase();
    let found = null;
    // Reduced over every route rather than short-circuiting: the last match wins, as before.
    routes.forEach(route => {
        if (route.method !== verb) return;
        const m = route.regexp.exec(url);
        if (!m) return;
        const params = {};
        route.keys.forEach((key, index) => {
            params[key] = m[index + 1];
        });
        found = request =>
            Object.assign(
                { status: 200 },
                route.handler({
                    url: url,
                    params: params,
                    body: request.body,
                    headers: request.headers,
                    query: request.query
                })
            );
    });
    return found;
}

/**
 * Forgets every registered route. Nothing in the library calls this; it exists so a test suite can
 * stop one scenario's mocks leaking into the next.
 */
export function clear() {
    routes.splice(0, routes.length);
}

/**
 * A mocked response is delivered on a later tick and rejected unless its status looks like a 2xx,
 * both as superagent-mocker did. The status test is its original substring match rather than a
 * numeric range, so that a handler returning something odd keeps behaving the way it used to.
 * @param {!function} route - the matched route, from `match`.
 * @param {!object} request - `{ body, headers, query }` as the handler will see it.
 * @return {Promise<object>} the handler's own object, untouched apart from a default status.
 */
export function respond(route, request) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let response;
            try {
                response = route(request);
            } catch (error) {
                reject(error);
                return;
            }
            if (/20[0-6]/.test(String(response.status))) {
                resolve(response);
            } else {
                const error = new Error(String(response.status));
                error.status = response.status;
                error.response = response;
                reject(error);
            }
        }, 0);
    });
}
