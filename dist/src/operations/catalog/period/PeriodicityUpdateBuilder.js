'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Operation = require('../Operation');

var _Operation2 = _interopRequireDefault(_Operation);

var _ExecuteEveryBuilder = require('./ExecuteEveryBuilder');

var _ExecuteEveryBuilder2 = _interopRequireDefault(_ExecuteEveryBuilder);

var _ExecuteEachBuilder = require('./ExecuteEachBuilder');

var _ExecuteEachBuilder2 = _interopRequireDefault(_ExecuteEachBuilder);

var _patternByGeneric = require('./pattern/ByGeneric');

var _patternByGeneric2 = _interopRequireDefault(_patternByGeneric);

var _utilDATE_FORMAT = require('./../../../util/DATE_FORMAT');

var PeriodicityUpdateBuilder = (function () {
    function PeriodicityUpdateBuilder(ogapi, taskId, taskObj) {
        _classCallCheck(this, PeriodicityUpdateBuilder);

        this._ogapi = ogapi;
        this._task = taskObj;
        this.task_id = taskId;
        this._resource = "/tasks/" + this.task_id;
        this._build = (0, _merge2['default'])(true, this._task.job.request);
    }

    /**
     * The operation will execute with a period that you must define with ExecuteEveryBuilder 
     * @param {!Date} date - Date when operation will be executed
     * @param {number or Date} end - When periodicity ends. By repetitions or by date
     * @throws {Error} throw error when date is not typeof Date
     * @return {ExecuteEvery}
     */

    _createClass(PeriodicityUpdateBuilder, [{
        key: 'executeEvery',
        value: function executeEvery(date, end) {
            var args = Array.prototype.slice.call(arguments);
            var _end = this._getEnd(args.slice(1, 3));
            date = this._getStart(date);
            this._byGeneric = new _patternByGeneric2['default'](this, date, null, end)._build();
            return new _ExecuteEveryBuilder2['default'](this, date, null, _end);
        }

        /**
         * The operation will execute with a period that you must define with ExecuteEachBuilder 
         * @param {!Date} date - Date when operation will be executed
         * @param {number or Date} end - When periodicity ends. By repetitions or by date 
         * @throws {Error} throw error when date is not typeof Date
         * @return {ExecuteEach}
         */
    }, {
        key: 'executeEach',
        value: function executeEach(date, end) {
            var args = Array.prototype.slice.call(arguments);
            var _end = this._getEnd(args.slice(1, 3));
            var schedule = this._task.schedule;
            date = this._getStart(date);
            if (schedule && schedule.repeating && schedule.repeating.period) {
                var period = schedule.repeating.period;
                return new _ExecuteEachBuilder2['default'](this, date, null, _end)._addPeriod(period.each, period.unit);
            }
            return new _ExecuteEachBuilder2['default'](this, date, null, _end);
        }
    }, {
        key: '_getStart',
        value: function _getStart(date) {
            var schedule = this._task.schedule;
            if (!date && schedule.start && schedule.start.date) {
                date = new Date(schedule.start.date);
            }
            return date;
        }
    }, {
        key: '_getEnd',
        value: function _getEnd(args) {
            for (var i = 0; i < args.length; i++) {
                if (typeof args[i] === "number" || args[i].constructor === Date) {
                    return args[i];
                }
            }
            var schedule = this._task.schedule;
            if (schedule.stop && schedule.stop.date) {
                return new Date(schedule.stop.date);
            }
            return undefined;
        }
    }, {
        key: 'build',
        value: function build() {
            var _build = (0, _merge2['default'])(true, this._build);
            var postObj = undefined;
            var errors = [];
            if (typeof this._build.task !== "undefined") {
                var task = this._build.task;
                // CHECK period and job timeout
                var jobTimeout = this._build.schedule.stop;
                if (typeof task.repeating.period !== "undefined") {
                    var maxJobTimeout = undefined;
                    switch (task.repeating.period.unit) {
                        case "DAYS":
                            maxJobTimeout = _moment2['default'].duration(task.repeating.period.each, 'days').asMilliseconds();
                            break;
                        case "HOURS":
                            maxJobTimeout = _moment2['default'].duration(task.repeating.period.each, 'hours').asMilliseconds();
                            break;
                        case "MINUTES":
                            maxJobTimeout = _moment2['default'].duration(task.repeating.period.each, 'minutes').asMilliseconds();
                            break;
                    }
                    if (typeof jobTimeout !== "undefined" && typeof jobTimeout.delayed === "number") {
                        if (jobTimeout.delayed >= maxJobTimeout) {
                            errors.push("You can not execute an operation with a job timeout greater than the repetition period.");
                        }
                    }
                }
            }

            if (errors.length > 0) {
                this._build = _build;
                throw errors;
            }
            if (typeof this._build.task !== "undefined") {
                postObj = this._updateTask(this._build);
            }
            var op = new _Operation2['default'](this._ogapi, this._resource, postObj);
            // Se deshacen todos los por defectos aplicados al objeto builder, para no condicionar el siguiente .build
            this._build = _build;
            return op;
        }
    }, {
        key: '_updateTask',
        value: function _updateTask(_build) {
            var task = _build.task;
            var now = (0, _moment2['default'])(new Date());
            var start = (0, _moment2['default'])(task.start);

            var taskObj = {
                task: {
                    schedule: {}
                }
            };
            try {
                if (task.start) {
                    taskObj.task.schedule.start = { "date": start.format(_utilDATE_FORMAT.DATE_FORMAT) };
                }

                if (task.stop) {
                    taskObj.task.schedule.stop = { "date": (0, _moment2['default'])(task.stop).format(_utilDATE_FORMAT.DATE_FORMAT) };
                }

                if (task.repeating) {
                    taskObj.task.schedule.repeating = task.repeating;
                }
            } catch (err) {}
            delete taskObj.task.schedule.name;
            if (typeof task.stop !== "undefined") {
                if (typeof task.stop.date !== "undefined") {
                    taskObj.task.schedule.stop = {
                        date: (0, _moment2['default'])(task.stop.date).format(_utilDATE_FORMAT.DATE_FORMAT)
                    };
                } else {
                    taskObj.task.schedule.stop = task.stop;
                }
            }
            if (_moment2['default'].max(now, start) == now) {
                if (typeof task.stop !== "undefined" && typeof task.stop.date !== "undefined") {
                    var stopDate = (0, _moment2['default'])(task.stop.date);
                    if (_moment2['default'].max(now, stopDate) == now) {
                        throw new Error("Can not create operation object because stop operation period is earlier than current date. " + "It happened because you passed a lot of time between configuration of an operation and create the operation.");
                    }
                }
                delete taskObj.task.schedule.start;
            }
            return taskObj;
        }
    }]);

    return PeriodicityUpdateBuilder;
})();

exports['default'] = PeriodicityUpdateBuilder;
module.exports = exports['default'];
//# sourceMappingURL=PeriodicityUpdateBuilder.js.map
