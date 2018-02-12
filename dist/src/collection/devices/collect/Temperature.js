'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _enumTEMPERATURE_STATUS_ENUM = require('./enum/TEMPERATURE_STATUS_ENUM');

var _enumLEVEL_TREND_ENUM = require('./enum/LEVEL_TREND_ENUM');

/**
 * This is a base object that allows the user to create a Datapoint.
 */

var Temperature = (function () {
    function Temperature() {
        _classCallCheck(this, Temperature);

        this._unit = undefined;
        this._current = undefined;
        this._status = undefined;
        this._trend = undefined;
        this._average = undefined;
        this._maximum = undefined;
        this._minimum = undefined;
    }

    /**
     * Set the currentTemperature attribute
     * @param {string} currentTemperature - optionals field
     * @return {Event}
     */

    _createClass(Temperature, [{
        key: 'withCurrentTemperature',
        value: function withCurrentTemperature(currentTemperature) {
            if (typeof currentTemperature !== 'string' || currentTemperature.length === 0) throw new Error('Parameter currentTemperature must be string type and cannot be empty');
            if (this._temperature === undefined) {
                this._temperature = {};
            }
            this._temperature.current = currentTemperature;
            return this;
        }

        /**
         * Set the unitTemperature attribute
         * @param {string} unitTemperature - optionals field
         * @return {Event}
         */
    }, {
        key: 'withUnitTemperature',
        value: function withUnitTemperature(unitTemperature) {
            if (typeof unitTemperature !== 'string' || unitTemperature.length === 0) throw new Error('Parameter unitTemperature must be string type and cannot be empty');
            if (this._temperature === undefined) {
                this._temperature = {};
            }
            this._temperature.unit = unitTemperature;
            return this;
        }

        /**
         * Set the statusTemperature attribute
         * @param {string} statusTemperature - optionals field
         * @return {Event}
         */
    }, {
        key: 'withStatusTemperature',
        value: function withStatusTemperature(statusTemperature) {
            if (typeof statusTemperature !== 'string' || statusTemperature.length === 0) throw new Error('Parameter statusTemperature must be string type and cannot be empty');
            if (this._temperature === undefined) {
                this._temperature = {};
            }
            this._temperature.status = this._checkValues(statusTemperature, _enumTEMPERATURE_STATUS_ENUM.TEMPERATURE_STATUS_ENUM);
            return this;
        }

        /**
         * Set the trendTemperature attribute
         * @param {string} trendTemperature - optionals field
         * @return {Event}
         */
    }, {
        key: 'withTrendTemperature',
        value: function withTrendTemperature(trendTemperature) {
            if (typeof trendTemperature !== 'string' || trendTemperature.length === 0) throw new Error('Parameter trendTemperature must be string type and cannot be empty');
            if (this._temperature === undefined) {
                this._temperature = {};
            }
            this._temperature.trend = this._checkValues(trendTemperature, _enumLEVEL_TREND_ENUM.LEVEL_TREND_ENUM);
            return this;
        }

        /**
         * Set the averageTemperature attribute
         * @param {string} averageTemperature - optionals field
         * @return {Event}
         */
    }, {
        key: 'withTemperatureAverage',
        value: function withTemperatureAverage(averageTemperature) {
            if (typeof averageTemperature !== 'string' || averageTemperature.length === 0) throw new Error('Parameter averageTemperature must be string type and cannot be empty');
            if (this._temperature === undefined) {
                this._temperature = {};
            }
            this._temperature.average = averageTemperature;
            return this;
        }

        /**
         * Set the minimumTemperature attribute
         * @param {string} minimumTemperature - optionals field
         * @return {Event}
         */
    }, {
        key: 'withMinimumTemperature',
        value: function withMinimumTemperature(minimumTemperature) {
            if (typeof minimumTemperature !== 'string' || minimumTemperature.length === 0) throw new Error('Parameter minimumTemperature must be string type and cannot be empty');
            if (this._temperature === undefined) {
                this._temperature = {};
            }
            this._temperature.minimum = minimumTemperature;
            return this;
        }

        /**
         * Set the maximum attribute
         * @param {string} maximumTemperature - optionals field
         * @return {Event}
         */
    }, {
        key: 'withMaximumTemperature',
        value: function withMaximumTemperature(maximumTemperature) {
            if (typeof maximumTemperature !== 'string' || maximumTemperature.length === 0) throw new Error('Parameter maximumTemperature must be string type and cannot be empty');
            if (this._temperature === undefined) {
                this._temperature = {};
            }
            this._maximum = maximumTemperature;
            return this;
        }
    }, {
        key: 'composeElement',
        value: function composeElement() {

            var temperature = {
                "unit": this._unit,
                "current": this._current,
                "status": this._status,
                "trend": this._trend,
                "average": this._average,
                "maximum": this._maximum,
                "minimum": this._minimum
            };
            return temperature;
        }
    }]);

    return Temperature;
})();

exports['default'] = Temperature;
module.exports = exports['default'];
//# sourceMappingURL=Temperature.js.map
