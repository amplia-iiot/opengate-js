'use strict';

import q from 'q';

export default class PeriodicityActions {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     * @param {string} taskId - Identifier of the periodicity on which the action will be carried out
     */
    constructor(ogapi, taskId) {
        if (typeof taskId !== 'string')
            throw new Error('Parameter taskId must be a string');
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
    activate() {
        let config = {
            active: true
        };
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
    pause() {
        let config = {
            active: false
        };
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
    cancel() {
        return this._periodicityActions("CANCEL");
    }

    _cancel() {
        var defered = q.defer();
        var promise = defered.promise;
        this._ogapi.Napi.delete(this._resource)
            .then((response) => {
                if (response.statusCode === 200) {
                    defered.resolve({ statusCode: response.statusCode, data: { id: this._id } });
                } else {
                    defered.reject({ errors: response.errors, statusCode: response.statusCode });
                }
            })
            .catch((error) => {
                defered.reject(this._formatError(error));
            });
        return promise;
    }

    _periodicityActions(action, config) {
        var _this = this;
        var defered = q.defer();
        var promise = defered.promise;
        _this._ogapi.newOperationFinder().findPeriodicityByPeriodicityId(_this._taskId)
            .then(function (response) {
                var data = response.data;
                if (!data || Object.keys(data).length == 0) {
                    defered.reject("Periodicity with id " + _this._taskId + " not exists");
                } else {
                    let periodicityId = data.id;
                    _this._resource = _this._resource + periodicityId;
                    switch (action) {
                        case "PAUSE":
                        case "ACTIVE":
                            _this._update(config)
                                .then(function (response) {
                                    defered.resolve(response);
                                }).catch(function (error) {
                                    defered.reject(error);
                                });
                            break;
                        case "CANCEL":
                            _this._id = periodicityId;
                            _this._cancel()
                                .then(function (response) {
                                    defered.resolve(response);
                                }).catch(function (error) {
                                    defered.reject(error);
                                });
                            break;
                        default:
                            defered.reject({ errors: "Not implemented action: " + action });
                    }
                }
            })
            .catch(function (error) {
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
    _readAndUpdate(config, forceToActivate) {
        let defered = q.defer();
        let promise = defered.promise;
        var _this = this;
        _this._ogapi.newOperationFinder().findPeriodicityByPeriodicityId(_this._taskId).then(
            function (response) {
                var data = response.data;
                if (!data) {
                    defered.reject("Periodicity with id " + _this._taskId + " not exists");
                } else {
                    let active = data.task ? data.task.state === 'ACTIVE' : false;
                    if (active) {
                        _this.pause().then(
                            function (response) {
                                _this._update(config, forceToActivate || active).then(
                                    function (response) {
                                        defered.resolve(response);
                                    }
                                ).catch(
                                    function (error) {
                                        defered.reject(_this._formatError(error));
                                    }
                                );
                            }
                        ).catch(
                            function (error) {
                                defered.reject(_this._formatError(error));
                            }
                        );

                    } else {
                        _this._update(config, forceToActivate || active).then(
                            function (response) {
                                defered.resolve(response);
                            }
                        ).catch(
                            function (error) {
                                defered.reject(_this._formatError(error));
                            }
                        );
                    }
                }
            }
        ).catch(
            function (error) {
                defered.reject(_this._formatError(error));
            }
        );

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
    _update(config, forceToActivate) {
        var _this = this;
        let defered = q.defer();
        let promise = defered.promise;
        let obj = {};
        obj[_this._key] = config;
        this._ogapi.Napi
            .put(this._resource, obj)
            .then((response) => {
                if (forceToActivate) {
                    _this.active().then(
                        function (response) {
                            defered.resolve(response);
                        }
                    ).catch(
                        function (error) {
                            defered.reject(this._formatError(error));
                        }
                    );
                } else {
                    if (response.status === 200) {
                        defered.resolve(response);
                    } else {
                        defered.reject({ errors: response.errors, statusCode: response.status });
                    }
                }
            })
            .catch((error) => {
                defered.reject(this._formatError(error));
            });
        return promise;
    }

    _formatError(error) {
        if (!error.data) {
            error.data = {};
        }
        if (!error.data.errors) {
            error.data.errors = [(typeof (error) === "string") ? { message: error } : error];
        }
        return error;
    }


}