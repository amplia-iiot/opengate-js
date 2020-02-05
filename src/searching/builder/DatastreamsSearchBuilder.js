'use strict';

import SearchBuilder from './SearchBuilder';
import Search from '../Search';
import FieldFinder from '../../util/searchingFields/FieldFinder';

const BASE_URL = '/datastreams';
/**
 * Defined a search over Datastreams	
 * @example ogapi.datastreamsSearchBuilder()
 */
export default class DatastreamsSearchBuilder extends SearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, BASE_URL));
        this._url = BASE_URL;
    }
}