'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';

/**
 *   This class allow make get request to certificate resource into Opengate North API.
 */
export default class EntityFinder extends ProvisionGenericFinder {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi, source, entity, error_not_found) {
        super(ogapi, source, entity, error_not_found);
        this._entitySource = this._entity + "s";
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + "/" + this._organization + "/entities/" + this._entitySource + "/" + this._id;
    }

    /**
     * Download a specific entity by its organization and id. This execute a GET http method
     * @test
     *   ogapi.newDeviceFinder().findByOrganizationAndId('orgname', xxx-xx-xxx-xxx').then().catch();
     * @param {string} organization - entity organization .
     * @param {string} id - entity id.
     * @return {Promise} 
     */
    findByOrganizationAndId(organization, id) {
        this._organization = organization;
        this._id = id;
        return this._execute();
    }
}
