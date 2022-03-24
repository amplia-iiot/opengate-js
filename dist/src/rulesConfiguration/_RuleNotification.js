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
 * Defines the builder to configure a _RuleNotification
 */

var _RuleNotification = (function () {
    /**
     * @param {!RuleConfigurations} parent - RuleConfiguration object
     * @param {Object} notificationData - notification data to manage
     * @returns {_RuleNotification}
     */

    function _RuleNotification(parent, notificationData) {
        _classCallCheck(this, _RuleNotification);

        if (parent.constructor !== _RuleConfigurations2["default"]) {
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

    _createClass(_RuleNotification, [{
        key: "setEnabled",
        value: function setEnabled(enabled) {
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
    }, {
        key: "setBearerRecipients",
        value: function setBearerRecipients(bearerName, bearerRecipients) {
            var _this = this;
            if (this._notification.bearers && this._notification.bearers.length > 0) {
                for (var idx in this._notification.bearers) {
                    var bearerTmp = this._notification.bearers[idx];
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
    }, {
        key: "enableBearer",
        value: function enableBearer(bearerName) {
            var _this = this;
            if (this._notification.bearers && this._notification.bearers.length > 0) {
                for (var idx in this._notification.bearers) {
                    var bearerTmp = this._notification.bearers[idx];
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
    }, {
        key: "disableBearer",
        value: function disableBearer(bearerName) {
            var _this = this;
            if (this._notification.bearers && this._notification.bearers.length > 0) {
                for (var idx in this._notification.bearers) {
                    var bearerTmp = this._notification.bearers[idx];
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
    }, {
        key: "parent",
        value: function parent() {
            return this._ruleConfiguration;
        }
    }]);

    return _RuleNotification;
})();

exports["default"] = _RuleNotification;
module.exports = exports["default"];
//# sourceMappingURL=_RuleNotification.js.map
