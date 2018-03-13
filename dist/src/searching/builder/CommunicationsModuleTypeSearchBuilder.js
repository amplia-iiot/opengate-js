'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SearchBuilder2 = require('./SearchBuilder');

var _SearchBuilder3 = _interopRequireDefault(_SearchBuilder2);

var _StaticSearch = require('../StaticSearch');

var _StaticSearch2 = _interopRequireDefault(_StaticSearch);

/**
 * Defined a search over operational status catalogs    
 * @example ogapi.communicationsModuleTypeSearchBuilder()
 */

var CommunicationsModuleTypeSearchBuilder = (function (_SearchBuilder) {
    _inherits(CommunicationsModuleTypeSearchBuilder, _SearchBuilder);

    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */

    function CommunicationsModuleTypeSearchBuilder(parent) {
        _classCallCheck(this, CommunicationsModuleTypeSearchBuilder);

        _get(Object.getPrototypeOf(CommunicationsModuleTypeSearchBuilder.prototype), 'constructor', this).call(this, parent, {});
        this._url = '/communicationsModuleType';
        this.customFilters = {};
    }

    /**
     * Build a instance of StaticSearch 
     *
     * @example
     *   ogapi.administrativeStateSearchBuilder().filter({and:[]}).build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {StaticSearch}  
     */

    _createClass(CommunicationsModuleTypeSearchBuilder, [{
        key: 'build',
        value: function build() {
            return new _StaticSearch2['default'](this._parent, this._buildUrl(), this._buildFilter(), this._builderParams.timeout, 'communicationsModuleType', this.customFilters);
        }

        /**
         * Sets id to search
         *
         * @description
         * The list of types of communication modules is as follows:
         * "GENERIC", "WIFI", "EHTERNET", "BLUETOOTH", "MESH", "LOWPAN", "LTE_M", PLC", "ZIGBEE", "ADSL", "MOBILE", "NARROWBAND", "GSM", "UMTS", "CAN", "I2C", "RS232", "RS422", "RS485"
         * @example
         *  ogapi.communicationsModuleTypeSearchBuilder().withType('GENERIC').build()
         * @param {!string} communicationsModuleType - specific type
         * @throws {Error} throw error when type is not typeof string
         * @return {CommunicationsModuleTypeSearchBuilder}
         */
    }, {
        key: 'withType',
        value: function withType(communicationsModuleType) {
            if (typeof communicationsModuleType !== 'string') {
                throw new Error('Parameter type must be a string');
            }

            this.customFilters.type = communicationsModuleType;
            return this;
        }
    }]);

    return CommunicationsModuleTypeSearchBuilder;
})(_SearchBuilder3['default']);

exports['default'] = CommunicationsModuleTypeSearchBuilder;
module.exports = exports['default'];
//# sourceMappingURL=CommunicationsModuleTypeSearchBuilder.js.map
