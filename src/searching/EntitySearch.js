'use strict'

import Search from './Search'

/** 
 * This extends Search and it allow make request to any available resource into /entities resource at Opengate North API
 */
export default class EntitySearch extends Search {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     * @param {!string} url - this define a specific resource to make the search
     * @param {object} filter - this is the filter
     * @param {object} limit - this is the pagination about the search
     * @param {object} sort - this defined parameters to order the result of search
     */
    constructor(ogapi, url, filter, limit, sort, timeout) {
        super(ogapi, "/entities" + url, filter, limit, sort, timeout);
    }


}