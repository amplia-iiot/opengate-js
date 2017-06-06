'use strict';

import ExecutionsSearchBuilder from './ExecutionsSearchBuilder';
import { TOKEN_URL } from './ExecutionsSearchBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';

/**
 * Defined a search over Alarms	
 * @example ogapi.alarmsSearchBuilder()
 */
export default class AlarmsSearchBuilder extends ExecutionsSearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, new FieldFinder(parent, '/alarms'));
        this._url = '/entities' + TOKEN_URL + '/alarms';
    }
}