/**
 * The response shapes, measured against superagent 3.8 before it was removed.
 *
 * http-contract.test.js pins what callers were known to read. This file pins the awkward edges it
 * did not cover, each one recorded from the superagent implementation on a loopback server and then
 * required of the fetch one:
 *
 *   - `body` is `{}` when there was nothing to parse, and the empty *string* when the response is
 *     JSON with an empty body.
 *   - `text` is `undefined` for a binary content type, not ''.
 *   - A JSON body that will not parse fails the whole request, rather than resolving with no body.
 *   - `header` and `headers` are the same object. `res.header.location` is read on 25 code paths.
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createServer } from 'node:http';

import NorthAmpliaREST from '../../../src/util/NorthAmpliaREST';

let server;
let origin;

beforeAll(async () => {
    server = createServer((req, res) => {
        req.on('data', () => {});
        req.on('end', () => {
            const route = req.url.split('?')[0];
            if (route.endsWith('/json')) {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ hello: 'world' }));
            } else if (route.endsWith('/empty')) {
                res.writeHead(204);
                res.end();
            } else if (route.endsWith('/text')) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('plain body');
            } else if (route.endsWith('/untyped')) {
                res.writeHead(200);
                res.end('raw bytes');
            } else if (route.endsWith('/emptyjson')) {
                res.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': '0' });
                res.end();
            } else if (route.endsWith('/badjson')) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end('{not json');
            } else if (route.endsWith('/binary')) {
                res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
                res.end(Buffer.from([1, 2, 3, 4]));
            } else if (route.endsWith('/created')) {
                res.writeHead(201, { Location: 'https://example.invalid/thing/7' });
                res.end();
            } else {
                res.writeHead(418);
                res.end();
            }
        });
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    origin = `http://127.0.0.1:${server.address().port}`;
});

afterAll(() => new Promise(resolve => server.close(resolve)));

const api = () => new NorthAmpliaREST({ url: origin, apiKey: 'the-key', timeout: 2000 }, {});
const get = (route, asBlob) => api().get(route, undefined, undefined, undefined, asBlob === true, 'base');

describe('the body', () => {
    it('parses JSON and keeps the raw text alongside it', async () => {
        const res = await get('json');
        expect(res.body).toEqual({ hello: 'world' });
        expect(res.text).toBe('{"hello":"world"}');
    });

    it('is an empty object, not null, when there was nothing to parse', async () => {
        const res = await get('text');
        expect(res.body).toEqual({});
        expect(res.text).toBe('plain body');
    });

    it('is an empty object on a 204', async () => {
        const res = await get('empty');
        expect(res.body).toEqual({});
        expect(res.text).toBe('');
    });

    // superagent's own expression was `res.text && JSON.parse(res.text)`, so an empty JSON body
    // short-circuits to the empty string rather than to null or {}.
    it('is the empty string when the response is JSON with an empty body', async () => {
        const res = await get('emptyjson');
        expect(res.body).toBe('');
    });

    it('fails the request when a JSON body will not parse', async () => {
        await expect(get('badjson')).rejects.toMatchObject({ statusCode: 500 });
    });
});

describe('the text', () => {
    it('is populated when the response carries no content type at all', async () => {
        const res = await get('untyped');
        expect(res.text).toBe('raw bytes');
        expect(res.type).toBe('');
    });

    it('is undefined, not empty, for a binary content type', async () => {
        const res = await get('binary');
        expect(res.text).toBeUndefined();
        expect(res.body).toEqual({});
    });
});

describe('asBlob', () => {
    it('hands Node the bytes as a Buffer, which is what superagent did here', async () => {
        const res = await get('binary', true);
        expect(Buffer.isBuffer(res.body)).toBe(true);
        expect([...res.body]).toEqual([1, 2, 3, 4]);
        expect(res.text).toBeUndefined();
    });
});

describe('the headers', () => {
    it('exposes the same object as both header and headers', async () => {
        const res = await get('json');
        expect(res.header).toBe(res.headers);
    });

    // Read on 25 code paths, every one of them after a create.
    it('carries location under header, where every create path reads it', async () => {
        const res = await get('created');
        expect(res.statusCode).toBe(201);
        expect(res.header.location).toBe('https://example.invalid/thing/7');
    });

    it('splits the charset out of the content type', async () => {
        const res = await get('json');
        expect(res.type).toBe('application/json');
        expect(res.charset).toBe('utf-8');
    });
});

describe('the status sugar superagent exposed', () => {
    it('flags a 204 as noContent and a 201 as created', async () => {
        expect((await get('empty')).noContent).toBe(true);
        expect((await get('created')).created).toBe(true);
    });

    it('marks a 2xx as ok with no error', async () => {
        const res = await get('json');
        expect(res.ok).toBe(true);
        expect(res.error).toBe(false);
        expect(res.statusType).toBe(2);
    });
});
