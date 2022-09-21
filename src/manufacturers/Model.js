'use strict';

import BaseProvision from '../provision/BaseProvision';
import Manufacturers from './Manufacturer';
import ModelMedia from './ModelMedia';

/**
 * This is a base object that contains all you can do about Models.
 */
export default class Models extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi, manufacturer) {
        super(ogapi, "/models", undefined, ['identifier', 'name', 'manufacturer']);

        this._manufacturer = manufacturer
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
        this._manufUrl = url;
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

    /**
     * Set the manufacturer identifier attribute
     * @param {string} id
     * @return {Manufacturers}
     */
    withManufacturerIdentifier(id) {
        if (typeof id !== 'string' || id.length > 50)
            throw new Error("OGAPI_STRING_PARAMETER_MAX_LENGTH_50");
        if (!this._manufacturer) {
            this._manufacturer = new Manufacturers(this._ogapi)
        }
        
        this._manufacturer.withIdentifier(id);
        return this;
    }

    /**
     * Set the manufacturer name attribute
     * @param {string} name
     * @return {Models}
     */
    withManufacturerName(name) {
        if (!name)
            throw new Error("OGAPI_STRING_PARAMETER");
        
        if (!this._manufacturer) {
            this._manufacturer = new Manufacturers(this._ogapi)
        }
        
        this._manufacturer.withName(name);

        return this;
    }
    

    mediaBuilder() {
        if (!this._identifier)
            throw new Error("Required model identifier");
        return new ModelMedia(this._ogapi, this._identifier)
    }

    _composeElement() {
        this._checkRequiredParameters()

        var updateData = {
            model: {
                id: this._identifier || undefined,
                name: this._name || undefined,
                description: this._description || undefined,
                version: this._version || undefined,
                notes: this._notes || undefined,
                manufacturer: {
                    id: this._manufacturer._identifier || undefined,
                    name: this._manufacturer._name || undefined    
                }
            }
        };

        return updateData;
    }

    _buildURL() {
        var url = this._resource + "/" + this._identifier
        return url;
    }
}