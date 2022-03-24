'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Usage2 = require('./Usage');

var _Usage3 = _interopRequireDefault(_Usage2);

/**
 * This is a base object that allows the user to create a Datapoint.
 */

var Storage = (function (_Usage) {
    _inherits(Storage, _Usage);

    function Storage() {
        _classCallCheck(this, Storage);

        _get(Object.getPrototypeOf(Storage.prototype), 'constructor', this).call(this);
        this._unit = undefined;
        this._total = undefined;
    }

    /**
    * Set the unit attribute
    * @param {string} unit - optionals field
    * @return {Storage}
    */

    _createClass(Storage, [{
        key: 'withUnit',
        value: function withUnit(unit) {
            if (typeof unit !== 'string' || unit.length === 0) throw new Error('Parameter unit must be String type and cannot be empty');
            this._unit = unit;
            return this;
        }

        /**
         * Set the total attribute
         * @param {string} total - optionals field
         * @return {Usage}
         */
    }, {
        key: 'withTotal',
        value: function withTotal(total) {
            if (typeof total !== 'string' || total.length === 0) throw new Error('Parameter total must be string type and cannot be empty');
            this._total = total;
            return this;
        }
    }, {
        key: 'composeElement',
        value: function composeElement() {
            var usage = _get(Object.getPrototypeOf(Storage.prototype), 'composeElement', this).call(this);

            var storage = {
                "unit": this._unit,
                "total": this._total,
                "usage": usage

            };

            return storage;
        }
    }]);

    return Storage;
})(_Usage3['default']);

exports['default'] = Storage;
module.exports = exports['default'];
//# sourceMappingURL=Storage.js.map
