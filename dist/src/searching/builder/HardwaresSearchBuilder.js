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

var _utilSearchingFieldsFieldFinder = require('../../util/searchingFields/FieldFinder');

var _utilSearchingFieldsFieldFinder2 = _interopRequireDefault(_utilSearchingFieldsFieldFinder);

var BASE_URL = '/catalog/hardwares';
/**
 * Defined a search over Devices	
 * @example ogapi.devicesSearchBuilder()
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
    }

    /**
     * The search request will have this group by 
     * @example
     * @param {!(object)} group 
     * @return {SearchBuilder} 
     */

    _createClass(HardwaresSearchBuilder, [{
        key: 'group',
        value: function group(_group) {
            this._builderParams.group = _group || {};
            return this;
        }

        /**
         * The search request will have this filter 
         * @example
         *  ogapi.HardwaresSearchBuilder().select(...)
         * @param {!(SelectBuilder|object)} select
         * @return {SearchBuilder} 
         */
    }, {
        key: 'select',
        value: function select(_select) {
            this._builderParams.select = _select;
            return this;
        }

        /**
         * The response will return a flattened response
         * @example
         *	ogapi.HardwaresSearchBuilder().flattened() 
         * @return {HardwaresSearchBuilder} 
         */
    }, {
        key: 'flattened',
        value: function flattened() {
            this._urlParams.flattened = true;

            return this;
        }

        /**
         * The response will return a response without sorted
         * @example
         *	ogapi.HardwaresSearchBuilder().disableDefaultSorted() 
         * @return {HardwaresSearchBuilder} 
         */
    }, {
        key: 'disableDefaultSorted',
        value: function disableDefaultSorted() {
            this._urlParams.defaultSorted = false;
            return this;
        }
    }]);

    return HardwaresSearchBuilder;
})(_SearchWithSummaryBuilder3['default']);

exports['default'] = HardwaresSearchBuilder;
module.exports = exports['default'];
//# sourceMappingURL=HardwaresSearchBuilder.js.map
