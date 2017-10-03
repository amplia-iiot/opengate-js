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

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

//import jp from 'jsonpath';

var _JSONPath = require('JSONPath');

var _JSONPath2 = _interopRequireDefault(_JSONPath);

var _jsonschema = require('jsonschema');

var _jsonschema2 = _interopRequireDefault(_jsonschema);

var _devicesDevices = require('../devices/Devices');

var _devicesDevices2 = _interopRequireDefault(_devicesDevices);

var _devicesCommsModulesSubscribersSubscribers = require('../devices/commsModules/subscribers/Subscribers');

var _devicesCommsModulesSubscribersSubscribers2 = _interopRequireDefault(_devicesCommsModulesSubscribersSubscribers);

var _devicesCommsModulesSubscriptionsSubscriptions = require('../devices/commsModules/subscriptions/Subscriptions');

var _devicesCommsModulesSubscriptionsSubscriptions2 = _interopRequireDefault(_devicesCommsModulesSubscriptionsSubscriptions);

var v = new _jsonschema2['default'].Validator();
var ERROR_VALUE_NOT_ALLOWED = 'The value is not allowed. The value should be formatted as follows: ';
var ERROR_DATASTREAM_NOT_ALLOWED = 'Datastream is not allowed.';
var ERROR_FUNCTION_NOT_ALLOWED = 'Function is not allowed.';
var ERROR_ID_VALUE = 'Parameter id and value must be defined';
var ERROR_ORGANIZATION = 'Parameters organization must be defined';

/**
 * This is a base object that contains all you can do about Devices.
 */

var EntityBuilder = (function () {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function EntityBuilder(ogapi) {
        _classCallCheck(this, EntityBuilder);

        var _this = this;
        this._ogapi = ogapi;
    }

    _createClass(EntityBuilder, [{
        key: '_loadAllowedDatastreams',
        value: function _loadAllowedDatastreams(filterElement, organization) {

            var _this = this;
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            var data = {};
            var f = _this._ogapi.newFilterBuilder();
            f.and({
                "like": {
                    'datamodels.categories.datastreams.name': 'provision'
                }
            }).and({
                "eq": {
                    "datamodels.organizationName": organization
                }
            });

            var allowedDatastreams = [];
            var allowedDatastreamsBuilder = this._ogapi.datamodelsSearchBuilder().filter(f).build();

            allowedDatastreamsBuilder.execute().then(function (okh) {
                _this.schema = {};
                return okh;
            }).then(function (data) {
                if (data.statusCode !== 200) {
                    defered.resolve({ data: 'No content: Datastreams not found', statusCode: 204 });
                }

                _this._getJsonPathElements(data.data).then(function () {
                    data.data = _this._setDevicesProperties(data.data, filterElement);
                    defered.resolve(data);
                });
            })['catch'](function (err) {
                defered.reject(err);
            });
            return promise;
        }
    }, {
        key: '_getJsonPathElements',
        value: function _getJsonPathElements(data) {
            var promises = [];
            /*with jsonpath
            let allowedDatastreams = jp.nodes(data, '$.datamodels[*].categories[*].datastreams[*]..["$ref"]');*/
            var allowedDatastreams = (0, _JSONPath2['default'])({ json: data, path: '$.datamodels[*].categories[*].datastreams[*]..[$ref]', resultType: 'all' });
            var jsonSchemaSearchBuilder = this._ogapi.jsonSchemaSearchBuilder();

            allowedDatastreams.forEach(function (element, index) {
                var deferred = _q2['default'].defer();
                /*with jsonpath
                element.path.pop();
                let jsonSchemaPath = jp.stringify(element.path);*/
                var jsonSchemaPath = element.path;

                /*with jsonpath
                jsonSchemaSearchBuilder.withPath(element.value).build().execute().then(function (res) {
                    var newnodes = jp.apply(data, jsonSchemaPath, function (value) {
                        return res.data;
                    });
                    deferred.resolve(res);
                })*/
                jsonSchemaSearchBuilder.withPath(element.value).build().execute().then(function (res) {
                    var newnodes = (0, _JSONPath2['default'])({
                        json: data, path: jsonSchemaPath, callback: function callback(value) {
                            v.addSchema(res.data, res.data.id);
                        }
                    });
                    deferred.resolve(res);
                })['catch'](function (err) {
                    throw new Error(err);
                });
                promises.push(deferred.promise);
            });
            return _q2['default'].all(promises, data);
        }
    }, {
        key: '_setDevicesProperties',
        value: function _setDevicesProperties(data, filter) {
            var _this = this;
            /*with jsonpath
            let allowedDatastreams = jp.query(data, "$.datamodels[*].categories[*].datastreams[*]");*/
            var allowedDatastreams = (0, _JSONPath2['default'])({ json: data, path: "$.datamodels[*].categories[*].datastreams[*]" });
            var response = { allowedDatastreams: [], schemas: {} };
            _this.complexFunctions = [];
            _this.simpleFunctions = [];

            allowedDatastreams.forEach(function (element, index) {
                var _id = element.identifier;
                if (_id.startsWith('provision.administration') || _id.startsWith(filter)) {
                    response.allowedDatastreams.push(element);
                    if (_id.includes('communicationModules')) {
                        _this.schema[_id] = { value: element.schema, complex: filter.includes('subscriber') || filter.includes('subscription') ? false : true, 'function': filter.includes('subscriber') || filter.includes('subscription') ? 'with' : 'withComplex' };
                    } else {
                        _this.schema[_id] = { value: element.schema, complex: false, 'function': 'with' };
                    }
                }
            });
            response['schemas'] = _this.schema;

            return response;
        }
    }, {
        key: '_createComplexFunction',
        value: function _createComplexFunction(parent) {
            var _this = parent;
            _this['withComplex'] = function (_id, idCommunicationModules, val) {

                if (!_this._definedSchemas[_id]) {
                    throw new Error(ERROR_DATASTREAM_NOT_ALLOWED);
                } else if (!_this._definedSchemas[_id].complex) {
                    throw new Error(ERROR_FUNCTION_NOT_ALLOWED);
                }
                if (!idCommunicationModules || !val) {
                    throw new Error(ERROR_ID_VALUE);
                }

                var cmElement = {
                    '_index': {
                        'value': idCommunicationModules
                    },
                    '_value': {
                        '_received': {
                            'value': val
                        }
                    }
                };

                var jSchema = _this._definedSchemas[_id].value;
                if (v.validate(val, jSchema).valid) {
                    _this._entity[_id] = _this._entity[_id] ? _this._entity[_id] : [];
                    _this._entity[_id].push(cmElement);
                } else {
                    throw new Error(ERROR_VALUE_NOT_ALLOWED + JSON.stringify(jSchema));
                }
                return _this;
            };
        }
    }, {
        key: '_createSimplefunction',
        value: function _createSimplefunction(parent) {
            var _this = parent;
            _this['with'] = function (_id, val) {
                if (!_this._definedSchemas[_id]) {
                    throw new Error(ERROR_DATASTREAM_NOT_ALLOWED);
                } else if (_this._definedSchemas[_id].complex) {
                    throw new Error(ERROR_FUNCTION_NOT_ALLOWED);
                }
                var jSchema = _this._definedSchemas[_id].value;
                if (v.validate(val, jSchema).valid) {
                    _this._entity[_id] = {
                        '_value': {
                            '_received': {
                                'value': val
                            }
                        }
                    };
                } else {
                    throw new Error(ERROR_VALUE_NOT_ALLOWED + JSON.stringify(jSchema));
                }
                return _this;
            };
        }
    }, {
        key: 'devicesBuilder',
        value: function devicesBuilder(organization) {
            var _this = this;
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            if (!organization) {
                throw new Error(ERROR_ORGANIZATION);
            }
            this._loadAllowedDatastreams('provision.device', organization).then(function (data) {
                if (data.statusCode === 200) {
                    var allowedDatastreams = data.data.allowedDatastreams;
                    var definedSchemas = data.data.schemas;
                    var device = new _devicesDevices2['default'](_this._ogapi, organization, allowedDatastreams, definedSchemas);
                    _this._createSimplefunction(device);
                    _this._createComplexFunction(device);
                    device['with']('provision.administration.serviceGroup', 'emptyServiceGroup');
                    defered.resolve(device);
                } else {
                    defered.resolve(data);
                }
            })['catch'](function (err) {
                defered.reject(err);
            });
            return promise;
        }
    }, {
        key: 'subscribersBuilder',
        value: function subscribersBuilder(organization) {
            var _this = this;
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            if (!organization) {
                throw new Error(ERROR_ORGANIZATION);
            }
            this._loadAllowedDatastreams('provision.device.communicationModules[].subscriber', organization).then(function (data) {
                if (data.statusCode === 200) {
                    var allowedDatastreams = data.data.allowedDatastreams;
                    var definedSchemas = data.data.schemas;
                    var subscribers = new _devicesCommsModulesSubscribersSubscribers2['default'](_this._ogapi, organization, allowedDatastreams, definedSchemas);
                    _this._createSimplefunction(subscribers);
                    _this._createComplexFunction(subscribers);
                    subscribers['with']('provision.administration.serviceGroup', 'emptyServiceGroup');
                    defered.resolve(subscribers);
                }
            })['catch'](function (err) {
                defered.resolve(err);
            });
            return promise;
        }
    }, {
        key: 'subscriptionsBuilder',
        value: function subscriptionsBuilder(organization) {
            var _this = this;
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            if (!organization) {
                throw new Error(ERROR_ORGANIZATION);
            }
            this._loadAllowedDatastreams('provision.device.communicationModules[].subscription', organization).then(function (data) {
                if (data.statusCode === 200) {
                    var allowedDatastreams = data.data.allowedDatastreams;
                    var definedSchemas = data.data.schemas;
                    var subscriptions = new _devicesCommsModulesSubscriptionsSubscriptions2['default'](_this._ogapi, organization, allowedDatastreams, definedSchemas);
                    _this._createSimplefunction(subscriptions);
                    _this._createComplexFunction(subscriptions);
                    subscriptions['with']('provision.administration.serviceGroup', 'emptyServiceGroup');
                    defered.resolve(subscriptions);
                }
            })['catch'](function (err) {
                defered.resolve(err);
            });
            return promise;
        }
    }]);

    return EntityBuilder;
})();

exports['default'] = EntityBuilder;
module.exports = exports['default'];
//# sourceMappingURL=EntityBuilder.js.map
