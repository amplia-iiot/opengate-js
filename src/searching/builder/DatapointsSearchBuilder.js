'use strict';

import SearchBuilder from './SearchBuilder';
import merge from 'merge';
import moment from 'moment';
import FieldFinder from '../../util/searchingFields/FieldFinder';
import { DATE_FORMAT } from '../../util/DATE_FORMAT';

const BASE_URL = '/datapoints';
/**
 * Defined a search over Datastreams	
 * @example ogapi.datapointsSearchBuilder()
 */
export default class DatapointsSearchBuilder extends SearchBuilder {
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
     * Set deviceId to search
     *
     * @example
     *	ogapi.datapointsSearchBuilder().withDeviceId('myDevice').build()
     * @param {!string} deviceId - Prov.customId of Device
     * @throws {Error} throw error when deviceId is not typeof string
     * @return {DatapointsSearchBuilder} 
     */
    withDeviceId(deviceId) {
            if (typeof deviceId !== 'string') {
                throw new Error('Parameter deviceId must be a string');
            }
            this.fluentFilter.and(this._parent.EX.eq('datapoint.device', deviceId));
            return this;
        }
        /**
         * Set datastreamId to search
         *
         * @example
         *	ogapi.datapointsSearchBuilder().withDeviceId('myDevice').build()
         * @param {!string} datastreamId - Datastream.id of Datapoint
         * @throws {Error} throw error when datastreamId is not typeof string
         * @return {DatapointsSearchBuilder} 
         */
    withDatastream(datastreamId) {
        if (typeof datastreamId !== 'string') {
            throw new Error('Parameter datastreamId must be a string');
        }
        this.fluentFilter.and(this._parent.EX.eq('datapoint.datastream', datastreamId));
        return this;
    }

    /**
     * Set feedName to search
     *
     * @example
     *	ogapi.datapointsSearchBuilder().withDeviceId('myDevice').build()
     * @param {!string} feedId - Datastream.id of Datapoint
     * @throws {Error} throw error when datastreamId is not typeof string
     * @return {DatapointsSearchBuilder} 
     */
    withFeed(feedId) {
        if (typeof feedId !== 'string') {
            throw new Error('Parameter feedId must be a string');
        }
        this.fluentFilter.and(this._parent.EX.eq('datapoint.feed', feedId));
        return this;
    }

    //	/**
    //	* Add tag to search
    //	*
    //	* @example
    //	*	ogapi.datapointsSearchBuilder().addTag('tag').build()	
    //	* @param {!string} tagName - Add a tag into tags array
    //	* @throws {Error} throw error when tagName is not typeof string
    //	* @return {datapointsSearchBuilder} 
    //	*/
    //	addTag(tagName){
    //		if (typeof tagName !== 'string' ){
    //			throw new Error('Parameter tagName must be a string');
    //		}
    //		this.tagsFilter.push(tagName)
    //		return this;		
    //	}

    /**
     * Set time window to search
     *
     * @example
     *	ogapi.datapointsSearchBuilder().withDeviceId('myDevice').build()
     * @param {!date} fromDate - Add from date
     * @param {!date} toDate - Add to date
     * @throws {Error} throw error when fromDate or toDate is not typeof date
     * @return {DatapointsSearchBuilder} 
     */
    betweenDates(fromDate, toDate) {
        if (typeof fromDate !== "object" || fromDate.constructor !== Date) {
            throw new Error('Parameter fromDate must be a Date');
        }
        this.fluentFilter.and(this._parent.EX.gt('datapoint.at', moment(fromDate).format(DATE_FORMAT)));
        if (typeof toDate !== "undefined") {
            if (toDate.constructor !== Date) {
                throw new Error('Parameter toDate must be a Date');
            }
            this.fluentFilter.and(this._parent.EX.lt('datapoint.at', moment(toDate).format(DATE_FORMAT)));
        }
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
            throw new Error('Incompatible filters. You only can create a filter using fluent mode [betweenDates, addTag, withDatastreamId, withDeviceId] methods or custom filter [filter] method');
        }

        if (typeof _customFilter !== "undefined" && Object.keys(_customFilter).length > 0) {
            filter.filter = _customFilter;
        } else if (typeof _fluentFilter !== "undefined" && Object.keys(_fluentFilter).length > 0) {
            filter.filter = _fluentFilter;
        }
        return filter;
    }
}