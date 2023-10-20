'use strict';

import BaseProvision from '../provision/BaseProvision';
import q from 'q';
export const URL = 'timeseries/provision/organizations';
import checkType from '../util/formats/check_types'
import {VALUE_TYPES_ENUM} from './TYPES_ENUM'

/**
 * This is a base object that contains all you can do about TimeseriesFunction.
 */
export default class TimeseriesFunction extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi, organization, nameForUpdate) {
        super(ogapi, "timeseries/provision/organizations");

        if (organization) {
            this.withOrganization(organization);

            // only for updates
            if (nameForUpdate) {
                this.withIdentifier(nameForUpdate);
            }
        }
    }

    /**
     * Set the name for update attribute
     * @param {string} name - required field
     * @return {TimeseriesFunction}
     */
    withIdentifier(name) {
        checkType._checkString(name, 'identifier');
        this._identifier = name;
        return this;
    }

    /**
     * Set the organization attribute
     * @param {string} organization - required field
     * @return {TimeseriesFunction}
     */
    withOrganization(organization) {
        checkType._checkStringAndLength(organization, 50, 'organization');
        this._organization = organization;
        return this;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {TimeseriesFunction}
     */
    withName(name) {
        checkType._checkString(name, 'name');
        this._name = name;
        return this;
    }

    /**
     * Set the description attribute
     * @param {string} description 
     * @return {TimeseriesFunction}
     */
    withDescription(description) {
        checkType._checkString(description, 'description');
        this._description = description;
        return this;
    }

    /**
     * Set the script attribute
     * @param {string} script 
     * @return {TimeseriesFunction}
     */
    withScript(script) {
        checkType._checkString(script, 'script');
        this._script = script;
        return this;
    }

    /**
     * Set the valueTypes attribute
     * @param {Array} valueTypes 
     * @return {TimeseriesFunction}
     */
    withValueTypes(valueTypes) {
        checkType._checkArray(valueTypes, 'valueTypes');

        valueTypes.forEach((typeTmp) => {
            checkType._checkType(typeTmp, VALUE_TYPES_ENUM);
        })
        this._valueTypes = valueTypes;
        return this;
    }
    
    withMetadataFile(file) {
        // if (typeof file !== 'object')
        //     throw new Error({ message: "Parameter action requires name and type", parameter: 'action' });
        this._metadataFile = file
    }

    _composeElement(isUpdate) {
        this._checkRequiredParameters(isUpdate);

        let updateData = {
            'script': this._script
        };

        
        if (this._metadataFile) {
            updateData.metadata = this._metadataFile
        } else {
            let blob = new Blob([JSON.stringify({
                "name": this._name,
                "description": this._description,
                "valueTypes": this._valueTypes || []
            })], {
                type: "application/json"
            });

            updateData.metadata = blob
        }
        
        return updateData;
    }

    _checkRequiredParameters(isUpdate) {
        if (isUpdate) {
            // if (this._script === undefined || this._identifier === undefined || this._organization === undefined || this._name === undefined || this._description === undefined)
            if (!(this._script && (this._metadataFile || (this._identifier && this._organization && this._name && this._description))))
                throw new Error('Parameters organization, identifier, name, description and script must be defined');
        } else {
            //if (this._script === undefined || this._name === undefined || this._organization === undefined || this._description === undefined)
            if (!(this._script && (this._metadataFile || (this._organization && this._name && this._description))))
                throw new Error('Parameters organization, name, description and script must be defined');
        }
    }

    _buildURL() {
        return URL + "/" + this._organization  + "/catalog" + (this._identifier?'/'+ this._identifier:'');
    }

    create() {
        const defer = q.defer();

        this._ogapi.Napi.post_multipart(this._buildURL(), this._composeElement(), {}, this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL())
            .then((response) => {
                let statusCode = response.statusCode;
                switch (statusCode) {
                    case 200:{
                        const resultQuery = response.text != "" ? JSON.parse(response.text) : {};
                        const _statusCode = response.status;
                        defer.resolve({
                            data: resultQuery,
                            statusCode: _statusCode
                        });
                        break
                    }
                    case 201:{
                        const _statusCode = response.status;
                        const location =  response.header && response.header.location
                        defer.resolve({
                            location: location,
                            statusCode: _statusCode
                        });
                        break
                    }
                    case 204:
                        defer.resolve(response);
                        break
                    default:
                        defer.reject({
                            errors: response.data.errors,
                            statusCode: response.statusCode
                        });
                        break
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
        const defer = q.defer();

        this._ogapi.Napi.put_multipart(this._buildURL(), this._composeElement(true), {}, this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL())
            .then((response) => {
                let statusCode = response.statusCode;
                switch (statusCode) {
                    case 200:{
                        const resultQuery = response.text != "" ? JSON.parse(response.text) : {};
                        const _statusCode = response.status;
                        defer.resolve({
                            data: resultQuery,
                            statusCode: _statusCode
                        });
                        break
                    }
                    case 204:
                        defer.resolve(response);
                        break
                    default:
                        defer.reject({
                            errors: response.data.errors,
                            statusCode: response.statusCode
                        });
                        break
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
            throw new Error('Parameters organization and name must be defined');

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