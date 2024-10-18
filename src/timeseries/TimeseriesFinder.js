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
        if(expand){
            if (!(expand instanceof Array)){
                throw new Error({
                    message: "Parameter expand requires an array",
                    parameter: 'expand'
                });
            } else if(expand.length > 0) parameters.expand = expand.join()
        }
        if(dataStreams){
            if (!(dataStreams instanceof Array)){
                throw new Error({
                    message: "Parameter dataStreams requires an array",
                    parameter: 'dataStreams'
                });
            } else if(dataStreams.length > 0) parameters.dataStreams = dataStreams.join()
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
}