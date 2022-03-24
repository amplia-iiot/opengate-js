'use strict';

import GenericFinder from '../GenericFinder';
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
     * @param {string} organization - organization
     * @return {Promise} 
     */
    findByOrganization(organization) {
        this._withId(organization);
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
}