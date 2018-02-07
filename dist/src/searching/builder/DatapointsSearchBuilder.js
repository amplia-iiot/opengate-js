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

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utilSearchingFieldsFieldFinder = require('../../util/searchingFields/FieldFinder');

var _utilSearchingFieldsFieldFinder2 = _interopRequireDefault(_utilSearchingFieldsFieldFinder);

var _utilDATE_FORMAT = require('../../util/DATE_FORMAT');

var BASE_URL = '/datapoints';
/**
 * Defined a search over Datastreams	
 * @example ogapi.datapointsSearchBuilder()
 */

var DatapointsSearchBuilder = (function (_SearchBuilder) {
    _inherits(DatapointsSearchBuilder, _SearchBuilder);

    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */

    function DatapointsSearchBuilder(parent) {
        _classCallCheck(this, DatapointsSearchBuilder);

        _get(Object.getPrototypeOf(DatapointsSearchBuilder.prototype), 'constructor', this).call(this, parent, {}, new _utilSearchingFieldsFieldFinder2['default'](parent, BASE_URL));
        this._url = BASE_URL;
        this.fluentFilter = parent.newFilterBuilder();
        this.tagsFilter = [];
    }

    /**
     * Set deviceId to search
     *
     * @example
     *	ogapi.datapointsSearchBuilder().withDeviceId('myDevice').build()
     * @param {!string} deviceId - Prov.customId of Device
     * @throws {Error} throw error when deviceId is not typeof string
     * @return {DatapointsSearchBuilder} 
     */

    _createClass(DatapointsSearchBuilder, [{
        key: 'withDeviceId',
        value: function withDeviceId(deviceId) {
            if (typeof deviceId !== 'string') {
                throw new Error('Parameter deviceId must be a string');
            }
            this.fluentFilter.and(this._parent.EX.eq('datapoint.device', deviceId));
            return this;
        }

        /**
         * Set datastreamId to search
         *
         * @example
         *	ogapi.datapointsSearchBuilder().withDeviceId('myDevice').build()
         * @param {!string} datastreamId - Datastream.id of Datapoint
         * @throws {Error} throw error when datastreamId is not typeof string
         * @return {DatapointsSearchBuilder} 
         */
    }, {
        key: 'withDatastream',
        value: function withDatastream(datastreamId) {
            if (typeof datastreamId !== 'string') {
                throw new Error('Parameter datastreamId must be a string');
            }
            this.fluentFilter.and(this._parent.EX.eq('datapoint.datastream', datastreamId));
            return this;
        }

        /**
         * Set feedName to search
         *
         * @example
         *	ogapi.datapointsSearchBuilder().withDeviceId('myDevice').build()
         * @param {!string} feedId - Datastream.id of Datapoint
         * @throws {Error} throw error when datastreamId is not typeof string
         * @return {DatapointsSearchBuilder} 
         */
    }, {
        key: 'withFeed',
        value: function withFeed(feedId) {
            if (typeof feedId !== 'string') {
                throw new Error('Parameter feedId must be a string');
            }
            this.fluentFilter.and(this._parent.EX.eq('datapoint.feed', feedId));
            return this;
        }

        //	/**
        //	* Add tag to search
        //	*
        //	* @example
        //	*	ogapi.datapointsSearchBuilder().addTag('tag').build()	
        //	* @param {!string} tagName - Add a tag into tags array
        //	* @throws {Error} throw error when tagName is not typeof string
        //	* @return {datapointsSearchBuilder}
        //	*/
        //	addTag(tagName){
        //		if (typeof tagName !== 'string' ){
        //			throw new Error('Parameter tagName must be a string');
        //		}
        //		this.tagsFilter.push(tagName)
        //		return this;		
        //	}

        /**
         * Set time window to search
         *
         * @example
         *	ogapi.datapointsSearchBuilder().withDeviceId('myDevice').build()
         * @param {!date} fromDate - Add from date
         * @param {!date} toDate - Add to date
         * @throws {Error} throw error when fromDate or toDate is not typeof date
         * @return {DatapointsSearchBuilder} 
         */
    }, {
        key: 'betweenDates',
        value: function betweenDates(fromDate, toDate) {
            if (typeof fromDate !== "object" || fromDate.constructor !== Date) {
                throw new Error('Parameter fromDate must be a Date');
            }
            this.fluentFilter.and(this._parent.EX.gt('datapoint.at', (0, _moment2['default'])(fromDate).format(_utilDATE_FORMAT.DATE_FORMAT)));
            if (typeof toDate !== "undefined") {
                if (toDate.constructor !== Date) {
                    throw new Error('Parameter toDate must be a Date');
                }
                this.fluentFilter.and(this._parent.EX.lt('datapoint.at', (0, _moment2['default'])(toDate).format(_utilDATE_FORMAT.DATE_FORMAT)));
            }
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
                throw new Error('Incompatible filters. You only can create a filter using fluent mode [betweenDates, addTag, withDatastreamId, withDeviceId] methods or custom filter [filter] method');
            }

            if (typeof _customFilter !== "undefined" && Object.keys(_customFilter).length > 0) {
                filter.filter = _customFilter;
            } else if (typeof _fluentFilter !== "undefined" && Object.keys(_fluentFilter).length > 0) {
                filter.filter = _fluentFilter;
            }
            return filter;
        }

        /**
         * The search request will have this filter 
         * @example
         *  ogapi.entitiesSearchBuilder().select(
         *      ogapi.newSelectBuilder().add(SE.element("provision.device.identifier", ["value"], "id"), SE.add("device.temperature.value", ["value"]))
         *  ) // Setting SelectBuilder
         *  ogapi.entitiesSearchBuilder().select({ "elements": [{"name": "provision.device.identifier",
         *		"fields": [{"field": "value","alias": "identifier"}]},
         *      {"name": "device.temperature.value","fields": [{"field": "value","alias": "identifier"}]}]
         *   }) //Custom select
         * @param {!(SelectBuilder|object)} select
         * @return {SearchBuilder} 
         */
    }, {
        key: 'select',
        value: function select(_select) {
            this._builderParams.select = _select;
            return this;
        }
    }]);

    return DatapointsSearchBuilder;
})(_SearchBuilder3['default']);

exports['default'] = DatapointsSearchBuilder;
module.exports = exports['default'];
//# sourceMappingURL=DatapointsSearchBuilder.js.map
