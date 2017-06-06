'use strict';

import SearchBuilder from './SearchBuilder'
import StaticSearch from '../StaticSearch';

/**
 * Defined a search over mobile phone provider catalog
 * @example ogapi.ioTDatastreamAccessSearchBuilder()
 */
export default class IoTDatastreamAccessSearchBuilder extends SearchBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {});
        this._url = '/ioTDatastreamAccess';
        this.customFilters = {};
    }

    /**
     * Build a instance of StaticSearch 
     *
     * @example
     *   ogapi.ioTDatastreamAccessSearchBuilder().build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {StaticSearch}  
     */
    build() {
        return new StaticSearch(this._parent,
            this._buildUrl(),
            null,
            this._builderParams.timeout,
            'ioTDatastreamAccess', this.customFilters);
    }


}
