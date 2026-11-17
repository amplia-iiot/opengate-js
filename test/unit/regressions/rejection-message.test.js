/**
 * A rejection was a plain object with no `message`, so widget code written the usual way --
 * `.catch(e => show(e.message || e))` -- showed the operator "[object Object]". Found by a widget
 * runtime on 16.3.0, on a datapoints search the platform refused with a 4xx.
 *
 * The rejection now carries a readable, non-enumerable `message` and `toString()`. It stays a plain
 * object with the same enumerable fields, so serialising, spreading and comparing it are unchanged;
 * turning it into an Error is left for a major version.
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createServer } from 'node:http';

import OpenGateAPI from '../../../opengate-api-npm';

let server;
let origin;

beforeAll(async () => {
    server = createServer((req, res) => {
        req.on('data', () => {});
        req.on('end', () => {
            if (req.url.includes('/search/datapoints')) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ errors: [{ code: 400, message: 'Page size must be at most 1000' }] }));
                return;
            }
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end('');
        });
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    origin = `http://127.0.0.1:${server.address().port}`;
});

afterAll(() => new Promise(resolve => server.close(resolve)));

const client = extra => new OpenGateAPI({ url: origin, apiKey: 'k', timeout: 2000, logger: false, ...extra });

const rejectionOf = promise =>
    promise.then(
        () => {
            throw new Error('expected a rejection');
        },
        rejection => rejection
    );

/** What a widget does with a failure. */
const shown = error => String(error.message || error);

describe('a rejection reads as text', () => {
    it('shows the platform message of a refused search, as a widget would display it', async () => {
        const error = await rejectionOf(client().datapointsSearchBuilder().limit(10000, 1).build().execute());

        expect(shown(error)).toBe('HTTP 400: Page size must be at most 1000');
        expect(`${error}`).toBe('HTTP 400: Page size must be at most 1000');
    });

    it('shows the status alone when the platform sent no errors', async () => {
        const error = await rejectionOf(client().Napi.get('provision/organizations/missing'));
        expect(shown(error)).toBe('HTTP 404');
    });

    it('says why nothing answered', async () => {
        const error = await rejectionOf(new OpenGateAPI({ url: 'http://127.0.0.1:9', apiKey: 'k', timeout: 2000 }).Napi.get('x'));
        expect(shown(error)).toMatch(/^OGAPI: no response \(network\)/);
    });

    it('shows the refusal of a read-only client', async () => {
        const error = await rejectionOf(client({ readOnly: true }).Napi.delete('provision/organizations/o'));
        expect(shown(error)).toBe('OGAPI: read-only client refused DELETE provision/organizations/o');
    });
});

describe('the rejection is otherwise unchanged', () => {
    it('keeps the same enumerable fields, the same JSON, and is still not an Error', async () => {
        const error = await rejectionOf(client().datapointsSearchBuilder().limit(10000, 1).build().execute());

        expect(Object.keys(error).sort()).toEqual(['data', 'headers', 'statusCode']);
        expect(JSON.parse(JSON.stringify(error))).not.toHaveProperty('message');
        expect({ ...error }).not.toHaveProperty('message');
        expect(error).not.toBeInstanceOf(Error);
        expect(error.statusCode).toBe(400);
        expect(error.data).toEqual({ errors: [{ code: 400, message: 'Page size must be at most 1000' }] });
    });
});
