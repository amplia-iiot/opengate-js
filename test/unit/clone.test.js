/**
 * `ogapi.clone(overrides)`: a new client with the same options and some changed. The web GUI uses it
 * to hand widgets a read-only copy of the client it already has (`ogapi.clone({ readOnly: true })`),
 * so a read-only clone must stay read-only whatever the widget asks for.
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
            seen.push({ line: req.method + ' ' + req.url, apiKey: req.headers['x-apikey'] });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('{}');
        });
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    origin = `http://127.0.0.1:${server.address().port}`;
});

afterAll(() => new Promise(resolve => server.close(resolve)));

const client = extra => new OpenGateAPI({ url: origin, apiKey: 'the-key', timeout: 2000, logger: false, ...extra });

const rejectionOf = promise =>
    promise.then(
        () => {
            throw new Error('expected a rejection');
        },
        rejection => rejection
    );

describe('clone()', () => {
    it('gives a new client of the same class, talking to the same platform with the same key', async () => {
        const original = client();
        const copy = original.clone();

        expect(copy).toBeInstanceOf(OpenGateAPI);
        expect(copy).not.toBe(original);
        expect(copy.Napi).not.toBe(original.Napi);

        await copy.Napi.get('provision/organizations');
        expect(seen.at(-1)).toEqual({ line: 'GET /north/v80/provision/organizations', apiKey: 'the-key' });
    });

    it('applies the overrides to the clone and leaves the original alone', () => {
        const original = client();
        const copy = original.clone({ timeout: 1234 });

        expect(copy.Napi._options.timeout).toBe(1234);
        expect(original.Napi._options.timeout).toBe(2000);
    });

    it('makes a read-only copy whose factories are read-only too, while the original still writes', async () => {
        const original = client();
        const widget = original.clone({ readOnly: true });

        expect((await rejectionOf(widget.Napi.delete('provision/organizations/o/devices/d'))).reason).toBe('read-only');
        expect((await rejectionOf(widget.alarms.newCloseBuilder().addAlarmId('a1').build().execute())).reason).toBe('read-only');

        await original.Napi.delete('provision/organizations/o/devices/d');
        expect(seen.at(-1).line).toBe('DELETE /north/v80/provision/organizations/o/devices/d');
    });
});

describe('a read-only client cannot be widened', () => {
    it('keeps readOnly in a clone that does not mention it', async () => {
        const copy = client({ readOnly: true }).clone({ timeout: 1000 });
        expect(copy.Napi._options.timeout).toBe(1000);
        expect((await rejectionOf(copy.Napi.post('provision/organizations', {}))).reason).toBe('read-only');
    });

    it('throws when a clone asks for readOnly: false', () => {
        expect(() => client({ readOnly: true }).clone({ readOnly: false })).toThrow(/read-only/);
    });

    it('keeps the options it clones from out of reach, so tampering cannot widen the next clone', () => {
        const widget = client({ readOnly: true });
        expect(widget._options).toBeUndefined();

        widget.Napi._options.readOnly = false;
        expect(widget.clone().Napi._options.readOnly).toBe(true);
    });
});
