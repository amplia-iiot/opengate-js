'use strict';

import q from 'q';

/**
 * This is an abstract class, it must be extended to another class that defines the different actions of a specific provision.
 * This class is responsible for managing the request to execute Norte OpenGate API
 */
export default class BaseProvision {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} resource - this is a base url resource
     * @param {!number} [timeout] - timeout on request
     */
    constructor(ogapi, resource, timeout, requiredParameters = []) {
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
    }

    _checkRequiredParameters () {
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
    create () {
        this._checkRequiredParameters();

        var defered = q.defer();
        var promise = defered.promise;

        //En muchas clases se genera this._resource en la llamada a la funcion this._composeElement()
        this._promisify(this._composeElement()).then((_postElement) => {
            return this._ogapi.Napi.post(this._resource, _postElement, this._timeout, this._getExtraHeaders(), this._getUrlParameters())
                .then((res) => {
                    if (res.statusCode === 201) {
                        if (typeof this._onCreated === "function") {
                            this._onCreated(res.header.location);
                        }
                        defered.resolve({
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
        }).catch((error) => {
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
    delete () {
        var defered = q.defer();
        var promise = defered.promise;
        this._ogapi.Napi.delete(this._buildURL(), this._timeout, this._getExtraHeaders(), this._getUrlParameters())
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
    update () {
        var defered = q.defer();
        var promise = defered.promise;
        this._promisify(this._composeUpdateElement()).then((_putElement) => {
            return this._ogapi.Napi.put(this._buildURL(), _putElement, this._timeout, this._getExtraHeaders(), this._getUrlParameters())
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
        }).catch((error) => {
            defered.reject(error);
        });
        return promise;
    }

    _promisify (elem) {
        if (typeof elem.then === 'function') return elem
        return Promise.resolve(elem)
    }

    _composeUpdateElement () {
        return this._composeElement();
    }

    _doNorthPut (resource, element) {
        var defered = q.defer();
        var promise = defered.promise;

        this._ogapi.Napi.put(resource, element, this._timeout, this._getExtraHeaders(), this._getUrlParameters())
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

    _doNorthPost (resource, element) {
        var defered = q.defer();
        var promise = defered.promise;
        this._ogapi.Napi.post(resource, element, this._timeout, this._getExtraHeaders(), this._getUrlParameters())
            .then((res) => {
                if (res.statusCode === 201) {
                    if (typeof this._onCreated === "function") {
                        this._onCreated(res.header.location);
                    }
                    defered.resolve({
                        location: res.header.location,
                        statusCode: res.statusCode
                    });
                } else if (res.statusCode === 200) {
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

    _getExtraHeaders () {
        return this._headers;
    }

    _setExtraHeaders (headers) {
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

    _getUrlParameters () {
        return this._urlParameters;
    }

    _setUrlParameters (parameters) {
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

}