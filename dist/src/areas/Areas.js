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

var _provisionBaseProvision = require('../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

var _utilFormatsCheck_types = require('../util/formats/check_types');

var _utilFormatsCheck_types2 = _interopRequireDefault(_utilFormatsCheck_types);

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
            _utilFormatsCheck_types2['default']._checkString(organization, 50, 'organization');
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
            _utilFormatsCheck_types2['default']._checkString(identifier, 50, 'identifier');
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
            _utilFormatsCheck_types2['default']._checkString(name, 50, 'name');
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
            _utilFormatsCheck_types2['default']._checkString(description, 50, 'description');
            this._description = description;
            return this;
        }

        /**
         * Set the order attribute
         * @param {number} order - required field
         * @return {Areas}
         */
    }, {
        key: 'withOrder',
        value: function withOrder(order) {
            _utilFormatsCheck_types2['default']._checkNumber(order, 'order');
            this._order = order;
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
            _utilFormatsCheck_types2['default']._checkType(type, _TYPE_ENUM.TYPE_ENUM);
            _utilFormatsCheck_types2['default']._checkArray(coordinates, 'coordinates');
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
            _utilFormatsCheck_types2['default']._checkArray(entities, 'entities');
            this._entities = entities;
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._resource = 'provision/organizations/' + this._organization + '/areas/';
            var area = {
                identifier: this._identifier,
                name: this._name,
                description: this._description,
                order: this._order,

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
