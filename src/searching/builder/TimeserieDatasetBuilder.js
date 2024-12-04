'use strict';

import SearchBuilder from './SearchBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';
import WPSearch from '../WPSearch';
export const BASE_URL = 'timeseries';

import checkType from '../../util/formats/check_types'

export const aggregationTypes = ["FIRST", "LAST", "AVG", "MAX", "MIN", "SUM", "COUNT", "GEO_AVG", "VARIANCE", "STD_DEVIATION", "DATE_FOR_MAX", "DATE_FOR_MIN", "DATE_FOR_FIRST", "DATE_FOR_LAST"];

/**
 * Defined a search over timeseries	
 * @example ogapi.timeserieDatasetBuilder(organization, timeserieId)
 */
export default class TimeserieDatasetBuilder extends SearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent, organization, timeserie) {
        super(parent, {}, new FieldFinder(parent, BASE_URL, { organization: organization, timeserie: timeserie }))
        this._url = BASE_URL + '/provision/organizations/' + organization + '/' + timeserie + '/dataset'
    }

    /**
     * The search request will have this filter 
     * @param {object} select
     * @return {TimeserieDatasetBuilder} 
     */
    select(select) {
        this._builderParams.select = (select || []);
        return this;
    }

    columns(columns) {
        checkType._checkArray(columns, 'columns');

        columns.forEach((colTmp) => this.addColumn(colTmp.name, colTmp.aggregation, colTmp.alias))
    }

    addColumn(name, aggregation, alias) {
        checkType._checkStringAndPattern(name, "^[a-zA-Z0-9 _-]*$", 'name');

        if (alias) {
            checkType._checkStringAndPattern(alias, "^[a-zA-Z0-9 _-]*$", 'alias');
        }

        if (aggregation) {
            checkType._checkType(aggregation, aggregationTypes, 'aggregation');
        }

        if (!this._builderParams.select) {
            this._builderParams.select = {};
        }

        if (!this._builderParams.select.columns) {
            this._builderParams.select.columns = [];
        }

        this._builderParams.select.columns.push({
            column: name,
            alias: alias || undefined,
            aggregation: aggregation || undefined
        });
    }

    sort() {
        throw new Error('sort not supported');
    }

    group() {
        throw new Error('group not supported');
    }

    findAllFields() {
        throw new Error('findAllFields not supported');
    }

    /**
     * Build a instance of Search 
     *
     * @example
     *  ogapi.timeserieDatasetBuilder(organization, timeserieId).build()
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