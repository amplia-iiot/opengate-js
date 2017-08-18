'use strict';
import BaseProvision from '../../provision/BaseProvision'
import Category from '../catalog/Category'
import Datastream from '../catalog/Datastream'

export const PRE_RESOURCE = '/organizations';
export const POST_RESOURCE = '/datamodels';

/**
 * This is a base object for update and delete a IoT Datamodel
 */
export default class DatamodelsHelper extends BaseProvision {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - Organization where the IoT datamodel was create
     * @param {!object} datamodel - Json object of IoT datamodel to modify or delete. 
     */
    constructor(ogapi, organization, datamodel) {
        super(ogapi, PRE_RESOURCE);
        this._isValidString(organization, 'organization', 50);
        this._organization = organization;

        //no modificar este objeto, es solo para comprobaciones
        this._datamodel = datamodel;
        this._name = this._datamodel.name;
        this._isValidString(this._name, 'name of object datamodel', 100);
        this._version = this._datamodel.version;
        this._isValidString(this._version, 'version of object datamodel', 100);
        this._description = this._datamodel.description;
        this._categories = this._datamodel.categories;
        if (!this._categories) {
            throw new Error('Malformed IoT datamodel, categories not exists.');
        }
        this._identifier = this._datamodel.identifier;
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
     * @return {DatamodelsHelper}
     */
    withName(name) {
        this._isValidString(name, 'name', 100);
        this._name = name;
        return this;
    }

    /**
     * Set the version attribute
     * @param {!string} version - required field
     * @return {DatamodelsHelper}
     */
    withVersion(version) {
        this._isValidString(version, 'version', 100);
        this._version = version;
        return this;
    }

    /**
     * Set the description attribute
     * @param {string} description
     * @return {DatamodelsHelper}
     */
    withDescription(description) {
        if (description)
            this._isValidString(description, 'description', 100);
        this._description = description;
        return this;
    }

    /**
     * Add a category. If the field datastreams have value, they will add to this category
     * @param {!string} category
     * @param {Array} datastreams
     * @return {DatamodelsHelper}
     */
    addCategory(category, datastreams) {
        this._isValidString(category, 'category', 100);
        this._categories.forEach(function(_category, index) {
            if (_category.name === category) {
                throw new Error('Category ' + category + ' already exists.');
            }
        });
        let _category = new Category(this._ogapi, category);
        if (datastreams && datastreams.length > 0)
            _category.addDatastreams(datastreams);
        this._categories.push(_category._composeElement());
        return this;
    }

    /**
     * Add a datastream to the indicated category 
     * @param {!string} category
     * @param {!object} datastream
     * @return {DatamodelsHelper}
     */
    addDatastream(category, datastream) {
        this._isValidString(category, 'category', 100);
        //Buscamos category y si existe se añade a la lista de categories
        var exists_category = -1;
        this._categories.forEach(function(_category, index) {
            if (_category.name === category) {
                exists_category = index;
            }
        });
        if (exists_category === -1) {
            throw new Error('Category ' + category + ' not exists for this datamodel. Use addCategory instead.');
        }
        this._categories[exists_category].datastreams.push(datastream);
        return this;
    }

    /**
     * Remove category
     * @param {!string} category
     * @return {DatamodelsHelper}
     */
    removeCategory(category) {
        this._isValidString(category, 'category', 100);
        var remove_index = -1;
        this._categories.forEach(function(_category, index) {
            if (_category.name === category)
                remove_index = index;
        });
        if (remove_index === -1) {
            throw new Error('Category ' + category + ' not exists for this datamodel');
        }
        if (this._categories.length === 1) {
            throw new Error('Category ' + category + ' can\'t remove, datamodel can\'t be empty');
        }
        this._categories.splice(remove_index, 1);
        return this;
    }

    /**
     * Remove datastream to the indicated category
     * @param {!string} category
     * @param {!string} id_datastream of datastream
     * @return {DatamodelsHelper}
     */
    removeDatastream(category, id_datastream) {
        this._isValidString(category, 'category', 100);
        let remove_category_index = -1;
        let remove_datastream_index = -1;
        this._categories.forEach(function(_category, category_index) {
            if (_category.name === category) {
                remove_category_index = category_index;
                _category.datastreams.forEach(function(datastream, datastream_index) {
                    if (datastream.id === id_datastream) {
                        remove_datastream_index = datastream_index;
                    }
                })
            }
        });
        if (remove_category_index === -1) {
            throw new Error('Category ' + category + ' not exists for this datamodel');
        }
        if (remove_datastream_index === -1) {
            throw new Error('Datastream ' + id_datastream + ' not exists for this datamodel and category ' + category);
        }
        if (this._categories[remove_category_index].datastreams.length === 1) {
            throw new Error('Datastream ' + id_datastream + ' can\'t remove, category ' + category + ' can\'t be empty');
        }
        this._categories[remove_category_index].datastreams.splice(remove_datastream_index, 1);
        let _category = new Category(this._ogapi, category, this._categories[remove_category_index].datastreams);
        this._categories.splice(remove_category_index, 1);
        this._categories.push(_category._composeElement());
        return this;
    }

    /**
     * Update category name
     * @param {!string} old_category name
     * @param {!string} new_category name
     * @return {DatamodelsHelper}
     */
    updateCategory(old_category, new_category) {
        this._isValidString(new_category, 'new category', 100);
        this._isValidString(old_category, 'old category', 100);
        let old_category_index = -1;
        let new_category_index = -1;
        this._categories.forEach(function(category, index) {
            switch (category.name) {
                case old_category:
                    old_category_index = index;
                    break;
                case new_category:
                    new_category_index = index;
                    break;
            }
        });
        if (new_category_index != -1) {
            throw new Error('New category ' + category + ' already exists.');
        }
        if (old_category_index === -1) {
            throw new Error('Category ' + old_category + ' not exists for this datamodel.');
        }
        this._categories[old_category_index].name = new_category;
        return this;
    }

    /**
     * Update datastream to the indicated category
     * @param {!string} category
     * @param {!string} id_datastream of datastream
     * @param {!Object} datastream json object
     * @return {DatamodelsHelper}
     */
    updateDatastream(category, id_datastream, datastream) {
        this._isValidString(category, 'category', 100);
        this._isValidString(id_datastream, 'id datastream', 100);
        if (!datastream || typeof datastream !== 'object') {
            throw new Error('Datastream must be an object');
        }
        let update_category_index = -1;
        let update_datastream_index = -1;
        this._categories.forEach(function(_category, category_index) {
            if (_category.name === category) {
                update_category_index = category_index;
                _category.datastreams.forEach(function(_datastream, datastream_index) {
                    if (_datastream.id === id_datastream) {
                        update_datastream_index = datastream_index;
                    }
                });
            }
        });
        if (update_category_index === -1) {
            throw new Error('Category ' + category + ' not exists for this datamodel. Create it, use method addCategory instead');
        }
        if (update_datastream_index === -1) {
            throw new Error('Datastream ' + id_datastream + ' not exists for this datamodel and category ' + category + '. Create it, use method addDatastream instead.');
        }
        this._categories[update_category_index].datastreams[update_datastream_index] = datastream;
        return this;
    }

    _composeElement() {
        return {
            'identifier': this._identifier,
            'name': this._name,
            'version': this._version,
            'description': this._description,
            'categories': this._categories
        }
    }

    _buildURL() {
        return this._resource + '/' + this._organization + POST_RESOURCE + '/' + this._identifier;
    }

    /**
     * Create not supported on this builder. Use IoTDatamodelHelper instead.
     */
    create() {
        throw new Error('Create not supported on this builder. Use DatamodelsBuilder instead.');
    }

    _isValidString(string, param_name, max_length) {
        if (typeof string !== 'string' || string.length === 0 || string.length > max_length)
            throw new Error('Parameter ' + param_name + ' must be a string, cannot be empty and has a maximum length of ' + max_length + ' on DatamodelsHelper');
    }
}