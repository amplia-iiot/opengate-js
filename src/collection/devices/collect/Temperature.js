'use strict';

import {
    TEMPERATURE_STATUS_ENUM
} from './enum/TEMPERATURE_STATUS_ENUM';

import {
    LEVEL_TREND_ENUM
} from './enum/LEVEL_TREND_ENUM';


/**
 * This is a base object that allows the user to create a Datapoint.
 */
export default class Temperature {

    constructor() {
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
    withCurrentTemperature(currentTemperature) {
        if (typeof currentTemperature !== 'string' || currentTemperature.length === 0)
            throw new Error('Parameter currentTemperature must be string type and cannot be empty');
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
    withUnitTemperature(unitTemperature) {
        if (typeof unitTemperature !== 'string' || unitTemperature.length === 0)
            throw new Error('Parameter unitTemperature must be string type and cannot be empty');
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
    withStatusTemperature(statusTemperature) {
        if (typeof statusTemperature !== 'string' || statusTemperature.length === 0)
            throw new Error('Parameter statusTemperature must be string type and cannot be empty');
        if (this._temperature === undefined) {
            this._temperature = {};
        }
        this._temperature.status = this._checkValues(statusTemperature, TEMPERATURE_STATUS_ENUM);
        return this;
    }

    /**
     * Set the trendTemperature attribute
     * @param {string} trendTemperature - optionals field
     * @return {Event}
     */
    withTrendTemperature(trendTemperature) {
        if (typeof trendTemperature !== 'string' || trendTemperature.length === 0)
            throw new Error('Parameter trendTemperature must be string type and cannot be empty');
        if (this._temperature === undefined) {
            this._temperature = {};
        }
        this._temperature.trend = this._checkValues(trendTemperature, LEVEL_TREND_ENUM);
        return this;
    }

    /**
     * Set the averageTemperature attribute
     * @param {string} averageTemperature - optionals field
     * @return {Event}
     */
    withTemperatureAverage(averageTemperature) {
        if (typeof averageTemperature !== 'string' || averageTemperature.length === 0)
            throw new Error('Parameter averageTemperature must be string type and cannot be empty');
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
    withMinimumTemperature(minimumTemperature) {
        if (typeof minimumTemperature !== 'string' || minimumTemperature.length === 0)
            throw new Error('Parameter minimumTemperature must be string type and cannot be empty');
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
    withMaximumTemperature(maximumTemperature) {
        if (typeof maximumTemperature !== 'string' || maximumTemperature.length === 0)
            throw new Error('Parameter maximumTemperature must be string type and cannot be empty');
        if (this._temperature === undefined) {
            this._temperature = {};
        }
        this._maximum = maximumTemperature;
        return this;
    }


    composeElement() {

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



}
