'use strict';

import SimpleBuilder from './SimpleBuilder';

export const SubscriberID = 'provision.device.communicationModules[].subscriber.identifier';
/**
 * Subscriber builder. This builder give you the necessary tools to create a subscriber using our OpenGate REST.
 */
export default class SubscriberBuilder extends SimpleBuilder {

    /**
     * Constructor
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - this is the organization name where subscriber will be created
     * @param {!array} [allowedDatastreams] - Allowed datastreams to add into the new subscriber
     * @param {!array} [definedSchemas] - Jsonschema about all OpenGate specific types
     * @param {!Validator} [jsonSchemaValidator] - Json schema validator tool
     */
    constructor(ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout) {
        super(ogapi, organization + '/subscribers', allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout);
    }

    _getEntityKey() {
        return this._entity[SubscriberID];
    }
}