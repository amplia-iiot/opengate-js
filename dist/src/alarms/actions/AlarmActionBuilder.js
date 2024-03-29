'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Alarm = require('./Alarm');

var _Alarm2 = _interopRequireDefault(_Alarm);

/**
* Defines the builder to execute alarm actions
*/

var AlarmActionBuilder = (function () {
	/**
 * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
 * @param {!string} action - This action can be ATTEND or CLOSE
 */

	function AlarmActionBuilder(ogapi, action) {
		_classCallCheck(this, AlarmActionBuilder);

		this._ogapi = ogapi;
		this._action = action;
		this._resource = 'alarms';
		this._build = {
			alarms: [],
			notes: undefined,
			action: action
		};
		if (this.constructor === AlarmActionBuilder) {
			throw new Error("Cannot construct Abstract instances directly");
		}
	}

	/**
 * Add alarmId to operation
 * @example
 *	ogapi.alarms.builderFactory.newAlarmCloseBuilder().addAlarmId("")
 * @param {!string} alarmId - AlarmId of Alarm
 * @throws {Error} throw error when alarmId is not typeof string
 * @return {AlarmActionBuilder}
 */

	_createClass(AlarmActionBuilder, [{
		key: 'addAlarmId',
		value: function addAlarmId(alarmId) {
			if (typeof alarmId !== 'string') throw new Error('Parameter alarmId must be a string');
			this._build.alarms.push(alarmId);
			return this;
		}

		/**
  * Add notes to operation
  * @example
  *	ogapi.operations.builderFactory.newAlarmCloseBuilder().withNotes("")
  * @param {!string} notes - Notes about operation
  * @throws {Error} throw error when notes is not typeof string
  * @return {AlarmActionBuilder}
  */
	}, {
		key: 'withNotes',
		value: function withNotes(notes) {
			if (typeof notes !== 'string') throw new Error('Parameter notes must be a string');
			this._build.notes = notes;
			return this;
		}

		/**
  * Build a instance of Operation 
  *
  * @example
  *	ogapi.operations.builderFactory.newAlarmCloseBuilder().build()
  * @throws {Error} Throw error if there is not alarmId
  * @return {Operation} 
  */
	}, {
		key: 'build',
		value: function build() {
			if (this._build.alarms.length === 0) {
				throw new Error('Builder error. You must append at least one alarmId with addAlarmId method');
			}
			if (typeof this._build.notes !== 'string') {
				delete this._build.notes;
			}
			return new _Alarm2['default'](this._ogapi, this._resource, this._build);
		}
	}]);

	return AlarmActionBuilder;
})();

exports['default'] = AlarmActionBuilder;
module.exports = exports['default'];
//# sourceMappingURL=AlarmActionBuilder.js.map
