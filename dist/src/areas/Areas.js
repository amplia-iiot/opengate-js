'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _TYPE_ENUM = require('./TYPE_ENUM');

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _provisionBaseProvision = require('../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

/**
 * This is a base object that contains all you can do about Areas.
 */

var Areas = (function (_BaseProvision) {
    _inherits(Areas, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function Areas(ogapi) {
        _classCallCheck(this, Areas);

        _get(Object.getPrototypeOf(Areas.prototype), 'constructor', this).call(this, ogapi, '/organizations/', undefined, ['identifier', 'organization', "type", 'coordinates']);
    }

    _createClass(Areas, [{
        key: '_buildURL',
        value: function _buildURL() {
            var url = 'provision/organizations/' + this._organization + '/areas/' + this._identifier;
            return url;
        }

        /**
         * Set the organization attribute
         * @param {string} organization - required field
         * @return {Areas}
         */
    }, {
        key: 'withOrganization',
        value: function withOrganization(organization) {
            this._checkString(organization, 50, 'organization');
            this._organization = organization;
            return this;
        }

        /**
         * Set the identifier attribute
         * @param {string} identifier - required field
         * @return {Areas}
         */
    }, {
        key: 'withIdentifier',
        value: function withIdentifier(identifier) {
            this._checkString(identifier, 50, 'identifier');
            this._identifier = identifier;
            return this;
        }

        /**
         * Set the name attribute
         * @param {string} name - required field
         * @return {Areas}
         */
    }, {
        key: 'withName',
        value: function withName(name) {
            this._checkString(name, 50, 'name');
            this._name = name;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description - required field
         * @return {Areas}
         */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
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
    }, {
        key: 'withGeometry',
        value: function withGeometry(type, coordinates) {
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
    }, {
        key: 'withEntities',
        value: function withEntities(entities) {
            this._checkArray(entities, 'entities');
            this._entities = entities;
            return this;
        }

        /* fields validations */
    }, {
        key: '_checkType',
        value: function _checkType(type) {
            var not_found = [];
            var found = _TYPE_ENUM.TYPE_ENUM.find(function (type) {
                return type == this;
            }, type);

            if (typeof found === "undefined") {
                not_found.push(type);
            }
            if (not_found.length !== 0) {
                throw new Error("Parameter type value not allowed <'" + JSON.stringify(not_found) + "'>, allowed <'" + JSON.stringify(_TYPE_ENUM.TYPE_ENUM) + "'>");
            }
            return type;
        }
    }, {
        key: '_checkString',
        value: function _checkString(parameter, length, name) {
            if (typeof parameter !== 'string' || parameter.length > length) {
                throw new Error('Parameter ' + name + 'must be a string an has a maximum legth of ' + length);
            }
        }
    }, {
        key: '_checkArray',
        value: function _checkArray(parameter, name) {
            if (!Array.isArray(parameter) || parameter.length === 0) {
                throw new Error('Parameter ' + name + ' must be a array and not be empty');
            }
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._resource = 'provision/organizations/' + this._organization + '/areas/';
            var area = {
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
    }, {
        key: '_composeUpdateElement',
        value: function _composeUpdateElement() {
            var area = _get(Object.getPrototypeOf(Areas.prototype), '_composeUpdateElement', this).call(this);
            delete area.identifier;
            return area;
        }
    }]);

    return Areas;
})(_provisionBaseProvision2['default']);

exports['default'] = Areas;
module.exports = exports['default'];
//# sourceMappingURL=Areas.js.map
