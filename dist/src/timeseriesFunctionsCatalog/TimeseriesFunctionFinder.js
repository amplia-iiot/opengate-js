'use strict';

//import ProvisionGenericFinder from '../ProvisionGenericFinder';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _GenericFinder2 = require('../GenericFinder');

var _GenericFinder3 = _interopRequireDefault(_GenericFinder2);

/**
 *   This class allow make get request to TimeseriesFunction resource into Opengate North API.
 */

var TimeseriesFunctionFinder = (function (_GenericFinder) {
    _inherits(TimeseriesFunctionFinder, _GenericFinder);

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */

    function TimeseriesFunctionFinder(ogapi) {
        _classCallCheck(this, TimeseriesFunctionFinder);

        _get(Object.getPrototypeOf(TimeseriesFunctionFinder.prototype), 'constructor', this).call(this, ogapi, 'timeseries/provision/organizations', "TimeseriesFunctions", 'Timeseries function not found');
    }

    /**
     * Performs a get that returns a list of timeseries function
     * @test
     *   ogapi.newTimeseriesFunctionFinder().findByOrganization('xxx-xx-xxx-xxx').then().catch();
     * @param {string} organization - organization 
     * @return {Promise} 
     */

    _createClass(TimeseriesFunctionFinder, [{
        key: 'findByOrganization',
        value: function findByOrganization(organization) {
            var _this = this;
            _this._organization = organization;

            // let defered = q.defer();
            // let promise = defered.promise;
            // let _error_not_found = this._error_not_found;

            return this._execute();
        }

        /**
         * Performs a get that returns a timeseries function metadata
         * @test
         *   ogapi.newTimeseriesFunctionFinder().findByOrganizationAndName('xxx-xx-xxx-xxx', 'xxxxx-xxxx-xxxx').then().catch();
         * @param {string} organization - organization 
         * @param {string} name - Timeseries function Configuration name
         * @param {boolean} script - If true script content will be downloaded
         * @return {Promise} 
         */
    }, {
        key: 'findByOrganizationAndName',
        value: function findByOrganizationAndName(organization, name, script) {
            var _this = this;
            _this._organization = organization;
            _this._name = name;
            _this._script = script;
            // let defered = q.defer();
            // let promise = defered.promise;
            // let _error_not_found = this._error_not_found;

            return this._execute();
        }
    }, {
        key: '_composeUrl',
        value: function _composeUrl() {
            return this._baseUrl + "/" + this._organization + "/catalog" + (this._name ? '/' + this._name : '') + (this._script ? '/script' : '');
        }
    }]);

    return TimeseriesFunctionFinder;
})(_GenericFinder3['default']);

exports['default'] = TimeseriesFunctionFinder;
module.exports = exports['default'];
//# sourceMappingURL=TimeseriesFunctionFinder.js.map
