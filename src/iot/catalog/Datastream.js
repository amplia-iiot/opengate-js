'use strict';

import jsonSchema from 'jsonschema';
import Qrating from './Qrating'

let jsValidate = jsonSchema.validate;
/**
 * Defines the builder to configure a datastream of IoT datamodel. With this builder you can configure a datastream
 */
export default class Datastream {

    constructor() { }

    /**
     * Set the id attribute
     * @param {!string} id - required field
     * @return {Datastream}
     */
    withId(id) {
        this._isValidString(id, 'id', 100);
        this._id = id;
        return this;
    }

    /**
     * Set the name attribute
     * @param {!string} name - required field
     * @return {Datastream}
     */
    withName(name) {
        this._isValidString(name, 'name', 100);
        this._name = name;
        return this;
    }

    /**
     * Set the description attribute
     * @param {string} description
     * @return {Datastream}
     */
    withDescription(description) {
        if (description)
            this._isValidString(description, 'description', 500);
        this._description = description;
        return this;
    }

    /**
     * Set the unit object attribute
     * @param {!string} type - required field
     * @param {!string} label - required field
     * @param {!string} symbol - required field
     * @return {Datastream}
     */
    withUnit(type, label, symbol) {
        this._isValidString(type, 'type', 500);
        this._isValidString(label, 'label', 500);
        this._isValidString(symbol, 'symbol', 10);
        this._unit = {
            type: type,
            label: label,
            symbol: symbol
        }
        return this;
    }

    /**
     * Set the period attribute. Possible values: PULSE, CUMULATIVE, INSTANT
     * @param {!string} period - required field
     * @return {Datastream}
     */
    withPeriod(period) {
        this._isValidString(period, 'period', 500);
        this._period = period;
        return this;
    }

    /**
     * Set the schema object attribute.
     * @param {!Object} schema
     * @return {Datastream}
     */
    withSchema(schema) {
        if (!schema || (typeof schema !== 'object')) {
            throw new Error('Schema must be an object or a string on Datastream');
        }

        this._schema = schema;
        return this;
    }

    /**
     * Set the tags attribute.
     * @param {Array} tags
     * @return {Datastream}
     */
    withTags(tags) {
        if (tags) {
            if (!Array.isArray(tags)) {
                throw new Error('Tags must be an array on Datastream');
            }
            this._tags = tags;
        }
        return this;
    }

    /**
     * Set the qrating attribute. Use {Qrating} utility for create this object
     * @param {Object} qrating
     * @return {Datastream}
     */
    addQrating(qrating) {
        if (!qrating || typeof qrating !== 'object') {
            throw new Error('Qrating must be an instance of object on Datastream');
        }
        this._qrating = qrating;
        return this;
    }

    /**
     * Set the storage object.
     * @param {!string} period
     * @param {!number} total
     * @return {Datastream}
     */
    withStorage(period, total) {
        this._isValidString(period, 'period', 500);
        if (!total || typeof total !== 'number') {
            throw new Error('Total must be a number on Datastream');
        }
        this._storage = {
            total: total,
            period: period
        }
        return this;
    }

    /**
     * Set the access object. Possible values: [READ, WRITE], [READ], [WRITE], []
     * @param {Array} access
     * @return {Datastream}
     */
    withAccess(access) {
        if (access) {
            if (!Array.isArray(access)) {
                throw new Error('Access must be an array on Datastream');
            }
        }
        this._access = access;
        return this;
    }

    /**
     * Set the hardwaresIds object.
     * @param {Array} hardwaresIds
     * @return {Datastream}
     */
    withHardwaresIds(hardwaresIds) {
        if (hardwaresIds) {
            if (!Array.isArray(hardwaresIds)) {
                throw new Error('hardware Ids must be an array on Datastream');
            }
        }
        this._hardwares = hardwaresIds;
        return this;
    }

    /**
     * Build a Datastream json object
     * 
     * @example
     * ogapi.DatastreamsBuilder().build()
     * @throws {Error} Throw error if there is not id, name, unit and period
     * @return {Object}  Datastream json object
     */
    build() {
        if (!this._id) {
            throw new Error('Id is required on Datastream');
        }
        if (!this._name) {
            throw new Error('Name is required on Datastream');
        }
        if (!this._unit) {
            throw new Error('Unit is required on Datastream');
        }
        if (!this._period) {
            throw new Error('Period is required on Datastream');
        }
        if (!this._schema) {
            throw new Error('Schema is required on Datastream');
            //this._schema = { type: 'string' };
        }

        try {
            jsValidate(4, this._schema);
        } catch (errValidation) {
            throw new Error('Schema not valid: ' + errValidation);
        }

        return {
            id: this._id,
            name: this._name,
            description: this._description,
            period: this._period,
            tags: this._tags,
            unit: this._unit,
            schema: this._schema,
            qrating: this._qrating,
            storage: this._storage,
            hardwareIds: this._hardwares,
            access: this._access
        }
    }

    _isValidString(string, param_name, max_length) {
        if (typeof string !== 'string' || string.length === 0 || string.length > max_length)
            throw new Error('Parameter ' + param_name + ' must be a string, cannot be empty and has a maximum length of ' + max_length + ' on Datastream');
    }
}