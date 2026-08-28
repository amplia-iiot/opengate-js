/**
 * The `mocks` option, which the Cucumber suite drives and which superagent-mocker used to provide.
 *
 * Reimplementing it was not optional collateral: dropping superagent drops its mocker, and the
 * scenarios tagged with a mock go through `NorthAmpliaREST._applyMocks`. These tests hold the
 * reimplementation to the original behaviour, quirks included -- including the one that matters
 * most, that a pattern has to spell out the whole path after the origin.
 */
import { describe, it, expect, afterEach } from 'vitest';

import NorthAmpliaREST from '../../../src/util/NorthAmpliaREST';
import { clear } from '../../../src/util/http/mockRouter';

// The registry is process-wide, exactly as superagent-mocker's was, so a test that leaves routes
// behind would answer the next one's requests.
afterEach(() => clear());

// Port 1 is not listening. Any request that is not mocked fails, which makes "was it mocked?"
// unambiguous and keeps the suite off the network.
const api = mocks => new NorthAmpliaREST({ url: 'http://127.0.0.1:1', apiKey: 'the-key', timeout: 1000, mocks: mocks }, {});

describe('matching', () => {
    it('answers when the pattern spells out the whole path, north/v80 included', async () => {
        const res = await api({
            post: { '/north/v80/provision/users/:user/reset': req => ({ statusCode: 200, status: 200, body: { seen: req.params.user } }) }
        }).post('provision/users/bob/reset', {});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ seen: 'bob' });
    });

    // Not an endorsement. `features/support/mocks/resetPassword.js` registers exactly this shape,
    // without the prefix, so those two routes have never intercepted anything and those scenarios
    // have been reaching the real platform. Recorded here so the next reader knows it is the mock
    // that is wrong, not the router.
    it('does not answer when the pattern omits the base path, as it never did', async () => {
        await expect(
            api({ post: { '/provision/users/:user/reset': () => ({ statusCode: 200, status: 200 }) } }).post(
                'provision/users/bob/reset',
                {}
            )
        ).rejects.toMatchObject({ statusCode: 500 });
    });

    it('matches a literal query string, and only when it is there', async () => {
        const mocks = {
            get: {
                '/north/v80/provision/organizations/:organization/devicePlans?visibility=administrable': () => ({
                    statusCode: 200,
                    status: 200,
                    body: { ok: 1 }
                })
            }
        };
        const res = await api(mocks).get('provision/organizations/acme/devicePlans', undefined, undefined, { visibility: 'administrable' });
        expect(res.body).toEqual({ ok: 1 });

        await expect(api(mocks).get('provision/organizations/acme/devicePlans')).rejects.toMatchObject({ statusCode: 500 });
    });

    it('keeps a parameter inside one path segment', async () => {
        await expect(
            api({ get: { '/north/v80/provision/organizations/:organization': () => ({ statusCode: 200, status: 200 }) } }).get(
                'provision/organizations/acme/devicePlans'
            )
        ).rejects.toMatchObject({ statusCode: 500 });
    });

    it('does not answer a different verb', async () => {
        await expect(
            api({ get: { '/north/v80/provision/organizations': () => ({ statusCode: 200, status: 200 }) } }).post(
                'provision/organizations',
                {}
            )
        ).rejects.toMatchObject({ statusCode: 500 });
    });

    it('maps del onto DELETE, the name superagent-mocker used', async () => {
        const res = await api({
            del: { '/north/v80/provision/organizations/:organization': () => ({ statusCode: 200, status: 200, body: { gone: true } }) }
        }).delete('provision/organizations/acme');
        expect(res.body).toEqual({ gone: true });
    });
});

describe('what the handler receives', () => {
    it('gets the sent body, and an empty object when nothing was sent', async () => {
        let seen;
        const mocks = {
            post: {
                '/north/v80/things': req => {
                    seen = req.body;
                    return { statusCode: 200, status: 200 };
                }
            }
        };
        await api(mocks).post('things', { password: 'secret' });
        expect(seen).toEqual({ password: 'secret' });

        await api(mocks).post('things');
        // The mocks index straight into req.body, so undefined would throw inside the handler.
        expect(seen).toEqual({});
    });

    it('gets the request headers, lower-cased', async () => {
        let seen;
        await api({
            get: {
                '/north/v80/things': req => {
                    seen = req.headers;
                    return { statusCode: 200, status: 200 };
                }
            }
        }).get('things', undefined, { 'X-Wanted': 'yes', 'X-Skipped': undefined });
        expect(seen['x-wanted']).toBe('yes');
        expect(seen['x-apikey']).toBe('the-key');
        expect('x-skipped' in seen).toBe(false);
    });
});

describe('the response', () => {
    it('is the handler object itself, defaulted to status 200', async () => {
        const res = await api({ get: { '/north/v80/things': () => ({ body: { plain: true } }) } }).get('things');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ plain: true });
    });

    it('rejects when the handler returns a failure, carrying it as data', async () => {
        await expect(
            api({ get: { '/north/v80/things': () => ({ statusCode: 404, status: 404, body: { errors: [] } }) } }).get('things')
        ).rejects.toMatchObject({
            statusCode: 404,
            data: { errors: [] }
        });
    });

    it('accepts a plain object instead of a function, and is given headers to carry', async () => {
        const res = await api({ get: { '/north/v80/things': { statusCode: 200, status: 200, body: { fixed: true } } } }).get('things');
        expect(res.body).toEqual({ fixed: true });
        expect(res.headers).toEqual({});
    });

    it('lets the last registered route win when two match', async () => {
        const res = await api({
            get: {
                '/north/v80/things': () => ({ statusCode: 200, status: 200, body: { which: 'first' } }),
                '/north/v80/:anything': () => ({ statusCode: 200, status: 200, body: { which: 'second' } })
            }
        }).get('things');
        expect(res.body).toEqual({ which: 'second' });
    });
});
