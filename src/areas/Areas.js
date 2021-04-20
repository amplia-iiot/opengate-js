'use strict';

import { TYPE_ENUM } from './TYPE_ENUM';
import BaseProvision from '../provision/BaseProvision';
import checkType from '../util/formats/check_types'
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
        checkType._checkString(organization, 50, 'organization');
        this._organization = organization;
        return this;
    }


    /**
     * Set the identifier attribute
     * @param {string} identifier - required field
     * @return {Areas}
     */
    withIdentifier(identifier) {
        checkType._checkString(identifier, 50, 'identifier');
        this._identifier = identifier;
        return this;
    }
    /**
     * Set the color attribute
     * @param {string} color - required field
     * @return {Areas}
     */
    withColor(name) {
        checkType._checkString(name, 50, 'color');
        this._color = color;
        return this;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Areas}
     */
    withName(name) {
        checkType._checkString(name, 50, 'name');
        this._name = name;
        return this;
    }

    /**
     * Set the description attribute
     * @param {string} description - required field
     * @return {Areas}
     */
    withDescription(description) {
        checkType._checkString(description, 50, 'description');
        this._description = description;
        return this;
    }


    /**
     * Set the order attribute
     * @param {number} order - required field
     * @return {Areas}
     */
    withOrder(order) {
        checkType._checkNumber(order, 'order');
        this._order = order;
        return this;
    }


    /**
     * Set the geometry attribute
     * @param {string} type - required field
     * @param {array} coordinates - required field
     * @return {Areas}
     */
    withGeometry(type, coordinates) {
        checkType._checkType(type, TYPE_ENUM);
        checkType._checkArray(coordinates, 'coordinates');
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
        checkType._checkArray(entities, 'entities');
        this._entities = entities;
        return this;
    }


    _composeElement() {
        this._resource = 'provision/organizations/' + this._organization + '/areas/';
        let area = {
            identifier: this._identifier,
            name: this._name,
            description: this._description,
            order: this._order,
            color: this._color,

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