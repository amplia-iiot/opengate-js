'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var _JSONPath = require('JSONPath');

var _JSONPath2 = _interopRequireDefault(_JSONPath);

/** 
 * This is a abstract class, it must be extended to another class that defined the specific search.
 * This class is responsible to manage execute request to OpenGate North API
 */

var BasicTypesSearchBuilder = (function () {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!number} [timeout] - timeout on request
     */

    function BasicTypesSearchBuilder(ogapi, timeout) {
        _classCallCheck(this, BasicTypesSearchBuilder);

        this._ogapi = ogapi;
        this._resource = 'resources/schemaTypes/og_basic_types';
        this._headers = undefined;
    }

    _createClass(BasicTypesSearchBuilder, [{
        key: '_getExtraHeaders',
        value: function _getExtraHeaders() {
            return this._headers;
        }
    }, {
        key: '_setExtraHeaders',
        value: function _setExtraHeaders(headers) {
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
    }, {
        key: '_getPathValue',
        value: function _getPathValue(path) {
            var _this = this;
            /*with jsonpath
            let jsonSchemaValue = jp.value(og_basic_types, path);*/
            var jsonSchemaValue = (0, _JSONPath2['default'])({ json: og_basic_types, path: path })[0];
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
    }, {
        key: 'execute',
        value: function execute() {
            var _this2 = this;

            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._setExtraHeaders({ 'Accept': 'application/json' });
            this._ogapi.Napi.get(this._resource, this._timeout, this._getExtraHeaders()).then(function (response) {
                var resultQuery = response.body;
                var statusCode = response.statusCode;
                if (_this2.path) {
                    var _og_basic_types = resultQuery.definitions;
                    var jsonSchemaValue = (0, _JSONPath2['default'])({ json: _og_basic_types, path: _this2.path })[0] || { msg: 'not Found' };
                    defered.resolve({ data: jsonSchemaValue, statusCode: statusCode });
                } else {
                    defered.resolve({ data: resultQuery, statusCode: statusCode });
                }
            })['catch'](function (error) {
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
    }, {
        key: 'withPath',
        value: function withPath(path) {
            this.path = path;
            return this;
        }
    }, {
        key: 'build',
        value: function build() {

            return this;
        }
    }]);

    return BasicTypesSearchBuilder;
})();

exports['default'] = BasicTypesSearchBuilder;
module.exports = exports['default'];
//# sourceMappingURL=BasicTypesSearchBuilder.js.map
