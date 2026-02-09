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

var _ImageExecution = require('./ImageExecution');

var _ImageExecution2 = _interopRequireDefault(_ImageExecution);

var _RestRequest = require('./RestRequest');

var _RestRequest2 = _interopRequireDefault(_RestRequest);

/**
 * This is a base object that contains all you can do about Bundles.
 */

var Pipeline = (function (_BaseProvision) {
    _inherits(Pipeline, _BaseProvision);

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function Pipeline(ogapi) {
        _classCallCheck(this, Pipeline);

        _get(Object.getPrototypeOf(Pipeline.prototype), 'constructor', this).call(this, ogapi, "/organization", undefined, ["identifier", "organization", "schedule", "pipeline"], 'scheduler');
        this._ogapi = ogapi;
    }

    _createClass(Pipeline, [{
        key: '_buildURL',
        value: function _buildURL() {
            _utilFormatsCheck_types2['default']._checkString(this._organization, 'organization');
            _utilFormatsCheck_types2['default']._checkString(this._identifier, 'identifier');

            return 'organization/' + this._organization + '/pipeline/' + this._identifier;
        }

        /**
         * Sets the identifier attribute
         * @param {string} identifier
         * @return {Pipeline}
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
         * @return {Pipeline}
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
         * @return {Pipeline}
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
         * @return {Pipeline}
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
         * @return {Pipeline}
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
         * @returns {Pipeline}
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
         * @returns {Pipeline}
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
         * Adds a rest request to the pipeline
         * @param {RestRequest} restRequest
         * @return {Pipeline}
         */
    }, {
        key: 'addRestResquest',
        value: function addRestResquest(restRequest) {
            if (!this._pipeline) {
                this._pipeline = [];
            }

            this._pipeline.push(restRequest);
            return this;
        }

        /**
         * Adds an Image Execution to the pipeline
         * @param {ImageExecution} imageExecution
         * @return {Pipeline}
         */
    }, {
        key: 'addImageExecution',
        value: function addImageExecution(imageExecution) {
            if (!this._pipeline) {
                this._pipeline = [];
            }

            this._pipeline.push(imageExecution);
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._checkRequiredParameters();

            this._resource = 'organization/' + this._organization + '/pipeline';
            var pipelineSchedule = {
                identifier: this._identifier,
                schedule: this._schedule,
                pipeline: this._pipeline
            };
            return pipelineSchedule;
        }
    }, {
        key: 'toJson',
        value: function toJson() {
            return {
                identifier: this._identifier,
                schedule: this._schedule,
                pipeline: this._pipeline
            };
        }
    }, {
        key: 'update',
        value: function update() {
            throw new Error('Update is not allowed!!!');
        }
    }]);

    return Pipeline;
})(_provisionBaseProvision2['default']);

exports['default'] = Pipeline;
module.exports = exports['default'];
//# sourceMappingURL=Pipeline.js.map
