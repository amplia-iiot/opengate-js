'use strict';

import SearchBuilder from './SearchBuilder';
import IotSearch from '../IotSearch';
import FieldFinder from '../../util/searchingFields/FieldFinder';

const BASE_URL = '/feeds';
/**
 * Defined a search over Feeds	
 * @example ogapi.feedsSearchBuilder()
 */
export default class FeedsSearchBuilder extends SearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, BASE_URL));
        this._url = BASE_URL;
    }

    /**
     * Build a instance of IotSearch 
     *
     * @example
     *	ogapi.feedsSearchBuilder().filter({and:[]}).build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {IotSearch} 
     */
    build() {
        return new IotSearch(this._parent,
            this._buildUrl(),
            this._buildFilter(),
            this._buildLimit(),
            this._buildSort(),
            this._builderParams.timeout);
    }

}