'use strict';

import q from 'q';

/**
 * This is an abstract class, it must be extended to another class that defines the different actions of a specific provision.
 * This class is responsible for managing the request to execute Norte OpenGate API
 */
export default class BaseProvision {
    /**
     * Constructor
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} resource - this is a base url resource
     * @param {!number} [timeout] - timeout on request
     * @param {array} requiredParameters
     * @param {string} serviceBaseURL - base of the uri petition
     */
    constructor(ogapi, resource, timeout, requiredParameters = [], serviceBaseURL) {
        if (this.constructor === BaseProvision) {
            throw new Error("Cannot construct Abstract instances directly");
        }
        if (typeof this._composeElement !== "function") {
            throw new Error("Must override method:  composeElement");
        }
        if (typeof this._buildURL !== "function") {
            throw new Error("Must override method:  _buildURL");
        }
        if (timeout) {
            if (typeof timeout !== 'number') {
                this._timeout = ogapi.Napi._options.timeout;
            } else {
                this._timeout = timeout;
            }
        }

        this._ogapi = ogapi;
        this._resource = 'provision' + resource;
        this._requiredParameters = requiredParameters;
        this._headers = undefined;
        this._urlParameters = undefined;
        this._serviceBaseURL = serviceBaseURL
    }

    _checkRequiredParameters() {
        let parametersNotFound = [];
        if (this._requiredParameters && this._requiredParameters.length > 0) {
            for (let i = 0; i < this._requiredParameters.length; i++) {
                if (this[this._requiredParameters[i]] === undefined && this["_" + this._requiredParameters[i]] === undefined) {
                    parametersNotFound.push(this._requiredParameters[i]);
                }
            }

            if (parametersNotFound.length > 0) {
                throw new Error("There are required parameters that have not been set. Missing parameters: " +
                    JSON.stringify(parametersNotFound).replace(new RegExp("\"", 'g'), ""));
            }
        }
    }

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * This function create a entity of provision
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     * @example
     *  ogapi.organizationsBuilder().create()
     */
    create() {
        this._checkRequiredParameters();

        var defered = q.defer();
        var promise = defered.promise;

        //En muchas clases se genera this._resource en la llamada a la funcion this._composeElement()

        let _postElement = this._composeElement();
        this._ogapi.Napi.post(this._resource, _postElement, this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL())
            .then((res) => {
                if (res.statusCode === 201) {
                    if (typeof this._onCreated === "function") {
                        this._onCreated(res.header.location);
                    }
                    defered.resolve({
                        data: res.body,
                        location: res.header.location,
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

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * This function deletes a entity of provision
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     * @example
     * ogapi.organizationsBuilder().withName('delete_organization').delete();
     * ogapi.usersBuilder().withEmail('delete@user.com').delete();
     * ogapi.certificatesBuilder().withId('d3l3t3-c3rt1f1c4t3').delete();
     */
    delete(body) {
        var defered = q.defer();
        var promise = defered.promise;
        this._ogapi.Napi.delete(this._buildURL(), this._timeout, this._getExtraHeaders(), this._getUrlParameters(), body, this._getServiceBaseURL())
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

    _doSouthDelete(body) {
        var defered = q.defer();
        var promise = defered.promise;
        this._ogapi.Sapi.delete(this._buildURL(), this._timeout, this._getExtraHeaders(), this._getUrlParameters(), body, this._getServiceBaseURL())
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

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * This function updates a entity of provision
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     * @example
     *  ogapi.organizationsBuilder().update()
     */
    update() {
        var defered = q.defer();
        var promise = defered.promise;

        this._ogapi.Napi.put(this._buildURL(), this._composeUpdateElement(), this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL())
            .then((res) => {
                if (res.statusCode === 200) {
                    defered.resolve({
                        data: res.body,
                        statusCode: res.statusCode
                    });
                } else if (res.status === 200) {
                    defered.resolve({
                        data: res.body,
                        statusCode: res.status
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

    _composeUpdateElement() {
        return this._composeElement();
    }

    _doNorthPut(resource, element) {
        var defered = q.defer();
        var promise = defered.promise;

        this._ogapi.Napi.put(resource, element, this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL())
            .then((res) => {
                if (res.statusCode === 200) {
                    defered.resolve({
                        statusCode: res.statusCode
                    });
                } else if (res.status === 200) {
                    defered.resolve({
                        statusCode: res.status
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

    _doSouthPut(resource, element) {
        var defered = q.defer();
        var promise = defered.promise;

        this._ogapi.Sapi.put(resource, element, this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL())
            .then((res) => {
                if (res.statusCode === 200) {
                    defered.resolve({
                        statusCode: res.statusCode
                    });
                } else if (res.status === 200) {
                    defered.resolve({
                        statusCode: res.status
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

    _doNorthPost(resource, element, returnBody) {
        var defered = q.defer();
        var promise = defered.promise;
        this._ogapi.Napi.post(resource, element, this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL())
            .then((res) => {
                const response = {
                    statusCode: res.statusCode
                }
                if (res.statusCode === 201) {
                    if (typeof this._onCreated === "function") {
                        this._onCreated(res.header.location);
                    }
                    response.location = res.header.location
                    if (returnBody) {
                        response.data = res.body
                    }
                    defered.resolve(response);
                } else if (res.statusCode === 200) {
                    if (returnBody) {
                        response.data = res.body
                    }
                    defered.resolve(response);
                } else {
                    response.errors = res.errors
                    defered.reject(response);
                }
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }

    _doSouthPost(resource, element, returnBody) {
        var defered = q.defer();
        var promise = defered.promise;
        this._ogapi.Sapi.post(resource, element, this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL())
            .then((res) => {
                const response = {
                    statusCode: res.statusCode
                }
                if (res.statusCode === 201) {
                    if (typeof this._onCreated === "function") {
                        this._onCreated(res.header.location);
                    }
                    response.location = res.header.location
                    if (returnBody) {
                        response.data = res.body
                    }
                    defered.resolve(response);
                } else if (res.statusCode === 200) {
                    if (returnBody) {
                        response.data = res.body
                    }
                    defered.resolve(response);
                } else {
                    response.errors = res.errors
                    defered.reject(response);
                }
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }

    _getExtraHeaders() {
        return this._headers;
    }

    _setExtraHeaders(headers) {
        if (this._headers) {
            var keys = Object.keys(headers);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                this._headers[key] = headers[key];
            }
        } else {
            this._headers = headers;
        }
    }

    _getUrlParameters() {
        return this._urlParameters;
    }

    _setUrlParameters(parameters) {
        if (this._urlParameters) {
            var keys = Object.keys(parameters);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                this._urlParameters[key] = parameters[key];
            }
        } else {
            this._urlParameters = parameters;
        }
    }

    _checkValues(value, enumName) {
        let not_found = [];
        let found = enumName.find(function (value) {
            return value == this;
        }, value);

        if (typeof found === "undefined") {
            not_found.push(value);
        }
        if (not_found.length !== 0) {
            console.warn("Parameter value not allowed <'" + JSON.stringify(not_found) + "'>, allowed <'" + JSON.stringify(enumName) + "'>");
        }
        return value;
    }

    _getServiceBaseURL() {
        return this._serviceBaseURL
    }
}