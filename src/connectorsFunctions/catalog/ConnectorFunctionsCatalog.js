'use strict';

import GenericFinder from "../../GenericFinder";

/**
 *   This class allow make get request to connector functions catalog resource into Opengate North API.
 */
export default class ConnectorFunctionsCatalog extends GenericFinder {

    constructor(ogapi){
        super(ogapi, 'connectorFunctions/provision/catalog', 'connectorFunctions', 'Connector functions not found');
    }

    /**
     * Get connector functions catalog
     * 
     * @returns {Promise}
     */
    getConnectorFunctionsCatalog(){
        return this._execute(true);
    } 

    _composeUrl() {
        return this._baseUrl;
    }

}