'use strict';

import q from 'q';
import BaseProvision from '../provision/BaseProvision';


/**
 * This is a base object that contains all you can do about Bundles.
 */
export default class AIModels extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/ai", undefined, ["organization", "file"], 'v1/ai');
        this._ogapi = ogapi;
    }

    _buildURL() {
        var url = this._organization + '/models/' + this._identifier;
        return url;
    }

    /**
     * Set the identifier attribute
     * @param {string} identifier
     * @return {Transformers}
     */
    withIdentifier(identifier) {
            if (typeof identifier !== 'string' || identifier.length > 50)
                throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'identifier' });
            this._identifier = identifier;
            return this;
        }

    /**
     * Set the organization attribute
     * @param {string} organization 
     * @return {Transformers}
     */
    withOrganization(organization) {
        if (typeof organization !== 'string' || organization.length > 50)
            throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'organization' });
        this._organization = organization;
        return this;
    }

    withFile(file) {
        // if (typeof file !== 'object')
        //     throw new Error({ message: "Parameter action requires name and type", parameter: 'action' });
        this._file = file
    }

    _composeElement() {
        this._checkRequiredParameters();
        this._resource = this._organization + '/models';

        var transformer = {
            modelFile:  this._file || undefined
        };
        return transformer;
    }

    _composeUpdateElement() {
        let model = super._composeUpdateElement();
        return model;
    }

    create() {
        let _postElement = this._composeElement();
        
        let form = new FormData();
        form.append('modelFile', _postElement.modelFile);
        
        const defer = q.defer();
        
        //var petitionUrl = this._buildURL();
        //url, formData, events, timeout, headers, parameters
        this._ogapi.Napi.post_multipart(this._resource, form, {}, this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL())
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
                        const location = response.location || response.headers || response.headers.location || response.header.location
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
}