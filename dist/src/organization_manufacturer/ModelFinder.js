'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ProvisionGenericFinder2 = require('../ProvisionGenericFinder');

var _ProvisionGenericFinder3 = _interopRequireDefault(_ProvisionGenericFinder2);

var _Manufacturer = require('./Manufacturer');

var _Model = require('./Model');

/**
 *   This class allow make get request to hardware models resource into Opengate North API.
 */

var ModelFinder = (function (_ProvisionGenericFinder) {
    _inherits(ModelFinder, _ProvisionGenericFinder);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function ModelFinder(ogapi) {
        _classCallCheck(this, ModelFinder);

        _get(Object.getPrototypeOf(ModelFinder.prototype), 'constructor', this).call(this, ogapi, _Model.PRE_RESOURCE, 'model', 'Model not found');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */

    _createClass(ModelFinder, [{
        key: '_composeUrl',
        value: function _composeUrl() {
            return this._baseUrl + "/" + this._organization + _Manufacturer.MANUFACTURERS_RESOURCE + "/" + this._manufacturer + _Model.MODELS_RESOURCE + (this._identifier ? "/" + this._identifier : "");
        }

        /**
         * Download all models from its manufacturer. This execute a GET http method
         * @test
         *   ogapi.newModelFinder().findByOrganizationAndManufacturer('organization', 'manufacturer').then().catch();
         * @param {string} organization - model organization .
         * @param {string} manufacturer - model manufacturer .
         * @return {Promise} 
         */
    }, {
        key: 'findByOrganizationAndManufacturer',
        value: function findByOrganizationAndManufacturer(organization, manufacturer) {
            this._organization = organization;
            this._manufacturer = manufacturer;
            return this._execute();
        }

        /**
         * Download a specific model by its id. This execute a GET http method
         * @test
         *   ogapi.newModelFinder().findByOrganizationAndManufacturerAndId('organization', 'manufacturer', 'modelname').then().catch();
         * @param {string} organization - model organization .
         * @param {string} manufacturer - model manufacturer .
         * @param {string} identifier - model name .
         * @return {Promise} 
         */
    }, {
        key: 'findByOrganizationAndManufacturerAndId',
        value: function findByOrganizationAndManufacturerAndId(organization, manufacturer, identifier) {
            this._organization = organization;
            this._manufacturer = manufacturer;
            this._identifier = identifier;
            return this._execute();
        }
    }]);

    return ModelFinder;
})(_ProvisionGenericFinder3['default']);

exports['default'] = ModelFinder;
module.exports = exports['default'];
//# sourceMappingURL=ModelFinder.js.map
