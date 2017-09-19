'use strict';

import FlattenedSearchBuilder from './FlattenedSearchBuilder'
import FieldFinder from '../../util/searchingFields/FieldFinder'

const BASE_URL = '/devices';
/**
 * Defined a search over Devices	
 * @example ogapi.devicesSearchBuilder()
 */
export default class DevicesSearchBuilder extends FlattenedSearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, BASE_URL));
        this._url = BASE_URL;
    }

    /**
     * The response will only have a summary information 
     * @example
     *	ogapi.devicesSearchBuilder().summary() 
     * @return {DevicesSearchBuilder} 
     */
    summary() {
        this._url = this._url + '/summary';

        return this;
    }
}