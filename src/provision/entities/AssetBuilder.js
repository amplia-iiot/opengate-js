'use strict';

import SimpleBuilder from './SimpleBuilder';

export const AssetID = 'provision.asset.identifier';

/**
 * Subscription builder. This builder give you the necessary tools to create a subscription using our OpenGate REST.
 */
export default class AssetBuilder extends SimpleBuilder {

    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - this is the organization name where subscription will be created
     * @param {!array} [allowedDatastreams] - Allowed datastreams to add into the new subscription
     * @param {!array} [definedSchemas] - Jsonschema about all OpenGate specific types
     * @param {!Validator} [jsonSchemaValidator] - Json schema validator tool
     */
    constructor(ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator) {
        super(ogapi, organization + '/entities', allowedDatastreams, definedSchemas, jsonSchemaValidator);
        this._entity['resourceType'] = {
            "_value": {
                "_current": {
                    "value": "entity.asset"
                }
            }
        }
    };


    _getEntityKey() {
        return this._entity[AssetID];
    }

}