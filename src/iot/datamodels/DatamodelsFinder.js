'use strict';

import ProvisionGenericFinder from '../../ProvisionGenericFinder';

export const DATAMODEL_RESOURCE = '/datamodels/';

/**
 *   This class allow make get request to organization resource into Opengate North API.
 */
export default class DatamodelsFinder extends ProvisionGenericFinder {
    /**
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'organizations/', 'datamodels', 'Datamodel not found');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + this._organization + DATAMODEL_RESOURCE + this._id;
    }

    /**
     * Download a specific IoT Datamodel by its organization and id. This execute a GET http method
     * @test
     *   ogapi.newDatamodelsFinder().findByOrganizationAndId('orgname', 'xxx-xx-xxx-xxx').then().catch();
     * @param {string} organization - datamodel organization .
     * @param {string} id - datamodel id.
     * @return {Promise} 
     */
    findByOrganizationAndId(organization, id) {
        this._organization = organization;
        this._id = id;
        return this._execute();
    }

}