'use strict';

import ProvisionGenericFinder from '../../ProvisionGenericFinder';
import jp from 'jsonpath';
import q from 'q';
import HttpStatus from 'http-status-codes';
import parameterError from '../../util/parameterError';
/**
 * This class allows making GET requests to the countries catalog resource in OpenGate North API.
 *
 * **It needs the `_internalCountriesFilter` client option**, and there is no default. OUW-3924 built
 * it that way on purpose: the catalogue is not an endpoint but an *asset* entity with
 * `entityType WIRE` and an identifier of the form `DOMAIN_<domain>`, so the caller has to say which
 * entity to read, the same way it says which api key to use. The ticket notes the intention to
 * replace this with a real catalogue endpoint and drop the option again.
 *
 *     new OpenGateAPI({
 *         url, apiKey,
 *         _internalCountriesFilter: {
 *             organization: 'myorg',
 *             identifier: 'DOMAIN_myorg',
 *             ds: 'provision.administration.countries'
 *         }
 *     });
 *
 * Without it, `getCountries()` used to die with
 * `Cannot read properties of undefined (reading 'organization')`, which said nothing about the
 * option that was missing.
 */
export default class CountriesCatalog extends ProvisionGenericFinder {
    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'organizations', 'entity', 'Countries not found');
        this.__filter = this._api._options._internalCountriesFilter;
    }

    /**
     * Performs a get that returns countries
     * @test
     *   ogapi.newCountriesCatalog().getCountries();
     * @return {Promise}
     */
    getCountries() {
        if (!this.__filter) {
            throw parameterError('OGAPI_COUNTRIES_FILTER_NOT_CONFIGURED', { parameter: '_internalCountriesFilter' });
        }
        return this._execute();
    }

    _composeUrl() {
        return this._baseUrl + '/' + this.__filter.organization + '/entities/' + this.__filter.identifier;
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
        this._api
            .get(this._composeUrl(), undefined, this._getExtraHeaders(), this._getUrlParameters(), false, this._getServiceBaseURL())
            .then(req => {
                if (req.statusCode === 204) {
                    defered.reject({
                        error: _error_not_found,
                        statusCode: HttpStatus.NOT_FOUND
                    });
                } else {
                    var data = (jp.query(req.body, '$.' + _this.__filter.ds + '._current.value') || [])[0];
                    defered.resolve({
                        data: data,
                        statusCode: req.statusCode
                    });
                    // }
                }
            })
            .catch(error => {
                // BUG RELACIONADO (http://cm.amplia.es/jira/browse/OGODM-3250)
                if (error.statusCode === 400) {
                    error.statusCode = HttpStatus.NOT_FOUND;
                }
                defered.reject(error);
            });
        return promise;
    }
}
