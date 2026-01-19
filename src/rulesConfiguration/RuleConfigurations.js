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
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi, organization, channel, identifier, ruleConfigurationObj) {
        super(ogapi, "/organizations");

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
                // } else {
                //     this.withActive(false);
            }

            if (ruleConfigurationObj.condition !== null && typeof ruleConfigurationObj.condition !== 'undefined')
                this.withCondition(ruleConfigurationObj.condition);

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
     * Set the identifier attribute
     * @param {string} identifier - required field
     * @return {RulesConfigurations}
     */
    withIdentifier(identifier) {
        if (typeof identifier !== 'string' || identifier.length === 0 || identifier.length > 50)
            throw new Error('Parameter identifier must be a string, cannot be empty and has a maximum length of 50');
        this._identifier = identifier;
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
     * Set the javascript attribute
     * @param {string} javascript 
     * @return {RulesConfigurations}
     */
    withJavascript(javascript) {
        if (typeof javascript !== 'string')
            throw new Error('Parameter name must be a string and cannot be empty');
        this._javascript = javascript;
        return this;
    }

    /**
     * Set the mode attribute
     * @param {string} mode 
     * @return {RulesConfigurations}
     */
    withMode(mode) {
        this._mode = mode;
        return this;
    }

    /**
     * Set the type attribute
     * @param {string} type 
     * @return {RulesConfigurations}
     */
    withType(type) {
        this._type = type;
        return this;
    }

    /**
     * Set the active attribute
     * @param {boolean} active 
     * @return {RulesConfigurations}
     */
    withActive(active) {
        if (typeof active !== 'boolean')
            throw new Error('Parameter active must be true or false');
        this._active = active;
        return this;
    }

    /**
     * Set the actions delay attribute
     * @param {number} actionsDelay 
     * @return {RulesConfigurations}
     */
    withActionsDelay(actionsDelay) {
        if (typeof actionsDelay !== 'number')
            throw new Error('Parameter actionsDelay must be a number');
        this._actionsDelay = actionsDelay;
        return this;
    }

    /**
     * Allows the modification of a condition
     * @param {string} conditionFilter 
     * @return {_RuleCondition}
     */
    withCondition(conditionFilter) {
        this._condition = conditionFilter || {};

        return this;
    }

    /**
     * Allows the modification of the actions
     * @param {object} actions 
     * @return {_RuleCondition}
     */
    withActions(actions) {
        this._actions = actions || {};

        return this;
    }

    /**
     * Allows the modification of the actions
     * @param {array} parameters 
     * @return {_RuleCondition}
     */
    withParameters(parameters) {
        this._parameters = parameters || [];

        return this;
    }

    _composeElement() {
        // this._checkRequiredParameters();

        let updateData = {
            "identifier": this._identifier,
            "name": this._name,
            "active": this._active,
            "mode": this._mode,
            "type": this._type,
            "severity": this._severity,
            "description": (this._description ? this._description : undefined),
            "parameters": this._parameters,
            "condition": this._mode === 'EASY' ? this._condition : undefined,
            "actionsDelay": this._actionsDelay,
            "actions": this._mode === 'EASY' ? this._actions : undefined,
            "javascript": this._mode === 'ADVANCED' ? this._javascript : undefined
        };

        return updateData;
    }


    _checkRequiredParameters(isUpdate) {
        if (isUpdate) {
            if (this._identifier === undefined || this._organization === undefined || this._channel === undefined || this._active === undefined || this._mode === undefined)
                throw new Error('Parameters organization, channel, active, mode and identifier must be defined');
        } else {
            if (this._name === undefined || this._organization === undefined || this._channel === undefined || this._active === undefined || this._mode === undefined)
                throw new Error('Parameters organization, channel, active, mode and name must be defined');
        }
    }

    _buildURL() {
        return "rules/" + this._resource + "/" + this._organization + "/channels/" + this._channel;
    }

    /** 
     * Create a new Rule
     * @return {Promise}
     * @throws {Error} 
     */
    create() {
        this._checkRequiredParameters();

        return this._doNorthPost(this._buildURL(), this._composeElement());
    }

    /** 
     * Udpate a Rule
     * @return {Promise}
     * @throws {Error} 
     */
    update() {
        this._checkRequiredParameters(true);

        return this._doNorthPut(this._buildURL() + '/' + this._identifier, this._composeElement());
    }

    /** 
     * Udpate a Rule
     * @return {Promise}
     * @throws {Error} 
     */
    updateParameters(newParameters) {
        if (this._identifier === undefined || this._organization === undefined || this._channel === undefined) {
            throw new Error('Parameters organization, channel and identifier must be defined');
        }

        return this._doNorthPut(this._buildURL() + this._identifier + '/parameters', newParameters || this._parameters || []);
    }

    /** 
     * Deletes the selected RuleConfiguration
     * @return {Promise}
     * @throws {Error} 
     */
    delete() {
        if (this._identifier === undefined || this._organization === undefined || this._channel === undefined)
            throw new Error('Parameters organization, channel and name must be defined');

        var defered = q.defer();
        var promise = defered.promise;
        this._ogapi.Napi.delete(this._buildURL() + this._identifier)
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