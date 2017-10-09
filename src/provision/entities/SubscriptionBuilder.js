'use strict';

import SimpleBuilder from './SimpleBuilder';

const ID = 'provision.device.communicationModules[].subscription.identifier';

export default class SubscriptionBuilder extends SimpleBuilder {
    constructor(ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator) {
        super(ogapi, organization + '/subscriptions', allowedDatastreams, definedSchemas, jsonSchemaValidator);
    }

    _getEntityKey() {
        return this._entity[ID];
    }
}