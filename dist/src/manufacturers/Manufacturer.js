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

var _ManufacturerMedia = require('./ManufacturerMedia');

var _ManufacturerMedia2 = _interopRequireDefault(_ManufacturerMedia);

var _Model = require('./Model');

var _Model2 = _interopRequireDefault(_Model);

/**
 * This is a base object that contains all you can do about Manufacturers.
 */

var Manufacturers = (function (_BaseProvision) {
    _inherits(Manufacturers, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function Manufacturers(ogapi) {
        _classCallCheck(this, Manufacturers);

        _get(Object.getPrototypeOf(Manufacturers.prototype), 'constructor', this).call(this, ogapi, "/manufacturers", undefined, ['identifier', 'name']);
    }

    /**
     * Set the identifier attribute
     * @param {string} id - required field
     * @return {Manufacturers}
     */

    _createClass(Manufacturers, [{
        key: 'withIdentifier',
        value: function withIdentifier(id) {
            if (typeof id !== 'string' || id.length > 50) throw new Error("OGAPI_STRING_PARAMETER_MAX_LENGTH_50");
            this._identifier = id;
            return this;
        }

        /**
         * Set the name attribute
         * @param {string} name - required field
         * @return {Manufacturers}
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
         * @return {Manufacturers}
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
         * @return {Manufacturers}
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
         * @return {Manufacturers}
         */
    }, {
        key: 'withUrl',
        value: function withUrl(url) {
            if (typeof url !== 'string') throw new Error("OGAPI_STRING_PARAMETER");
            this._manufUrl = url;
            return this;
        }

        /**
         * Set the fax attribute
         * @param {string} fax 
         * @return {Manufacturers}
         */
    }, {
        key: 'withFax',
        value: function withFax(fax) {
            if (typeof fax !== 'string') throw new Error("OGAPI_STRING_PARAMETER");
            this._fax = fax;
            return this;
        }

        /**
         * Set the telephone attribute
         * @param {string} telephone 
         * @return {Manufacturers}
         */
    }, {
        key: 'withTelephone',
        value: function withTelephone(telephone) {
            if (typeof telephone !== 'string') throw new Error("OGAPI_STRING_PARAMETER");
            this._telephone = telephone;
            return this;
        }

        /**
         * Set the address attribute
         * @param {string} address 
         * @return {Manufacturers}
         */
    }, {
        key: 'withAddress',
        value: function withAddress(address) {
            if (typeof address !== 'string') throw new Error("OGAPI_STRING_PARAMETER");
            this._address = address;
            return this;
        }
    }, {
        key: 'mediaBuilder',
        value: function mediaBuilder() {
            if (!this._identifier) throw new Error("Required manufacturer identifier");
            return new _ManufacturerMedia2['default'](this._ogapi, this._identifier);
        }
    }, {
        key: 'modelBuilder',
        value: function modelBuilder() {
            if (!this._identifier || !this._name) throw new Error("Required manufacturer identifier and name");
            return new _Model2['default'](this._ogapi, this);
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._checkRequiredParameters();

            var updateData = {
                manufacturer: {
                    id: this._identifier || undefined,
                    name: this._name || undefined,
                    description: this._description || undefined,
                    telephone: this._telephone || undefined,
                    address: this._address || undefined,
                    fax: this._fax || undefined,
                    url: this._manufUrl || undefined,
                    notes: this._notes || undefined
                }
            };

            return updateData;
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            var url = this._resource + "/" + this._identifier;
            return url;
        }
    }]);

    return Manufacturers;
})(_provisionBaseProvision2['default']);

exports['default'] = Manufacturers;
module.exports = exports['default'];
//# sourceMappingURL=Manufacturer.js.map
