'use strict';

import SearchBuilder from './SearchBuilder';
import StaticSearch from '../StaticSearch';

/**
 * Defines a search over the resource type catalog.
 * @example ogapi.ResourceTypeSearchBuilder()
 */
export default class ResourceTypeSearchBuilder extends SearchBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {});
        this._url = '/resourceType';
        this.customFilters = {};
    }

    /**
     * Build a instance of StaticSearch
     *
     * @example
     *   ogapi.ResourceTypeSearchBuilder().build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {StaticSearch}  
     */
    build() {
        return new StaticSearch(this._parent, this._buildUrl(), null, this._builderParams.timeout, 'resourceType', this.customFilters);
    }
}
