'use strict';

import SearchBuilder from './SearchBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';

const BASE_URL = '/certificates';
/**
 * Defined a search over Bundles    
 * @example ogapi.bundlesSearchBuilder()
 */
export default class CertificatesSearchBuilder extends SearchBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, BASE_URL));
        this._url = BASE_URL;
        this._fetch = false;
        this._assignable = false;
    }

    /** 
     *  The search result will have all certificates which can be assignable to some device
     *  ogapi.certificatesSearchBuilder().assignable()
     * @return {CertificatesSearchBuilder} 
     */
    assignable() {
        this._assignable = true;
        return this;
    }

    /**
     * The search result will have all certificates which can be administered by the user
     * @example
     *  ogapi.certificatesSearchBuilder().administrable()
     * @return {CertificatesSearchBuilder} 
     **/
    administrable() {
        this._assignable = false;
        return this;
    }

    /**
     * Set fecth value
     * @example
     *  ogapi.certificatesSearchBuilder().withFetch(true)
     * @param {!flag} flag
     * @throws {Error} throw error when flag is not a number
     * @return {CertificatesSearchBuilder} 
     */
    withFetch(flag) {
        if (flag === true || flag === false) {
            this._fetch = flag;
        } else {
            throw new Error('Flag fecth incorrect');
        }
        return this;
    }


    _buildUrl() {
        let url = this._url;
        let params = undefined;
        if (this._fetch === true) {
            params = "?fetch=1";
        }
        if (this._assignable === true) {
            if (typeof params === "undefined") {
                params = "?";
            } else {
                params = params + "&";
            }
            params = params + "visibility=assignable";
        }
        if (typeof params === "string") {
            url = url + params;
        }
        return url;
    }

}