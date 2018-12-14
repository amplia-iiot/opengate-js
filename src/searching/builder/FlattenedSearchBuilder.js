'use strict';

import SearchBuilder from './SearchBuilder';
import DeviceSearch from '../DeviceSearch';

/**
 * This is a abstract class. It is a class that extends from base to make all kind of summary search request to OpenGate North API.
 */
export default class FlattenedSearchBuilder extends SearchBuilder {
    /**
     * @param {!InternalOpenGateAPI} parent - this is ogapi instance
     * @param {!object} routes - this defined the routes. One of those routes must be called on Builder before call build method.
     */
    constructor(parent, routes, fieldFinder) {
        super(parent, routes, fieldFinder);
        if (this.constructor === FlattenedSearchBuilder) {
            throw new Error("Cannot construct Abstract instances directly");
        }
    }

    /**
     * The response will return a flattened response
     * @example
     *	ogapi.entitiesSearchBuilder().flattened() 
     * @return {FlattenedSearchBuilder} 
     */
    flattened() {
        this._urlParams.flattened = true;
        return this;
    }

    _buildUrl() {
        return super._buildUrl();
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
        return new DeviceSearch(this._parent,
            this._buildUrl(),
            this._buildFilter(),
            this._buildLimit(),
            this._buildSort(),
            this._buildGroup(),
            this._buildSelect(),
            this._builderParams.timeout, this._urlParams);
    }

}