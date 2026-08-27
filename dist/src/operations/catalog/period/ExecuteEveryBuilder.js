'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _MONTHS_ENUM = require('./MONTHS_ENUM');

var _patternByWeek = require('./pattern/ByWeek');

var _patternByWeek2 = _interopRequireDefault(_patternByWeek);

var _patternByYear = require('./pattern/ByYear');

var _patternByYear2 = _interopRequireDefault(_patternByYear);

var _patternByMonth = require('./pattern/ByMonth');

var _patternByMonth2 = _interopRequireDefault(_patternByMonth);

var _patternByGeneric = require('./pattern/ByGeneric');

var _patternByGeneric2 = _interopRequireDefault(_patternByGeneric);

/**
 * Defines the builder to configure a period of operation. By this builder you can select period by day, week, month, year.
 */

var ExecuteEveryBuilder = (function () {
    /**
     * Constructor
     * @param {!BaseOperationBuilder} parent - this is a operationBaseBuilder.
     * @param {!Date} date - Date when operation will be executed
     * @param {string} periodicityName - Name associated to periodicity	
     */

    function ExecuteEveryBuilder(parent, date, periodicityName, end, description) {
        _classCallCheck(this, ExecuteEveryBuilder);

        this.year = new _patternByYear2['default'](parent, date, periodicityName, end, description);
        this.week = new _patternByWeek2['default'](parent, date, periodicityName, end, description);
        this._day = new _patternByGeneric2['default'](parent, date, periodicityName, end, description);
        this._date = date;
        this._end = end;
        this._parent = parent;
        this._periodicityName = periodicityName;
        this._description = description;
    }

    /**
     * Every day at time defined will be the pattern
     * @return {BaseOperationBuilder}
     */

    _createClass(ExecuteEveryBuilder, [{
        key: 'day',
        value: function day() {
            return this._day._build();
        }

        /**
         * Each month at time and day defined will be the pattern
         * @param {array} months - months on will be execute the operation
         * @throws {Error} throw error when months is not typeof Array
         * @throws {Error} throw error when any month is not found into MONTHS_ENUM
         * @return {ByMonth}
         */
    }, {
        key: 'month',
        value: function month(months) {
            var _task = this._parent._task;
            if (typeof months === "undefined" || months.constructor !== Array) {
                var error = true;
                if (_task) {
                    var pattern = _task.schedule.repeating.pattern;
                    if (pattern) {
                        var monthly = pattern.monthly;
                        if (monthly) {
                            error = false;
                            months = monthly.months;
                        }
                    }
                }
                if (error) throw new Error("Parameter months must be typeof Array");
            }
            if (months.length === 0) {
                throw new Error("Parameter months must have at least one month");
            }
            var not_found = [];
            for (var i = 0; i < months.length; i++) {
                var found = _MONTHS_ENUM.MONTHS_ENUM.find(function (month) {
                    return month == this;
                }, months[i]);
                if (typeof found === "undefined") {
                    not_found.push(found);
                }
            }
            if (not_found.length !== 0) {
                throw new Error("Any month into parameter months is not allowed. Parameter value <'" + JSON.stringify(not_found) + "'>, Months allowed <'" + JSON.stringify(_MONTHS_ENUM.MONTHS_ENUM) + "'>");
            }
            return new _patternByMonth2['default'](this._parent, this._date, this._periodicityName, months, this._end, this._description);
        }
    }]);

    return ExecuteEveryBuilder;
})();

exports['default'] = ExecuteEveryBuilder;
module.exports = exports['default'];
//# sourceMappingURL=ExecuteEveryBuilder.js.map
