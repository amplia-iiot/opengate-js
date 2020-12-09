'use strict';

import GenericFinder from '../GenericFinder';

/**
 *   This class allow make get request to ConnectorsCatalog resource into Opengate North API.
 */
export default class ConnectorsCatalog extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'catalogs/conectors');
    }

    /**
     * Performs a get that returns connector templates
     * @test
     *   ogapi.newConnectorsCatalog().getTemplates();
     * @return {Promise} 
     */
    getTemplates() {
        return this._execute();
    }

    _composeUrl() {
        return this._baseUrl;
    }
}