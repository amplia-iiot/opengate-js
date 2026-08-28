/**
 * What an entity builder does when the datastream carrying its key was never set.
 *
 * It used to dereference undefined: `SimpleBuilder.getEntityKey()` guarded with `!== null`, but
 * `_getEntityKey()` reads a datastream out of the entity and is *undefined* when that datastream is
 * absent, so the guard passed and the next line threw
 * `Cannot read properties of undefined (reading '_value')`.
 *
 * On a delete that is worse than a bad error message. The caller sees a TypeError with nothing about
 * missing parameters in it, assumes a bug rather than a mistake, and the entity is still provisioned.
 * That is exactly how a device was left behind in a production organization. Jira OUW-4885.
 *
 * Every entity builder shares the code path, so every one is checked here.
 */
import { describe, it, expect } from 'vitest';

import OpenGateAPI from '../../../opengate-api-npm';

// A builder needs the organization's allowed datastreams, which normally come from the platform.
// These are constructed directly instead, so the test needs no network.
async function builders() {
    const ogapi = new OpenGateAPI({ url: 'https://offline.invalid', apiKey: 'k', logger: false });
    const { default: DeviceBuilder } = await import('../../../src/provision/entities/DeviceBuilder');
    const { default: AssetBuilder } = await import('../../../src/provision/entities/AssetBuilder');
    const { default: TicketBuilder } = await import('../../../src/provision/entities/TicketBuilder');
    const { default: SubscriberBuilder } = await import('../../../src/provision/entities/SubscriberBuilder');
    const { default: SubscriptionBuilder } = await import('../../../src/provision/entities/SubscriptionBuilder');
    // `with()` ignores a datastream the organization does not allow, so the keys have to be listed.
    const KEYS = [
        'provision.device.identifier',
        'provision.asset.identifier',
        'provision.ticket.identifier',
        'provision.device.communicationModules[].subscriber.identifier',
        'provision.device.communicationModules[].subscription.identifier'
    ];
    const allowed = KEYS.map(identifier => ({ identifier: identifier }));
    const schemas = {};
    KEYS.forEach(identifier => (schemas[identifier] = { value: {} }));
    const make = Cls => new Cls(ogapi, 'org', allowed, schemas, { validate: () => true });
    return {
        device: { builder: make(DeviceBuilder), key: 'provision.device.identifier' },
        asset: { builder: make(AssetBuilder), key: 'provision.asset.identifier' },
        ticket: { builder: make(TicketBuilder), key: 'provision.ticket.identifier' },
        subscriber: { builder: make(SubscriberBuilder), key: 'provision.device.communicationModules[].subscriber.identifier' },
        subscription: { builder: make(SubscriptionBuilder), key: 'provision.device.communicationModules[].subscription.identifier' }
    };
}

describe('an entity builder with no key set', () => {
    it('reports the key as absent rather than dereferencing undefined', async () => {
        const all = await builders();
        Object.entries(all).forEach(([name, { builder }]) => {
            expect(() => builder.getEntityKey(), name).not.toThrow();
            expect(builder.getEntityKey(), name).toBeNull();
        });
    });

    it('refuses to build a URL, and names the datastream that would have provided the key', async () => {
        const all = await builders();
        Object.entries(all).forEach(([name, { builder, key }]) => {
            let thrown;
            try {
                builder._buildURL();
            } catch (error) {
                thrown = error;
            }
            expect(thrown, name).toBeInstanceOf(Error);
            expect(thrown.message, name).toBe('OGAPI_ENTITY_KEY_REQUIRED');
            expect(thrown.parameter, name).toBe(key);
            // The old failure, which said nothing useful.
            expect(thrown.message, name).not.toMatch(/_value/);
        });
    });

    it('builds the URL from the key once it is set', async () => {
        const all = await builders();
        const device = all.device.builder;
        device.with('provision.device.identifier', 'dev-1');
        expect(device.getEntityKey()).toBe('dev-1');
        expect(device._buildURL()).toContain('dev-1');
    });
});
