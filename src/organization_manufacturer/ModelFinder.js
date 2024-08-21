'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';

import { MANUFACTURERS_RESOURCE } from './Manufacturer';
import { PRE_RESOURCE, MODELS_RESOURCE } from './Model';
/**
 *   This class allow make get request to hardware models resource into Opengate North API.
 */
export default class ModelFinder extends ProvisionGenericFinder {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, PRE_RESOURCE, 'model', 'Model not found');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + "/" + this._organization + MANUFACTURERS_RESOURCE + "/" + this._manufacturer + MODELS_RESOURCE + (this._identifier?"/" + this._identifier: "");
    }

    /**
     * Download a specific model by its id. This execute a GET http method
     * @test
     *   ogapi.newModelFinder().findByOrganizationAndManufacturerAndId('organization', 'manufacturer', 'modelname').then().catch();
     * @param {string} organization - model organization .
     * @param {string} manufacturer - model manufacturer .
     * @param {string} identifier - model name .
     * @return {Promise} 
     */
    findByOrganizationAndManufacturerAndId(organization, manufacturer, identifier) {
        this._organization = organization;
        this._manufacturer = manufacturer;
        this._identifier = identifier;
        return this._execute();
    }
}
