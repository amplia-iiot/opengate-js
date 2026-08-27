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

/**
 * This is a base object that contains all you can do about Softwares.
 */
var PRE_RESOURCE = '/organizations';
exports.PRE_RESOURCE = PRE_RESOURCE;
var SOFTWARES_RESOURCE = '/software';
exports.SOFTWARES_RESOURCE = SOFTWARES_RESOURCE;
var SOFTWARE_TYPES_ENUM = ['SOFTWARE', 'FIRMWARE'];

exports.SOFTWARE_TYPES_ENUM = SOFTWARE_TYPES_ENUM;

var Softwares = (function (_BaseProvision) {
    _inherits(Softwares, _BaseProvision);

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function Softwares(ogapi, organization) {
        _classCallCheck(this, Softwares);

        _get(Object.getPrototypeOf(Softwares.prototype), 'constructor', this).call(this, ogapi, PRE_RESOURCE, undefined, ['name', 'version', 'type']);

        _utilFormatsCheck_types2['default']._checkStringAndLength(organization, 50, 'organization');
        this._organization = organization;

        this._resource = this._resource + '/' + this._organization + SOFTWARES_RESOURCE;
    }

    /**
     * Set the identifier attribute
     * @param {string} id - required field
     * @return {Softwares}
     */

    _createClass(Softwares, [{
        key: 'withIdentifier',
        value: function withIdentifier(id) {
            _utilFormatsCheck_types2['default']._checkStringAndLength(id, 100, 'id');
            this._identifier = id;
            return this;
        }

        /**
         * Set the name attribute
         * @param {string} name - required field
         * @return {Softwares}
         */
    }, {
        key: 'withName',
        value: function withName(name) {
            _utilFormatsCheck_types2['default']._checkStringAndLength(name, 100, 'name');
            this._name = name;
            return this;
        }

        /**
         * Set the version attribute
         * @param {string} version - required field
         * @return {Softwares}
         */
    }, {
        key: 'withVersion',
        value: function withVersion(version) {
            _utilFormatsCheck_types2['default']._checkStringAndLength(version, 100, 'version');
            this._version = version;
            return this;
        }

        /**
         * Set the type attribute
         * @param {string} type 
         * @return {Softwares}
         */
    }, {
        key: 'withType',
        value: function withType(type) {
            _utilFormatsCheck_types2['default']._checkType(type, SOFTWARE_TYPES_ENUM);
            this._type = type;
            return this;
        }

        /**
        * Set the model attribute
        * @param {Array} models 
        * @return {Softwares}
        */
    }, {
        key: 'withModels',
        value: function withModels(models) {
            _utilFormatsCheck_types2['default']._checkArray(models, 'model');
            this._models = models;
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._checkRequiredParameters();

            var updateData = {
                name: this._name,
                type: this._type,
                version: this._version,
                models: this._models
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
                updateEntities: true
            });

            return this['delete']();
        }
    }, {
        key: 'updateInCascade',
        value: function updateInCascade() {
            this._setUrlParameters({
                updateEntities: true
            });

            return this.update();
        }
    }]);

    return Softwares;
})(_provisionBaseProvision2['default']);

exports['default'] = Softwares;
//# sourceMappingURL=Software.js.map
