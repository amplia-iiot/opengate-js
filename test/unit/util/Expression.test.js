import { describe, it, expect } from 'vitest';

import Ex from '../../../src/util/Expression';

describe('Expression comparison operators', () => {
    const cases = [
        ['eq', Ex.eq],
        ['neq', Ex.neq],
        ['like', Ex.like],
        ['gt', Ex.gt],
        ['lt', Ex.lt],
        ['gte', Ex.gte],
        ['lte', Ex.lte]
    ];

    it.each(cases)('%s wraps the field and value under its own operator key', (name, operator) => {
        expect(operator('collected.serialNumber', 'SN-1')).toEqual({
            [name]: { 'collected.serialNumber': 'SN-1' }
        });
    });

    it('keeps a dotted field name as a single key rather than nesting it', () => {
        expect(Object.keys(Ex.eq('device.identifier', 'x').eq)).toEqual(['device.identifier']);
    });
});

describe('Expression.in', () => {
    it('carries the whole list as the value', () => {
        expect(Ex.in('provision.device.identifier', ['a', 'b'])).toEqual({
            in: { 'provision.device.identifier': ['a', 'b'] }
        });
    });
});

describe('Expression.and / Expression.or', () => {
    it('collects every argument into an array under the operator', () => {
        const left = Ex.eq('a', 1);
        const right = Ex.eq('b', 2);
        expect(Ex.and(left, right)).toEqual({ and: [left, right] });
        expect(Ex.or(left, right)).toEqual({ or: [left, right] });
    });

    it('nests, so that a compound expression can be an operand of another', () => {
        const nested = Ex.or(Ex.eq('a', 1), Ex.and(Ex.eq('b', 2), Ex.eq('c', 3)));
        expect(nested).toEqual({
            or: [{ eq: { a: 1 } }, { and: [{ eq: { b: 2 } }, { eq: { c: 3 } }] }]
        });
    });
});
