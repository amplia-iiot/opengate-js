'use strict';


/**
 * This is a base object that allows the user to create a Datapoint.
 */
export default class Usage {

    constructor() {
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
    withUsageUnit(unit) {
        if ( typeof unit !== 'string' || unit.length === 0 )
             throw new Error('Parameter unit usage must be String type and cannot be empty');
        this._usageUnit = unit;
        return this;
    }

    /**
     * Set the current attribute
     * @param {string} current - optionals field
     * @return {Usage}
     */
    withCurrent(current) {
        if ( typeof current !== 'string' || current.length === 0 )
             throw new Error('Parameter current must be string type and cannot be empty');
        this._current = current;
        return this;
    }

    /**
     * Set the average attribute
     * @param {string} average - optionals field
     * @return {Usage}
     */
    withAverage(average) {
         if ( typeof average !== 'string' || average.length === 0 )
             throw new Error('Parameter average must be string type and cannot be empty');
        this._average = average;
        return this;
    }

    /**
     * Set the maximum  attribute
     * @param {string} maximum  - optionals field
     * @return {Usage}
     */
    withMaximum (maximum ) {
         if ( typeof maximum  !== 'string' || maximum.length === 0 )
             throw new Error('Parameter maximum  must be string type and cannot be empty');
        this._maximum  = maximum ;
        return this;
    }

    /**
     * Set the minimum  attribute
     * @param {string} minimum  - optionals field
     * @return {Usage}
     */
    withMinimum (minimum ) {
         if ( typeof minimum  !== 'string' || minimum.length === 0 )
             throw new Error('Parameter minimum  must be string type and cannot be empty');
        this._minimum  = minimum ;
        return this;
    }

    composeElement(){

        var usage = {
            "unit": this._usageUnit,
            "current": this._current,
            "average": this._average,
            "maximum": this._maximum,
            "minimum": this._minimum
        };
        return usage;
    }

 
    
}
