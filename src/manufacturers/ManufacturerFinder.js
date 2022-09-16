'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';

/**
 *   This class allow make get request to certificate resource into Opengate North API.
 */
export default class ManufacturerFinder extends ProvisionGenericFinder {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'manufacturers', 'manufacturer', 'Manufacturer not found');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + "/" + this._identifier;
    }

    /**
     * Download a specific manufacturer by its id. This execute a GET http method
     * @test
     *   ogapi.newManufacturerFinder().findById('manufacturername').then().catch();
     * @param {string} identifier - manufacturer name .
     * @return {Promise} 
     */
    findById(identifier) {
        this._identifier = identifier;
        return this._execute();
    }
}
