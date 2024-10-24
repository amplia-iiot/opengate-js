'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _EntityFinder2 = require('./EntityFinder');

var _EntityFinder3 = _interopRequireDefault(_EntityFinder2);

/**
 *   This class allow make get request to ticket provisioned resource into Opengate North API.
 */

var TicketFinder = (function (_EntityFinder) {
  _inherits(TicketFinder, _EntityFinder);

  /**     
   * @param {InternalOpenGateAPI} Reference to the API object.
   */

  function TicketFinder(ogapi) {
    _classCallCheck(this, TicketFinder);

    _get(Object.getPrototypeOf(TicketFinder.prototype), 'constructor', this).call(this, ogapi, 'ticket', 'Ticket not found', 'tickets');
  }

  return TicketFinder;
})(_EntityFinder3['default']);

exports['default'] = TicketFinder;
module.exports = exports['default'];
//# sourceMappingURL=TicketFinder.js.map
