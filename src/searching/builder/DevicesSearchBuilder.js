'use strict';

import SearchBuilder from './SearchBuilder'
import EntitySearchBuilder from './EntitySearchBuilder'
import FieldFinder from '../../util/searchingFields/FieldFinder'

const BASE_URL = '/devices';
/**
 * Defined a search over Devices	
 * @example ogapi.devicesSearchBuilder()
 */
export default class DevicesSearchBuilder extends EntitySearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, BASE_URL, new FieldFinder(parent, BASE_URL));
    }
}