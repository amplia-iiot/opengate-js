'use strict';

import q from 'q';
import {   SOFTWARE_TYPE_ENUM
} from './enum/SOFTWARE_TYPE_ENUM';


/**
 * This is a base object that allows the user to create a Datapoint.
 */
export default class Software {

    constructor() {
        this._name = undefined;
        this._type = undefined;
        this._version = undefined;
        this._date = undefined;
    }

    /**
     * Set the name attribute
     * @param {string} name 
     * @return {Software}
     */
    withName(name) {
        if (typeof name !== 'string' || name.length === 0)
            throw new Error('Parameter name must be a string and cannot be empty');
        this._name = name;
        return this;
    }

    /**
     * Set the type attribute
     * @param {string} type 
     * @return {Software}
     */
    withType(type) {
        if (typeof type !== 'string' || type.length === 0)
            throw new Error('Parameter type must be a string and cannot be empty');
        this._type = this._checkValues(type, SOFTWARE_TYPE_ENUM);
        return this;
    }

    /**
     * Set the version attribute
     * @param {string} version 
     * @return {Software}
     */
    withVersion(version) {
        if (typeof version !== 'string' || version.length === 0)
            throw new Error('Parameter version must be a string and cannot be empty');
        this._version = version;
        return this;
    }


     /**
     * Set the date  attribute
     * @param {string} date  
     * @return {Software}
     */
    withDate(date) {
        if (typeof date  !== 'string'  || date .length === 0  )
            throw new Error('Parameter date must be a string and cannot be empty');
        this._date = date ;
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


    composeElement(){

        var software = {
            'name': this._name,
            'type': this._type,
            'version': this._version,
            'date': this._date
        };
        return software;
    }

 
    
}
