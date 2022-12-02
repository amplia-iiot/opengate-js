'use strict';

import q from 'q';
import BaseProvision from '../provision/BaseProvision';

/**
 * This is a base object that contains all you can do about Bundles.
 */
export default class Transformers extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/organizations", undefined, ["organization", "files"], 'north/ai');
        this._ogapi = ogapi;
    }

    _buildURL() {
        var url = this._organization + '/transformers/' + this._identifier;
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

    addFile(file) {
        // if (typeof file !== 'object')
        //     throw new Error({ message: "Parameter action requires name and type", parameter: 'action' });

        if(!this._files) {
            this._files = []
        }

        this._files.push(file)
    }

    withFiles(files) {
        if (!(files instanceof Array))
             throw new Error({ message: "Parameter files requires an array", parameter: 'files' });

        this._files = files
    }

    _composeElement() {
        this._checkRequiredParameters();
        this._resource = this._organization + '/transformers';

        var transformer = {
            files:  this._files || undefined,
        };
        return transformer;
    }

    _composeUpdateElement() {
        let transformer = super._composeUpdateElement();
        delete transformer.name;
        return transformer;
    }

    performTest(body_data) {
        var defered = q.defer();
        var promise = defered.promise;

        //En muchas clases se genera this._resource en la llamada a la funcion this._composeElement()

        this._ogapi.Napi.post(this._buildURL() + '/transform', body_data, this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL())
            .then((res) => {
                defered.resolve({
                    statusCode: res.statusCode,
                    body: res.body
                });
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }

    create() {
        let _postElement = this._composeElement();
        
        // let form = new FormData();
        // _postElement.files.forEach(function (fileTmp) {
        //     form.append('files', fileTmp);
        // });
        
        // form.append('files', _postElement.files);
        
        const defer = q.defer();
        
        //var petitionUrl = this._buildURL();
        //url, formData, events, timeout, headers, parameters
        this._ogapi.Napi.post_multipart(this._resource, {files: _postElement.files}, {}, this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL())
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
                        const location = response.header && response.header.location
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

    update() {
        let _postElement = this._composeElement();

        const defer = q.defer();
        
        this._ogapi.Napi.put_multipart( this._buildURL(),  {files: _postElement.files}, {}, this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL())
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