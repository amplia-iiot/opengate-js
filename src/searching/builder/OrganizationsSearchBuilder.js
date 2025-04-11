'use strict';

import SearchBuilder from './SearchBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder'

const BASE_URL = '/organizations';

/**
 * Defined a search over Devices	
 * @example ogapi.organizationsSearchBuilder()()
 */
export default class OrganizationsSearchBuilder extends SearchBuilder {
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
     *	ogapi.ticketsSearchBuilder().summary() 
     * @return {OrganizationsSearchBuilder} 
     */
    summary() {
        this._url = this._url + '/summary';

        return this;
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
     *  ogapi.ticketsSearchBuilder().select(
     *      ogapi.newSelectBuilder().add(SE.element("provision.ticket.identifier", [[{"field": "value","alias": "identifier"}], ), SE.add("device.temperature.value", [[{"field": "value"}]))
     *  ) // Setting SelectBuilder
     *  ogapi.ticketsSearchBuilder().select({ "elements": [{"name": "provision.device.identifier",
     *		"fields": [{"field": "value","alias": "identifier"}]},
     *      {"name": "provision.ticket.name","fields": [{"field": "value","alias": "identifier"}]}]
     *   }) //Custom select
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
     *	ogapi.ticketsSearchBuilder().flattened() 
     * @return {OrganizationsSearchBuilder} 
     */
    flattened() {
        this._urlParams.flattened = true;

        return this;
    }

    /**
     * The response will return a response without sorted
     * @example
     *	ogapi.ticketsSearchBuilder().disableDefaultSorted() 
     * @return {OrganizationsSearchBuilder} 
     */
    disableDefaultSorted() {
        this._urlParams.defaultSorted = false;
        return this;
    }
}