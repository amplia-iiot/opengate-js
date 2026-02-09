'use strict';

//import ProvisionGenericFinder from '../ProvisionGenericFinder';
import GenericFinder from '../GenericFinder';

/**
 *   This class allow make get request to OperationType resource into Opengate North API.
 */
export default class OperationTypeFinder extends GenericFinder {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'operationTypes/provision/organizations', "operationTypes", 'Operation type not found');
    }

    /**
     * Performs a get that returns operation type
     * @test
     *   ogapi.newOperationTypeFinder().findByOrganizationAndName('xxx-xx-xxx-xxx', 'xxxxx-xxxx-xxxx').then().catch();
     * @param {string} organization - organization 
     * @param {string} name - Rule Configuration name
     * @return {Promise} 
     */
    findByOrganizationAndName(organization, name) {
        let _this = this;
        _this._organization = organization;
        _this._name = name;

        // let defered = q.defer();
        // let promise = defered.promise;
        // let _error_not_found = this._error_not_found;

        return this._execute();
    }

    _composeUrl() {
        return this._baseUrl + "/" + this._organization + "/" + this._name;
    }

}