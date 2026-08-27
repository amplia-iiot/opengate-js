import { describe, it, expect } from 'vitest';

import NorthAmpliaREST from '../../../src/util/NorthAmpliaREST';
import SouthAmpliaREST from '../../../src/util/SouthAmpliaREST';

const OPTIONS = {
    url: 'https://api.example.com',
    south: { url: 'https://south.example.com' }
};

const north = () => new NorthAmpliaREST(OPTIONS, {});
const south = () => new SouthAmpliaREST(OPTIONS, {});

describe('NorthAmpliaREST options', () => {
    it('applies the default timeout when the caller does not set one', () => {
        expect(north()._options.timeout).toBe(5000);
    });

    it('lets the caller override the default timeout', () => {
        const api = new NorthAmpliaREST({ ...OPTIONS, timeout: 120000 }, {});
        expect(api._options.timeout).toBe(120000);
    });

    it('does not mutate the options object it is given', () => {
        const options = { url: 'https://api.example.com' };
        new NorthAmpliaREST(options, {});
        expect(options).toEqual({ url: 'https://api.example.com' });
    });
});

describe('NorthAmpliaREST._createUrl', () => {
    it('places the north API version between the host and the resource', () => {
        expect(north()._createUrl('provision/devices')).toBe('https://api.example.com/north/v80/provision/devices');
    });

    it('appends the first query parameter with ? and the rest with &', () => {
        const url = north()._createUrl('search/entities', { limit: 10, flattened: true });
        expect(url).toBe('https://api.example.com/north/v80/search/entities?limit=10&flattened=true');
    });

    it('honours an explicit service base URL instead of the default version', () => {
        expect(north()._createUrl('things', undefined, 'v90')).toBe('https://api.example.com/v90/things');
    });
});

describe('NorthAmpliaREST._createUrl encoding', () => {
    it('encodes path segments and query values alike', () => {
        const url = north()._createUrl('provision/devices/a device', { name: 'a name' });
        expect(url).toBe('https://api.example.com/north/v80/provision/devices/a%20device?name=a%20name');
    });

    // Values used to be interpolated raw, and Node rejects a request path with unescaped
    // characters outright (ERR_UNESCAPED_CHARACTERS), so such a request never left the process.
    it('never leaves a character Node would reject in the path', () => {
        const url = north()._createUrl('provision/devices', { name: 'a name', note: 'ok?yes' });
        expect(url).not.toMatch(/[ <>"{}|\\^`]/);
        expect(() => new URL(url)).not.toThrow();
    });

    it('escapes an ampersand so a value cannot forge an extra parameter', () => {
        expect(north()._createUrl('x', { name: 'a&b=c' })).toBe('https://api.example.com/north/v80/x?name=a%26b%3Dc');
    });

    it('escapes a slash so a value cannot escape into the path', () => {
        expect(north()._createUrl('x', { name: 'a/b' })).toBe('https://api.example.com/north/v80/x?name=a%2Fb');
    });

    // Pre-encoding was the only way callers could get a space through before, so encoding those
    // again would break exactly the people who worked around the bug.
    it('leaves an existing percent-escape untouched rather than double-encoding it', () => {
        expect(north()._createUrl('x', { name: 'a%20name' })).toBe('https://api.example.com/north/v80/x?name=a%20name');
    });

    it('still escapes a percent sign that is not an escape sequence', () => {
        expect(north()._createUrl('x', { discount: '100%' })).toBe('https://api.example.com/north/v80/x?discount=100%25');
    });

    it('stringifies an array the way the geocluster finder relies on', () => {
        expect(north()._createUrl('x', { topRight: [1, 2] })).toBe('https://api.example.com/north/v80/x?topRight=1%2C2');
    });
});

describe('SouthAmpliaREST', () => {
    it('reads its host from options.south and drops the north/ prefix', () => {
        expect(south()._createUrl('devices')).toBe('https://south.example.com/v80/devices');
    });

    it('is flagged as south so that authentication can tell the two APIs apart', () => {
        expect(south()._isSouth).toBe(true);
        expect(north()._isSouth).toBeUndefined();
    });

    // Without the guard this is a TypeError about reading 'url' of undefined, raised deep inside
    // URL composition, which tells the caller nothing about what they forgot to configure.
    it('says plainly that the south url is missing instead of failing as a TypeError', () => {
        const misconfigured = new SouthAmpliaREST({ url: 'https://api.example.com' }, {});
        expect(() => misconfigured._createUrl('devices')).toThrow('OGAPI_SOUTH_URL_NOT_CONFIGURED');
    });

    it('says the same when south is present but carries no url', () => {
        const misconfigured = new SouthAmpliaREST({ url: 'https://api.example.com', south: {} }, {});
        expect(() => misconfigured._createUrl('devices')).toThrow('OGAPI_SOUTH_URL_NOT_CONFIGURED');
    });
});
