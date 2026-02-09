'use strict';
import GenericFinder from '../GenericFinder';

/**
 *   This class allow make get request to planner resource into Opengate North API.
 */
export default class RestRequestFinder extends GenericFinder {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'organization', 'list', 'Rest request not found', 'scheduler');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + "/" + this._organization + "/restRequest";
    }

    /**
    * Download a complete list of scheduler history for the organization. This execute a GET http method
    * @test
    *   ogapi.newScheduleRestRequestFinder().findByOrganization(organization).then().catch();
    * @return {Promise} 
    */
    findByOrganization(organization) {
        this._organization = organization;
        return this._execute();
    }
}