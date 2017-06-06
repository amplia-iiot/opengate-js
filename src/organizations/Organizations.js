'use strict';

import BaseProvision from '../provision/BaseProvision'

/**
 * This is a base object that contains all you can do about Organizations.
 */
export default class Organizations extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi, url) {
        super(ogapi, "/organizations" + (typeof url === "undefined" ? "" : url));
        this._name = undefined;
        this._description = undefined;
        this._countryCode = undefined;
        this._langCode = undefined;
        this._timeZone = undefined;
        this._zoom = undefined;
        this._location = undefined;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Organizations}
     */
    withName(name) {
        if (typeof name !== 'string' || name.length === 0 || name.length > 50)
            throw new Error('Parameter name must be a string, cannot be empty and has a maximum length of 50');
        this._name = name;
        return this;
    }

    /**
     * Set the domains array
     * @param {string[]} domains - required field
     * @return {Organizations}
     */
    withDomains(domains) {
            if (domains.constructor !== Array || domains.length === 0)
                throw new Error('Parameter domains must be a string array, cannot be empty');
            this._domains = domains;
            return this;
        }
        /**
         * Set the description attribute
         * @param {string} description 
         * @return {Organizations}
         */
    withDescription(description) {
        if (typeof description !== 'string' || description.length > 250)
            throw new Error('Parameter description must be a string and has a maximum length of 250');
        this._description = description;
        return this;
    }

    /**
     * Set the country code attribute
     * @param {string} countryCode
     * @return {Organizations}
     */
    withCountryCode(countryCode) {
        if (typeof countryCode !== 'string' || countryCode.length === 0)
            throw new Error('Country code must be a string and cannot be empty');
        this._countryCode = countryCode.toUpperCase();
        return this;
    }

    /**
     * Set the lang code attribute
     * @param {string} langCode
     * @return {Organizations}
     */
    withLangCode(langCode) {
        if (typeof langCode !== 'string' || langCode.length === 0)
            throw new Error('Lang code must be a string and cannot be empty');
        this._langCode = langCode.toLowerCase();
        return this;
    }

    /**
     * Set the time zone attribute
     * @param {string} timeZone
     * @return {Organizations}
     */
    withTimeZone(timeZone) {
        if (typeof timeZone !== 'string' || timeZone.length === 0)
            throw new Error('Time Zone must be a string and cannot be empty');
        this._timeZone = timeZone;
        return this;
    }

    /**
     * Sets the map zoom attribute
     * @param {number} zoom
     * @return {Organizations} 
     */
    withZoom(zoom) {
        zoom = zoom * 1;
        if (typeof zoom !== "number" || zoom < 0 || zoom > 19) {
            throw new Error('Parameter zoom must be a number between 0 and 19');
        }
        this._zoom = zoom;
        return this;
    }

    /**
     * Sets the map location attribute
     * @param {number} latitude
     * @param {number} longitude
     * @return {Organizations} 
     */
    withLocation(latitude, longitude) {
        latitude = latitude * 1;
        longitude = longitude * 1;

        if (typeof latitude !== "number" || typeof longitude !== "number") {
            throw new Error('Latitude and longitude parameters must be numbers');
        }

        if (latitude < -90 || latitude > 90) {
            throw new Error('Parameter latitude value must be between -90 and 90');
        }

        if (longitude < -180 || longitude > 180) {
            throw new Error('Parameter longitude value must be between -180 and 180');
        }

        this._location = {
            'latitude': latitude,
            'longitude': longitude
        };

        return this;
    }


    _composeElement() {
        if (this._name === undefined || this._langCode === undefined || this._countryCode === undefined)
            throw new Error('Parameters name, country code and lang code must be defined');

        let _mapDefault = {};
        if (this._zoom != undefined) {
            _mapDefault.zoom = this._zoom;
        }

        if (this._location != undefined) {
            _mapDefault.location = this._location;
        }

        let updateData = {
            'organization': {
                'name': this._name || undefined,
                'description': this._description || undefined,
                'countryCode': this._countryCode || undefined,
                'langCode': this._langCode || undefined,
                'timezone': this._timeZone || undefined
            }
        };

        if (this._domains) {
            updateData.organization.domains = this._domains;
        }

        if (_mapDefault.zoom || _mapDefault.location) {
            updateData.organization['mapDefault'] = _mapDefault;
        }

        return updateData;
    }

    _composeUpdateElement() {
        let organization = this._composeElement();
        delete organization.organization.name;
        return organization;
    }

    _buildURL() {
        if (this._name === undefined)
            throw new Error('Parameters name must be defined');
        let url = this._resource + "/" + this._name;

        return url;

    }
}