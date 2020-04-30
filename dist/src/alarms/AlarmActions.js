'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _actionsAlarmAttendBuilder = require('./actions/AlarmAttendBuilder');

var _actionsAlarmAttendBuilder2 = _interopRequireDefault(_actionsAlarmAttendBuilder);

var _actionsAlarmCloseBuilder = require('./actions/AlarmCloseBuilder');

var _actionsAlarmCloseBuilder2 = _interopRequireDefault(_actionsAlarmCloseBuilder);

/**
 * This class contains all alarms actions builders
 */

var AlarmActions = (function () {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     */

    function AlarmActions(ogapi) {
        _classCallCheck(this, AlarmActions);

        this._ogapi = ogapi;
    }

    /**
     * Create alarm close action builder
     *
     * @example
     *	ogapi.alarms.newCloseBuilder()
     * @return {AlarmCloseBuilder} 
     */

    _createClass(AlarmActions, [{
        key: 'newCloseBuilder',
        value: function newCloseBuilder() {
            return new _actionsAlarmCloseBuilder2['default'](this._ogapi);
        }

        /**
         * Create alarm attend action builder
         *
         * @example
         *	ogapi.alarms.newAttendBuilder()
         * @return {AlarmAttendBuilder} 
         */
    }, {
        key: 'newAttendBuilder',
        value: function newAttendBuilder() {
            return new _actionsAlarmAttendBuilder2['default'](this._ogapi);
        }
    }]);

    return AlarmActions;
})();

exports['default'] = AlarmActions;
module.exports = exports['default'];
//# sourceMappingURL=AlarmActions.js.map
