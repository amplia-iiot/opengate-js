'use strict';

import SearchBuilder from './SearchBuilder';
import StaticSearch from '../StaticSearch';

/**
 * Defined a search over operational status catalogs    
 * @example ogapi.administrativeStateSearchBuilder()
 */
export default class AdministrativeStateSearchBuilder extends SearchBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {});
        this._url = '/administrativeState';
        this.customFilters = {};
    }

    /**
     * Build a instance of StaticSearch 
     *
     * @example
     *   ogapi.administrativeStateSearchBuilder().filter({and:[]}).build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {StaticSearch}  
     */
    build() {
        return new StaticSearch(this._parent,
            this._buildUrl(),
            this._buildFilter(),
            this._builderParams.timeout,
            'administrativeState', this.customFilters);
    }


    /**
     * Sets id to search
     *
     * @example
     *  ogapi.administrativeStateSearchBuilder().withId('myId').build()
     * @param {!string} administrativeStateId - specific type id
     * @throws {Error} throw error when hardwareId is not typeof string
     * @return {AdministrativeStateSearchBuilder} 
     */
    withId(administrativeStateId) {
        if (typeof administrativeStateId !== 'string') {
            throw new Error('Parameter id must be a string');
        }

        //this.fluentFilter.and(this._parent.EX.eq('id', administrativeStateId));

        this.customFilters.id = administrativeStateId;
        return this;
    }

    /**
     * Set entityType to search
     *
     * @example
     *  ogapi.administrativeStateSearchBuilder().withEntityType('myEntityType').build()
     * @param {!string} entityType - model name
     * @throws {Error} throw error when entityType is not typeof string
     * @return {AdministrativeStateSearchBuilder} 
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
