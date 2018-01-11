'use strict';

import q from 'q';
import BaseProvision from '../provision/BaseProvision'

/**
 * This is a base object that contains all you can do about Bundles.
 */
export default class Channels extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/organizations", undefined, ["name", "organization"]);
        this._ogapi = ogapi;
    }

    _buildURL() {
        var url = 'provision/organizations/' + this._organization + '/channels/' + this._name;
        return url;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Channels}
     */
    withName(name) {
        if (typeof name !== 'string' || name.length > 50)
            throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'name' });
        this._name = name;
        return this;
    }

    /**
     * Set the description attribute
     * @param {string} description - required field
     * @return {Channels}
     */
    withDescription(description) {
        if (typeof description !== 'string' || description.length > 250)
            throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_250", parameter: 'description' });
        this._description = description;
        return this;
    }


    /**
     * Set the organization attribute
     * @param {string} organization 
     * @return {Channels}
     */
    withOrganization(organization) {
        if (typeof organization !== 'string' || organization.length > 50)
            throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'organization' });
        this._organization = organization;
        return this;
    }

    /**
     * Set the certificate attribute
     * @param {string} certificate 
     * @return {Channels}
     */
    withCertificate(certificate) {
        if (typeof certificate !== 'string')
            throw new Error({ message: 'OGAPI_STRING_PARAMETER', parameter: 'certificate' });

        if (!this._certificates)
            this._certificates = [];

        this._certificates.push(certificate);
        return this;
    }

    _composeElement() {
        this._checkRequiredParameters();
        this._resource = 'provision/organizations/' + this._organization + '/channels';
        var channel = {
            "channel": {
                name: this._name || undefined,
                description: this._description || undefined,
                certificates: this._certificates || undefined
            }
        }
        return channel;
    }

    _composeUpdateElement() {
        let channel = super._composeUpdateElement();
        delete channel.channel.name;
        return channel;
    }

}