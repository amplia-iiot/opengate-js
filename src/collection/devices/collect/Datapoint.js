'use strict';



/**
 * This is a base object that allows the user to create a Datapoint.
 */
export default class Datapoint {

    constructor() {
        this._from = undefined;
        this._at = undefined;
        this._value = undefined;
        this._tags = undefined;
    }

    /**
     * Set the from attribute
     * @param {number} from - optional field
     * @return {Datapoint}
     */
    withFrom(from) {
        if (from !== null) {
            if (typeof from !== 'number')
                throw new Error('OGAPI_MUST_BE_NUMBER_PARAMETER');
            this._from = from;
        }
        return this;
    }

    /**
     * Set the at attribute
     * @param {number} at - optional field
     * @return {Datapoint}
     */
    withAt(at) {
        if (at !== null) {
            if (typeof at !== 'number')
                throw new Error('OGAPI_MUST_BE_NUMBER_PARAMETER');
            this._at = at;
        }
        return this;
    }

    /**
     * Set the value attribute
     * @param {string} value - required field 
     * @return {Datapoint}
     */
    withValue(value) {
        if (value === undefined || value.length === 0)
            throw new Error('OGAPI_DEFINED_PARAMETER');
        this._value = value;
        return this;
    }

    /**
     * Set the tags attribute
     * @param {string} tags 
     * @return {Datapoint}
     */
    withTags(tags) {
        if (tags !== null) {
            if (tags.constructor !== Array || tags.length === 0)
                throw new Error({ message: 'OGAPI_ARRAY_PARAMETER', parameter: 'tags' });
            this._tags = tags;
        }
        return this;
    }

    composeElement() {
        if (this._value === undefined || this._value.length === 0) {
            throw new Error({ message: 'OGAPI_DEFINED_PARAMETER', parameter: 'value' });
        }
        var datapoint = {
            'from': this._from || undefined,
            'at': this._at || undefined,
            'value': this._value,
            'tags': this._tags || undefined

        };
        return datapoint;
    }



}