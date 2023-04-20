'use strict';

//import ProvisionGenericFinder from '../ProvisionGenericFinder';
import GenericFinder from '../GenericFinder';

/**
 *   This class allow make get request to OperationType resource into Opengate North API.
 */
export default class OperationTypeScriptFinder extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'operationTypes/provision/organizations', "operationTypeScripts", 'Operation type not found');
    }

    /**
     * Performs a get that returns operation type
     * @test
     *   ogapi.newOperationTypeScriptFinder().findByOrganizationAndIdentifier('xxx-xx-xxx-xxx', 'xxxxx-xxxx-xxxx').then().catch();
     * @param {string} organization - organization 
     * @param {string} identifier - Rule Configuration identifier
     * @return {Promise} 
     */
    findByOrganizationAndIdentifier(organization, name) {
        let _this = this;
        _this._organization = organization;
        _this._name = name;

        return this._execute();
    }

    _composeUrl() {
        return this._baseUrl + "/" + this._organization  + "/" + this._name + "/scripts" ;
    }

}