'use strict';

import Datastream from './Datastream'

/**
 * Defines the builder to configure a category of a datamodel. With this builder you can configure a category
 */
export default class Category {
    /**    
     * @param {!InternalOpenGateAPI} Reference to the API object.
     * @param {!name} name of category
     * @param {Array} datastreams of category
     */
    constructor(ogapi, name, datastreams) {
        this._ogapi = ogapi;
        this._isValidString(name, 'name', 50);
        this._name = name;
        this._datastreams = datastreams ? datastreams : [];
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
        if (!this._name) {
            throw new Error('Name is required on Category');
        }

        return {
            'name': this._name,
            'datastreams': this._datastreams
        }
    }
}