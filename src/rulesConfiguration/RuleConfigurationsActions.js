'use strict';

import q from 'q';
import moment from 'moment';

export default class RuleConfigurationsActions {

    /**
     * @param {InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     * @param {string} name - Identifier of the ryule configuration to operate
     */
    constructor(ogapi, organization, channel, name) {
        if (name === undefined || organization === undefined || channel === undefined)
            throw new Error('Parameters organization, channel and name must be defined');

        if (typeof name !== 'string' || name.length === 0 || name.length > 50)
            throw new Error('Parameter name must be a string, cannot be empty and has a maximum length of 50');

        if (typeof organization !== 'string' || organization.length === 0 || organization.length > 50)
            throw new Error('Parameter organization must be a string, cannot be empty and has a maximum length of 50');

        if (typeof channel !== 'string' || channel.length === 0 || channel.length > 50)
            throw new Error('Parameter channel must be a string, cannot be empty and has a maximum length of 50');

        this._ogapi = ogapi;
        this._name = name;
        this._organization = organization;
        this._channel = channel;

        this._resource = 'provision/organizations/' + this._organization + '/channels/' + this._channel + '/ruleconfigurations/' + this._name;
    }

    /**
     * Clones a rule configuration into a new one
     * @param {string} newRuleName
     * @param {boolean} newRuleOpenAction
     * @param {string} newRuleCloseAction
     * @param {boolean} newRuleNotifications
     * @return {Promise}
     * @throws {Error} 
     */
    cloneTo(newRuleName, newRuleOpenAction, newRuleCloseAction, newRuleNotifications) {
        if (!newRuleName || !(newRuleOpenAction !== undefined || newRuleCloseAction !== undefined || newRuleNotifications !== undefined)) {
            throw new Error('Parameters newRuleName and one of newRuleOpenAction, newRuleCloseAction or newRuleNotifications must be defined');
        }

        if (typeof newRuleName !== 'string' || newRuleName.length === 0 || newRuleName.length > 50)
            throw new Error('Parameter newRuleName must be a string, cannot be empty and has a maximum length of 50');

        if (newRuleOpenAction && typeof newRuleOpenAction !== 'boolean')
            throw new Error('Parameter newRuleOpenAction must be true or false');

        if (newRuleCloseAction && (typeof newRuleCloseAction !== 'string' || newRuleCloseAction.length === 0 || newRuleCloseAction.length > 50))
            throw new Error('Parameter newRuleCloseAction must be a string, cannot be empty and has a maximum length of 50');

        if (newRuleNotifications && typeof newRuleNotifications !== 'boolean')
            throw new Error('Parameter newRuleNotifications must be true or false');

        let cloneInfo = {
            "name": newRuleName,
            "actions": {
                "open": newRuleOpenAction,
                "close": newRuleCloseAction,
                "notification": newRuleNotifications
            }
        };

        var defered = q.defer();
        var promise = defered.promise;
        this._ogapi.Napi.post(this._resource + '/clone', cloneInfo)
            .then((res) => {
                if (res.statusCode === 201) {
                    //console.log("CREATEOK: " + JSON.stringify(res));
                    if (typeof this._onCreated === "function") {
                        this._onCreated(res.header['location']);
                    }
                    defered.resolve({ location: res.header['location'], statusCode: res.statusCode });
                } else if (res.statusCode === 200) {
                    //console.log("POSTOK: " + JSON.stringify(res));
                    defered.resolve({ statusCode: res.statusCode });
                } else {
                    //console.log("ERROR " + JSON.stringify(res.errors));
                    defered.reject({ errors: res.errors, statusCode: res.statusCode });
                }
            })
            .catch((error) => {
                console.log("ERROR2 " + JSON.stringify(this._name) + JSON.stringify(error));
                defered.reject(error);
            });
        return promise;
    }
}