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

var _utilFormatsCheck_types = require('../util/formats/check_types');

var _utilFormatsCheck_types2 = _interopRequireDefault(_utilFormatsCheck_types);

/**
 * This is a base object that contains all you can do about Bundles.
 */

var RestRequest = (function (_BaseProvision) {
    _inherits(RestRequest, _BaseProvision);

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function RestRequest(ogapi) {
        _classCallCheck(this, RestRequest);

        _get(Object.getPrototypeOf(RestRequest.prototype), 'constructor', this).call(this, ogapi, "/organization", undefined, ["identifier", "organization", "schedule", "restRequest", "response"], 'scheduler');
        this._ogapi = ogapi;
    }

    _createClass(RestRequest, [{
        key: '_buildURL',
        value: function _buildURL() {
            _utilFormatsCheck_types2['default']._checkString(this._organization, 'organization');
            _utilFormatsCheck_types2['default']._checkString(this._identifier, 'identifier');

            return 'organization/' + this._organization + '/restRequest/' + this._identifier;
        }

        /**
         * Sets the identifier attribute
         * @param {string} identifier
         * @return {RestRequest}
         */
    }, {
        key: 'withIdentifier',
        value: function withIdentifier(identifier) {
            _utilFormatsCheck_types2['default']._checkString(identifier, 'identifier');
            this._identifier = identifier;
            return this;
        }

        /**
         * Set the organization attribute
         * @param {string} organization 
         * @return {Channels}
         */
    }, {
        key: 'withOrganization',
        value: function withOrganization(organization) {
            if (typeof organization !== 'string' || organization.length > 50) throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'organization' });
            this._organization = organization;
            return this;
        }

        /**
         * Sets the crontab expression for schedule
         * @param {string} cronExpression
         * @param {string} timezone
         * @return {RestRequest}
         */
    }, {
        key: 'withScheduleCronExpression',
        value: function withScheduleCronExpression(cronExpression, timezone) {
            _utilFormatsCheck_types2['default']._checkString(cronExpression, 'cronExpression');
            _utilFormatsCheck_types2['default']._checkString(timezone, 'timezone');

            if (!this._schedule) {
                this._schedule = {};
            }

            this._schedule = {
                cron: {
                    expression: cronExpression,
                    timeZone: timezone
                }
            };
            return this;
        }

        /**
         * Sets the interval for schedule in minutes
         * @param {number} interval in minutes
         * @return {RestRequest}
         */
    }, {
        key: 'withScheduleMinutesInterval',
        value: function withScheduleMinutesInterval(interval) {
            _utilFormatsCheck_types2['default']._checkNumber(interval, 'interval');

            if (!this._schedule) {
                this._schedule = {};
            }

            this._schedule.interval = {
                minutes: interval
            };

            return this;
        }

        /**
         * Sets the executeNow attribute
         * @param {boolean} executeNow
         * @return {RestRequest}
         */
    }, {
        key: 'withScheduleExecuteNow',
        value: function withScheduleExecuteNow(executeNow) {
            _utilFormatsCheck_types2['default']._checkBoolean(executeNow, 'executeNow');

            if (!this._schedule) {
                this._schedule = {};
            }

            this._schedule.executeNow = executeNow;

            return this;
        }

        /**
         * Sets the from attribute
         * @param {string} from 
         * @returns {RestRequest}
         */
    }, {
        key: 'withScheduleFrom',
        value: function withScheduleFrom(from) {
            _utilFormatsCheck_types2['default']._checkISODateTime(from, 'from');

            if (!this._schedule) {
                this._schedule = {};
            }

            this._schedule.from = from;

            return this;
        }

        /**
         * Sets the to attribute
         * @param {string} to 
         * @returns {RestRequest}
         */
    }, {
        key: 'withScheduleTo',
        value: function withScheduleTo(to) {
            _utilFormatsCheck_types2['default']._checkISODateTime(to, 'to');

            if (!this._schedule) {
                this._schedule = {};
            }

            this._schedule.to = to;

            return this;
        }

        /**
         * Sets the url for restRequest
         * @param {string} restRequestUrl
         * @return {RestRequest}
         */
    }, {
        key: 'withUrl',
        value: function withUrl(restRequestUrl) {
            _utilFormatsCheck_types2['default']._checkURL(restRequestUrl, 'restRequestUrl');

            if (!this._restRequest) {
                this._restRequest = {};
            }

            this._restRequest.url = restRequestUrl;
            return this;
        }

        /**
         * Sets the method for restRequest
         * @param {string} restRequestMethod
         * @return {RestRequest}
         */
    }, {
        key: 'withMethod',
        value: function withMethod(restRequestMethod) {
            _utilFormatsCheck_types2['default']._checkString(restRequestMethod, 'restRequestMethod');

            if (!this._restRequest) {
                this._restRequest = {};
            }

            this._restRequest.method = restRequestMethod;
            return this;
        }

        /**
         * Sets the header for restRequest
         * @param {string} restRequestHeaders
         * @return {RestRequest}
         */
    }, {
        key: 'withHeaders',
        value: function withHeaders(restRequestHeaders) {
            _utilFormatsCheck_types2['default']._checkObject(restRequestHeaders, 'restRequestHeaders');

            if (!this._restRequest) {
                this._restRequest = {};
            }

            this._restRequest.header = restRequestHeaders;
            return this;
        }

        /**
         * Sets the body for restRequest
         * @param {string} restRequestBody
         * @return {RestRequest}
         */
    }, {
        key: 'withBody',
        value: function withBody(restRequestBody) {
            _utilFormatsCheck_types2['default']._checkObject(restRequestBody, 'restRequestBody');

            if (!this._restRequest) {
                this._restRequest = {};
            }

            this._restRequest.body = restRequestBody;
            return this;
        }

        /**
         * Sets the sync response with selected timeout
         * @param {string} syncResponseTimeout
         * @return {RestRequest}
         */
    }, {
        key: 'withSyncResponseTimeout',
        value: function withSyncResponseTimeout(syncResponseTimeout) {
            _utilFormatsCheck_types2['default']._checkNumber(syncResponseTimeout, 'syncResponseTimeout');

            if (!this._response) {
                this._response = {};
            } else {
                if (this._response.async) {
                    throw new Error({ message: 'sync cannot be setted with async', parameter: 'sync' });
                }
            }

            this._response.sync = {
                timeout: syncResponseTimeout
            };
            return this;
        }

        /**
         * Sets the async response with selected timeout
         * @param {string} asyncResponseMaxTimeToWaitCallback
         * @return {RestRequest}
         */
    }, {
        key: 'withAsyncResponseMaxTimeToWaitCallback',
        value: function withAsyncResponseMaxTimeToWaitCallback(asyncResponseMaxTimeToWaitCallback) {
            _utilFormatsCheck_types2['default']._checkNumber(asyncResponseMaxTimeToWaitCallback, 'asyncResponseMaxTimeToWaitCallback');

            if (!this._response) {
                this._response = {};
            } else {
                if (this._response.sync) {
                    throw new Error({ message: 'async cannot be setted with sync', parameter: 'async' });
                }
            }

            this._response.async = {
                maxTimeToWaitCallback: asyncResponseMaxTimeToWaitCallback
            };
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._checkRequiredParameters();

            this._resource = 'organization/' + this._organization + '/restRequest';
            var restRequest = {
                identifier: this._identifier,
                schedule: this._schedule,
                restRequest: this._restRequest,
                response: this._response
            };
            return restRequest;
        }
    }, {
        key: 'toJson',
        value: function toJson() {
            return {
                identifier: this._identifier,
                schedule: this._schedule,
                restRequest: this._restRequest,
                response: this._response
            };
        }
    }, {
        key: 'update',
        value: function update() {
            throw new Error('Update is not allowed!!!');
        }
    }]);

    return RestRequest;
})(_provisionBaseProvision2['default']);

exports['default'] = RestRequest;
module.exports = exports['default'];
//# sourceMappingURL=RestRequest.js.map
