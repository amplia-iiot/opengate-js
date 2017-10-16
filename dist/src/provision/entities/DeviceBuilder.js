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

var ID = 'provision.device.identifier',
    PUT_METHOD = 'PUT',
    POST_METHOD = 'POST';

var BoxBuilder = (function () {
    function BoxBuilder(ogapi, obj, url, key) {
        _classCallCheck(this, BoxBuilder);

        var _this = this;
        var subscribers = {};
        var subscriptions = {};

        this._obj = obj;
        this._url = url;
        this._ogapi = ogapi;
        this._key = key;
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

        this._subscriberKeys.forEach(function (key) {
            _this._obj[key].forEach(function (value) {
                if (!subscribers[value._index.value]) {
                    subscribers[value._index.value] = {};
                }
                subscribers[value._index.value][key] = { _value: value._value };
            });
        });

        this._subscriptionKeys.forEach(function (key) {
            _this._obj[key].forEach(function (value) {
                if (!subscriptions[value._index.value]) {
                    subscriptions[value._index.value] = {};
                }
                subscriptions[value._index.value][key] = { _value: value._value };
            });
        });

        Object.keys(subscriptions).forEach(function (commsId) {
            var obj = subscriptions[commsId];
            _this._administrationKeys.forEach(function (key) {
                obj[key] = _this._obj[key];
            });
            _this._wrappers.push(new WrapperBuilder(_this._ogapi, obj, _this._url.replace('devices', 'subscriptions'), obj[_SubscriptionBuilder.SubscriptionID]._value._current.value));
        });
        Object.keys(subscribers).forEach(function (commsId) {
            var obj = subscribers[commsId];
            _this._administrationKeys.forEach(function (key) {
                obj[key] = _this._obj[key];
            });
            _this._wrappers.push(new WrapperBuilder(_this._ogapi, obj, _this._url.replace('devices', 'subscribers'), obj[_SubscriberBuilder.SubscriberID]._value._current.value));
        });
    }

    _createClass(BoxBuilder, [{
        key: 'create',
        value: function create() {
            var defer = _q2['default'].defer();
            var postObj = {};
            var putObj = this._obj;
            var childEntityPromises = [];
            var _this = this;

            Object.keys(putObj).filter(function (key) {
                return key.indexOf('subscriber') === -1 && key.indexOf('subscription') === -1;
            }).forEach(function (deviceKey) {
                postObj[deviceKey] = putObj[deviceKey];
            });

            this._wrappers.forEach(function (wrapper) {
                childEntityPromises.push({ wrapper: wrapper, promise: wrapper.execute(defer) });
            });

            _q2['default'].allSettled(childEntityPromises.reduce(function (last, current) {
                if (last.constructor !== Array) {
                    return [last.promise, current.promise];
                }
                last.push(current.promise);
                return last;
            })).then(function () {
                defer.notify('All related entities created.');
                defer.notify('Creating new device:' + _this._key._value._current.value);
                return _this._ogapi.Napi.post(_this._url, postObj).then(function (res) {
                    defer.notify('Created device:' + _this._key._value._current.value);
                    defer.notify('Adding related entities');
                    var splitted = _this._url.split('?');
                    return _this._ogapi.Napi.put(splitted[0] + '/' + _this._key._value._current.value + '?' + splitted[1], putObj).then(function (res) {
                        if (res.statusCode === 201) {
                            console.log("CREATEOK: " + JSON.stringify(res));
                            if (typeof _this._onCreated === "function") {
                                _this._onCreated(res.header['location']);
                            }
                            defer.notify('Device created successfully: ' + _this._key._value._current.value);
                            defer.resolve({ location: res.header['location'], statusCode: res.statusCode });
                        } else {
                            defer.reject({ errors: res.errors, statusCode: res.statusCode });
                        }
                    });
                });
            })['catch'](function (err) {
                var deletePromises = [];
                childEntityPromises.forEach(function (item) {
                    deletePromises.push(item.wrapper['delete'](defer));
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
            var defer = _q2['default'].defer();
            var putObj = this._obj;
            var childEntityPromises = [];
            var _this = this;

            this._wrappers.forEach(function (wrapper) {
                childEntityPromises.push({ wrapper: wrapper, promise: wrapper.execute(defer) });
            });

            _q2['default'].allSettled(childEntityPromises.reduce(function (last, current) {
                if (last.constructor !== Array) {
                    return [last.promise, current.promise];
                }
                last.push(current.promise);
                return last;
            })).then(function () {
                defer.notify('All related entities created.');
                defer.notify('Adding related entities to device:' + _this._key._value._current.value);
                return _this._ogapi.Napi.put(_this._url, putObj).then(function (res) {
                    if (res.statusCode === 201) {
                        console.log("CREATEOK: " + JSON.stringify(res));
                        if (typeof _this._onCreated === "function") {
                            _this._onCreated(res.header['location']);
                        }
                        defer.notify('Device updated successfully: ' + _this._key._value._current.value);
                        defer.resolve({ location: res.header['location'], statusCode: res.statusCode });
                    } else {
                        defer.reject({ errors: res.errors, statusCode: res.statusCode });
                    }
                });
            })['catch'](function (err) {
                console.error(err);
                defer.notify('Something was wrong updating device');
                defer.reject(err);
            });
            return defer.promise;
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
    }

    /**
     * Device builder. This builder give you the necessary tools to create a device using our OpenGate REST.
     */

    _createClass(WrapperBuilder, [{
        key: '_urlWithKey',
        value: function _urlWithKey() {
            var splitted = this._url.split('?');
            return splitted[0] + '/' + this._key + '?' + splitted[1];
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
        value: function execute(defered) {
            var defer = _q2['default'].defer();
            var _this = this;
            this._checkExists().then(function (exists) {
                if (!exists) {
                    create(defered, defer);
                } else {
                    defer.resolve('Entity was already created:' + _this._key);
                }
            })['catch'](function (exists) {
                if (!exists) {
                    create(defered, defer);
                } else {
                    defer.resolve('Entity was already created:' + _this._key);
                }
            });
            return defer.promise;

            function create(defered, defer) {
                _this._ogapi.Napi.post(_this._url, _this._obj).then(function (res) {
                    defered.notify('Entity created:' + _this._key);
                    defer.resolve('Entity created:' + _this._key);
                })['catch'](function (err) {
                    console.error(err);
                    defered.notify('Error creating entity:' + _this._key);
                    defer.reject('Error creating entity:' + _this._key);
                });
            }
        }
    }, {
        key: 'delete',
        value: function _delete(defered) {
            var _this2 = this;

            return this._ogapi.Napi['delete'](this._urlWithKey()).then(function (res) {
                defered.notify('Entity deleted:' + _this2._key);
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
     */

    function DeviceBuilder(ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator) {
        _classCallCheck(this, DeviceBuilder);

        _get(Object.getPrototypeOf(DeviceBuilder.prototype), 'constructor', this).call(this, ogapi, organization + '/devices', allowedDatastreams, definedSchemas, jsonSchemaValidator);
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
            return new BoxBuilder(this._ogapi, this._composeElement(), this._resource, this._getEntityKey()).create();
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
            return new BoxBuilder(this._ogapi, this._composeElement(), this._buildURL(), this._getEntityKey()).update();
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
