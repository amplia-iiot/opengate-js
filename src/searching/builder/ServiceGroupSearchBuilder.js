'use strict';

import SearchBuilder from './SearchBuilder'
import StaticSearch from '../StaticSearch';

const staticSearchType = 'serviceGroups';
/**
 * Defined a search over service group catalogs    
 * @example ogapi.serviceGroupSearchBuilder()
 */
export default class ServiceGroupSearchBuilder extends SearchBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {});
        this._url = '/' + staticSearchType;
        this.customFilters = {};
    }

    /**
     * Build a instance of StaticSearch 
     *
     * @example
     *   ogapi.serviceGroupSearchBuilder().filter({and:[]}).build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {StaticSearch} 
     */
    build() {
        return new StaticSearch(this._parent,
            this._buildUrl(),
            this._buildFilter(),
            this._builderParams.timeout,
            staticSearchType, this.customFilters);
    }

    /**
     * Set entityType to search
     *
     * @example
     *  ogapi.serviceGroupSearchBuilder().withEntityType('myEntityType').build()
     * @param {!string} entityType - model name
     * @throws {Error} throw error when entityType is not typeof string
     * @return {SpecificTypeSearchBuilder} 
     */
    withEntityType(entityType) {
        if (typeof entityType !== 'string') {
            throw new Error('Parameter entityType must be a string');
        }
        this.customFilters.entityType = entityType;
        return this;
    }
}