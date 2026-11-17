/**
 * The `readOnly` option: GET and searches go out, everything else is refused before it is sent.
 *
 * Searches are POSTs in OpenGate and live under several prefixes (`search/`, `timeseries/.../data`,
 * `datasets/...`), so a URL allowlist would rot. The search layer marks its own calls instead, and
 * these tests prove the mark reaches the wire for builders under different prefixes.
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createServer } from 'node:http';

import OpenGateAPI from '../../../opengate-api-npm';

let server;
let origin;
let seen = [];

beforeAll(async () => {
    server = createServer((req, res) => {
        req.on('data', () => {});
        req.on('end', () => {
            seen.push(req.method + ' ' + req.url);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('{}');
        });
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    origin = `http://127.0.0.1:${server.address().port}`;
});

afterAll(() => new Promise(resolve => server.close(resolve)));

const client = extra => new OpenGateAPI({ url: origin, apiKey: 'k', timeout: 2000, south: { url: origin }, ...extra });

const rejectionOf = promise =>
    promise.then(
        () => {
            throw new Error('expected a rejection');
        },
        rejection => rejection
    );

describe('a read-only client', () => {
    it('refuses every writing verb, and nothing reaches the server', async () => {
        const napi = client({ readOnly: true }).Napi;
        const before = seen.length;
        const results = await Promise.allSettled([
            napi.post('provision/organizations/o/devices', {}),
            napi.put('provision/organizations/o/devices/d', {}),
            napi.patch('provision/organizations/o/devices/d', {}),
            napi.delete('provision/organizations/o/devices/d'),
            napi.post_multipart('provision/bulk', {}, {})
        ]);

        for (const result of results) {
            expect(result.status).toBe('rejected');
            expect(result.reason).toMatchObject({ statusCode: 403, reason: 'read-only' });
            expect(result.reason.cause).toBeInstanceOf(Error);
        }
        expect(seen.length).toBe(before);
    });

    it('lets a GET through', async () => {
        await client({ readOnly: true }).Napi.get('provision/organizations');
        expect(seen.at(-1)).toBe('GET /north/v80/provision/organizations');
    });

    it('lets a search builder through', async () => {
        await client({ readOnly: true }).devicesSearchBuilder().build().execute();
        expect(seen.at(-1)).toBe('POST /north/v80/search/entities');
    });

    it('lets a timeseries search through, which is not under search/', async () => {
        await client({ readOnly: true }).timeserieSearchBuilder('my-org', 'my-ts').build().execute();
        expect(seen.at(-1)).toMatch(/^POST \/north\/v80\/+timeseries\/provision\/organizations\/my-org\/my-ts\/data/);
    });

    it('lets a free post to a search/ path through', async () => {
        await client({ readOnly: true }).Napi.post('search/devices', {});
        expect(seen.at(-1)).toBe('POST /north/v80/search/devices');
    });

    it('does not leave the search mark behind for the next call', async () => {
        const ogapi = client({ readOnly: true });
        await ogapi.devicesSearchBuilder().build().execute();
        expect((await rejectionOf(ogapi.Napi.post('provision/organizations', {}))).reason).toBe('read-only');
    });

    it('refuses a South POST', async () => {
        const rejection = await rejectionOf(client({ readOnly: true }).Sapi.post('devices/d/collect/iot', {}));
        expect(rejection.reason).toBe('read-only');
    });
});

describe('a client without readOnly', () => {
    it('sends writes as it always has', async () => {
        await client().Napi.delete('provision/organizations/o/devices/d');
        expect(seen.at(-1)).toBe('DELETE /north/v80/provision/organizations/o/devices/d');
    });
});
