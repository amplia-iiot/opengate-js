'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var _utilDATE_FORMAT = require('./../../../../util/DATE_FORMAT');

/* Generic class that will be extends on ByYear, ByWeek, ByMonth*/

var ByGeneric = (function () {
    /**
     * @param {!BaseOperationBuilder} parent - this is a operationBaseBuilder.
     * @param {!Date} date - Date when operation will be executed
     * @param {string} periodicityName - Name associated to periodicity	
     * @param {!number or Date} end - When periodicity ends. By repetitions or by date	
     */

    function ByGeneric(parent, date, periodicityName, end, description) {
        _classCallCheck(this, ByGeneric);

        this._parent = parent;
        this._skeleton = {
            start: date,
            stop: end,
            name: periodicityName,
            description: description,
            repeating: {
                pattern: {
                    time: (0, _moment2['default'])(date).format(_utilDATE_FORMAT.TIME_FORMAT)
                }
            }
        };
        if (typeof end !== "undefined") {
            var _stop = undefined;
            if (typeof end === "number") {
                _stop = {
                    "executions": end
                };
            } else if (end.constructor === Date) {
                var startDate = (0, _moment2['default'])(date);
                var stopDate = (0, _moment2['default'])(end);
                if (_moment2['default'].max(startDate, stopDate) == startDate) {
                    throw new Error("Invalid stop date on executeEvery method. Start date must be earlier than stop date.");
                }
                _stop = {
                    "date": end
                };
            }
            this._skeleton.stop = _stop;
        }
    }

    _createClass(ByGeneric, [{
        key: '_create',
        value: function _create() {
            return (0, _merge2['default'])(true, this._skeleton);
        }
    }, {
        key: '_build',
        value: function _build() {
            this._parent._build.task = this._create();
            return this._parent;
        }
    }]);

    return ByGeneric;
})();

exports['default'] = ByGeneric;
module.exports = exports['default'];
//# sourceMappingURL=ByGeneric.js.map
