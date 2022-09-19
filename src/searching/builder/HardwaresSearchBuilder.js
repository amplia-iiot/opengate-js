'use strict';

import SearchBuilder from './SearchBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder'

const BASE_URL = '/catalog/hardwares';
/**
 * Defined a search over Devices	
 * @example ogapi.devicesSearchBuilder()
 */
export default class HardwaresSearchBuilder extends SearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, BASE_URL));
        this._url = BASE_URL;
    }

    /**
     * The search request will have this group by 
     * @example
     * @param {!(object)} group 
     * @return {SearchBuilder} 
     */
    group(group) {
        this._builderParams.group = (group || {});
        return this;
    }

    /**
     * The search request will have this filter 
     * @example
     *  ogapi.HardwaresSearchBuilder().select(...)
     * @param {!(SelectBuilder|object)} select
     * @return {SearchBuilder} 
     */
    select(select) {
        this._builderParams.select = (select);
        return this;
    }

    /**
     * The response will return a flattened response
     * @example
     *	ogapi.HardwaresSearchBuilder().flattened() 
     * @return {HardwaresSearchBuilder} 
     */
    flattened() {
        this._urlParams.flattened = true;

        return this;
    }

    /**
     * The response will return a response without sorted
     * @example
     *	ogapi.HardwaresSearchBuilder().disableDefaultSorted() 
     * @return {HardwaresSearchBuilder} 
     */
    disableDefaultSorted() {
        this._urlParams.defaultSorted = false;
        return this;
    }
}