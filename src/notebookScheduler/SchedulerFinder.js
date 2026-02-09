'use strict';

import GenericFinder from '../GenericFinder';

/**
 *   This class allow make get request to planner resource into Opengate North API.
 */
export default class SchedulerFinder extends GenericFinder {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'schedulers', 'list', 'Scheduler not found', 'planner');
    }

    /**
    * Download a complete list of notebook schedulers for the user. This execute a GET http method
    * @test
    *   ogapi.newNotebooksSchedulerFinder().findAll().then().catch();
    * @return {Promise} 
    */
    findAll() {
        return this._execute();
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl;
    }
}