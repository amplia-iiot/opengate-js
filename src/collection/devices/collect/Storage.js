'use strict';

import Usage from './Usage';


/**
 * This is a base object that allows the user to create a Datapoint.
 */
export default class Storage extends Usage{

    constructor() {
        super();
        this._unit = undefined;
        this._total = undefined;
    }

     /**
     * Set the unit attribute
     * @param {string} unit - optionals field
     * @return {Storage}
     */
    withUnit(unit) {
        if ( typeof unit !== 'string' || unit.length === 0 )
             throw new Error('Parameter unit must be String type and cannot be empty');
        this._unit = unit;
        return this;
    }

    /**
     * Set the total attribute
     * @param {string} total - optionals field
     * @return {Usage}
     */
    withTotal(total) {
        if ( typeof total !== 'string' || total.length === 0 )
             throw new Error('Parameter total must be string type and cannot be empty');
        this._total = total;
        return this;
    }


    composeElement(){
        var usage = super.composeElement();

        var storage = {
            "unit": this._unit,
            "total": this._total,
            "usage": usage
                    
        };

        return storage;
    }

 
    
}
