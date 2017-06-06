'use strict';

import SearchWithSummaryBuilder from './SearchWithSummaryBuilder';
import merge from 'merge';

import FieldFinder from '../../util/searchingFields/FieldFinder';

const BASE_URL = '/catalog/hardwares';
/**
 * Defined a search over Datastreams	
 * @example ogapi.hardwareSearchBuilder()
 */
export default class HardwaresSearchBuilder extends SearchWithSummaryBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, BASE_URL));
        this._url = BASE_URL;
        this.fluentFilter = parent.newFilterBuilder();
        this.tagsFilter = [];
    }

    /**
     * Sets id to search
     *
     * @example
     *	ogapi.hardwareSearchBuilder().withId('myHardware').build()
     * @param {!string} hardwareId - hardware id
     * @throws {Error} throw error when hardwareId is not typeof string
     * @return {HardwaresSearchBuilder} 
     */
    withId(hardwareId) {
        if (typeof hardwareId !== 'string') {
            throw new Error('Parameter hardwareId must be a string');
        }
        this.fluentFilter.and(this._parent.EX.eq('hardwareId', hardwareId));
        return this;
    }

    /**
     * Set modelName to search
     *
     * @example
     *	ogapi.hardwareSearchBuilder().withModel('myModel').build()
     * @param {!string} modelName - model name
     * @throws {Error} throw error when modelName is not typeof string
     * @return {HardwaresSearchBuilder} 
     */
    withModel(modelName) {
        if (typeof modelName !== 'string') {
            throw new Error('Parameter modelName must be a string');
        }
        this.fluentFilter.and(this._parent.EX.eq('modelName', modelName));
        return this;
    }

    /**
     * Set modelVersion to search
     *
     * @example
     *	ogapi.hardwareSearchBuilder().withModelVersion('myModelVersion).build()
     * @param {!string} modelVersion - model version
     * @throws {Error} throw error when modelVersion is not typeof string
     * @return {HardwaresSearchBuilder} 
     */
    withModelVersion(modelVersion) {
        if (typeof modelVersion !== 'string') {
            throw new Error('Parameter modelVersion must be a string');
        }
        this.fluentFilter.and(this._parent.EX.eq('modelVersion', modelVersion));
        return this;
    }

    /**
     * Set feedName to search
     *
     * @example
     *	ogapi.hardwareSearchBuilder().withManufacturer('myManufacturer').build()
     * @param {!string} manufacturerName - manufacturer name
     * @throws {Error} throw error when modelName is not typeof string
     * @return {HardwaresSearchBuilder} 
     */
    withManufacturer(manufacturerName) {
        if (typeof manufacturerName !== 'string') {
            throw new Error('Parameter manufacturerName must be a string');
        }
        this.fluentFilter.and(this._parent.EX.eq('manufacturerName', manufacturerName));
        return this;
    }

    _buildFilter() {
        let filter = { filter: {} };

        let _fluentFilter = merge(true, this.fluentFilter);
        let _customFilter = this._builderParams.filter;

        //if (this.tagsFilter.length > 0){
        //	_fluentFilter.and(this._parent.EX.in('datapoint.tag',this.tagsFilter));				
        //}

        _fluentFilter = _fluentFilter._filterTemplate.filter;

        if (typeof _customFilter._filterTemplate === "object") {
            _customFilter = _customFilter._filterTemplate.filter;
        }

        if ((typeof _customFilter !== "undefined" && Object.keys(_customFilter).length > 0) && (typeof _fluentFilter !== "undefined" && Object.keys(_fluentFilter).length > 0)) {
            throw new Error('Incompatible filters. You only can create a filter using fluent mode [withId, withModel, withModelVersion, withManufacturer] methods or custom filter [filter] method');
        }

        if (typeof _customFilter !== "undefined" && Object.keys(_customFilter).length > 0) {
            filter.filter = _customFilter;
        } else if (typeof _fluentFilter !== "undefined" && Object.keys(_fluentFilter).length > 0) {
            filter.filter = _fluentFilter;
        }
        return filter;
    }
}