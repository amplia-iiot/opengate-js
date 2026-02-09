'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _InternalOpenGateAPI = require("../../InternalOpenGateAPI");

var _InternalOpenGateAPI2 = _interopRequireDefault(_InternalOpenGateAPI);

var _provisionBaseProvision = require("../../provision/BaseProvision");

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

var _CONNECTOR_FUNCTIONS_ENUMS = require('../_CONNECTOR_FUNCTIONS_ENUMS');

/**
 * This is a base object than contains all you can about connector functions catalog
 */

var ConnectorFunctions = (function (_BaseProvision) {
    _inherits(ConnectorFunctions, _BaseProvision);

    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi 
     * @param {String} identifier 
     * @param {Object} connectorFunction 
     */

    function ConnectorFunctions(ogapi, identifier, connectorFunction) {
        _classCallCheck(this, ConnectorFunctions);

        _get(Object.getPrototypeOf(ConnectorFunctions.prototype), "constructor", this).call(this, ogapi, "/catalog", undefined, ["name", "operationalStatus", "type", "cloneable", "javascript", "payloadType"]);

        // only for updates and delete
        if (identifier) {
            this.withIdentifier(identifier);
        }

        if (connectorFunction) {
            var _keys = Object.keys(connectorFunction);
            for (var i = 0; i < _keys.length; i++) {
                var _name = _keys[i];
                var _value = connectorFunction[_name];
                if (_value !== null && _value !== undefined) {
                    var _cname = _name.charAt(0).toUpperCase() + _name.slice(1);
                    this["with" + _cname](_value);
                }
            }
        }
    }

    /**
     * Set the identifier 
     * @param {String} identifier 
     * @returns {ConnectorFunctionsCatalog}
     */

    _createClass(ConnectorFunctions, [{
        key: "withIdentifier",
        value: function withIdentifier(identifier) {
            if (typeof identifier !== 'string' || identifier.length === 0 || identifier.length > 50) throw new Error('Parameter identifier must be a string, cannot be empty and has a maximum length of 50');
            this._identifier = identifier;
            return this;
        }

        /**
         * Descriptive and unique name
         * @param {String} name 
         * @returns {ConnectorFunctionsCatalog}
         */
    }, {
        key: "withName",
        value: function withName(name) {
            if (typeof name !== 'string' || name.length === 0 || name.length > 50) throw new Error('Parameter name must be a string, cannot be empty and has a maximum length of 50');
            this._name = name;
            return this;
        }

        /**
         * Description of the connector function. This field is optional.
         * @param {String} description 
         * @returns {ConnectorFunctionsCatalog}
         */
    }, {
        key: "withDescription",
        value: function withDescription(description) {
            if (typeof description !== 'string' || description.length > 250) throw new Error({
                message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_250",
                parameter: 'description'
            });
            this._description = description;
            return this;
        }

        /**
         * 
         * Connector Function status
         * Allowed: DISABLED┃PRODUCTION┃TEST
         * @param {String} operationalStatus 
         * @returns {ConnectorFunctionsCatalog}
         */
    }, {
        key: "withOperationalStatus",
        value: function withOperationalStatus(operationalStatus) {
            if (typeof operationalStatus !== 'string' || !this._checkValues(operationalStatus, _CONNECTOR_FUNCTIONS_ENUMS.CONNECTOR_FUNCTION_OPERATIONAL_STATUS)) throw new Error('Parameter operational status must be a string and must be one of these values: ' + _CONNECTOR_FUNCTIONS_ENUMS.CONNECTOR_FUNCTION_OPERATIONAL_STATUS);

            this._operationalStatus = operationalStatus;
            return this;
        }

        /**
         * Used to filter connector functions by operation name. If Connector Function type is REQUEST, this field is mandatory and defined name must be an operation name available for specified Api Key. If the type is COLLECTION or RESPONSE, this field must be null.
         * @param {String} operationName 
         * @returns {ConnectorFunctionsCatalog}
         */
    }, {
        key: "withOperationName",
        value: function withOperationName(operationName) {
            if (typeof operationName !== 'string' || operationName.length === 0 || operationName.length > 50) throw new Error('Parameter operation name must be a string, cannot be empty and has a maximum length of 50');
            this._operationName = operationName;
            return this;
        }

        /**
         * 
         * Type of connector function, this is mandatory. Keep in mind that you will be not allowed to modify it.
         * Allowed: COLLECTION┃REQUEST┃RESPONSE
         * @param {String} type 
         * @returns {ConnectorFunctionsCatalog}
         */
    }, {
        key: "withType",
        value: function withType(type) {
            if (typeof type !== 'string' || !this._checkValues(type, _CONNECTOR_FUNCTIONS_ENUMS.CONNECTOR_FUNCTION_TYPES)) throw new Error('Parameter type must be a string and must be one of these values: ' + _CONNECTOR_FUNCTIONS_ENUMS.CONNECTOR_FUNCTION_TYPES);

            this._type = type;
            return this;
        }

        /**
         * Indicates whether or not the Connector Function is cloneable.
         * @param {Boolean} cloneable 
         * @returns {ConnectorFunctionsCatalog}
         */
    }, {
        key: "withCloneable",
        value: function withCloneable(cloneable) {
            if (typeof cloneable !== 'boolean') throw new Error('Parameter cloneable must be a boolean');
            this._cloneable = cloneable;
            return this;
        }

        /**
         * Connector Function selection criteria for operation requests. This field is mandatory if Connector Function type is REQUEST. ⮕ [ each element is defined by path and value ]
         * @param {Array} northCriterias 
         * @returns {ConnectorFunctionsCatalog}
         */
    }, {
        key: "withNorthCriterias",
        value: function withNorthCriterias(northCriterias) {
            if (!(northCriterias instanceof Array)) throw new Error({
                message: "Parameter northCriterias requires an array",
                parameter: 'northCriterias'
            });
            this._northCriterias = northCriterias;
            return this;
        }

        /**
         * Add northCriteria to parameter northCriterias. Each element is defined by path and value 
         * @param {Object} northCriteria 
         * @returns {ConnectorFunctionsCatalog}
         */
    }, {
        key: "addNorthCriteria",
        value: function addNorthCriteria(northCriteria) {
            if (typeof northCriteria !== 'object' || !northCriteria.path || typeof northCriteria.path !== 'string' || !northCriteria.value || typeof northCriteria.value !== 'object') throw new Error({
                message: "Parameter northCriteria requires path and value",
                parameter: 'northCriteria'
            });

            if (!this._northCriterias) {
                this._northCriterias = [];
            }

            this._northCriterias.push(northCriteria);
            return this;
        }

        /**
         * Connector Function selection criteria for operation responses and data collection. This field is mandatory if Connector Function type is COLLECTION or RESPONSE. ⮕ [ each string can represent an URI, topic, OID... ]. Each string can represent an URI, topic, OID...
         * @param {Array} southCriterias 
         * @returns {ConnectorFunctionsCatalog}
         */
    }, {
        key: "withSouthCriterias",
        value: function withSouthCriterias(southCriterias) {
            var _this = this;

            if (!(southCriterias instanceof Array)) throw new Error({
                message: "Parameter southCriterias requires an array",
                parameter: 'southCriterias'
            });

            southCriterias.forEach(function (crit) {
                try {
                    _this.addSouthCriteria(crit);
                } catch (critErr) {
                    _this._southCriterias = null;
                    throw critErr;
                }
            });

            return this;
        }

        /**
         * Add southCriteria to parameter southCriterias. Each string can represent an URI, topic, OID...
         * @param {String} southCriteria 
         * @returns 
         */
    }, {
        key: "addSouthCriteria",
        value: function addSouthCriteria(southCriteria) {
            if (typeof southCriteria !== 'string') throw new Error('southCriteria must be a string');

            if (!this._southCriterias) {
                this._southCriterias = [];
            }

            this._southCriterias.push(southCriteria);
            return this;
        }

        /**
         * Connector function javascript code
         * @param {String} javascript 
         * @returns {ConnectorFunctionsCatalog}
         */
    }, {
        key: "withJavascript",
        value: function withJavascript(javascript) {
            if (typeof javascript !== 'string') throw new Error('Parameter javascript must be a string');
            this._javascript = javascript;
            return this;
        }

        /**
         * Enum of allowed types for connector function's payload data. Request Connector Functions only accept JSON. 
         * Allowed: TEXT┃JSON┃BINARY
         * @param {String} payloadType 
         * @returns {ConnectorFunctionsCatalog}
         */
    }, {
        key: "withPayloadType",
        value: function withPayloadType(payloadType) {
            if (typeof payloadType !== 'string' || !this._checkValues(payloadType, _CONNECTOR_FUNCTIONS_ENUMS.CONNECTOR_FUNCTION_PAYLOAD_TYPES)) throw new Error('Parameter payload type must be a string and must be one of these values: ' + _CONNECTOR_FUNCTIONS_ENUMS.CONNECTOR_FUNCTION_PAYLOAD_TYPES);

            this._payloadType = payloadType;
            return this;
        }
    }, {
        key: "_composeElement",
        value: function _composeElement() {
            var updateData = {
                "name": this._name,
                "description": this._description ? this._description : undefined,
                "operationalStatus": this._operationalStatus,
                "operationName": this._type === 'REQUEST' ? this._operationName : undefined,
                "type": this._type,
                "cloneable": this._cloneable,
                "northCriterias": this._northCriterias,
                "southCriterias": this._southCriterias,
                "javascript": this._javascript,
                "payloadType": this._payloadType
            };

            return updateData;
        }
    }, {
        key: "_checkRequiredParameters",
        value: function _checkRequiredParameters(isUpdate) {
            if (isUpdate && this._identifier === undefined) {
                throw new Error({
                    message: "Parameter identifier must be defined",
                    parameter: "identifier"
                });
            }
            try {
                _get(Object.getPrototypeOf(ConnectorFunctions.prototype), "_checkRequiredParameters", this).call(this);
            } catch (err) {
                throw err;
            }
            switch (this._type) {
                case 'REQUEST':
                    {
                        if (this._operationName === undefined || this._northCriterias === undefined || this._northCriterias.length === 0) {
                            throw new Error('Parameters operationName and northCriteria must be defined when type REQUEST');
                        }
                        if (this._payloadType !== 'JSON') {
                            throw new Error('Parameter payload type must be JSON when type REQUEST');
                        }
                        break;
                    }
                case 'COLLECTION':
                case 'RESPONSE':
                    {
                        if (this._southCriterias === undefined || this._southCriterias.length === 0) {
                            throw new Error('Parameters southCriteria must be defined when type COLLECTION or RESPONSE');
                        }
                        break;
                    }
            }
        }
    }, {
        key: "_buildURL",
        value: function _buildURL() {
            if (this._identifier === undefined) {
                throw new Error({
                    message: "Parameter identifier must be defined",
                    parameter: "identifier"
                });
            }
            return 'connectorFunctions/' + this._resource + '/' + this._identifier;
        }

        /** 
         * Create a new connector function catalog
         * @return {Promise}
         * @throws {Error} 
         */
    }, {
        key: "create",
        value: function create() {
            this._checkRequiredParameters();

            return this._doNorthPost('connectorFunctions/' + this._resource, this._composeElement());
        }
    }, {
        key: "_composeUpdateElement",
        value: function _composeUpdateElement() {
            this._checkRequiredParameters(true);
            return this._composeElement();
        }
    }]);

    return ConnectorFunctions;
})(_provisionBaseProvision2["default"]);

exports["default"] = ConnectorFunctions;
module.exports = exports["default"];
//# sourceMappingURL=ConnectorFunctions.js.map
