'use strict';

import GenericFinder from '../GenericFinder';

/**
 *   This class allow make get request to RuleConfigurationsHelper resource into Opengate North API.
 */
export default class RuleConfigurationsHelper extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'helper/dummyFunctions');
    }

    /**
     * Performs a get that returns dummyFunctions
     * @test
     *   ogapi.newRuleConfigurationsHelper().getdDummyFunctions();
     * @return {Promise} 
     */
    getdDummyFunctions() {
        return this._execute();
    }

    _composeUrl() {
        return this._baseUrl;
    }
}