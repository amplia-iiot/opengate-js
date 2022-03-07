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

var BASE_URL = 'timeseries';

exports.BASE_URL = BASE_URL;
/**
 * Defined a search over timeseries	
 * @example ogapi.timeserieSearchBuilder(organization, timeserieId)
 */

var TimeserieSearchBuilder = (function (_SearchBuilder) {
  _inherits(TimeserieSearchBuilder, _SearchBuilder);

  /**
   *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
   */

  function TimeserieSearchBuilder(parent, organization, timeserie) {
    _classCallCheck(this, TimeserieSearchBuilder);

    _get(Object.getPrototypeOf(TimeserieSearchBuilder.prototype), 'constructor', this).call(this, parent, {}, new _utilSearchingFieldsFieldFinder2['default'](parent, BASE_URL, { organization: organization, timeserie: timeserie }));
    this._url = BASE_URL + '/provision/organizations/' + organization + '/' + timeserie + '/data';
  }

  /**
   * The search request will have this group by 
   * @example
   * @param {!(object)} group 
   * @return {TimeserieSearchBuilder} 
   */

  _createClass(TimeserieSearchBuilder, [{
    key: 'group',
    value: function group(_group) {
      this._builderParams.group = _group || {};
      return this;
    }

    /**
     * The search request will have this filter 
     * @example
     *  ogapi.timeserieSearchBuilder(organization, timeserieId).select(
     *      ogapi.newSelectBuilder().add(SE.element("Identifier", ["value"], "id"), SE.add("Temperature", ["value"]))
     *  ) // Setting SelectBuilder
     *  ogapi.timeserieSearchBuilder(organization, timeserieId).select({ "elements": [{"name": "Identifier",
     *		"fields": [{"field": "value","alias": "identifier"}]},
     *      {"name": "Temperature","fields": [{"field": "value","alias": "identifier"}]}]
     *   }) //Custom select
     * @param {!(SelectBuilder|object)} select
     * @return {TimeserieSearchBuilder} 
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
     *  ogapi.timeserieSearchBuilder(organization, timeserieId).build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {Search} 
     */
  }, {
    key: 'build',
    value: function build() {
      return new _WPSearch2['default'](this._parent, this._buildUrl(), this._buildFilter(), this._buildLimit(), this._buildSort(), this._buildGroup(), this._buildSelect(), this._builderParams.timeout, this._urlParams);
    }
  }]);

  return TimeserieSearchBuilder;
})(_SearchBuilder3['default']);

exports['default'] = TimeserieSearchBuilder;
//# sourceMappingURL=TimeserieSearchBuilder.js.map
