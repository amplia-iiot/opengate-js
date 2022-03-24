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

var _utilFormatsCheck_types = require('../util/formats/check_types');

var _utilFormatsCheck_types2 = _interopRequireDefault(_utilFormatsCheck_types);

var DATASETS_TYPES_ENUM = ['CURRENT', 'HISTORY'];
exports.DATASETS_TYPES_ENUM = DATASETS_TYPES_ENUM;
/**
 * This is a base object that contains all you can do about Datasets.
 */

var Datasets = (function (_BaseProvision) {
    _inherits(Datasets, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function Datasets(ogapi) {
        _classCallCheck(this, Datasets);

        _get(Object.getPrototypeOf(Datasets.prototype), 'constructor', this).call(this, ogapi, '/organizations/', undefined, ['name', 'organization', "type", 'columns']);
    }

    _createClass(Datasets, [{
        key: '_buildURL',
        value: function _buildURL() {
            var url = '/datasets/provision/organizations/' + this._organization + '/' + this._identifier;
            return url;
        }

        /**
         * Set the organization attribute
         * @param {string} organization - required field
         * @return {Datasets}
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
         * @return {Datasets}
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
         * @return {Datasets}
         */
    }, {
        key: 'withName',
        value: function withName(name) {
            _utilFormatsCheck_types2['default']._checkString(name, 50, 'name');
            this._name = name;
            return this;
        }

        /**
        * Set the type attribute
        * @param {string} type - required field
        * @return {Datasets}
        */
    }, {
        key: 'withType',
        value: function withType(type) {
            _utilFormatsCheck_types2['default']._checkType(type, DATASETS_TYPES_ENUM);
            this._type = type;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description
         * @return {Datasets}
         */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
            if (description) _utilFormatsCheck_types2['default']._checkString(description, 250, 'description');
            this._description = description;
            return this;
        }

        /**
         * Set the columns attribute
         * @param {array} columns - required field
         * @return {Datasets}
         */
    }, {
        key: 'withColumns',
        value: function withColumns(columns) {
            _utilFormatsCheck_types2['default']._checkArray(columns, 'columns');
            this._columns = columns;
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._resource = '/datasets/provision/organizations/' + this._organization;
            var dataset = {
                name: this._name,
                description: this._description,
                type: this._type,
                columns: this._columns
            };
            return dataset;
        }

        /**
         * This method invalidates the update option
         * @throws {Allways} Datasets cannot be updated.
         */
    }, {
        key: 'update',
        value: function update() {
            throw new Error("OGAPI_DAATASET_NOT_UPDATED");
        }
    }]);

    return Datasets;
})(_provisionBaseProvision2['default']);

exports['default'] = Datasets;
//# sourceMappingURL=Datasets.js.map
