'use strict';

import Search from './Search';
import q from 'q';

/** 
 * This class extends Search and allows requests to be made to any available resource in the OpenGate North API.
 */
export default class AssetSearch extends Search {
    /**
     * Constructor
     * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     * @param {!string} url - this define a specific resource to make the search
     * @param {object} filter - this is the filter
     * @param {object} limit - this is the pagination about the search
     * @param {object} sort - this defined parameters to order the result of search
     * @param {object} group - this defined the group by
     */
    constructor(ogapi, url, filter, limit, sort, group, select, timeout, urlParams) {
        super(ogapi, url, filter, limit, sort, group, select, timeout, urlParams);
    }

    /**
     * This invokes a request to the OpenGate North API; the response is handled via promises.
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     */
    execute() {
        var defered = q.defer();
        var promise = defered.promise;
        var parameters = this._getUrlParameters();

        this._ogapi.Napi
            .post(this._resource, this._filter(), this._timeout, this._getExtraHeaders(), parameters)
            .then((response) => {
                let resultQuery = response.body;
                let statusCode = response.statusCode;

                if (statusCode === 200) {
                    resultQuery.assets = resultQuery.entities;
                    delete resultQuery.entities;
                }
                defered.resolve({
                    data: resultQuery,
                    statusCode: statusCode
                });
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }


}