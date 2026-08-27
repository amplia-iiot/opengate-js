/**
 * The contract of the HTTP layer, pinned before it is rewritten.
 *
 * These tests describe what NorthAmpliaREST does today, on top of superagent: what a resolved
 * response looks like, what a rejection looks like, and which header carries authentication. The
 * migration to fetch has to keep every one of them passing. Where the current behaviour is odd, the
 * test says so rather than quietly blessing it -- the point is to migrate without changing
 * behaviour, and then change behaviour deliberately and separately.
 *
 * A throwaway HTTP server on loopback, so no network and no OpenGate.
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createServer } from 'node:http';

import NorthAmpliaREST from '../../../src/util/NorthAmpliaREST';
import SouthAmpliaREST from '../../../src/util/SouthAmpliaREST';

let server;
let origin;
let lastRequest;

beforeAll(async () => {
    server = createServer((req, res) => {
        const chunks = [];
        req.on('data', c => chunks.push(c));
        req.on('end', () => {
            lastRequest = { method: req.method, url: req.url, headers: req.headers, body: Buffer.concat(chunks).toString() };

            const route = req.url.split('?')[0];
            if (route.endsWith('/ok')) {
                res.writeHead(200, { 'Content-Type': 'application/json', 'X-Custom': 'v' });
                res.end(JSON.stringify({ hello: 'world' }));
            } else if (route.endsWith('/empty')) {
                res.writeHead(204);
                res.end();
            } else if (route.endsWith('/text')) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('plain body');
            } else if (route.endsWith('/missing')) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ errors: [{ code: 404, message: 'not found' }] }));
            } else if (route.endsWith('/broken')) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ errors: [{ code: 500, message: 'boom' }] }));
            } else if (route.endsWith('/slow')) {
                setTimeout(() => {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end('{}');
                }, 3000);
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

const api = extra => new NorthAmpliaREST({ url: origin, apiKey: 'the-key', timeout: 2000, ...extra }, {});

describe('a resolved response', () => {
    it('carries statusCode, status, body, text and headers', async () => {
        const res = await api().get('ok', undefined, undefined, undefined, false, 'base');
        expect(res.statusCode).toBe(200);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ hello: 'world' });
        expect(res.text).toBe('{"hello":"world"}');
        expect(res.headers['x-custom']).toBe('v');
        expect(res.headers['content-type']).toContain('application/json');
    });

    it('lower-cases header names', async () => {
        const res = await api().get('ok', undefined, undefined, undefined, false, 'base');
        expect(Object.keys(res.headers).every(k => k === k.toLowerCase())).toBe(true);
    });

    it('resolves a 204 with no body, which the finders check for explicitly', async () => {
        const res = await api().get('empty', undefined, undefined, undefined, false, 'base');
        expect(res.statusCode).toBe(204);
    });

    it('leaves a non-JSON body in text and does not invent a parsed body', async () => {
        const res = await api().get('text', undefined, undefined, undefined, false, 'base');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('plain body');
    });
});

describe('a rejected response', () => {
    it('rejects a 404 with the platform body under data', async () => {
        await expect(api().get('missing', undefined, undefined, undefined, false, 'base')).rejects.toMatchObject({
            statusCode: 404,
            data: { errors: [{ code: 404, message: 'not found' }] }
        });
    });

    it('includes the response headers in the rejection', async () => {
        try {
            await api().get('missing', undefined, undefined, undefined, false, 'base');
            throw new Error('should have rejected');
        } catch (error) {
            expect(error.headers['content-type']).toContain('application/json');
        }
    });

    it('rejects a 500 the same way', async () => {
        await expect(api().get('broken', undefined, undefined, undefined, false, 'base')).rejects.toMatchObject({
            statusCode: 500,
            data: { errors: [{ code: 500, message: 'boom' }] }
        });
    });

    // Characterisation, not endorsement: a rejection is a plain object, so it carries no stack and
    // fails `instanceof Error`. Changing that is a deliberate, separate, breaking change.
    it('rejects with a plain object rather than an Error', async () => {
        try {
            await api().get('missing', undefined, undefined, undefined, false, 'base');
            throw new Error('should have rejected');
        } catch (error) {
            expect(error).not.toBeInstanceOf(Error);
            expect(Object.keys(error).sort()).toEqual(['data', 'headers', 'statusCode']);
        }
    });

    it('reports an unreachable host as 500 with a generic body', async () => {
        const unreachable = new NorthAmpliaREST({ url: 'http://127.0.0.1:1', timeout: 2000 }, {});
        await expect(unreachable.get('ok', undefined, undefined, undefined, false, 'base')).rejects.toMatchObject({
            statusCode: 500,
            data: { errors: [{ message: 'OGAPI: Something is broken. Please contact with your administrator.' }] }
        });
    });

    it('rejects when the response takes longer than the timeout', async () => {
        await expect(api({ timeout: 150 }).get('slow', undefined, undefined, undefined, false, 'base')).rejects.toBeDefined();
    });
});

describe('authentication', () => {
    it('sends the api key as X-ApiKey', async () => {
        await api().get('ok', undefined, undefined, undefined, false, 'base');
        expect(lastRequest.headers['x-apikey']).toBe('the-key');
        expect(lastRequest.headers.authorization).toBeUndefined();
    });

    it('prefers a JWT over the api key on the north API', async () => {
        await api({ jwt: 'the-token' }).get('ok', undefined, undefined, undefined, false, 'base');
        expect(lastRequest.headers.authorization).toBe('Bearer the-token');
        expect(lastRequest.headers['x-apikey']).toBeUndefined();
    });

    it('does not send the JWT to the south API, which only understands the api key', async () => {
        const south = new SouthAmpliaREST({ url: origin, south: { url: origin }, apiKey: 'the-key', jwt: 'the-token', timeout: 2000 }, {});
        await south.get('ok', undefined, undefined, undefined, false, 'base');
        expect(lastRequest.headers.authorization).toBeUndefined();
        expect(lastRequest.headers['x-apikey']).toBe('the-key');
    });

    it('sends caller headers and skips the ones left undefined', async () => {
        await api().get('ok', undefined, { 'X-Wanted': 'yes', 'X-Skipped': undefined }, undefined, false, 'base');
        expect(lastRequest.headers['x-wanted']).toBe('yes');
        expect(lastRequest.headers['x-skipped']).toBeUndefined();
    });
});

describe('the verbs', () => {
    it('POSTs a JSON body', async () => {
        await api().post('ok', { a: 1 }, undefined, undefined, undefined, 'base');
        expect(lastRequest.method).toBe('POST');
        expect(JSON.parse(lastRequest.body)).toEqual({ a: 1 });
        expect(lastRequest.headers['content-type']).toContain('application/json');
    });

    it('PUTs a JSON body and forces the content type', async () => {
        await api().put('ok', { a: 1 }, undefined, undefined, undefined, 'base');
        expect(lastRequest.method).toBe('PUT');
        expect(lastRequest.headers['content-type']).toContain('application/json');
    });

    it('PATCHes a JSON body', async () => {
        await api().patch('ok', { a: 2 }, undefined, undefined, undefined, 'base');
        expect(lastRequest.method).toBe('PATCH');
        expect(JSON.parse(lastRequest.body)).toEqual({ a: 2 });
    });

    it('DELETEs without a body', async () => {
        await api().delete('ok', undefined, undefined, undefined, undefined, 'base');
        expect(lastRequest.method).toBe('DELETE');
        expect(lastRequest.body).toBe('');
    });

    it('DELETEs with a body when one is given', async () => {
        await api().delete('ok', undefined, undefined, undefined, { why: 'because' }, 'base');
        expect(lastRequest.method).toBe('DELETE');
        expect(JSON.parse(lastRequest.body)).toEqual({ why: 'because' });
    });

    it('puts query parameters on the wire encoded', async () => {
        await api().get('ok', undefined, undefined, { name: 'a name' }, false, 'base');
        expect(lastRequest.url).toBe('/base/ok?name=a%20name');
    });
});
