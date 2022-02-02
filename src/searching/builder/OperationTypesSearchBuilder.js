'use strict';

import SearchBuilder from './SearchBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';

const BASE_URL = '/operationTypes';
/**
 * Defined a search over operationTypes	
 * @example ogapi.rulesSearchBuilder()
 */
export default class OperationTypesBuilder extends SearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, BASE_URL));
        this._url = BASE_URL;
    }
}