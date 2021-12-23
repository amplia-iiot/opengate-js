'use strict';

import SearchWithSummaryBuilder from './SearchWithSummaryBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';


/**
 * Defined a search over Executions	
 * @example ogapi.executionsHistorySearchBuilder()
 */
export default class ExecutionsHistorySearchBuilder extends SearchWithSummaryBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent, fieldFinder = new FieldFinder(parent, '/operations')) {
        super(parent, {}, fieldFinder);
        this._url = '/entities/operations/history';
    }
    /**
     * The response will only have a summary information 
     * @example
     *	ogapi.executionsHistorySearchBuilder().summary() 
     * @return {ExecutionsHistorySearchBuilder} 
     */
}