'use strict';

import SearchWithSummaryBuilder from './SearchWithSummaryBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';

export const TOKEN_URL = '$_token';

/**
 * Defined a search over Alarms	
 * @example ogapi.alarmsSearchBuilder()
 */
export default class AlarmsSearchBuilder extends SearchWithSummaryBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent, fieldFinder = new FieldFinder(parent, '/alarms')) {
        super(parent, { onDevices: '/devices', onSubscriptions: '/subscriptions' }, fieldFinder);
        this._url = '/entities' + TOKEN_URL + '/alarms';
    }

    _buildUrl() {
        for (let route in this._routes) {
            if (this._builderParams[route]) {
                this._url = this._url.replace(TOKEN_URL, this._routes[route]);
            }
        }
        this._url = this._url.replace(TOKEN_URL, '');
        return super._buildUrl();
    }
}