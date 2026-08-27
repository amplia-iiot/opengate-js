'use strict';

import GenericFinder from '../../GenericFinder';

/**
 * This class allows you to make GET requests to a connector functions catalog resource in the OpenGate North API.
 */
export default class ConnectorFunctionsCatalogFinder extends GenericFinder {
    constructor(ogapi) {
        super(ogapi, 'connectorFunctions/provision/catalog', 'connectorFunctions', 'Connector functions not found');
    }

    /**
     * Reading a Connector Function from catalog
     *
     * @param {String} connectorFunctionId
     * @returns {Promise}
     */
    findByConnectorFunctionsId(connectorFunctionId) {
        this._withId(connectorFunctionId);
        return this._execute(true);
    }
}
