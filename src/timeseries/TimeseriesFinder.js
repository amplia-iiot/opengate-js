'use strict';

import q from 'q';
import GenericFinder from '../GenericFinder';
import HttpStatus from 'http-status-codes';

/**
 *   This class allow make get request to TimeseriesFinder resource into Opengate North API.
 */

export default class TimeseriesFinder extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'timeseries/provision/organizations', 'timeseries');
    }

    /**
      * Performs a get that returns list of timeseries
      * @test
      *   ogapi.newTimeserieFinder().findByOrganization(organization);
      *   ogapi.newTimeserieFinder().findByOrganization(organization, ['columns', 'context']);
      *   ogapi.newTimeserieFinder().findByOrganization(organization, [], ['ds_id_1', 'ds_id-2']);
      *   ogapi.newTimeserieFinder().findByOrganization(organization, ['columns'], []);
      *   ogapi.newTimeserieFinder().findByOrganization(organization, ['columns'], undefined);
      *   ogapi.newTimeserieFinder().findByOrganization(organization, undefined, ['ds_id_2']);
      * @param {string} organization - organization
      * @param {Array} expand - ['columns', 'context']
      * @param {Array} dataStreams - ["ds_id_1","ds_id_2"]
      * @return {Promise} 
      */
    findByOrganization(organization, expand, dataStreams) {
        this._withId(organization);
        const parameters = {}
        if (expand) {
            if (!(expand instanceof Array)) {
                throw new Error({
                    message: "Parameter expand requires an array",
                    parameter: 'expand'
                });
            } else if (expand.length > 0) parameters.expand = expand.join()
        }
        if (dataStreams) {
            if (!(dataStreams instanceof Array)) {
                throw new Error({
                    message: "Parameter dataStreams requires an array",
                    parameter: 'dataStreams'
                });
            } else if (dataStreams.length > 0) parameters.dataStreams = dataStreams.join()
        }
        this._setUrlParameters(parameters)
        return this._execute();
    }

    /**
     * Performs a get that returns a definition of timeserie
     * @test
     *   ogapi.newTimeserieFinder().findByOrganizationAndTimeserieId(organization, timeserieId);
     * @param {string} organization - organization
     * @param {string} timeserieId - timeserie identifier
     * @return {Promise} 
     */
    findByOrganizationAndTimeserieId(organization, timeserieId) {
        this._withId(organization + '/' + timeserieId);
        return this._execute();
    }

    /**
     * Performs a get that returns a definition of timeserie
     * @test
     *   ogapi.newTimeserieFinder().findByOrganizationAndName(organization, name);
     * @param {string} organization - organization
     * @param {string} name - timeserie name
     * @return {Promise} 
     */
    findByOrganizationAndName(organization, name) {
        let defered = q.defer();
        let promise = defered.promise;

        this._withId(organization);
        var _this = this;
        let _error_not_found = this._error_not_found;
        let _entity = this._entity;
        this._execute().then((result) => {
            if (result.data.length > 0) {
                var timeserieId;
                result.data.forEach((tsData) => {
                    if (!timeserieId && tsData.name === name) {
                        timeserieId = tsData.identifier;
                    }
                });

                if (!timeserieId) {
                    defered.reject({
                        error: _error_not_found,
                        statusCode: HttpStatus.NOT_FOUND
                    });
                } else {
                    _this._withId(organization + '/' + timeserieId);

                    _this._api.get(_this._composeUrl(), undefined, _this._getExtraHeaders(), _this._getUrlParameters(), false, _this._getServiceBaseURL())
                        .then((req) => {
                            if (req.statusCode === 204) {
                                defered.reject({
                                    error: _error_not_found,
                                    statusCode: HttpStatus.NOT_FOUND
                                });
                            } else {
                                if (req.body) {
                                    var data = req.body[_entity] && req.body.provision ? req.body : req.body[_entity];
                                    defered.resolve({
                                        data: data ? data : req.body,
                                        statusCode: req.statusCode
                                    });
                                } else {
                                    defered.resolve({
                                        data: req.text,
                                        statusCode: req.statusCode
                                    });
                                }
                            }
                        })
                        .catch((error) => {
                            // BUG RELACIONADO (http://cm.amplia.es/jira/browse/OGODM-3250)
                            if (error.statusCode === 400) {
                                error.statusCode = HttpStatus.NOT_FOUND;
                            }

                            defered.reject(error);
                        });
                }
            } else {
                defered.reject({
                    error: _error_not_found,
                    statusCode: HttpStatus.NOT_FOUND
                });
            }
        })
            .catch((error) => {
                defered.reject(error);
            });


        return promise;
    }
}