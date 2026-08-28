'use strict';

import SimpleBuilder from './SimpleBuilder';

export const AssetID = 'provision.asset.identifier';

/**
 * Asset builder. This builder gives you the necessary tools to create an asset using the OpenGate REST API.
 */
export default class AssetBuilder extends SimpleBuilder {
    /**
     * Constructor
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - this is the organization name where subscription will be created
     * @param {!array} [allowedDatastreams] - Allowed datastreams to add into the new subscription
     * @param {!array} [definedSchemas] - Jsonschema about all OpenGate specific types
     * @param {!Validator} [jsonSchemaValidator] - Json schema validator tool
     */
    constructor(ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout) {
        super(ogapi, organization + '/entities', allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout);
        this._entity['resourceType'] = {
            _value: {
                _current: {
                    value: 'entity.asset'
                }
            }
        };
    }

    _getEntityKey() {
        return this._entity[AssetID];
    }

    /** @return {string} the datastream that carries this entity's key, for error messages. */
    _getEntityKeyId() {
        return AssetID;
    }
}
