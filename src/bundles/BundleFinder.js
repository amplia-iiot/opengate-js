'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';

/**
 * This class allows making GET requests to the bundle resource in the OpenGate North API.
 */
export default class BundleFinder extends ProvisionGenericFinder {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'bundles', 'bundle', 'Bundle not found');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + "/" + this._name + "/versions/" + this._version;
    }

    /**
     * Download a specific bundle by its name and version. This execute a GET http method
     * @test
     *   ogapi.newBundleFinder().findByNameAndVersion('bundlename', 'xxx-xx-xxx-xxx').then().catch();
     * @param {string} name - bundle name .
     * @param {string} version - bundle version.
     * @return {Promise} 
     */
    findByNameAndVersion(name, version) {
        this._name = name;
        this._version = version;
        return this._execute();
    }
}
