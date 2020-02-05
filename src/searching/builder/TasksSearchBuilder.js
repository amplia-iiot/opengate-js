'use strict';

import SearchWithSummaryBuilder from './SearchWithSummaryBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';

const BASE_URL = '/tasks';
/**
 * Defined a search over periodic executions´s operations
 * @example ogapi.tasksSearchBuilder()
 */
export default class TasksSearchBuilder extends SearchWithSummaryBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, BASE_URL));
        this._url = BASE_URL;
    }
}