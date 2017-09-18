'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SearchBuilder2 = require('./SearchBuilder');

var _SearchBuilder3 = _interopRequireDefault(_SearchBuilder2);

var _jsonSchemaOg_basic_types = require('./jsonSchema/og_basic_types');

var _jsonSchemaOg_basic_types2 = _interopRequireDefault(_jsonSchemaOg_basic_types);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var jp = require('jsonpath');

/**
 * Defined a search over jsonchema List
 * @example ogapi.jsonSchemaSearchBuilder()
 */

var JsonSchemaSearchBuilder = (function (_SearchBuilder) {
    _inherits(JsonSchemaSearchBuilder, _SearchBuilder);

    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */

    function JsonSchemaSearchBuilder(parent) {
        _classCallCheck(this, JsonSchemaSearchBuilder);

        _get(Object.getPrototypeOf(JsonSchemaSearchBuilder.prototype), 'constructor', this).call(this, parent, {});
        this._url = '/jsonSchemaDefinition';
        this.customFilters = {};
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

    _createClass(JsonSchemaSearchBuilder, [{
        key: '_getPathValue',
        value: function _getPathValue(path) {
            var _this = this;
            path = path.split("#/")[1].replace(/\//gi, ".");
            var jsonSchemaValue = jp.value(_jsonSchemaOg_basic_types2['default'], path);
            if (jsonSchemaValue) {
                var nodes = jp.nodes(jsonSchemaValue, "$..['$ref']");
                if (nodes.length > 0) {
                    nodes.forEach(function (element, index) {
                        element.path.pop(); //eliminamos $ref
                        var pathExpression = jp.stringify(element.path);
                        var newnodes = jp.apply(jsonSchemaValue, pathExpression, function (value) {
                            return _this._getPathValue(element.value);
                        });
                    });
                    return jsonSchemaValue;
                } else {
                    return jsonSchemaValue;
                }
            }
            return null;
        }

        /**
         * Build a instance of JsonSchemaSearchBuilder 
         *
         * @example
         *   ogapi.JsonSchemaSearchBuilder().build()
         * @throws {SearchBuilderError} Throw error on url build
         * @return {StaticSearch}  
         */
    }, {
        key: 'build',
        value: function build() {
            if (!this.path) {
                throw new Error('Path attributte is mandatory');
            }
            var path = this.path.split("#/")[1].replace(/\//gi, ".");
            if (!jp.value(_jsonSchemaOg_basic_types2['default'], path)) {
                throw new Error('Path not found');
            }
            return this;
        }
    }, {
        key: 'execute',
        value: function execute() {
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            var jsonSchema = this._getPathValue(this.path);
            if (jsonSchema) {
                defered.resolve({ data: jsonSchema, statusCode: 200 });
            } else {
                defered.resolve({ data: 'No content', statusCode: 204 });
            }
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
    }]);

    return JsonSchemaSearchBuilder;
})(_SearchBuilder3['default']);

exports['default'] = JsonSchemaSearchBuilder;
module.exports = exports['default'];
//# sourceMappingURL=JsonSchemaSearchBuilder.js.map
