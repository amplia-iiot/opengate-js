'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';

/**
 *   *   This class allow make get request to entity provisioned resource into Opengate North API.
 */
export default class EntityFinder extends ProvisionGenericFinder {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi, entity, error_not_found, entitySource) {
        super(ogapi, 'organizations', entity || 'entity', error_not_found || 'Entity not found');
        this._entitySource = entitySource || 'entities';
        this._flattened = false;
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + "/" + this._organization + "/" + this._entitySource + "/" + this._id;
    }

    /**
     * Download a specific entity by its organization and id. This execute a GET http method
     * @test
     *   ogapi.newEntityFinder().findByOrganizationAndId('orgname', xxx-xx-xxx-xxx').then().catch();
     *   ogapi.newDeviceFinder().findByOrganizationAndId('orgname', xxx-xx-xxx-xxx').then().catch();
     *   ogapi.newSubscribersFinder().findByOrganizationAndId('orgname', xxx-xx-xxx-xxx').then().catch();
     *   ogapi.newSubscriptionsFinder().findByOrganizationAndId('orgname', xxx-xx-xxx-xxx').then().catch();
     * @param {string} organization - entity organization .
     * @param {string} id - entity id.
     * @param {string} flattened - flattened response flag.
     * @return {Promise} 
     */
    findByOrganizationAndId(organization, id, flattened) {
        this._organization = organization;
        this._id = id;
        this._setUrlParameters({
            flattened: flattened
        });
        return this._execute();
    }
}