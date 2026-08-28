/**
 * The `hooks.beforeStart` option, which used to be implemented by monkey-patching
 * `superagent.Request.prototype.end` and is now offered by the transport itself.
 *
 * The hook survives the migration; the object it receives does not, and cannot -- it was a
 * superagent `Request`. These tests pin what it is now: the library's own request, with `method`,
 * `url`, `headers` and a `set()` that still takes effect on the request about to leave. A hook that
 * reads the URL or adds a header keeps working, which covers the documented use.
 */
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { createServer } from 'node:http';

import OpenGateAPI from '../../../opengate-api-npm';
import { setBeforeStart } from '../../../src/util/http/RequestSpec';

let server;
let origin;
let lastRequest;

beforeAll(async () => {
    server = createServer((req, res) => {
        req.on('data', () => {});
        req.on('end', () => {
            lastRequest = { method: req.method, url: req.url, headers: req.headers };
            if (req.url.split('?')[0].endsWith('/slow')) {
                setTimeout(() => {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end('{}');
                }, 600);
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

// The registration is process-wide, as the monkey-patch was, so it has to be undone between tests.
afterEach(() => setBeforeStart(undefined));

describe('hooks.beforeStart', () => {
    it('is called once per request, with the verb and the whole url', async () => {
        const seen = [];
        const ogapi = new OpenGateAPI({ url: origin, apiKey: 'the-key', timeout: 2000, hooks: { beforeStart: req => seen.push(req) } });

        await ogapi.Napi.get('provision/devices', undefined, undefined, { name: 'a name' }, false, 'base');

        expect(seen).toHaveLength(1);
        expect(seen[0].method).toBe('GET');
        expect(seen[0].url).toBe(`${origin}/base/provision/devices?name=a%20name`);
    });

    it('can still add a header, which is the documented reason to use it', async () => {
        const ogapi = new OpenGateAPI({
            url: origin,
            apiKey: 'the-key',
            timeout: 2000,
            hooks: { beforeStart: req => req.set('X-Correlation-Id', 'abc-123') }
        });

        await ogapi.Napi.get('devices', undefined, undefined, undefined, false, 'base');

        expect(lastRequest.headers['x-correlation-id']).toBe('abc-123');
    });

    it('sees the headers the transport has already put on the request', async () => {
        let seen;
        const ogapi = new OpenGateAPI({
            url: origin,
            apiKey: 'the-key',
            timeout: 2000,
            hooks: { beforeStart: req => (seen = { ...req.headers }) }
        });

        await ogapi.Napi.get('devices', undefined, { 'X-Wanted': 'yes' }, undefined, false, 'base');

        expect(seen['X-ApiKey']).toBe('the-key');
        expect(seen['X-Wanted']).toBe('yes');
    });

    it('is ignored when it is not a function, rather than breaking every request', async () => {
        const ogapi = new OpenGateAPI({ url: origin, apiKey: 'the-key', timeout: 2000, hooks: { beforeStart: 'not a function' } });
        const res = await ogapi.Napi.get('devices', undefined, undefined, undefined, false, 'base');
        expect(res.statusCode).toBe(200);
    });
});

describe('cancellation and the timeout, which must not depend on the transport', () => {
    // superagent rejected on its own timer and only then called abort. Depending on the transport
    // honouring cancellation instead is fragile: an engine whose fetch ignores AbortSignal drops the
    // timeout silently and the request hangs for as long as the server takes. Obscura 0.2.1 is such
    // an engine, which is how this was found.
    it('rejects on its own timer, not by waiting for the transport to cancel', async () => {
        const ogapi = new OpenGateAPI({ url: origin, apiKey: 'the-key', timeout: 150 });
        const started = Date.now();
        await expect(ogapi.Napi.get('slow', undefined, undefined, undefined, false, 'base')).rejects.toMatchObject({ statusCode: 500 });
        // The fixture takes a second; rejecting near the deadline proves the timer did it.
        expect(Date.now() - started).toBeLessThan(500);
    });

    it('accepts the object form of the timeout, as superagent did', async () => {
        const ogapi = new OpenGateAPI({ url: origin, apiKey: 'the-key', timeout: 5000 });
        await expect(ogapi.Napi.get('slow', { deadline: 150 }, undefined, undefined, false, 'base')).rejects.toMatchObject({
            statusCode: 500
        });
        await expect(ogapi.Napi.get('slow', { response: 150 }, undefined, undefined, false, 'base')).rejects.toMatchObject({
            statusCode: 500
        });
    });

    it('a request aborted before it is sent never goes out', async () => {
        const before = lastRequest;
        const ogapi = new OpenGateAPI({
            url: origin,
            apiKey: 'the-key',
            timeout: 5000,
            hooks: { beforeStart: req => req.abort() }
        });
        await expect(ogapi.Napi.get('devices', undefined, undefined, undefined, false, 'base')).rejects.toBeDefined();
        // Nothing reached the server: the request is refused before fetch is called.
        expect(lastRequest).toBe(before);
    });
});

describe('the timeout option', () => {
    it('treats -1 as no deadline at all', async () => {
        const ogapi = new OpenGateAPI({ url: origin, apiKey: 'the-key', timeout: 2000 });
        const res = await ogapi.Napi.get('devices', -1, undefined, undefined, false, 'base');
        expect(res.statusCode).toBe(200);
    });

    it('falls back to the client-wide timeout when the call does not give one', async () => {
        const ogapi = new OpenGateAPI({ url: origin, apiKey: 'the-key', timeout: 2000 });
        const res = await ogapi.Napi.get('devices', undefined, undefined, undefined, false, 'base');
        expect(res.statusCode).toBe(200);
    });
});
