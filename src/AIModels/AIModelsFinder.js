'use strict';

import GenericFinder from '../GenericFinder';

/**
 *   This class allow make get request to aiModel resource into Opengate North API.
 */
export default class AIModelsFinder extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'ai', 'list', 'AIModel not found', 'v1');
    }

     /**
     * Download a complete list of aiModels by its organization. This execute a GET http method
     * @test
     *   ogapi.newAIModelFinder().findByOrganization('orgname').then().catch();
     * @param {string} organization - aiModel organization .
     * @return {Promise} 
     */
    findByOrganization(organization) {
        this._organization = organization;
        return this._execute();
    }

    /**
     * Download a specific aiModel by its organization and id. This execute a GET http method
     * @test
     *   ogapi.newAIModelFinder().findByOrganizationAndName('orgname', xxx-xx-xxx-xxx').then().catch();
     * @param {string} organization - aiModel organization .
     * @param {string} name - aiModel name.
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
        return this._baseUrl + "/" + this._organization + "/models" + (this._name?'/'+ this._name:'');
    }
}