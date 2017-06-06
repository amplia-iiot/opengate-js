'use strict';

import EntitySearchBuilder from './EntitySearchBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder'

const BASE_URL = '/communicationsModules';
/**
 * Defined a search over CommunicationsModules	
 * @example ogapi.communicationsModulesSearchBuilder()
 */
export default class CommunicationsModulesSearchBuilder extends EntitySearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, BASE_URL, new FieldFinder(parent, BASE_URL));
    }
}