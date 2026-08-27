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

    // Characterisation test, not an endorsement: query parameter VALUES are not encoded, so a
    // value carrying a space or an '&' produces a malformed URL. Documented here so that fixing
    // it is a visible, deliberate change rather than a silent one.
    it('encodes each path segment but leaves the query string alone', () => {
        const url = north()._createUrl('provision/devices/a device', { name: 'a name' });
        expect(url).toBe('https://api.example.com/north/v80/provision/devices/a%20device?name=a name');
    });

    it('honours an explicit service base URL instead of the default version', () => {
        expect(north()._createUrl('things', undefined, 'v90')).toBe('https://api.example.com/v90/things');
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
});
