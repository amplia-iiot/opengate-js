'use strict';


/**
 * This is a base object that allows the user to create a Datapoint.
 */
export default class Location {

    constructor() {
        this._timestamp = undefined;
        this._latitude = undefined;
        this._longitude = undefined;
    }

     /**
     * Set the date attribute
     * @param {string} date - optionals field
     * @return {Location}
     */
    withDateLocation(date) {
        if ( typeof date !== 'string' || date.length === 0 )
             throw new Error('Parameter date must be String type and cannot be empty');
        if (this._location === undefined) {
            this._location = {};
        }
        this._location.date = date;
        return this;
    }

    /**
     * Set the latitude attribute
     * @param {number} latitude - optionals field
     * @return {Location}
     */
    withLatitude(latitude) {
        if ( typeof latitude !== 'number' || latitude.length === 0 )
             throw new Error('Parameter latitude must be number type and cannot be empty');
         if (this._location === undefined) {
            this._location = {};
        }
        this._location.latitude = latitude;
        return this;
    }

    /**
     * Set the longitude attribute
     * @param {number} longitude - optionals field
     * @return {Location}
     */
    withLongitude(longitude) {
         if ( typeof longitude !== 'number' || longitude.length === 0 )
             throw new Error('Parameter longitude must be number type and cannot be empty');
         if (this._location === undefined) {
            this._location = {};
        }
        this._location.longitude = longitude;
        return this;
    }

    composeElement(){
        if(this._longitude === undefined && this._latitude ===  undefined){
            throw new Error('The parameters latitude and longitude are required in location element');
        }
        var location = {
            "timestamp": this._date,
            "coordinates": {
                "latitude": this._latitude,
                "longitude": this._longitude
            }
        };
        return location;
    }

 
    
}
