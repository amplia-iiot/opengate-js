'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SearchBuilder = require('./SearchBuilder');

var _SearchBuilder2 = _interopRequireDefault(_SearchBuilder);

var _EntitySearchBuilder2 = require('./EntitySearchBuilder');

var _EntitySearchBuilder3 = _interopRequireDefault(_EntitySearchBuilder2);

var _utilSearchingFieldsFieldFinder = require('../../util/searchingFields/FieldFinder');

var _utilSearchingFieldsFieldFinder2 = _interopRequireDefault(_utilSearchingFieldsFieldFinder);

var BASE_URL = '/devices';
/**
 * Defined a search over Devices	
 * @example ogapi.devicesSearchBuilder()
 */

var DevicesSearchBuilder = (function (_EntitySearchBuilder) {
  _inherits(DevicesSearchBuilder, _EntitySearchBuilder);

  /**
   *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
   */

  function DevicesSearchBuilder(parent) {
    _classCallCheck(this, DevicesSearchBuilder);

    _get(Object.getPrototypeOf(DevicesSearchBuilder.prototype), 'constructor', this).call(this, parent, BASE_URL, new _utilSearchingFieldsFieldFinder2['default'](parent, BASE_URL));
  }

  return DevicesSearchBuilder;
})(_EntitySearchBuilder3['default']);

exports['default'] = DevicesSearchBuilder;
module.exports = exports['default'];
//# sourceMappingURL=DevicesSearchBuilder.js.map
