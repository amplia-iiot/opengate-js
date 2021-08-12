'use strict';

import SearchBuilder from './SearchBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';
import WPSearch from '../WPSearch';
export const BASE_URL = '/datasets';

/**
 * Defined a search over Executions	
 * @example ogapi.datasetSearchBuilder()
 */
export default class DatasetSearchBuilder extends SearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent, organization, dataset){
        super(parent, {}, new FieldFinder(parent, BASE_URL))
        this._url = BASE_URL + '/provision/organizations/' + organization + '/' + dataset + '/data'
    }
    
    /**
     * The search request will have this group by 
     * @example
     * @param {!(object)} group 
     * @return {DatasetSearchBuilder} 
     */
    group(group) {
        this._builderParams.group = (group || {});
        return this;
    }


    /**
     * The search request will have this filter 
     * @example
     *  ogapi.datasetSearchBuilder().select(
     *      ogapi.newSelectBuilder().add(SE.element("provision.device.identifier", ["value"], "id"), SE.add("device.temperature.value", ["value"]))
     *  ) // Setting SelectBuilder
     *  ogapi.datasetSearchBuilder().select({ "elements": [{"name": "provision.device.identifier",
     *		"fields": [{"field": "value","alias": "identifier"}]},
     *      {"name": "device.temperature.value","fields": [{"field": "value","alias": "identifier"}]}]
     *   }) //Custom select
     * @param {!(SelectBuilder|object)} select
     * @return {DatasetSearchBuilder} 
     */
    select(select) {
        this._builderParams.select = (select || []);
        return this;
    }

    /**
     * Build a instance of Search 
     *
     * @example
     *  ogapi.datasetSearchBuilder().onProvisioned().build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {Search} 
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