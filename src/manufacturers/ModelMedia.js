'use strict';

import q from 'q';
import BaseProvision from '../provision/BaseProvision';

import { MANUFACTURERS_RESOURCE } from './Manufacturer';
import { MODELS_RESOURCE } from './Model';

/**
 * This is a base object that contains all you can do about ModelMedia.
 */
export default class ModelMedia extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi, manufacturer, modelId) {
        super(ogapi, MANUFACTURERS_RESOURCE  + "/" + manufacturer + MODELS_RESOURCE + "/" + modelId + '/media', undefined, ['identifier']);
    }

    //http://cm.amplia.es/jira/browse/OGODM-3201
    
    /**
     * Set the identifier attribute
     * @param {string} id - required field
     * @return {ModelMedia}
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
     * @return {ModelMedia}
     */
    withName(name) {
        if (typeof name !== 'string')
            throw new Error("OGAPI_STRING_PARAMETER");
        this._name = name;
        return this;
    }

    /**
     * Set the file name attribute
     * @param {string} fileName - required field
     * @return {ModelMedia}
     */
    withFileName(fileName) {
        if (typeof fileName !== 'string')
            throw new Error("OGAPI_STRING_PARAMETER");
        this._fileName = fileName;
        return this;
    }

    /**
     * Set the file attribute
     * @param {string} file - required field
     * @return {ModelMedia}
     */
    withFile(file) {
        if (!file)
            throw new Error("OGAPI_NOT_EMPTY_PARAMETER");
        this._file = file;
        return this;
    }

    _composeElement() {
        this._checkRequiredParameters()

        var updateData = {
            media: {
                id: this._identifier || undefined,
                name: this._name || undefined
            }
        };

        return updateData;
    }

    _buildURL() {
        var url = this._resource + "/" + this._identifier
        return url;
    }

    update() {
        // Prevent update operations
        throw new Exception('OGAPI_METHOD_NOT_SUPPORTED')
    }

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * This method create an element deploymentElement
     * @param {File} rawFile - this File is the deployment element
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     * @return {Promise}     
     */
    create(rawFile) {
        let form;
        
        if (rawFile) {
            if (typeof rawFile !== 'string') {
                form = new FormData();
                let blob = new Blob([this._composeElement()], {
                    type: "application/json"
                });

                form.append('json', blob);

                if (rawFile) {
                    form.append('file', rawFile);
                }
            } else {
                form = {};
                form.json = JSON.stringify(this._composeElement());

                if (rawFile) {
                    form.hardwareMedia = rawFile;
                }
            }
        } else {
            form = new FormData();
            let blob = new Blob([JSON.stringify(this._composeElement())], {
                type: "application/octet-stream"
            });
            
            form.append('json', blob);

            form.append('file', this._file);
        }
        
        var petitionOpts = {};

        if (this._progressEvent != undefined) {
            petitionOpts = {
                'progress': this._progressEvent
            };
        }

        var defered = q.defer();
        var promise = defered.promise;

        this._ogapi.Napi.post_multipart(this._resource, form, petitionOpts, this._timeout, this._getExtraHeaders(), this._getUrlParameters())
            .then((res) => {
                if (res.statusCode === 201) {
                    defered.resolve({
                        location: res.header.location,
                        statusCode: res.statusCode
                    });
                } else {
                    defered.reject({
                        "errors": [{
                            code: res.statusCode,
                            message: "OGAPI_FILE_NOT_CREATE"
                        }],
                        "statusCode": res.statusCode
                    });
                }
            })
            .catch((error) => {
                defered.reject(error);
            });

        return promise;
    }
}