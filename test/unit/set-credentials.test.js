/**
 * `ogapi.setCredentials({ apiKey, jwt })`: a credential renewed while the client lives. Asked by a
 * widget runtime that refreshes its view token every few minutes and was writing the private
 * `Napi._options.apiKey` to do it.
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createServer } from 'node:http';

import OpenGateAPI from '../../opengate-api-npm';

let server;
let origin;
let seen = [];

beforeAll(async () => {
    server = createServer((req, res) => {
        req.on('data', () => {});
        req.on('end', () => {
            seen.push({ apiKey: req.headers['x-apikey'], authorization: req.headers.authorization });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('{}');
        });
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    origin = `http://127.0.0.1:${server.address().port}`;
});

afterAll(() => new Promise(resolve => server.close(resolve)));

const client = extra => new OpenGateAPI({ url: origin, apiKey: 'old-key', timeout: 2000, logger: false, ...extra });

describe('setCredentials()', () => {
    it('sends the new api key from the next request on', async () => {
        const ogapi = client();
        await ogapi.Napi.get('provision/organizations');
        expect(seen.at(-1).apiKey).toBe('old-key');

        expect(ogapi.setCredentials({ apiKey: 'new-key' })).toBe(ogapi);
        await ogapi.Napi.get('provision/organizations');
        expect(seen.at(-1).apiKey).toBe('new-key');
    });

    it('reaches searches and the South client too', async () => {
        const ogapi = client({ south: { url: origin } }).setCredentials({ apiKey: 'new-key' });
        await ogapi.devicesSearchBuilder().build().execute();
        expect(seen.at(-1).apiKey).toBe('new-key');
        expect(ogapi.Sapi._options.apiKey).toBe('new-key');
    });

    it('renews a jwt, which still takes precedence over the api key', async () => {
        const ogapi = client({ jwt: 'old-jwt' }).setCredentials({ jwt: 'new-jwt' });
        await ogapi.Napi.get('provision/organizations');
        expect(seen.at(-1).authorization).toBe('Bearer new-jwt');
        expect(seen.at(-1).apiKey).toBeUndefined();
    });

    it('removes a credential passed as undefined, falling back to the other one', async () => {
        const ogapi = client({ jwt: 'a-jwt' }).setCredentials({ jwt: undefined });
        await ogapi.Napi.get('provision/organizations');
        expect(seen.at(-1)).toEqual({ apiKey: 'old-key', authorization: undefined });
    });

    it('keeps a read-only client read-only', async () => {
        const widget = client({ readOnly: true }).setCredentials({ apiKey: 'new-key' });
        const rejection = await widget.Napi.delete('provision/organizations/o/devices/d').then(
            () => null,
            error => error
        );
        expect(rejection.reason).toBe('read-only');
    });

    it('accepts nothing but apiKey and jwt', () => {
        const ogapi = client({ readOnly: true });
        expect(() => ogapi.setCredentials({ readOnly: false })).toThrow(/only takes apiKey and jwt, not readOnly/);
        expect(() => ogapi.setCredentials({ apiKey: 'k', url: 'https://elsewhere' })).toThrow(/not url/);
        expect(() => ogapi.setCredentials({})).toThrow(/only takes apiKey and jwt/);
        expect(() => ogapi.setCredentials()).toThrow(/takes an object/);
        expect(() => ogapi.setCredentials({ apiKey: 42 })).toThrow(/must be a string/);
        expect(ogapi.Napi._options.readOnly).toBe(true);
        expect(ogapi.Napi._options.url).toBe(origin);
    });

    it('is inherited by later clones, not by earlier ones', () => {
        const ogapi = client();
        const before = ogapi.clone();
        ogapi.setCredentials({ apiKey: 'new-key' });
        const after = ogapi.clone();

        expect(before.Napi._options.apiKey).toBe('old-key');
        expect(after.Napi._options.apiKey).toBe('new-key');
    });
});
