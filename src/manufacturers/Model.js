'use strict';

import BaseProvision from '../provision/BaseProvision';
import ModelMedia from './ModelMedia';

import {MANUFACTURERS_RESOURCE} from './Manufacturer'

export const MODELS_RESOURCE = '/models';

/**
 * This is a base object that contains all you can do about Models.
 */
export default class Models extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi, manufacturer) {
        super(ogapi, MANUFACTURERS_RESOURCE, undefined, ['name']);
        this._isValidString(manufacturer, 'manufacturer', 50);
        
        this._resource = this._resource + "/" + manufacturer + MODELS_RESOURCE;
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

    mediaBuilder() {
        if (!this._manufacturer || !this._identifier)
            throw new Error("Required manufacturer and model identifier");
        return new ModelMedia(this._ogapi, this._manufacturer, this._identifier)
    }

    _composeElement() {
        this._checkRequiredParameters()

        var updateData = {
            name: this._name || undefined,
            description: this._description || undefined,
            version: this._version || undefined,
            notes: this._notes || undefined,
            url: this._modelUrl || undefined
        };

        return updateData;
    }

    _composeUpdateElement() {
        return this._composeElement()
    }

    _buildURL() {
        var url = this._resource + (this._identifier?"/" + this._identifier: "")
        return url;
    }

    _isValidString(string, param_name, max_length) {
        if (typeof string !== 'string' || string.length === 0 || string.length > max_length)
            throw new Error('Parameter ' + param_name + ' must be a string, cannot be empty and has a maximum length of ' + max_length);
    }
}