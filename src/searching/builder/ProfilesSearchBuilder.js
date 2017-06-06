'use strict';

import SearchBuilder from './SearchBuilder';
import IotSearch from '../IotSearch';
import FieldFinder from '../../util/searchingFields/FieldFinder';

const BASE_URL = '/profiles';
/**
 * Defined a search over Profiles	
 * @example ogapi.profilesSearchBuilder()
 */
export default class ProfilesSearchBuilder extends SearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, BASE_URL));
        this._url = BASE_URL;
    }

    /**
     * Build a instance of IotSearch 
     *
     * @example
     *	ogapi.profilesSearchBuilder().filter({and:[]}).build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {IotSearch} 
     */
    build() {
        return new IotSearch(this._parent,
            this._buildUrl(),
            this._buildFilter(),
            this._buildLimit(),
            this._buildSort(),
            this._builderParams.timeout);
    }

}