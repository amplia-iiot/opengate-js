'use strict';

import SearchWithSummaryBuilder from './SearchWithSummaryBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';

export const TOKEN_URL = '$_token';

/**
 * Defined a search over Executions	
 * @example ogapi.executionsSearchBuilder()
 */
export default class ExecutionsSearchBuilder extends SearchWithSummaryBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent, fieldFinder = new FieldFinder(parent, '/operations')) {
        super(parent, {
            onDevices: '/devices',
            onSubscribers: '/subscribers',
            onSubscriptions: '/subscriptions',
            onCommunicationsModules: '/communicationsModules'
        }, fieldFinder);
        this._url = '/entities' + TOKEN_URL + '/operations';
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