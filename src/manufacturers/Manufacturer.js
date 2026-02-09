'use strict';

import BaseProvision from '../provision/BaseProvision';
import ManufacturerMedia from './ManufacturerMedia';
import Model from './Model';

export const MANUFACTURERS_RESOURCE = '/manufacturers'
/**
 * This is a base object that contains all you can do about Manufacturers.
 */
export default class Manufacturers extends BaseProvision {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, MANUFACTURERS_RESOURCE, undefined, ['name']);
    }

    /**
     * Set the identifier attribute
     * @param {string} id - required field
     * @return {Manufacturers}
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
     * @return {Manufacturers}
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
     * @return {Manufacturers}
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
     * @return {Manufacturers}
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
     * @return {Manufacturers}
     */
    withUrl(url) {
        if (typeof url !== 'string')
            throw new Error("OGAPI_STRING_PARAMETER");
        this._manufUrl = url;
        return this;
    }

    /**
     * Set the fax attribute
     * @param {string} fax 
     * @return {Manufacturers}
     */
    withFax(fax) {
        if (typeof fax !== 'string')
            throw new Error("OGAPI_STRING_PARAMETER");
        this._fax = fax;
        return this;
    }

    /**
     * Set the telephone attribute
     * @param {string} telephone 
     * @return {Manufacturers}
     */
    withTelephone(telephone) {
        if (typeof telephone !== 'string')
            throw new Error("OGAPI_STRING_PARAMETER");
        this._telephone = telephone;
        return this;
    }

    /**
     * Set the address attribute
     * @param {string} address 
     * @return {Manufacturers}
     */
    withAddress(address) {
        if (typeof address !== 'string')
            throw new Error("OGAPI_STRING_PARAMETER");
        this._address = address;
        return this;
    }

    /**
     * Set the email attribute
     * @param {string} email 
     * @return {Manufacturers}
     */
    withEmail(email) {
        if (typeof email !== 'string')
            throw new Error("OGAPI_STRING_PARAMETER");
        this._email = email;
        return this;
    }

    mediaBuilder() {
        if (!this._identifier)
            throw new Error("Required manufacturer identifier");
        return new ManufacturerMedia(this._ogapi, this._identifier)
    }

    modelBuilder() {
        if (!this._identifier)
            throw new Error("Required manufacturer identifier and name");
        return new Model(this._ogapi, this._identifier)
    }

    _composeElement() {
        this._checkRequiredParameters()

        var updateData = {
            name: this._name || undefined,
            description: this._description || undefined,
            telephone: this._telephone || undefined,
            address: this._address || undefined,
            fax: this._fax || undefined,
            url: this._manufUrl || undefined,
            notes: this._notes || undefined,
            email: this._email || undefined
        };

        return updateData;
    }

    _composeUpdateElement() {
        return this._composeElement();
    }

    _buildURL() {
        var url = this._resource + (this._identifier ? "/" + this._identifier : "")
        return url;
    }
}