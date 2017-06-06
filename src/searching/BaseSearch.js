'use strict';

import q from 'q';

/** 
 * This is a abstract class, it must be extended to another class that defined the specific search.
 * This class is responsible to manage execute request to OpenGate North API
 */
export default class BaseSearch {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} resource - this is a base url resource
     * @param {!number} [timeout] - timeout on request
     */
    constructor(ogapi, resource, timeout) {
        if (this.constructor === BaseSearch) {
            throw new Error("Cannot construct Abstract instances directly");
        }
        if (typeof this._filter !== "function") {
            throw new Error("Must override method: filter");
        }
        if (typeof timeout !== 'number') {
            this._timeout = ogapi.Napi._options.timeout;
        } else {
            this._timeout = timeout;
        }
        this._ogapi = ogapi;
        this._resource = 'search' + resource;
    }

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     */
    execute() {
        var defered = q.defer();
        var promise = defered.promise;
        //console.log("RESOURCE: " + this._resource);
        this._ogapi.Napi
            .post(this._resource, this._filter(), this._timeout)
            .then((response) => {
                let resultQuery = response.body;
                let statusCode = response.statusCode;
                if (typeof resultQuery === "undefined")
                    defered.reject("Data not found");
                else {
                    if (typeof this._appendData === "function" && statusCode === 200)
                        this._appendData(resultQuery);
                    defered.resolve({ data: resultQuery, statusCode: statusCode });
                }
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }
}