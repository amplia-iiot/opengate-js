'use strict';

import SearchWithSummaryBuilder from './SearchWithSummaryBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';

const BASE_URL = '/domains';
/**
 * Defined a search over Domains	
 * @example ogapi.domainsSearchBuilder()
 */
export default class DomainsSearchBuilder extends SearchWithSummaryBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, BASE_URL));
        this._url = BASE_URL;
        this._summary = false;
    }

    /**
     * The response will only have a summary information 
     * @example
     *	ogapi.domainsSearchBuilder().summary() 
     * @return {SearchWithSummaryBuilder} 
     */
    summary() {
        this._summary = true;
        return this;
    }

    _buildUrl() {
        if (this._summary) {
            this._url = this._url + '/summary';
        }
        return super._buildUrl();
    }

}