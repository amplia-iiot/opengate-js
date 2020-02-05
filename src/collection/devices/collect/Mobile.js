'use strict';


/**
 * This is a base object that allows the user to create a Datapoint.
 */
export default class Mobile {

    constructor() {
        this._mr = undefined;
        this._apn = undefined;
        this._bcch = undefined;
        this._cgi = undefined;
        this._cellId = undefined;
        this._lac = undefined;
        this._ratType = undefined;
        this._plmn = undefined;
        this._timingAdvance = undefined;
        this._signalStrength = undefined;
        this._signalStrengthMax = undefined;
        this._signalStrengthMin = undefined;
        this._signalQuality = undefined;
        this._signalQualityMax = undefined;
        this._signalQualityMin = undefined;
    }

     /**
     * Set the mr attribute
     * @param {string} mr - optionals field
     * @return {Mobile}
     */
    withMr(mr) {
        if ( typeof mr !== 'string' )
             throw new Error('Parameter mr usage must be String type ');
        this._mr = mr;
        return this;
    }

    /**
     * Set the apn attribute
     * @param {string} apn - optionals field
     * @return {Mobile}
     */
    withApn(apn) {
        if ( typeof apn !== 'string' )
             throw new Error('Parameter apn usage must be String type ');
        this._apn = apn;
        return this;
    }


    /**
     * Set the bcch attribute
     * @param {string} bcch - optionals field
     * @return {Mobile}
     */
    withBcch(bcch) {
        if ( typeof bcch !== 'string'  )
             throw new Error('Parameter bcch usage must be String type ');
        this._bcch = bcch;
        return this;
    }

    /**
     * Set the cgi attribute
     * @param {string} cgi - optionals field
     * @return {Mobile}
     */
    withCgi(cgi) {
        if ( typeof cgi !== 'string' )
             throw new Error('Parameter cgi usage must be String type ');
        this._cgi = cgi;
        return this;
    }

    /**
     * Set the cellId attribute
     * @param {string} cellId - optionals field
     * @return {Mobile}
     */
    withCellId(cellId) {
        if ( typeof cellId !== 'string' )
             throw new Error('Parameter cellId usage must be String type ');
        this._cellId = cellId;
        return this;
    }

    /**
     * Set the lac attribute
     * @param {string} lac - optionals field
     * @return {Mobile}
     */
    withLac(lac) {
        if ( typeof lac !== 'string'  )
             throw new Error('Parameter lac usage must be String type ');
        this._lac = lac;
        return this;
    }

    /**
     * Set the ratType attribute
     * @param {string} ratType - optionals field
     * @return {Mobile}
     */
    withRatType(ratType) {
        if ( typeof ratType !== 'string'  )
             throw new Error('Parameter ratType usage must be String type ');
        this._ratType = ratType;
        return this;
    }

         /**
     * Set the plmn attribute
     * @param {string} plmn - optionals field
     * @return {Mobile}
     */
    withPlmn(plmn) {
        if ( typeof plmn !== 'string'  )
             throw new Error('Parameter plmn usage must be String type ');
        this._plmn = plmn;
        return this;
    }

     /**
     * Set the timingAdvance attribute
     * @param {string} timingAdvance - optionals field
     * @return {Mobile}
     */
    withTimingAdvance(timingAdvance) {
        if ( typeof timingAdvance !== 'string'  )
             throw new Error('Parameter timingAdvance usage must be String type ');
        this._timingAdvance = timingAdvance;
        return this;
    }

    /**
     * Set the signalStrength attribute
     * @param {string} signalStrength - optionals field
     * @return {Mobile}
     */
    withSignalStrength(signalStrength) {
        if ( typeof signalStrength !== 'string'  )
             throw new Error('Parameter signalStrength usage must be String type ');
        this._signalStrength = signalStrength;
        return this;
    }

    /**
     * Set the signalStrengthMax attribute
     * @param {string} signalStrengthMax - optionals field
     * @return {Mobile}
     */
    withSignalStrengthMax(signalStrengthMax) {
        if ( typeof signalStrengthMax !== 'string' )
             throw new Error('Parameter signalStrengthMax usage must be String type ');
        this._signalStrengthMax = signalStrengthMax;
        return this;
    }

         /**
     * Set the signalStrengthMin attribute
     * @param {string} signalStrengthMin - optionals field
     * @return {Mobile}
     */
    withsignalStrengthMin(signalStrengthMin) {
        if ( typeof signalStrengthMin !== 'string')
             throw new Error('Parameter signalStrengthMin usage must be String type ');
        this._signalStrengthMin = signalStrengthMin;
        return this;
    }

         /**
     * Set the signalQuality attribute
     * @param {string} signalQuality - optionals field
     * @return {Mobile}
     */
    withsignalQuality(signalQuality) {
        if ( typeof signalQuality !== 'string'  )
             throw new Error('Parameter signalQuality usage must be String type ');
        this._signalQuality = signalQuality;
        return this;
    }

     /**
     * Set the signalQualityMax attribute
     * @param {string} signalQualityMax - optionals field
     * @return {Mobile}
     */
    withsignalQualityMax(signalQualityMax) {
        if ( typeof signalQualityMax !== 'string' )
             throw new Error('Parameter signalQualityMax usage must be String type ');
        this._signalQualityMax = signalQualityMax;
        return this;
    }

         /**
     * Set the signalQualityMin attribute
     * @param {string} signalQualityMin - optionals field
     * @return {Mobile}
     */
    withsignalQualityMin(signalQualityMin) {
        if ( typeof signalQualityMin !== 'string'  )
             throw new Error('Parameter signalQualityMin usage must be String type ');
        this._signalQualityMin = signalQualityMin;
        return this;
    }

    composeElement(){

        var mobile = {
            "mr": this._mr,
            "apn": this._apn,
            "bcch": this._bcch,
            "cgi": this._cgi,
            "cellId": this._cellId,
            "lac": this._lac,
            "ratType": this._ratType,
            "plmn": this._plmn,
            "timingAdvance": this._timingAdvance,
            "signalStrength": this._signalStrength,
            "signalStrengthMax": this._signalStrengthMax,
            "signalStrengthMin": this._signalStrengthMin,
            "signalQuality": this._signalQuality,
            "signalQualityMax": this._signalQualityMax,
            "signalQualityMin": this._signalQualityMin
        };
        return mobile;
    }

 
    
}
