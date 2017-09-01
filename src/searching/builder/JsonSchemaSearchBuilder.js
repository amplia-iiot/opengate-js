'use strict';

import SearchBuilder from './SearchBuilder'
import og_basic_types from './jsonSchema/og_basic_types'
import q from 'q';
let jp = require('jsonpath');


/**
 * Defined a search over jsonchema List
 * @example ogapi.jsonSchemaSearchBuilder()
 */
export default class JsonSchemaSearchBuilder extends SearchBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {});
        this._url = '/jsonSchemaDefinition';
        this.customFilters = {};
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
    _getPathValue(path) {
        let _this = this;
        path = path.split("#/")[1].replace(/\//gi, ".");
        var jsonSchemaValue = jp.value(og_basic_types, path);
        if (jsonSchemaValue) {
            var nodes = jp.nodes(jsonSchemaValue, "$..['$ref']");
            if (nodes.length > 0) {
                nodes.forEach(function(element, index) {
                    element.path.pop(); //eliminamos $ref
                    var pathExpression = jp.stringify(element.path);
                    var newnodes = jp.apply(jsonSchemaValue, pathExpression, function(value) {
                        return _this._getPathValue(element.value);
                    });
                });
                return jsonSchemaValue;
            } else {
                return jsonSchemaValue
            }
        }
        return null;
    }

    /**
     * Build a instance of JsonSchemaSearchBuilder 
     *
     * @example
     *   ogapi.JsonSchemaSearchBuilder().build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {StaticSearch}  
     */
    build() {
        if (!this.path) {
            throw new Error('Path attributte is mandatory');
        }
        let path = this.path.split("#/")[1].replace(/\//gi, ".");
        if (!jp.value(og_basic_types, path)) {
            throw new Error('Path not found');
        }
        return this;
    }

    execute() {
        let defered = q.defer();
        let promise = defered.promise;
        let jsonSchema = this._getPathValue(this.path);
        if (jsonSchema) {
            defered.resolve({ data: jsonSchema, statusCode: 200 });
        } else {
            defered.resolve({ data: 'No content', statusCode: 204 });
        }
        return promise;
    }



    /**
     * Sets path to search
     *
     * @description
     * @example
     *  ogapi.JsonSchemaSearchBuilder().withPath('string').build()
     * @param {!string} jsonSchemaPath - path
     * @return {JsonSchemaSearchBuilder}
     */
    withPath(path) {
        this.path = path;
        return this;
    }


}