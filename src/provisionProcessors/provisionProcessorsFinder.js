'use strict';

import GenericFinder from '../GenericFinder';

/**
 *   This class allow make get request to ProvisionProcessors Finder resource into Opengate North API.
 */
export default class provisionProcessorsFinder extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'provisionProcessors/provision/organizations', 'provisionPrecessors');
    }

    /**
     * Performs a get that returns list of provision processors
     * @test
     *   ogapi.newProvisionProcessorsFinder().findByOrganization(organization);
     * @param {string} organization - organization
     * @return {Promise} 
     */
     findByOrganization(organization) {
        this._withId(organization);
        return this._execute();
    }

    /**
     * Performs a get that returns a definition of provision Processors
     * @test
     *   ogapi.newProvisionProcessorsFinder().findByOrganizationAndProvisionProcessorId(organization, identifier);
     * @param {string} organization - organization
     * @param {string} identifier - Provision Processors identifier
     * @return {Promise} 
     */
     findByOrganizationAndProvisionProcessorId(organization, identifier) {
         console.log('estoy aqui', organization + '/' + identifier)
        this._withId(organization + '/' + identifier);
        return this._execute();
    }
}