'use strict';

import SearchBuilder from './SearchBuilder'
import StaticSearch from '../StaticSearch';

/**
 * Defined a search over operational status catalogs    
 * @example ogapi.specificTypeSearchBuilder()
 */
export default class SpecificTypeSearchBuilder extends SearchBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {});

        this._url = '/specificType';
        //this.fluentFilter = parent.newFilterBuilder();
        this.customFilters = {};
    }

    /**
     * Build a instance of StaticSearch 
     *
     * @example
     *   ogapi.specificTypeSearchBuilder().filter({and:[]}).build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {StaticSearch} 
     */
    build() {
        return new StaticSearch(this._parent,
            this._buildUrl(),
            this._buildFilter(),
            this._builderParams.timeout,
            'specificType', this.customFilters);
    }


    /**
     * Sets id to search
     *
     * @example
     *  ogapi.specificTypeSearchBuilder().withId('myId').build()
     * @param {!string} specificTypeId - specific type id
     * @throws {Error} throw error when hardwareId is not typeof string
     * @return {SpecificTypeSearchBuilder} 
     */
    withId(specificTypeId) {
        if (typeof specificTypeId !== 'string') {
            throw new Error('Parameter id must be a string');
        }

        //this.fluentFilter.and(this._parent.EX.eq('id', specificTypeId));

        this.customFilters.id = specificTypeId;
        return this;
    }

    /**
     * Set entityType to search
     *
     * @example
     *  ogapi.specificTypeSearchBuilder().withEntityType('myEntityType').build()
     * @param {!string} entityType - model name
     * @throws {Error} throw error when entityType is not typeof string
     * @return {SpecificTypeSearchBuilder} 
     */
    withEntityType(entityType) {
        if (typeof entityType !== 'string') {
            throw new Error('Parameter entityType must be a string');
        }

        //if (!this._content[entityType]) {
        //    throw new Error('Parameter entityType must be one of the following: device or communicationsModule')
        //}

        //this.fluentFilter.and(this._parent.EX.eq('entityType', entityType));

        this.customFilters.entityType = entityType;

        return this;
    }

}
