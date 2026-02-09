'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _provisionBaseProvision = require('../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

var _Manufacturer = require('./Manufacturer');

var PRE_RESOURCE = '/organizations';
exports.PRE_RESOURCE = PRE_RESOURCE;
var MODELS_RESOURCE = '/models';

exports.MODELS_RESOURCE = MODELS_RESOURCE;
/**
 * This is a base object that contains all you can do about Models.
 */

var Models = (function (_BaseProvision) {
    _inherits(Models, _BaseProvision);

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function Models(ogapi, organization, manufacturer) {
        _classCallCheck(this, Models);

        _get(Object.getPrototypeOf(Models.prototype), 'constructor', this).call(this, ogapi, PRE_RESOURCE, undefined, ['name']);
        this._isValidString(organization, 'organization', 50);
        this._isValidString(manufacturer, 'manufacturer', 50);
        this._organization = organization;
        this._manufacturer = manufacturer;

        // super(ogapi, "/models", undefined, ['identifier', 'name', 'manufacturer']);

        this._resource = this._resource + '/' + this._organization + _Manufacturer.MANUFACTURERS_RESOURCE + "/" + manufacturer + MODELS_RESOURCE;
    }

    /**
     * Set the identifier attribute
     * @param {string} id - required field
     * @return {Models}
     */

    _createClass(Models, [{
        key: 'withIdentifier',
        value: function withIdentifier(id) {
            if (typeof id !== 'string' || id.length > 50) throw new Error("OGAPI_STRING_PARAMETER_MAX_LENGTH_50");
            this._identifier = id;
            return this;
        }

        /**
         * Set the name attribute
         * @param {string} name - required field
         * @return {Models}
         */
    }, {
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string') throw new Error("OGAPI_STRING_PARAMETER");
            this._name = name;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description - required field
         * @return {Models}
         */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
            if (typeof description !== 'string') throw new Error("OGAPI_STRING_PARAMETER");
            this._description = description;
            return this;
        }

        /**
         * Set the notes attribute
         * @param {string} notes 
         * @return {Models}
         */
    }, {
        key: 'withNotes',
        value: function withNotes(notes) {
            if (typeof notes !== 'string') throw new Error("OGAPI_STRING_PARAMETER");
            this._notes = notes;
            return this;
        }

        /**
         * Set the url attribute
         * @param {string} url 
         * @return {Models}
         */
    }, {
        key: 'withUrl',
        value: function withUrl(url) {
            if (typeof url !== 'string') throw new Error("OGAPI_STRING_PARAMETER");
            this._modelUrl = url;
            return this;
        }

        /**
         * Set the version attribute
         * @param {string} version 
         * @return {Models}
         */
    }, {
        key: 'withVersion',
        value: function withVersion(version) {
            if (typeof version !== 'string') throw new Error("OGAPI_STRING_PARAMETER");
            this._version = version;
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._checkRequiredParameters();

            var updateData = {
                name: this._name || undefined,
                description: this._description || undefined,
                version: this._version || undefined,
                notes: this._notes || undefined,
                url: this._modelUrl || undefined
            };

            return updateData;
        }
    }, {
        key: '_composeUpdateElement',
        value: function _composeUpdateElement() {
            return this._composeElement();
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            return this._resource + (this._identifier ? "/" + this._identifier : "");
        }
    }, {
        key: 'deleteInCascade',
        value: function deleteInCascade() {
            this._setUrlParameters({
                updateDevices: true
            });

            return this['delete']();
        }
    }, {
        key: 'updateInCascade',
        value: function updateInCascade() {
            this._setUrlParameters({
                updateDevices: true
            });

            return this.update();
        }
    }, {
        key: '_isValidString',
        value: function _isValidString(string, param_name, max_length) {
            if (typeof string !== 'string' || string.length === 0 || string.length > max_length) throw new Error('Parameter ' + param_name + ' must be a string, cannot be empty and has a maximum length of ' + max_length);
        }
    }]);

    return Models;
})(_provisionBaseProvision2['default']);

exports['default'] = Models;
//# sourceMappingURL=Model.js.map
