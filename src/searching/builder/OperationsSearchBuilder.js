'use strict';

import SearchWithSummaryBuilder from './SearchWithSummaryBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';

const BASE_URL = '/jobs';
/**
 * Defines a search over executions' operations.
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