'use strict';

import SearchWithSummaryBuilder from './SearchWithSummaryBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';

const BASE_URL = '/channels';
/**
 * Defined a search over Channels	
 * @example ogapi.channelsSearchBuilder()
 */
export default class ChannelsSearchBuilder extends SearchWithSummaryBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, BASE_URL));
        this._url = BASE_URL;
        this._summary = false;
    }


    /**
     * The response will return a response without sorted
     * @example
     *	ogapi.channelsSearchBuilder().disableDefaultSorted() 
     * @return {ChannelsSearchBuilder} 
     */
    disableDefaultSorted() {
        this._urlParams.defaultSorted = false;
        return this;
    }

    /**
     * The response will only have a summary information 
     * @example
     *	ogapi.channelsSearchBuilder().summary() 
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