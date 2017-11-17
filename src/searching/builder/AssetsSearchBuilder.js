'use strict';

import PreFilteredSearchBuilder from './PreFilteredSearchBuilder'
import FieldFinder from '../../util/searchingFields/FieldFinder'
import AssetSearch from '../AssetSearch'

const BASE_URL = '/entities';
/**
 * Defined a search over Assets	
 * @example ogapi.assetsSearchBuilder()
 */
export default class AssetsSearchBuilder extends PreFilteredSearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, BASE_URL));
        this._url = BASE_URL;
    }

    /**
     * The response will only have a summary information 
     * @example
     *	ogapi.assetsSearchBuilder().summary() 
     * @return {AssetsSearchBuilder} 
     */
    summary() {
        this._url = this._url + '/summary';

        return this;
    }

    _buildFilter() {
        let finalFilter = {
            "and": [{
                "exists": {
                    "provision.asset.identifier": true
                }
            }]
        };

        if (this._builderParams.filter && Object.keys(this._builderParams.filter).length > 0) {
            let filter = this._builderParams.filter;
            if (typeof filter._filterTemplate !== "undefined") {
                //return filter._filterTemplate;
                finalFilter["and"].push(filter._filterTemplate.filter);
            } else {
                finalFilter["and"].push(filter);
            }
        }

        return {
            filter: finalFilter
        };
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
     * Build a instance of Search 
     *
     * @example
     *  ogapi.assetsSearchBuilder().onProvisioned().build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {Search} 
     */
    build() {
        return new AssetSearch(this._parent,
            this._buildUrl(),
            this._buildFilter(),
            this._buildLimit(),
            this._buildSort(),
            this._buildGroup(),
            this._buildSelect(),
            this._builderParams.timeout);
    }

      /**
     * The search request will have this filter 
     * @example
     *  ogapi.assetsSearchBuilder().select(
     *      ogapi.newSelectBuilder().add(SE.element("provision.device.identifier", ["value"], "id"), SE.add("device.temperature.value", ["value"]))
     *  ) // Setting SelectBuilder
     *  ogapi.assetsSearchBuilder().select({
     *      "elements": [
     *          {"name": "provision.device.identifier","fields": ["value"],"alias": "id"},
     *          {"name": "device.temperature.value","fields": ["value"]}
     *      ]
     *  }) //Custom select
     * @param {!(SelectBuilder|object)} select
     * @return {SearchBuilder} 
     */
    select(select) {
        this._builderParams.select = (select || []);
        return this;
    }
}