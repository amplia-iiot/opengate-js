'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _provisionBaseProvision = require('../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

var IOT_URL = '/iot';

exports.IOT_URL = IOT_URL;
/**
 * This is an abstract class, it must be extended to another class that defines the different actions of a specific IoT provision.
 * This class is responsible for managing the request to execute Norte OpenGate API
 */

var IoTProfiles = (function (_BaseProvision) {
  _inherits(IoTProfiles, _BaseProvision);

  /**
   * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
   * @param {!string} resource - this is a base url resource
  */

  function IoTProfiles(ogapi, resource) {
    _classCallCheck(this, IoTProfiles);

    _get(Object.getPrototypeOf(IoTProfiles.prototype), 'constructor', this).call(this, ogapi, IOT_URL + resource);
  }

  return IoTProfiles;
})(_provisionBaseProvision2['default']);

exports['default'] = IoTProfiles;
//# sourceMappingURL=IoTProvision.js.map
