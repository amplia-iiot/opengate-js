'use strict';

import GenericFinder from '../GenericFinder';
import q from 'q';
import HttpStatus from 'http-status-codes';

import dummyFunctions from './dummyClientActionFunctions'

import {
    CONNECTOR_FUNCTION_SOUTH_PROTOCOLS,
    CONNECTOR_FUNCTION_SOUTH_CRITERIAS_INTERNAL
} from './enum/_CONNECTOR_FUNCTIONS_ENUMS';

/**
 *   This class allow make get request to RuleConfigurationsHelper resource into Opengate North API.
 */
export default class ConnectorFunctionsHelper extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'connectorfunctions');
        this._jsHeaders ={
            'accept': 'application/javascript'
        };
        this._mdHeaders =  {
            'accept': 'text/markdown'
        }
    }

    /**
     * Performs a get that returns dummy functions from rules service
     * @test
     *   ogapi.newConnectorFunctionsHelper().getdDummyFunctions();
     * @return {Promise} 
     */
    getdDummyFunctions() {
        this._setExtraHeaders(this._jsHeaders)
        this._id = 'js/dummyFunctions'
        //return this._execute();

        let defered = q.defer();
        let promise = defered.promise;
        defered.resolve({
            data: {
                text: dummyFunctions
            },
            statusCode: 200
        });
    
        return promise;
    }

    /**
     * Performs a get that returns documentation private of javascript functions from rules service
     * @test
     *   ogapi.newConnectorFunctionsHelper().getDocPrivateJavascriptFunctions();
     * @return {Promise} 
     */
     getDocPrivateJavascriptFunctions() {
        this._setExtraHeaders(this._mdHeaders)
        this._id = 'doc/private/javascriptFunctions'
        //return this._execute();

        let data = "### ejemplo de docu de connector functions"

        let defered = q.defer();
        let promise = defered.promise;
        defered.resolve({
            data: {
                text: data
            },
            statusCode: 200
        });
    
        return promise;
    }
    /**
     * Performs a get that returns documentation of javascript functions from rules service
     * @test
     *   ogapi.newConnectorFunctionsHelper().getDocJavascriptFunctions();
     * @return {Promise} 
     */
     getDocJavascriptFunctions() {
        this._setExtraHeaders(this._mdHeaders)
        this._id = 'doc/javascriptFunctions'
        //return this._execute();

        let data = "### ejemplo de docu de connector functions 2"

        let defered = q.defer();
        let promise = defered.promise;
        defered.resolve({
            data: {
                text: data
            },
            statusCode: 200
        });
    
        return promise;
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

    getInternalSouthCriterias() {
        return CONNECTOR_FUNCTION_SOUTH_CRITERIAS_INTERNAL;
    }
}