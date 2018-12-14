'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var PeriodicityActions = (function () {

    /**
     * @param {InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     * @param {string} taskId - Identifier of the periodicity on which the action will be carried out
     */

    function PeriodicityActions(ogapi, taskId) {
        _classCallCheck(this, PeriodicityActions);

        if (typeof taskId !== 'string') throw new Error('Parameter taskId must be a string');
        this._ogapi = ogapi;
        this._resource = 'operation/tasks/';
        this._taskId = taskId;
        this._key = 'task';
    }

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * This function active periodicity of an operation
     * @example 
     * ogapi.newPeriodicityActions("xxxxx-xxx-xxxx-xxxxx").activate()
     * @return {Promise} 
     * @property {function (statusCode:number)} then - When request it is OK
     * @property {function (errors:array, statusCode:number)} then - When request it is NOK
     * @property {function (errors:array)} catch - When request it is NOK
     */

    _createClass(PeriodicityActions, [{
        key: 'activate',
        value: function activate() {
            var config = {
                active: true
            };

            //console.log("active with config: " + JSON.stringify(config));
            return this._periodicityActions("ACTIVE", config);
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function pauses a periodicity
         * @example 
         * ogapi.periodicityActions("xxxxx-xxx-xxxx-xxxxx").pausePeriodicity()
         * @return {Promise} 
         * @property {function (statusCode:number)} then - When request it is OK
         * @property {function (errors:array, statusCode:number)} then - When request it is NOK
         * @property {function (errors:array)} catch - When request it is NOK
         */
    }, {
        key: 'pause',
        value: function pause() {
            var config = {
                active: false
            };
            //console.log("pause with config: " + JSON.stringify(config));

            //console.log("PAUSE_PERIODICITY_resource: " + this._resource);
            return this._periodicityActions("PAUSE", config);
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function cancel a periodicity
         * @return {Promise}
         * @property {function (result:object, statusCode:number)} then - When request it is OK
         * @property {function (errors:array, statusCode:number)} then - When request it is NOK
         * @property {function (errors:array)} catch - When request it is NOK
         * @example
         * ogapi.periodicityActions("xxxxx-xxx-xxxx-xxxxx").cancelPeriodicity();
         */
    }, {
        key: 'cancel',
        value: function cancel() {
            //console.log("cancel");

            return this._periodicityActions("CANCEL");
        }
    }, {
        key: '_cancel',
        value: function _cancel() {
            var _this2 = this;

            //console.log("cancel");
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._ogapi.Napi['delete'](this._resource).then(function (response) {
                //console.log("cancel response: " + JSON.stringify(response));
                if (response.statusCode === 200) {
                    defered.resolve({ statusCode: response.statusCode, data: { id: _this2._id } });
                } else {
                    defered.reject({ errors: response.errors, statusCode: response.statusCode });
                }
            })['catch'](function (error) {
                //console.log("cancel error: " + JSON.stringify(error));
                defered.reject(_this2._formatError(error));
            });
            return promise;
        }
    }, {
        key: '_periodicityActions',
        value: function _periodicityActions(action, config) {
            //console.log("_periodicityActions");
            var _this = this;
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            //console.log(_this._taskId);
            //console.log("OPERATION_ID: " + this._taskId);
            _this._ogapi.newOperationFinder().findPeriodicityByPeriodicityId(_this._taskId).then(function (response) {
                var data = response.data;
                if (!data || Object.keys(data).length == 0) {
                    defered.reject("Periodicity with id " + _this._taskId + " not exists");
                } else {
                    //console.log("RESPONSE_DATA: " + JSON.stringify(data));
                    var periodicityId = data.id;
                    _this._resource = _this._resource + periodicityId;
                    //console.log("RESOURCE_DATA: " + _this._resource);
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
                            defered.reject({ errors: "Not implemented action: " + action });
                    }
                }
            })['catch'](function (error) {
                //console.log("ERROR: " + error);
                defered.reject(error);
            });
            return promise;
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function read and update a task
         * @example 
         * ogapi.periodicityActions("xxxxx-xxx-xxxx-xxxxx")._readAndUpdate({})
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
            //console.log("_readAndUpdate with config: " + JSON.stringify(config) + " and forceToActivate: " + forceToActivate);
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            var _this = this;
            _this._ogapi.newOperationFinder().findPeriodicityByPeriodicityId(_this._taskId).then(function (response) {
                //console.log("_readAndUpdate find response: " + JSON.stringify(response));
                var data = response.data;
                if (!data) {
                    defered.reject("Periodicity with id " + _this._taskId + " not exists");
                } else {
                    (function () {
                        var active = data.task ? data.task.state === 'ACTIVE' : false;
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
                //console.log("_readAndUpdate find error: " + JSON.stringify(error));
                defered.reject(_this._formatError(error));
            });

            return promise;
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function update an operation
         * @example 
         * ogapi.periodicityActions("xxxxx-xxx-xxxx-xxxxx")._update({})
         * ogapi.periodicityActions("xxxxx-xxx-xxxx-xxxxx")._update({}, _defered, _promise)
         * @return {Promise} 
         * @property {function (statusCode:number)} then - When request it is OK
         * @property {function (errors:array, statusCode:number)} then - When request it is NOK
         * @property {function (error:string)} catch - When request it is NOK
         */
    }, {
        key: '_update',
        value: function _update(config, forceToActivate) {
            var _this3 = this;

            //console.log("_update with config: " + JSON.stringify(config) + " and forceToActivate: " + forceToActivate);
            //console.log("_update: " + JSON.stringify(config));
            var _this = this;
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            var obj = {};
            //console.log("_update_key: " + _this._key);
            obj[_this._key] = config;
            //console.log("_update_obj: " + JSON.stringify(obj));
            //console.log("_update_resource: " + this._resource);
            this._ogapi.Napi.put(this._resource, obj).then(function (response) {
                //console.log("_update response: " + JSON.stringify(response));
                if (forceToActivate) {
                    _this.active().then(function (response) {
                        defered.resolve(response);
                    })['catch'](function (error) {
                        defered.reject(this._formatError(error));
                    });
                } else {
                    if (response.status === 200) {
                        defered.resolve(response);
                    } else {
                        defered.reject({ errors: response.errors, statusCode: response.status });
                    }
                }
            })['catch'](function (error) {
                //console.log("_update error: " + error);
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
                error.data.errors = [typeof error === "string" ? { message: error } : error];
            }
            //console.log("_formatError: " + error);
            return error;
        }
    }]);

    return PeriodicityActions;
})();

exports['default'] = PeriodicityActions;
module.exports = exports['default'];
//# sourceMappingURL=PeriodicityActions.js.map
