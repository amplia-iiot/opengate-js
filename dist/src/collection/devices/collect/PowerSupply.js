'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _enumPOWER_SUPPLY_SOURCE_ENUM = require('./enum/POWER_SUPPLY_SOURCE_ENUM');

var _enumBATTERY_CHARGE_STATUS_ENUM = require('./enum/BATTERY_CHARGE_STATUS_ENUM');

var _enumBATTERY_CHARGE_LEVEL_STATUS_ENUM = require('./enum/BATTERY_CHARGE_LEVEL_STATUS_ENUM');

var _enumLEVEL_TREND_ENUM = require('./enum/LEVEL_TREND_ENUM');

/**
 * This is a base object that allows the user to create a Datapoint.
 */

var PowerSupply = (function () {
    function PowerSupply() {
        _classCallCheck(this, PowerSupply);

        this._source = undefined;
        this._status = undefined;
        this._trend = undefined;
        this._batteryStatus = undefined;
        this._percentage = undefined;
        this._outageDate = undefined;
        this._outageDuration = undefined;
    }

    /**
     * Set the source attribute
     * @param {string} source - optionals field
     * @return {PowerSupply}
     */

    _createClass(PowerSupply, [{
        key: 'withSource',
        value: function withSource(source) {
            if (typeof source !== 'string' || source.length === 0) throw new Error('Parameter source must be string type and cannot be empty');
            this._source = this._checkValues(source, _enumPOWER_SUPPLY_SOURCE_ENUM.POWER_SUPPLY_SOURCE_ENUM);
            return this;
        }

        /**
         * Set the status attribute
         * @param {string} status - optionals field
         * @return {PowerSupply}
         */
    }, {
        key: 'withStatus',
        value: function withStatus(status) {
            if (typeof status !== 'string' || status.length === 0) throw new Error('Parameter status must be string type and cannot be empty');
            this._status = this._checkValues(status, _enumBATTERY_CHARGE_STATUS_ENUM.BATTERY_CHARGE_STATUS_ENUM);
            return this;
        }

        /**
         * Set the trend attribute
         * @param {string} trend - optionals field
         * @return {PowerSupply}
         */
    }, {
        key: 'withBatteryChargeLevelTrend',
        value: function withBatteryChargeLevelTrend(trend) {
            if (typeof trend !== 'string' || trend.length === 0) throw new Error('Parameter trend must be string type and cannot be empty');
            this._trend = this._checkValues(trend, _enumLEVEL_TREND_ENUM.LEVEL_TREND_ENUM);
            return this;
        }

        /**
         * Set the battery status attribute
         * @param {string} status - optionals field
         * @return {PowerSupply}
         */
    }, {
        key: 'withBatteryChargeLevelStatus',
        value: function withBatteryChargeLevelStatus(status) {
            if (typeof status !== 'string' || status.length === 0) throw new Error('Parameter Battery Charge Level Status must be string type and cannot be empty');
            this._batteryStatus = this._checkValues(status, _enumBATTERY_CHARGE_LEVEL_STATUS_ENUM.BATTERY_CHARGE_LEVEL_STATUS_ENUM);
            return this;
        }

        /**
         * Set the BatteryChargeLevel percentage attribute
         * @param {string} percentage - optionals field
         * @return {PowerSupply}
         */
    }, {
        key: 'withBatteryChargeLevelPercentage',
        value: function withBatteryChargeLevelPercentage(percentage) {
            if (typeof percentage !== 'string' || percentage.length === 0) throw new Error('Parameter percentage must be string type and cannot be empty');
            this._percentage = percentage;
            return this;
        }

        /**
         * Set the OutageDate attribute
         * @param {string} outageDate - optionals field
         * @return {PowerSupply}
         */
    }, {
        key: 'withOutageDate',
        value: function withOutageDate(outageDate) {
            if (!this._isValidDate(outageDate)) throw new Error('The outageDate parameter has a wrong format. Example of rigth format is 2015-07-16T19:20:30+01:00');
            this._outageDate = outageDate;
            return this;
        }

        /**
         * Set the duration attribute
         * @param {number} duration - optionals field
         * @return {PowerSupply}
         */
    }, {
        key: 'withOutageDuration',
        value: function withOutageDuration(duration) {
            if (typeof duration !== 'number' || duration.length === 0) throw new Error('Parameter duration must be number type and cannot be empty');
            this._outageDuration = duration;
            return this;
        }
    }, {
        key: '_checkValues',
        value: function _checkValues(value, enumName) {
            var not_found = [];
            var found = enumName.find(function (value) {
                return value == this;
            }, value);

            if (typeof found === "undefined") {
                not_found.push(value);
            }
            if (not_found.length !== 0) {
                console.warn("Parameter value not allowed <'" + JSON.stringify(not_found) + "'>, allowed <'" + JSON.stringify(enumName) + "'>");
            }
            return value;
        }
    }, {
        key: '_isValidDate',
        value: function _isValidDate(str) {
            //2015-07-16T19:20:30+01:00
            //YYYY-MM-DDThh:mm:ss+
            if (str === "" || str === null) {
                return false;
            }

            // m[1] is year 'YYYY' * m[2] is month 'MM' * m[3] is day 'DD'                 

            var m = str.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\+(\d{2}):(\d{2})/);

            // STR IS NOT FIT m IS NOT OBJECT
            if (m === null || typeof m !== 'object') {
                return false;
            }

            // CHECK m TYPE
            if (typeof m !== 'object' && m !== null && m.size !== 3) {
                console.log(2);
                return false;
            }

            var ret = true; //RETURN VALUE                     
            var thisYear = new Date().getFullYear(); //YEAR NOW
            var minYear = 1999; //MIN YEAR

            // YEAR CHECK
            if (m[1].length < 4 || m[1] < minYear || m[1] > thisYear) {
                console.log(3);
                ret = false;
            }
            // MONTH CHECK         
            if (m[2].length < 2 || m[2] < 1 || m[2] > 12) {
                console.log(4);
                ret = false;
            }
            // DAY CHECK
            if (m[3].length < 2 || m[3] < 1 || m[3] > 31) {
                console.log(5);
                ret = false;
            }

            return ret;
        }
    }, {
        key: 'composeElement',
        value: function composeElement() {

            var powerSupply = {
                "source": this._source,
                "status": this._status,
                "batteryChargeLevel": {
                    "trend": this._trend,
                    "status": this._batteryStatus,
                    "percentage": this._percentage
                }
            };
            if (this._outageDate !== undefined || this._outageDuration !== undefined) {
                powerSupply.outage = {
                    "timestamp": this._outageDate,
                    "duration": this._outageDuration
                };
            }
            return powerSupply;
        }
    }]);

    return PowerSupply;
})();

exports['default'] = PowerSupply;
module.exports = exports['default'];
//# sourceMappingURL=PowerSupply.js.map
