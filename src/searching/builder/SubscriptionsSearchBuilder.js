'use strict';

import EntitySearchBuilder from './EntitySearchBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder'

const BASE_URL = '/subscriptions';
/**
 * Defined a search over Subscriptions	
 * @example ogapi.subscriptionsSearchBuilder()
 */
export default class SubscriptionsSearchBuilder extends EntitySearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, BASE_URL, new FieldFinder(parent, BASE_URL));
    }
}