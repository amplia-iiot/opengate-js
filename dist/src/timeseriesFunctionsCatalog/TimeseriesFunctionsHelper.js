'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _GenericFinder2 = require('../GenericFinder');

var _GenericFinder3 = _interopRequireDefault(_GenericFinder2);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _TYPES_ENUM = require('./TYPES_ENUM');

/**
 *   This class allow make get request to newTimeseriesFunctionsHelper resource into Opengate North API.
 */

var ConnectorFunctionsHelper = (function (_GenericFinder) {
    _inherits(ConnectorFunctionsHelper, _GenericFinder);

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */

    function ConnectorFunctionsHelper(ogapi) {
        _classCallCheck(this, ConnectorFunctionsHelper);

        _get(Object.getPrototypeOf(ConnectorFunctionsHelper.prototype), 'constructor', this).call(this, ogapi, 'timeseriesFunctions');
        this._jsHeaders = {
            'accept': 'application/javascript'
        };
        this._mdHeaders = {
            'accept': 'text/markdown'
        };
    }

    _createClass(ConnectorFunctionsHelper, [{
        key: 'getValueTypes',
        value: function getValueTypes() {
            return _TYPES_ENUM.VALUE_TYPES_ENUM;
        }

        /**
         * Performs a get that returns dummy functions from rules service
         * @test
         *   ogapi.newTimeseriesFunctionsHelper().getdDummyFunctions();
         * @return {Promise} 
         */
    }, {
        key: 'getDummyFunctions',
        value: function getDummyFunctions() {
            this._setExtraHeaders(this._jsHeaders);
            this._id = 'doc/jsApi/javascript';
            // return this._execute();

            var data = 'const date = {\n            "fromString": function (stringDate) {\n                return new Date(stringDate);\n            },\n            \n            "toString": function (date) {\n                return date.toISOString();\n            },\n            "compare": function (date1, date2) {\n                if (typeof date1 === \'string\') date1 = this.fromString(date1);\n                if (typeof date2 === \'string\') date2 = this.fromString(date2);\n                return date1.getTime() - date2.getTime();\n            }\n        };\n        \n        const data = {\n            "exists": function (value) {\n                return value !== null && value !== undefined;\n            },\n            "undefinedToNull": function (obj) {\n                if(!this.exists(obj)) return null;\n                \n                if(obj.constructor === Array) {\n                  for(var element in obj){\n                    obj[element] = this.undefinedToNull(obj[element]);\n                  }\n                  return obj;\n                } else if(obj.constructor === Object) {\n                  Object.keys(obj).forEach((key) => {\n                    obj[key] = this.undefinedToNull(obj[key]);\n                  });\n                  return obj;\n                } else {\n                  return obj;\n                }\n              }\n        };\n        \n        const result = {\n            "OK_RESULT": "OK",\n            "columns": {},\n        \n            "ok": function (value, ...extraParams) {\n                var result = {\n                    "executionResult": this.OK_RESULT,\n                    "value": value,\n                    "extra": {}\n                };\n            \n                for (var extraArg in extraParams) {\n                    Object.assign(result.extra, extraParams[extraArg]);\n                }\n                log.trace("aggResult: ", result);\n                return result;\n            },\n        \n            "error": function (caughtError) {\n                if (caughtError instanceof Error) {\n                    log.error("Caught error: ", caughtError.message, " - ", caughtError.cause);\n                    var exceptionResult = {\n                        "executionResult": caughtError.message\n                    };\n                    log.trace("exceptionResult: ", exceptionResult);\n                    return exceptionResult;\n                } else {\n                    log.error("Caught error: ", caughtError);\n                    var exceptionResult = {\n                        "executionResult": caughtError\n                    };\n                    log.trace("exceptionResult: ", exceptionResult);\n                    return exceptionResult;\n                }\n            }\n        };\n        \n        const aggFunct = {\n            "AVG": function (receivedValues, currentValue, extra) {\n                var newCount = receivedValues.length;\n                var newSum = 0;\n                for (var recVal in receivedValues) {\n                    newSum = newSum + receivedValues[recVal].value;\n                }\n                if (extra) {\n                    if (data.exists(extra.COUNT)) newCount = newCount + extra.COUNT;\n                    if (data.exists(extra.SUM)) newSum = newSum + extra.SUM;\n                }\n                var newValue = newSum / newCount;\n                return result.ok(newValue, { "SUM": newSum }, { "COUNT": newCount });\n            },\n        \n            "MIN": function (receivedValues, currentValue, extra) {\n                var newValue = currentValue;\n                for (var recVal in receivedValues) {\n                    if (!data.exists(newValue) || receivedValues[recVal].value < newValue) {\n                        newValue = receivedValues[recVal].value;\n                    }\n                }\n                return result.ok(newValue);\n            },\n        \n            "LAST": function (receivedValues, currentValue, extra) {\n                var newAt;\n                var newValue = currentValue;\n                if (extra) {\n                    if (data.exists(extra.AT)) newAt = extra.AT;\n                }\n                for (var recVal in receivedValues) {\n                    if (!data.exists(newAt) || date.compare(receivedValues[recVal].at, newAt) > 0) {\n                        newAt = receivedValues[recVal].at;\n                        newValue = receivedValues[recVal].value;\n                    }\n                }\n                return result.ok(newValue, { "AT": newAt });\n            },\n        \n            "MAX": function (receivedValues, currentValue, extra) {\n                var newValue = currentValue;\n                for (var recVal in receivedValues) {\n                    if (!data.exists(newValue) || receivedValues[recVal].value > newValue) {\n                        newValue = receivedValues[recVal].value;\n                    }\n                }\n                return result.ok(newValue);\n            },\n        \n            "COUNT": function (receivedValues, currentValue, extra) {\n                var newValue = receivedValues.length;\n                if (data.exists(currentValue)) {\n                    newValue = newValue + currentValue;\n                }\n                return result.ok(newValue);\n            },\n        \n            "GEO_AVG": function (receivedValues, currentValue, extra) {\n                var newCount = receivedValues.length;\n                var newProduct = 1;\n                for (var recVal in receivedValues) {\n                    newProduct = newProduct * receivedValues[recVal].value;\n                }\n                if (extra) {\n                    if (data.exists(extra.COUNT)) newCount = newCount + extra.COUNT;\n                    if (data.exists(extra.PRODUCT)) newProduct = newProduct * extra.PRODUCT;\n                }\n                var newValue = Math.pow(newProduct, 1 / newCount);\n                return result.ok(newValue, { "PRODUCT": newProduct }, { "COUNT": newCount });\n            },\n        \n            "SUM": function (receivedValues, currentValue, extra) {\n                var newValue = 0;\n                for (var recVal in receivedValues) {\n                    newValue = newValue + receivedValues[recVal].value;\n                }\n                if (data.exists(currentValue)) {\n                    newValue = newValue + currentValue;\n                }\n                return result.ok(newValue);\n            },\n        \n            "MEDIAN": function (receivedValues, currentValue, extra) {\n                var receivedValuesFlattened = receivedValues.map(function (rv) { return rv.value });\n                var completeArray;\n                if (extra && extra.VAL_ARRAY) {\n                    completeArray = extra.VAL_ARRAY.concat(receivedValuesFlattened)\n                } else {\n                    completeArray = receivedValuesFlattened;\n                }\n                completeArray.sort(function (a, b) { return a - b });\n                var middle_index = Math.floor(completeArray.length / 2);\n                var newMedian;\n                if (completeArray.length % 2) {\n                    newMedian = completeArray[middle_index];\n                } else {\n                    newMedian = (completeArray[middle_index - 1] + completeArray[middle_index]) / 2.0;\n                }\n                return result.ok(newMedian, { "VAL_ARRAY": completeArray });\n            },\n        \n            "VARIANCE": function (receivedValues, currentValue, extra) {\n                var receivedValuesFlattened = receivedValues.map(function (rv) { return rv.value });\n                var completeArray;\n                if (extra && extra.VAL_ARRAY) {\n                    completeArray = extra.VAL_ARRAY.concat(receivedValuesFlattened)\n                } else {\n                    completeArray = receivedValuesFlattened;\n                }\n        \n                var sum = 0;\n                completeArray.map(e => sum += e);\n                var avg = sum / completeArray.length;\n                var newValue = 0;\n                for (var item in completeArray) {\n                    newValue = newValue + Math.pow(completeArray[item] - avg, 2);\n                }\n                newValue = newValue / completeArray.length;\n                return result.ok(newValue, { "VAL_ARRAY": completeArray });\n            },\n        \n            "FIRST": function (receivedValues, currentValue, extra) {\n                var newAt;\n                var newValue = currentValue;\n                if (extra) {\n                    if (data.exists(extra.AT)) newAt = extra.AT;\n                }\n                for (var recVal in receivedValues) {\n                    if (!data.exists(newAt) || date.compare(receivedValues[recVal].at, newAt) < 0) {\n                        newAt = receivedValues[recVal].at;\n                        newValue = receivedValues[recVal].value;\n                    }\n                }\n                return result.ok(newValue, { "AT": newAt });\n            },\n        \n            "STD_DEVIATION": function (receivedValues, currentValue, extra) {\n                var variance = this.VARIANCE(receivedValues, currentValue, extra);\n                var newValue = Math.sqrt(variance.value);\n                return result.ok(newValue, { "VAL_ARRAY": variance.extra.VAL_ARRAY });\n            }\n        };\n        \n        module.exports = {\n            date,\n            data,\n            result,\n            aggFunct\n        } \n        ';

            var defered = _q2['default'].defer();
            var promise = defered.promise;
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
    }, {
        key: 'getDocPrivateJavascriptFunctions',
        value: function getDocPrivateJavascriptFunctions() {
            this._setExtraHeaders(this._mdHeaders);
            this._id = 'doc/jsApi/internal';
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
    }, {
        key: 'getDocJavascriptFunctions',
        value: function getDocJavascriptFunctions() {
            this._setExtraHeaders(this._mdHeaders);
            this._id = 'doc/jsApi/client';
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
    }, {
        key: '_execute',
        value: function _execute() {
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            var _error_not_found = this._error_not_found;
            this._api.get(this._composeUrl(), undefined, this._getExtraHeaders(), this._getUrlParameters()).then(function (req) {
                if (req.statusCode === 204) {
                    defered.reject({
                        error: _error_not_found,
                        statusCode: _httpStatusCodes2['default'].NOT_FOUND
                    });
                } else {
                    defered.resolve({
                        data: req,
                        statusCode: req.statusCode
                    });
                }
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }
    }]);

    return ConnectorFunctionsHelper;
})(_GenericFinder3['default']);

exports['default'] = ConnectorFunctionsHelper;
module.exports = exports['default'];
//# sourceMappingURL=TimeseriesFunctionsHelper.js.map
