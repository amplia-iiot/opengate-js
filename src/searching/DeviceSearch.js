import Search from './Search'
import q from 'q';

/** 
 * This extends BaseSearch and allow make request to any available resource into Opengate North API.
 */
export default class DeviceSearch extends Search {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     * @param {!string} url - this define a specific resource to make the search
     * @param {object} filter - this is the filter
     * @param {object} limit - this is the pagination about the search
     * @param {object} sort - this defined parameters to order the result of search
     * @param {object} group - this defined the group by
     */
    constructor(ogapi, url, filter, limit, sort, group, timeout) {
        super(ogapi, url, filter, limit, sort, group, timeout);
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
        this._ogapi.Napi
            .post(this._resource, this._filter(), this._timeout)
            .then((response) => {
                let resultQuery = response.body;
                let statusCode = response.statusCode;
                if (typeof resultQuery === "undefined" || resultQuery === null)
                    defered.reject("Data not found");
                else {
                    resultQuery.devices = resultQuery.entities;
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