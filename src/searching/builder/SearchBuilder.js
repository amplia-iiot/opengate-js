'use strict';

import Search from '../Search'
import SearchBuilderError from '../error/SearchBuilderError'

const LIMIT_START_DEF_VALUE = 1;
const LIMIT_SIZE_DEF_VALUE = 1000;

/**
 * This is a abstract class. It is a base to make all kind of search request to OpenGate North API.
 */
export default class SearchBuilder {
    /**
     * @param {!InternalOpenGateAPI} parent - this is ogapi instance
     * @param {!object} routes - this defined the routes. One of those routes must be called on Builder before call build method.
     */
    constructor(parent, routes, fieldFinder) {
        if (this.constructor === SearchBuilder) {
            throw new Error("Cannot construct Abstract instances directly");
        }
        this._url = '';
        this._fieldFinder = fieldFinder;
        this._parent = parent;
        this._routes = routes;
        this._routesName = [];
        this._builderParams = {
            summary: false,
            sort: [],
            filter: {},
            limit: undefined,
            group: undefined,
            select: undefined
        };
        for (let route in this._routes) {
            this._routesName.push(route);
            this._builderParams[route] = false;
            this[route] = (_route = route) => {
                this._builderParams[_route] = true;
                return this;
            }
        }
    }

    /**
     * Return a promise which it will contains an array with fields recommended
     * @return {Promise}
     */
    findFields(input) {
        return this._fieldFinder.find(input);
    }

    /**
     * The request will have a specific time out if it will be exceeded then the promise throw an exception
     * @example
     *  ogapi.subscriptionsSearchBuilder().withTimeout(2000) 
     * @param {number} ms - timeout in milliseconds
     * @return {SearchBuilder} 
     */
    withTimeout(ms = 2000) {
        if (typeof ms !== "number") throw new Error('Parameter ms must be a number');
        this._builderParams.timeout = ms;
        return this;
    }

    /**
     * The search request will have this filter 
     * @example
     *  ogapi.subscriptionsSearchBuilder().filter(
     *      ogapi.newFilterBuilder().and(Ex.like('prov.customid', 'SN32'), Ex.neq('entityId', '1124'))
     *  ) // Setting FilterBuilder
     *  ogapi.subscriptionsSearchBuilder().filter(
     *       {"and": [{"like": {"entityId": "0000000000000001"}}]}
     *  ) // Custom filter
     * @param {!(FilterBuilder|object)} filter 
     * @return {SearchBuilder} 
     */
    filter(filter) {
        this._builderParams.filter = (filter || {});
        return this;
    }

    /**
     * Add ascending param into the sort search object
     * @example
     *  ogapi.subscriptionsSearchBuilder().addSortAscendingBy('prov.customid') // Order by prov.customid Ascending  
     * @param {!string} filterField - This field must be allowed into the specific resource
     * @return {SearchBuilder} 
     */
    addSortAscendingBy(filterField) {
        const ASC = 'ASCENDING';
        return this.addSortBy(filterField, ASC);
    }

    /**
     * Add descending param into the sort search object 
     * @example
     *  ogapi.communicationsModulesSearchBuilder().addSortDescendingBy('prov.customid') // Order by prov.customid Descending
     * @param {!string} filterField - This field must be allowed into the specific resource
     * @return {SearchBuilder} 
     */
    addSortDescendingBy(filterField) {
        const DESC = 'DESCENDING';
        return this.addSortBy(filterField, DESC);
    }

    /**
     * Add ascending/descending param into the sort search object 
     * @example
     *  ogapi.subscriptionsSearchBuilder().addSortBy('prov.customid','ASCENDING') // Order by prov.customid Ascending
     *  ogapi.communicationsModulesSearchBuilder().addSortBy('prov.customid','DESCENDING') // Order by prov.customid Descending 
     * @param {!string} filterField - This field must be allowed into the specific resource
     * @param {!string} typeSort
     * @return {SearchBuilder} 
     */
    addSortBy(filterField, typeSort) {
        if (filterField && typeSort) {
            if (this._builderParams.sort.length > 0) {
                let ele = 0;
                let found = false;
                for (ele = 0; ele < this._builderParams.sort.length; ele++) {
                    if (this._builderParams.sort[ele].name === filterField) {
                        this._builderParams.sort[ele].type = typeSort;
                        found = true;
                    }
                }

                if (!found) this._builderParams.sort.push({ name: filterField, type: typeSort });
            } else {
                this._builderParams.sort.push({ name: filterField, type: typeSort });
            }
        }
        return this;
    }

    /**
     * Remove sort param from the search object 
     * @example
     *  ogapi.subscriptionsSearchBuilder().removeSortBy('prov.customid') // Remove order by prov.customid
     *  ogapi.subscriptionsSearchBuilder().removeSortBy() // Remove all order by parameters
     * @param {string} filterField - This field must be allowed into the specific resource
     * @return {SearchBuilder} 
     */
    removeSortBy(filterField) {
        if (!filterField) {
            this._builderParams.sort = [];
        } else {
            if (this._builderParams.sort.length > 0) {
                let ele = 0;
                for (ele = 0; ele < this._builderParams.sort.length; ele++) {
                    if (this._builderParams.sort[ele].name === filterField) {
                        this._builderParams.sort.splice(ele, ele + 1);
                        ele--;
                    }
                }
            }
        }

        return this;
    }

    /**
     * Set reponse pagination.
     * @example
     *  ogapi.subscribersSearchBuilder().limit(10) // Without offset
     *  ogapi.subscribersSearchBuilder().limit(25,50) //With offset value 50
     * @param {!number} size - Defined the number of elements on response
     * @param {number} [start=0] - Defined the offset on response
     * @return {SearchBuilder} 
     */
    limit(size, start = LIMIT_START_DEF_VALUE) {
        if (typeof size !== "number") throw new Error('size parameter must be a number');
        if (typeof start !== "number" || start < 1)
            start = LIMIT_START_DEF_VALUE;
        this._builderParams.limit = { size: size, start: start };
        return this;
    }

    /**
     * Build a instance of Search 
     *
     * @example
     *  ogapi.devicesSearchBuilder().onProvisioned().build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {Search} 
     */
    build() {
        return new Search(this._parent,
            this._buildUrl(),
            this._buildFilter(),
            this._buildLimit(),
            this._buildSort(),
            this._buildSelect(),
            this._builderParams.timeout);
    }

    _buildFilter() {
        let filter = this._builderParams.filter;
        if (typeof filter._filterTemplate !== "undefined")
            return filter._filterTemplate;
        return {
            filter: filter
        }
    }

    _buildSelect() {
        let select = this._builderParams.select;
        if (typeof select !== "undefined" && typeof select._selectTemplate !== "undefined")
            return select._selectTemplate;
        return {
            select: select
        }
    }
    _buildGroup() {
        let group = this._builderParams.group;
        if (typeof group !== "undefined" && typeof group._groupTemplate !== "undefined")
            return group._groupTemplate;
        return {
            group: group
        }
    }

    _buildLimit() {
        if (typeof this._builderParams.limit === "undefined")
            return {
                limit: {
                    size: LIMIT_SIZE_DEF_VALUE,
                    start: LIMIT_START_DEF_VALUE
                }
            };

        return { limit: this._builderParams.limit };
    }

    _buildSort() {
        if (this._builderParams.sort.length === 0)
            return undefined;
        return {
            sort: {
                parameters: this._builderParams.sort
            }
        };
    }

    _buildUrl() {
        if (typeof this._url !== "string" || this._url.trim().length === 0)
            throw new Error('Error on extends SearchBuilder, this._url is not defined.');
        return this._url;
    }

    _checkConstraintRoutes(isMultipleRouteEnabled = false) {
        let atLeastOneTrue = false;
        for (let route in this._routes) {
            if (atLeastOneTrue && this._builderParams[route] && !isMultipleRouteEnabled) {
                throw new Error("Must select only one of this:" + JSON.stringify(this._routesName));
            }
            atLeastOneTrue = atLeastOneTrue || this._builderParams[route];
        }
        if (!atLeastOneTrue)
            throw new Error('Must select one at least: ' + JSON.stringify(this._routesName));
    }
}