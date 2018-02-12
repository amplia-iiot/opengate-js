'use strict';

import SearchBuilder from './SearchBuilder';
import StaticSearch from '../StaticSearch';

/**
 * Defined a search over operational status catalogs    
 * @example ogapi.userLanguagesSearchBuilder()
 */
export default class UserLanguagesSearchBuilder extends SearchBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {});

        this._url = '/userLanguages';
        //this.fluentFilter = parent.newFilterBuilder();
        this.customFilters = {};
    }

    /**
     * Build a instance of StaticSearch 
     *
     * @example
     *   ogapi.userLanguagesSearchBuilder().filter({and:[]}).build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {StaticSearch} 
     */
    build() {
        return new StaticSearch(this._parent,
            this._buildUrl(),
            this._buildFilter(),
            this._builderParams.timeout,
            'userLanguages', this.customFilters);
    }
}