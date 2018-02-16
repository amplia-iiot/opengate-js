'use strict';

import q from 'q';
import merge from 'merge';
import JSONPath from 'JSONPath';


/** 
 * This is a abstract class, it must be extended to another class that defined the specific search.
 * This class is responsible to manage execute request to OpenGate North API
 */
export default class BasicTypesSearchBuilder {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!number} [timeout] - timeout on request
     */
    constructor(ogapi, timeout) {
        this._ogapi = ogapi;
        this._resource = 'resources/schemaTypes/og_basic_types';
        this._headers = undefined;
    }
    _getExtraHeaders() {
        return this._headers;
    }

    _setExtraHeaders(headers) {
        if (this._headers) {
            var keys = Object.keys(headers);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                this._headers[key] = headers[key];
            }
        } else {
            this._headers = headers;
        }
    }


    /**
     * Sets id to search
     *
     * @description
     * The list of types of communication modules is as follows:
     * "string", "boolean", "calendar", "address", "number", "enumeration", "array", "coordinates", "topology", "object"
     * @example
     *  ogapi.fieldsDefinitionSearchBuilder().withType('string').build()
     * @param {!string} fieldDefinitionType - specific type
     * @throws {Error} throw error when type is not typeof string
     * @return {fieldsDefinitionSearchBuilder}
     */
    _getPathValue(path) {
            let _this = this;
            /*with jsonpath
            let jsonSchemaValue = jp.value(og_basic_types, path);*/
            let jsonSchemaValue = JSONPath({ json: og_basic_types, path: path })[0];
            if (jsonSchemaValue) {
                return jsonSchemaValue;
            }
            return null;
        }
        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * @return {Promise}
         * @property {function (result:object, statusCode:number)} then - When request it is OK
         * @property {function (error:string)} catch - When request it is NOK
         */
    execute() {
        var defered = q.defer();
        var promise = defered.promise;
        this._setExtraHeaders({ 'Accept': 'application/json' });
        this._ogapi.Napi
            .get(this._resource, this._timeout, this._getExtraHeaders())
            .then((response) => {
                let resultQuery = response.body;
                let statusCode = response.statusCode;
                if (this.path) {
                    let og_basic_types = resultQuery.definitions;
                    let jsonSchemaValue = JSONPath({ json: og_basic_types, path: this.path })[0] || { msg: 'not Found' };
                    defered.resolve({ data: jsonSchemaValue, statusCode: statusCode });
                } else {
                    defered.resolve({ data: resultQuery, statusCode: statusCode });
                }


            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }

    /**
     * Sets path to search
     *
     * @description
     * @example
     *  ogapi.JsonSchemaSearchBuilder().withPath('string').build()
     * @param {!string} path - jsonSchemaPath
     * @return {JsonSchemaSearchBuilder}
     */
    withPath(path) {
        this.path = path;
        return this;
    }

    build() {

        return this;
    }



}