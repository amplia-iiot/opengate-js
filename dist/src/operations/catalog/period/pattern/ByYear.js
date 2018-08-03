'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ByGeneric2 = require('./ByGeneric');

var _ByGeneric3 = _interopRequireDefault(_ByGeneric2);

var _MONTHS_ENUM = require('./../MONTHS_ENUM');

var ByYear = (function (_ByGeneric) {
    _inherits(ByYear, _ByGeneric);

    /**
     * @param {!BaseOperationBuilder} parent - this is a operationBaseBuilder.
     * @param {!Date} date - Date when operation will be executed
     * @param {string} periodicityName - Name associated to periodicity	
     * @param {!number or Date} end - When periodicity ends. By repetitions or by date		
     */

    function ByYear(parent, date, name, end) {
        _classCallCheck(this, ByYear);

        _get(Object.getPrototypeOf(ByYear.prototype), 'constructor', this).call(this, parent, date, name, end);
        var _task = parent._task;
        if (_task) {
            var pattern = _task.schedule.repeating.pattern;
            if (pattern) {
                //console.log("PATTERN: " + JSON.stringify(pattern));
                var yearly = pattern.yearly;
                if (yearly) {
                    this._day = yearly.day;
                    this._month = yearly.month;
                    _get(Object.getPrototypeOf(ByYear.prototype), '_build', this).call(this);
                }
            }
        }
    }

    /**
     * At this day will be executed the operation
     * @param {!number} day 
     * @throws {Error} throw error when day is not typeof number
     * @throws {Error} throw error when day is > 31 and < 1
     * @return {BaseOperationBuilder}
     */

    _createClass(ByYear, [{
        key: 'day',
        value: function day(_day) {
            if (typeof _day !== "number") {
                if (this._day) {
                    month = this._day;
                } else throw new Error("Parameter day must be typeof number");
            }
            if (_day > 31 || _day < 1) {
                throw new Error("Parameter day must be greater than 1 and less than 31");
            }
            this._day = _day;
            if (typeof this._month === "undefined") {
                return this;
            }
            if (this._parent._task) {
                this._build();
                return this;
            }
            return this._build();
        }

        /**
         * At this month will be executed the operation
         * @param {!string} month 
         * @throws {Error} throw error when month is not typeof string
         * @throws {Error} throw error when month is not found into MONTHS_ENUM		
         * @return {BaseOperationBuilder|ByYear}
         */
    }, {
        key: 'month',
        value: (function (_month) {
            function month(_x) {
                return _month.apply(this, arguments);
            }

            month.toString = function () {
                return _month.toString();
            };

            return month;
        })(function (month) {
            if (typeof month !== "string") {
                if (this._month) {
                    month = this._month;
                } else throw new Error("OGAPI_PARAMETER_MONTH_MUST_BE_STRING");
            }
            var found = _MONTHS_ENUM.MONTHS_ENUM.find(function (month) {
                return month == this;
            }, month);
            if (typeof found === "undefined") {
                throw new Error("Any month into parameter months is not allowed. Parameter value <'" + month + "'>, Months allowed <'" + JSON.stringify(_MONTHS_ENUM.MONTHS_ENUM) + "'>");
            }
            this._month = month;
            if (typeof this._day === "undefined") {
                return this;
            }
            if (this._parent._task) {
                this._build();
                return this;
            }
            return this._build();
        })
    }, {
        key: '_create',
        value: function _create() {
            var skeleton = _get(Object.getPrototypeOf(ByYear.prototype), '_create', this).call(this);
            skeleton.repeating.pattern.yearly = {
                day: this._day,
                month: this._month
            };
            return skeleton;
        }
    }]);

    return ByYear;
})(_ByGeneric3['default']);

exports['default'] = ByYear;
module.exports = exports['default'];
//# sourceMappingURL=ByYear.js.map
