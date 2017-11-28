'use strict'

import Search from './Search'
import q from 'q';

/** 
 * This extends Search and it allow make request to any available resource into /entities resource at Opengate North API
 */
export default class EntitySearch extends Search {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     * @param {!string} url - this define a specific resource to make the search
     * @param {object} filter - this is the filter
     * @param {object} limit - this is the pagination about the search
     * @param {object} sort - this define parameters to order the result of search
     * @param {object} group - this define parameters to group
     * @param {object} select - this define fields to retrieve
     */
    constructor(ogapi, url, filter, limit, sort, group, select, timeout) {
        super(ogapi, url, filter, limit, sort, group, select, timeout);
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
        console.log(JSON.stringify(this._filter()));
        this._ogapi.Napi
            .post(this._resource, this._filter(), this._timeout)
            .then((response) => {
                let resultQuery = response.body;
                let statusCode = response.statusCode;

                if (statusCode === 200 && resultQuery.entities && resultQuery.entities.length > 0) {
                    // OUW-944
                    var ele, flattened = false;

                    if (resultQuery.entities[0]['provision.administration.identifier']) {
                        flattened = true;
                    }

                    for (ele = 0; ele < resultQuery.entities.length; ele++) {
                        if (flattened) {
                            if (resultQuery.entities[ele]['device.identifier']) {
                                var dato = resultQuery.entities[ele]['device.identifier'];
                                if (!dato._value || (dato._value && !dato._value._current)) {
                                    delete resultQuery.entities[ele]['device.identifier'];
                                }
                            }

                        } else {
                            if (resultQuery.entities[ele].device && resultQuery.entities[ele].device.identifier && !resultQuery.entities[ele].device.identifier._current) {
                                delete resultQuery.entities[ele].device.identifier;
                            }
                        }
                    }

                }
                defered.resolve({ data: resultQuery, statusCode: statusCode });
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }
}