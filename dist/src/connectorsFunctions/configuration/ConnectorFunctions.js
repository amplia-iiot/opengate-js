'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _provisionBaseProvision = require('../../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

var _CONNECTOR_FUNCTIONS_ENUMS = require('../_CONNECTOR_FUNCTIONS_ENUMS');

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

/**
 * This is a base object that contains all you can do about ConnectorFunctions.
 */

var ConnectorFunctions = (function (_BaseProvision) {
    _inherits(ConnectorFunctions, _BaseProvision);

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function ConnectorFunctions(ogapi, organization, channel, identifier, connectorFunctionsObj) {
        _classCallCheck(this, ConnectorFunctions);

        _get(Object.getPrototypeOf(ConnectorFunctions.prototype), 'constructor', this).call(this, ogapi, "/organizations");

        // Required
        this.withOrganization(organization);
        this.withChannel(channel);

        // only for updates
        if (identifier) {
            this.withIdentifier(identifier);
        }

        if (connectorFunctionsObj) {
            if (connectorFunctionsObj.name) {
                this.withName(connectorFunctionsObj.name);
            }

            if (connectorFunctionsObj.operationName) {
                this.withOperationName(connectorFunctionsObj.operationName);
            }

            if (connectorFunctionsObj.operationalStatus) {
                this.withOperationalStatus(connectorFunctionsObj.operationalStatus);
            }

            if (connectorFunctionsObj.type) {
                this.withType(connectorFunctionsObj.type);
            }

            if (connectorFunctionsObj.payloadType) {
                this.withPayloadType(connectorFunctionsObj.payloadType);
            }

            if (connectorFunctionsObj.description) {
                this.withDescription(connectorFunctionsObj.description);
            }

            if (connectorFunctionsObj.northCriterias) {
                this.withNorthCriterias(connectorFunctionsObj.northCriterias);
            }

            if (connectorFunctionsObj.southCriterias) {
                this.withSouthCriterias(connectorFunctionsObj.southCriterias);
            }

            if (connectorFunctionsObj.javascript) {
                this.withJavascript(connectorFunctionsObj.javascript);
            }
        }
    }

    /**
     * Set the organization attribute
     * @param {string} organization - required field
     * @return {ConnectorFunctions}
     */

    _createClass(ConnectorFunctions, [{
        key: 'withOrganization',
        value: function withOrganization(organization) {
            if (typeof organization !== 'string' || organization.length === 0 || organization.length > 50) throw new Error('Parameter organization must be a string, cannot be empty and has a maximum length of 50');
            this._organization = organization;
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
            if (typeof channel !== 'string' || channel.length === 0 || channel.length > 50) throw new Error('Parameter channel must be a string, cannot be empty and has a maximum length of 50');
            this._channel = channel;
            return this;
        }

        /**
         * Set the identifier attribute
         * @param {string} identifier - required field
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'withIdentifier',
        value: function withIdentifier(identifier) {
            if (typeof identifier !== 'string' || identifier.length === 0 || identifier.length > 50) throw new Error('Parameter identifier must be a string, cannot be empty and has a maximum length of 50');
            this._identifier = identifier;
            return this;
        }

        /**
         * Set the name attribute
         * @param {string} name - required field
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string' || name.length === 0 || name.length > 50) throw new Error('Parameter name must be a string, cannot be empty and has a maximum length of 50');
            this._name = name;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description 
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
            if (typeof description !== 'string' || description.length > 250) throw new Error({
                message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_250",
                parameter: 'description'
            });
            this._description = description;
            return this;
        }

        /**
         * Set the operation name attribute
         * @param {string} operationName - required field
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'withOperationName',
        value: function withOperationName(operationName) {
            if (typeof operationName !== 'string' || operationName.length === 0 || operationName.length > 50) throw new Error('Parameter operation name must be a string, cannot be empty and has a maximum length of 50');
            this._operationName = operationName;
            return this;
        }

        /**
         * Set the javascript attribute
         * @param {string} javascript 
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'withJavascript',
        value: function withJavascript(javascript) {
            if (typeof javascript !== 'string') throw new Error('Parameter javascript must be a string');
            this._javascript = javascript;
            return this;
        }

        /**
         * Set the north criterias attribute
         * @param {array} criterias 
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'withNorthCriterias',
        value: function withNorthCriterias(criterias) {
            if (!(criterias instanceof Array) || criterias.length === 0) throw new Error('Parameter north criteria must be an array and cannot be empty');
            this._northCriterias = criterias;
            return this;
        }

        /**
         * Set the south criterias attribute
         * @param {array} criterias 
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'withSouthCriterias',
        value: function withSouthCriterias(criterias) {
            var _this = this;

            if (!(criterias instanceof Array) || criterias.length === 0) throw new Error('Parameter south criteria must be an array and cannot be empty');

            criterias.forEach(function (crit) {
                try {
                    _this.addSouthCriteria(crit);
                } catch (critErr) {
                    _this._southCriterias = null;
                    throw critErr;
                }
            });

            return this;
        }
    }, {
        key: 'addSouthCriteria',
        value: function addSouthCriteria(criteria) {
            if (typeof criteria !== 'string') throw new Error('South criteria must be a string');

            if (!this._southCriterias) {
                this._southCriterias = [];
            }

            this._southCriterias.push(criteria);
            return this;
        }

        /**
         * Set the type attribute
         * @param {string} type 
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'withType',
        value: function withType(type) {
            if (typeof type !== 'string' || !this._checkValues(type, _CONNECTOR_FUNCTIONS_ENUMS.CONNECTOR_FUNCTION_TYPES)) throw new Error('Parameter type must be a string and must be one of these values: ' + _CONNECTOR_FUNCTIONS_ENUMS.CONNECTOR_FUNCTION_TYPES);

            this._type = type;
            return this;
        }

        /**
         * Set the payload type attribute
         * @param {string} payloadType 
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'withPayloadType',
        value: function withPayloadType(payloadType) {
            if (typeof payloadType !== 'string' || !this._checkValues(payloadType, _CONNECTOR_FUNCTIONS_ENUMS.CONNECTOR_FUNCTION_PAYLOAD_TYPES)) throw new Error('Parameter payload type must be a string and must be one of these values: ' + _CONNECTOR_FUNCTIONS_ENUMS.CONNECTOR_FUNCTION_PAYLOAD_TYPES);

            this._payloadType = payloadType;
            return this;
        }

        /**
         * Set the operational status attribute
         * @param {boolean} operationalStatus 
         * @return {ConnectorFunctions}
         */
    }, {
        key: 'withOperationalStatus',
        value: function withOperationalStatus(operationalStatus) {
            if (typeof operationalStatus !== 'string' || !this._checkValues(operationalStatus, _CONNECTOR_FUNCTIONS_ENUMS.CONNECTOR_FUNCTION_OPERATIONAL_STATUS)) throw new Error('Parameter operational status must be a string and must be one of these values: ' + _CONNECTOR_FUNCTIONS_ENUMS.CONNECTOR_FUNCTION_OPERATIONAL_STATUS);

            this._operationalStatus = operationalStatus;
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            // this._checkRequiredParameters();

            var updateData = {
                "identifier": this._identifier,
                "name": this._name,
                "operationalStatus": this._operationalStatus,
                "operationName": this._type !== 'COLLECTION' ? this._operationName : undefined,
                "type": this._type,
                "payloadType": this._payloadType,
                "javascript": this._javascript,
                "description": this._description ? this._description : undefined,
                "northCriterias": this._type === 'REQUEST' ? this._northCriterias : undefined,
                "southCriterias": this._type !== 'REQUEST' ? this._southCriterias : undefined
            };

            return updateData;
        }
    }, {
        key: '_checkRequiredParameters',
        value: function _checkRequiredParameters(isUpdate) {
            if (isUpdate) {
                if (this._identifier === undefined || this._organization === undefined || this._channel === undefined || this._operationalStatus === undefined || this._type === undefined || this._payloadType === undefined || this._javascript === undefined) throw new Error('Parameters organization, channel, operational status, type, payloadType, javascript and identifier must be defined');
            } else {
                if (this._name === undefined || this._organization === undefined || this._channel === undefined || this._operationalStatus === undefined || this._type === undefined || this._payloadType === undefined || this._javascript === undefined) throw new Error('Parameters organization, channel, operational status, type, payloadType, javascript and name must be defined');
            }

            if (this._type === 'REQUEST' && this._payloadType !== 'JSON') {
                throw new Error('Parameter payload type must be JSON when type REQUEST');
            }
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            return "connectorFunctions/" + this._resource + "/" + this._organization + "/channels/" + this._channel + "/";
        }

        /** 
         * Create a new Connector Function
         * @return {Promise}
         * @throws {Error} 
         */
    }, {
        key: 'create',
        value: function create() {
            this._checkRequiredParameters();

            return this._doNorthPost(this._buildURL(), this._composeElement());
        }

        /** 
         * Updates a connector function
         * @return {Promise}
         * @throws {Error} 
         */
    }, {
        key: 'update',
        value: function update() {
            this._checkRequiredParameters(true);

            return this._doNorthPut(this._buildURL() + this._identifier, this._composeElement());
        }

        /** 
         * Deletes the selected connector function
         * @return {Promise}
         * @throws {Error} 
         */
    }, {
        key: 'delete',
        value: function _delete() {
            if (this._identifier === undefined || this._organization === undefined || this._channel === undefined) throw new Error('Parameters organization, channel and name must be defined');

            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._ogapi.Napi['delete'](this._buildURL() + this._identifier).then(function (res) {
                if (res.statusCode === 200) {
                    defered.resolve({
                        statusCode: res.statusCode
                    });
                } else {
                    defered.reject({
                        errors: res.errors,
                        statusCode: res.statusCode
                    });
                }
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }
    }]);

    return ConnectorFunctions;
})(_provisionBaseProvision2['default']);

exports['default'] = ConnectorFunctions;
module.exports = exports['default'];
//# sourceMappingURL=ConnectorFunctions.js.map
