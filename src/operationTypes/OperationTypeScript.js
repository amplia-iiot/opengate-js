'use strict';

import BaseProvision from '../provision/BaseProvision';
import q from 'q';

/**
 * This is a base object that contains all you can do about OperationTypeScript.
 */
export default class OperationTypeScript extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi, organization, operationIdentifier, script) {
        super(ogapi, "/organizations");

        // Required
        this.withOrganization(organization);
        this.withIdentifier(operationIdentifier);
        
        if (script) {
            this.withScript(script)
        }
    }

    /**
     * Set the operation type identifier for update attribute
     * @param {string} name - required field
     * @return {OperationTypeScript}
     */
    withIdentifier(name) {
        if (typeof name !== 'string' || name.length === 0)
            throw new Error('Parameter identifier must be a string, cannot be empty and has a maximum length of 50');
        this._identifier = name;
        return this;
    }

    /**
     * Set the organization attribute
     * @param {string} organization - required field
     * @return {OperationTypeScript}
     */
    withOrganization(organization) {
        if (typeof organization !== 'string' || organization.length === 0 || organization.length > 50)
            throw new Error('Parameter organization must be a string, cannot be empty and has a maximum length of 50');
        this._organization = organization;
        return this;
    }

    /**
     * Set the script attribute
     * @param {string} script - required field
     * @return {OperationTypeScript}
     */
    withScript(script) {
        if (!script)
            throw new Error('Parameter script cannot be empty');
        this._script = script;
        return this;
    }

    _checkRequiredParameters() {
        if (this._identifier === undefined || this._organization === undefined || this._script === undefined)
            throw new Error('Parameters organization, operation type identifier and script must be defined');
    
    }

    _buildURL() {
        return "operationTypes/" + this._resource + "/" + this._organization+ "/" + this._identifier + "/scripts" ;
    }

    /** 
     * Create a new Rule
     * @return {Promise}
     * @throws {Error} 
     */
    create() {
        this._checkRequiredParameters();

        let form;
        if (typeof this._script === 'string') {
            form = new Blob([this._script]);
        } else {
            form = this._script;
        }
        let defer = q.defer();
        
        const petitionUrl = this._buildURL();
       
        this._ogapi.Napi.post_multipart(petitionUrl, form, {}, this._timeout, this._getExtraHeaders(), this._getUrlParameters())
            .then((response) => {
                let statusCode = response.statusCode;
                if (statusCode === 200 || statusCode === 201 || statusCode === 204) {
                    defer.resolve(response);
                } else {
                    defer.reject({
                        errors: response.data.errors,
                        statusCode: response.statusCode
                    });
                }
            })
            .catch((error) => {
                defer.reject(error);
            });
        return defer.promise;
    }

    /** 
     * Udpate a Rule
     * @return {Promise}
     * @throws {Error} 
     */
    update() {
        this._checkRequiredParameters();

        let form;
        if (typeof this._script === 'string') {
            form = new Blob([this._script]);
        } else {
            form = this._script;
        }
        let defer = q.defer();
        
        const petitionUrl = this._buildURL();
       
        this._ogapi.Napi.put_multipart(petitionUrl, form, {}, this._timeout, this._getExtraHeaders(), this._getUrlParameters())
            .then((response) => {
                let statusCode = response.statusCode;
                if (statusCode === 200 || statusCode === 201 || statusCode === 204) {
                    defer.resolve(response);
                } else {
                    defer.reject({
                        errors: response.data.errors,
                        statusCode: response.statusCode
                    });
                }
            })
            .catch((error) => {
                defer.reject(error);
            });
        return defer.promise;
    }

    /** 
     * Deletes the selected RuleConfiguration
     * @return {Promise}
     * @throws {Error} 
     */
    delete() {
        if (this._identifier === undefined || this._organization === undefined )
            throw new Error('Parameters organization and identifier must be defined');

        var defered = q.defer();
        var promise = defered.promise;
        this._ogapi.Napi.delete(this._buildURL())
            .then((res) => {
                if (res.statusCode === 200) {
                    defered.resolve({
                        statusCode: res.statusCode
                    });
                } else {
                    defered.reject({
                        errors: res.errors,
                        statusCode: res.statusCode
                    });
                }
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }
}