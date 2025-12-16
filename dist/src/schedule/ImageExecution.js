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

var ImageExecution = (function (_BaseProvision) {
    _inherits(ImageExecution, _BaseProvision);

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function ImageExecution(ogapi) {
        _classCallCheck(this, ImageExecution);

        _get(Object.getPrototypeOf(ImageExecution.prototype), 'constructor', this).call(this, ogapi, "/organization", undefined, ["identifier", "organization", "schedule", "imageExecution", "maxTimeToWaitCallback"], 'scheduler');
        this._ogapi = ogapi;
    }

    _createClass(ImageExecution, [{
        key: '_buildURL',
        value: function _buildURL() {
            _utilFormatsCheck_types2['default']._checkString(this._organization, 'organization');
            _utilFormatsCheck_types2['default']._checkString(this._identifier, 'identifier');

            return 'organization/' + this._organization + '/imageExecution/' + this._identifier;
        }

        /**
         * Sets the identifier attribute
         * @param {string} identifier
         * @return {ImageExecution}
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
         * @return {ImageExecution}
         */
    }, {
        key: 'withScheduleCronExpression',
        value: function withScheduleCronExpression(cronExpression) {
            _utilFormatsCheck_types2['default']._checkString(cronExpression, 'cronExpression');

            if (!this._schedule) {
                this._schedule = {};
            }

            this._schedule.expression = cronExpression;
            return this;
        }

        /**
         * Sets the isImmediateExecution attribute for schedule
         * @param {boolean} isImmediateExecution
         * @return {ImageExecution}
         */
    }, {
        key: 'withScheduleImmediateExecution',
        value: function withScheduleImmediateExecution(isImmediateExecution) {
            _utilFormatsCheck_types2['default']._checkBoolean(isImmediateExecution, 'isImmediateExecution');

            if (!this._schedule) {
                this._schedule = {};
            }

            this._schedule.isImmediateExecution = isImmediateExecution;

            return this;
        }

        /**
         * Sets the name for imageExecution
         * @param {string} imageExecutionName
         * @return {ImageExecution}
         */
    }, {
        key: 'withName',
        value: function withName(imageExecutionName) {
            _utilFormatsCheck_types2['default']._checkString(imageExecutionName, 'imageExecutionName');

            if (!this._imageExecution) {
                this._imageExecution = {};
            }

            this._imageExecution.name = imageExecutionName;
            return this;
        }

        /**
         * Sets the tag for imageExecution
         * @param {string} imageExecutionTag
         * @return {ImageExecution}
         */
    }, {
        key: 'withTag',
        value: function withTag(imageExecutionTag) {
            _utilFormatsCheck_types2['default']._checkString(imageExecutionTag, 'imageExecutionTag');

            if (!this._imageExecution) {
                this._imageExecution = {};
            }

            this._imageExecution.tag = imageExecutionTag;
            return this;
        }

        /**
         * Sets the env vars for imageExecution
         * @param {object} imageExecutionEnvVars
         * @return {ImageExecution}
         */
    }, {
        key: 'withEnvVars',
        value: function withEnvVars(imageExecutionEnvVars) {
            _utilFormatsCheck_types2['default']._checkObject(imageExecutionEnvVars, 'imageExecutionEnvVars');

            if (!this._imageExecution) {
                this._imageExecution = {};
            }

            this._imageExecution.env = imageExecutionEnvVars;
            return this;
        }

        /**
         * Sets the env from for imageExecution
         * @param {array} imageExecutionEnvFrom
         * @return {ImageExecution}
         */
    }, {
        key: 'withEnvFrom',
        value: function withEnvFrom(imageExecutionEnvFrom) {
            _utilFormatsCheck_types2['default']._checkArray(imageExecutionEnvFrom, 'imageExecutionEnvFrom');

            if (!this._imageExecution) {
                this._imageExecution = {};
            }

            this._imageExecution.envFrom = imageExecutionEnvFrom;
            return this;
        }

        /**
         * Sets the execution timeout for imageExecution
         * @param {string} timeout
         * @return {ImageExecution}
         */
    }, {
        key: 'withTimeout',
        value: function withTimeout(timeout) {
            _utilFormatsCheck_types2['default']._checkNumber(timeout, 'timeout');

            if (!this._imageExecution) {
                this._imageExecution = {};
            }

            this._imageExecution.timeout = timeout;

            return this;
        }

        /**
         * Sets the async response with selected timeout
         * @param {string} asyncResponseMaxTimeToWaitCallback
         * @return {ImageExecution}
         */
    }, {
        key: 'withMaxTimeToWaitCallback',
        value: function withMaxTimeToWaitCallback(asyncResponseMaxTimeToWaitCallback) {
            _utilFormatsCheck_types2['default']._checkNumber(asyncResponseMaxTimeToWaitCallback, 'asyncResponseMaxTimeToWaitCallback');

            this._maxTimeToWaitCallback = asyncResponseMaxTimeToWaitCallback;

            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._checkRequiredParameters();

            this._resource = 'organization/' + this._organization + '/imageExecution';
            var imageExecution = {
                identifier: this._identifier,
                schedule: this._schedule,
                imageExecution: this._imageExecution,
                maxTimeToWaitCallback: this._maxTimeToWaitCallback
            };
            return imageExecution;
        }
    }, {
        key: 'toJson',
        value: function toJson() {
            return this._composeElement();
        }
    }, {
        key: 'update',
        value: function update() {
            throw new Error('Update is not allowed!!!');
        }
    }]);

    return ImageExecution;
})(_provisionBaseProvision2['default']);

exports['default'] = ImageExecution;
module.exports = exports['default'];
//# sourceMappingURL=ImageExecution.js.map
