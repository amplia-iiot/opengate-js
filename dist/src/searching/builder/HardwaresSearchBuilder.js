'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SearchWithSummaryBuilder2 = require('./SearchWithSummaryBuilder');

var _SearchWithSummaryBuilder3 = _interopRequireDefault(_SearchWithSummaryBuilder2);

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var _utilSearchingFieldsFieldFinder = require('../../util/searchingFields/FieldFinder');

var _utilSearchingFieldsFieldFinder2 = _interopRequireDefault(_utilSearchingFieldsFieldFinder);

var BASE_URL = '/catalog/hardwares';
/**
 * Defined a search over Datastreams	
 * @example ogapi.hardwareSearchBuilder()
 */

var HardwaresSearchBuilder = (function (_SearchWithSummaryBuilder) {
    _inherits(HardwaresSearchBuilder, _SearchWithSummaryBuilder);

    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */

    function HardwaresSearchBuilder(parent) {
        _classCallCheck(this, HardwaresSearchBuilder);

        _get(Object.getPrototypeOf(HardwaresSearchBuilder.prototype), 'constructor', this).call(this, parent, {}, new _utilSearchingFieldsFieldFinder2['default'](parent, BASE_URL));
        this._url = BASE_URL;
        this.fluentFilter = parent.newFilterBuilder();
        this.tagsFilter = [];
    }

    /**
     * Sets id to search
     *
     * @example
     *	ogapi.hardwareSearchBuilder().withId('myHardware').build()
     * @param {!string} hardwareId - hardware id
     * @throws {Error} throw error when hardwareId is not typeof string
     * @return {HardwaresSearchBuilder} 
     */

    _createClass(HardwaresSearchBuilder, [{
        key: 'withId',
        value: function withId(hardwareId) {
            if (typeof hardwareId !== 'string') {
                throw new Error('Parameter hardwareId must be a string');
            }
            this.fluentFilter.and(this._parent.EX.eq('hardwareId', hardwareId));
            return this;
        }

        /**
         * Set modelName to search
         *
         * @example
         *	ogapi.hardwareSearchBuilder().withModel('myModel').build()
         * @param {!string} modelName - model name
         * @throws {Error} throw error when modelName is not typeof string
         * @return {HardwaresSearchBuilder} 
         */
    }, {
        key: 'withModel',
        value: function withModel(modelName) {
            if (typeof modelName !== 'string') {
                throw new Error('Parameter modelName must be a string');
            }
            this.fluentFilter.and(this._parent.EX.eq('modelName', modelName));
            return this;
        }

        /**
         * Set modelVersion to search
         *
         * @example
         *	ogapi.hardwareSearchBuilder().withModelVersion('myModelVersion).build()
         * @param {!string} modelVersion - model version
         * @throws {Error} throw error when modelVersion is not typeof string
         * @return {HardwaresSearchBuilder} 
         */
    }, {
        key: 'withModelVersion',
        value: function withModelVersion(modelVersion) {
            if (typeof modelVersion !== 'string') {
                throw new Error('Parameter modelVersion must be a string');
            }
            this.fluentFilter.and(this._parent.EX.eq('modelVersion', modelVersion));
            return this;
        }

        /**
         * Set feedName to search
         *
         * @example
         *	ogapi.hardwareSearchBuilder().withManufacturer('myManufacturer').build()
         * @param {!string} manufacturerName - manufacturer name
         * @throws {Error} throw error when modelName is not typeof string
         * @return {HardwaresSearchBuilder} 
         */
    }, {
        key: 'withManufacturer',
        value: function withManufacturer(manufacturerName) {
            if (typeof manufacturerName !== 'string') {
                throw new Error('Parameter manufacturerName must be a string');
            }
            this.fluentFilter.and(this._parent.EX.eq('manufacturerName', manufacturerName));
            return this;
        }
    }, {
        key: '_buildFilter',
        value: function _buildFilter() {
            var filter = { filter: {} };

            var _fluentFilter = (0, _merge2['default'])(true, this.fluentFilter);
            var _customFilter = this._builderParams.filter;

            //if (this.tagsFilter.length > 0){
            //	_fluentFilter.and(this._parent.EX.in('datapoint.tag',this.tagsFilter));				
            //}

            _fluentFilter = _fluentFilter._filterTemplate.filter;

            if (typeof _customFilter._filterTemplate === "object") {
                _customFilter = _customFilter._filterTemplate.filter;
            }

            if (typeof _customFilter !== "undefined" && Object.keys(_customFilter).length > 0 && typeof _fluentFilter !== "undefined" && Object.keys(_fluentFilter).length > 0) {
                throw new Error('Incompatible filters. You only can create a filter using fluent mode [withId, withModel, withModelVersion, withManufacturer] methods or custom filter [filter] method');
            }

            if (typeof _customFilter !== "undefined" && Object.keys(_customFilter).length > 0) {
                filter.filter = _customFilter;
            } else if (typeof _fluentFilter !== "undefined" && Object.keys(_fluentFilter).length > 0) {
                filter.filter = _fluentFilter;
            }
            return filter;
        }
    }]);

    return HardwaresSearchBuilder;
})(_SearchWithSummaryBuilder3['default']);

exports['default'] = HardwaresSearchBuilder;
module.exports = exports['default'];
//# sourceMappingURL=HardwaresSearchBuilder.js.map
