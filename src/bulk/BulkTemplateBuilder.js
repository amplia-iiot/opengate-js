'use strict';

import BaseProvision from '../provision/BaseProvision';
import _CsvParser from './_CsvParser'
import _ExcelParser from './_ExcelParser'

/**
 * This class allow set simple values.
 */
export default class BulkTemplateBuilder extends BaseProvision {

    /**
     * @param {InternalOpenGateAPI} ogapi - required field. Reference to the API object.
     * @param {string} organization - required field 
     * @param {string} identifier 
     * @param {object} template 
     */
    constructor(ogapi, organization, identifier, template) {
        super(ogapi, '/organizations/', undefined, ['identifier', 'organization', "filetype"]);

        //Required
        this.withOrganization(organization)
        
        // only for updates
        if(identifier)
            this.withIdentifier(identifier)

        if(template){
            if(template.filetype){
                this.withFileType(template.filetype)
            }
            if(template.parser){
                this.withParser(template.parser)
            }
            if(template.mapping){
                this.withMapping(template.mapping)
            }
        }
    }

    _buildURL() {
        let url = 'provision/organizations/' + this._organization + '/bulk/templates/' + this._identifier;
        return url;
    }

     /**
     * Set the organization attribute
     * @param {string} organization - required field
     * @return {BulkTemplateBuilder}
     */
      withOrganization(organization) {
        if (typeof organization !== 'string' || organization.length === 0 || organization.length > 50)
            throw new Error('Parameter organization must be a string, cannot be empty and has a maximum length of 50');
        this._organization = organization;
        return this;
    }

    /**
     * Set the identifier attribute
     * @param {string} identifier - required field
     * @return {BulkTemplateBuilder}
     */
     withIdentifier(identifier) {
        if (typeof identifier !== 'string' || identifier.length === 0 || identifier.length > 50)
            throw new Error('Parameter identifier must be a string, cannot be empty and has a maximum length of 50');
        this._identifier = identifier;
        return this;
    }

    /**
     * Set settings used during csv parsing
     * @param {object} parser - settings used during csv parsing
     * @return {_CsvParser}
     */
     withCsvParser(parser) {
        this._parser = parser || {};

        return this;
    }

    /**
     * Set settings used during excel parsing
     * @param {object} parser - settings used during excel parsing
     * @return {_ExcelParser}
     */
     withExcelParser(parser) {
        this._parser = parser || {};

        return this;
    }
    
}