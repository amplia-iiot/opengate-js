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

var _WPSearch = require('../WPSearch');

var _WPSearch2 = _interopRequireDefault(_WPSearch);

var _utilFormatsCheck_types = require('../../util/formats/check_types');

var _utilFormatsCheck_types2 = _interopRequireDefault(_utilFormatsCheck_types);

var BASE_URL = 'timeseries';
exports.BASE_URL = BASE_URL;
var aggregationTypes = ["FIRST", "LAST", "AVG", "MAX", "MIN", "SUM", "COUNT", "MEDIAN", "GEO_AVG", "VARIANCE", "STD_DEVIATION"];
exports.aggregationTypes = aggregationTypes;
var interpolationTypes = ["ZERO", "LAST", "LINEAR", "NONE"];

exports.interpolationTypes = interpolationTypes;
/**
 * Defined a search over timeseries	
 * @example ogapi.timeserieDownsamplerBuilder(organization, timeserieId)
 */

var TimeserieDownsamplerBuilder = (function (_SearchBuilder) {
    _inherits(TimeserieDownsamplerBuilder, _SearchBuilder);

    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */

    function TimeserieDownsamplerBuilder(parent, organization, timeserie, entityId) {
        _classCallCheck(this, TimeserieDownsamplerBuilder);

        _get(Object.getPrototypeOf(TimeserieDownsamplerBuilder.prototype), 'constructor', this).call(this, parent, {}, null);
        this._url = BASE_URL + '/provision/organizations/' + organization + '/' + timeserie + '/downsampling/' + entityId;
    }

    /**
     * The search request will have this select 
     * @param {object} select
     * @return {TimeserieDownsamplerBuilder} 
     */

    _createClass(TimeserieDownsamplerBuilder, [{
        key: 'select',
        value: function select(_select) {
            this._builderParams.select = _select || {};
            return this;
        }

        /**
         * The start time for the downsampling
         * @param {string} start
         * @return {TimeserieDownsamplerBuilder} 
         */
    }, {
        key: 'start',
        value: function start(_start) {
            _utilFormatsCheck_types2['default']._checkISODateTime(_start, 'start');

            if (!this._builderParams.select) {
                this._builderParams.select = {};
            }
            this._builderParams.select.start = _start;

            return this;
        }

        /**
         * The bucket for the downsampling (must be higher than the time series bucket)
         * @param {number} bucketTime
         * @return {TimeserieDownsamplerBuilder} 
         */
    }, {
        key: 'bucketTime',
        value: function bucketTime(_bucketTime) {
            _utilFormatsCheck_types2['default']._checkNumber(_bucketTime, 'bucketTime');

            if (!this._builderParams.select) {
                this._builderParams.select = {};
            }

            this._builderParams.select.bucketTime = _bucketTime;

            return this;
        }

        /**
         * Add columns that will be requested
         * @param {array} columns
         * @return {TimeserieDownsamplerBuilder} 
         */
    }, {
        key: 'columns',
        value: function columns(_columns) {
            var _this = this;

            _utilFormatsCheck_types2['default']._checkArray(_columns, 'columns');

            _columns.forEach(function (colTmp) {
                return _this.addColumn(colTmp.name || colTmp.column, colTmp.interpolation, colTmp.aggregation, colTmp.alias);
            });
        }

        /**
         * Add column that will be requested
         * @param {string} name
         * @param {string} interpolation
         * @param {string} aggregation
         * @param {string} alias
         * @return {TimeserieDownsamplerBuilder} 
         */
    }, {
        key: 'addColumn',
        value: function addColumn(name, interpolation, aggregation, alias) {
            _utilFormatsCheck_types2['default']._checkStringAndPattern(name, "^[a-zA-Z0-9 _-]*$", 'name');

            if (interpolation) {
                _utilFormatsCheck_types2['default']._checkType(interpolation, interpolationTypes, 'interpolation');
            }

            if (aggregation) {
                _utilFormatsCheck_types2['default']._checkType(aggregation, aggregationTypes, 'aggregation');
            }

            if (alias) {
                _utilFormatsCheck_types2['default']._checkStringAndPattern(alias, "^[a-zA-Z0-9 _-]*$", 'alias');
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
                interpolation: interpolation || undefined,
                aggregation: aggregation || undefined
            });
        }
    }, {
        key: 'filter',
        value: function filter() {
            throw new Error('filter not supported');
        }
    }, {
        key: 'sort',
        value: function sort() {
            throw new Error('sort not supported');
        }
    }, {
        key: 'findFields',
        value: function findFields() {
            throw new Error('findFields not supported');
        }

        /**
         * Build a instance of Search 
         *
         * @example
         *  ogapi.timeserieDownsamplerBuilder(organization, timeserieId).build()
         * @throws {SearchBuilderError} Throw error on url build
         * @return {Search} 
         */
    }, {
        key: 'build',
        value: function build() {
            return new _WPSearch2['default'](this._parent, this._buildUrl(), this._buildFilter(), this._buildLimit(), this._buildSort(), this._buildGroup(), this._buildSelect(), this._builderParams.timeout, this._urlParams);
        }
    }]);

    return TimeserieDownsamplerBuilder;
})(_SearchBuilder3['default']);

exports['default'] = TimeserieDownsamplerBuilder;
//# sourceMappingURL=TimeserieDownsamplerBuilder.js.map
