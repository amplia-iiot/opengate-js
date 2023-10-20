'use strict';

import GenericFinder from '../GenericFinder';
import q from 'q';
import HttpStatus from 'http-status-codes';
import {VALUE_TYPES_ENUM} from './TYPES_ENUM'

/**
 *   This class allow make get request to newTimeseriesFunctionsHelper resource into Opengate North API.
 */
export default class ConnectorFunctionsHelper extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'timeseriesFunctions');
        this._jsHeaders ={
            'accept': 'application/javascript'
        };
        this._mdHeaders =  {
            'accept': 'text/markdown'
        }
    }

    getValueTypes() {
        return VALUE_TYPES_ENUM
    }

    /**
     * Performs a get that returns dummy functions from rules service
     * @test
     *   ogapi.newTimeseriesFunctionsHelper().getdDummyFunctions();
     * @return {Promise} 
     */
    getDummyFunctions() {
        this._setExtraHeaders(this._jsHeaders)
        this._id = 'doc/jsApi/javascript'
        // return this._execute();

        let data =  `const date = {
            "fromString": function (stringDate) {
                return new Date(stringDate);
            },
            
            "toString": function (date) {
                return date.toISOString();
            },
            "compare": function (date1, date2) {
                if (typeof date1 === 'string') date1 = this.fromString(date1);
                if (typeof date2 === 'string') date2 = this.fromString(date2);
                return date1.getTime() - date2.getTime();
            }
        };
        
        const data = {
            "exists": function (value) {
                return value !== null && value !== undefined;
            },
            "undefinedToNull": function (obj) {
                if(!this.exists(obj)) return null;
                
                if(obj.constructor === Array) {
                  for(var element in obj){
                    obj[element] = this.undefinedToNull(obj[element]);
                  }
                  return obj;
                } else if(obj.constructor === Object) {
                  Object.keys(obj).forEach((key) => {
                    obj[key] = this.undefinedToNull(obj[key]);
                  });
                  return obj;
                } else {
                  return obj;
                }
              }
        };
        
        const result = {
            "OK_RESULT": "OK",
            "columns": {},
        
            "ok": function (value, ...extraParams) {
                var result = {
                    "executionResult": this.OK_RESULT,
                    "value": value,
                    "extra": {}
                };
            
                for (var extraArg in extraParams) {
                    Object.assign(result.extra, extraParams[extraArg]);
                }
                log.trace("aggResult: ", result);
                return result;
            },
        
            "error": function (caughtError) {
                if (caughtError instanceof Error) {
                    log.error("Caught error: ", caughtError.message, " - ", caughtError.cause);
                    var exceptionResult = {
                        "executionResult": caughtError.message
                    };
                    log.trace("exceptionResult: ", exceptionResult);
                    return exceptionResult;
                } else {
                    log.error("Caught error: ", caughtError);
                    var exceptionResult = {
                        "executionResult": caughtError
                    };
                    log.trace("exceptionResult: ", exceptionResult);
                    return exceptionResult;
                }
            }
        };
        
        const aggFunct = {
            "AVG": function (receivedValues, currentValue, extra) {
                var newCount = receivedValues.length;
                var newSum = 0;
                for (var recVal in receivedValues) {
                    newSum = newSum + receivedValues[recVal].value;
                }
                if (extra) {
                    if (data.exists(extra.COUNT)) newCount = newCount + extra.COUNT;
                    if (data.exists(extra.SUM)) newSum = newSum + extra.SUM;
                }
                var newValue = newSum / newCount;
                return result.ok(newValue, { "SUM": newSum }, { "COUNT": newCount });
            },
        
            "MIN": function (receivedValues, currentValue, extra) {
                var newValue = currentValue;
                for (var recVal in receivedValues) {
                    if (!data.exists(newValue) || receivedValues[recVal].value < newValue) {
                        newValue = receivedValues[recVal].value;
                    }
                }
                return result.ok(newValue);
            },
        
            "LAST": function (receivedValues, currentValue, extra) {
                var newAt;
                var newValue = currentValue;
                if (extra) {
                    if (data.exists(extra.AT)) newAt = extra.AT;
                }
                for (var recVal in receivedValues) {
                    if (!data.exists(newAt) || date.compare(receivedValues[recVal].at, newAt) > 0) {
                        newAt = receivedValues[recVal].at;
                        newValue = receivedValues[recVal].value;
                    }
                }
                return result.ok(newValue, { "AT": newAt });
            },
        
            "MAX": function (receivedValues, currentValue, extra) {
                var newValue = currentValue;
                for (var recVal in receivedValues) {
                    if (!data.exists(newValue) || receivedValues[recVal].value > newValue) {
                        newValue = receivedValues[recVal].value;
                    }
                }
                return result.ok(newValue);
            },
        
            "COUNT": function (receivedValues, currentValue, extra) {
                var newValue = receivedValues.length;
                if (data.exists(currentValue)) {
                    newValue = newValue + currentValue;
                }
                return result.ok(newValue);
            },
        
            "GEO_AVG": function (receivedValues, currentValue, extra) {
                var newCount = receivedValues.length;
                var newProduct = 1;
                for (var recVal in receivedValues) {
                    newProduct = newProduct * receivedValues[recVal].value;
                }
                if (extra) {
                    if (data.exists(extra.COUNT)) newCount = newCount + extra.COUNT;
                    if (data.exists(extra.PRODUCT)) newProduct = newProduct * extra.PRODUCT;
                }
                var newValue = Math.pow(newProduct, 1 / newCount);
                return result.ok(newValue, { "PRODUCT": newProduct }, { "COUNT": newCount });
            },
        
            "SUM": function (receivedValues, currentValue, extra) {
                var newValue = 0;
                for (var recVal in receivedValues) {
                    newValue = newValue + receivedValues[recVal].value;
                }
                if (data.exists(currentValue)) {
                    newValue = newValue + currentValue;
                }
                return result.ok(newValue);
            },
        
            "MEDIAN": function (receivedValues, currentValue, extra) {
                var receivedValuesFlattened = receivedValues.map(function (rv) { return rv.value });
                var completeArray;
                if (extra && extra.VAL_ARRAY) {
                    completeArray = extra.VAL_ARRAY.concat(receivedValuesFlattened)
                } else {
                    completeArray = receivedValuesFlattened;
                }
                completeArray.sort(function (a, b) { return a - b });
                var middle_index = Math.floor(completeArray.length / 2);
                var newMedian;
                if (completeArray.length % 2) {
                    newMedian = completeArray[middle_index];
                } else {
                    newMedian = (completeArray[middle_index - 1] + completeArray[middle_index]) / 2.0;
                }
                return result.ok(newMedian, { "VAL_ARRAY": completeArray });
            },
        
            "VARIANCE": function (receivedValues, currentValue, extra) {
                var receivedValuesFlattened = receivedValues.map(function (rv) { return rv.value });
                var completeArray;
                if (extra && extra.VAL_ARRAY) {
                    completeArray = extra.VAL_ARRAY.concat(receivedValuesFlattened)
                } else {
                    completeArray = receivedValuesFlattened;
                }
        
                var sum = 0;
                completeArray.map(e => sum += e);
                var avg = sum / completeArray.length;
                var newValue = 0;
                for (var item in completeArray) {
                    newValue = newValue + Math.pow(completeArray[item] - avg, 2);
                }
                newValue = newValue / completeArray.length;
                return result.ok(newValue, { "VAL_ARRAY": completeArray });
            },
        
            "FIRST": function (receivedValues, currentValue, extra) {
                var newAt;
                var newValue = currentValue;
                if (extra) {
                    if (data.exists(extra.AT)) newAt = extra.AT;
                }
                for (var recVal in receivedValues) {
                    if (!data.exists(newAt) || date.compare(receivedValues[recVal].at, newAt) < 0) {
                        newAt = receivedValues[recVal].at;
                        newValue = receivedValues[recVal].value;
                    }
                }
                return result.ok(newValue, { "AT": newAt });
            },
        
            "STD_DEVIATION": function (receivedValues, currentValue, extra) {
                var variance = this.VARIANCE(receivedValues, currentValue, extra);
                var newValue = Math.sqrt(variance.value);
                return result.ok(newValue, { "VAL_ARRAY": variance.extra.VAL_ARRAY });
            }
        };
        
        module.exports = {
            date,
            data,
            result,
            aggFunct
        } 
        `

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
     * Performs a get that returns documentation private of javascript functions from rules service
     * @test
     *   ogapi.newTimeseriesFunctionsHelper().getDocPrivateJavascriptFunctions();
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
     *   ogapi.newTimeseriesFunctionsHelper().getDocJavascriptFunctions();
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
}
 