'use strict';

import BaseProvision from '../provision/BaseProvision';
import { MANUFACTURERS_RESOURCE } from './Manufacturer';

export const PRE_RESOURCE = '/organizations';
export const MODELS_RESOURCE = '/models';

/**
 * This is a base object that contains all you can do about Models.
 */
export default class Models extends BaseProvision {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi, organization, manufacturer) {
        super(ogapi, PRE_RESOURCE, undefined, ['name']);
        this._isValidString(organization, 'organization', 50);
        this._isValidString(manufacturer, 'manufacturer', 50);
        this._organization = organization;
        this._manufacturer = manufacturer;

        // super(ogapi, "/models", undefined, ['identifier', 'name', 'manufacturer']);

        this._resource = this._resource + '/' + this._organization + MANUFACTURERS_RESOURCE + "/" + manufacturer + MODELS_RESOURCE;
    }

    /**
     * Set the identifier attribute
     * @param {string} id - required field
     * @return {Models}
     */
    withIdentifier(id) {
        if (typeof id !== 'string' || id.length > 50)
            throw new Error("OGAPI_STRING_PARAMETER_MAX_LENGTH_50");
        this._identifier = id;
        return this;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Models}
     */
    withName(name) {
        if (typeof name !== 'string')
            throw new Error("OGAPI_STRING_PARAMETER");
        this._name = name;
        return this;
    }

    /**
     * Set the description attribute
     * @param {string} description - required field
     * @return {Models}
     */
    withDescription(description) {
        if (typeof description !== 'string')
            throw new Error("OGAPI_STRING_PARAMETER");
        this._description = description;
        return this;
    }

    /**
     * Set the notes attribute
     * @param {string} notes 
     * @return {Models}
     */
    withNotes(notes) {
        if (typeof notes !== 'string')
            throw new Error("OGAPI_STRING_PARAMETER");
        this._notes = notes;
        return this;
    }

    /**
     * Set the url attribute
     * @param {string} url 
     * @return {Models}
     */
    withUrl(url) {
        if (typeof url !== 'string')
            throw new Error("OGAPI_STRING_PARAMETER");
        this._modelUrl = url;
        return this;
    }

    /**
     * Set the version attribute
     * @param {string} version 
     * @return {Models}
     */
    withVersion(version) {
        if (typeof version !== 'string')
            throw new Error("OGAPI_STRING_PARAMETER");
        this._version = version;
        return this;
    }

    _composeElement() {
        this._checkRequiredParameters()

        var updateData = {
            name: this._name || undefined,
            description: this._description || undefined,
            version: this._version || undefined,
            notes: this._notes || undefined,
            url: this._modelUrl || undefined,
        };

        return updateData;
    }

    _composeUpdateElement() {
        return this._composeElement();
    }

    _buildURL() {
        return this._resource + (this._identifier ? "/" + this._identifier : "");
    }

    deleteInCascade() {
        this._setUrlParameters({
            updateDevices: true
        });

        return this.delete()
    }

    updateInCascade() {
        this._setUrlParameters({
            updateDevices: true
        });

        return this.update()
    }

    _isValidString(string, param_name, max_length) {
        if (typeof string !== 'string' || string.length === 0 || string.length > max_length)
            throw new Error('Parameter ' + param_name + ' must be a string, cannot be empty and has a maximum length of ' + max_length);
    }
}