'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _catalogAlarmAttendBuilder = require('./catalog/AlarmAttendBuilder');

var _catalogAlarmAttendBuilder2 = _interopRequireDefault(_catalogAlarmAttendBuilder);

var _catalogAlarmCloseBuilder = require('./catalog/AlarmCloseBuilder');

var _catalogAlarmCloseBuilder2 = _interopRequireDefault(_catalogAlarmCloseBuilder);

var _catalogBaseOperationBuilder = require('./catalog/BaseOperationBuilder');

var _catalogBaseOperationBuilder2 = _interopRequireDefault(_catalogBaseOperationBuilder);

var _catalogPeriodPeriodicityUpdateBuilder = require('./catalog/period/PeriodicityUpdateBuilder');

var _catalogPeriodPeriodicityUpdateBuilder2 = _interopRequireDefault(_catalogPeriodPeriodicityUpdateBuilder);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

/**
 * This class generates all operations builders by a response to search into catalog/operations
 */

var Operations = (function () {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     */

    function Operations(ogapi) {
        _classCallCheck(this, Operations);

        var _this = this;
        this._ogapi = ogapi;
        this._operations = [];
        this._operationNames = ['ALARM_CLOSE', 'ALARM_ATTEND'];
        this._operations.push({ name: 'ALARM_CLOSE', builder: new _catalogAlarmCloseBuilder2['default'](ogapi) });
        this._operations.push({ name: 'ALARM_ATTEND', builder: new _catalogAlarmAttendBuilder2['default'](ogapi) });
    }

    /**	
     * Create a builder to update the periodicity of an operation 
     * @param {!String} operationId - identifier of the operation to be updated~
     * @return {Promise}
     */

    _createClass(Operations, [{
        key: 'updatePeriodicityBuilder',
        value: function updatePeriodicityBuilder(operationId) {
            if (typeof operationId !== "string") {
                throw new Error("Parameter operationId must be typeof string");
            }
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            var _this = this;
            this._ogapi.newOperationFinder().findPeriodicityById(operationId).then(function (response) {
                //console.log("RESPONSE_UPDATE_BUILDER: " + JSON.stringify(response));
                defered.resolve(_this._createPeriodicBuilder(response.data));
            })['catch'](function (error) {
                //console.log("ERROR_UPDATE_BUILDER: " + JSON.stringify(error));
                defered.reject(error);
            });
            return promise;
        }

        /**	
         * Create a builder to create an operation 
         * @param {!String} name - name of the operation to be created
         * @return {Promise}
         */
    }, {
        key: 'builderByOperationName',
        value: function builderByOperationName(name) {
            if (typeof name !== "string") {
                throw new Error("Parameter name must be typeof string");
            }
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            var opN = name.toUpperCase();
            var op = this._findOperation(opN);
            var _this = this;
            if (typeof op === "undefined") {
                this._loadOperationCatalog().then(function () {
                    var op = _this._findOperation(opN);
                    if (typeof op === "undefined") {
                        defered.reject("Operation <'" + opN + "'> unavailable.");
                    } else {
                        defered.resolve(_this._createBuilder(op.config));
                    }
                });
            } else {
                defered.resolve(this._createBuilder(op.config));
            }
            return promise;
        }
    }, {
        key: 'getOperationList',
        value: function getOperationList() {
            return merge(true, this._operationNames);
        }
    }, {
        key: '_createBuilder',
        value: function _createBuilder(config) {
            return new _catalogBaseOperationBuilder2['default'](this._ogapi, config);
        }
    }, {
        key: '_createPeriodicBuilder',
        value: function _createPeriodicBuilder(task) {
            //console.log("TASK: " + task.id);
            return new _catalogPeriodPeriodicityUpdateBuilder2['default'](this._ogapi, task.id, task);
        }
    }, {
        key: '_loadOperationCatalog',
        value: function _loadOperationCatalog() {
            var _this = this;
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._ogapi.rawSearchBuilder().from('/catalog/operations').build().execute().then(function (data) {
                if (data.statusCode === 200) {
                    var operations = data.data.operations;
                    for (var i in operations) {
                        var _name = operations[i].name.toUpperCase();
                        _this._operationNames.push(_name);
                        _this._operations.push({ name: _name, config: operations[i] });
                    }
                }
                defered.resolve(_this);
            })['catch'](function (err) {
                //console.log(err);
                defered.resolve(_this);
            });
            return promise;
        }
    }, {
        key: '_findOperation',
        value: function _findOperation(name) {
            return this._operations.find(function (config) {
                return config.name == this;
            }, name);
        }

        /**
         * Create alarm close operation builder
         *
         * @example
         *	ogapi.operations.builderFactory.newAlarmCloseBuilder()
         * @return {AlarmCloseBuilder} 
         */
    }, {
        key: 'newAlarmCloseBuilder',
        value: function newAlarmCloseBuilder() {
            return new _catalogAlarmCloseBuilder2['default'](this._ogapi);
        }

        /**
         * Create alarm attend operation builder
         *
         * @example
         *	ogapi.operations.builderFactory.newAlarmAttendBuilder()
         * @return {AlarmAttendBuilder} 
         */
    }, {
        key: 'newAlarmAttendBuilder',
        value: function newAlarmAttendBuilder() {
            return new _catalogAlarmAttendBuilder2['default'](this._ogapi);
        }
    }]);

    return Operations;
})();

exports['default'] = Operations;
module.exports = exports['default'];
//# sourceMappingURL=Operations.js.map
