'use strict';

import SearchBuilder from './SearchBuilder';
import StaticSearch from '../StaticSearch';

/**
 * Defined a search over operational status catalogs    
 * @example ogapi.operationalStatusSearchBuilder()
 */
export default class OperationalStatusSearchBuilder extends SearchBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {});
        this._url = '/operationalStatus';
        this.customFilters = {};
    }

    /**
     * Build a instance of StaticSearch 
     *
     * @example
     *   ogapi.operationalStatusSearchBuilder().filter({and:[]}).build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {StaticSearch} 
     */
    build() {
        return new StaticSearch(this._parent,
            this._buildUrl(),
            this._buildFilter(),
            this._builderParams.timeout,
            'operationalStatus', this.customFilters);
    }


    /**
     * Sets id to search
     *
     * @example
     *  ogapi.operationalStatusSearchBuilder().withId('myId').build()
     * @param {!string} operationalStatusId - operational status id
     * @throws {Error} throw error when hardwareId is not typeof string
     * @return {OperationalStatusSearchBuilder} 
     */
    withId(operationalStatusId) {
        if (typeof operationalStatusId !== 'string') {
            throw new Error('Parameter id must be a string');
        }

        //this.fluentFilter.and(this._parent.EX.eq('id', operationalStatusId));

        this.customFilters.id = operationalStatusId;
        return this;
    }

    /**
     * Set entityType to search
     *
     * @example
     *  ogapi.operationalStatusSearchBuilder().withEntityType('myEntityType').build()
     * @param {!string} entityType - model name
     * @throws {Error} throw error when entityType is not typeof string
     * @return {OperationalStatusSearchBuilder} 
     */
    withEntityType(entityType) {
        if (typeof entityType !== 'string') {
            throw new Error('Parameter entityType must be a string');
        }

        //if (!this._content[entityType]) {
        //    throw new Error('Parameter entityType must be one of the following: device or communicationsModule')
        //}

        // this.fluentFilter.and(this._parent.EX.eq('entityType', entityType));

        this.customFilters.entityType = entityType;

        return this;
    }

}
