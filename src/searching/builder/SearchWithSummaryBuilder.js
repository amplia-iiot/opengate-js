'use strict';

import SearchBuilder from './SearchBuilder'

/**
 * This is a abstract class. It is a class that extends from base to make all kind of summary search request to OpenGate North API.
 */
export default class SearchWithSummaryBuilder extends SearchBuilder {
    /**
     * @param {!InternalOpenGateAPI} parent - this is ogapi instance
     * @param {!object} routes - this defined the routes. One of those routes must be called on Builder before call build method.
     */
    constructor(parent, routes, fieldFinder) {
        super(parent, routes, fieldFinder);
        if (this.constructor === SearchWithSummaryBuilder) {
            throw new Error("Cannot construct Abstract instances directly");
        }
    }

    /**
     * The response will only have a summary information 
     * @example
     *	ogapi.subscriptionsSearchBuilder().summary() 
     * @return {SearchWithSummaryBuilder} 
     */
    summary() {
        this._url = this._url + '/summary';

        return this;
    }

    _buildUrl() {
        return super._buildUrl();
    }

}