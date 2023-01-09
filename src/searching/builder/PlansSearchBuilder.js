'use strict';

import SearchWithSummaryBuilder from './SearchWithSummaryBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';

const BASE_URL = '/catalog/plans/organization';
/**
 * Defined a search over PlansSearchBuilder	
 * @example ogapi.plansSearchBuilder()
 */
export default class PlansSearchBuilder extends SearchWithSummaryBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, BASE_URL));
        this._url = BASE_URL;
    }

    /**
     * Sets de domain name to search
     *
     * @example
     *  ogapi.plansSearchBuilder().withDomain('myDomain').build()
     * @param {!string} domainName - domain name
     * @throws {Error} throw error when domainName is not typeof string
     * @return {PlansSearchBuilder} 
     */
    withDomain(domainName) {
        if (typeof domainName !== 'string') {
            throw new Error('Parameter domainName must be a string');
        }
        this._domainName = domainName;

        return this;
    }

    _buildUrl() {
        if (this._domainName) {
            this._url = BASE_URL + '?domainName=' + this._domainName;
        } else {
            throw new Error('Parameter domainName must be defined');
        }
        return super._buildUrl();
    }
}