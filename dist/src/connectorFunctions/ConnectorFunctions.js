'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _provisionBaseProvision = require('../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

var _ConnectorsCatalog = require('./ConnectorsCatalog');

var _ConnectorsCatalog2 = _interopRequireDefault(_ConnectorsCatalog);

var _jsonschema = require('jsonschema');

var RESOURCE = 'connectorFunctions';
var SCHEMA_DEFINITION_RESOURCE = 'openapi';
/**
 * This is a base object that contains all you can do about ConnectorFunctions.
 */

var ConnectorFunctions = (function (_BaseProvision) {
    _inherits(ConnectorFunctions, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function ConnectorFunctions(ogapi) {
        _classCallCheck(this, ConnectorFunctions);

        _get(Object.getPrototypeOf(ConnectorFunctions.prototype), 'constructor', this).call(this, ogapi, undefined, undefined, ["organization", "channel", "contentType", "connector"]);
        this._connectorCatalog = new _ConnectorsCatalog2['default'](ogapi);
        this._ogapi = ogapi;
        this._resource = RESOURCE;
        this._body = {};
        //this._validator = new SwaggerValidator.Handler(`${this._ogapi.Napi.url}/${SCHEMA_DEFINITION_RESOURCE}`);
    }

    _createClass(ConnectorFunctions, [{
        key: '_buildURL',
        value: function _buildURL() {
            return this._resource + '/' + this._organization + '/' + this._channel + '/' + this._connector;
        }

        /**
         * Set the name attribute
         * @param {string} name 
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string' || name.length === 0 || name.length > 50) throw new Error("OGAPI_STRING_PARAMETER_MAX_LENGTH_50");
            this._body.name = name;
            return this;
        }

        /**
         * Set the connector attribute
         * @param {string} connector  - required field
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'withConnector',
        value: function withConnector(connector) {
            if (typeof connector !== 'string') throw new Error("OGAPI_STRING_PARAMETER");
            this._body.connector = this._connector = connector;
            return this;
        }

        /**
         * Set the contentType attribute
         * @param {string} contentType  - required field
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'withContentType',
        value: function withContentType(contentType) {
            if (typeof contentType !== 'string') throw new Error("OGAPI_STRING_PARAMETER");
            this._body.contentType = this._contentType = contentType;
            return this;
        }

        /**
         * Set a connectorField value
         * @param {string} connectorField name of the connectorField
         * @param {string} value value of the connectorField
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'withConnectorField',
        value: function withConnectorField(connectorField, value) {
            if (!this._body.connectorFields) this._body.connectorFields = {};
            this._body.connectorFields[connectorField] = value;
            return this;
        }

        /**
         * Set the decoder attribute
         * @param {string} decoder 
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'withDecoder',
        value: function withDecoder(decoder) {
            if (typeof decoder !== 'string') throw new Error("OGAPI_STRING_PARAMETER");
            if (!this._body.functions) this._body.functions = {};
            this._body.functions.decoder = decoder;
            return this;
        }

        /**
         * Set the encoder attribute
         * @param {string} encoder 
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'withEncoder',
        value: function withEncoder(encoder) {
            if (typeof encoder !== 'string') throw new Error("OGAPI_STRING_PARAMETER");
            if (!this._body.functions) this._body.functions = {};
            this._body.functions.encoder = encoder;
            return this;
        }

        /**
         * Set the converter attribute
         * @param {string} converter 
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'withConverter',
        value: function withConverter(converter) {
            if (typeof converter !== 'string') throw new Error("OGAPI_STRING_PARAMETER");
            if (!this._body.functions) this._body.functions = {};
            this._body.functions.converter = converter;
            return this;
        }

        /**
         * Set the validator attribute
         * @param {string} validator 
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'withValidator',
        value: function withValidator(validator) {
            if (typeof validator !== 'string') throw new Error("OGAPI_STRING_PARAMETER");
            if (!this._body.functions) this._body.functions = {};
            this._body.functions.validator = validator;
            return this;
        }

        /**
         * Set the channel attribute
         * @param {string} channel - required field
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'withChannel',
        value: function withChannel(channel) {
            if (typeof channel !== 'string' || channel.length === 0 || channel.length > 50) throw new Error("OGAPI_STRING_PARAMETER_MAX_LENGTH_50");
            this._body.channel = this._channel = channel;
            return this;
        }

        /**
         * Set the organization attribute
         * @param {string} organization - required field
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'withOrganization',
        value: function withOrganization(organization) {
            if (typeof organization !== 'string' || organization.length === 0 || organization.length > 50) throw new Error("OGAPI_STRING_PARAMETER_MAX_LENGTH_50");
            this._body.organization = this._organization = organization;
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this._connectorCatalog.getTemplates().then(function (_ref) {
                    var data = _ref.data;

                    var connector = data.find(function (connector) {
                        return connector.name === _this._body.connector;
                    });
                    if (connector === undefined) return reject('Invalid connector name. Value: ' + _this._body.connector + '. Valid values ' + data.map(function (_ref2) {
                        var name = _ref2.name;
                        return name;
                    }));
                    if (_this._body.connectorFields && connector.connectorSchemaFields) {
                        var _validate = (0, _jsonschema.validate)(_this._body.connectorFields, _this._createConnectorJsonSchema(connector.connectorSchemaFields));

                        var errors = _validate.errors;
                        var valid = _validate.valid;

                        if (!valid) return reject(errors);
                    }
                    resolve(_this._body);
                })['catch'](function (err) {
                    console.warn('Something wrong have happened while the connector catalog was requested');
                    console.warn(err);
                    resolve(_this._body);
                });
            });
        }
    }, {
        key: '_createConnectorJsonSchema',
        value: function _createConnectorJsonSchema(fieldsSchema) {
            return { type: 'object', properties: fieldsSchema, additionalProperties: false };
        }
    }]);

    return ConnectorFunctions;
})(_provisionBaseProvision2['default']);

exports['default'] = ConnectorFunctions;
module.exports = exports['default'];
//# sourceMappingURL=ConnectorFunctions.js.map
