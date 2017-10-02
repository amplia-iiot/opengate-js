'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ProvisionGenericFinder2 = require('../ProvisionGenericFinder');

var _ProvisionGenericFinder3 = _interopRequireDefault(_ProvisionGenericFinder2);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

/**
 *   This class allow make get request to RuleConfigurations resource into Opengate North API.
 */

var RuleConfigurationsFinder = (function (_ProvisionGenericFinder) {
    _inherits(RuleConfigurationsFinder, _ProvisionGenericFinder);

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */

    function RuleConfigurationsFinder(ogapi) {
        _classCallCheck(this, RuleConfigurationsFinder);

        _get(Object.getPrototypeOf(RuleConfigurationsFinder.prototype), 'constructor', this).call(this, ogapi, 'organizations', "configurations", 'Rule configurations not found');
    }

    /**
     * Find a specify organization by a name. This execute a GET http method
     * @test
     *   ogapi.newRuleConfigurationsFinder().findByOrganizationAndChannelAndName('my_org', 'my_chann', 'name').then().catch();
     * @param {string} organization - organization
     * @param {string} channel - channel
     * @return {Promise} 
     */

    _createClass(RuleConfigurationsFinder, [{
        key: 'findByOrganizationAndChannel',
        value: function findByOrganizationAndChannel(organization, channel) {
            this._organization = organization;
            this._channel = channel;
            return this._execute();
        }

        /**
         * Performs a get that returns organizations related
         * @test
         *   ogapi.newRuleConfigurationsFinder().findByOrganizationAndChannel('xxx-xx-xxx-xxx', 'xxxxx-xxxx-xxxx').then().catch();
         * @param {string} organization - organization 
         * @param {string} channel - channel.
         * @param {string} name - Rule Configuration name
         * @return {Promise} 
         */
    }, {
        key: 'findByOrganizationAndChannelAndName',
        value: function findByOrganizationAndChannelAndName(organization, channel, name) {
            var _this = this;
            _this._organization = organization;
            _this._channel = channel;
            _this._name = name;

            var defered = _q2['default'].defer();
            var promise = defered.promise;
            var _error_not_found = this._error_not_found;

            this._execute().then(function (request) {
                if (request.statusCode === 204) {
                    defered.reject({ data: _error_not_found, statusCode: _httpStatusCodes2['default'].NOT_FOUND });
                } else {
                    var globalData = request.data;
                    var finalData = [];

                    for (var idx in globalData) {
                        if (globalData[idx].name === _this._name) {
                            finalData.push(globalData[idx]);
                        }
                    }

                    if (finalData.length > 0) {
                        if (request.syncCache) {
                            defered.resolve({ data: finalData, statusCode: request.statusCode, syncCache: request.syncCache });
                        } else {
                            defered.resolve({ data: finalData, statusCode: request.statusCode });
                        }
                    } else {
                        defered.reject({ data: _error_not_found, statusCode: _httpStatusCodes2['default'].NOT_FOUND });
                    }
                }
            })['catch'](function (error) {
                defered.reject(error);
            });

            return promise;
        }
    }, {
        key: '_composeUrl',
        value: function _composeUrl() {
            return this._baseUrl + "/" + this._organization + "/channels/" + this._channel + "/ruleconfigurations";
        }
    }]);

    return RuleConfigurationsFinder;
})(_ProvisionGenericFinder3['default']);

exports['default'] = RuleConfigurationsFinder;
module.exports = exports['default'];
//# sourceMappingURL=RuleConfigurationsFinder.js.map
