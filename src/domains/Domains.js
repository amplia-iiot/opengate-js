'use strict';

import q from 'q';
import BaseProvision from '../provision/BaseProvision'

/**
 * This is a base object that contains all you can do about Bundles.
 */
export default class Domains extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/domains");
        this._ogapi = ogapi;

    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Domains}
     */
    withName(name) {
        if (typeof name !== 'string' || name.length > 50)
            throw new Error('Parameter name must be a string and has a maximum length of 50');
        this._name = name;
        return this;
    }

    /**
     * Set the description attribute
     * @param {string} description - required field
     * @return {Domains}
     */
    withDescription(description) {
        if (typeof description !== 'string' || description.length > 200)
            throw new Error('Parameter description must be a string and has a maximum length of 200');
        this._description = description;
        return this;
    }


    /**
     * Set the parentDomain attribute
     * @param {string} parentDomain 
     * @return {Domains}
     */
    withParentDomain(parentDomain) {
        if (typeof parentDomain !== 'string' || parentDomain.length > 50)
            throw new Error('Parameter parentDomain must be a string and has a maximum length of 50');
        this._parentDomain = parentDomain;
        return this;
    }

    _composeElement() {
        if (this._name === undefined) {
            throw new Error('Parameters name must be defined');
        }

        var domain = {
            "domain": {
                name: this._name || undefined,
                description: this._description || undefined,
                parentDomain: this._parentDomain || undefined
            }
        }

        return domain;
    }

    _buildURL() {
        console.log("RESOURCE: " + this._resource);
        console.log("NAME: " + this._name);
        var url = this._resource + '/' + this._name;
        return url;
    }

    _composeUpdateElement() {
        let domain = super._composeUpdateElement();
        delete domain.domain.name;
        return domain;
    }


}