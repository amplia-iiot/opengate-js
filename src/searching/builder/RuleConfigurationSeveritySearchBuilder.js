'use strict';

import SearchBuilder from './SearchBuilder';
import StaticSearch from '../StaticSearch';

/**
 * Defined a search over ruleConfigurationSeverity catalog
 * @example ogapi.ruleConfigurationSeveritySearchBuilder()
 */
export default class RuleConfigurationSeveritySearchBuilder extends SearchBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {});
        this._url = '/ruleConfigurationSeverity';
        this.customFilters = {};
    }

    /**
     * Build a instance of StaticSearch 
     *
     * @example
     *   ogapi.ruleConfigurationSeveritySearchBuilder().build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {StaticSearch}  
     */
    build() {
        return new StaticSearch(this._parent,
            this._buildUrl(),
            null,
            this._builderParams.timeout,
            'ruleConfigurationSeverity', this.customFilters);
    }


}