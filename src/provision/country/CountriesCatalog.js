'use strict';

import GenericFinder from '../../GenericFinder';
import q from 'q';
import HttpStatus from 'http-status-codes';

/**
 *   This class allow make get request to countries catalog resource into Opengate North API.
 */
export default class CountriesCatalog extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'countries/catalog', "countries", 'Countries not found');
        // IMPORTANTE: cuando se implemente el catalogo de countries en API-REST, eliminar este código
        this.__deleteCountriesFilter = ogapi.Napi._options._internalCountriesFilter
        this.__deleteResource = 'search/entities'
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
        return this._baseUrl;
    }

    // IMPORTANTE: cuando se implemente el catalogo de countries en API-REST, eliminar este método
    __deleteFilter() {
        let resourceType = this.__deleteCountriesFilter.resourceType
        let filter = {
            'and': [{
                    'eq': {
                        resourceType: resourceType
                    }
                },
                {
                    'eq': {
                        'provision.administration.identifier': this.__deleteCountriesFilter.identifier
                    }
                }
            ]
        }
        let specificTypeFilter = {}
        specificTypeFilter['provision.' + resourceType.replace('entity.', '') + '.specificType._current.value'] = this.__deleteCountriesFilter.specificType
        filter.and.push({ 'eq': specificTypeFilter })
        return {
            filter: filter,
            limit: {
                size: 1,
                start: 1
            }
        }
    }

    // IMPORTANTE: cuando se implemente el catalogo de countries en API-REST, eliminar este método
    _execute() {
        let defered = q.defer();
        let promise = defered.promise;
        this._api
            .post(this.__deleteResource, this.__deleteFilter(), this._timeout, null, {flattened: true}, this._getServiceBaseURL())
            .then((response) => {
                let resultQuery = response.body;
                let statusCode = response.statusCode;
                let countries = []
                if (statusCode === 204 || (statusCode === 200 && resultQuery['entities'].length === 0)) {
                    defered.reject({
                        error: this._error_not_found,
                        statusCode: HttpStatus.NOT_FOUND
                    })
                } else {
                    let entity = resultQuery['entities'][0]
                    countries = entity['provision.onfieldDeployments.fa.location'] && entity['provision.onfieldDeployments.fa.location']._value._current.value
                }
                defered.resolve({
                    data: countries,
                    statusCode: statusCode
                });
            })

            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }
}