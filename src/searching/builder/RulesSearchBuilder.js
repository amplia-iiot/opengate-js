'use strict';

import SearchBuilder from './SearchBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';

const BASE_URL = '/rules';
/**
 * Defined a search over Rulse	
 * @example ogapi.rulesSearchBuilder()
 */
export default class RulesSearchBuilder extends SearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, BASE_URL));
        this._url = BASE_URL;
    }
}