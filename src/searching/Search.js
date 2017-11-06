import BaseSearch from './BaseSearch'
import merge from 'merge'

/** 
 * This extends BaseSearch and allow make request to any available resource into Opengate North API.
 */
export default class Search extends BaseSearch {
	/**
    * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
    * @param {!string} url - this define a specific resource to make the search
    * @param {object} filter - this is the filter
    * @param {object} limit - this is the pagination about the search
    * @param {object} sort - this defined parameters to order the result of search
    */
	constructor(ogapi, url, filter, limit = { limit: {} }, sort, group, select, timeout) {
		super(ogapi, url, timeout);
		this._postObj = merge(filter, limit, group, select);
		if (typeof sort === 'object') {
			this._postObj = merge(this._postObj, sort);
		}
	}

	_filter() {
		return this._postObj;
	}

}