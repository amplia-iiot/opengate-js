'use strict';

import GenericFinder from '../GenericFinder';

/**
 *   This class allow make get request to pipeline resource into Opengate North API.
 */
export default class PipelineFinder extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'ai', 'list', 'Pipeline not found', 'north');
    }

     /**
     * Download a complete list of pipelines by its organization. This execute a GET http method
     * @test
     *   ogapi.newPipelineFinder().findByOrganization('orgname').then().catch();
     * @param {string} organization - pipeline organization .
     * @return {Promise} 
     */
    findByOrganization(organization) {
        this._organization = organization;
        return this._execute();
    }

    /**
     * Download a specific pipeline by its organization and id. This execute a GET http method
     * @test
     *   ogapi.newPipelineFinder().findByOrganizationAndName('orgname', xxx-xx-xxx-xxx').then().catch();
     * @param {string} organization - pipeline organization .
     * @param {string} identifier - pipeline identifier.
     * @return {Promise} 
     */
    findByOrganizationAndIdentifier(organization, identifier) {
        this._organization = organization;
        this._identifier = identifier;
        return this._execute();
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + "/" + this._organization + "/pipelines" + (this._identifier?'/'+ this._identifier:'');
    }
}