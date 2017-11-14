'use strict';

import SearchWithSummaryBuilder from './SearchWithSummaryBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';

export const TOKEN_URL = '$_token';

/**
 * Defined a search over Executions	
 * @example ogapi.entitiesSearchBuilder()
 */
export default class EntitiesSearchBuilder extends SearchWithSummaryBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent, fieldFinder = new FieldFinder(parent, '/entities')) {
        super(parent, {
            onDevices: '/devices',
        }, fieldFinder);
        this._url = '/entities' + TOKEN_URL ;
    }

     /**
     * The response will return a flattened response
     * @example
     *	ogapi.entitiesSearchBuilder().flattened() 
     * @return {FlattenedSearchBuilder} 
     */
    flattened() {
        this._url = this._url + '?flattened=true';

        return this;
    }

    _buildUrl() {
        for (let route in this._routes) {
            if (this._builderParams[route]) {
                this._url = this._url.replace(TOKEN_URL, this._routes[route]);
            }
        }
        this._url = this._url.replace(TOKEN_URL, '')
        return super._buildUrl();
    }


}