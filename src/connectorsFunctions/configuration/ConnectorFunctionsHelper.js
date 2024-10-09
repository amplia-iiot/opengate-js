'use strict';

import GenericFinder from '../../GenericFinder';
import q from 'q';
import HttpStatus from 'http-status-codes';


import {
    CONNECTOR_FUNCTION_SOUTH_PROTOCOLS,
    CONNECTOR_FUNCTION_PAYLOAD_TYPES
} from '../_CONNECTOR_FUNCTIONS_ENUMS';

/**
 *   This class allow make get request to RuleConfigurationsHelper resource into Opengate North API.
 */
export default class ConnectorFunctionsHelper extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'connectorFunctions');
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
     *   ogapi.newConnectorFunctionsHelper().getDocPrivateJavascriptFunctions();
     * @return {Promise} 
     */
     getDocPrivateJavascriptFunctions() {
        this._setExtraHeaders(this._mdHeaders)
        this._id = 'doc/jsApi/internal'
        return this._execute();

        // let data = "### ejemplo de docu de connector functions"

        // let defered = q.defer();
        // let promise = defered.promise;
        // defered.resolve({
        //     data: {
        //         text: data
        //     },
        //     statusCode: 200
        // });
    
        // return promise;
    }
    /**
     * Performs a get that returns documentation of javascript functions from rules service
     * @test
     *   ogapi.newConnectorFunctionsHelper().getDocJavascriptFunctions();
     * @return {Promise} 
     */
     getDocJavascriptFunctions() {
        this._setExtraHeaders(this._mdHeaders)
        this._id = 'doc/jsApi/client'
        return this._execute();

        // let data = "### ejemplo de docu de connector functions 2"

        // let defered = q.defer();
        // let promise = defered.promise;
        // defered.resolve({
        //     data: {
        //         text: data
        //     },
        //     statusCode: 200
        // });
    
        // return promise;
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

    getSouthCriteriasProtocols() {
        return CONNECTOR_FUNCTION_SOUTH_PROTOCOLS;
    }

    getPayloadTypes() {
        return CONNECTOR_FUNCTION_PAYLOAD_TYPES;
    }
}