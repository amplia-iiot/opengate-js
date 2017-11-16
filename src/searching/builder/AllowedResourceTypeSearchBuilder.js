'use strict';

import SearchBuilder from './SearchBuilder'
import StaticSearch from '../StaticSearch';

/**
 * Defined a search over mobile phone provider catalog
 * @example ogapi.AllowedResourceTypeSearchBuilder()
 */
export default class AllowedResourceTypeSearchBuilder extends SearchBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {});
        this._url = '/allowedResourceType';
        this.customFilters = {};
    }

    /**
     * Build a instance of StaticSearch 
     *
     * @example
     *   ogapi.AllowedResourceTypeSearchBuilder().build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {StaticSearch}  
     */
    build() {
        return new StaticSearch(this._parent,
            this._buildUrl(),
            null,
            this._builderParams.timeout,
            'allowedResourceType', this.customFilters);
    }


}
