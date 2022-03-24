'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _AlarmActionBuilder2 = require('./AlarmActionBuilder');

var _AlarmActionBuilder3 = _interopRequireDefault(_AlarmActionBuilder2);

/**
* Defines the builder to execute alarm attend operation
*/

var AlarmAttendBuilder = (function (_AlarmActionBuilder) {
	_inherits(AlarmAttendBuilder, _AlarmActionBuilder);

	/**
 * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
 */

	function AlarmAttendBuilder(ogapi) {
		_classCallCheck(this, AlarmAttendBuilder);

		_get(Object.getPrototypeOf(AlarmAttendBuilder.prototype), 'constructor', this).call(this, ogapi, "ATTEND");
	}

	return AlarmAttendBuilder;
})(_AlarmActionBuilder3['default']);

exports['default'] = AlarmAttendBuilder;
module.exports = exports['default'];
//# sourceMappingURL=AlarmAttendBuilder.js.map
