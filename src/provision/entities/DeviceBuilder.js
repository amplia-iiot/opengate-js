'use strict';

import ComplexBuilder from './ComplexBuilder';

const ID = 'provision.device.identifier';

export default class SubscriberBuilder extends ComplexBuilder {
    constructor(ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator) {
        super(ogapi, organization + '/devices', allowedDatastreams, definedSchemas, jsonSchemaValidator);
    }

    _getEntityKey() {
        return this._entity[ID];
    }
}