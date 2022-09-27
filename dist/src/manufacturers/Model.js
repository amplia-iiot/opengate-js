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

var _Manufacturer2 = _interopRequireDefault(_Manufacturer);

var _ModelMedia = require('./ModelMedia');

var _ModelMedia2 = _interopRequireDefault(_ModelMedia);

/**
 * This is a base object that contains all you can do about Models.
 */

var Models = (function (_BaseProvision) {
    _inherits(Models, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function Models(ogapi, manufacturer) {
        _classCallCheck(this, Models);

        _get(Object.getPrototypeOf(Models.prototype), 'constructor', this).call(this, ogapi, "/models", undefined, ['identifier', 'name', 'manufacturer']);

        this._manufacturer = manufacturer;
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
            this._manufUrl = url;
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

        /**
         * Set the manufacturer identifier attribute
         * @param {string} id
         * @return {Manufacturers}
         */
    }, {
        key: 'withManufacturerIdentifier',
        value: function withManufacturerIdentifier(id) {
            if (typeof id !== 'string' || id.length > 50) throw new Error("OGAPI_STRING_PARAMETER_MAX_LENGTH_50");
            if (!this._manufacturer) {
                this._manufacturer = new _Manufacturer2['default'](this._ogapi);
            }

            this._manufacturer.withIdentifier(id);
            return this;
        }

        /**
         * Set the manufacturer name attribute
         * @param {string} name
         * @return {Models}
         */
    }, {
        key: 'withManufacturerName',
        value: function withManufacturerName(name) {
            if (!name) throw new Error("OGAPI_STRING_PARAMETER");

            if (!this._manufacturer) {
                this._manufacturer = new _Manufacturer2['default'](this._ogapi);
            }

            this._manufacturer.withName(name);

            return this;
        }
    }, {
        key: 'mediaBuilder',
        value: function mediaBuilder() {
            if (!this._identifier) throw new Error("Required model identifier");
            return new _ModelMedia2['default'](this._ogapi, this._identifier);
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._checkRequiredParameters();

            var updateData = {
                model: {
                    id: this._identifier || undefined,
                    name: this._name || undefined,
                    description: this._description || undefined,
                    version: this._version || undefined,
                    notes: this._notes || undefined,
                    manufacturer: {
                        id: this._manufacturer._identifier || undefined,
                        name: this._manufacturer._name || undefined
                    }
                }
            };

            return updateData;
        }
    }, {
        key: '_composeUpdateElement',
        value: function _composeUpdateElement() {
            var updateElement = this._composeElement();

            delete updateElement.model.id;

            return updateElement;
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            var url = this._resource + "/" + this._identifier;
            return url;
        }
    }]);

    return Models;
})(_provisionBaseProvision2['default']);

exports['default'] = Models;
module.exports = exports['default'];
//# sourceMappingURL=Model.js.map
