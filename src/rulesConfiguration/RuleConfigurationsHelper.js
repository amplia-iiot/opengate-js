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
        super(ogapi, 'rules');
        this._jsHeaders ={
            'Accept': 'application/javascript'
        };
        this._mdHeaders =  {
            'Accept': 'text/markdown'
        }
    }

    /**
     * Performs a get that returns dummy functions from rules service
     * @test
     *   ogapi.newRuleConfigurationsHelper().getdDummyFunctions();
     * @return {Promise} 
     */
    getdDummyFunctions() {
        //this._headers = this._jsHeaders
        this._id = 'js/dummyFunctions'
        return this._execute();
    }

    /**
     * Performs a get that returns documentation private of javascript functions from rules service
     * @test
     *   ogapi.newRuleConfigurationsHelper().getDocPrivateJavascriptFunctions();
     * @return {Promise} 
     */
     getDocPrivateJavascriptFunctions() {
        //this._headers = this._mdHeaders
        this._id = 'doc/private/javascriptFunctions'
        return this._execute();
    }
    /**
     * Performs a get that returns documentation of javascript functions from rules service
     * @test
     *   ogapi.newRuleConfigurationsHelper().getDocJavascriptFunctions();
     * @return {Promise} 
     */
     getDocJavascriptFunctions() {
        //this._headers = this._mdHeaders
        this._id = 'doc/javascriptFunctions'
        return this._execute();
    }

}