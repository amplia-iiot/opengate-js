'use strict';

import SearchBuilder from './SearchBuilder';
import StaticSearch from '../StaticSearch';

/**
 * Defined a search over operational status catalogs    
 * @example ogapi.userProfileSearchBuilder()
 */
export default class UserProfilesSearchBuilder extends SearchBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {});

        this._url = '/userProfile';
        //this.fluentFilter = parent.newFilterBuilder();
        this.customFilters = {};
    }

    /**
     * Build a instance of StaticSearch 
     *
     * @example
     *   ogapi.userProfileSearchBuilder().filter({and:[]}).build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {StaticSearch} 
     */
    build() {
        return new StaticSearch(this._parent,
            this._buildUrl(),
            this._buildFilter(),
            this._builderParams.timeout,
            'userProfile', this.customFilters);
    }


    /**
     * Sets id to search
     *
     * @example
     *  ogapi.userProfileSearchBuilder().withId('myId').build()
     * @param {!string} userProfileId - user profile id
     * @throws {Error} throw error when user profile id is not typeof string
     * @return {userProfileSearchBuilder} 
     */
    withId(userProfileId) {
        if (typeof userProfileId !== 'string') {
            throw new Error('Parameter id must be a string');
        }

        //this.fluentFilter.and(this._parent.EX.eq('id', userProfileId));

        this.customFilters.id = userProfileId;
        return this;
    }
}