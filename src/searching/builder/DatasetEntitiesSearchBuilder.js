'use strict';

import SearchWithSummaryBuilder from './SearchWithSummaryBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';
import EntitySearch from '../EntitySearch';
export const TOKEN_URL = '$_token';

/**
 * Defined a search over Executions	
 * @example ogapi.datasetEntitiesSearchBuilder()
 */
export default class DatasetEntitiesSearchBuilder extends SearchWithSummaryBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent, organization, dataset, fieldFinder = new FieldFinder(parent, '/entities')) {
        super(parent, {
            onDevices: '/',
        }, fieldFinder);
        this._url = '/organizations/' + organization + '/datasets/' + dataset + TOKEN_URL;
    }

    /**
     * The response will return a flattened response
     * @example
     *	ogapi.datasetEntitiesSearchBuilder().flattened() 
     * @return {DatasetEntitiesSearchBuilder} 
     */
    flattened() {
        this._urlParams.flattened = true;
        return this;
    }

    /**
     * The response will return a response without sorted
     * @example
     *	ogapi.datasetEntitiesSearchBuilder().disableDefaultSorted() 
     * @return {DatasetEntitiesSearchBuilder} 
     */
    disableDefaultSorted() {
        this._urlParams.defaultSorted = false;
        return this;
    }

    /**
     * The response will return a response by applying the filter with likes case-no-sensitive
     * @example
     *	ogapi.datasetEntitiesSearchBuilder().disableCaseSensitive() 
     * @return {DatasetEntitiesSearchBuilder} 
     */
    disableCaseSensitive(flag) {
        this._urlParams.caseSensitive = flag ? flag : false;
        return this;
    }

    /**
     * The response will return a response by deleteing the parameters with likes case-no-sensitive
     * @example
     *	ogapi.datasetEntitiesSearchBuilder().disableCaseSensitive() 
     * @return {DatasetEntitiesSearchBuilder} 
     */
    removeCaseSensitive() {
        if (this._urlParams)
            delete this._urlParams.caseSensitive;
        return this;
    }

    _buildUrl() {
        for (let route in this._routes) {
            if (this._builderParams[route]) {
                this._url = this._url.replace(TOKEN_URL, this._routes[route]);
            }
        }
        this._url = this._url.replace(TOKEN_URL, '');
        return super._buildUrl();
    }

    /**
     * The search request will have this group by 
     * @example
     * @param {!(object)} group 
     * @return {DatasetEntitiesSearchBuilder} 
     */
    group(group) {
        this._builderParams.group = (group || {});
        return this;
    }


    /**
     * The search request will have this filter 
     * @example
     *  ogapi.datasetEntitiesSearchBuilder().select(
     *      ogapi.newSelectBuilder().add(SE.element("provision.device.identifier", ["value"], "id"), SE.add("device.temperature.value", ["value"]))
     *  ) // Setting SelectBuilder
     *  ogapi.datasetEntitiesSearchBuilder().select({ "elements": [{"name": "provision.device.identifier",
     *		"fields": [{"field": "value","alias": "identifier"}]},
     *      {"name": "device.temperature.value","fields": [{"field": "value","alias": "identifier"}]}]
     *   }) //Custom select
     * @param {!(SelectBuilder|object)} select
     * @return {DatasetEntitiesSearchBuilder} 
     */
    select(select) {
        this._builderParams.select = (select || []);
        return this;
    }

    /**
     * Build a instance of Search 
     *
     * @example
     *  ogapi.datasetEntitiesSearchBuilder()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {Search} 
     */
    build() {
        // OUW-944
        return new EntitySearch(this._parent,
            this._buildUrl(),
            this._buildFilter(),
            this._buildLimit(),
            this._buildSort(),
            this._buildGroup(),
            this._buildSelect(),
            this._builderParams.timeout, this._urlParams);
    }

}