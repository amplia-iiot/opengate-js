'use strict';

import SearchBuilder from './SearchBuilder';
import StaticSearch from '../StaticSearch';

/**
 * Defined a search over ruleMode catalog
 * @example ogapi.ruleModeSearchBuilder()
 */
export default class RuleModeSearchBuilder extends SearchBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {});
        this._url = '/ruleMode';
        this.customFilters = {};
    }

    /**
     * Build a instance of StaticSearch 
     *
     * @example
     *   ogapi.ruleModeSearchBuilder().build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {StaticSearch}  
     */
    build() {
        return new StaticSearch(this._parent,
            this._buildUrl(),
            null,
            this._builderParams.timeout,
            'ruleMode', this.customFilters);
    }


}