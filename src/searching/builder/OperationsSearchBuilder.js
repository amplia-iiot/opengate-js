'use strict';

import SearchWithSummaryBuilder from './SearchWithSummaryBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';
import merge from 'merge';

const BASE_URL = '/jobs';
/**
 * Defined a search over executions´s opreations
 * @example ogapi.operationsSearchBuilder()
 */
export default class OperationsSearchBuilder extends SearchWithSummaryBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, BASE_URL));
        this._url = BASE_URL;
    }
}