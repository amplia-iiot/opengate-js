'use strict';

import SearchBuilder from './SearchBuilder';
import StaticSearch from '../StaticSearch';

/**
 * Defines a search over the ticket severity catalog.
 * @example ogapi.ticketSeveritySearchBuilder()
 */
export default class TicketSeveritySearchBuilder extends SearchBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {});
        this._url = '/ticketSeverity';
        this.customFilters = {};
    }

    /**
     * Build a instance of StaticSearch
     *
     * @example
     *   ogapi.ticketSeveritySearchBuilder().build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {StaticSearch}  
     */
    build() {
        return new StaticSearch(this._parent, this._buildUrl(), null, this._builderParams.timeout, 'ticketSeverity', this.customFilters);
    }
}
