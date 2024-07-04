'use strict';

import BaseProvision from '../provision/BaseProvision';
import Model from './Model';

export const PRE_RESOURCE = '/organizations';
export const MANUFACTURERS_RESOURCE = '/manufacturers';

/**
 * This is a base object that contains all you can do about Manufacturers.
 */
export default class Manufacturers extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi, organization) {
        // super(ogapi, "/manufacturers", undefined, ['identifier', 'name']);
        super(ogapi, PRE_RESOURCE, undefined, ['name']);
        this._isValidString(organization, 'organization', 50);
        this._organization = organization;

        this._resource = this._resource + '/' + this._organization + MANUFACTURERS_RESOURCE;
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

    modelBuilder() {
        if (!this._identifier)
            throw new Error("Required manufacturer identifier");
        return new Model(this._ogapi, this._organization, this._identifier)
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
        return this._resource + (this._identifier?"/" + this._identifier:"");
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