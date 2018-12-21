'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _FlattenedSearchBuilder2 = require('./FlattenedSearchBuilder');

var _FlattenedSearchBuilder3 = _interopRequireDefault(_FlattenedSearchBuilder2);

/**
 * This is a abstract class. It is a class that extends from base to make all kind of summary search request to OpenGate North API.
 */

var PreFilteredSearchBuilder = (function (_FlattenedSearchBuilder) {
    _inherits(PreFilteredSearchBuilder, _FlattenedSearchBuilder);

    /**
     * @param {!InternalOpenGateAPI} parent - this is ogapi instance
     * @param {!object} routes - this defined the routes. One of those routes must be called on Builder before call build method.
     */

    function PreFilteredSearchBuilder(parent, routes, fieldFinder) {
        _classCallCheck(this, PreFilteredSearchBuilder);

        _get(Object.getPrototypeOf(PreFilteredSearchBuilder.prototype), 'constructor', this).call(this, parent, routes, fieldFinder);
        if (this.constructor === PreFilteredSearchBuilder) {
            throw new Error("Cannot construct Abstract instances directly");
        }
    }

    /**
     * This option forces search api to add a filter of provisioned content
     * @example
     *	ogapi.subscribersSearchBuilder().provisioned() 
     * @return {PreFilteredSearchBuilder} 
     */

    _createClass(PreFilteredSearchBuilder, [{
        key: 'provisioned',
        value: function provisioned() {
            this._provisioned = true;

            return this;
        }

        /**
         * This option forces search api to add a filter of collected content
         * @example
         *	ogapi.subscribersSearchBuilder().collected() 
         * @return {PreFilteredSearchBuilder} 
         */
    }, {
        key: 'collected',
        value: function collected() {
            this._collected = true;

            return this;
        }

        /**
         * The search request will have this filter 
         * @example
         *  ogapi.devicesSearchBuilder().select(
         *      ogapi.newSelectBuilder().add(SE.element("provision.device.identifier", ["value"], "id"), SE.add("device.temperature.value", ["value"]))
         *  ) // Setting SelectBuilder
         *  ogapi.devicesSearchBuilder().select({
         *      "elements": [
         *          {"name": "provision.device.identifier","fields": ["value"],"alias": "id"},
         *          {"name": "device.temperature.value","fields": ["value"]}
         *      ]
         *  }) //Custom select
         * @param {!(SelectBuilder|object)} select
         * @return {PreFilteredSearchBuilder} 
         */
    }, {
        key: 'select',
        value: function select(_select) {
            this._builderParams.select = _select || [];
            return this;
        }

        /**
         * The response will return a response without sorted
         * @example
         *	ogapi.assetsSearchBuilder().disableDefaultSorted() 
         * @return {PreFilteredSearchBuilder} 
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
         *	ogapi.entitiesSearchBuilder().disableCaseSensitive() 
         * @return {EntitiesSearchBuilder} 
         */
    }, {
        key: 'disableCaseSensitive',
        value: function disableCaseSensitive() {
            this._urlParams.caseSensitive = false;
            return this;
        }
    }]);

    return PreFilteredSearchBuilder;
})(_FlattenedSearchBuilder3['default']);

exports['default'] = PreFilteredSearchBuilder;
module.exports = exports['default'];
//# sourceMappingURL=PreFilteredSearchBuilder.js.map
