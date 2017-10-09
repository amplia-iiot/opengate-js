'use strict';

import SimpleBuilder from './SimpleBuilder';

const ID = 'provision.device.communicationModules[].subscriber.identifier';

export default class SubscriberBuilder extends SimpleBuilder {
    constructor(ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator) {
        super(ogapi, organization + '/subscribers', allowedDatastreams, definedSchemas, jsonSchemaValidator);
    }

    _getEntityKey() {
        return this._entity[ID];
    }
}