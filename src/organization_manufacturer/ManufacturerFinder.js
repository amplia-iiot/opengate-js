'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';
import { MANUFACTURERS_RESOURCE, PRE_RESOURCE } from './Manufacturer'

/**
 *   This class allow make get request to hardware manufacturers resource into Opengate North API.
 */
export default class ManufacturerFinder extends ProvisionGenericFinder {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, PRE_RESOURCE, 'manufacturer', 'Manufacturer not found');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        this._setUrlParameters({
            visibility: this._visibility || 'assignable'
        });

        return this._baseUrl + "/" + this._organization + MANUFACTURERS_RESOURCE + (this._identifier ? "/" + this._identifier : "");
    }

    /**
     * Marks visibility assignable for manufacturer list retrieval
     * @test
     *   ogapi.newOrganizationManufacturerFinder().assignable().findByOrganization('organization').then().catch();
     * @return {this} 
     */
    assignable() {
        this._visibility = 'assignable'
        return this
    }

    /**
     * Marks visibility administrable for manufacturer list retrieval
     * @test
     *   ogapi.newOrganizationManufacturerFinder().assignable().findByOrganization('organization').then().catch();
     * @return {this} 
     */
    administrable() {
        this._visibility = 'administrable'
        return this
    }

    /**
     * Retrieves all manufacturer from a organization
     * @test
     *   ogapi.newOrganizationManufacturerFinder().findByOrganization('organization').then().catch();
     * @param {string} organization - organization name .
     * @return {Promise} 
     */
    findByOrganization(organization) {
        this._organization = organization;
        return this._execute();
    }

    /**
     * Retrieves a specific manufacturer
     * @test
     *   ogapi.newOrganizationManufacturerFinder().findByOrganizationAndId('organization', 'identifier').then().catch();
     * @param {string} organization - organization name .
     * @param {string} identifier - manufacturer name .
     * @return {Promise} 
     */
    findByOrganizationAndId(organization, identifier) {
        this._organization = organization;
        this._identifier = identifier;
        return this._execute();
    }
}
