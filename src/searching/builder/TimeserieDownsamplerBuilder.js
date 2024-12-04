'use strict';

import SearchBuilder from './SearchBuilder';
import WPSearch from '../WPSearch';
export const BASE_URL = 'timeseries';
import checkType from '../../util/formats/check_types'

export const aggregationTypes = ["FIRST", "LAST", "AVG", "MAX", "MIN", "SUM", "COUNT", "MEDIAN", "GEO_AVG", "VARIANCE", "STD_DEVIATION"];
export const interpolationTypes = ["ZERO","LAST","LINEAR","NONE"];

/**
 * Defined a search over timeseries	
 * @example ogapi.timeserieDownsamplerBuilder(organization, timeserieId)
 */
export default class TimeserieDownsamplerBuilder extends SearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent, organization, timeserie, entityId) {
        super(parent, {}, null)
        this._url = BASE_URL + '/provision/organizations/' + organization + '/' + timeserie + '/downsampling/' + entityId
    }

    /**
     * The search request will have this filter 
     * @param {object} select
     * @return {TimeserieDownsamplerBuilder} 
     */
    select(select) {
        this._builderParams.select = (select || []);
        return this;
    }


    start(start) {
        checkType._checkISODateTime(start, 'start');

        if (!this._builderParams.select) {
            this._builderParams.select = {};
        }
        this._builderParams.select.start = start;

        return this;
    }

    bucketTime(bucketTime) {
        checkType._checkNumber(bucketTime, 'bucketTime');
        
        if (!this._builderParams.select) {
            this._builderParams.select = {};
        }

        this._builderParams.select.bucketTime = bucketTime;

        return this;
    }

    columns(columns) {
        checkType._checkArray(columns, 'columns');

        columns.forEach((colTmp) => this.addColumn(colTmp.name, colTmp.interpolation, colTmp.aggregation))
    }

    addColumn(name, interpolation, aggregation, alias) {
        checkType._checkStringAndPattern(name, "^[a-zA-Z0-9 _-]*$", 'name');

        if (interpolation) {
            checkType._checkType(interpolation, interpolationTypes, 'interpolation');
        }

        if (aggregation) {
            checkType._checkType(aggregation, aggregationTypes, 'aggregation');
        }

        if (alias) {
            checkType._checkStringAndPattern(alias, "^[a-zA-Z0-9 _-]*$", 'alias');
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
            interpolation: interpolation || undefined,
            aggregation: aggregation || undefined
        });
    }

    filter() {
        throw new Error('filter not supported');
    }

    sort() {
        throw new Error('sort not supported');
    }

    findFields() {
        throw new Error('findFields not supported');
    }

    /**
     * Build a instance of Search 
     *
     * @example
     *  ogapi.timeserieDownsamplerBuilder(organization, timeserieId).build()
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