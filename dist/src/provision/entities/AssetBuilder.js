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

var ID = 'provision.asset.identifier',
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
        this._assetKeys = Object.keys(obj).filter(function (dsName) {
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
            _this._wrappers.push(new WrapperBuilder(_this._ogapi, obj, _this._url.replace('entities', 'subscriptions').replace('/' + _this._key._value._current.value, ''), obj[_SubscriptionBuilder.SubscriptionID]._value._current.value));
        });
        Object.keys(subscribers).forEach(function (commsId) {
            var obj = subscribers[commsId];
            _this._administrationKeys.forEach(function (key) {
                obj[key] = _this._obj[key];
            });
            _this._wrappers.push(new WrapperBuilder(_this._ogapi, obj, _this._url.replace('entities', 'subscribers').replace('/' + _this._key._value._current.value, ''), obj[_SubscriberBuilder.SubscriberID]._value._current.value));
        });
        _this._obj['resourceType'] = {
            "_value": {
                "_current": {
                    "value": "entity.asset"
                }
            }
        };
    }

    _createClass(BoxBuilder, [{
        key: '_urlWithKey',
        value: function _urlWithKey() {
            var splitted = this._url.split('?');
            return splitted[0] + '/' + this._key._value._current.value + '?' + splitted[1];
        }
    }, {
        key: 'create',
        value: function create() {
            var defer = _q2['default'].defer();
            var postObj = {};
            var putObj = this._obj;
            var childEntityPromises = [];
            var _this = this;

            Object.keys(putObj).filter(function (key) {
                return key.indexOf('subscriber') === -1 && key.indexOf('subscription') === -1;
            }).forEach(function (assetKey) {
                postObj[assetKey] = putObj[assetKey];
            });

            this._wrappers.forEach(function (wrapper) {
                childEntityPromises.push({
                    wrapper: wrapper,
                    promise: wrapper.execute(defer, 10)
                });
            });
            /* postObj['resourceType'] = {
                "_value": {
                  "_current": {
                    "value": "entity.asset"
                  }
                }
              }
            */
            _q2['default'].allSettled(childEntityPromises.reduce(function (previousValue, current) {
                previousValue.push(current.promise);
                return previousValue;
            }, [])).then(function () {
                defer.notify({
                    message: 'All related entities have been created.',
                    type: 'success',
                    percentage: 20
                });
                defer.notify({
                    message: 'Creating new asset:' + _this._key._value._current.value,
                    type: 'success',
                    percentage: 25
                });
                return _this._ogapi.Napi.post(_this._url, postObj).then(function (res) {
                    defer.notify({
                        message: 'Created asset:' + _this._key._value._current.value,
                        type: 'success',
                        percentage: 50
                    });
                    if (_this._wrappers.length > 0) {
                        defer.notify({
                            message: 'Adding related entities',
                            type: 'success',
                            percentage: 55
                        });
                        return _this._ogapi.Napi.put(_this._urlWithKey(), putObj).then(function (res) {
                            if (res.statusCode === _httpStatusCodes2['default'].OK) {
                                console.log("CREATEOK: " + JSON.stringify(res));
                                if (typeof _this._onCreated === "function") {
                                    _this._onCreated(res.header['location']);
                                }
                                defer.notify({
                                    message: 'asset created successfully: ' + _this._key._value._current.value,
                                    type: 'success',
                                    percentage: 75
                                });
                                defer.resolve({
                                    location: res.header['location'],
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
                            console.log("CREATEOK: " + JSON.stringify(res));
                            if (typeof _this._onCreated === "function") {
                                _this._onCreated(res.header['location']);
                            }
                            defer.notify({
                                message: 'asset created successfully: ' + _this._key._value._current.value,
                                type: 'success',
                                percentage: 75
                            });
                            defer.resolve({
                                location: res.header['location'],
                                statusCode: res.statusCode
                            });
                        } else {
                            defer.reject({
                                errors: res.errors,
                                statusCode: res.statusCode
                            });
                        }
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
                    message: 'All related entities have been created.',
                    type: 'success',
                    percentage: 40
                });
                defer.notify({
                    message: 'Adding related entities to Asset:' + _this._key._value._current.value,
                    type: 'success',
                    percentage: 45
                });
                return _this._ogapi.Napi.put(_this._url, putObj).then(function (res) {
                    if (res.statusCode === _httpStatusCodes2['default'].OK) {
                        console.log("CREATEOK: " + JSON.stringify(res));
                        if (typeof _this._onCreated === "function") {
                            _this._onCreated(res.header['location']);
                        }
                        defer.notify({
                            message: 'Asset updated successfully: ' + _this._key._value._current.value,
                            type: 'success',
                            percentage: 90
                        });
                        defer.resolve({
                            location: res.header['location'],
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
                console.error(err);
                defer.notify('Something was wrong updating Asset');
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
                    message: 'Entity deleted:' + _this._key,
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
     * Asset builder. This builder give you the necessary tools to create a asset using our OpenGate REST.
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
        value: function execute(defered, percentage) {
            var defer = _q2['default'].defer();
            var _this = this;
            this._checkExists().then(function (exists) {
                if (!exists) {
                    create(defered, defer, percentage);
                } else {
                    defer.resolve('Entity was already created:' + _this._key);
                }
            })['catch'](function (exists) {
                if (!exists) {
                    create(defered, defer, percentage);
                } else {
                    defer.resolve('Entity was already created:' + _this._key);
                }
            });
            return defer.promise;

            function create(defered, defer, percentage) {
                _this._ogapi.Napi.post(_this._url, _this._obj).then(function (res) {
                    _this._created = true;
                    defered.notify({
                        message: 'Entity created:' + _this._key,
                        type: 'success',
                        percentage: percentage
                    });
                    defer.resolve('Entity created:' + _this._key);
                })['catch'](function (err) {
                    console.error(err);
                    defered.notify({
                        message: 'Error creating entity:' + _this._key,
                        type: 'warning',
                        percentage: percentage
                    });
                    defer.reject('Error creating entity:' + _this._key);
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
                        message: 'Entity deleted:' + _this._key,
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

var AssetBuilder = (function (_ComplexBuilder) {
    _inherits(AssetBuilder, _ComplexBuilder);

    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - this is the organization name where asset will be created
     * @param {!array} [allowedDatastreams] - Allowed datastreams to add into the new asset
     * @param {!array} [definedSchemas] - Jsonschema about all OpenGate specific types
     * @param {!Validator} [jsonSchemaValidator] - Json schema validator tool
     */

    function AssetBuilder(ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator) {
        _classCallCheck(this, AssetBuilder);

        _get(Object.getPrototypeOf(AssetBuilder.prototype), 'constructor', this).call(this, ogapi, organization + '/entities', allowedDatastreams, definedSchemas, jsonSchemaValidator);
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

    _createClass(AssetBuilder, [{
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
         *  ogapi.entityBuilder.assetBuilder().update()
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

    return AssetBuilder;
})(_ComplexBuilder3['default']);

exports['default'] = AssetBuilder;
module.exports = exports['default'];
//# sourceMappingURL=AssetBuilder.js.map
