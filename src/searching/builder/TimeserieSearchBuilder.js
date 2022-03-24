'use strict';

import SearchBuilder from './SearchBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';
import WPSearch from '../WPSearch';
export const BASE_URL = 'timeseries';

/**
 * Defined a search over timeseries	
 * @example ogapi.timeserieSearchBuilder(organization, timeserieId)
 */
export default class TimeserieSearchBuilder extends SearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent, organization, timeserie){
        super(parent, {}, new FieldFinder(parent, BASE_URL, {organization: organization, timeserie: timeserie}))
        this._url = BASE_URL + '/provision/organizations/' + organization + '/' + timeserie + '/data'
    }
    
    /**
     * The search request will have this group by 
     * @example
     * @param {!(object)} group 
     * @return {TimeserieSearchBuilder} 
     */
    group(group) {
        this._builderParams.group = (group || {});
        return this;
    }


    /**
     * The search request will have this filter 
     * @example
     *  ogapi.timeserieSearchBuilder(organization, timeserieId).select(
     *      ogapi.newSelectBuilder().add(SE.element("Identifier", ["value"], "id"), SE.add("Temperature", ["value"]))
     *  ) // Setting SelectBuilder
     *  ogapi.timeserieSearchBuilder(organization, timeserieId).select({ "elements": [{"name": "Identifier",
     *		"fields": [{"field": "value","alias": "identifier"}]},
     *      {"name": "Temperature","fields": [{"field": "value","alias": "identifier"}]}]
     *   }) //Custom select
     * @param {!(SelectBuilder|object)} select
     * @return {TimeserieSearchBuilder} 
     */
    select(select) {
        this._builderParams.select = (select || []);
        return this;
    }

    /**
     * Build a instance of Search 
     *
     * @example
     *  ogapi.timeserieSearchBuilder(organization, timeserieId).build()
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