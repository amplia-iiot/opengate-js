"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ByGeneric2 = require('./ByGeneric');

var _ByGeneric3 = _interopRequireDefault(_ByGeneric2);

var ByMonth = (function (_ByGeneric) {
    _inherits(ByMonth, _ByGeneric);

    /**
     * Constructor
     * @param {!BaseOperationBuilder} parent - this is a operationBaseBuilder.
     * @param {!Date} date - Date when operation will be executed
     * @param {string} periodicityName - Name associated to periodicity	
     * @param {!array} months - Months on will be execute the operation	
     * @param {!number or Date} end - When periodicity ends. By repetitions or by date		
     */

    function ByMonth(parent, date, periodicityName, months, end, description) {
        _classCallCheck(this, ByMonth);

        _get(Object.getPrototypeOf(ByMonth.prototype), "constructor", this).call(this, parent, date, periodicityName, end, description);
        this._months = months;
        var _task = parent._task;
        if (_task) {
            var pattern = _task.schedule.repeating.pattern;
            if (pattern) {
                var monthly = pattern.monthly;
                if (monthly) {
                    this._day = monthly.day;
                    _get(Object.getPrototypeOf(ByMonth.prototype), "_build", this).call(this);
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

    _createClass(ByMonth, [{
        key: "day",
        value: function day(_day) {
            if (typeof _day !== "number") {
                throw new Error("Parameter day must be typeof number");
            }
            if (_day > 31 || _day < 1) {
                throw new Error("Parameter day must be greater than 1 and less than 31");
            }
            this._day = _day;
            return this._build();
        }
    }, {
        key: "_create",
        value: function _create() {
            var skeleton = _get(Object.getPrototypeOf(ByMonth.prototype), "_create", this).call(this);
            skeleton.repeating.pattern.monthly = {
                day: this._day,
                months: this._months
            };
            return skeleton;
        }
    }]);

    return ByMonth;
})(_ByGeneric3["default"]);

exports["default"] = ByMonth;
module.exports = exports["default"];
//# sourceMappingURL=ByMonth.js.map
