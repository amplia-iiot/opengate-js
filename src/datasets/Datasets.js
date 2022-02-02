'use strict';

import BaseProvision from '../provision/BaseProvision';
import checkType from '../util/formats/check_types'
export const DATASETS_TYPES_ENUM = ['CURRENT', 'HISTORY'];
/**
 * This is a base object that contains all you can do about Datasets.
 */

export default class Datasets extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, '/organizations/', undefined, ['name', 'organization', "type", 'columns']);
    }

    _buildURL() {
        let url = '/datasets/provision/organizations/' + this._organization + '/' + this._identifier;
        return url;
    }

    /**
     * Set the organization attribute
     * @param {string} organization - required field
     * @return {Datasets}
     */
    withOrganization(organization) {
        checkType._checkString(organization, 50, 'organization');
        this._organization = organization;
        return this;
    }

    /**
     * Set the identifier attribute
     * @param {string} identifier - required field
     * @return {Datasets}
     */
     withIdentifier(identifier) {
        checkType._checkString(identifier, 50, 'identifier');
        this._identifier = identifier;
        return this;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Datasets}
     */
    withName(name) {
        checkType._checkString(name, 50, 'name');
        this._name = name;
        return this;
    }

    /**
    * Set the type attribute
    * @param {string} type - required field
    * @return {Datasets}
    */
    withType(type) {
        checkType._checkType(type, DATASETS_TYPES_ENUM);
        this._type = type;
        return this;
    }

    /**
     * Set the description attribute
     * @param {string} description
     * @return {Datasets}
     */
    withDescription(description) {
        checkType._checkString(description, 50, 'description');
        this._description = description;
        return this;
    }
    /**
     * Set the columns attribute
     * @param {array} columns - required field
     * @return {Datasets}
     */
  withColumns(columns) {
    checkType._checkArray(columns, 'columns');
    this._columns = columns;
    return this;
}
    

    _composeElement() {
        this._resource = '/datasets/provision/organizations/' + this._organization;
        let dataset = {
            name: this._name,
            description: this._description,
            type: this._type,
            columns: this._columns
        };
        return dataset;
    }

    /**
     * This method invalidates the update option
     * @throws {Allways} Datasets cannot be updated.
     */
     update() {
        throw new Error("OGAPI_DAATASET_NOT_UPDATED");
    }
}