'use strict';

import q from 'q';
import BaseProvision from '../provision/BaseProvision'

/**
 * This is a base object that contains all you can do about workgroups.
 */
export default class Workgroups extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/domains", undefined, ["name", "domainName"]);
        this._ogapi = ogapi;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Workgroups}
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
     * @return {Workgroups}
     */
    withDescription(description) {
        if (typeof description !== 'string' || description.length > 250)
            throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_250", parameter: 'description' });
        this._description = description;
        return this;
    }

    /**
     * Set the administrative attribute
     * @param {boolean} administrative 
     * @return {Workgroups}
     */
    withAdministrative(administrative) {
        /*if (typeof administrative !== 'boolean')
            throw new Error('Parameter administrative must be a boolean');*/
        this._administrative = administrative;
        return this;
    }

    /**
     * Set the domain attribute
     * @param {string} domainName - required field
     * @return {Workgroups}
     */
    withDomainName(domainName) {
        if (typeof domainName !== 'string' || domainName.length > 50)
            throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'domainName' });
        this._domainName = domainName;
        return this;
    }

    _composeElement() {
        this._checkRequiredParameters();
        this._resource = 'provision/domains/' + this._domainName + '/workgroups';

        var workgroup = {
            "workgroup": {
                name: this._name || undefined,
                description: this._description || undefined,
                administrative: this._administrative || false
            }
        }

        return workgroup;
    }

    _composeElementUpdate() {
        this._checkRequiredParameters();
        this._resource = 'provision/domains/' + this._domainName + '/workgroups';

        var workgroup = {
            "workgroup": {
                description: this._description || undefined
            }
        }

        return workgroup;
    }

    _buildURL() {
        var url = 'provision/domains/' + this._domainName + '/workgroups/' + this._name;
        return url;
    }

    update() {
        var defered = q.defer();
        var promise = defered.promise;
        this._ogapi.Napi.put(this._buildURL(), this._composeElementUpdate())
            .then((res) => {
                if (res.statusCode === 200) {
                    defered.resolve({ statusCode: res.statusCode });
                } else if (res.status === 200) {
                    defered.resolve({ statusCode: res.status });
                } else {
                    defered.reject({ errors: res.errors, statusCode: res.statusCode });
                }
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }

}