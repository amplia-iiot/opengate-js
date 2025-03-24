'use strict';

export const PRE_RESOURCE = '/organizations';
export const SOFTWARES_RESOURCE = '/software';
export const SOFTWARE_TYPES_ENUM = ['SOFTWARE', 'FIRMWARE'];

import BaseProvision from '../provision/BaseProvision';
import checkType from '../util/formats/check_types'

/**
 * This is a base object that contains all you can do about Softwares.
 */
export default class Softwares extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi, organization) {
        super(ogapi, PRE_RESOURCE, undefined, ['name', 'version', 'type']);

        checkType._checkStringAndLength(organization, 50, 'organization');
        this._organization = organization;

        this._resource = this._resource + '/' + this._organization + SOFTWARES_RESOURCE;
    }

    /**
     * Set the identifier attribute
     * @param {string} id - required field
     * @return {Softwares}
     */
    withIdentifier(id) {
        checkType._checkStringAndLength(id, 100, 'id');
        this._identifier = id;
        return this;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Softwares}
     */
    withName(name) {
        checkType._checkStringAndLength(name, 100, 'name');
        this._name = name;
        return this;
    }

    /**
     * Set the version attribute
     * @param {string} version - required field
     * @return {Softwares}
     */
    withVersion(version) {
        checkType._checkStringAndLength(version, 100, 'version');
        this._version = version;
        return this;
    }

    /**
     * Set the type attribute
     * @param {string} type 
     * @return {Softwares}
     */
    withType(type) {
        checkType._checkType(type, SOFTWARE_TYPES_ENUM);
        this._type = type;
        return this;
    }

    /**
    * Set the model attribute
    * @param {string} model 
    * @return {Softwares}
    */
    withModels(models) {
        checkType._checkArray(models, 'model');
        this._models = models;
        return this;
    }

    _composeElement() {
        this._checkRequiredParameters()

        var updateData = {
            name: this._name,
            type: this._type,
            version: this._version,
            models: this._models
        };

        return updateData;
    }

    _composeUpdateElement() {
        return this._composeElement();
    }

    _buildURL() {
        return this._resource + (this._identifier ? "/" + this._identifier : "");
    }

    deleteInCascade() {
        this._setUrlParameters({
            updateEntities: true
        });

        return this.delete()
    }

    updateInCascade() {
        this._setUrlParameters({
            updateEntities: true
        });

        return this.update()
    }

}