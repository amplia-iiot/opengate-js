import RuleConfigurations from './RuleConfigurations'

/**
 * Defines the builder to configure a _RuleNotification
 */
export default class _RuleNotification {
    /**
     * @param {!RuleConfigurations} parent - RuleConfiguration object
     * @param {Object} notificationData - notification data to manage
     * @returns {_RuleNotification}
     */
    constructor(parent, notificationData) {
        if (parent.constructor !== RuleConfigurations) {
            throw new Error("Parent must be a RuleConfigurations");
        }

        this._ruleConfiguration = parent;
        this._notification = notificationData;
    }

    /**
     * Set the delay of the notification
     * @param {boolean} enabled
     * @returns {_RuleNotification}
     * @throws {Error}
     */
    setEnabled(enabled) {
        if (typeof enabled !== "boolean") {
            throw new Error("Bearer enabled must be true or false");
        }

        this._notification.enabled = enabled;
        return this;
    }

    /**
     * Sets recipients to the selected bearer
     * @param {string} bearerName
     * @param {Array} bearerRecipients
     * @returns {_RuleNotification}
     * @throws {Error}
     */
    setBearerRecipients(bearerName, bearerRecipients) {
        let _this = this;
        if (this._notification.bearers && this._notification.bearers.length > 0) {
            for (let idx in this._notification.bearers) {
                let bearerTmp = this._notification.bearers[idx];
                if (bearerTmp.name === bearerName) {
                    bearerTmp.recipients = bearerRecipients;

                    return _this;
                }
            }

            console.warn("Bearer " + bearerName + " not exists for notification " + this._notification.name);
        } else {
            console.warn("There is no bearers for notification " + this._notification.name);
        }

        return _this;
    }

    /**
     * Enables selected bearer
     * @param {string} bearerName
     * @param {boolean} bearerEnabled
     * @returns {_RuleNotification}
     * @throws {Error}
     */
    enableBearer(bearerName) {
        let _this = this;
        if (this._notification.bearers && this._notification.bearers.length > 0) {
            for (let idx in this._notification.bearers) {
                let bearerTmp = this._notification.bearers[idx];
                if (bearerTmp.name === bearerName) {
                    bearerTmp.enabled = true;
                    return _this;
                }
            }

            console.warn("Bearer " + bearerName + " not exists for notification " + this._notification.name);
        } else {
            console.warn("There is no bearers for notification " + this._notification.name);
        }

        return _this;
    }

    /**
     * Disables selected bearer
     * @param {string} bearerName
     * @returns {_RuleNotification}
     * @throws {Error}
     */
    disableBearer(bearerName) {
        let _this = this;
        if (this._notification.bearers && this._notification.bearers.length > 0) {
            for (let idx in this._notification.bearers) {
                let bearerTmp = this._notification.bearers[idx];
                if (bearerTmp.name === bearerName) {
                    bearerTmp.enabled = false;
                    return _this;
                }
            }

            console.warn("Bearer " + bearerName + " not exists for notification " + this._notification.name);
        } else {
            console.warn("There is no bearers for notification " + this._notification.name);
        }

        return _this;
    }

    /**
     * Returns parent
     * @returns {RuleConfiguration}
     */
    parent() {
        return this._ruleConfiguration;
    }
}