'use strict';

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
 *   This class allow make get request to TimeseriesFinder resource into Opengate North API.
 */

var TimeseriesFinder = (function (_GenericFinder) {
    _inherits(TimeseriesFinder, _GenericFinder);

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */

    function TimeseriesFinder(ogapi) {
        _classCallCheck(this, TimeseriesFinder);

        _get(Object.getPrototypeOf(TimeseriesFinder.prototype), 'constructor', this).call(this, ogapi, 'timeseries/provision/organizations', 'timeseries');
    }

    /**
      * Performs a get that returns list of timeseries
      * @test
      *   ogapi.newTimeserieFinder().findByOrganization(organization);
      *   ogapi.newTimeserieFinder().findByOrganization(organization, ['columns', 'context']);
      *   ogapi.newTimeserieFinder().findByOrganization(organization, [], ['ds_id_1', 'ds_id-2']);
      *   ogapi.newTimeserieFinder().findByOrganization(organization, ['columns'], []);
      *   ogapi.newTimeserieFinder().findByOrganization(organization, ['columns'], undefined);
      *   ogapi.newTimeserieFinder().findByOrganization(organization, undefined, ['ds_id_2']);
      * @param {string} organization - organization
      * @param {Array} expand - ['columns', 'context']
      * @param {Array} dataStreams - ["ds_id_1","ds_id_2"]
      * @return {Promise} 
      */

    _createClass(TimeseriesFinder, [{
        key: 'findByOrganization',
        value: function findByOrganization(organization, expand, dataStreams) {
            this._withId(organization);
            var parameters = {};
            if (expand) {
                if (!(expand instanceof Array)) {
                    throw new Error({
                        message: "Parameter expand requires an array",
                        parameter: 'expand'
                    });
                } else if (expand.length > 0) parameters.expand = expand.join();
            }
            if (dataStreams) {
                if (!(dataStreams instanceof Array)) {
                    throw new Error({
                        message: "Parameter dataStreams requires an array",
                        parameter: 'dataStreams'
                    });
                } else if (dataStreams.length > 0) parameters.dataStreams = dataStreams.join();
            }
            this._setUrlParameters(parameters);
            return this._execute();
        }

        /**
         * Performs a get that returns a definition of timeserie
         * @test
         *   ogapi.newTimeserieFinder().findByOrganizationAndTimeserieId(organization, timeserieId);
         * @param {string} organization - organization
         * @param {string} timeserieId - timeserie identifier
         * @return {Promise} 
         */
    }, {
        key: 'findByOrganizationAndTimeserieId',
        value: function findByOrganizationAndTimeserieId(organization, timeserieId) {
            this._withId(organization + '/' + timeserieId);
            return this._execute();
        }
    }]);

    return TimeseriesFinder;
})(_GenericFinder3['default']);

exports['default'] = TimeseriesFinder;
module.exports = exports['default'];
//# sourceMappingURL=TimeseriesFinder.js.map
