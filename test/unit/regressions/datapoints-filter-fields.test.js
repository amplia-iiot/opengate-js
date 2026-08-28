/**
 * The filter field paths DatapointsSearchBuilder puts on the wire.
 *
 * Every helper on that builder used to compose a `datapoint.*` path — `datapoint.device`,
 * `datapoint.datastream`, `datapoint.feed`, `datapoint.at` — and OpenGate rejects all four with
 * `Field in filter unknown`, so **every** search built through them answered 400. It failed for
 * devices that had been reporting for months, which is what made it look like missing data rather
 * than a wrong field name. Jira OUW-4884.
 *
 * The correct paths come from the platform itself, via
 * `ogapi.datapointsSearchBuilder().findAllFields()`, and each was confirmed against
 * api.opengate.es. Pinned here so the names cannot drift back.
 */
import { describe, it, expect } from 'vitest';

import OpenGateAPI from '../../../opengate-api-npm';

const api = () => new OpenGateAPI({ url: 'https://offline.invalid', apiKey: 'k', logger: false });

/** The request body a built search will send, without going near the network. */
function bodyOf(search) {
    return JSON.stringify(search._postObj || {});
}

describe('the composed filter', () => {
    it('names the device as datapoints.entityIdentifier', () => {
        const search = api().datapointsSearchBuilder().withDeviceId('dev-1').limit(1, 1).build();
        expect(bodyOf(search)).toContain('datapoints.entityIdentifier');
        expect(bodyOf(search)).not.toContain('datapoint.device');
    });

    it('names the datastream as datapoints.datastreamId', () => {
        const search = api().datapointsSearchBuilder().withDatastream('device.temperature.value').limit(1, 1).build();
        expect(bodyOf(search)).toContain('datapoints.datastreamId');
        expect(bodyOf(search)).not.toContain('datapoint.datastream');
    });

    it('names the feed as datapoints._current.feedId', () => {
        const search = api().datapointsSearchBuilder().withFeed('feed-1').limit(1, 1).build();
        expect(bodyOf(search)).toContain('datapoints._current.feedId');
        expect(bodyOf(search)).not.toContain('datapoint.feed');
    });

    it('names the timestamp as datapoints._current.at, on both bounds', () => {
        const search = api()
            .datapointsSearchBuilder()
            .betweenDates(new Date('2026-01-01T00:00:00Z'), new Date('2026-01-02T00:00:00Z'))
            .limit(1, 1)
            .build();
        const filter = bodyOf(search);
        expect(filter).toContain('datapoints._current.at');
        expect(filter).not.toContain('datapoint.at');
        // Both the gt and the lt bound, so a window is a window.
        expect((filter.match(/datapoints\._current\.at/g) || []).length).toBe(2);
    });

    it('never sends a singular datapoint. path, whichever helpers are combined', () => {
        const search = api()
            .datapointsSearchBuilder()
            .withDeviceId('dev-1')
            .withDatastream('device.temperature.value')
            .withFeed('feed-1')
            .betweenDates(new Date('2026-01-01T00:00:00Z'), new Date('2026-01-02T00:00:00Z'))
            .limit(1, 1)
            .build();
        expect(bodyOf(search)).not.toMatch(/"datapoint\./);
    });
});
