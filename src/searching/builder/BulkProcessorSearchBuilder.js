'use strict';

import SearchBuilder from './SearchBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';

const BASE_URL = '/provisionProcessors/bulk/search';

/**
 * Searching over all the created bulk process, which are already done or still in progress.	
 * @example ogapi.bulkProcessorSearchBuilder()
 */
export default class BulkProcessorSearchBuilder extends SearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, BASE_URL));
        this._url = BASE_URL;
    }
}