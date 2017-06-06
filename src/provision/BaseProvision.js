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

        console.log("URL: " + this._resource);
        //En muchas clases se genera this._resource en la llamada a la funcion this._composeElement()

        let _postElement = this._composeElement();

        this._ogapi.Napi.post(this._resource, _postElement)
            .then((res) => {
                if (res.statusCode === 201) {
                    console.log("CREATEOK: " + JSON.stringify(res));
                    if (typeof this._onCreated === "function") {
                        this._onCreated(res.header['location']);
                    }
                    defered.resolve({ location: res.header['location'], statusCode: res.statusCode });
                } else {
                    defered.reject({ errors: res.errors, statusCode: res.statusCode });
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
    delete() {
        var defered = q.defer();
        var promise = defered.promise;
        this._ogapi.Napi.delete(this._buildURL())
            .then((res) => {
                if (res.statusCode === 200) {
                    defered.resolve({ statusCode: res.statusCode });
                } else {
                    defered.reject({ errors: res.errors, statusCode: res.statusCode });
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
        this._ogapi.Napi.put(this._buildURL(), this._composeUpdateElement())
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

    _composeUpdateElement() {
        return this._composeElement();
    }

    _doNorthPost(resource, element) {
        var defered = q.defer();
        var promise = defered.promise;
        var id = element;
        this._ogapi.Napi.post(resource, element)
            .then((res) => {
                if (res.statusCode === 201) {
                    //console.log("CREATEOK: " + JSON.stringify(res));
                    if (typeof this._onCreated === "function") {
                        this._onCreated(res.header['location']);
                    }
                    defered.resolve({ location: res.header['location'], statusCode: res.statusCode });
                } else if (res.statusCode === 200) {
                    //console.log("POSTOK: " + JSON.stringify(res));
                    defered.resolve({ statusCode: res.statusCode });
                } else {
                    //console.log("ERROR " + JSON.stringify(res.errors));
                    defered.reject({ errors: res.errors, statusCode: res.statusCode });
                }
            })
            .catch((error) => {
                console.log("ERROR2 " + JSON.stringify(id) + JSON.stringify(error));
                defered.reject(error);
            });
        return promise;
    }
}