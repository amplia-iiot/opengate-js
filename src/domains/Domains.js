'use strict';

import q from 'q';
import BaseProvision from '../provision/BaseProvision';

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
            throw new Error("OGAPI_NAME_PARAMETER_MAX_LENGTH_50");
        this._name = name;
        return this;
    }

    /**
     * Set the description attribute
     * @param {string} description - required field
     * @return {Domains}
     */
    withDescription(description) {
        if (typeof description !== 'string' || description.length > 250)
            throw new Error("OGAPI_DESCRIPTION_PARAMETER_MAX_LENGTH_250");
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
            throw new Error("OGAPI_DOMAIN_PARAMETER_MAX_LENGTH_50");
        this._parentDomain = parentDomain;
        return this;
    }

    _composeElement() {
        if (this._name === undefined) {
            throw new Error({ message: 'OGAPI_DEFINED_PARAMETER', parameter: 'name' });
        }

        var domain = {
            "domain": {
                name: this._name || undefined,
                description: this._description || undefined,
                parentDomain: this._parentDomain || undefined
            }
        };

        return domain;
    }

    _buildURL() {
        /*jshint -W117 */
        var url = this._resource + '/' + this._name;
        return url;
    }

    _composeUpdateElement() {
        let domain = super._composeUpdateElement();
        delete domain.domain.name;
        return domain;
    }


}