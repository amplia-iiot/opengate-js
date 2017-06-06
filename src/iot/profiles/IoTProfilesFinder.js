'use strict';

import IoTProvisionGenericFinder from '../IoTProvisionGenericFinder';

import q from 'q';
import HttpStatus from 'http-status-codes';

export const PROFILE_RESOURCE = '/profiles/';

/**
 *   This class allow make get request to organization resource into Opengate North API.
 */
export default class IoTProfilesFinder extends IoTProvisionGenericFinder {
    /**
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'organizations/', 'profiles', 'IoT Profile not found');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + this._organization + PROFILE_RESOURCE + this._id;
    }

    /**
     * Download a specific IoT Profile by its organization and id. This execute a GET http method
     * @test
     *   ogapi.newIoTProfilesFinder().findByOrganizationAndId('orgname', 'xxx-xx-xxx-xxx').then().catch();
     * @param {string} organization - profile organization .
     * @param {string} id - profile id.
     * @return {Promise} 
     */
    findByOrganizationAndId(organization, id) {
        this._organization = organization;
        this._id = id;
        return this._execute();
    }

}