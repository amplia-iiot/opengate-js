'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var RuleConfigurationsActions = (function () {

    /**
     * @param {InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     * @param {string} name - Identifier of the ryule configuration to operate
     */

    function RuleConfigurationsActions(ogapi, organization, channel, name) {
        _classCallCheck(this, RuleConfigurationsActions);

        if (!ogapi || name === undefined || organization === undefined || channel === undefined) throw new Error('Parameters ogapi, organization, channel and name must be defined');

        if (typeof name !== 'string' || name.length === 0 || name.length > 50) throw new Error('Parameter name must be a string, cannot be empty and has a maximum length of 50');

        if (typeof organization !== 'string' || organization.length === 0 || organization.length > 50) throw new Error('Parameter organization must be a string, cannot be empty and has a maximum length of 50');

        if (typeof channel !== 'string' || channel.length === 0 || channel.length > 50) throw new Error('Parameter channel must be a string, cannot be empty and has a maximum length of 50');

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

    _createClass(RuleConfigurationsActions, [{
        key: 'cloneTo',
        value: function cloneTo(newRuleName, newRuleOpenAction, newRuleCloseAction, newRuleNotifications) {
            var _this2 = this;

            var _this = this;

            if (!newRuleName || !(newRuleOpenAction !== undefined || newRuleCloseAction !== undefined || newRuleNotifications !== undefined)) {
                throw new Error('Parameters newRuleName and one of newRuleOpenAction, newRuleCloseAction or newRuleNotifications must be defined');
            }

            if (typeof newRuleName !== 'string' || newRuleName.length === 0 || newRuleName.length > 50 || newRuleName.trim().toLowerCase() === this._name.trim().toLowerCase()) throw new Error('Parameter newRuleName must be a string, different than the original, cannot be empty and has a maximum length of 50');

            if (newRuleOpenAction && typeof newRuleOpenAction !== 'boolean') throw new Error('Parameter newRuleOpenAction must be true or false');

            if (newRuleCloseAction && (typeof newRuleCloseAction !== 'string' || newRuleCloseAction.length === 0 || newRuleCloseAction.length > 50)) throw new Error('Parameter newRuleCloseAction must be a string, cannot be empty and has a maximum length of 50');

            if (newRuleNotifications && typeof newRuleNotifications !== 'boolean') throw new Error('Parameter newRuleNotifications must be true or false');

            var cloneInfo = {
                "name": newRuleName,
                "actions": {
                    "open": newRuleOpenAction,
                    "close": newRuleCloseAction,
                    "notification": newRuleNotifications
                }
            };

            var defered = _q2['default'].defer();
            var promise = defered.promise;
            _this._ogapi.Napi.post(this._resource + '/clone', cloneInfo).then(function (res) {
                if (res.statusCode === 201) {
                    //console.log("CREATEOK: " + JSON.stringify(res));
                    if (typeof _this2._onCreated === "function") {
                        _this2._onCreated(res.header.location);
                    }
                    defered.resolve({ location: res.header.location, statusCode: res.statusCode });
                } else if (res.statusCode === 200) {
                    //console.log("POSTOK: " + JSON.stringify(res));
                    defered.resolve({ statusCode: res.statusCode });
                } else {
                    //console.log("ERROR " + JSON.stringify(res.errors));
                    defered.reject({ errors: res.errors, statusCode: res.statusCode });
                }
            })['catch'](function (error) {
                console.log("ERROR2 " + JSON.stringify(_this2._name) + JSON.stringify(error));
                defered.reject(error);
            });
            return promise;
        }
    }]);

    return RuleConfigurationsActions;
})();

exports['default'] = RuleConfigurationsActions;
module.exports = exports['default'];
//# sourceMappingURL=RuleConfigurationsActions.js.map
