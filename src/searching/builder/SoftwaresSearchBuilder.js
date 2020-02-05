'use strict';

import SearchWithSummaryBuilder from './SearchWithSummaryBuilder';
import merge from 'merge';
import FieldFinder from '../../util/searchingFields/FieldFinder';

/**
 * SOFTWARE_TYPES_ENUM values allowed
 */
export const SOFTWARE_TYPES_ENUM = ['SOFTWARE', 'FIRMWARE'];


const BASE_URL = '/catalog/softwares';
/**
 * Defined a search over Datastreams    
 * @example ogapi.softwareSearchBuilder()
 */
export default class SoftwaresSearchBuilder extends SearchWithSummaryBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, BASE_URL));
        this._url = BASE_URL;
        this.fluentFilter = parent.newFilterBuilder();
        this.tagsFilter = [];
    }

    /**
     * Sets softwareId to search
     *
     * @example
     *  ogapi.softwareSearchBuilder().withId('mySoftwareId').build()
     * @param {!string} softwareId - software id
     * @throws {Error} throw error when softwareId is not typeof string
     * @return {SoftwaresSearchBuilder} 
     */
    withId(softwareId) {
        if (typeof softwareId !== 'string') {
            throw new Error('Parameter softwareId must be a string');
        }
        this.fluentFilter.and(this._parent.EX.eq('softwareId', softwareId));
        return this;
    }

    /**
     * Set softwareName to search
     *
     * @example
     *  ogapi.softwareSearchBuilder().withName('mySoftware').build()
     * @param {!string} softwareName - software name
     * @throws {Error} throw error when softwareName is not typeof string
     * @return {SoftwaresSearchBuilder} 
     */
    withName(softwareName) {
        if (typeof softwareName !== 'string') {
            throw new Error('Parameter softwareName must be a string');
        }
        this.fluentFilter.and(this._parent.EX.eq('softwareName', softwareName));
        return this;
    }


    /**
     * Set softwareType to search
     *
     * @example
     *  ogapi.softwareSearchBuilder().withType('mySoftwareType).build()
     * @param {!string} softwareType - software version
     * @throws {Error} throw error when softwareType is not typeof string
     * @return {SoftwaresSearchBuilder} 
     */
    withType(softwareType) {
        if (typeof softwareType !== 'string') {
            throw new Error('Parameter version must be a string');
        }

        let not_found = '';
        let found = SOFTWARE_TYPES_ENUM.find(function(softwareType) {
            return softwareType == this;
        }, softwareType);
        if (typeof found === "undefined") {
            not_found = softwareType;
        }

        if (not_found !== '') {
            throw new Error("Parameter in TYPE is not allowed. Parameter value '" +
                JSON.stringify(not_found) + "', parameters allowed in administrativeState are: '" + JSON.stringify(SOFTWARE_TYPES_ENUM) + "'");
        }

        this.fluentFilter.and(this._parent.EX.eq('softwareType', softwareType));
        return this;
    }


    /**
     * Set softwareVersion to search
     *
     * @example
     *  ogapi.softwareSearchBuilder().withVersion('mySoftwareVersion).build()
     * @param {!string} softwareVersion - software version
     * @throws {Error} throw error when softwareVersion is not typeof string
     * @return {SoftwaresSearchBuilder} 
     */
    withVersion(softwareVersion) {
        if (typeof softwareVersion !== 'string') {
            throw new Error('Parameter version must be a string');
        }
        this.fluentFilter.and(this._parent.EX.eq('softwareVersion', softwareVersion));
        return this;
    }

    /**
     * Sets hardware id to search
     *
     * @example
     *  ogapi.hardwareSearchBuilder().withHardwareId('myHardware').build()
     * @param {!string} hardwareId - hardware id
     * @throws {Error} throw error when hardwareId is not typeof string
     * @return {SoftwaresSearchBuilder} 
     */
    withHardwareId(hardwareId) {
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
     *  ogapi.softwareSearchBuilder().withModel('myModel').build()
     * @param {!string} modelName - model name
     * @throws {Error} throw error when modelName is not typeof string
     * @return {SoftwaresSearchBuilder} 
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
     *  ogapi.softwareSearchBuilder().withModelVersion('myModelVersion).build()
     * @param {!string} modelVersion - model version
     * @throws {Error} throw error when modelVersion is not typeof string
     * @return {SoftwaresSearchBuilder} 
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
     *  ogapi.softwareSearchBuilder().withManufacturer('myManufacturer').build()
     * @param {!string} manufacturerName - manufacturer name
     * @throws {Error} throw error when modelName is not typeof string
     * @return {SoftwaresSearchBuilder} 
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
        //  _fluentFilter.and(this._parent.EX.in('datapoint.tag',this.tagsFilter));             
        //}

        _fluentFilter = _fluentFilter._filterTemplate.filter;

        if (typeof _customFilter._filterTemplate === "object") {
            _customFilter = _customFilter._filterTemplate.filter;
        }

        if ((typeof _customFilter !== "undefined" && Object.keys(_customFilter).length > 0) && (typeof _fluentFilter !== "undefined" && Object.keys(_fluentFilter).length > 0)) {
            throw new Error('Incompatible filters. You only can create a filter using fluent mode [withId, withName, withVersion, withType, withHardwareId, withModel, withModelVersion, withManufacturer] methods or custom filter [filter] method');
        }

        if (typeof _customFilter !== "undefined" && Object.keys(_customFilter).length > 0) {
            filter.filter = _customFilter;
        } else if (typeof _fluentFilter !== "undefined" && Object.keys(_fluentFilter).length > 0) {
            filter.filter = _fluentFilter;
        }

        //console.log(JSON.stringify(filter));
        return filter;
    }
}