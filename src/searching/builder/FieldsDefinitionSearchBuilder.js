'use strict';

import SearchBuilder from './SearchBuilder';
import StaticSearch from '../StaticSearch';

/**
 * Defined a search over operational status catalogs    
 * @example ogapi.fieldsDefinitionSearchBuilder()
 */
export default class FieldsDefinitionSearchBuilder extends SearchBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {});
        this._url = '/fieldsDefinition';
        this.customFilters = {};
    }

    /**
     * Build a instance of StaticSearch 
     *
     * @example
     *   ogapi.FieldsDefinitionSearchBuilder().build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {StaticSearch}  
     */
    build() {
        return new StaticSearch(this._parent,
            this._buildUrl(),
            this._buildFilter(),
            this._builderParams.timeout,
            'fieldsDefinition', this.customFilters);
    }


    /**
     * Sets id to search
     *
     * @description
     * The list of types of communication modules is as follows:
     * "string", "boolean", "calendar", "address", "number", "enumeration", "array", "coordinates", "topology", "object"
     * @example
     *  ogapi.fieldsDefinitionSearchBuilder().withType('string').build()
     * @param {!string} fieldDefinitionType - specific type
     * @throws {Error} throw error when type is not typeof string
     * @return {fieldsDefinitionSearchBuilder}
     */
    withType(fieldDefinitionType) {
        if (typeof fieldDefinitionType !== 'string') {
            throw new Error('Parameter type must be a string');
        }

        this.customFilters.type = fieldDefinitionType;
        return this;
    }


}
