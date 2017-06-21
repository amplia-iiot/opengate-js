"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _RuleConfigurations = require('./RuleConfigurations');

var _RuleConfigurations2 = _interopRequireDefault(_RuleConfigurations);

/**
 * Defines the builder to configure a _RuleCondition
 */

var _RuleCondition = (function () {
    /**
     * @param {!RuleConfigurations} parent - RuleConfiguration object
     * @param {Object} conditionData - condition data to manage
     * @returns {_RuleCondition}
     */

    function _RuleCondition(parent, conditionData) {
        _classCallCheck(this, _RuleCondition);

        if (parent.constructor !== _RuleConfigurations2["default"]) {
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

    _createClass(_RuleCondition, [{
        key: "setDelay",
        value: function setDelay(delay) {
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
    }, {
        key: "deactivateDelay",
        value: function deactivateDelay() {
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
    }, {
        key: "setParameterValue",
        value: function setParameterValue(parameterName, parameterValue) {
            var _this = this;
            if (this._condition.parameters && this._condition.parameters.length > 0) {
                for (var idx in this._condition.parameters) {
                    var paramTmp = this._condition.parameters[idx];
                    if (paramTmp.name === parameterName) {
                        if (typeof paramTmp.value === "undefined") {
                            throw new Error("Value not allowed for parameter " + parameterName + " in condition " + this._condition.name);
                        }

                        paramTmp.value = parameterValue;

                        return _this;
                    }
                }

                throw new Error("Parameter " + parameterName + " not exists for condition " + this._condition.name);
            } else {
                throw new Error("There is no parameters for condition " + this._condition.name);
            }
        }

        /**
         * Returns parent
         * @returns {RuleConfiguration}
         */
    }, {
        key: "parent",
        value: function parent() {
            return this._ruleConfiguration;
        }
    }]);

    return _RuleCondition;
})();

exports["default"] = _RuleCondition;
module.exports = exports["default"];
//# sourceMappingURL=_RuleCondition.js.map
