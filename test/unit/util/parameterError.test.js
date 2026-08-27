/**
 * The builders used to reject a parameter with `throw new Error({ message, parameter })`, in 56
 * places, plus six more handing Error an array. Error stringifies whatever it is given, so every
 * one of those threw the message "[object Object]" and lost the code entirely.
 */
import { describe, it, expect } from 'vitest';

import parameterError from '../../../src/util/parameterError';
import Channels from '../../../src/channels/Channels';
import checkType from '../../../src/util/formats/check_types';

describe('parameterError', () => {
    it('puts the code in message, where callers already look', () => {
        expect(parameterError('OGAPI_STRING_PARAMETER', { parameter: 'name' }).message).toBe('OGAPI_STRING_PARAMETER');
    });

    it('is a real Error, so it carries a stack and survives instanceof', () => {
        const error = parameterError('OGAPI_STRING_PARAMETER', { parameter: 'name' });
        expect(error).toBeInstanceOf(Error);
        expect(error.stack).toBeTruthy();
    });

    it('keeps the accompanying fields reachable', () => {
        const error = parameterError('OGAPI_NOT_ALLOWED_PARAMETER', { parameter: '"x"', allowed: '["a"]' });
        expect(error.parameter).toBe('"x"');
        expect(error.allowed).toBe('["a"]');
    });

    it('works with no extra fields at all', () => {
        expect(parameterError('OGAPI_SOMETHING').message).toBe('OGAPI_SOMETHING');
    });
});

describe('a builder rejecting a parameter', () => {
    const channels = () => new Channels({ Napi: { _options: { timeout: 5000 } } });

    it('reports the code rather than [object Object]', () => {
        expect(() => channels().withName(42)).toThrow('OGAPI_STRING_PARAMETER_MAX_LENGTH_50');
    });

    it('names the parameter it refused', () => {
        try {
            channels().withDescription(42);
            throw new Error('should have thrown');
        } catch (error) {
            expect(error.message).toBe('OGAPI_STRING_PARAMETER_MAX_LENGTH_250');
            expect(error.parameter).toBe('description');
        }
    });
});

describe('check_types', () => {
    it('reports the code for a single-reason check', () => {
        try {
            checkType._checkString(42, 'name');
            throw new Error('should have thrown');
        } catch (error) {
            expect(error.message).toBe('OGAPI_STRING_PARAMETER');
            expect(error.parameter).toBe('name');
        }
    });

    it('keeps every reason when a check offers more than one', () => {
        try {
            checkType._checkStringAndLength('too long', 2, 'name');
            throw new Error('should have thrown');
        } catch (error) {
            expect(error.message).toBe('OGAPI_STRING_PARAMETER');
            expect(error.reasons).toHaveLength(2);
            expect(error.reasons[1]).toEqual({ message: 'OGAPI_MAX_LENGTH', parameter: 2 });
        }
    });

    it('leaves no reasons list when there is only one reason', () => {
        try {
            checkType._checkNumber('x', 'count');
            throw new Error('should have thrown');
        } catch (error) {
            expect(error.reasons).toBeUndefined();
        }
    });
});
