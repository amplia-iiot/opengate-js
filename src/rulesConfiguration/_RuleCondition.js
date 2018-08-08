import RuleConfigurations from './RuleConfigurations'

/**
 * Defines the builder to configure a _RuleCondition
 */
export default class _RuleCondition {
    /**
     * @param {!RuleConfigurations} parent - RuleConfiguration object
     * @param {Object} conditionData - condition data to manage
     * @returns {_RuleCondition}
     */
    constructor(parent, conditionData) {
        if (parent.constructor !== RuleConfigurations) {
            throw new Error("Parent must be a RuleConfigurations");
        }

        this._ruleConfiguration = parent;
        this._condition = conditionData;
    }

    /**
     * Set the delay, in seconds, of the condition
     * @param {number} delay
     * @returns {_RuleCondition}
     * @throws {Error}
     */
    setDelay(delay) {
        if (typeof delay !== "number" || typeof delay < 1) {
            throw new Error("Parameter delay must be typeof number and higher than -1");
        }

        if (typeof this._condition.delay === 'undefined') {
            console.warn("Parameter delay cannot be setted for this condition");
        } else {
            this._condition.delay = delay * 1000;
        }

        return this;
    }

    /**
     * Deactivates the delay of the condition
     * @returns {_RuleCondition}
     * @throws {Error}
     */
    deactivateDelay() {
        if (typeof this._condition.delay === 'undefined') {
            console.warn("Parameter delay cannot be setted for this condition");
        } else {
            this._condition.delay = -1;
        }

        return this;
    }

    /**
     * Sets a value to the selected parameter
     * @param {string} parameterName
     * @param {string} parameterValue
     * @returns {_RuleCondition}
     * @throws {Error}
     */
    setParameterValue(parameterName, parameterValue) {
        let _this = this;
        if (this._condition.parameters && this._condition.parameters.length > 0) {
            for (let idx in this._condition.parameters) {
                let paramTmp = this._condition.parameters[idx];
                if (paramTmp.name === parameterName) {
                    if (typeof paramTmp.value === "undefined") {
                        throw new Error("Value not allowed for parameter " + parameterName + " in condition " + this._condition.name);
                    }
                    paramTmp.value = !parameterValue ? "" : parameterValue;
                    return _this;
                }
            }
            throw new Error("Parameter " + parameterName + " not exists for condition " + this._condition.name);
        }
    }

    /**
     * Returns parent
     * @returns {RuleConfiguration}
     */
    parent() {
        return this._ruleConfiguration;
    }
}