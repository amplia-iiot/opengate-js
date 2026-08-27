/**
 * Every case here is a ReferenceError that shipped to npm: an identifier the code used but never
 * declared or imported. They were invisible because nothing ever linted or executed these paths.
 * ESLint's no-undef found them; these tests keep them dead.
 */
import { describe, it, expect } from 'vitest';

import ManufacturerMedia from '../../../src/manufacturers/ManufacturerMedia';
import ModelMedia from '../../../src/manufacturers/ModelMedia';
import ByYear from '../../../src/operations/catalog/period/pattern/ByYear';
import SchedulePipelineFinder from '../../../src/schedule/SchedulePipelineFinder';

const ogapi = { Napi: { _options: { timeout: 5000 } }, Sapi: {} };

describe('media update() is refused with a real Error', () => {
    // Was `throw new Exception(...)`. Exception is not a JavaScript global, so callers got an
    // opaque ReferenceError instead of the intended "method not supported".
    it('ManufacturerMedia.update throws OGAPI_METHOD_NOT_SUPPORTED', () => {
        const media = new ManufacturerMedia(ogapi, 'manufacturer-1');
        expect(() => media.update()).toThrow('OGAPI_METHOD_NOT_SUPPORTED');
        expect(() => media.update()).toThrow(Error);
    });

    it('ModelMedia.update throws OGAPI_METHOD_NOT_SUPPORTED', () => {
        const media = new ModelMedia(ogapi, 'manufacturer-1', 'model-1');
        expect(() => media.update()).toThrow('OGAPI_METHOD_NOT_SUPPORTED');
        expect(() => media.update()).toThrow(Error);
    });
});

describe('ByYear.day falls back to the day already set', () => {
    // Was `month = this._day`, copy-pasted from month() without renaming. Assigning to an
    // undeclared identifier inside an ES module is a ReferenceError, so this branch always threw.
    const build = () => new ByYear({}, new Date('2026-01-15T10:00:00Z'), 'yearly');

    it('reuses the stored day when called with a non-number', () => {
        const byYear = build();
        byYear.day(5);
        expect(() => byYear.day('not a number')).not.toThrow();
        expect(byYear._day).toBe(5);
    });

    it('still rejects a non-number when no day has been set yet', () => {
        expect(() => build().day('not a number')).toThrow('Parameter day must be typeof number');
    });

    it('still enforces the 1..31 range', () => {
        expect(() => build().day(32)).toThrow(/greater than 1 and less than 31/);
        expect(() => build().day(0)).toThrow(/greater than 1 and less than 31/);
    });
});

// The fifth fix of this batch, `Q.fcall` -> `q.fcall` in DeviceBuilder.js:481, has no test:
// it lives in WrapperBuilder, a class that file keeps private, so it cannot be exercised without
// standing up a whole device provisioning flow. ESLint's no-undef is an error for src/, which is
// what stops it from coming back.

describe('SchedulePipelineFinder.findByOrganizationAndType', () => {
    // The file used q and HttpStatus without importing either, so this method threw
    // "q is not defined" on its first line, every single time.
    const finderWith = response => {
        const finder = new SchedulePipelineFinder({ Napi: { get: () => Promise.resolve(response) }, Sapi: {} });
        return finder;
    };

    it('resolves with only the entries matching the requested type', async () => {
        const finder = finderWith({
            statusCode: 200,
            body: [
                { type: 'A', id: 1 },
                { type: 'B', id: 2 }
            ]
        });
        await expect(finder.findByOrganizationAndType('org', 'A')).resolves.toEqual({
            data: [{ type: 'A', id: 1 }],
            statusCode: 200
        });
    });

    it('rejects with 404 when no entry matches', async () => {
        const finder = finderWith({ statusCode: 200, body: [{ type: 'B' }] });
        await expect(finder.findByOrganizationAndType('org', 'A')).rejects.toMatchObject({ statusCode: 404 });
    });

    it('rejects with 404 when the API answers 204 No Content', async () => {
        const finder = finderWith({ statusCode: 204 });
        await expect(finder.findByOrganizationAndType('org', 'A')).rejects.toMatchObject({
            statusCode: 404,
            data: 'Schedule not found'
        });
    });
});
