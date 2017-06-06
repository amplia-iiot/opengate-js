'use strict';
import IoTProvision from '../IoTProvision'
import IoTFlavour from '../catalog/IoTFlavour'
import IoTDatastream from '../catalog/IoTDatastream'

import jpath from 'json-path'

export const PRE_RESOURCE = '/organizations';
export const PROFILE_RESOURCE = '/profiles';
/**
 * This is a base object for create a IoT Profile
 */
export default class IoTProfiles extends IoTProvision {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - Organization where the IoT profile will be created
     */
    constructor(ogapi, organization) {
        super(ogapi, PRE_RESOURCE);
        this._isValidString(organization, 'organization', 50);
        this._organization = organization;
        this._flavours = [];
        this._resource = this._resource + '/' + this._organization + PROFILE_RESOURCE;
    }
    /**
     * Set the name attribute
     * @param {!string} name - required field
     * @return {IoTProfiles}
     */
    withName(name) {
        this._isValidString(name, 'name', 100);
        this._name = name;
        return this;
    }

    /**
     * Set the version attribute
     * @param {!string} version - required field
     * @return {IoTProfiles}
     */
    withVersion(version) {
        this._isValidString(version, 'version', 100);
        this._version = version;
        return this;
    }

    /**
     * Set the description attribute
     * @param {string} description
     * @return {IoTProfiles}
     */
    withDescription(description) {
        if (description)
            this._isValidString(description, 'description', 100);
        this._description = description;
        return this;
    }

    /**
     * Add a flavor. If the field datastreams have value, they will add to this flavor
     * @param {!string} flavour
     * @param {!Array} datastreams
     * @return {IoTProfiles}
     */
    addFlavour(flavour, datastreams) {
        this._isValidString(flavour, 'flavour', 100);
        this._flavours.forEach(function(_flavour, index) {
            if (flavour.name === _flavour) {
                throw new Error('Flavour ' + flavour + ' already exists.');
            }
        });
        let _flavour = new IoTFlavour(this._ogapi, flavour);
        if (datastreams && datastreams.length > 0)
            _flavour.addDatastreams(datastreams);
        this._flavours.push(_flavour._composeElement());
        return this;
    }

    /**
     * Add a datastream to the indicated flavour
     * @param {!string} flavour
     * @param {!object} datastream
     * @return {IoTProfiles}
     */
    addDatastream(flavour, datastream) {
        this._isValidString(flavour, 'flavour', 100);
        //Buscamos flavour y si existe se añade a la lista de flavours
        var exists_flavour = -1;
        this._flavours.forEach(function(_flavour, index) {
            if (_flavour.name === flavour) {
                exists_flavour = index;
            }
        });
        if (exists_flavour === -1) {
            throw new Error('Flavour ' + flavour + ' not exists for this profile. Use addFlavour instead.');
        }
        this._flavours[exists_flavour].datastreams.push(datastream);
        return this;
    }

    _composeElement() {
        if (!this._name) {
            throw new Error('Name is required on IoTProfile');
        }

        if (!this._version) {
            throw new Error('Version is required on IoTProfile');
        }

        if (this._flavours.length === 0) {
            let _datastream = this._ogapi.IoTDatastreamsBuilder();
            _datastream.withId(this._name + 'ExampleDatastream');
            _datastream.withName(this._name + 'ExampleDatastream');
            _datastream.withDescription('Example datastream');
            _datastream.withPeriod('INSTANT');
            _datastream.withUnit('EG', 'example', 'e.g.');
            _datastream.withTags(['example']);
            this.addFlavour(this._name + 'ExampleFlavour', [_datastream.build()]);
        }

        return {
            'name': this._name,
            'version': this._version,
            'description': this._description,
            'flavours': this._flavours
        }
    }

    _buildURL() {
        let url = this._resource + '/' + this._organization + PROFILE_RESOURCE;
        console.log('URL: ' + url);
        return url;
    }

    /**
     * Update not supported on this builder. Use IoTProfileHelper instead.
     */
    update() {
        throw new Error('Update not supported on this builder. Use IoTProfileHelper instead.');
    }

    /**
     * Delete not supported on this builder. Use IoTProfileHelper instead.
     */
    delete() {
        throw new Error('Delete not supported on this builder. Use IoTProfileHelper instead.');
    }

    _isValidString(string, param_name, max_length) {
        if (typeof string !== 'string' || string.length === 0 || string.length > max_length)
            throw new Error('Parameter ' + param_name + ' must be a string, cannot be empty and has a maximum length of ' + max_length + 'on IoTProfile');
    }
}