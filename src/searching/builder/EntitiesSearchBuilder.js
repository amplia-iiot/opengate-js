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

    _buildUrl() {
        this._checkConstraintRoutes();
        for (let route in this._routes) {
            if (this._builderParams[route]) {
                this._url = this._url.replace(TOKEN_URL, this._routes[route]);
            }
        }
        return super._buildUrl();
    }


}