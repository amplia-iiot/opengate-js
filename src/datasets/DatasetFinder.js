'use strict';

import GenericFinder from '../GenericFinder';

/**
 *   This class allow make get request to DatasetFinder resource into Opengate North API.
 */
export default class DatasetFinder extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'datasets/provision/organizations', 'datasets');
    }

    /**
     * Performs a get that returns list of datasets
     * @test
     *   ogapi.newDatasetFinder().findByOrganization(organization);
     * @param {organization} string - organization
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
     * @param {organization} string - organization
     * @param {datasetId} string - dataset identifier
     * @return {Promise} 
     */
     findByOrganizationAndDatasetId(organization, datasetId) {
        this._withId(organization + '/' + datasetId);
        return this._execute();
    }
}