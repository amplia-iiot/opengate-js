'use strict';

import ProvisionGenericFinder from '../../ProvisionGenericFinder';
import jp from 'jsonpath';
import q from 'q';
import HttpStatus from 'http-status-codes';
/**
 *   This class allow make get request to countries catalog resource into Opengate North API.
 *   //IMPORTANTE: ver tarea OUW-3924 para entender la realización de esta clase
 */
export default class CountriesCatalog extends ProvisionGenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'organizations', "entity", 'Countries not found');
        this.__filter = this._api._options._internalCountriesFilter
    }

    /**
     * Performs a get that returns countries
     * @test
     *   ogapi.newCountriesCatalog().getCountries();
     * @return {Promise} 
     */
    getCountries() {
        return this._execute();
    }

    _composeUrl() {
        return this._baseUrl + "/" + this.__filter.organization + "/entities/" + this.__filter.identifier;
    }

    /**
     * @return {Promise}
     * @private
     */
    _execute() {
        let defered = q.defer();
        let promise = defered.promise;
        let _this = this;
        let _error_not_found = this._error_not_found;
        this._api.get(this._composeUrl(), undefined, this._getExtraHeaders(), this._getUrlParameters(), false, this._getServiceBaseURL())
            .then((req) => {
                if (req.statusCode === 204) {
                    defered.reject({
                        error: _error_not_found,
                        statusCode: HttpStatus.NOT_FOUND
                    });
                } else {
                    var data = ( jp.query(req.body, '$.' + _this.__filter.ds + '._current.value') || [])[0]
                    defered.resolve({
                        data: data,
                        statusCode: req.statusCode
                    });
                    // }
                }
            })
            .catch((error) => {
                // BUG RELACIONADO (http://cm.amplia.es/jira/browse/OGODM-3250)
                if (error.statusCode === 400) {
                    error.statusCode = HttpStatus.NOT_FOUND;
                }
                defered.reject(error);
            });
        return promise;
    }

}