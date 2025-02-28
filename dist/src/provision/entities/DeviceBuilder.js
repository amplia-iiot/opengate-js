'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ComplexBuilder2 = require('./ComplexBuilder');

var _ComplexBuilder3 = _interopRequireDefault(_ComplexBuilder2);

var _SubscriberBuilder = require('./SubscriberBuilder');

var _SubscriptionBuilder = require('./SubscriptionBuilder');

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _jsonpath = require('jsonpath');

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var ID = 'provision.device.identifier';

var BoxBuilder = (function () {
    function BoxBuilder(ogapi, obj, url, key, urlParameters, timeout) {
        _classCallCheck(this, BoxBuilder);

        var _this = this;
        var subscribers = {};
        var subscriptions = {};

        this._obj = obj;
        this._url = url;
        this._ogapi = ogapi;
        this._key = key;
        this._timeout = timeout || null;
        this._objClone = Object.assign({}, obj);

        this._deviceKeys = Object.keys(obj).filter(function (dsName) {
            return dsName.indexOf('subscriber') === -1 && dsName.indexOf('subscription') === -1;
        });
        this._subscriberKeys = Object.keys(obj).filter(function (dsName) {
            return dsName.indexOf('subscriber') !== -1;
        });
        this._subscriptionKeys = Object.keys(obj).filter(function (dsName) {
            return dsName.indexOf('subscription') !== -1;
        });
        this._administrationKeys = Object.keys(obj).filter(function (dsName) {
            return dsName.indexOf('provision.administration') !== -1;
        });
        this._wrappers = [];
        this._urlParameters = urlParameters;

        this._subscriberKeys.forEach(function (key) {
            _this._obj[key].forEach(function (value) {
                if (!subscribers[value._index.value]) {
                    subscribers[value._index.value] = {};
                }
                subscribers[value._index.value][key] = {
                    _value: value._value
                };
            });
        });

        this._subscriptionKeys.forEach(function (key) {
            _this._obj[key].forEach(function (value) {
                if (!subscriptions[value._index.value]) {
                    subscriptions[value._index.value] = {};
                }
                subscriptions[value._index.value][key] = {
                    _value: value._value
                };
            });
        });

        Object.keys(subscriptions).forEach(function (commsId) {
            var obj = subscriptions[commsId];
            _this._administrationKeys.forEach(function (key) {
                obj[key] = _this._obj[key];
            });
            _this._wrappers.push(new WrapperBuilder(_this._ogapi, obj, _this._url.replace('devices', 'subscriptions').replace('/' + _this._key._value._current.value, ''), obj[_SubscriptionBuilder.SubscriptionID]._value._current.value));
        });
        Object.keys(subscribers).forEach(function (commsId) {
            var obj = subscribers[commsId];
            _this._administrationKeys.forEach(function (key) {
                obj[key] = _this._obj[key];
            });
            _this._wrappers.push(new WrapperBuilder(_this._ogapi, obj, _this._url.replace('devices', 'subscribers').replace('/' + _this._key._value._current.value, ''), obj[_SubscriberBuilder.SubscriberID]._value._current.value));
        });
    }

    _createClass(BoxBuilder, [{
        key: '_urlWithKey',
        value: function _urlWithKey() {
            return this._url + '/' + this._key._value._current.value;
        }
    }, {
        key: '_getUrlParameters',
        value: function _getUrlParameters() {
            return this._urlParameters;
        }
    }, {
        key: '_setUrlParameters',
        value: function _setUrlParameters(parameters) {
            if (this._urlParameters) {
                var keys = Object.keys(parameters);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    this._urlParameters[key] = parameters[key];
                }
            } else {
                this._urlParameters = parameters;
            }
        }
    }, {
        key: 'create',
        value: function create() {
            var _this2 = this;

            var defer = _q2['default'].defer();
            var postObj = {};
            var putObj = this._objClone;
            var childEntityPromises = [];
            var _this = this;

            Object.keys(putObj).filter(function (key) {
                return key.indexOf('subscriber') === -1 && key.indexOf('subscription') === -1;
            }).forEach(function (deviceKey) {
                postObj[deviceKey] = putObj[deviceKey];
            });

            this._wrappers.forEach(function (wrapper) {
                childEntityPromises.push({
                    wrapper: wrapper,
                    promise: wrapper.execute(defer, 10)
                });
            });

            _q2['default'].allSettled(childEntityPromises.reduce(function (previousValue, current) {
                previousValue.push(current.promise);
                return previousValue;
            }, [])).then(function () {
                defer.notify({
                    message: 'OGAPI_201_ENTITIES_CREATED',
                    type: 'success',
                    percentage: 20
                });
                defer.notify({
                    entity: _this._key._value._current.value,
                    message: 'OGAPI_CREATING_DEVICE',
                    type: 'success',
                    percentage: 25
                });
                return _this._ogapi.Napi.post(_this._url, postObj, null, null, {
                    flattened: true
                }).then(function (res) {
                    if (_this._wrappers.length > 0) {
                        defer.notify({
                            message: 'OGAPI_ADDING_RELATED_ENTITIES',
                            type: 'success',
                            percentage: 55
                        });
                        _this2._setUrlParameters({
                            'flattened': true
                        });
                        return _this._ogapi.Napi.put(_this._urlWithKey(), putObj, _this2._timeout, null, _this2._getUrlParameters()).then(function (res) {
                            if (res.statusCode === _httpStatusCodes2['default'].OK) {
                                if (typeof _this._onCreated === "function") {
                                    _this._onCreated(res.header.location);
                                }
                                defer.notify({
                                    entity: _this._key._value._current.value,
                                    message: 'OGAPI_DEVICE_CREATED',
                                    type: 'success',
                                    percentage: 75
                                });
                                defer.resolve({
                                    location: res.header.location,
                                    statusCode: res.statusCode
                                });
                            } else {
                                defer.reject({
                                    errors: res.errors,
                                    statusCode: res.statusCode
                                });
                            }
                        });
                    } else {
                        if (res.statusCode === _httpStatusCodes2['default'].CREATED) {
                            if (typeof _this._onCreated === "function") {
                                _this._onCreated(res.header.location);
                            }
                            defer.notify({
                                entity: _this._key._value._current.value,
                                message: 'OGAPI_DEVICE_CREATED',
                                type: 'success',
                                percentage: 75
                            });
                            defer.resolve({
                                location: res.header.location,
                                statusCode: res.statusCode
                            });
                        } else {
                            defer.reject({
                                errors: res.errors,
                                statusCode: res.statusCode
                            });
                        }
                    }
                })['catch'](function (errores) {

                    if (errores.statusCode === _httpStatusCodes2['default'].BAD_REQUEST) {
                        var ms = _jsonpath2['default'].query(errores, '$..message')[0];

                        if (ms.includes('Entity duplicated')) {
                            defer.reject({
                                errors: errores.data.errors,
                                statusCode: errores.statusCode
                            });
                        } else {
                            defer.reject({
                                errors: errores.data.errors,
                                statusCode: errores.statusCode
                            });
                        }
                    } else {
                        defer.reject({
                            errors: errores.data,
                            statusCode: errores.statusCode
                        });
                    }
                });
            })['catch'](function (err) {
                err.data.errors.forEach(function (err) {
                    var error = err.description;
                    if (err.label) error += ":" + err.label;
                    defer.notify({
                        message: 'Error: ' + error,
                        type: 'error',
                        percentage: 80
                    });
                });
                var deletePromises = [_this['delete'](defer, 90)];
                childEntityPromises.forEach(function (item) {
                    deletePromises.push(item.wrapper['delete'](defer, 90));
                });
                _q2['default'].allSettled(deletePromises).then(function () {
                    defer.reject(err);
                })['catch'](function () {
                    defer.reject(err);
                });
            });
            return defer.promise;
        }
    }, {
        key: 'update',
        value: function update() {
            var _this3 = this;

            var defer = _q2['default'].defer();
            var putObj = this._objClone;
            var childEntityPromises = [];
            var _this = this;

            this._wrappers.forEach(function (wrapper) {
                childEntityPromises.push({
                    wrapper: wrapper,
                    promise: wrapper.execute(defer, 20)
                });
            });

            _q2['default'].allSettled(childEntityPromises.reduce(function (previousValue, current) {
                previousValue.push(current.promise);
                return previousValue;
            }, [])).then(function () {
                defer.notify({
                    message: 'OGAPI_201_ENTITIES_CREATED',
                    type: 'success',
                    percentage: 40
                });
                defer.notify({
                    entity: _this._key._value._current.value,
                    message: 'OGAPI_ADDING_RELATED_ENTITIES',
                    type: 'success',
                    percentage: 45
                });
                _this3._setUrlParameters({
                    'flattened': true
                });

                return _this._ogapi.Napi.put(_this._url, putObj, _this3._timeout, null, _this3._getUrlParameters()).then(function (res) {
                    if (res.statusCode === _httpStatusCodes2['default'].OK) {
                        if (typeof _this._onCreated === "function") {
                            _this._onCreated(res.header.location);
                        }
                        defer.notify({
                            entity: _this._key._value._current.value,
                            message: 'OGAPI_DEVICE_UPDATED',
                            type: 'success',
                            percentage: 90
                        });
                        defer.resolve({
                            location: res.header.location,
                            statusCode: res.statusCode
                        });
                    } else {
                        defer.reject({
                            errors: res.errors,
                            statusCode: res.statusCode
                        });
                    }
                });
            })['catch'](function (err) {
                defer.notify('OGAPI_SOMETHING_WRONG_UPDATING_DEVICE');
                defer.reject(err);
            });
            return defer.promise;
        }
    }, {
        key: 'patch',
        value: function patch() {
            var _this4 = this;

            var defer = _q2['default'].defer();
            var putObj = this._obj;
            var childEntityPromises = [];
            var _this = this;

            this._wrappers.forEach(function (wrapper) {
                childEntityPromises.push({
                    wrapper: wrapper,
                    promise: wrapper.execute(defer, 20)
                });
            });

            _q2['default'].allSettled(childEntityPromises.reduce(function (previousValue, current) {
                previousValue.push(current.promise);
                return previousValue;
            }, [])).then(function () {
                defer.notify({
                    message: 'OGAPI_201_ENTITIES_CREATED',
                    type: 'success',
                    percentage: 40
                });
                defer.notify({
                    entity: _this._key._value._current.value,
                    message: 'OGAPI_ADDING_RELATED_ENTITIES',
                    type: 'success',
                    percentage: 45
                });
                _this4._setUrlParameters({
                    'flattened': true
                });

                return _this._ogapi.Napi.patch(_this._url, putObj, _this4._timeout, null, _this4._getUrlParameters()).then(function (res) {
                    if (res.statusCode === _httpStatusCodes2['default'].OK) {
                        if (typeof _this._onCreated === "function") {
                            _this._onCreated(res.header.location);
                        }
                        defer.notify({
                            entity: _this._key._value._current.value,
                            message: 'OGAPI_DEVICE_UPDATED',
                            type: 'success',
                            percentage: 90
                        });
                        defer.resolve({
                            location: res.header.location,
                            statusCode: res.statusCode
                        });
                    } else {
                        defer.reject({
                            errors: res.errors,
                            statusCode: res.statusCode
                        });
                    }
                });
            })['catch'](function (err) {
                defer.notify('OGAPI_SOMETHING_WRONG_UPDATING_DEVICE');
                defer.reject(err);
            });
            return defer.promise;
        }
    }, {
        key: 'delete',
        value: function _delete(defered, percentage) {
            var _this = this;
            return this._ogapi.Napi['delete'](this._urlWithKey()).then(function (res) {
                defered.notify({
                    entity: _this._key,
                    message: 'OGAPI_ENTITY_DELETED',
                    type: 'warning',
                    percentage: percentage
                });
            });
        }
    }]);

    return BoxBuilder;
})();

var WrapperBuilder = (function () {
    function WrapperBuilder(ogapi, obj, url, key) {
        _classCallCheck(this, WrapperBuilder);

        this._obj = obj;
        this._url = url;
        this._ogapi = ogapi;
        this._key = key;
        this._created = false;
    }

    /**
     * Device builder. This builder give you the necessary tools to create a device using our OpenGate REST.
     */

    _createClass(WrapperBuilder, [{
        key: '_urlWithKey',
        value: function _urlWithKey() {
            return this._url + '/' + this._key;
        }
    }, {
        key: '_checkExists',
        value: function _checkExists() {
            return this._ogapi.Napi.get(this._urlWithKey()).then(function (response) {
                return response.statusCode === _httpStatusCodes2['default'].OK;
            })['catch'](function (err) {
                console.warn(err);
                return false;
            });
        }
    }, {
        key: 'execute',
        value: function execute(defered, percentage) {
            var defer = _q2['default'].defer();
            var _this = this;
            this._checkExists().then(function (exists) {
                if (!exists) {
                    create(defered, defer, percentage);
                } else {
                    defer.resolve({
                        message: 'OGAPI_ENTITY_ALREADY_CREATED',
                        entity: _this._key
                    });
                }
            })['catch'](function (exists) {
                if (!exists) {
                    create(defered, defer, percentage);
                } else {
                    defer.resolve({
                        message: 'OGAPI_ENTITY_ALREADY_CREATED',
                        entity: _this._key
                    });
                }
            });
            return defer.promise;

            function create(defered, defer, percentage) {
                _this._obj['provision.administration.serviceGroup'] = { "_value": { "_current": { "value": "emptyServiceGroup" } } };
                _this._ogapi.Napi.post(_this._url, _this._obj, null, null, {
                    flattened: true
                }).then(function (res) {
                    _this._created = true;
                    defered.notify({
                        entity: _this._key,
                        message: 'OGAPI_ENTITY_CREATED',
                        type: 'success',
                        percentage: percentage
                    });
                    defer.resolve({
                        message: 'OGAPI_ENTITY_CREATED',
                        entity: _this._key
                    });
                })['catch'](function (err) {
                    console.error(err);
                    defered.notify({
                        entity: _this._key,
                        message: 'OGAPI_ENTITY_CREATED',
                        type: 'warning',
                        percentage: percentage
                    });
                    defer.reject({
                        entity: _this._key,
                        message: 'OGAPI_SOMETHING_WRONG_CREATING'
                    });
                });
            }
        }
    }, {
        key: 'delete',
        value: function _delete(defered, percentage) {
            var _this = this;
            if (this._created) {
                return this._ogapi.Napi['delete'](this._urlWithKey()).then(function (res) {
                    defered.notify({
                        entity: _this._key,
                        message: 'OGAPI_ENTITY_DELETED',
                        type: 'warning',
                        percentage: percentage
                    });
                });
            }
            return Q.fcall(function () {
                return;
            });
        }
    }]);

    return WrapperBuilder;
})();

var DeviceBuilder = (function (_ComplexBuilder) {
    _inherits(DeviceBuilder, _ComplexBuilder);

    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - this is the organization name where device will be created
     * @param {!array} [allowedDatastreams] - Allowed datastreams to add into the new device
     * @param {!array} [definedSchemas] - Jsonschema about all OpenGate specific types
     * @param {!Validator} [jsonSchemaValidator] - Json schema validator tool
     * @param {number} ms - timeout in milliseconds    
     */

    function DeviceBuilder(ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout) {
        _classCallCheck(this, DeviceBuilder);

        _get(Object.getPrototypeOf(DeviceBuilder.prototype), 'constructor', this).call(this, ogapi, organization + '/devices', allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout);
        this._organization = organization;
    }

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * This function create a entity of provision
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     * @example
     *  ogapi.organizationsBuilder().create()
     */

    _createClass(DeviceBuilder, [{
        key: 'create',
        value: function create() {
            this._checkRequiredParameters();
            return new BoxBuilder(this._ogapi, this._composeElement(), this._resource, this._getEntityKey(), this._getUrlParameters(), this._timeout).create();
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function updates a entity of provision and check if any subscriber/subscription exits or no. 
         * If a subscriber/subscription not exists then this entities will be created and after that will be added to entity box.
         * @return {Promise}
         * @property {function (result:object, statusCode:number)} then - When request it is OK
         * @property {function (error:string)} catch - When request it is NOK
         * @example
         *  ogapi.entityBuilder.devicesBuilder().update()
         */
    }, {
        key: 'update',
        value: function update() {
            return new BoxBuilder(this._ogapi, this._composeElement(), this._buildURL(), this._getEntityKey(), this._getUrlParameters(), this._timeout).update();
        }
    }, {
        key: '_getEntityKey',
        value: function _getEntityKey() {
            return this._entity[ID];
        }
    }]);

    return DeviceBuilder;
})(_ComplexBuilder3['default']);

exports['default'] = DeviceBuilder;
module.exports = exports['default'];
//# sourceMappingURL=DeviceBuilder.js.map
