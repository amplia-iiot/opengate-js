'use strict';

import PreFilteredSearchBuilder from './PreFilteredSearchBuilder'
import FieldFinder from '../../util/searchingFields/FieldFinder'

const BASE_URL = '/tickets';
/**
 * Defined a search over Devices	
 * @example ogapi.devicesSearchBuilder()
 */
export default class TicketsSearchBuilder extends PreFilteredSearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, BASE_URL));
        this._url = BASE_URL;
    }

    /**
     * The response will only have a summary information 
     * @example
     *	ogapi.devicesSearchBuilder().summary() 
     * @return {TicketsSearchBuilder} 
     */
    summary() {
        this._url = this._url + '/summary';

        return this;
    }

    _buildFilter() {
        return this._builderParams;
    }

    /**
     * The search request will have this group by 
     * @example
     * @param {!(object)} group 
     * @return {SearchBuilder} 
     */
    group(group) {
        this._builderParams.group = (group || {});
        return this;
    }
}