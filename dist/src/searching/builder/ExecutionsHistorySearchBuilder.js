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

/**
 * Defined a search over Executions	
 * @example ogapi.executionsHistorySearchBuilder()
 */

var ExecutionsHistorySearchBuilder = (function (_SearchWithSummaryBuilder) {
  _inherits(ExecutionsHistorySearchBuilder, _SearchWithSummaryBuilder);

  /**
   *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
   */

  function ExecutionsHistorySearchBuilder(parent) {
    var fieldFinder = arguments.length <= 1 || arguments[1] === undefined ? new _utilSearchingFieldsFieldFinder2['default'](parent, '/operations') : arguments[1];
    return (function () {
      _classCallCheck(this, ExecutionsHistorySearchBuilder);

      _get(Object.getPrototypeOf(ExecutionsHistorySearchBuilder.prototype), 'constructor', this).call(this, parent, {}, fieldFinder);
      this._url = '/entities' + '/operations';
      _get(Object.getPrototypeOf(ExecutionsHistorySearchBuilder.prototype), 'constructor', this).call(this, parent, {}, new _utilSearchingFieldsFieldFinder2['default'](parent));
    }).apply(this, arguments);
  }

  /**
   * The response will only have a summary information 
   * @example
   *	ogapi.executionsHistorySearchBuilder().summary() 
   * @return {ExecutionsHistorySearchBuilder} 
   */

  _createClass(ExecutionsHistorySearchBuilder, [{
    key: 'summary',
    value: function summary() {
      this._url = this._url + '/summary';
      return this;
    }
  }]);

  return ExecutionsHistorySearchBuilder;
})(_SearchWithSummaryBuilder3['default']);

exports['default'] = ExecutionsHistorySearchBuilder;
module.exports = exports['default'];
//# sourceMappingURL=ExecutionsHistorySearchBuilder.js.map
