'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var JOB_RESOURCE = "/jobs/";
var TASK_RESOURCE = "/tasks/";
var LIMIT_SIZE_DEF_VALUE = 10;

var OperationActions = (function () {

    /**
     * @param {InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     * @param {string} operationId - Identifier of the operation on which the action will be carried out
     */

    function OperationActions(ogapi, operationId) {
        _classCallCheck(this, OperationActions);

        if (typeof operationId !== 'string') throw new Error('Parameter operationId must be a string');
        this._ogapi = ogapi;
        this._resource = 'operation';
        this._operationId = operationId;
    }

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * This function active an operation
     * @example 
     * ogapi.newOperationActions("xxxxx-xxx-xxxx-xxxxx").active()
     * @return {Promise} 
     * @property {function (statusCode:number)} then - When request it is OK
     * @property {function (errors:array, statusCode:number)} then - When request it is NOK
     * @property {function (errors:array)} catch - When request it is NOK
     */

    _createClass(OperationActions, [{
        key: 'active',
        value: function active() {
            var config = {
                request: {
                    active: true
                }
            };
            this._key = "job";
            this._resource = this._resource + JOB_RESOURCE + this._operationId;
            return this._update(config);
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function pause an operation
         * @example 
         * ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx").pause()
         * @return {Promise} 
         * @property {function (statusCode:number)} then - When request it is OK
         * @property {function (errors:array, statusCode:number)} then - When request it is NOK
         * @property {function (errors:array)} catch - When request it is NOK
         */
    }, {
        key: 'pause',
        value: function pause() {
            var config = {
                request: {
                    active: false
                }
            };
            this._key = "job";
            this._resource = this._resource + JOB_RESOURCE + this._operationId;
            return this._update(config);
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function cancela operation
         * @return {Promise}
         * @property {function (result:object, statusCode:number)} then - When request it is OK
         * @property {function (errors:array, statusCode:number)} then - When request it is NOK
         * @property {function (errors:array)} catch - When request it is NOK
         * @example
         * Actions("xxxxx-xxx-xxxx-xxxxx").cancel();
         */
    }, {
        key: 'cancel',
        value: function cancel() {
            this._id = this._operationId;
            this._resource = this._resource + JOB_RESOURCE + this._id;
            return this._cancel(this._resource);
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function active periodicity of an operation
         * @example 
         * ogapi.newOperationActions("xxxxx-xxx-xxxx-xxxxx").activePeriodicity()
         * @return {Promise} 
         * @property {function (statusCode:number)} then - When request it is OK
         * @property {function (errors:array, statusCode:number)} then - When request it is NOK
         * @property {function (errors:array)} catch - When request it is NOK
         */
    }, {
        key: 'activePeriodicity',
        value: function activePeriodicity() {
            var config = {
                active: true
            };

            this._key = "task";
            this._resource = this._resource + TASK_RESOURCE;
            return this._periodicityActions("ACTIVE", config);
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function pause periodicity of an operation
         * @example 
         * ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx").pausePeriodicity()
         * @return {Promise} 
         * @property {function (statusCode:number)} then - When request it is OK
         * @property {function (errors:array, statusCode:number)} then - When request it is NOK
         * @property {function (errors:array)} catch - When request it is NOK
         */
    }, {
        key: 'pausePeriodicity',
        value: function pausePeriodicity() {
            var config = {
                active: false
            };
            this._key = "task";
            this._resource = this._resource + TASK_RESOURCE;
            return this._periodicityActions("PAUSE", config);
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function cancel the periodicity of an operation
         * @return {Promise}
         * @property {function (result:object, statusCode:number)} then - When request it is OK
         * @property {function (errors:array, statusCode:number)} then - When request it is NOK
         * @property {function (errors:array)} catch - When request it is NOK
         * @example
         * ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx").cancelPeriodicity();
         */
    }, {
        key: 'cancelPeriodicity',
        value: function cancelPeriodicity() {
            this._resource = this._resource + TASK_RESOURCE;
            return this._periodicityActions("CANCEL");
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function pause, update its delay and active an operation for execute immediately
         * @example 
         * ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx").executeNow()
         * @return {Promise} 
         * @property {function (statusCode:number)} then - When request it is OK
         * @property {function (errors:array, statusCode:number)} then - When request it is NOK
         * @property {function (errors:array)} catch - When request it is NOK
         */
    }, {
        key: 'executeNow',
        value: function executeNow() {
            var config = {
                request: {
                    schedule: {
                        start: {}
                    }
                }
            };
            return this._readAndUpdate(config, true);
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function pauses (if it was active), updates the delay and passes the operation to the initial state (if activated, activated again)
         * @example 
         * ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx").executeLater(10)
         * @param {!number} minutes 
         * @return {promise} 
         * @property {function (statusCode:number)} then - When request it is OK
         * @property {function (errors:array, statusCode:number)} then - When request it is NOK
         * @property {function (errors:array)} catch - When request it is NOK
         */
    }, {
        key: 'executeLater',
        value: function executeLater(minutes) {
            if (typeof minutes !== "number") {
                throw new Error("Parameter minutes must be typeof number");
            }
            var config = {
                request: {
                    schedule: {
                        start: {
                            delayed: _moment2['default'].duration(minutes, 'minutes').asMilliseconds()
                        }
                    }
                }
            };
            return this._readAndUpdate(config);
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function pauses (if it was active), updates the callback and passes the operation to the initial state (if activated, activated again)
         * @example 
         * ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx").changeCallback("http://[your_application_address]/[your_URI]")
         * @param {!string} url 
         * @return {promise} 
         * @property {function (statusCode:number)} then - When request it is OK
         * @property {function (errors:array, statusCode:number)} then - When request it is NOK
         * @property {function (errors:array)} catch - When request it is NOK
         */
    }, {
        key: 'changeCallback',
        value: function changeCallback(url) {
            if (typeof url !== "string") throw new Error('Parameter url must be a string');
            var config = {
                request: {
                    callback: url
                }
            };
            return this._readAndUpdate(config);
        }
    }, {
        key: '_cancel',
        value: function _cancel() {
            var _this2 = this;

            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._ogapi.Napi['delete'](this._resource).then(function (response) {
                if (response.statusCode === 200) {
                    defered.resolve({
                        statusCode: response.statusCode,
                        data: {
                            id: _this2._id
                        }
                    });
                } else {
                    defered.reject({
                        errors: response.errors,
                        statusCode: response.statusCode
                    });
                }
            })['catch'](function (error) {
                defered.reject(_this2._formatError(error));
            });
            return promise;
        }
    }, {
        key: '_periodicityActions',
        value: function _periodicityActions(action, config) {
            var _this = this;
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            _this._ogapi.newOperationFinder().findById(_this._operationId).then(function (response) {
                var data = response.data;
                if (!data || Object.keys(data).length == 0) {
                    //BUG http://cm.amplia.es/jira/browse/ODMQA-1057
                    defered.reject({
                        errors: "Operation with id " + _this._operationId + " not exists"
                    });
                } else {
                    var periodicityId = data.taskId;
                    if (!periodicityId) {
                        defered.reject({
                            errors: "Operation is not periodic!"
                        });
                    } else {
                        _this._resource = _this._resource + periodicityId;
                        switch (action) {
                            case "PAUSE":
                            case "ACTIVE":
                                _this._update(config).then(function (response) {
                                    defered.resolve(response);
                                })['catch'](function (error) {
                                    defered.reject(error);
                                });
                                break;
                            case "CANCEL":
                                _this._id = periodicityId;
                                _this._cancel().then(function (response) {
                                    defered.resolve(response);
                                })['catch'](function (error) {
                                    defered.reject(error);
                                });
                                break;
                            default:
                                defered.reject({
                                    errors: "Not implemented action: " + action
                                });
                        }
                    }
                }
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function read and update an operation
         * @example 
         * ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx")._readAndUpdate({})
         * @param {object} - config 
         * @param {boolean} - forceToActivate
         * @return {Promise} 
         * @property {function (statusCode:number)} then - When request it is OK
         * @property {function (errors:array, statusCode:number)} then - When request it is NOK
         * @property {function (error:string)} catch - When request it is NOK
         */
    }, {
        key: '_readAndUpdate',
        value: function _readAndUpdate(config, forceToActivate) {
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            var _this = this;
            _this._ogapi.newOperationFinder().findById(_this._operationId).then(function (response) {
                var data = response.data;
                if (!data) {
                    //BUG http://cm.amplia.es/jira/browse/ODMQA-1057
                    defered.reject("Operation with id " + _this._operationId + " not exists");
                } else {
                    (function () {
                        var active = data.operation ? data.operation.active : false;
                        if (active) {
                            _this.pause().then(function (response) {
                                _this._update(config, forceToActivate || active).then(function (response) {
                                    defered.resolve(response);
                                })['catch'](function (error) {
                                    defered.reject(_this._formatError(error));
                                });
                            })['catch'](function (error) {
                                defered.reject(_this._formatError(error));
                            });
                        } else {
                            _this._update(config, forceToActivate || active).then(function (response) {
                                defered.resolve(response);
                            })['catch'](function (error) {
                                defered.reject(_this._formatError(error));
                            });
                        }
                    })();
                }
            })['catch'](function (error) {
                defered.reject(_this._formatError(error));
            });

            return promise;
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function update an operation
         * @example 
         * ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx")._update({})
         * ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx")._update({}, _defered, _promise)
         * @return {Promise} 
         * @property {function (statusCode:number)} then - When request it is OK
         * @property {function (errors:array, statusCode:number)} then - When request it is NOK
         * @property {function (error:string)} catch - When request it is NOK
         */
    }, {
        key: '_update',
        value: function _update(config, forceToActivate) {
            var _this3 = this;

            var _this = this;
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            var obj = {};
            obj[_this._key] = config;
            this._ogapi.Napi.put(this._resource, obj).then(function (response) {
                if (forceToActivate) {
                    _this.active().then(function (response) {
                        defered.resolve(response);
                    })['catch'](function (error) {
                        defered.reject(this._formatError(error));
                    });
                } else {
                    if (response.status === 200) {
                        var data = response.text != "" ? JSON.parse(response.text) : {};
                        var _response = {
                            statusCode: response.status,
                            data: data
                        };
                        defered.resolve(response);
                    } else {
                        defered.reject({
                            errors: response.errors,
                            statusCode: response.status
                        });
                    }
                }
            })['catch'](function (error) {
                defered.reject(_this3._formatError(error));
            });
            return promise;
        }
    }, {
        key: '_formatError',
        value: function _formatError(error) {
            if (!error.data) {
                error.data = {};
            }
            if (!error.data.errors) {
                error.data.errors = [typeof error === "string" ? {
                    message: error
                } : error];
            }
            return error;
        }
    }]);

    return OperationActions;
})();

exports['default'] = OperationActions;
module.exports = exports['default'];
//# sourceMappingURL=OperationActions.js.map
