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

var _RuleCondition2 = require('./_RuleCondition');

var _RuleCondition3 = _interopRequireDefault(_RuleCondition2);

var _RuleNotification2 = require('./_RuleNotification');

var _RuleNotification3 = _interopRequireDefault(_RuleNotification2);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

/**
 * This is a base object that contains all you can do about RulesConfigurations.
 */

var RuleConfigurations = (function (_BaseProvision) {
    _inherits(RuleConfigurations, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function RuleConfigurations(ogapi, organization, channel, identifier, ruleConfigurationObj) {
        _classCallCheck(this, RuleConfigurations);

        _get(Object.getPrototypeOf(RuleConfigurations.prototype), 'constructor', this).call(this, ogapi, "/organizations");

        // Required
        this.withOrganization(organization);
        this.withChannel(channel);

        // only for updates
        if (identifier) {
            this.withIdentifier(identifier);
        }

        if (ruleConfigurationObj) {
            if (ruleConfigurationObj.name) {
                this.withName(ruleConfigurationObj.name);
            }

            if (ruleConfigurationObj.mode) {
                this.withMode(ruleConfigurationObj.mode);
            }

            if (ruleConfigurationObj.type) {
                this.withType(ruleConfigurationObj.type);
            }

            if (ruleConfigurationObj.description) {
                this.withDescription(ruleConfigurationObj.description);
            }

            if (ruleConfigurationObj.active !== null && typeof ruleConfigurationObj.active !== 'undefined') {
                this.withActive(ruleConfigurationObj.active);
            } else {
                this.withActive(false);
            }

            if (ruleConfigurationObj.condition !== null && typeof ruleConfigurationObj.condition !== 'undefined') this.withCondition(ruleConfigurationObj.condition);

            if (ruleConfigurationObj.actionsDelay) {
                this.withActionsDelay(ruleConfigurationObj.actionsDelay);
            }

            if (ruleConfigurationObj.actions) {
                this.withActions(ruleConfigurationObj.actions);
            }

            if (ruleConfigurationObj.parameters) {
                this.withParameters(ruleConfigurationObj.parameters);
            }

            if (ruleConfigurationObj.javascript) {
                this.withJavascript(ruleConfigurationObj.javascript);
            }
        }
    }

    /**
     * Set the organization attribute
     * @param {string} organization - required field
     * @return {RulesConfigurations}
     */

    _createClass(RuleConfigurations, [{
        key: 'withOrganization',
        value: function withOrganization(organization) {
            if (typeof organization !== 'string' || organization.length === 0 || organization.length > 50) throw new Error('Parameter organization must be a string, cannot be empty and has a maximum length of 50');
            this._organization = organization;
            return this;
        }

        /**
         * Set the channel attribute
         * @param {string} channel - required field
         * @return {RulesConfigurations}
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
         * @return {RulesConfigurations}
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
         * @return {RulesConfigurations}
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
         * @return {RulesConfigurations}
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
         * Set the javascript attribute
         * @param {string} javascript 
         * @return {RulesConfigurations}
         */
    }, {
        key: 'withJavascript',
        value: function withJavascript(javascript) {
            if (typeof javascript !== 'string') throw new Error('Parameter name must be a string and cannot be empty');
            this._javascript = javascript;
            return this;
        }

        /**
         * Set the mode attribute
         * @param {string} mode 
         * @return {RulesConfigurations}
         */
    }, {
        key: 'withMode',
        value: function withMode(mode) {
            this._mode = mode;
            return this;
        }

        /**
         * Set the type attribute
         * @param {string} type 
         * @return {RulesConfigurations}
         */
    }, {
        key: 'withType',
        value: function withType(type) {
            this._type = type;
            return this;
        }

        /**
         * Set the active attribute
         * @param {boolean} active 
         * @return {RulesConfigurations}
         */
    }, {
        key: 'withActive',
        value: function withActive(active) {
            if (typeof active !== 'boolean') throw new Error('Parameter active must be true or false');
            this._active = active;
            return this;
        }

        /**
         * Set the actions delay attribute
         * @param {number} actionsDelay 
         * @return {RulesConfigurations}
         */
    }, {
        key: 'withActionsDelay',
        value: function withActionsDelay(actionsDelay) {
            if (typeof actionsDelay !== 'number') throw new Error('Parameter actionsDelay must be a number');
            this._actionsDelay = actionsDelay;
            return this;
        }

        /**
         * Allows the modification of a condition
         * @param {string} conditionFilter 
         * @return {_RuleCondition}
         */
    }, {
        key: 'withCondition',
        value: function withCondition(conditionFilter) {
            this._condition = conditionFilter || {};

            return this;
        }

        /**
         * Allows the modification of the actions
         * @param {object} actions 
         * @return {_RuleCondition}
         */
    }, {
        key: 'withActions',
        value: function withActions(actions) {
            this._actions = actions || {};

            return this;
        }

        /**
         * Allows the modification of the actions
         * @param {array} parameters 
         * @return {_RuleCondition}
         */
    }, {
        key: 'withParameters',
        value: function withParameters(parameters) {
            this._parameters = parameters || [];

            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._checkRequiredParameters();

            var updateData = {
                "identifier": this._identifier,
                "name": this._name,
                "active": this._active,
                "mode": this._mode,
                "type": this._type,
                "severity": this._severity,
                "description": this._description ? this._description : undefined,
                "parameters": this._parameters,
                "condition": this._mode === 'EASY' ? this._condition : undefined,
                "actionsDelay": this._mode === 'EASY' ? this._actionsDelay : undefined,
                "actions": this._mode === 'EASY' ? this._actions : undefined,
                "javascript": this._mode === 'ADVANCED' ? this._javascript : undefined
            };

            return updateData;
        }
    }, {
        key: '_checkRequiredParameters',
        value: function _checkRequiredParameters(isUpdate) {
            if (isUpdate) {
                if (this._identifier === undefined || this._organization === undefined || this._channel === undefined || this._active === undefined || this._mode === undefined) throw new Error('Parameters organization, channel, active, mode and identifier must be defined');
            } else {
                if (this._name === undefined || this._organization === undefined || this._channel === undefined || this._active === undefined || this._mode === undefined) throw new Error('Parameters organization, channel, active, mode and name must be defined');
            }
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            return "rules/" + this._resource + "/" + this._organization + "/channels/" + this._channel + "/";
        }

        /** 
         * Create a new Rule
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
         * Udpate a Rule
         * @return {Promise}
         * @throws {Error} 
         */
    }, {
        key: 'update',
        value: function update() {
            this._checkRequiredParameters(true);

            return this._doNorthPut(this._buildURL() + '/' + this._identifier, this._composeElement());
        }

        /** 
         * Deletes the selected RuleConfiguration
         * @return {Promise}
         * @throws {Error} 
         */
    }, {
        key: 'delete',
        value: function _delete() {
            if (this._identifier === undefined || this._organization === undefined || this._channel === undefined) throw new Error('Parameters organization, channel and name must be defined');

            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._ogapi.Napi['delete'](this._buildURL() + '/' + this._identifier).then(function (res) {
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

    return RuleConfigurations;
})(_provisionBaseProvision2['default']);

exports['default'] = RuleConfigurations;
module.exports = exports['default'];
//# sourceMappingURL=RuleConfigurations.js.map
