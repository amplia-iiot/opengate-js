'use strict';

import SearchBuilder from './SearchBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';
import WPSearch from '../WPSearch';
const BASE_URL = 'provisionProcessors/bulk/search';

/**
 * Searching over all the created bulk process, which are already done or still in progress.	
 * @example ogapi.bulkProcessorSearchBuilder()
 */
export default class BulkProcessorSearchBuilder extends SearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, BASE_URL));
        this._url = BASE_URL;
    }

    /**
     * Build a instance of WPSearch 
     *
     * @example
     *  ogapi.bulkProcessorSearchBuilder().build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {WPSearch} 
     */
     build() {
        return new WPSearch(this._parent,
            this._buildUrl(),
            this._buildFilter(),
            this._buildLimit(),
            this._buildSort(),
            this._buildGroup(),
            this._buildSelect(),
            this._builderParams.timeout,
            this._urlParams);
    }
}