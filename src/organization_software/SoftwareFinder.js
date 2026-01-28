'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';
import { SOFTWARES_RESOURCE, PRE_RESOURCE } from './Software'

/**
 *   This class allow make get request to hardware softwares resource into Opengate North API.
 */
export default class SoftwareFinder extends ProvisionGenericFinder {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, PRE_RESOURCE, 'software', 'Software not found');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        this._setUrlParameters({
            visibility: this._visibility || 'assignable'
        });

        return this._baseUrl + "/" + this._organization + SOFTWARES_RESOURCE + (this._identifier ? "/" + this._identifier : "");
    }

    /**
     * Marks visibility assignable for software list retrieval
     * @test
     *   ogapi.newOrganizationSoftwareFinder().assignable().findByOrganization('organization').then().catch();
     * @return {this} 
     */
    assignable() {
        this._visibility = 'assignable'
        return this
    }

    /**
     * Marks visibility administrable for software list retrieval
     * @test
     *   ogapi.newOrganizationSoftwareFinder().assignable().findByOrganization('organization').then().catch();
     * @return {this} 
     */
    administrable() {
        this._visibility = 'administrable'
        return this
    }

    /**
     * Retrieves all software from a organization
     * @test
     *   ogapi.newOrganizationSoftwareFinder().findByOrganization('organization').then().catch();
     * @param {string} organization - organization name .
     * @return {Promise} 
     */
    findByOrganization(organization) {
        this._organization = organization;
        return this._execute();
    }

    /**
     * Retrieves a specific software
     * @test
     *   ogapi.newOrganizationSoftwareFinder().findByOrganizationAndId('organization', 'identifier').then().catch();
     * @param {string} organization - organization name .
     * @param {string} identifier - software name .
     * @return {Promise} 
     */
    findByOrganizationAndId(organization, identifier) {
        this._organization = organization;
        this._identifier = identifier;
        return this._execute();
    }
}
