'use strict';

import SimpleBuilder from './SimpleBuilder';

export const SubscriptionID = 'provision.device.communicationModules[].subscription.identifier';

/**
 * Subscription builder. This builder give you the necessary tools to create a subscription using our OpenGate REST.
 */
export default class SubscriptionBuilder extends SimpleBuilder {

    /**
     * Constructor
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - this is the organization name where subscription will be created
     * @param {!array} [allowedDatastreams] - Allowed datastreams to add into the new subscription
     * @param {!array} [definedSchemas] - Jsonschema about all OpenGate specific types
     * @param {!Validator} [jsonSchemaValidator] - Json schema validator tool
     */
    constructor(ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout) {
        super(ogapi, organization + '/subscriptions', allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout);
    }

    _getEntityKey() {
        return this._entity[SubscriptionID];
    }
}