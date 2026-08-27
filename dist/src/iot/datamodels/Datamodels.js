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

var PRE_RESOURCE = '/organizations';
exports.PRE_RESOURCE = PRE_RESOURCE;
var DATAMODELS_RESOURCE = '/datamodels';
exports.DATAMODELS_RESOURCE = DATAMODELS_RESOURCE;
/**
 * This is a base object for create a IoT Datamodel
 */

var Datamodels = (function (_BaseProvision) {
    _inherits(Datamodels, _BaseProvision);

    /**
     * Constructor
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - Organization where the IoT datamodel will be created
     */

    function Datamodels(ogapi, organization) {
        _classCallCheck(this, Datamodels);

        _get(Object.getPrototypeOf(Datamodels.prototype), 'constructor', this).call(this, ogapi, PRE_RESOURCE);
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

    _createClass(Datamodels, [{
        key: 'withIdentifier',
        value: function withIdentifier(identifier) {
            this._isValidString(identifier, 'identifier', 100);
            this._identifier = identifier;
            return this;
        }

        /**
         * Set the name attribute
         * @param {!string} name - required field
         * @return {Datamodels}
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
         * @return {Datamodels}
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
         * @return {Datamodels}
         */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
            if (description) this._isValidString(description, 'description', 100);
            this._description = description;
            return this;
        }

        /**
         * Set the addAllowedResourceType attribute
         * @param {string} resourceType - required field
         * @return {Datamodels}
         */
    }, {
        key: 'addAllowedResourceType',
        value: function addAllowedResourceType(resourceType) {
            if (resourceType) this._isValidString(resourceType, 'resourceType', 100);
            this._resourceType.push(resourceType);
            return this;
        }

        /**
         * Add a flavor. If the field datastreams have value, they will add to this flavor
         * @param {!Object} category
         * @param {!Array} datastreams
         * @return {Datamodels}
         */
    }, {
        key: 'addCategory',
        value: function addCategory(category, datastreams) {
            var id = category.identifier;
            if (!id || this._isValidString(id, 'category', 100)) {
                throw new Error('Category identifier is required');
            }
            this._categories.forEach(function (_category, index) {
                if (id === _category.identifier) {
                    throw new Error('Category ' + id + ' already exists.');
                }
            });
            var _category = new _catalogCategory2['default'](this._ogapi, id);
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
         * @return {Datamodels}
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
    }, {
        key: '_composeElement',
        value: function _composeElement() {
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
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            return this._resource;
        }

        /**
         * Update not supported on this builder. Use IoTDatamodelHelper instead.
         */
    }, {
        key: 'update',
        value: function update() {
            throw new Error('Update not supported on this builder. Use datamodelsHelper instead.');
        }

        /**
         * Delete not supported on this builder. Use IoTDatamodelHelper instead.
         */
    }, {
        key: 'delete',
        value: function _delete() {
            throw new Error('Delete not supported on this builder. Use datamodelsHelper instead.');
        }
    }, {
        key: '_isValidString',
        value: function _isValidString(string, param_name, max_length) {
            if (typeof string !== 'string' || string.length === 0 || string.length > max_length) throw new Error('Parameter ' + param_name + ' must be a string, cannot be empty and has a maximum length of ' + max_length + 'on IoTDatamodel');
        }
    }]);

    return Datamodels;
})(_provisionBaseProvision2['default']);

exports['default'] = Datamodels;
//# sourceMappingURL=Datamodels.js.map
