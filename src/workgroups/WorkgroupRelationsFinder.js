'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';

/**
 *   This class allow make get request to workgroup relation resource into Opengate North API.
 */
export default class WorkgroupRelationsFinder extends ProvisionGenericFinder {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'domains', 'workgroup', 'Workgroup relation not found');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + "/" + this._domain + "/workgroups/" + this._name + "/relations";
    }

    /**
     * @param {string} domain - domain name 
     * @param {string} name - workgroup name
     * @return {Promise} 
     */
    findByDomainAndName(domain, name) {
        this._domain = domain;
        this._name = name;
        return this._execute();
    }
}