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

var _utilFormatsCheck_types = require('../../util/formats/check_types');

var _utilFormatsCheck_types2 = _interopRequireDefault(_utilFormatsCheck_types);

var BASE_URL = 'timeseries';

exports.BASE_URL = BASE_URL;
var aggregationTypes = ["FIRST", "LAST", "AVG", "MAX", "MIN", "SUM", "COUNT", "GEO_AVG", "VARIANCE", "STD_DEVIATION", "DATE_FOR_MAX", "DATE_FOR_MIN", "DATE_FOR_FIRST", "DATE_FOR_LAST"];

exports.aggregationTypes = aggregationTypes;
/**
 * Defined a search over timeseries	
 * @example ogapi.timeserieDatasetBuilder(organization, timeserieId)
 */

var TimeserieDatasetBuilder = (function (_SearchBuilder) {
    _inherits(TimeserieDatasetBuilder, _SearchBuilder);

    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */

    function TimeserieDatasetBuilder(parent, organization, timeserie) {
        _classCallCheck(this, TimeserieDatasetBuilder);

        _get(Object.getPrototypeOf(TimeserieDatasetBuilder.prototype), 'constructor', this).call(this, parent, {}, new _utilSearchingFieldsFieldFinder2['default'](parent, BASE_URL, { organization: organization, timeserie: timeserie }));
        this._url = BASE_URL + '/provision/organizations/' + organization + '/' + timeserie + '/dataset';
    }

    /**
     * The search request will have 
     * @param {object} select
     * @return {TimeserieDatasetBuilder} 
     */

    _createClass(TimeserieDatasetBuilder, [{
        key: 'select',
        value: function select(_select) {
            this._builderParams.select = _select || {};
            return this;
        }

        /**
         * Add columns that will be requested
         * @param {array} columns
         * @return {TimeserieDatasetBuilder} 
         */
    }, {
        key: 'columns',
        value: function columns(_columns) {
            var _this = this;

            _utilFormatsCheck_types2['default']._checkArray(_columns, 'columns');

            _columns.forEach(function (colTmp) {
                return _this.addColumn(colTmp.name || colTmp.column, colTmp.aggregation, colTmp.alias);
            });
        }

        /**
         * Add column that will be requested
         * @param {object} columns
         * @return {TimeserieDatasetBuilder} 
         */
    }, {
        key: 'addColumn',
        value: function addColumn(name, aggregation, alias) {
            _utilFormatsCheck_types2['default']._checkStringAndPattern(name, "^[a-zA-Z0-9 _-]*$", 'name');

            if (alias) {
                _utilFormatsCheck_types2['default']._checkStringAndPattern(alias, "^[a-zA-Z0-9 _-]*$", 'alias');
            }

            if (aggregation) {
                _utilFormatsCheck_types2['default']._checkType(aggregation, aggregationTypes, 'aggregation');
            }

            if (!this._builderParams.select) {
                this._builderParams.select = {};
            }

            if (!this._builderParams.select.columns) {
                this._builderParams.select.columns = [];
            }

            this._builderParams.select.columns.push({
                column: name,
                alias: alias || undefined,
                aggregation: aggregation || undefined
            });
        }
    }, {
        key: 'sort',
        value: function sort() {
            throw new Error('sort not supported');
        }
    }, {
        key: 'group',
        value: function group() {
            throw new Error('group not supported');
        }
    }, {
        key: 'findAllFields',
        value: function findAllFields() {
            throw new Error('findAllFields not supported');
        }

        /**
         * Build a instance of Search 
         *
         * @example
         *  ogapi.timeserieDatasetBuilder(organization, timeserieId).build()
         * @throws {SearchBuilderError} Throw error on url build
         * @return {Search} 
         */
    }, {
        key: 'build',
        value: function build() {
            return new _WPSearch2['default'](this._parent, this._buildUrl(), this._buildFilter(), this._buildLimit(), this._buildSort(), this._buildGroup(), this._buildSelect(), this._builderParams.timeout, this._urlParams);
        }
    }]);

    return TimeserieDatasetBuilder;
})(_SearchBuilder3['default']);

exports['default'] = TimeserieDatasetBuilder;
//# sourceMappingURL=TimeserieDatasetBuilder.js.map
