'use strict';
import BaseProvision from '../../provision/BaseProvision';
import Category from '../catalog/Category';
import Datastream from '../catalog/Datastream';

export const PRE_RESOURCE = '/organizations';
export const DATAMODELS_RESOURCE = '/datamodels';
/**
 * This is a base object for create a IoT Datamodel
 */
export default class Datamodels extends BaseProvision {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - Organization where the IoT datamodel will be created
     */
    constructor(ogapi, organization) {
        super(ogapi, PRE_RESOURCE);
        this._isValidString(organization, 'organization', 50);
        this._organization = organization;
        this._categories = [];
        this._resourceType = [];
        this._resource = this._resource + '/' + this._organization + DATAMODELS_RESOURCE;
    }

    /**
     * Set the identifier attribute
     * @param {!string} identifier - required field
     * @return {Datamodels}
     */
    withIdentifier(identifier) {
        this._isValidString(identifier, 'identifier', 100);
        this._identifier = identifier;
        return this;
    }

    /**
     * Set the name attribute
     * @param {!string} name - required field
     * @return {Datamodels}
     */
    withName(name) {
        this._isValidString(name, 'name', 100);
        this._name = name;
        return this;
    }

    /**
     * Set the version attribute
     * @param {!string} version - required field
     * @return {Datamodels}
     */
    withVersion(version) {
        this._isValidString(version, 'version', 100);
        this._version = version;
        return this;
    }

    /**
     * Set the description attribute
     * @param {string} description
     * @return {Datamodels}
     */
    withDescription(description) {
        if (description)
            this._isValidString(description, 'description', 100);
        this._description = description;
        return this;
    }

    /**
     * Set the addAllowedResourceType attribute
     * @param {string} resourceType - required field
     * @return {Datamodels}
     */
    addAllowedResourceType(resourceType) {
        if (resourceType)
            this._isValidString(resourceType, 'resourceType', 100);
        this._resourceType.push(resourceType);
        return this;
    }
    /**
     * Add a flavor. If the field datastreams have value, they will add to this flavor
     * @param {!Object} category
     * @param {!Array} datastreams
     * @return {Datamodels}
     */
    addCategory(category, datastreams) {
        let id = category.identifier;
        if (!id || this._isValidString(id, 'category', 100)) {
            throw new Error('Category identifier is required');
        }
        this._categories.forEach(function (_category, index) {
            if (id === _category.identifier) {
                throw new Error('Category ' + id + ' already exists.');
            }
        });
        let _category = new Category(this._ogapi, id);
        if (category.name) {
            _category.withName(category.name);
        }
        if (datastreams && datastreams.length > 0)
            _category.addDatastreams(datastreams);
        this._categories.push(_category._composeElement());
        return this;
    }

    /**
     * Add a datastream to the indicated category
     * @param {!string} category
     * @param {!object} datastream
     * @return {Datamodels}
     */
    addDatastream(category, datastream) {
        this._isValidString(category, 'category', 100);
        //Buscamos category y si existe se añade a la lista de categories
        var exists_category = -1;
        this._categories.forEach(function (_category, index) {
            if (_category.identifier === category) {
                exists_category = index;
            }
        });
        if (exists_category === -1) {
            throw new Error('Category ' + category + ' not exists for this datamodel. Use addCategory instead.');
        }
        if (this._categories[exists_category].datastreams) {
            this._categories[exists_category].datastreams.push(datastream)
        } else {
            this._categories[exists_category].datastreams = [datastream];
        }
        return this;
    }

    _composeElement() {
        if (!this._name) {
            throw new Error('name is required on IoTDatamodel');
        }

        if (!this._version) {
            throw new Error('version is required on IoTDatamodel');
        }

        if (!this._resourceType) {
            throw new Error('allowedResourceTypes is required on IoTDatamodel');
        }

        return {
            'identifier': this._identifier,
            'name': this._name,
            'version': this._version,
            'description': this._description,
            'allowedResourceTypes': this._resourceType,
            'categories': this._categories.length > 0 ? this._categories : undefined
        };
    }

    _buildURL() {
        //console.log('URL: ' + this._resource);
        return this._resource;
    }

    /**
     * Update not supported on this builder. Use IoTDatamodelHelper instead.
     */
    update() {
        throw new Error('Update not supported on this builder. Use datamodelsHelper instead.');
    }

    /**
     * Delete not supported on this builder. Use IoTDatamodelHelper instead.
     */
    delete() {
        throw new Error('Delete not supported on this builder. Use datamodelsHelper instead.');
    }

    _isValidString(string, param_name, max_length) {
        if (typeof string !== 'string' || string.length === 0 || string.length > max_length)
            throw new Error('Parameter ' + param_name + ' must be a string, cannot be empty and has a maximum length of ' + max_length + 'on IoTDatamodel');
    }
}