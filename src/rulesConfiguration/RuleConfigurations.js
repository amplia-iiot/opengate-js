'use strict';

import BaseProvision from '../provision/BaseProvision';
import _RuleCondition from './_RuleCondition';
import _RuleNotification from './_RuleNotification';
import q from 'q';

/**
 * This is a base object that contains all you can do about RulesConfigurations.
 */
export default class RuleConfigurations extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi, organization, channel, ruleConfigurationObj) {
        super(ogapi, "/organizations");

        this.withName(ruleConfigurationObj.name);

        if (ruleConfigurationObj.description) {
            this.withDescription(ruleConfigurationObj.description);
        }

        if (ruleConfigurationObj.enabled !== null && typeof ruleConfigurationObj.enabled !== 'undefined')
            this.withEnabled(ruleConfigurationObj.enabled);

        if (ruleConfigurationObj.open !== null && typeof ruleConfigurationObj.open !== 'undefined')
            this.withOpen(ruleConfigurationObj.open);

        if (ruleConfigurationObj.severity !== null && typeof ruleConfigurationObj.severity !== 'undefined')
            this.withSeverity(ruleConfigurationObj.severity);

        if (ruleConfigurationObj.conditions !== null && typeof ruleConfigurationObj.conditions !== 'undefined')
            this._withConditions(ruleConfigurationObj.conditions);
        if (ruleConfigurationObj.notifications !== null && typeof ruleConfigurationObj.notifications !== 'undefined')
            this._withNotifications(ruleConfigurationObj.notifications);

        this.withOrganization(organization);
        this.withChannel(channel);
    }


    /**
     * Set the organization attribute
     * @param {string} organization - required field
     * @return {RulesConfigurations}
     */
    withOrganization(organization) {
        if (typeof organization !== 'string' || organization.length === 0 || organization.length > 50)
            throw new Error('Parameter organization must be a string, cannot be empty and has a maximum length of 50');
        this._organization = organization;
        return this;
    }

    /**
     * Set the channel attribute
     * @param {string} channel - required field
     * @return {RulesConfigurations}
     */
    withChannel(channel) {
        if (typeof channel !== 'string' || channel.length === 0 || channel.length > 50)
            throw new Error('Parameter channel must be a string, cannot be empty and has a maximum length of 50');
        this._channel = channel;
        return this;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {RulesConfigurations}
     */
    withName(name) {
        if (typeof name !== 'string' || name.length === 0 || name.length > 50)
            throw new Error('Parameter name must be a string, cannot be empty and has a maximum length of 50');
        this._name = name;
        return this;
    }

    /**
     * Set the description attribute
     * @param {string} description 
     * @return {RulesConfigurations}
     */
    withDescription(description) {
        if (typeof description !== 'string' || description.length > 250)
            throw new Error({
                message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_250",
                parameter: 'description'
            });
        this._description = description;
        return this;
    }

    /**
     * Set the open attribute
     * @param {boolean} open 
     * @return {RulesConfigurations}
     */
    withOpen(open) {
        if (typeof open !== 'boolean')
            throw new Error('Parameter open must be true or false');
        this._open = open;
        return this;
    }

    /**
     * Set the enabled attribute
     * @param {boolean} enabled 
     * @return {RulesConfigurations}
     */
    withEnabled(enabled) {
        if (typeof enabled !== 'boolean')
            throw new Error('Parameter enabled must be true or false');
        this._enabled = enabled;
        return this;
    }

    /**
     * Set the severity attribute
     * @param {string} severity 
     * @return {RulesConfigurations}
     */
    withSeverity(severity) {
        if (typeof severity !== 'string')
            throw new Error('Parameter severity must be a string');
        this._severity = severity;
        return this;
    }

    /**
     * Allows the modification of a condition
     * @param {string} condName 
     * @return {_RuleCondition}
     */
    condition(condName) {
        let _condition = {};
        let _this = this;
        if (this._conditions && this._conditions.length > 0) {
            this._conditions.forEach(function (condTmp, idx) {
                if (condTmp.name === condName) {
                    //console.log(idx + ": " + condTmp);
                    _condition = condTmp;
                }
            });

            if (_condition.name) {
                //console.log(_condition.name);
                return new _RuleCondition(_this, _condition);
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
    notification(notifName) {
        let _notification = {};
        let _this = this;
        if (this._notifications && this._notifications.length > 0) {
            this._notifications.forEach(function (notifTmp, idx) {
                if (notifTmp.name === notifName) {
                    //console.log(idx + ": " + notifTmp);
                    _notification = notifTmp;
                }
            });

            if (_notification.name) {
                //console.log(_notification.name);
                return new _RuleNotification(_this, _notification);
            } else {
                throw new Error("Notification " + notifName + " not exists in rule " + _this.name);
            }
        } else {
            throw new Error("Notification " + notifName + " not exists in rule " + _this.name);
        }
    }

    /**
     * Set the conditions attribute
     * @param {Array} conditions 
     * @return {RulesConfigurations}
     */
    _withConditions(conditions) {
        conditions.forEach(function (condition, idx) {
            if (!condition.name) {
                throw new Error('Every condition must contain a name');
            }
            if (condition.parameters) {
                condition.parameters.forEach(function (parameter, index) {
                    if (!parameter.value) {
                        conditions[idx].parameters[index].value = "";
                    }
                });
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
    _withNotifications(notifications) {
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

    _composeElement() {
        if (this._name === undefined || this._enabled === undefined || this._organization === undefined || this._channel === undefined || this._severity === undefined)
            throw new Error('Parameters organization, channel, severity, enabled and name must be defined');

        if (!this._conditions) {
            throw new Error('A rule must have conditions');
        }


        let updateData = {
            "configurations": [{
                "name": this._name,
                "enabled": this._enabled,
                "severity": this._severity,
                "description": (this._description ? this._description : undefined),
                "conditions": this._conditions,
                "notifications": this._notifications
            }]
        };

        return updateData;
    }

    _buildURL() {
        return this._resource + "/" + this._organization + "/channels/" + this._channel + "/ruleconfigurations";
    }

    /** 
     * Create not allowed
     * @throws {Error} 
     */
    create() {
        throw new Error("Rule configuration creation not allowed");
    }

    /** 
     * Deletes the selected RuleConfiguration
     * @return {Promise}
     * @throws {Error} 
     */
    delete() {
        if (this._name === undefined || this._organization === undefined || this._channel === undefined)
            throw new Error('Parameters organization, channel and name must be defined');

        var defered = q.defer();
        var promise = defered.promise;
        this._ogapi.Napi.delete(this._buildURL() + '/' + this._name)
            .then((res) => {
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
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }
}