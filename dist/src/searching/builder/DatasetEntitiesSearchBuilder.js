'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SearchWithSummaryBuilder2 = require('./SearchWithSummaryBuilder');

var _SearchWithSummaryBuilder3 = _interopRequireDefault(_SearchWithSummaryBuilder2);

var _utilSearchingFieldsFieldFinder = require('../../util/searchingFields/FieldFinder');

var _utilSearchingFieldsFieldFinder2 = _interopRequireDefault(_utilSearchingFieldsFieldFinder);

var _EntitySearch = require('../EntitySearch');

var _EntitySearch2 = _interopRequireDefault(_EntitySearch);

var TOKEN_URL = '$_token';

exports.TOKEN_URL = TOKEN_URL;
/**
 * Defined a search over Executions	
 * @example ogapi.datasetEntitiesSearchBuilder()
 */

var DatasetEntitiesSearchBuilder = (function (_SearchWithSummaryBuilder) {
    _inherits(DatasetEntitiesSearchBuilder, _SearchWithSummaryBuilder);

    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */

    function DatasetEntitiesSearchBuilder(parent, organization, dataset) {
        var fieldFinder = arguments.length <= 3 || arguments[3] === undefined ? new _utilSearchingFieldsFieldFinder2['default'](parent, '/entities') : arguments[3];
        return (function () {
            _classCallCheck(this, DatasetEntitiesSearchBuilder);

            _get(Object.getPrototypeOf(DatasetEntitiesSearchBuilder.prototype), 'constructor', this).call(this, parent, {
                onDevices: '/'
            }, fieldFinder);
            this._url = '/organizations/' + organization + '/datasets/' + dataset + TOKEN_URL;
        }).apply(this, arguments);
    }

    /**
     * The response will return a flattened response
     * @example
     *	ogapi.datasetEntitiesSearchBuilder().flattened() 
     * @return {DatasetEntitiesSearchBuilder} 
     */

    _createClass(DatasetEntitiesSearchBuilder, [{
        key: 'flattened',
        value: function flattened() {
            this._urlParams.flattened = true;
            return this;
        }

        /**
         * The response will return a response without sorted
         * @example
         *	ogapi.datasetEntitiesSearchBuilder().disableDefaultSorted() 
         * @return {DatasetEntitiesSearchBuilder} 
         */
    }, {
        key: 'disableDefaultSorted',
        value: function disableDefaultSorted() {
            this._urlParams.defaultSorted = false;
            return this;
        }

        /**
         * The response will return a response by applying the filter with likes case-no-sensitive
         * @example
         *	ogapi.datasetEntitiesSearchBuilder().disableCaseSensitive() 
         * @return {DatasetEntitiesSearchBuilder} 
         */
    }, {
        key: 'disableCaseSensitive',
        value: function disableCaseSensitive(flag) {
            this._urlParams.caseSensitive = flag ? flag : false;
            return this;
        }

        /**
         * The response will return a response by deleteing the parameters with likes case-no-sensitive
         * @example
         *	ogapi.datasetEntitiesSearchBuilder().disableCaseSensitive() 
         * @return {DatasetEntitiesSearchBuilder} 
         */
    }, {
        key: 'removeCaseSensitive',
        value: function removeCaseSensitive() {
            if (this._urlParams) delete this._urlParams.caseSensitive;
            return this;
        }
    }, {
        key: '_buildUrl',
        value: function _buildUrl() {
            for (var route in this._routes) {
                if (this._builderParams[route]) {
                    this._url = this._url.replace(TOKEN_URL, this._routes[route]);
                }
            }
            this._url = this._url.replace(TOKEN_URL, '');
            return _get(Object.getPrototypeOf(DatasetEntitiesSearchBuilder.prototype), '_buildUrl', this).call(this);
        }

        /**
         * The search request will have this group by 
         * @example
         * @param {!(object)} group 
         * @return {DatasetEntitiesSearchBuilder} 
         */
    }, {
        key: 'group',
        value: function group(_group) {
            this._builderParams.group = _group || {};
            return this;
        }

        /**
         * The search request will have this filter 
         * @example
         *  ogapi.datasetEntitiesSearchBuilder().select(
         *      ogapi.newSelectBuilder().add(SE.element("provision.device.identifier", ["value"], "id"), SE.add("device.temperature.value", ["value"]))
         *  ) // Setting SelectBuilder
         *  ogapi.datasetEntitiesSearchBuilder().select({ "elements": [{"name": "provision.device.identifier",
         *		"fields": [{"field": "value","alias": "identifier"}]},
         *      {"name": "device.temperature.value","fields": [{"field": "value","alias": "identifier"}]}]
         *   }) //Custom select
         * @param {!(SelectBuilder|object)} select
         * @return {DatasetEntitiesSearchBuilder} 
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
         *  ogapi.datasetEntitiesSearchBuilder()
         * @throws {SearchBuilderError} Throw error on url build
         * @return {Search} 
         */
    }, {
        key: 'build',
        value: function build() {
            // OUW-944
            return new _EntitySearch2['default'](this._parent, this._buildUrl(), this._buildFilter(), this._buildLimit(), this._buildSort(), this._buildGroup(), this._buildSelect(), this._builderParams.timeout, this._urlParams);
        }
    }]);

    return DatasetEntitiesSearchBuilder;
})(_SearchWithSummaryBuilder3['default']);

exports['default'] = DatasetEntitiesSearchBuilder;
//# sourceMappingURL=DatasetEntitiesSearchBuilder.js.map
