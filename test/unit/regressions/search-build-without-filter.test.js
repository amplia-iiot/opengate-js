/**
 * Builders that compose a body with no filter at all.
 *
 * `Search`, `WPSearch` and `SearchWithoutLimit` used the `merge` package to compose the request
 * body, and `merge(filter, limit, group, select)` quietly tolerated `filter` being `undefined`,
 * returning a fresh object. Dropping that dependency for `Object.assign` — done to close
 * CVE-2020-28499 — reintroduced the argument as the assign *target*, and every builder that never
 * sets a filter started throwing `Cannot convert undefined or null to object` on `build()`.
 *
 * Eight of them did: the basic-type catalogues (resource types, IoT datastream access, period and
 * storage period) and the ticket catalogues (priority, severity, status). The live e2e lanes caught
 * it; the unit suite did not, because nothing here ever built a search without filtering first.
 *
 * Pinned so the composition keeps seeding a new object rather than writing into its first argument.
 */
import { describe, it, expect } from 'vitest';

import OpenGateAPI from '../../../opengate-api-npm';

const api = () => new OpenGateAPI({ url: 'https://offline.invalid', apiKey: 'k', logger: false });

/** The builders that reach build() with nothing filtered, named as the e2e coverage lane names them. */
const UNFILTERED = [
    'allowedResourceTypeSearchBuilder',
    'resourceTypeSearchBuilder',
    'ioTDatastreamAccessSearchBuilder',
    'ioTDatastreamPeriodSearchBuilder',
    'ioTDatastreamStoragePeriodSearchBuilder',
    'ticketPrioritySearchBuilder',
    'ticketSeveritySearchBuilder',
    'ticketStatusSearchBuilder'
];

describe('building a search that carries no filter', () => {
    it.each(UNFILTERED)('%s builds instead of throwing', builder => {
        const ogapi = api();
        expect(typeof ogapi[builder], `${builder} should exist on the API`).toBe('function');
        expect(() => ogapi[builder]().build()).not.toThrow();
    });

    it('composes a body rather than writing into the filter it was handed', () => {
        const search = api().organizationsSearchBuilder().limit(1, 1).build();
        expect(search._postObj).toBeTypeOf('object');
        expect(search._postObj).not.toBeNull();
    });
});
