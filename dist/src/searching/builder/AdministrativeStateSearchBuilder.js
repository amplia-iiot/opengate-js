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

var _StaticSearch = require('../StaticSearch');

var _StaticSearch2 = _interopRequireDefault(_StaticSearch);

/**
 * Defined a search over operational status catalogs    
 * @example ogapi.administrativeStateSearchBuilder()
 */

var AdministrativeStateSearchBuilder = (function (_SearchBuilder) {
    _inherits(AdministrativeStateSearchBuilder, _SearchBuilder);

    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */

    function AdministrativeStateSearchBuilder(parent) {
        _classCallCheck(this, AdministrativeStateSearchBuilder);

        _get(Object.getPrototypeOf(AdministrativeStateSearchBuilder.prototype), 'constructor', this).call(this, parent, {});
        this._url = '/administrativeState';
        this.customFilters = {};
    }

    /**
     * Build a instance of StaticSearch 
     *
     * @example
     *   ogapi.administrativeStateSearchBuilder().filter({and:[]}).build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {StaticSearch}  
     */

    _createClass(AdministrativeStateSearchBuilder, [{
        key: 'build',
        value: function build() {
            return new _StaticSearch2['default'](this._parent, this._buildUrl(), this._buildFilter(), this._builderParams.timeout, 'administrativeState', this.customFilters);
        }

        /**
         * Sets id to search
         *
         * @example
         *  ogapi.administrativeStateSearchBuilder().withId('myId').build()
         * @param {!string} administrativeStateId - specific type id
         * @throws {Error} throw error when hardwareId is not typeof string
         * @return {AdministrativeStateSearchBuilder} 
         */
    }, {
        key: 'withId',
        value: function withId(administrativeStateId) {
            if (typeof administrativeStateId !== 'string') {
                throw new Error('Parameter id must be a string');
            }

            //this.fluentFilter.and(this._parent.EX.eq('id', administrativeStateId));

            this.customFilters.id = administrativeStateId;
            return this;
        }

        /**
         * Set entityType to search
         *
         * @example
         *  ogapi.administrativeStateSearchBuilder().withEntityType('myEntityType').build()
         * @param {!string} entityType - model name
         * @throws {Error} throw error when entityType is not typeof string
         * @return {AdministrativeStateSearchBuilder} 
         */
    }, {
        key: 'withEntityType',
        value: function withEntityType(entityType) {
            if (typeof entityType !== 'string') {
                throw new Error('Parameter entityType must be a string');
            }

            //if (!this._content[entityType]) {
            //    throw new Error('Parameter entityType must be one of the following: device or communicationsModule')
            //}

            // this.fluentFilter.and(this._parent.EX.eq('entityType', entityType));

            this.customFilters.entityType = entityType;

            return this;
        }
    }]);

    return AdministrativeStateSearchBuilder;
})(_SearchBuilder3['default']);

exports['default'] = AdministrativeStateSearchBuilder;
module.exports = exports['default'];
//# sourceMappingURL=AdministrativeStateSearchBuilder.js.map
