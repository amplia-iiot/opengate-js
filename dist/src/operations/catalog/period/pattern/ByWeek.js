'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ByGeneric2 = require('./ByGeneric');

var _ByGeneric3 = _interopRequireDefault(_ByGeneric2);

var _DAYS_ENUM = require('./../DAYS_ENUM');

var ByWeek = (function (_ByGeneric) {
    _inherits(ByWeek, _ByGeneric);

    /**
     * @param {!BaseOperationBuilder} parent - this is a operationBaseBuilder.
     * @param {!Date} date - Date when operation will be executed
     * @param {string} periodicityName - Name associated to periodicity	
     * @param {!number or Date} end - When periodicity ends. By repetitions or by date		
     */

    function ByWeek(parent, date, name, end, description) {
        _classCallCheck(this, ByWeek);

        _get(Object.getPrototypeOf(ByWeek.prototype), 'constructor', this).call(this, parent, date, name, end, description);
    }

    /**
     * At this days will be executed the operation
     * @param {!array} days 
     * @throws {Error} throw error when days is not typeof Array
     * @throws {Error} throw error when any day is not found into DAYS_ENUM	
     * @return {BaseOperationBuilder}
     */

    _createClass(ByWeek, [{
        key: 'days',
        value: function days(_days) {
            if (typeof _days === "undefined" || _days.constructor !== Array) {
                throw new Error("Parameter days must be typeof Array");
            }
            if (_days.length === 0) {
                throw new Error("Parameter days must have at least one day");
            }
            var not_found = [];
            for (var i = 0; i < _days.length; i++) {
                var found = _DAYS_ENUM.DAYS_ENUM.find(function (day) {
                    return day == this;
                }, _days[i]);
                if (typeof found === "undefined") {
                    not_found.push(found);
                }
            }
            if (not_found.length !== 0) {
                throw new Error("Any day into parameter days is not allowed. Parameter value <'" + JSON.stringify(_days) + "'>, Months allowed <'" + JSON.stringify(_DAYS_ENUM.DAYS_ENUM) + "'>");
            }
            this._days = _days;
            return this._build();
        }
    }, {
        key: '_create',
        value: function _create() {
            var skeleton = _get(Object.getPrototypeOf(ByWeek.prototype), '_create', this).call(this);
            skeleton.repeating.pattern.weekly = {
                days: this._days
            };
            return skeleton;
        }
    }]);

    return ByWeek;
})(_ByGeneric3['default']);

exports['default'] = ByWeek;
module.exports = exports['default'];
//# sourceMappingURL=ByWeek.js.map
