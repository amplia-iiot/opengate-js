'use strict';

import GenericFinder from '../GenericFinder';

/**
 *   This class allow make get request to connectorFunctions resource into Opengate North API.
 */
export default class ConnectorFunctionFinder extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'connectorFunctions');
    }

    /**
     * Performs a get that returns connectorFunction matched
     * @test
     *   ogapi.newConnectorFunctionFinder().findByOrganizationAndChannelAndName('xxx-xx-xxx-xxx', 'xxxxx-xxxx-xxxx', 'xxxxx-xxxx-xxxx').then().catch();
     * @param {string} organization - organization 
     * @param {string} channel - channel.
     * @param {string} name - name.
     * @return {Promise} 
     */
    findByOrganizationAndChannelAndName(organization, channel, name) {
        this._withId(`${organization}/${channel}/${name}`)


        return this._execute();
    }
}