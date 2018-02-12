'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _JSONPath = require('JSONPath');

var _JSONPath2 = _interopRequireDefault(_JSONPath);

var _jsonschema = require('jsonschema');

var _jsonschema2 = _interopRequireDefault(_jsonschema);

var _AssetBuilder = require('./AssetBuilder');

var _AssetBuilder2 = _interopRequireDefault(_AssetBuilder);

var _DeviceBuilder = require('./DeviceBuilder');

var _DeviceBuilder2 = _interopRequireDefault(_DeviceBuilder);

var _SubscriberBuilder = require('./SubscriberBuilder');

var _SubscriberBuilder2 = _interopRequireDefault(_SubscriberBuilder);

var _SubscriptionBuilder = require('./SubscriptionBuilder');

var _SubscriptionBuilder2 = _interopRequireDefault(_SubscriptionBuilder);

var _CsvBulkBuilder = require('./CsvBulkBuilder');

var _CsvBulkBuilder2 = _interopRequireDefault(_CsvBulkBuilder);

var _JsonFlattenedBulkBuilder = require('./JsonFlattenedBulkBuilder');

var _JsonFlattenedBulkBuilder2 = _interopRequireDefault(_JsonFlattenedBulkBuilder);

var _JsonBulkBuilder = require('./JsonBulkBuilder');

var _JsonBulkBuilder2 = _interopRequireDefault(_JsonBulkBuilder);

var jsonSchemaValidator = new _jsonschema2['default'].Validator();
var ERROR_ORGANIZATION = 'Parameters organization must be defined';
var schema_base = '/og_basic_types.json';

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
        value: function _loadAllowedDatastreams(filterElement, organization, resourceType) {
            var _this = this;
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            var data = {};
            var f = _this._ogapi.newFilterBuilder();
            f.and({
                "like": {
                    'datamodels.categories.datastreams.identifier': 'provision'
                }
            }).and({
                "eq": {
                    "datamodels.organizationName": organization
                }
            }).and({
                "eq": {
                    "datamodels.allowedResourceTypes": resourceType
                }
            });

            var allowedDatastreams = [];
            var allowedDatastreamsBuilder = this._ogapi.datamodelsSearchBuilder().filter(f).build();

            allowedDatastreamsBuilder.execute().then(function (okh) {
                _this.schema = {};
                return okh;
            }).then(function (data) {
                if (data.statusCode !== 200) {
                    defered.reject({ data: 'OGAPI_DATASTREAM_NOT_FOUND', statusCode: 204 });
                }
                _this._getJsonPathElements().then(function () {
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
        value: function _getJsonPathElements() {
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            var jsonSchemaSearchBuilder = this._ogapi.jsonSchemaSearchBuilder();

            jsonSchemaSearchBuilder.withPath('$').build().execute().then(function (res) {
                jsonSchemaValidator.addSchema(res.data, schema_base);
                defered.resolve();
            })['catch'](function (err) {
                defered.reject(err);
            });
            return promise;
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
            response.schemas = _this.schema;

            return response;
        }
    }, {
        key: 'devicesBuilder',
        value: function devicesBuilder(organization) {
            return this._genericBuilder(organization, 'entity.device', 'provision', function (allowedDatastreams, definedSchemas) {
                return new _DeviceBuilder2['default'](this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator);
            });
        }
    }, {
        key: 'assetsBuilder',
        value: function assetsBuilder(organization) {
            return this._genericBuilder(organization, 'entity.asset', 'provision', function (allowedDatastreams, definedSchemas) {
                return new _AssetBuilder2['default'](this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator);
            });
        }
    }, {
        key: 'subscribersBuilder',
        value: function subscribersBuilder(organization) {
            return this._genericBuilder(organization, 'entity.subscriber', 'provision.device.communicationModules[].subscriber', function (allowedDatastreams, definedSchemas) {
                return new _SubscriberBuilder2['default'](this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator);
            });
        }
    }, {
        key: 'subscriptionsBuilder',
        value: function subscriptionsBuilder(organization) {
            return this._genericBuilder(organization, 'entity.subscription', 'provision.device.communicationModules[].subscription', function (allowedDatastreams, definedSchemas) {
                return new _SubscriptionBuilder2['default'](this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator);
            });
        }
    }, {
        key: 'newCsvBulkBuilder',
        value: function newCsvBulkBuilder(organization) {
            return new _CsvBulkBuilder2['default'](this._ogapi, organization);
        }
    }, {
        key: 'newJsonBulkBuilder',
        value: function newJsonBulkBuilder(organization) {
            return new _JsonBulkBuilder2['default'](this._ogapi, organization);
        }
    }, {
        key: 'newJsonFlattenedBulkBuilder',
        value: function newJsonFlattenedBulkBuilder(organization) {
            return new _JsonFlattenedBulkBuilder2['default'](this._ogapi, organization);
        }
    }, {
        key: '_genericBuilder',
        value: function _genericBuilder(organization, resourceType, field, onFindAllowedDatastreams) {
            var _this = this;
            var defered = _q2['default'].defer();
            if (!organization) {
                throw new Error(ERROR_ORGANIZATION);
            }
            this._loadAllowedDatastreams(field, organization, resourceType).then(function (data) {
                if (data.statusCode === 200) {
                    defered.resolve(onFindAllowedDatastreams.call(_this, data.data.allowedDatastreams, data.data.schemas));
                } else {
                    defered.reject('OGAPI_DATASTREAM_NOT_FOUND');
                }
            })['catch'](function (err) {
                defered.reject(err);
            });
            return defered.promise;
        }
    }]);

    return EntityBuilder;
})();

exports['default'] = EntityBuilder;
module.exports = exports['default'];
//# sourceMappingURL=EntityBuilder.js.map
