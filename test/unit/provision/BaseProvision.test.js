import { describe, it, expect } from 'vitest';

import BaseProvision from '../../../src/provision/BaseProvision';

class TestProvision extends BaseProvision {
    constructor(ogapi, requiredParameters) {
        super(ogapi, '/things', undefined, requiredParameters);
    }
    _composeElement() {
        return {};
    }
    _buildURL() {
        return this._resource;
    }
}

const ogapi = { Napi: { _options: { timeout: 5000 } } };

describe('BaseProvision as an abstract class', () => {
    it('refuses to be instantiated directly', () => {
        expect(() => new BaseProvision(ogapi, '/things')).toThrow('Cannot construct Abstract instances directly');
    });

    it('demands that a subclass provides _composeElement', () => {
        class Incomplete extends BaseProvision {
            _buildURL() {
                return '';
            }
        }
        expect(() => new Incomplete(ogapi, '/things')).toThrow(/composeElement/);
    });

    it('demands that a subclass provides _buildURL', () => {
        class Incomplete extends BaseProvision {
            _composeElement() {
                return {};
            }
        }
        expect(() => new Incomplete(ogapi, '/things')).toThrow(/_buildURL/);
    });
});

describe('BaseProvision._checkRequiredParameters', () => {
    it('passes when there is nothing to require', () => {
        expect(() => new TestProvision(ogapi, [])._checkRequiredParameters()).not.toThrow();
    });

    it('names every missing parameter, not just the first', () => {
        const provision = new TestProvision(ogapi, ['identifier', 'name']);
        expect(() => provision._checkRequiredParameters()).toThrow(/identifier,name/);
    });

    it('accepts a parameter set through its underscore-prefixed field', () => {
        const provision = new TestProvision(ogapi, ['identifier']);
        provision._identifier = 'abc';
        expect(() => provision._checkRequiredParameters()).not.toThrow();
    });

    it('prefixes the resource with provision/, which is what builds the request path', () => {
        expect(new TestProvision(ogapi, [])._resource).toBe('provision/things');
    });
});
