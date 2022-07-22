'use strict';

import GenericFinder from '../GenericFinder';

/**
 *   This class allow make get request to transformer resource into Opengate North API.
 */
export default class TransformerFinder extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'ai', 'list', 'Transformer not found', 'v1');
    }

     /**
     * Download a complete list of transformers by its organization. This execute a GET http method
     * @test
     *   ogapi.newTransformerFinder().findByOrganization('orgname').then().catch();
     * @param {string} organization - transformer organization .
     * @return {Promise} 
     */
    findByOrganization(organization) {
        this._organization = organization;
        return this._execute();
    }

    /**
     * Download a specific transformer by its organization and id. This execute a GET http method
     * @test
     *   ogapi.newTransformerFinder().findByOrganizationAndName('orgname', xxx-xx-xxx-xxx').then().catch();
     * @param {string} organization - transformer organization .
     * @param {string} name - transformer name.
     * @return {Promise} 
     */
    findByOrganizationAndName(organization, name) {
        this._organization = organization;
        this._name = name;
        return this._execute();
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + "/" + this._organization + "/transformers" + (this._name?'/'+ this._name:'');
    }
}