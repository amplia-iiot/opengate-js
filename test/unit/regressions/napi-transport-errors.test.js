/**
 * Two defects reported by a consumer running opengate-js in a sandboxed browser widget.
 *
 * 1. A failure with no HTTP response -- timeout, abort, or a network/CORS/CSP refusal -- rejected as
 *    `{statusCode: 500, data: {errors: [{message: 'OGAPI: Something is broken...'}]}}` and dropped
 *    the original error, so it was indistinguishable from a server bug. The web GUI handles that 500
 *    as a generic failure, so it stays; `reason` and `cause` are added alongside it.
 *
 * 2. `Napi.post('/north/v80/...')` silently reached `north/v80//north/v80/...`, because the default
 *    base is prepended to every path. It now rejects before anything is sent.
 *
 * The double slash that every leading-slash builder path produces (`north/v80//search/...`) is what
 * production has always sent, and is pinned here so that nobody "fixes" it by accident.
 */
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { createServer } from 'node:http';

import OpenGateAPI from '../../../opengate-api-npm';
import NorthAmpliaREST from '../../../src/util/NorthAmpliaREST';
import SouthAmpliaREST from '../../../src/util/SouthAmpliaREST';
import { setBeforeStart } from '../../../src/util/http/RequestSpec';

const BROKEN = 'OGAPI: Something is broken. Please contact with your administrator.';

let server;
let origin;
let seen = [];

beforeAll(async () => {
    server = createServer((req, res) => {
        req.on('data', () => {});
        req.on('end', () => {
            seen.push(req.url);
            if (req.url.endsWith('/slow')) {
                setTimeout(() => res.end('{}'), 600);
                return;
            }
            if (req.url.endsWith('/missing')) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ errors: [{ code: 404, message: 'nope' }] }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('{}');
        });
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    origin = `http://127.0.0.1:${server.address().port}`;
});

afterAll(() => new Promise(resolve => server.close(resolve)));

// The beforeStart hook is process-wide; the abort test must not leave it behind.
afterEach(() => setBeforeStart(undefined));

/** A port nothing listens on: open one, note it, close it. */
async function deadOrigin() {
    const probe = createServer();
    await new Promise(resolve => probe.listen(0, '127.0.0.1', resolve));
    const port = probe.address().port;
    await new Promise(resolve => probe.close(resolve));
    return `http://127.0.0.1:${port}`;
}

const rejectionOf = promise =>
    promise.then(
        () => {
            throw new Error('expected a rejection');
        },
        rejection => rejection
    );

describe('a failure with no HTTP response', () => {
    it('keeps statusCode 500 and its message for a timeout, and says it was a timeout', async () => {
        const ogapi = new OpenGateAPI({ url: origin, apiKey: 'k', timeout: 150 });
        const rejection = await rejectionOf(ogapi.Napi.get('slow'));

        expect(rejection.statusCode).toBe(500);
        expect(rejection.data.errors[0].message).toBe(BROKEN);
        expect(rejection.reason).toBe('timeout');
        expect(rejection.cause).toBeInstanceOf(Error);
        expect(rejection.cause.timeout).toBe(true);
    });

    it('says it was aborted', async () => {
        const ogapi = new OpenGateAPI({ url: origin, apiKey: 'k', timeout: 2000, hooks: { beforeStart: req => req.abort() } });
        const rejection = await rejectionOf(ogapi.Napi.get('things'));

        expect(rejection.statusCode).toBe(500);
        expect(rejection.reason).toBe('aborted');
    });

    it('says it was the network when nothing answers, and keeps the original error', async () => {
        const ogapi = new OpenGateAPI({ url: await deadOrigin(), apiKey: 'k', timeout: 2000 });
        const rejection = await rejectionOf(ogapi.Napi.get('things'));

        expect(rejection.statusCode).toBe(500);
        expect(rejection.data.errors[0].message).toBe(BROKEN);
        expect(rejection.reason).toBe('network');
        expect(rejection.cause).toBeInstanceOf(Error);
    });

    it('leaves an HTTP error exactly as it was, without reason or cause', async () => {
        const ogapi = new OpenGateAPI({ url: origin, apiKey: 'k', timeout: 2000 });
        const rejection = await rejectionOf(ogapi.Napi.get('missing'));

        expect(rejection.statusCode).toBe(404);
        expect(rejection.data).toEqual({ errors: [{ code: 404, message: 'nope' }] });
        expect(rejection).not.toHaveProperty('reason');
        expect(rejection).not.toHaveProperty('cause');
    });
});

describe('a path that repeats the default base', () => {
    it.each(['/north/v80/provision/organizations', 'north/v80/provision/organizations', '/north/v90/anything'])(
        'rejects %s before sending anything',
        async path => {
            const before = seen.length;
            const ogapi = new OpenGateAPI({ url: origin, apiKey: 'k', timeout: 2000 });
            const rejection = await rejectionOf(ogapi.Napi.post(path, {}));

            expect(rejection.statusCode).toBe(400);
            expect(rejection.reason).toBe('invalid-path');
            expect(rejection.data.errors[0].message).toContain('north/v80/');
            expect(seen.length).toBe(before);
        }
    );

    it('is refused by every verb', async () => {
        const napi = new NorthAmpliaREST({ url: origin, apiKey: 'k' }, {});
        const results = await Promise.allSettled([
            napi.get('/north/v80/x'),
            napi.post('/north/v80/x', {}),
            napi.put('/north/v80/x', {}),
            napi.patch('/north/v80/x', {}),
            napi.delete('/north/v80/x')
        ]);
        expect(results.map(r => r.status === 'rejected' && r.reason.reason)).toEqual(Array(5).fill('invalid-path'));
    });

    it('is refused on South for its own base', async () => {
        const sapi = new SouthAmpliaREST({ url: origin, apiKey: 'k' }, {});
        expect((await rejectionOf(sapi.get('/v80/devices'))).reason).toBe('invalid-path');
    });

    it('is left alone when the caller gives its own serviceBaseURL', async () => {
        const napi = new NorthAmpliaREST({ url: origin, apiKey: 'k', timeout: 2000 }, {});
        await napi.get('north/things', undefined, undefined, undefined, false, 'custom');
        expect(seen.at(-1)).toBe('/custom/north/things');
    });
});

describe('the URLs production already sends', () => {
    it('keeps the double slash of a leading-slash path', async () => {
        const ogapi = new OpenGateAPI({ url: origin, apiKey: 'k', timeout: 2000 });
        await ogapi.Napi.post('/search/devices', {});
        expect(seen.at(-1)).toBe('/north/v80//search/devices');
    });

    it('keeps a relative path as it was', async () => {
        const ogapi = new OpenGateAPI({ url: origin, apiKey: 'k', timeout: 2000 });
        await ogapi.Napi.post('search/devices', {});
        expect(seen.at(-1)).toBe('/north/v80/search/devices');
    });
});
