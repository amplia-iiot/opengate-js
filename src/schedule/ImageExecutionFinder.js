'use strict';
import GenericFinder from '../GenericFinder';

/**
 *   This class allow make get request to planner resource into Opengate North API.
 */
export default class ImageExecutionFinder extends GenericFinder {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'organization', 'list', 'Schedule not found', 'scheduler');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + "/" + this._organization + "/imageExecution";
    }

    /**
    * Download a complete list of scheduler history for the organization. This execute a GET http method
    * @test
    *   ogapi.newImageExecutionFinder().findByOrganization(organization).then().catch();
    * @return {Promise} 
    */
    findByOrganization(organization) {
        this._organization = organization;
        return this._execute();
    }
}