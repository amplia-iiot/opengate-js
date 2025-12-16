'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';

/**
 *   This class allow make get request to certificate resource into Opengate North API.
 */
export default class DomainFinder extends ProvisionGenericFinder {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'domains', 'domain', 'Domain not found');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        this._setUrlParameters({
            hierarchy: this._hierarchy
        });
        return this._baseUrl + "/" + this._name;
    }

    /**
     * Constructor
     * @param {string} name - domain name .
     * @return {Promise} 
     */
    findByName(name) {
        this._name = name;
        this._hierarchy = 'false';
        return this._execute();
    }

    /**
     * Constructor
     * @param {string} name - domain name.
     * @return {Promise} 
     */
    findByNameWithHierarchy(name) {
        this._name = name;
        this._hierarchy = 'true';
        return this._execute();
    }

}