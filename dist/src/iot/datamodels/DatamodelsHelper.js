'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _provisionBaseProvision = require('../../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

var _catalogCategory = require('../catalog/Category');

var _catalogCategory2 = _interopRequireDefault(_catalogCategory);

var _catalogDatastream = require('../catalog/Datastream');

var _catalogDatastream2 = _interopRequireDefault(_catalogDatastream);

var PRE_RESOURCE = '/organizations';
exports.PRE_RESOURCE = PRE_RESOURCE;
var POST_RESOURCE = '/datamodels';

exports.POST_RESOURCE = POST_RESOURCE;
/**
 * This is a base object for update and delete a IoT Datamodel
 */

var DatamodelsHelper = (function (_BaseProvision) {
    _inherits(DatamodelsHelper, _BaseProvision);

    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - Organization where the IoT datamodel was create
     * @param {!object} datamodel - Json object of IoT datamodel to modify or delete. 
     */

    function DatamodelsHelper(ogapi, organization, datamodel) {
        _classCallCheck(this, DatamodelsHelper);

        _get(Object.getPrototypeOf(DatamodelsHelper.prototype), 'constructor', this).call(this, ogapi, PRE_RESOURCE);
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
        this._identifier = this._datamodel.identifier;
    }

    /**
     * Set the identifier attribute
     * @param {!string} identifier - required field
     * @return {Datamodels}
     */

    _createClass(DatamodelsHelper, [{
        key: 'withIdentifier',
        value: function withIdentifier(identifier) {
            this._isValidString(identifier, 'identifier', 100);
            this._identifier = identifier;
            return this;
        }

        /**
         * Set the name attribute
         * @param {!string} name - required field
         * @return {DatamodelsHelper}
         */
    }, {
        key: 'withName',
        value: function withName(name) {
            this._isValidString(name, 'name', 100);
            this._name = name;
            return this;
        }

        /**
         * Set the version attribute
         * @param {!string} version - required field
         * @return {DatamodelsHelper}
         */
    }, {
        key: 'withVersion',
        value: function withVersion(version) {
            this._isValidString(version, 'version', 100);
            this._version = version;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description
         * @return {DatamodelsHelper}
         */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
            if (description) this._isValidString(description, 'description', 100);
            this._description = description;
            return this;
        }

        /**
         * Add a category. If the field datastreams have value, they will add to this category
         * @param {!string} category
         * @param {Array} datastreams
         * @return {DatamodelsHelper}
         */
    }, {
        key: 'addCategory',
        value: function addCategory(category, datastreams) {
            //this._isValidString(category, 'category', 100);
            if (this._categories) {
                this._categories.forEach(function (_category, index) {
                    if (_category.identifier === category.identifier) {
                        throw new Error('Category ' + category.identifier + ' already exists.');
                    }
                });
            } else {
                this._categories = [];
            }
            var _category = new _catalogCategory2['default'](this._ogapi, category.identifier);

            if (category.name) {
                _category.withName(category.name);
            }

            if (datastreams && datastreams.length > 0) _category.addDatastreams(datastreams);
            this._categories.push(_category._composeElement());
            return this;
        }

        /**
         * Add a datastream to the indicated category 
         * @param {!string} category
         * @param {!object} datastream
         * @return {DatamodelsHelper}
         */
    }, {
        key: 'addDatastream',
        value: function addDatastream(category, datastream) {
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
                this._categories[exists_category].datastreams.push(datastream);
            } else {
                this._categories[exists_category].datastreams = [datastream];
            }
            return this;
        }

        /**
         * Remove category
         * @param {!string} category
         * @return {DatamodelsHelper}
         */
    }, {
        key: 'removeCategory',
        value: function removeCategory(category) {
            this._isValidString(category, 'category', 100);
            var remove_index = -1;
            this._categories.forEach(function (_category, index) {
                if (_category.identifier === category) remove_index = index;
            });
            if (remove_index === -1) {
                throw new Error('Category ' + category + ' not exists for this datamodel');
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
    }, {
        key: 'removeDatastream',
        value: function removeDatastream(category, id_datastream) {
            this._isValidString(category, 'category', 100);
            var remove_category_index = -1;
            var remove_datastream_index = -1;
            this._categories.forEach(function (_category, category_index) {
                if (_category.identifier === category) {
                    remove_category_index = category_index;
                    _category.datastreams.forEach(function (datastream, datastream_index) {
                        if (datastream.identifier === id_datastream) {
                            remove_datastream_index = datastream_index;
                        }
                    });
                }
            });
            if (remove_category_index === -1) {
                throw new Error('Category ' + category + ' not exists for this datamodel');
            }
            if (remove_datastream_index === -1) {
                throw new Error('Datastream ' + id_datastream + ' not exists for this datamodel and category ' + category);
            }
            /* if (this._categories[remove_category_index].datastreams.length === 1) {
                 throw new Error('Datastream ' + id_datastream + ' can\'t remove, category ' + category + ' can\'t be empty');
             }*/
            this._categories[remove_category_index].datastreams.splice(remove_datastream_index, 1);
            var _category = new _catalogCategory2['default'](this._ogapi, category, this._categories[remove_category_index].datastreams);
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
    }, {
        key: 'updateCategory',
        value: function updateCategory(old_category, new_category) {
            //this._isValidString(new_category, 'new category', 100);
            this._isValidString(old_category, 'old category', 100);
            var old_category_index = -1;
            var new_category_index = -1;
            this._categories.forEach(function (category, index) {
                switch (category.identifier) {
                    case old_category:
                        old_category_index = index;
                        break;
                    case new_category.identifier:
                        new_category_index = index;
                        break;
                }
            });
            if (new_category_index != -1) {
                throw new Error('New category ' + new_category.identifier + ' already exists.');
            }
            if (old_category_index === -1) {
                throw new Error('Category ' + old_category + ' not exists for this datamodel.');
            }
            this._categories[old_category_index].name = new_category.name;
            return this;
        }

        /**
         * Update datastream to the indicated category
         * @param {!string} category
         * @param {!string} id_datastream of datastream
         * @param {!Object} datastream json object
         * @return {DatamodelsHelper}
         */
    }, {
        key: 'updateDatastream',
        value: function updateDatastream(category, id_datastream, datastream) {
            this._isValidString(category, 'category', 100);
            this._isValidString(id_datastream, 'id datastream', 100);
            if (!datastream || typeof datastream !== 'object') {
                throw new Error('Datastream must be an object');
            }
            var update_category_index = -1;
            var update_datastream_index = -1;
            this._categories.forEach(function (_category, category_index) {
                if (_category.identifier === category) {
                    update_category_index = category_index;
                    _category.datastreams.forEach(function (_datastream, datastream_index) {
                        if (_datastream.identifier === id_datastream) {
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
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            return {
                'identifier': this._identifier,
                'name': this._name,
                'version': this._version,
                'description': this._description,
                'categories': this._categories
            };
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            return this._resource + '/' + this._organization + POST_RESOURCE + '/' + this._identifier;
        }

        /**
         * Create not supported on this builder. Use IoTDatamodelHelper instead.
         */
    }, {
        key: 'create',
        value: function create() {
            throw new Error('Create not supported on this builder. Use DatamodelsBuilder instead.');
        }
    }, {
        key: '_isValidString',
        value: function _isValidString(string, param_name, max_length) {
            if (typeof string !== 'string' || string.length === 0 || string.length > max_length) throw new Error('Parameter ' + param_name + ' must be a string, cannot be empty and has a maximum length of ' + max_length + ' on DatamodelsHelper');
        }
    }]);

    return DatamodelsHelper;
})(_provisionBaseProvision2['default']);

exports['default'] = DatamodelsHelper;
//# sourceMappingURL=DatamodelsHelper.js.map
