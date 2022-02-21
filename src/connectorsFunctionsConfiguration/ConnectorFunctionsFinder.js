'use strict';

//import ProvisionGenericFinder from '../ProvisionGenericFinder';
import GenericFinder from '../GenericFinder';

/**
 *   This class allow make get request to ConnectorFunctions resource into Opengate North API.
 */
export default class ConnectorFunctionsFinder extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'connectorfunctions/provision/organizations', "connectorfunctions", 'Connector functions not found');
    }

    /**
     * Performs a get that returns connectors functions related
     * @test
     *   ogapi.newConnectorFunctionsFinder().findByOrganizationAndChannel('xxx-xx-xxx-xxx', 'xxxxx-xxxx-xxxx').then().catch();
     * @param {string} organization - organization 
     * @param {string} channel - channel.
     * @return {Promise} 
     */
    findByOrganizationAndChannel(organization, channel) {
        let _this = this;
        _this._organization = organization;
        _this._channel = channel;

        return this._execute();
    }
    
    /**
     * Performs a get that returns connectors functions related
     * @test
     *   ogapi.newConnectorFunctionsFinder().findByOrganizationAndChannel('xxx-xx-xxx-xxx', 'xxxxx-xxxx-xxxx').then().catch();
     * @param {string} organization - organization 
     * @param {string} channel - channel.
     * @param {string} name - Connector function name
     * @return {Promise} 
     */
    findByOrganizationAndChannelAndName(organization, channel, name) {
        let _this = this;
        _this._organization = organization;
        _this._channel = channel;
        _this._name = name;

        return this._execute();
    }

    _composeUrl() {
        return this._baseUrl + "/" + this._organization + "/channels/" + this._channel + (this._name?"/" + this._name:'');
    }

}