'use strict';

import SearchBuilder from './SearchBuilder';
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


    /**
     * Sets type to search
     *
     * @example
     *  ogapi.AllowedResourceTypeSearchBuilder().withType('device').build()
     * @param {!string} type - type to searcg
     * @throws {Error} throw error when type is not typeof string
     * @return {AllowedResourceTypeSearchBuilder} 
     */
    withType(type) {
        if (typeof type !== 'string') {
            throw new Error('Parameter type must be a string');
        }

        this.customFilters.type = type.toLowerCase();
        return this;
    }
}