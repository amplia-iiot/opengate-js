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

var _utilSearchingFieldsFieldFinder = require('../../util/searchingFields/FieldFinder');

var _utilSearchingFieldsFieldFinder2 = _interopRequireDefault(_utilSearchingFieldsFieldFinder);

var _WPSearch = require('../WPSearch');

var _WPSearch2 = _interopRequireDefault(_WPSearch);

var BASE_URL = '/datasets';

exports.BASE_URL = BASE_URL;
/**
 * Defined a search over Executions	
 * @example ogapi.datasetSearchBuilder(organization, datasetId)
 */

var DatasetSearchBuilder = (function (_SearchBuilder) {
    _inherits(DatasetSearchBuilder, _SearchBuilder);

    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */

    function DatasetSearchBuilder(parent, organization, dataset) {
        _classCallCheck(this, DatasetSearchBuilder);

        _get(Object.getPrototypeOf(DatasetSearchBuilder.prototype), 'constructor', this).call(this, parent, {}, new _utilSearchingFieldsFieldFinder2['default'](parent, BASE_URL, { organization: organization, dataset: dataset }));
        this._url = BASE_URL + '/provision/organizations/' + organization + '/' + dataset + '/data';
    }

    /**
     * The search request will have this group by 
     * @example
     * @param {!(object)} group 
     * @return {DatasetSearchBuilder} 
     */

    _createClass(DatasetSearchBuilder, [{
        key: 'group',
        value: function group(_group) {
            this._builderParams.group = _group || {};
            return this;
        }

        /**
         * The search request will have this filter 
         * @example
         *  ogapi.datasetSearchBuilder(organization, datasetId).select(
         *      ogapi.newSelectBuilder().add(SE.element("provision.device.identifier", ["value"], "id"), SE.add("device.temperature.value", ["value"]))
         *  ) // Setting SelectBuilder
         *  ogapi.datasetSearchBuilder(organization, datasetId).select({ "elements": [{"name": "provision.device.identifier",
         *		"fields": [{"field": "value","alias": "identifier"}]},
         *      {"name": "device.temperature.value","fields": [{"field": "value","alias": "identifier"}]}]
         *   }) //Custom select
         * @param {!(SelectBuilder|object)} select
         * @return {DatasetSearchBuilder} 
         */
    }, {
        key: 'select',
        value: function select(_select) {
            this._builderParams.select = _select || [];
            return this;
        }

        /**
         * Build a instance of Search 
         *
         * @example
         *  ogapi.datasetSearchBuilder(organization, datasetId).build()
         * @throws {SearchBuilderError} Throw error on url build
         * @return {Search} 
         */
    }, {
        key: 'build',
        value: function build() {
            return new _WPSearch2['default'](this._parent, this._buildUrl(), this._buildFilter(), this._buildLimit(), this._buildSort(), this._buildGroup(), this._buildSelect(), this._builderParams.timeout, this._urlParams);
        }
    }]);

    return DatasetSearchBuilder;
})(_SearchBuilder3['default']);

exports['default'] = DatasetSearchBuilder;
//# sourceMappingURL=DatasetSearchBuilder.js.map
