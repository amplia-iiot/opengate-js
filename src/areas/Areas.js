'use strict';

import { TYPE_ENUM } from './TYPE_ENUM';

import q from 'q';
import BaseProvision from '../provision/BaseProvision'

/**
 * This is a base object that contains all you can do about Areas.
 */

export default class Areas extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, '/organizations/', undefined, ['identifier', 'organization', "type", 'coordinates']);
    }

    _buildURL() {
        let url = 'provision/organizations/' + this._organization + '/areas/' + this._identifier;
        return url;
    }

    /**
     * Set the organization attribute
     * @param {string} organization - required field
     * @return {Areas}
     */
    withOrganization(organization) {
        this._checkString(organization, 50, 'organization');
        this._organization = organization;
        return this;
    }

    /**
     * Set the identifier attribute
     * @param {string} identifier - required field
     * @return {Areas}
     */
    withIdentifier(identifier) {
        this._checkString(identifier, 50, 'identifier');
        this._identifier = identifier;
        return this;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Areas}
     */
    withName(name) {
        this._checkString(name, 50, 'name');
        this._name = name;
        return this;
    }

    /**
     * Set the description attribute
     * @param {string} description - required field
     * @return {Areas}
     */
    withDescription(description) {
        this._checkString(description, 50, 'description');
        this._description = description;
        return this;
    }

    /**
     * Set the geometry attribute
     * @param {string} type - required field
     * @param {array} coordinates - required field
     * @return {Areas}
     */
    withGeometry(type, coordinates) {
        this._checkType(type);
        this._checkArray(coordinates, 'coordinates');
        this._type = type;
        this._coordinates = coordinates;
        return this;
    }

    /**
     * Set the entities attribute
     * @param {array} entities - required field
     * @return {Areas}
     */
    withEntities(entities) {
        this._checkArray(entities, 'entities');
        this._entities = entities;
        return this;
    }

    /* fields validations */
    _checkType(type) {
        let not_found = [];
        let found = TYPE_ENUM.find(function(type) {
            return type == this;
        }, type);

        if (typeof found === "undefined") {
            not_found.push(type);
        }
        if (not_found.length !== 0) {
            throw new Error({ message: "OGAPI_NOT_ALLOWED_PARAMETER", parameter: JSON.stringify(not_found), allowed: JSON.stringify(TYPE_ENUM) });
        }
        return type;
    }

    _checkString(parameter, length, name) {
        if (typeof parameter !== 'string' || parameter.length > length) {
            throw new Error([{ message: 'OGAPI_STRING_PARAMETER', parameter: name }, { message: 'OGAPI_MAX_LENGTH', parameter: length }]);
        }
    }

    _checkArray(parameter, name) {
        if (!Array.isArray(parameter) || parameter.length === 0) {
            throw new Error({ message: 'OGAPI_ARRAY_PARAMETER', parameter: name });
        }
    }

    _composeElement() {
        this._resource = 'provision/organizations/' + this._organization + '/areas/';
        let area = {
            identifier: this._identifier,
            name: this._name,
            description: this._description,
            geometry: {
                type: this._type,
                coordinates: this._coordinates
            },
            entities: this._entities
        };
        return area;
    }

    _composeUpdateElement() {
        let area = super._composeUpdateElement();
        delete area.identifier;
        return area;
    }
}