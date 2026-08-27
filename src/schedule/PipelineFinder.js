'use strict';
import GenericFinder from '../GenericFinder';

/**
 * This class allows making GET requests to the planner resource of the OpenGate North API.
 */
export default class PipelineFinder extends GenericFinder {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'organization', 'list', 'Pipeline not found', 'scheduler');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + "/" + this._organization + "/pipeline";
    }

    /**
    * Download a complete list of pipelines for the organization. This executes a GET HTTP method.
    * @test
    *   ogapi.newSchedulePipelineFinder().findByOrganization(organization).then().catch();
    * @return {Promise} 
    */
    findByOrganization(organization) {
        this._organization = organization;
        return this._execute();
    }
}