'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';


/**
 * This class allows making GET requests to the area resource in the OpenGate North API.
 */
export default class AreaFinder extends ProvisionGenericFinder {


    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'organizations', 'area', 'Area/s not found');
    }

    /**
     * Downloads a specific area by its organization and identifier. This executes a GET HTTP method.
     * @test
     *   ogapi.newAreaFinder().findByOrganizationAndIdentifier('orgname', xxx-xx-xxx-xxx').then().catch();
     * @param {string} organization - area organization .
     * @param {string} identifier - area name.
     * @return {Promise} 
     */
    findByOrganizationAndIdentifier(organization, identifier) {
        this._checkString(organization, 'organization');
        this._checkString(identifier, 'identifier');
        this._organization = organization;
        this._identifier = identifier;
        return this._execute();
    }

    _composeUrl() {
        return this._baseUrl + '/' + this._organization + '/areas' + '/' + this._identifier;
    }

    _checkString(parameter, name) {
        if (typeof parameter !== 'string') {
            throw new Error('OGAPI_STRING_PARAMETER');
        }
    }
}