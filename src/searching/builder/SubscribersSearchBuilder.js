'use strict';

import EntitySearchBuilder from './EntitySearchBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';

const BASE_URL = '/subscribers';
/**
 * Defined a search over Subscribers	
 * @example ogapi.subscribersSearchBuilder()
 */
export default class SubscribersSearchBuilder extends EntitySearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, BASE_URL, new FieldFinder(parent, BASE_URL));
    }
}