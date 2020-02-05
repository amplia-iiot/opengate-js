'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

/**
 * Defines the builder to configure a period of operation. With this builder you can select how repeat the operation. By days, hours or minutes.
 */

var ExecuteEachBuilder = (function () {
    /**
     * @param {!BaseOperationBuilder} parent - this is a operationBaseBuilder.
     * @param {!Date} date - Date when operation will be executed
     * @param {string} periodicityName - Name associated to periodicity	
     * @param {!number or Date} end - When periodicity ends. By repetitions or by date	
     */

    function ExecuteEachBuilder(parent, date, periodicityName, end, description) {
        _classCallCheck(this, ExecuteEachBuilder);

        this._parent = parent;
        this._skeleton = {
            start: date,
            stop: end,
            name: periodicityName,
            description: description,
            repeating: {
                period: {
                    each: undefined,
                    unit: undefined
                }
            }
        };
        if (typeof end !== "undefined") {
            var _stop = undefined;
            if (typeof end === "number") {
                if (end <= 0) {
                    throw new Error("Invalid stop value. Number of repetitions must be greater than 0.");
                }
                _stop = {
                    "executions": end
                };
            } else if (end.constructor === Date) {
                var startDate = (0, _moment2['default'])(date);
                var stopDate = (0, _moment2['default'])(end);
                if (_moment2['default'].max(startDate, stopDate) == startDate) {
                    throw new Error("Invalid stop date on executeEach method. Start date must be earlier than stop date.");
                }
                _stop = {
                    "date": end
                };
            }
            this._skeleton.stop = _stop;
        }
    }

    /**
     * Set a difference of minutes in each repetition
     * @param {number} minutes
     * @return {BaseOperationBuilder}
     */

    _createClass(ExecuteEachBuilder, [{
        key: 'minutes',
        value: function minutes(_minutes) {
            var type = "MINUTES";
            if (typeof _minutes !== "number") {
                throw new Error("Parameter minutes must be typeof number");
            }
            return this._addPeriod(_minutes, type);
        }

        /**
         * Set a difference of hours in each repetition
         * @param {number} hours
         * @return {BaseOperationBuilder}
         */
    }, {
        key: 'hours',
        value: function hours(_hours) {
            var type = "HOURS";
            if (typeof _hours !== "number") {
                throw new Error("Parameter hours must be typeof number");
            }
            return this._addPeriod(_hours, type);
        }

        /**
         * Set a difference of days in each repetition
         * @param {number} days
         * @return {BaseOperationBuilder}
         */
    }, {
        key: 'days',
        value: function days(_days) {
            var type = "DAYS";
            if (typeof _days !== "number") {
                throw new Error("Parameter days must be typeof number");
            }
            return this._addPeriod(_days, type);
        }
    }, {
        key: '_addPeriod',
        value: function _addPeriod(num, type) {
            var skeleton = (0, _merge2['default'])(true, this._skeleton);
            skeleton.repeating.period.each = num;
            skeleton.repeating.period.unit = type;
            this._parent._build.task = skeleton;
            return this._parent;
        }
    }]);

    return ExecuteEachBuilder;
})();

exports['default'] = ExecuteEachBuilder;
module.exports = exports['default'];
//# sourceMappingURL=ExecuteEachBuilder.js.map
