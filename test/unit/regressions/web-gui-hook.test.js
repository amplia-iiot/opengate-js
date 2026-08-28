/**
 * The `hooks.beforeStart` the OpenGate web GUI actually installs.
 *
 * Not a synthetic exercise of the surface: this is the GUI's own hook, reproduced from the code Chema
 * sent while reviewing the fetch migration. It is the only consumer of `beforeStart` we have sight of,
 * and it leans on four things — three of them barely documented and one of them private:
 *
 *   1. `request.addEventListener('error', cb)`. From component-emitter, which superagent's browser
 *      build mixes into its request. It was missing from the new transport until `bf170fa`, and no
 *      test caught it because the surface was being enumerated from source text.
 *   2. The transport actually **emitting** `error` when a request fails.
 *   3. `error.status` and `error.response.body.errors[0].context`, which drive a force-logout.
 *   4. **`request._data`**, a private field, read to skip multipart uploads.
 *
 * Point 4 is the uncomfortable one. It is private and a consumer should not be reading it, but it is
 * being read in production today, so it is pinned here until the GUI has something public to use
 * instead. Breaking it silently would take the web's session handling with it.
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createServer } from 'node:http';

import OpenGateAPI from '../../../opengate-api-npm';

let server;
let origin;

beforeAll(async () => {
    server = createServer((req, res) => {
        const chunks = [];
        req.on('data', c => chunks.push(c));
        req.on('end', () => {
            const route = req.url.split('?')[0].split('/').pop();
            if (route === 'withcontext') {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ errors: [{ code: '0x04', message: 'Unauthorized', context: [{ name: 'organization' }] }] }));
            } else if (route === 'nocontext') {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ errors: [{ code: '0x04', message: 'Unauthorized' }] }));
            } else if (route === 'created') {
                res.writeHead(201, { Location: '/thing/1' });
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end('{}');
            }
        });
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    origin = `http://127.0.0.1:${server.address().port}`;
});

afterAll(() => new Promise(resolve => server.close(resolve)));

const isNil = value => value === null || value === undefined;
const isEmpty = value => !value || value.length === 0;

/**
 * Builds a client with the GUI's hook, and reports what the hook observed.
 * @return {{ogapi: object, seen: object}}
 */
function withGuiHook() {
    const seen = { forceLogout: null, context: undefined, busEvents: [], multipartSkipped: false, requestSeen: null };

    const ogapi = new OpenGateAPI({
        url: origin,
        apiKey: 'the-key',
        timeout: 3000,
        logger: false,
        hooks: {
            beforeStart(request) {
                request.addEventListener('error', function (error) {
                    if (error.status) {
                        switch (error.status) {
                            case 401: {
                                const response = error.response;
                                const body = response && response.body;
                                const errors = body && body.errors;
                                const context = !isEmpty(errors) && errors[0].context;
                                seen.context = context;
                                // The GUI reads this as: no context means the session is gone.
                                if (isNil(context)) seen.forceLogout = true;
                                break;
                            }
                            default:
                                break;
                        }
                    }
                });

                // ignore all request multipart-form-data
                if (request._data && request._data.constructor && request._data.constructor.name === 'FormData') {
                    seen.multipartSkipped = true;
                    return;
                }
                seen.busEvents.push('sending-opengate-request');
                seen.requestSeen = request;
            }
        }
    });

    return { ogapi, seen };
}

describe('the error listener the GUI installs', () => {
    it('is called on a 401, with a status and the parsed body', async () => {
        const { ogapi, seen } = withGuiHook();
        await expect(ogapi.Napi.get('withcontext', undefined, undefined, undefined, false, 'base')).rejects.toBeDefined();
        expect(seen.context).toEqual([{ name: 'organization' }]);
        expect(seen.forceLogout).toBeNull();
    });

    // The path that logs the user out. If `error.response.body` ever stops being the parsed body,
    // this silently stops firing and the web keeps a dead session.
    it('reaches the force-logout decision when the 401 carries no context', async () => {
        const { ogapi, seen } = withGuiHook();
        await expect(ogapi.Napi.get('nocontext', undefined, undefined, undefined, false, 'base')).rejects.toBeDefined();
        expect(seen.context).toBeUndefined();
        expect(seen.forceLogout).toBe(true);
    });

    it('is not called when the request succeeds', async () => {
        const { ogapi, seen } = withGuiHook();
        await ogapi.Napi.get('ok', undefined, undefined, undefined, false, 'base');
        expect(seen.forceLogout).toBeNull();
        expect(seen.context).toBeUndefined();
    });
});

describe('what the GUI does with the request itself', () => {
    it('receives it on the event bus, with a readable url and method', async () => {
        const { ogapi, seen } = withGuiHook();
        await ogapi.Napi.get('ok', undefined, undefined, undefined, false, 'base');
        expect(seen.busEvents).toEqual(['sending-opengate-request']);
        expect(seen.requestSeen.method).toBe('GET');
        expect(seen.requestSeen.url).toContain('/base/ok');
    });

    // `_data` is private and the GUI reads it anyway. Pinned because it ships.
    it('recognises a multipart upload through request._data, and skips the bus', async () => {
        const { ogapi, seen } = withGuiHook();
        const form = new FormData();
        form.append('file', new Blob(['payload']), 'firmware.bin');

        await ogapi.Napi.post_multipart('created', form, {}, 3000, undefined, undefined, 'base');

        expect(seen.multipartSkipped).toBe(true);
        expect(seen.busEvents).toEqual([]);
    });

    it('does not mistake an ordinary JSON body for a multipart upload', async () => {
        const { ogapi, seen } = withGuiHook();
        await ogapi.Napi.post('ok', { a: 1 }, undefined, undefined, undefined, 'base');
        expect(seen.multipartSkipped).toBe(false);
        expect(seen.busEvents).toEqual(['sending-opengate-request']);
    });
});
