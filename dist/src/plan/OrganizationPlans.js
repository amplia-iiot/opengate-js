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

var _URL_ENUM = require('./URL_ENUM');

var _PERIOD_ENUM = require('./PERIOD_ENUM');

var _UNIT_ENUM = require('./UNIT_ENUM');

var _utilFormatsCheck_types = require('../util/formats/check_types');

var _utilFormatsCheck_types2 = _interopRequireDefault(_utilFormatsCheck_types);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

/**
 * This is a base object that contains all you can do about Organizations plan.
 */

var OrganizationPlans = (function (_BaseProvision) {
    _inherits(OrganizationPlans, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function OrganizationPlans(ogapi, organization) {
        _classCallCheck(this, OrganizationPlans);

        _get(Object.getPrototypeOf(OrganizationPlans.prototype), 'constructor', this).call(this, ogapi, "/organizations", undefined, ['name', 'maxStorageLifeTime', 'maxDeviceAmount']);
        _utilFormatsCheck_types2['default']._checkStringAndLength(organization, 50, 'organization');
        this._organization = organization;
        this._resource = this._resource + '/' + this._organization + "/" + _URL_ENUM.ORGANIZATION_PLANS;
    }

    /**
     * Set the identifier attribute
     * @param {string} identifier - required field
     * @return {OrganizationPlans}
     */

    _createClass(OrganizationPlans, [{
        key: 'withIdentifier',
        value: function withIdentifier(identifier) {
            _utilFormatsCheck_types2['default']._checkStringAndLength(identifier, 50, 'identifier');
            this._identifier = identifier;
            return this;
        }

        /**
         * Set the name attribute
         * @param {string} name - required field
         * @return {OrganizationPlans}
         */
    }, {
        key: 'withName',
        value: function withName(name) {
            this._checkName(name);
            this._name = name;
            return this;
        }

        /**
         * Set the flowRate attribute
         * @param {object} flowRate - {value: number, unit: [SECONDS, MINUTES, HOURS, DAYS, MONTHS, YEARS]} 
         * @return {OrganizationPlans}
         */
    }, {
        key: 'withFlowRate',
        value: function withFlowRate(flowRate) {
            this._checkFlowRate(flowRate);
            this._flowRate = flowRate;
            return this;
        }

        /**
         * Set the maxDeviceAmount attribute
         * @param {object} maxDeviceAmount - optional and greater than 0
         * @return {OrganizationPlans}
         */
    }, {
        key: 'withMaxDeviceAmount',
        value: function withMaxDeviceAmount(maxDeviceAmount) {
            this._checkMaxDeviceAmount(maxDeviceAmount);
            this._maxDeviceAmount = maxDeviceAmount;
            return this;
        }

        /**
         * Set the maxStorageLifeTime attribute
         * @param {object} maxStorageLifeTime - required field: {total: number, period: [SECONDS, MINUTES, HOURS, DAYS, MONTHS, YEARS]}
         * @return {OrganizationPlans}
         */
    }, {
        key: 'withMaxStorageLifeTime',
        value: function withMaxStorageLifeTime(maxStorageLifeTime) {
            this._checkMaxStorageLifeTime(maxStorageLifeTime);
            this._maxStorageLifeTime = maxStorageLifeTime;
            return this;
        }
    }, {
        key: '_checkName',
        value: function _checkName(name) {
            _utilFormatsCheck_types2['default']._checkStringAndLength(name, 50, 'name');
        }
    }, {
        key: '_checkFlowRate',
        value: function _checkFlowRate(flowRate) {
            if (!_lodash2['default'].isNil(flowRate)) {
                _utilFormatsCheck_types2['default']._checkObject(flowRate, 'flowRate');
                _utilFormatsCheck_types2['default']._checkNumber(flowRate.value, 'flowRate.value');
                _utilFormatsCheck_types2['default']._checkType(flowRate.unit, _UNIT_ENUM.UNIT);
            }
        }
    }, {
        key: '_checkMaxDeviceAmount',
        value: function _checkMaxDeviceAmount(maxDeviceAmount) {
            _utilFormatsCheck_types2['default']._checkNumber(maxDeviceAmount, 'maxDeviceAmount');
            if (maxDeviceAmount < 0) {
                throw new Error("Parameter maxDeviceAmount must be greater or equal than 0");
            }
        }
    }, {
        key: '_checkMaxStorageLifeTime',
        value: function _checkMaxStorageLifeTime(maxStorageLifeTime) {
            _utilFormatsCheck_types2['default']._checkObject(maxStorageLifeTime, 'maxStorageLifeTime');
            _utilFormatsCheck_types2['default']._checkNumber(maxStorageLifeTime.total, 'maxStorageLifeTime.total');
            if (maxStorageLifeTime.total < 0) {
                throw new Error("Parameter maxStorageLifeTime.total must be greater or equal than 0");
            }
            _utilFormatsCheck_types2['default']._checkType(maxStorageLifeTime.period, _PERIOD_ENUM.PERIOD);
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._checkRequiredParameters();
            this._checkName(this._name);
            this._checkFlowRate(this._flowRate);
            this._checkMaxDeviceAmount(this._maxDeviceAmount);
            this._checkMaxStorageLifeTime(this._maxStorageLifeTime);
            var updateData = {
                name: this._name,
                flowRate: !_lodash2['default'].isNil(this._flowRate) && this._flowRate || undefined,
                maxDeviceAmount: this._maxDeviceAmount,
                maxStorageLifeTime: this._maxStorageLifeTime
            };

            return updateData;
        }
    }, {
        key: '_composeUpdateElement',
        value: function _composeUpdateElement() {
            return this._composeElement();
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            return this._resource + "/" + this._identifier;
        }
    }]);

    return OrganizationPlans;
})(_provisionBaseProvision2['default']);

exports['default'] = OrganizationPlans;
module.exports = exports['default'];
//# sourceMappingURL=OrganizationPlans.js.map
