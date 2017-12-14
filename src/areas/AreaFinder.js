'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';


/**
 *   This class allow make get request to area resource into Opengate North API.
 */
export default class AreaFinder extends ProvisionGenericFinder {


    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'organizations', 'area', 'Area/s not found');
    }

    /**
     * Download a specific area by its organization and identifier. This execute a GET http method
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
            throw new Error('Parameter ' + name + 'must be a string');
        }
    }
}