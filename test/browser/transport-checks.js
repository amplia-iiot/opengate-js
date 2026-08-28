/**
 * Browser-side verification of the transport, run inside a real browser engine.
 *
 * The unit tests prove the transport in Node, and the read-only smoke proves it can talk to the
 * platform. Neither proves what a browser does with it, and this library is the core of the OpenGate
 * web GUI: a request that behaves differently in a browser is a production incident. So these checks
 * exercise the things only a browser can answer -- upload progress over XMLHttpRequest, asBlob
 * returning a real Blob, cancellation, and the object `hooks.beforeStart` hands to application code.
 *
 * They are written to run against **any** build of the bundle, so the current one can be compared
 * against the previous one in the same engine. That comparison is the point: it separates a
 * regression from a limitation of the engine doing the testing.
 *
 * Loaded as a classic script; defines window.__ogapiTransportChecks. Everything runs in a single
 * call because some engines do not share `window` between CDP evaluate calls.
 */
(function (root) {
    function describe(error) {
        if (!error) return String(error);
        if (error.statusCode !== undefined) return 'statusCode=' + error.statusCode + ' data=' + JSON.stringify(error.data).slice(0, 160);
        return (error.message || String(error)) + (error.stack ? ' | ' + String(error.stack).split('\n')[1] : '');
    }

    root.__ogapiTransportChecks = async function (OpenGateAPI, cfg) {
        var results = [];
        async function check(name, fn) {
            var started = Date.now();
            try {
                var detail = await fn();
                results.push({ name: name, ok: true, ms: Date.now() - started, detail: detail || 'ok' });
            } catch (e) {
                results.push({ name: name, ok: false, ms: Date.now() - started, detail: describe(e) });
            }
        }

        var LOCAL = cfg.local; // same-origin base for the local fixture endpoints

        // hooks.beforeStart is process-wide, in this build and in the superagent one before it, and
        // there is no way to unregister it. Left alone, a hook installed by one check runs for
        // every check after it. Neutralise it by installing a hook that does nothing.
        function clearHook() {
            new OpenGateAPI({ url: LOCAL, hooks: { beforeStart: function () {} } });
        }

        // ---------------------------------------------------------------- 1. the runtime itself
        await check('the browser provides fetch, XHR and FormData', function () {
            var missing = ['fetch', 'XMLHttpRequest', 'FormData', 'Blob', 'AbortController', 'ReadableStream'].filter(function (n) {
                return typeof root[n] === 'undefined';
            });
            if (missing.length) throw new Error('missing: ' + missing.join(', '));
            return 'all present';
        });

        // ---------------------------------------------------------------- 2. the hook surface
        // This is the object hooks.beforeStart hands to application code. The GUI is built on it.
        await check('beforeStart receives the full superagent request surface', function () {
            var seen = null;
            var api = new OpenGateAPI({
                url: LOCAL,
                apiKey: 'k',
                timeout: 5000,
                hooks: {
                    beforeStart: function (r) {
                        seen = r;
                    }
                }
            });
            return api.Napi.get('json', undefined, undefined, undefined, false, 'fixture').then(function () {
                clearHook();
                if (!seen) throw new Error('the hook was never called');
                var required = [
                    'set',
                    'unset',
                    'get',
                    'getHeader',
                    'type',
                    'accept',
                    'auth',
                    'query',
                    'send',
                    'field',
                    'attach',
                    'timeout',
                    'clearTimeout',
                    'abort',
                    'on',
                    'off',
                    'ok',
                    'serialize',
                    'parse',
                    'responseType',
                    'withCredentials',
                    'use',
                    'toJSON',
                    'end',
                    'redirects',
                    'retry',
                    'buffer',
                    'agent',
                    'ca',
                    'maxResponseSize',
                    'sortQuery'
                ];
                var missing = required.filter(function (n) {
                    return typeof seen[n] !== 'function';
                });
                if (missing.length) throw new Error('hook object missing: ' + missing.join(', '));
                if (seen.method !== 'GET') throw new Error('method was ' + seen.method);
                if (typeof seen.url !== 'string' || seen.url.indexOf(LOCAL) !== 0) throw new Error('url was ' + seen.url);
                if (!seen.header || typeof seen.header !== 'object') throw new Error('header is not an object');
                return required.length + ' methods present, method, url and header readable';
            });
        });

        await check('a header added inside beforeStart reaches the wire', function () {
            var api = new OpenGateAPI({
                url: LOCAL,
                apiKey: 'k',
                timeout: 5000,
                hooks: {
                    beforeStart: function (r) {
                        r.set('X-From-Hook', 'yes');
                    }
                }
            });
            return api.Napi.get('echo-headers', undefined, undefined, undefined, false, 'fixture').then(function (res) {
                clearHook();
                if (res.body['x-from-hook'] !== 'yes') throw new Error('server saw: ' + JSON.stringify(res.body).slice(0, 200));
                return 'server received x-from-hook';
            });
        });

        await check('beforeStart can read the content type send() already chose', function () {
            var seen;
            var api = new OpenGateAPI({
                url: LOCAL,
                apiKey: 'k',
                timeout: 5000,
                hooks: {
                    beforeStart: function (r) {
                        seen = r.get('Content-Type');
                    }
                }
            });
            return api.Napi.post('json', { a: 1 }, undefined, undefined, undefined, 'fixture').then(function () {
                clearHook();
                if (seen !== 'application/json') throw new Error('hook read: ' + seen);
                return 'application/json, as superagent set it inside send()';
            });
        });

        // ---------------------------------------------------------------- 3. the response surface
        await check('the response carries the shape callers read', function () {
            var api = new OpenGateAPI({ url: LOCAL, apiKey: 'k', timeout: 5000 });
            return api.Napi.get('created', undefined, undefined, undefined, false, 'fixture').then(function (res) {
                if (res.statusCode !== 201) throw new Error('status ' + res.statusCode);
                // res.header.location is read on 25 code paths in this library.
                if (res.header.location !== '/thing/7') throw new Error('header.location was ' + res.header.location);
                if (res.header !== res.headers) throw new Error('header and headers differ');
                if (typeof res.get !== 'function' || res.get('Location') !== '/thing/7') throw new Error('res.get is broken');
                if (res.created !== true || res.ok !== true) throw new Error('status sugar missing');
                return 'statusCode, header.location, get(), created, ok';
            });
        });

        await check('a 404 rejects with statusCode, data and headers', function () {
            var api = new OpenGateAPI({ url: LOCAL, apiKey: 'k', timeout: 5000 });
            return api.Napi.get('missing', undefined, undefined, undefined, false, 'fixture').then(
                function () {
                    throw new Error('expected a rejection');
                },
                function (err) {
                    if (err instanceof Error) throw err;
                    var keys = Object.keys(err).sort().join(',');
                    if (keys !== 'data,headers,statusCode') throw new Error('rejection keys: ' + keys);
                    if (err.statusCode !== 404) throw new Error('status ' + err.statusCode);
                    return 'rejected with ' + keys;
                }
            );
        });

        // ---------------------------------------------------------------- 4. asBlob, in a browser
        await check('asBlob hands a browser a real Blob', function () {
            var api = new OpenGateAPI({ url: LOCAL, apiKey: 'k', timeout: 5000 });
            return api.Napi.get('binary', undefined, undefined, undefined, true, 'fixture').then(function (res) {
                if (!(res.body instanceof Blob)) throw new Error('body was ' + Object.prototype.toString.call(res.body));
                if (res.body.size !== 4) throw new Error('size ' + res.body.size);
                return 'Blob of ' + res.body.size + ' bytes';
            });
        });

        // ---------------------------------------------------------------- 5. upload progress over XHR
        // fetch reports no upload progress in any browser, so this path is XMLHttpRequest. It is
        // what withProgressEvent drives on firmware and media uploads.
        await check('a multipart upload reports progress and arrives intact', function () {
            var api = new OpenGateAPI({ url: LOCAL, apiKey: 'k', timeout: 20000 });
            var events = [];
            var payload = new Array(120001).join('x');
            var form = new FormData();
            form.append('file', new Blob([payload]), 'big.bin');
            return api.Napi.post_multipart(
                'echo-upload',
                form,
                {
                    progress: function (e) {
                        events.push(e);
                    }
                },
                20000,
                undefined,
                undefined,
                'fixture'
            ).then(function (res) {
                if (!events.length) throw new Error('no progress events at all');
                var uploads = events.filter(function (e) {
                    return e.direction === 'upload';
                });
                if (!uploads.length) throw new Error('progress fired but never for upload: ' + JSON.stringify(events.slice(0, 3)));
                var last = uploads[uploads.length - 1];
                if (last.loaded !== last.total) throw new Error('ended at ' + last.loaded + '/' + last.total);
                if (res.body.bytes < payload.length) throw new Error('server got only ' + res.body.bytes + ' bytes');
                return uploads.length + ' upload event(s), ' + res.body.bytes + ' bytes received, ' + res.body.parts + ' part(s)';
            });
        });

        // ---------------------------------------------------------------- 6. abort
        await check('abort() from a hook cancels the request', function () {
            var api = new OpenGateAPI({
                url: LOCAL,
                apiKey: 'k',
                timeout: 20000,
                hooks: {
                    beforeStart: function (r) {
                        r.abort();
                    }
                }
            });
            return api.Napi.get('slow', undefined, undefined, undefined, false, 'fixture').then(
                function () {
                    clearHook();
                    throw new Error('the request completed despite abort()');
                },
                function (err) {
                    clearHook();
                    return 'rejected, statusCode ' + err.statusCode;
                }
            );
        });

        // ---------------------------------------------------------------- 7. timeout
        await check('a timeout rejects rather than hanging', function () {
            var api = new OpenGateAPI({ url: LOCAL, apiKey: 'k', timeout: 300 });
            return api.Napi.get('slow', undefined, undefined, undefined, false, 'fixture').then(
                function () {
                    throw new Error('the slow request resolved');
                },
                function (err) {
                    return 'rejected, statusCode ' + err.statusCode;
                }
            );
        });

        // ---------------------------------------------------------------- 8. mocks
        await check('the mocks option answers without touching the network', function () {
            var api = new OpenGateAPI({
                url: 'https://unreachable.invalid',
                apiKey: 'k',
                timeout: 3000,
                mocks: {
                    get: {
                        '/north/v80/provision/organizations/:organization': function (req) {
                            return { statusCode: 200, status: 200, body: { name: req.params.organization } };
                        }
                    }
                }
            });
            return api.Napi.get('provision/organizations/acme').then(function (res) {
                if (res.body.name !== 'acme') throw new Error('body ' + JSON.stringify(res.body));
                return 'mock answered with the captured parameter';
            });
        });

        // ---------------------------------------------------------------- 9. the real platform
        if (cfg.url) {
            var apiKey = null;
            await check('production: authenticate with user and password', function () {
                var bootstrap = new OpenGateAPI({ url: cfg.url, timeout: 30000 });
                return bootstrap
                    .newUserFinder()
                    .findByEmailAndPassword(cfg.user, cfg.password)
                    .then(function (res) {
                        if (res.statusCode !== 200) throw new Error('status ' + res.statusCode);
                        var user = res.data && (res.data.user || res.data);
                        apiKey = user && (user.apiKey || (user.apikey && user.apikey.value));
                        if (!apiKey) throw new Error('no api key in the response');
                        return 'api key received, ' + String(apiKey).length + ' characters';
                    });
            });

            if (apiKey) {
                var prod = new OpenGateAPI({ url: cfg.url, apiKey: apiKey, timeout: 30000 });

                await check('production: read the organization by name', function () {
                    return prod
                        .newOrganizationFinder()
                        .findByName(cfg.organization)
                        .then(function (res) {
                            if (res.statusCode !== 200) throw new Error('status ' + res.statusCode);
                            return 'body keys: ' + Object.keys(res.data || {}).join(',');
                        });
                });

                await check('production: search devices, limited to three', function () {
                    return prod
                        .devicesSearchBuilder()
                        .limit(3, 1)
                        .build()
                        .execute()
                        .then(function (res) {
                            if (res.statusCode !== 200 && res.statusCode !== 204) throw new Error('status ' + res.statusCode);
                            var devices = (res.data && (res.data.devices || res.data.entities)) || [];
                            return res.statusCode + ', ' + devices.length + ' device(s)';
                        });
                });

                await check('production: a missing organization rejects the GenericFinder way', function () {
                    return prod
                        .newOrganizationFinder()
                        .findByName('no-such-organization-verify')
                        .then(
                            function () {
                                throw new Error('expected a rejection');
                            },
                            function (err) {
                                if (err instanceof Error) throw err;
                                var keys = Object.keys(err).sort().join(',');
                                if (keys !== 'error,statusCode') throw new Error('keys ' + keys);
                                return 'rejected with 404 and keys ' + keys;
                            }
                        );
                });
            }
        }

        return { userAgent: root.navigator && root.navigator.userAgent, results: results };
    };
})(typeof globalThis !== 'undefined' ? globalThis : this);
