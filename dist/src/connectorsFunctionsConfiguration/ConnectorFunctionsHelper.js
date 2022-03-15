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

var _enum_CONNECTOR_FUNCTIONS_ENUMS = require('./enum/_CONNECTOR_FUNCTIONS_ENUMS');

/**
 *   This class allow make get request to RuleConfigurationsHelper resource into Opengate North API.
 */

var ConnectorFunctionsHelper = (function (_GenericFinder) {
    _inherits(ConnectorFunctionsHelper, _GenericFinder);

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */

    function ConnectorFunctionsHelper(ogapi) {
        _classCallCheck(this, ConnectorFunctionsHelper);

        _get(Object.getPrototypeOf(ConnectorFunctionsHelper.prototype), 'constructor', this).call(this, ogapi, 'connectorFunctions');
        this._jsHeaders = {
            'accept': 'application/javascript'
        };
        this._mdHeaders = {
            'accept': 'text/markdown'
        };
    }

    /**
     * Performs a get that returns dummy functions from rules service
     * @test
     *   ogapi.newConnectorFunctionsHelper().getdDummyFunctions();
     * @return {Promise} 
     */

    _createClass(ConnectorFunctionsHelper, [{
        key: 'getdDummyFunctions',
        value: function getdDummyFunctions() {
            this._setExtraHeaders(this._jsHeaders);
            this._id = 'doc/jsApi/javascript';
            return this._execute();
        }

        /**
         * Performs a get that returns documentation private of javascript functions from rules service
         * @test
         *   ogapi.newConnectorFunctionsHelper().getDocPrivateJavascriptFunctions();
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
         *   ogapi.newConnectorFunctionsHelper().getDocJavascriptFunctions();
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
    }, {
        key: 'getSouthCriteriasProtocols',
        value: function getSouthCriteriasProtocols() {
            return _enum_CONNECTOR_FUNCTIONS_ENUMS.CONNECTOR_FUNCTION_SOUTH_PROTOCOLS;
        }
    }, {
        key: 'getInternalSouthCriterias',
        value: function getInternalSouthCriterias() {
            return _enum_CONNECTOR_FUNCTIONS_ENUMS.CONNECTOR_FUNCTION_SOUTH_CRITERIAS_INTERNAL;
        }
    }]);

    return ConnectorFunctionsHelper;
})(_GenericFinder3['default']);

exports['default'] = ConnectorFunctionsHelper;
module.exports = exports['default'];
//# sourceMappingURL=ConnectorFunctionsHelper.js.map
