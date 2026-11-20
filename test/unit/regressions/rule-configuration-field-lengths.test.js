/**
 * A rule configuration's description has no length limit on the platform, but the builder capped it at 250
 * characters. Its name allows 250, but the builder capped it at 50.
 *
 * The constructor feeds a loaded rule straight into withDescription, so a rule saved elsewhere with a longer
 * description could not even be opened through ogapi.ruleConfigurationBuilder(): it threw before anything was sent.
 */
import { describe, it, expect } from 'vitest';

import RuleConfigurations from '../../../src/rulesConfiguration/RuleConfigurations';

const ogapi = { Napi: { _options: { timeout: 5000 } } };
const longDescription = 'x'.repeat(1000);

describe('RuleConfigurations description', () => {
    it('accepts a description longer than 250 characters', () => {
        const rule = new RuleConfigurations(ogapi, 'organization', 'channel').withDescription(longDescription);
        expect(rule._description).toBe(longDescription);
    });

    it('loads an existing rule whose description is longer than 250 characters', () => {
        const rule = new RuleConfigurations(ogapi, 'organization', 'channel', 'rule', { description: longDescription });
        expect(rule._description).toBe(longDescription);
    });

    it('still rejects a description that is not a string', () => {
        expect(() => new RuleConfigurations(ogapi, 'organization', 'channel').withDescription(42)).toThrow('OGAPI_STRING_PARAMETER');
    });
});

describe('RuleConfigurations name', () => {
    it('accepts a name of 250 characters', () => {
        const rule = new RuleConfigurations(ogapi, 'organization', 'channel').withName('x'.repeat(250));
        expect(rule._name).toHaveLength(250);
    });

    it('rejects a name longer than 250 characters', () => {
        expect(() => new RuleConfigurations(ogapi, 'organization', 'channel').withName('x'.repeat(251))).toThrow(/maximum length of 250/);
    });

    it('still rejects an empty name', () => {
        expect(() => new RuleConfigurations(ogapi, 'organization', 'channel').withName('')).toThrow();
    });
});
