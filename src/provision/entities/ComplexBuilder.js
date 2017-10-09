'use strict';

import SimpleBuilder from './SimpleBuilder';

export default class ComplexBuilder extends SimpleBuilder {
    constructor(ogapi, resource, allowedDatastreams, definedSchemas, jsonSchemaValidator) {
        super(ogapi, resource, allowedDatastreams, definedSchemas, jsonSchemaValidator);
    }

    withComplex(_id, idCommunicationModules, val) {
        if (!idCommunicationModules) {
            console.warn('Communication module identifier not defined. This value wil be ignored');
            return this;
        }

        if (!val) {
            delete this._entity[_id];
            return this;
        }
        if (this.getAllowedDatastreams().filter(function(ds) { return ds.identifier === _id; }).length !== 1) {
            console.warn('Datastream not found. This value will be ignored. Datastream Name: ' + _id);
            return this;
        }
        this._entity[_id] = {
            '_index': {
                'value': idCommunicationModules
            },
            '_value': {
                '_current': {
                    'value': val
                }
            }
        };
        return this;
    }

}