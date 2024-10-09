'use strict';

import GenericFinder from '../GenericFinder';
import q from 'q';
import HttpStatus from 'http-status-codes';

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
            'accept': 'application/javascript'
        };
        this._mdHeaders =  {
            'accept': 'text/markdown'
        }
    }

    /**
     * Performs a get that returns documentation private of javascript functions from rules service
     * @test
     *   ogapi.newRuleConfigurationsHelper().getDocPrivateJavascriptFunctions();
     * @return {Promise} 
     */
     getDocPrivateJavascriptFunctions() {
        this._setExtraHeaders(this._mdHeaders)
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
        this._setExtraHeaders(this._mdHeaders)
        this._id = 'doc/javascriptFunctions'
        return this._execute();
    }

    /**
     * @return {Promise}
     * @private
     */
     _execute() {
        let defered = q.defer();
        let promise = defered.promise;
        let _error_not_found = this._error_not_found;
        this._api.get(this._composeUrl(), undefined, this._getExtraHeaders(), this._getUrlParameters())
            .then((req) => {
                if (req.statusCode === 204) {
                    defered.reject({
                        error: _error_not_found,
                        statusCode: HttpStatus.NOT_FOUND
                    });
                } else {
                    defered.resolve({
                        data: req,
                        statusCode: req.statusCode
                    });
                }
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }

}