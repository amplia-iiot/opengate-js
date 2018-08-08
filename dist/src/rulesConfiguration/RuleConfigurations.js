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

    function RuleConfigurations(ogapi, organization, channel, ruleConfigurationObj) {
        _classCallCheck(this, RuleConfigurations);

        _get(Object.getPrototypeOf(RuleConfigurations.prototype), 'constructor', this).call(this, ogapi, "/organizations");

        this.withName(ruleConfigurationObj.name);

        if (ruleConfigurationObj.description) {
            this.withDescription(ruleConfigurationObj.description);
        }

        this.withEnabled(ruleConfigurationObj.enabled);
        this.withSeverity(ruleConfigurationObj.severity);

        this._withConditions(ruleConfigurationObj.conditions);
        this._withNotifications(ruleConfigurationObj.notifications);

        this.withOrganization(organization);
        this.withChannel(channel);
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
         * Set the enabled attribute
         * @param {string} enabled 
         * @return {RulesConfigurations}
         */
    }, {
        key: 'withEnabled',
        value: function withEnabled(enabled) {
            if (typeof enabled !== 'boolean') throw new Error('Parameter enabled must be true or false');
            this._enabled = enabled;
            return this;
        }

        /**
         * Set the severity attribute
         * @param {string} severity 
         * @return {RulesConfigurations}
         */
    }, {
        key: 'withSeverity',
        value: function withSeverity(severity) {
            if (typeof severity !== 'string') throw new Error('Parameter severity must be a string');
            this._severity = severity;
            return this;
        }

        /**
         * Set the conditions attribute
         * @param {Array} conditions 
         * @return {RulesConfigurations}
         */
    }, {
        key: '_withConditions',
        value: function _withConditions(conditions) {
            //if (typeof conditions.constructor !== 'Array')
            //    throw new Error('Parameter conditions must be an Array');
            if (!conditions) {
                throw new Error('A rule must have conditions');
            }

            conditions.forEach(function (condTmp, idx) {
                if (!condTmp.name) {
                    throw new Error('Every condition must contain a name');
                }
            });

            this._conditions = conditions;
            return this;
        }

        /**
         * Set the notifications attribute
         * @param {Array} notifications 
         * @return {RulesConfigurations}
         */
    }, {
        key: '_withNotifications',
        value: function _withNotifications(notifications) {
            //if (typeof notifications !== 'Array')
            //    throw new Error('Parameter notifications must be an Array');

            if (notifications) {
                notifications.forEach(function (notifTmp, idx) {
                    if (!notifTmp.name) {
                        throw new Error('Every notification must contain a name');
                    }
                });

                this._notifications = notifications;
            }
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            if (this._name === undefined || this._enabled === undefined || this._organization === undefined || this._channel === undefined || this._severity === undefined) throw new Error('Parameters organization, channel, severity, enabled and name must be defined');

            var updateData = {
                "configurations": [{
                    "name": this._name,
                    "enabled": this._enabled,
                    "severity": this._severity,
                    "description": this._description ? this._description : undefined,
                    "conditions": this._conditions,
                    "notifications": this._notifications
                }]
            };

            return updateData;
        }

        /**
         * Allows the modification of a condition
         * @param {string} condName 
         * @return {_RuleCondition}
         */
    }, {
        key: 'condition',
        value: function condition(condName) {
            var _condition = {};
            var _this = this;
            if (this._conditions && this._conditions.length > 0) {
                this._conditions.forEach(function (condTmp, idx) {
                    if (condTmp.name === condName) {
                        //console.log(idx + ": " + condTmp);
                        _condition = condTmp;
                    }
                });

                if (_condition.name) {
                    //console.log(_condition.name);
                    return new _RuleCondition3['default'](_this, _condition);
                } else {
                    throw new Error("Condition " + condName + " not exists in rule " + _this.name);
                }
            } else {
                throw new Error("Condition " + condName + " not exists in rule " + _this.name);
            }
        }

        /**
         * Allows the modification of a notification
         * @param {string} notifName 
         * @return {_RuleCondition}
         */
    }, {
        key: 'notification',
        value: function notification(notifName) {
            var _notification = {};
            var _this = this;
            if (this._notifications && this._notifications.length > 0) {
                this._notifications.forEach(function (notifTmp, idx) {
                    if (notifTmp.name === notifName) {
                        //console.log(idx + ": " + notifTmp);
                        _notification = notifTmp;
                    }
                });

                if (_notification.name) {
                    //console.log(_notification.name);
                    return new _RuleNotification3['default'](_this, _notification);
                } else {
                    throw new Error("Notification " + notifName + " not exists in rule " + _this.name);
                }
            } else {
                throw new Error("Notification " + notifName + " not exists in rule " + _this.name);
            }
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            return this._resource + "/" + this._organization + "/channels/" + this._channel + "/ruleconfigurations";
        }

        /** 
         * Create not allowed
         * @throws {Error} 
         */
    }, {
        key: 'create',
        value: function create() {
            throw new Error("Rule configuration creation not allowed");
        }

        /** 
         * Deletes the selected RuleConfiguration
         * @return {Promise}
         * @throws {Error} 
         */
    }, {
        key: 'delete',
        value: function _delete() {
            if (this._name === undefined || this._organization === undefined || this._channel === undefined) throw new Error('Parameters organization, channel and name must be defined');

            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._ogapi.Napi['delete'](this._buildURL() + '/' + this._name).then(function (res) {
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
