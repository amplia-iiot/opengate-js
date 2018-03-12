'use strict';

import q from 'q';
import merge from 'merge';
import jp from 'jsonpath';


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
        this._og_basic_types = {};
        this.publicParameters = false;
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
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     */
    execute() {
        var defered = q.defer();
        var promise = defered.promise;
        this._setExtraHeaders({
            'Accept': 'application/json'
        });
        this._ogapi.Napi
            .get(this._resource, this._timeout, this._getExtraHeaders())
            .then((response) => {
                var resultQuery = response.body;
                let statusCode = response.statusCode;
                this._og_basic_types = resultQuery;

                var nodes = jp.apply(this._og_basic_types, "$..['$ref']",
                    function(value, path) {
                        let newPath = '$..' + value.replace('#/definitions/', '');
                        var newValue = jp.query(resultQuery, newPath);
                        return newValue[0];
                    });
                nodes.forEach(element => {
                    var pathExpression = jp.stringify(element.path);
                    jp.value(resultQuery, pathExpression, element.value);
                });
                if (this.path) {
                    let path = this.path.includes('$') ? this.path : '$..' + this.path;
                    let jsonSchemaValue = jp.query(resultQuery, path)[0] || {
                        msg: 'not Found'
                    };
                    defered.resolve({
                        data: jsonSchemaValue,
                        statusCode: statusCode
                    });
                } else {
                    if (this.publicParameters) {
                        for (let x in resultQuery.definitions) {
                            if (!resultQuery.definitions[x].public || resultQuery.definitions[x].public === false) {
                                delete resultQuery.definitions[x];
                            }
                        }
                    }
                    defered.resolve({
                        data: resultQuery,
                        statusCode: statusCode
                    });
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
     *  ogapi.basicTypesSearchBuilder().withPath('string').build()
     * @param {!string} path - jsonSchemaPath
     * @return {BasicTypesSearchBuilder}
     */
    withPath(path) {
        this.path = path;
        return this;
    }

    /**
     * Sets publicParameters to search
     *
     * @description
     * @example
     *  ogapi.basicTypesSearchBuilder().withPublicParameters(true).build()
     * @param {!boolean} publicParameters - boolean
     * @return {BasicTypesSearchBuilder}
     */
    withPublicParameters(publicParameters) {
        this.publicParameters = publicParameters;
        return this;
    }

    build() {

        return this;
    }



}