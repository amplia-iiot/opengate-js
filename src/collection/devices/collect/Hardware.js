'use strict';



/**
 * This is a base object that allows the user to create a Datapoint.
 */
export default class Hardware {

    constructor() {
        this._serialnumber = undefined;
        this._manufacturerName = undefined;
        this._manufacturerOui = undefined;
        this._modelName = undefined;
        this._modelVersion = undefined;
        this._clockDate = undefined;
    }

    /**
     * Set the serialnumber attribute
     * @param {string} serialnumber 
     * @return {Hardware}
     */
    withSerialnumber(serialnumber) {
        if (typeof serialnumber !== 'string' || serialnumber.length === 0)
            throw new Error('Parameter serial number must be a string and cannot be empty');
        this._serialnumber = serialnumber;
        return this;
    }

    /**
     * Set the manufacturerName attribute
     * @param {string} manufacturerName 
     * @return {Hardware}
     */
    withManufacturerName(manufacturerName) {
        if (typeof manufacturerName !== 'string' || manufacturerName.length === 0)
            throw new Error('Parameter manufacturer Name must be a string and cannot be empty');
        this._manufacturerName = manufacturerName;
        return this;
    }

    /**
     * Set the manufacturerOui attribute
     * @param {string} manufacturerOui 
     * @return {Hardware}
     */
    withManufacturerOui(manufacturerOui) {
        if (typeof manufacturerOui !== 'string' || manufacturerOui.length === 0)
            throw new Error('Parameter manufacturer code must be a string and cannot be empty');
        this._manufacturerOui = manufacturerOui;
        return this;
    }

    /**
     * Set the modelName  attribute
     * @param {string} modelName  
     * @return {Hardware}
     */
    withModelName(modelName) {
        if (typeof modelName !== 'string' || modelName.length === 0)
            throw new Error('Parameter model Name must be a string and cannot be empty');
        this._modelName = modelName;
        return this;
    }

    /**
     * Set the modelVersion  attribute
     * @param {string} modelVersion  
     * @return {Hardware}
     */
    withModelVersion(modelVersion) {
        if (typeof modelVersion !== 'string' || modelVersion.length === 0)
            throw new Error('Parameter model Version must be a string and cannot be empty');
        this._modelVersion = modelVersion;
        return this;
    }

    /**
     * Set the clockDate  attribute
     * @param {string} clockDate  
     * @return {Hardware}
     */

    //Pendiente comprobar el formato de la fecha
    withClockDate(clockDate) {
        if (!this._isValidDate(clockDate))
            throw new Error('The clockDate parameter has a wrong format. Example of rigth format is 2015-07-16T19:20:30+01:00');
        this._clockDate = clockDate;

        return this;
    }

    _isValidDate(str) {
        //YYYY-MM-DDThh:mm:ssTZD
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
            return false;
        }

        var ret = true; //RETURN VALUE                      
        var thisYear = new Date().getFullYear(); //YEAR NOW
        var minYear = 1999; //MIN YEAR

        // YEAR CHECK
        if ((m[1].length < 4) || m[1] < minYear || m[1] > thisYear) {
            ret = false;
        }
        // MONTH CHECK          
        if ((m[2].length < 2) || m[2] < 1 || m[2] > 12) {
            ret = false;
        }
        // DAY CHECK
        if ((m[3].length < 2) || m[3] < 1 || m[3] > 31) {
            ret = false;
        }

        return ret;
    }


    composeElement() {

        var hardware = {
            'serialnumber': this._serialnumber,
            'manufacturer': {
                'name': this._manufacturerName,
                'oui': this._manufacturerOui || ""
            },
            'model': {
                'name': this._modelName || "",
                'version': this._modelVersion || ""
            },
            'clockDate': this._clockDate
        };
        return hardware;
    }



}