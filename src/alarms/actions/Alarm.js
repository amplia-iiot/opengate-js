'use strict';

import q from 'q';

/** 
 * This is a abstract class, it must be extended to another class that defined the specific search.
 * This class is responsible to manage execute operations request to OpenGate North API
 */
export default class Operation {
    /**
     * Constructor
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} resource - this is a base url resource
     * @param {!object} postObj - it will be sent as a data on post action 
     */
    constructor(ogapi, resource, postObj) {
        this._ogapi = ogapi;
        this._resource = resource;
        this._postObj = postObj;
    }

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     */
    execute() {
        let defered = q.defer();
        this._ogapi.Napi
            .post(this._resource, this._postObj)
            .then((response) => {
                let data;
                try {
                    data = JSON.parse(response.text);
                } catch (err) {
                    console.warn("Error parsing response data when execute post action to " + this._resource);
                }
                defered.resolve({
                    data: data ? data : {},
                    statusCode: response.statusCode,
                    location: response.header.location
                });
            })
            .catch((error) => {
                if (!error.data) {
                    error.data = {};
                }
                if (!error.data.errors) {
                    error.data.errors = [(typeof (error) === "string") ? {
                        message: error
                    } : error];
                }
                defered.reject(error);
            });
        return defered.promise;
    }
}