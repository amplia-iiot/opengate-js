'use strict';

import GenericFinder from '../GenericFinder';

/**
 *   This class allow make get request to ConnectorFunctionsCatalog resource into Opengate North API.
 */
export default class ConnectorFunctionsCatalog extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'catalogs/connectorFunctions');
    }

    /**
     * Performs a get that returns connectorFunctions templates
     * @test
     *   ogapi.newConnectorFunctionsCatalog().getTemplates();
     * @return {Promise} 
     */
    getTemplates() {
        return this._execute();
    }

    _composeUrl() {
        return this._baseUrl;
    }
}