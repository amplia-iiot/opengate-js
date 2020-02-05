'use strict';

import {
    POWER_SUPPLY_SOURCE_ENUM
} from './enum/POWER_SUPPLY_SOURCE_ENUM';
import {
    BATTERY_CHARGE_STATUS_ENUM
} from './enum/BATTERY_CHARGE_STATUS_ENUM';
import {
    BATTERY_CHARGE_LEVEL_STATUS_ENUM
} from './enum/BATTERY_CHARGE_LEVEL_STATUS_ENUM';
import {
    LEVEL_TREND_ENUM
} from './enum/LEVEL_TREND_ENUM';

/**
 * This is a base object that allows the user to create a Datapoint.
 */
export default class PowerSupply {

    constructor() {
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
    withSource(source) {
        if (typeof source !== 'string' || source.length === 0)
            throw new Error('Parameter source must be string type and cannot be empty');
        this._source = this._checkValues(source, POWER_SUPPLY_SOURCE_ENUM);
        return this;
    }

    /**
     * Set the status attribute
     * @param {string} status - optionals field
     * @return {PowerSupply}
     */
    withStatus(status) {
        if (typeof status !== 'string' || status.length === 0)
            throw new Error('Parameter status must be string type and cannot be empty');
        this._status = this._checkValues(status, BATTERY_CHARGE_STATUS_ENUM);
        return this;
    }

    /**
     * Set the trend attribute
     * @param {string} trend - optionals field
     * @return {PowerSupply}
     */
    withBatteryChargeLevelTrend(trend) {
        if (typeof trend !== 'string' || trend.length === 0)
            throw new Error('Parameter trend must be string type and cannot be empty');
        this._trend = this._checkValues(trend, LEVEL_TREND_ENUM);
        return this;
    }

    /**
     * Set the battery status attribute
     * @param {string} status - optionals field
     * @return {PowerSupply}
     */
    withBatteryChargeLevelStatus(status) {
        if (typeof status !== 'string' || status.length === 0)
            throw new Error('Parameter Battery Charge Level Status must be string type and cannot be empty');
        this._batteryStatus = this._checkValues(status, BATTERY_CHARGE_LEVEL_STATUS_ENUM);
        return this;
    }

    /**
     * Set the BatteryChargeLevel percentage attribute
     * @param {string} percentage - optionals field
     * @return {PowerSupply}
     */
    withBatteryChargeLevelPercentage(percentage) {
        if (typeof percentage !== 'string' || percentage.length === 0)
            throw new Error('Parameter percentage must be string type and cannot be empty');
        this._percentage = percentage;
        return this;
    }

    /**
     * Set the OutageDate attribute
     * @param {string} outageDate - optionals field
     * @return {PowerSupply}
     */
    withOutageDate(outageDate) {
         if (!this._isValidDate(outageDate))
            throw new Error('The outageDate parameter has a wrong format. Example of rigth format is 2015-07-16T19:20:30+01:00');
        this._outageDate = outageDate;
        return this;
    }

    /**
     * Set the duration attribute
     * @param {number} duration - optionals field
     * @return {PowerSupply}
     */
    withOutageDuration(duration) {
        if (typeof duration !== 'number' || duration.length === 0)
            throw new Error('Parameter duration must be number type and cannot be empty');
        this._outageDuration = duration;
        return this;
    }

    _checkValues(value, enumName) {
        let not_found = [];
        let found = enumName.find(function(value) {
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

        _isValidDate(str) {
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
        if ((m[1].length < 4) || m[1] < minYear || m[1] > thisYear) {
            console.log(3);
            ret = false;
        }
        // MONTH CHECK          
        if ((m[2].length < 2) || m[2] < 1 || m[2] > 12) {
            console.log(4);
            ret = false;
        }
        // DAY CHECK
        if ((m[3].length < 2) || m[3] < 1 || m[3] > 31) {
            console.log(5);
            ret = false;
        }

        return ret;
    }



    composeElement() {

        var powerSupply = {
            "source": this._source,
            "status": this._status,
            "batteryChargeLevel": {
                "trend": this._trend,
                "status": this._batteryStatus,
                "percentage": this._percentage,
            }
        };
        if(this._outageDate !== undefined || this._outageDuration !== undefined ){
            powerSupply.outage = {
                "timestamp": this._outageDate,
                "duration": this._outageDuration
            };
        }
        return powerSupply;
    }



}
