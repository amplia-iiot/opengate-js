'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Search2 = require('./Search');

var _Search3 = _interopRequireDefault(_Search2);

var IOT_URL = "/iot";

exports.IOT_URL = IOT_URL;
/** 
 * This extends Search and it allow make request to any available resource into /iot resource at Opengate North API
 */

var IotSearch = (function (_Search) {
  _inherits(IotSearch, _Search);

  /**
     * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     * @param {!string} url - this define a specific resource to make the search
     * @param {object} filter - this is the filter
     * @param {object} limit - this is the pagination about the search
     * @param {object} sort - this defined parameters to order the result of search
     */

  function IotSearch(ogapi, url, filter, limit, sort, timeout) {
    _classCallCheck(this, IotSearch);

    _get(Object.getPrototypeOf(IotSearch.prototype), 'constructor', this).call(this, ogapi, IOT_URL + url, filter, limit, sort, timeout);
  }

  return IotSearch;
})(_Search3['default']);

exports['default'] = IotSearch;
//# sourceMappingURL=IotSearch.js.map
