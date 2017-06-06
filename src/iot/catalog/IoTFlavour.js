'use strict';

import IoTDatastream from './IoTDatastream'

/**
 * Defines the builder to configure a flavour of IoT profile. With this builder you can configure a flavour
 */
export default class IoTFlavour {

    /**    
     * @param {!InternalOpenGateAPI} Reference to the API object.
     * @param {!name} name of flavour
     * @param {Array} datastreams of flavour
     */
    constructor(ogapi, name, datastreams) {
        this._ogapi = ogapi;
        this._isValidString(name, 'name', 50);
        this._name = name;
        this._datastreams = datastreams ? datastreams : [];
    }

    /**
     * Add a datastream to the flavour 
     * @param {!Object} datastream json object
     * @return {IoTProfilesHelper}
     */
    addDatastream(datastream) {
        if (!datastream || typeof datastream !== 'object') {
            throw new Error('Datastream must be an object');
        }
        this._datastreams.push(datastream);
        return this;
    }


    /**
     * Add a datastreams to the flavour 
     * @param {!Object} datastreams of datastream json object
     * @return {IoTProfilesHelper}
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
            throw new Error('Parameter ' + param_name + ' must be a string, cannot be empty and has a maximum length of ' + max_length + ' on IoTFlavour');
    }

    _composeElement() {
        if (!this._name) {
            throw new Error('Name is required on IoTFlavour');
        }

        if (this._datastreams.length === 0) {
            let _datastream = this._ogapi.IoTDatastreamsBuilder();
            _datastream.withId(this._name + '.example.heart.rate');
            _datastream.withName(this._name + '.example.heart.rate');
            _datastream.withDescription('heart rate measurement (example)');
            _datastream.withPeriod('PULSE');
            _datastream.withUnit('SI', 'beats/second', 'bpm');
            _datastream.withTags(['health', 'heart']);
            this.addDatastream(_datastream.build());
        }

        return {
            'name': this._name,
            'datastreams': this._datastreams
        }
    }
}