'use strict';

/**
 * The slice of superagent's chainable API that the Cucumber steps here actually use, over fetch.
 *
 * These steps talk to the Guerrilla Mail API to read a verification email — nothing to do with
 * OpenGate — and they were the last thing in the repository importing superagent. Keeping that
 * dependency for three GET requests dragged in four form-data advisories, two of them CRITICAL.
 *
 * The shape is deliberately identical to what the call sites already use — `.get(url).query(obj)
 * .end((err, response) => …)` with `response.body` parsed — so the steps did not have to be
 * rewritten. They are a thousand lines of nested callbacks against an external service that cannot
 * be exercised from here; changing their control flow to prove a point about dependencies would be
 * the riskier edit.
 *
 * Only `get`, `query` and `end` exist. Anything else superagent offered is absent on purpose: if a
 * future step needs it, add it here deliberately rather than reaching for the package again.
 */
function get(url) {
    const params = {};

    const chain = {
        query(extra) {
            Object.assign(params, extra || {});
            return chain;
        },

        end(callback) {
            const target = new URL(url);
            Object.entries(params).forEach(([key, value]) => target.searchParams.set(key, value));

            fetch(target, { method: 'GET' })
                .then(async res => {
                    const text = await res.text();
                    let body;
                    try {
                        body = JSON.parse(text);
                    } catch {
                        body = text;
                    }
                    const response = { status: res.status, statusCode: res.status, ok: res.ok, body: body, text: text };

                    // superagent treated a non-2xx as an error and still handed over the response.
                    if (!res.ok) {
                        const err = new Error(`Got ${res.status} from ${target.href}`);
                        err.status = res.status;
                        err.response = response;
                        callback(err, response);
                        return;
                    }
                    callback(null, response);
                })
                .catch(err => callback(err));

            return chain;
        }
    };

    return chain;
}

module.exports = { get: get };
