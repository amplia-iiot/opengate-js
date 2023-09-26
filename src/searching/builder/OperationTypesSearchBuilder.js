'use strict';

import SearchBuilder from './SearchBuilder';
import FieldFinder from '../../util/searchingFields/FieldFinder';
import SearchWithoutLimit from '../SearchWithoutLimit';
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


    /**
     * Build a instance of Search 
     *
     * @example
     *  ogapi.devicesSearchBuilder().onProvisioned().build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {Search} 
     */
    build() {
        try{
            
        return new SearchWithoutLimit(this._parent,
            this._buildUrl(),
            this._buildFilter(),
            this._buildSort(),
            this._buildGroup(),
            this._buildSelect(),
            this._builderParams.timeout,
            this._urlParams);
        }
        catch(error){
            console.error('!errrrror!!!!!!', error)
        }
    }
}