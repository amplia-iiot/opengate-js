'use strict';

import Datastream from './Datastream'

/**
 * Defines the builder to configure a category of a datamodel. With this builder you can configure a category
 */
export default class Category {
    /**    
     * @param {!InternalOpenGateAPI} Reference to the API object.
     * @param {!identifier} identifier of category
     * @param {Array} datastreams of category
     */
    constructor(ogapi, identifier, datastreams) {
        this._ogapi = ogapi;
        this._isValidString(identifier, 'identifier', 50);
        this._identifier = identifier;
        this._datastreams = datastreams ? datastreams : [];
    }

    withName(name) {
        this._isValidString(name, 'name', 100);
        this._name = name;
        return this;
    }

    /**
     * Add a datastream to the category 
     * @param {!Object} datastream json object
     * @return {Category}
     */
    addDatastream(datastream) {
        if (!datastream || typeof datastream !== 'object') {
            throw new Error('Datastream must be an object');
        }
        this._datastreams.push(datastream);
        return this;
    }


    /**
     * Add a datastreams to the category 
     * @param {!Object} datastreams of datastream json object
     * @return {Category}
     */
    addDatastreams(datastreams) {
        var _this = this;
        if (!Array.isArray(datastreams)) {
            throw new Error('Datastreams must be an array');
        }
        let _errors = [];
        datastreams.forEach(function(datastream, index) {
            try {
                _this.addDatastream(datastream);
            } catch (error) {
                _errors.push('Error on datastream with index [' + index + ']: ' + error);
            }
        });
        if (_errors.length > 0) {
            throw new Error('Error adding datastreams: ' + JSON.stringify(_errors));
        }
        return this;
    }

    _isValidString(string, param_name, max_length) {
        if (typeof string !== 'string' || string.length === 0 || string.length > max_length)
            throw new Error('Parameter ' + param_name + ' must be a string, cannot be empty and has a maximum length of ' + max_length + ' on Category');
    }

    _composeElement() {
        if (!this._identifier) {
            throw new Error('identifier is required on Category');
        }

        return {
            'identifier': this._identifier,
            'name': this._name ? this._name : undefined,
            'datastreams': this._datastreams
        };
    }
}