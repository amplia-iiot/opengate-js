'use strict';

import GenericFinder from '../GenericFinder';
// import ProvisionGenericFinder from '../ProvisionGenericFinder';

/**
 *   This class allow make get request to OperationType resource into Opengate North API.
 */
export default class OperationTypesCatalog extends GenericFinder {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'operationTypes/catalog', "operationType", 'Operation types not found');
    }

    /**
     * Performs a get that returns operation types templates
     * @test
     *   ogapi.newOperationTypeCatalog().getOperationTypes();
     * @return {Promise} 
     */
    getOperationTypes() {
        return this._execute();
    }

    _composeUrl() {
        return this._baseUrl;
    }
}