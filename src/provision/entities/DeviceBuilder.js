'use strict';

import ComplexBuilder from './ComplexBuilder';

const ID = 'provision.device.identifier';


/**
 * Device builder. This builder give you the necessary tools to create a device using our OpenGate REST.
 */
export default class DeviceBuilder extends ComplexBuilder {

    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - this is the organization name where device will be created
     * @param {!array} [allowedDatastreams] - Allowed datastreams to add into the new device
     * @param {!array} [definedSchemas] - Jsonschema about all OpenGate specific types
     * @param {!Validator} [jsonSchemaValidator] - Json schema validator tool
     */
    constructor(ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator) {
        super(ogapi, organization + '/devices', allowedDatastreams, definedSchemas, jsonSchemaValidator);
    }

    _getEntityKey() {
        return this._entity[ID];
    }
}