'use strict';

import {
    OPERATION_ENUM
} from './OPERATION_ENUM';
import {
    OPTION_ENUM
} from './OPTION_ENUM';
import {
    TYPE_ENUM
} from './TYPE_ENUM';
import {
    TYPE_VALIDATORS_ENUM
} from './TYPE_VALIDATORS_ENUM';
import {
    MODE_VALIDATORS_ENUM
} from './MODE_VALIDATORS_ENUM';

import q from 'q';
import BaseProvision from '../../provision/BaseProvision';

/**
 * This is a base object that contains all you can do about Deployment Element.
 */
export default class DeploymentElement extends BaseProvision {
    constructor(context, ogapi, url, progressEvent) {
        super(ogapi, url + "/deploymentElements");
        // this.Napi = Napi;
        this._progressEvent = progressEvent;

        this._resource = url + "/deploymentElements";
        //console.log(this._resource);
        this.validation = false;
        this._name = undefined;
        this._version = undefined;
        this._type = undefined;
        this._path = undefined;
        this._order = undefined;
        this._operation = undefined;
        this._option = undefined;
        this._fileName = undefined;
        this._downloadUrl = undefined;
        this._validators = undefined;
        this._oldName = undefined;
        this._oldVersion = undefined;
        this._oldPath = undefined;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {DeploymentElement}
     */
    withName(name) {
        if (typeof name !== 'string' || name.length > 50)
            throw new Error({
                message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50",
                parameter: 'name'
            });
        this._name = name;
        return this;
    }

    /**
     * Set the version attribute
     * @param {string} version - required field
     * @return {DeploymentElement}
     */
    withVersion(version) {
        if (typeof version !== 'string' || version.length > 50)
            throw new Error({
                message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50",
                parameter: 'version'
            });
        this._version = version;
        return this;
    }

    /**
     * Set the type attribute
     * @param {string} type - required field
     * @return {DeploymentElement}
     */
    withType(type) {
        if (typeof type === "undefined" || typeof type !== 'string') {
            throw new Error({
                message: 'OGAPI_STRING_PARAMETER',
                parameter: 'type'
            });
        }
        let not_found = '';
        let found = TYPE_ENUM.find(function(action) {
            return action == this;
        }, type);
        if (typeof found === "undefined") {
            not_found = type;
        }

        if (not_found !== '') {
            throw new Error({
                message: "OGAPI_NOT_ALLOWED_PARAMETER",
                parameter: JSON.stringify(not_found),
                allowed: JSON.stringify(TYPE_ENUM)
            });

        }
        this._type = type;
        return this;
    }

    /**
     * Set the path attribute
     * @param {string} path - required field
     * @return {DeploymentElement}
     */
    withPath(path) {
        if (typeof path !== 'string')
            throw new Error({
                message: 'OGAPI_STRING_PARAMETER',
                parameter: 'path'
            });
        this._path = path;
        return this;
    }

    /**
     * Set the order attribute
     * @param {string} order - required field
     * @return {DeploymentElement}
     */
    withOrder(order) {
        /*if (typeof order !== 'string')
            throw new Error('Parameter order must be a string');*/
        this._order = order;
        return this;
    }

    /**
     * Set the operation attribute
     * @param {string} operation - required field
     * @return {DeploymentElement}
     */
    withOperation(operation) {
        if (typeof operation === "undefined" || typeof operation !== 'string') {
            throw new Error({
                message: "OGAPI_STRING_PARAMETER",
                parameter: "operation"
            });
        }

        let not_found = '';
        let found = OPERATION_ENUM.find(function(operation) {
            return operation == this;
        }, operation);

        if (typeof found === "undefined") {
            not_found = operation;
        }

        if (not_found !== '') {
            throw new Error("Parameter operation is not allowed. Parameter value <'" +
                JSON.stringify(not_found) + "'>, operation allowed <'" + JSON.stringify(OPERATION_ENUM) + "'>");
        }
        this._operation = operation;
        return this;
    }

    /**
     * Set the option attribute
     * @param {string} option 
     * @return {DeploymentElement}
     */
    withOption(option) {
        if (typeof option === "undefined" || typeof option !== 'string') {
            throw new Error({
                message: "OGAPI_STRING_PARAMETER",
                parameter: "option"
            });
        }

        let not_found = '';
        let found = OPTION_ENUM.find(function(option) {
            return option == this;
        }, option);
        if (typeof found === "undefined") {
            not_found = option;
        }

        if (not_found !== '') {
            throw new Error("Parameter option is not allowed. Parameter value <'" +
                JSON.stringify(not_found) + "'>, option allowed <'" + JSON.stringify(OPTION_ENUM) + "'>");
        }
        this._option = option;
        return this;
    }

    /**
     * Set the validators attribute
     * @param {Array} validators 
     * @return {DeploymentElement}
     */
    withValidators(validators) {
        let validator = {};
        let validatorsArray = [];

        if (typeof validators === "undefined" || validators.constructor !== Array) {
            throw new Error("Parameter validators must be typeof Array");
        }

        // Validar si los validators son correctos, solo se permite un firmware

        let trustedBootExists = false;
        for (var i = 0; i < validators.length; i++) {
            validator = this._checkValidator(validators[i]);

            if (validator.mode === 'TRUSTED_BOOT') {
                if (!trustedBootExists) {
                    trustedBootExists = true;
                } else {
                    throw new Error("OGAPI_422_ONE_TRUSTED_BOOT_ALLOWED_DEPLOY_ELEMENT");
                }
            }
            validatorsArray.push(validator);
        }
        this._validators = validatorsArray;


        return this;
    }

    _checkValidator(validator) {

        let validatorElement = {};

        if (validator.mode) {
            let not_found = '';
            let mode = validator.mode;

            if (typeof mode === "undefined" || typeof mode !== 'string') {
                throw new Error({
                    message: "OGAPI_STRING_PARAMETER",
                    parameter: "type"
                });
            }

            let foundMode = MODE_VALIDATORS_ENUM.find(function(action) {
                return action == this;
            }, mode);

            if (typeof foundMode === "undefined") {
                not_found = mode;
            }

            if (not_found !== '') {
                throw new Error("Parameter type is not allowed. Parameter value <'" +
                    JSON.stringify(not_found) + "'>, type allowed <'" + JSON.stringify(MODE_VALIDATORS_ENUM) + "'>");
            }

            // Se valida que TRUSTED_BOOT sea sólo para firmwares
            if (mode !== 'TRUSTED_BOOT' || (mode === 'TRUSTED_BOOT' && this._type === 'FIRMWARE')) {
                validatorElement.mode = mode;
            } else {
                throw new Error("TRUSTED_BOOT validator only allowed for FIRMWARE deployment element");
            }
        } else {
            // por defecto se pone el primero de la lista
            validatorElement.mode = MODE_VALIDATORS_ENUM[0];
        }


        // Type es obligatorio
        if (validator.type) {
            let not_found = '';
            let type = validator.type;
            if (typeof type === "undefined" || typeof type !== 'string') {
                throw new Error({
                    message: "OGAPI_STRING_PARAMETER",
                    parameter: "type"
                });
            }

            let found = TYPE_VALIDATORS_ENUM.find(function(action) {
                return action == this;
            }, type);

            if (typeof found === "undefined") {
                not_found = type;
            }

            if (not_found !== '') {
                throw new Error("Parameter type is not allowed. Parameter value <'" +
                    JSON.stringify(not_found) + "'>, type allowed <'" + JSON.stringify(TYPE_VALIDATORS_ENUM) + "'>");
            }

            validatorElement.type = type;
        } else {
            throw new Error("Parameter type is required");
        }

        // si el validador es el primero de la lista (PLATFORM)
        if (validatorElement.mode === MODE_VALIDATORS_ENUM[0]) {
            if (validator.value) {
                let value = validator.value;
                if (typeof value !== 'string')
                    throw new Error('Parameter value must be a string');

                validatorElement.value = value;
            } else {
                throw new Error("Parameter value is required when mode is " + MODE_VALIDATORS_ENUM[0]);
            }
        }


        return validatorElement;

    }

    /**
     * Set the downloadUrl attribute
     * @param {string} downloadUrl 
     * @return {DeploymentElement}
     */
    withDownloadUrl(downloadUrl) {
        if (typeof downloadUrl !== 'string')
            throw new Error('Parameter downloadUrl must be a string');
        this._downloadUrl = downloadUrl;
        return this;
    }

    /**
     * Set the fileName attribute
     * @param {string} fileName 
     * @return {DeploymentElement}
     */
    withFileName(fileName) {
        if (typeof fileName !== 'string')
            throw new Error('Parameter fileName must be a string');
        this._fileName = fileName;
        return this;
    }

    /**
     * Set the validation attribute
     * @param {string} validation 
     * @return {DeploymentElement}
     */
    withValidation(validation) {
        if (typeof validation !== 'boolean')
            throw new Error('Parameter validation must be a boolean');
        this.validation = validation;
        return this;
    }

    /**
     * Sets the old name attribute
     * @param {string} name 
     * @return {DeploymentElement}
     */
    withOldName(name) {
        if (typeof name !== 'string')
            throw new Error('Parameter old name must be a string');
        this._oldName = name;
        return this;
    }

    /**
     * Sets the old version attribute
     * @param {string} version 
     * @return {DeploymentElement}
     */
    withOldVersion(version) {
        if (typeof version !== 'string')
            throw new Error('Parameter old version must be a string');
        this._oldVersion = version;
        return this;
    }

    /**
     * Sets the old path attribute
     * @param {string} path 
     * @return {DeploymentElement}
     */
    withOldPath(path) {
        if (typeof path !== 'string')
            throw new Error('Parameter old path must be a string');
        this._oldPath = path;
        return this;
    }

    /**
     * Sets the file to upload
     * @param {object} rawFile 
     * @return {DeploymentElement}
     */
    withFile(rawFile) {
        //console.log(rawFile);
        this._rawFile = rawFile;
        return this;
    }

    /**
     * @return {String} This returns a json with the element for create a deployment element.
     * @private
     */
    _composeUrlCreate() {
        if (this._name === undefined || this._version === undefined ||
            this._name === '' || this._version === '')
            throw new Error('Method not allowed - You must to define the name and version');
        this._setUrlParameters({
            fileValidationRequired: this.validation
        });
        return this._resource;
    }

    _composeElement() {
        if (this._operation === 'UPGRADE') {
            if (this._name === undefined || this._version === undefined || this._type === undefined ||
                this._path === undefined || this._order === undefined || this._operation === undefined ||
                this._oldName === undefined || this._oldVersion === undefined || this._oldPath === undefined)
                throw new Error('Method not allowed - You must define the basic element [name, version, type, path, order, operation, oldName, oldVersion and oldPath ]');

        } else if (this._name === undefined || this._version === undefined || this._type === undefined ||
            this._path === undefined || this._order === undefined || this._operation === undefined || this._option === undefined)
            throw new Error('Method not allowed - You must define the basic element [name, version, type, path, order, option and operation]');
        var meta = {
            deploymentElement: {
                name: this._name || undefined,
                version: this._version || undefined,
                type: this._type || undefined,
                path: this._path || undefined,
                order: this._order || undefined,
                operation: this._operation || undefined,
                option: this._option || undefined,
                fileName: this._fileName || undefined,
                downloadUrl: this._downloadUrl || undefined,
                validators: this._validators || undefined,
                oldName: this._oldName || undefined,
                oldVersion: this._oldVersion || undefined,
                oldPath: this._oldPath || undefined
            }
        };
        //console.log(JSON.stringify(meta));
        return meta;
    }


    /**
     * The request will have a specific time out if it will be exceeded then the promise throw an exception
     * @param {number} ms - timeout in milliseconds    
     * @return {Bundles} 
     */
    withTimeout(ms) {
        if (typeof ms !== "number") throw new Error('Parameter ms must be a number');
        this._timeout = ms;
        return this;
    }

    _buildURL() {
        if (this._name === undefined || this._version === undefined)
            throw new Error('Parameters name, version must be defined');
        return this._resource + "/" + this._name + "/version/" + this._version;
    }


    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * This method create an element deploymentElement
     * @param {File} rawFile - this File is the deployment element
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     * @return {Promise}     
     */
    createWithFile(rawFile) {
        let form;
        if (typeof rawFile !== 'string') {
            form = new FormData();
            let blob = new Blob([JSON.stringify(this._composeElement())], {
                type: "application/octet-stream"
            });

            form.append('meta', blob);

            if (rawFile) {
                form.append('file', rawFile);
            }
        } else {
            form = {};
            form.meta = JSON.stringify(this._composeElement());

            if (rawFile) {
                form.file = rawFile;
            }
        }

        var petitionOpts = {};

        if (this._progressEvent != undefined) {
            petitionOpts = {
                'progress': this._progressEvent
            };
        }

        var defered = q.defer();
        var promise = defered.promise;

        this._ogapi.Napi.post_multipart(this._composeUrlCreate(), form, petitionOpts, this._timeout, this._getExtraHeaders(), this._getUrlParameters())
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

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * This method create an element deploymentElement with previously assignated file
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     * @return {Promise}     
     */
    deploy() {
        //console.log("creando antes file: " + this._rawFile);
        return this.createWithFile(this._rawFile);
    }

    /**
     * This method invalidates the update option
     * @throws {Allways} Deployment elements cannot be updated.
     */
    update() {
        throw new Error("OGAPI_DEPLOYMENT_ELEMENT_NOT_UPDATED");
    }
}