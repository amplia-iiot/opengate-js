'use strict';

import SearchBuilder from './SearchBuilder';
import StaticSearch from '../StaticSearch';

/**
 * Defined a search over ruleType catalog
 * @example ogapi.ruleTypeSearchBuilder()
 */
export default class RuleTypeSearchBuilder extends SearchBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {});
        this._url = '/ruleType';
        this.customFilters = {};
    }

    /**
     * Build a instance of StaticSearch 
     *
     * @example
     *   ogapi.ruleTypeSearchBuilder().build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {StaticSearch}  
     */
    build() {
        return new StaticSearch(this._parent,
            this._buildUrl(),
            null,
            this._builderParams.timeout,
            'ruleType', this.customFilters);
    }


}