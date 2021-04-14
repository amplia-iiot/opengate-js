'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';

/**
 * This class allow make get request to bulk template resource into Opengate North API.
 */
export default class BulkTemplateFinder extends ProvisionGenericFinder {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
     constructor(ogapi) {
        super(ogapi, 'organizations', 'bulk/templates', 'Bulk template not found');
    }

    /**
     * Download a specific entity by its organization and id. This execute a GET http method
     * @test
     *   ogapi.newBulkTemplateFinder().findByOrganizationAndId('orgname', xxx-xx-xxx-xxx').then().catch();
     * @param {string} organization - entity organization .
     * @param {string} name - Bulk template name.
     * @return {Promise} 
     */
     findByOrganizationAndId(organization, name) {
        this._organization = organization;
        this._name = name;

        return this._execute();
    }

    _composeUrl() {
        return this._baseUrl + "/" + this._organization + "/" + this._entity + "/" + this._id
    }
    
}