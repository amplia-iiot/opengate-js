'use strict';

import q from 'q';
import GenericFinder from '../GenericFinder';
import HttpStatus from 'http-status-codes';

/**
 *   This class allow make get request to DatasetFinder resource into Opengate North API.
 */
export default class DatasetFinder extends GenericFinder {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'datasets/provision/organizations', 'datasets');
    }

    /**
     * Performs a get that returns list of datasets
     * @test
     *   ogapi.newDatasetFinder().findByOrganization(organization);
     * @param {string} organization - organization
     * @return {Promise} 
     */
    findByOrganization(organization) {
        this._withId(organization);
        return this._execute();
    }

    /**
     * Performs a get that returns a definition of dataset
     * @test
     *   ogapi.newDatasetFinder().findByOrganizationAndDatasetId(organization, datasetId);
     * @param {string} organization - organization
     * @param {string} datasetId - dataset identifier
     * @return {Promise} 
     */
    findByOrganizationAndDatasetId(organization, datasetId) {
        this._withId(organization + '/' + datasetId);
        return this._execute();
    }

    /**
     * Performs a get that returns a definition of timeserie
     * @test
     *   ogapi.newDatasetFinder().findByOrganizationAndName(organization, name);
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
                var datasetId;
                result.data.forEach((dsData) => {
                    if (!datasetId && dsData.name === name) {
                        datasetId = dsData.identifier;
                    }
                });

                if (!datasetId) {
                    defered.reject({
                        error: _error_not_found,
                        statusCode: HttpStatus.NOT_FOUND
                    });
                } else {
                    _this._withId(organization + '/' + datasetId);

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
                                        data: { ...data ? data : req.body, identifier: datasetId },
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