'use strict';

import BaseProvision from '../provision/BaseProvision';

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
            throw new Error("OGAPI_STRING_PARAMETER_MAX_LENGTH_50");
        this._name = name;
        return this;
    }

    /**
     * Set the parent domain
     * @param {string} domain
     * @return {Organizations}
     */
    withDomain(domain) {
            if (typeof domain !== 'string' || domain.length > 50)
                throw new Error("OGAPI_STRING_PARAMETER_MAX_LENGTH_50");
            this._domain = domain;
            return this;
        }
        /**
         * Set the description attribute
         * @param {string} description 
         * @return {Organizations}
         */
    withDescription(description) {
        if (typeof description !== 'string' || description.length > 250)
            throw new Error("OGAPI_STRING_PARAMETER_MAX_LENGTH_250");
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
            throw new Error("OGAPI_STRING_PARAMETER");
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
            throw new Error("OGAPI_STRING_PARAMETER");
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
            throw new Error("OGAPI_STRING_PARAMETER");
        this._timeZone = timeZone;
        return this;
    }

    /**
     * Set the plan attribute
     * @param {string} plan
     * @return {Organizations}
     */
    withPlan(plan) {
        if (typeof plan !== 'string' || plan.length === 0)
            throw new Error("OGAPI_STRING_PARAMETER");
        this._plan = plan;
        return this;
    }

    /**
     * Set the onlyAssignedDomainCertificates attribute
     * @param {boolean} onlyDomainCerts - required field
     * @return {Organizations}
     */
    withOnlyAssignedDomainCertificates(onlyDomainCerts) {
        if (typeof onlyDomainCerts !== 'boolean' || (onlyDomainCerts !== true && onlyDomainCerts !== false))
            throw new Error('Parameter OnlyAssignedDomainCertificates must be a boolean and cannot be empty');
        this._onlyDomainCerts = onlyDomainCerts;
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

    /**
     * Sets the auth security configuration
     * @param {object} auth 
     * @return {Organizations} 
     */
    withAuth(auth) {
        if (!auth || !auth.type)
            throw new Error('Auth cannot be empty and must have type at least');

        if (!this._security) {
            this._security = {}
        }

        this._security.auth = auth
    }

    /**
     * Sets the password poliicy configuration
     * @param {object} withPasswordPolicy
     * @return {Organizations} 
     */
    withPasswordPolicy(passPolicy) {
        if (!passPolicy)
            throw new Error('Password policy cannot be empty');


        if (!this._security) {
            this._security = {}
        }
    
        this._security.policies = {
            password: {
                checkStrength: !!passPolicy.checkStrength, 
                expirationPeriod: passPolicy.expirationPeriod || 0  
            }
        }
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
                'plan': this._plan || undefined,
                'countryCode': this._countryCode || undefined,
                'langCode': this._langCode || undefined,
                'timezone': this._timeZone || undefined,
                'onlyAssignedDomainCertificates': (typeof this._onlyDomainCerts !== 'boolean' ? this._onlyDomainCerts : undefined)
            }
        };

        if (this._domain) {
            updateData.organization.domain = this._domain;
        }

        if (_mapDefault.zoom || _mapDefault.location) {
            updateData.organization.mapDefault = _mapDefault;
        }

        if (this._security) {
            updateData.organization.security = this._security
        }

        return updateData;
    }

    _composeUpdateElement() {
        if (this._domain) {
            throw new Error('The domain parameter is not allowed in the update');
        }
        let organization = this._composeElement();
        delete organization.organization.name;
        return organization;
    }

    _buildURL() {
        if (this._name === undefined)
            throw new Error('Parameter name must be defined');
        let url = this._resource + "/" + this._name;

        return url;

    }

}