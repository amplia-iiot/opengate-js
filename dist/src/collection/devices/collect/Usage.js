'use strict';

/**
 * This is a base object that allows the user to create a Datapoint.
 */
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Usage = (function () {
    function Usage() {
        _classCallCheck(this, Usage);

        this._usageUnit = undefined;
        this._current = undefined;
        this._average = undefined;
        this._maximum = undefined;
        this._minimum = undefined;
    }

    /**
    * Set the unit attribute
    * @param {string} unit - optionals field
    * @return {Usage}
    */

    _createClass(Usage, [{
        key: 'withUsageUnit',
        value: function withUsageUnit(unit) {
            if (typeof unit !== 'string' || unit.length === 0) throw new Error('Parameter unit usage must be String type and cannot be empty');
            this._usageUnit = unit;
            return this;
        }

        /**
         * Set the current attribute
         * @param {string} current - optionals field
         * @return {Usage}
         */
    }, {
        key: 'withCurrent',
        value: function withCurrent(current) {
            if (typeof current !== 'string' || current.length === 0) throw new Error('Parameter current must be string type and cannot be empty');
            this._current = current;
            return this;
        }

        /**
         * Set the average attribute
         * @param {string} average - optionals field
         * @return {Usage}
         */
    }, {
        key: 'withAverage',
        value: function withAverage(average) {
            if (typeof average !== 'string' || average.length === 0) throw new Error('Parameter average must be string type and cannot be empty');
            this._average = average;
            return this;
        }

        /**
         * Set the maximum  attribute
         * @param {string} maximum  - optionals field
         * @return {Usage}
         */
    }, {
        key: 'withMaximum',
        value: function withMaximum(maximum) {
            if (typeof maximum !== 'string' || maximum.length === 0) throw new Error('Parameter maximum  must be string type and cannot be empty');
            this._maximum = maximum;
            return this;
        }

        /**
         * Set the minimum  attribute
         * @param {string} minimum  - optionals field
         * @return {Usage}
         */
    }, {
        key: 'withMinimum',
        value: function withMinimum(minimum) {
            if (typeof minimum !== 'string' || minimum.length === 0) throw new Error('Parameter minimum  must be string type and cannot be empty');
            this._minimum = minimum;
            return this;
        }
    }, {
        key: 'composeElement',
        value: function composeElement() {

            var usage = {
                "unit": this._usageUnit,
                "current": this._current,
                "average": this._average,
                "maximum": this._maximum,
                "minimum": this._minimum
            };
            return usage;
        }
    }]);

    return Usage;
})();

exports['default'] = Usage;
module.exports = exports['default'];
//# sourceMappingURL=Usage.js.map
