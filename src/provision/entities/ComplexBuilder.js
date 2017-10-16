'use strict';

import SimpleBuilder from './SimpleBuilder';

/**
 * This class extends SimpleBuilder to allow set complex values. What is a complex value? It is simple, It is a value 
 * that need a communications module identifier to allow set into the box.
 */
export default class ComplexBuilder extends SimpleBuilder {


    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} resource - this is the resource url where can be create/delete/update/read the entity
     * @param {!array} [allowedDatastreams] - Allowed datastreams to add into the new entity
     * @param {!array} [definedSchemas] - Jsonschema about all OpenGate specific types
     * @param {!Validator} [jsonSchemaValidator] - Json schema validator tool
     */
    constructor(ogapi, resource, allowedDatastreams, definedSchemas, jsonSchemaValidator) {
        super(ogapi, resource, allowedDatastreams, definedSchemas, jsonSchemaValidator);
    }

    /**
     * Set a complex value to entity
     * @param {!string} _id - Datastream identifier
     * @param {!string} idCommunicationModules - Communications module identifier
     * @param {object} val - Value to set.
     */
    withComplex(_id, idCommunicationModules, val) {
        if (!idCommunicationModules) {
            console.warn('Communication module identifier not defined. This value wil be ignored');
            return this;
        }
        if (this.getAllowedDatastreams().filter(function(ds) { return ds.identifier === _id; }).length !== 1) {
            console.warn('Datastream not found. This value will be ignored. Datastream Name: ' + _id);
            return this;
        }
        if (!this._entity[_id])
            this._entity[_id] = [];
        this._entity[_id].push({
            '_index': {
                'value': idCommunicationModules
            },
            '_value': {
                '_current': {
                    'value': val
                }
            }
        });
        return this;
    }

}