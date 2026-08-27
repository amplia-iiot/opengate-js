'use strict';

import GenericFinder from '../../GenericFinder';

/**
 * This class allows you to make GET requests to the connector functions catalog resource in the OpenGate North
 * API.
 */
export default class ConnectorFunctionsCatalog extends GenericFinder {
    constructor(ogapi) {
        super(ogapi, 'connectorFunctions/provision/catalog', 'connectorFunctions', 'Connector functions not found');
    }

    /**
     * Get connector functions catalog
     *
     * @returns {Promise}
     */
    getConnectorFunctionsCatalog() {
        return this._execute(true);
    }

    _composeUrl() {
        return this._baseUrl;
    }
}
