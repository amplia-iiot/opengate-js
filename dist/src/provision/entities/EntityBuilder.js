'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _jsonpath = require('jsonpath');

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _ajv = require('ajv');

var _ajv2 = _interopRequireDefault(_ajv);

var _AssetBuilder = require('./AssetBuilder');

var _AssetBuilder2 = _interopRequireDefault(_AssetBuilder);

var _DeviceBuilder = require('./DeviceBuilder');

var _DeviceBuilder2 = _interopRequireDefault(_DeviceBuilder);

var _TicketBuilder = require('./TicketBuilder');

var _TicketBuilder2 = _interopRequireDefault(_TicketBuilder);

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

var jsonSchemaValidator = new _ajv2['default']();
var ERROR_ORGANIZATION = 'Parameters organization must be defined';
var ERROR_BULK_RESOURCE = 'The parameters resources must be defined and must be some of these values: entities or tickets';
var BULK_RESOURCES = ['entities', 'tickets'];
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

            var allowedDatastreamsBuilder = this._ogapi.datamodelsSearchBuilder().filter(f).build();

            allowedDatastreamsBuilder.execute().then(function (okh) {
                _this.schema = {};
                return okh;
            }).then(function (data) {
                if (data.statusCode !== 200) {
                    defered.reject({
                        data: 'OGAPI_DATASTREAM_NOT_FOUND',
                        statusCode: 204
                    });
                }
                _this._getJsonPathElements().then(function () {
                    data.data = _this._setDevicesProperties(data.data, filterElement);
                    defered.resolve(data);
                })['catch'](function (err) {
                    defered.reject(err);
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

            var basicTypesSearchBuilder = this._ogapi.basicTypesSearchBuilder();

            basicTypesSearchBuilder.withPath('$').build().execute().then(function (res) {
                if (jsonSchemaValidator.getSchema(schema_base)) {
                    jsonSchemaValidator.removeSchema(schema_base);
                }

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
            //http://jekyll.amplia.es/OpenGateDoc/LATEST/opengate-doc-api/api-north/opengate-api-north.html#iotDatastreamTemplate - field calculated (OUW-1679)
            var allowedDatastreams = _jsonpath2['default'].query(data, "$.datamodels[*].categories[*].datastreams[?(@.calculated === false)]");
            var response = {
                allowedDatastreams: [],
                schemas: {}
            };
            _this.complexFunctions = [];
            _this.simpleFunctions = [];

            allowedDatastreams.forEach(function (element, index) {
                var _id = element.identifier;
                if (_id.startsWith('provision.administration') || _id.startsWith(filter)) {
                    response.allowedDatastreams.push(element);
                    if (_id.includes('communicationModules')) {
                        var includeSubscriberOrSubscription = filter.includes('subscriber') || filter.includes('subscription');
                        _this.schema[_id] = {
                            value: element.schema,
                            complex: includeSubscriberOrSubscription ? false : true,
                            'function': includeSubscriberOrSubscription ? 'with' : 'withComplex'
                        };
                    } else {
                        _this.schema[_id] = {
                            value: element.schema,
                            complex: false,
                            'function': 'with'
                        };
                    }
                }
            });
            response.schemas = _this.schema;

            return response;
        }

        /**
         * Get a DeviceBuilder for operate with entities of type device
         * @example
         * ogapi.devicesBuilder('orgname').then(function(deviceBuilder){//...}).catch()
         * @param {string} organization - required field
         * @param {!number} [timeout] - timeout on request
         * @return {Promise}
         */
    }, {
        key: 'devicesBuilder',
        value: function devicesBuilder(organization, timeout) {
            return this._genericBuilder(organization, 'entity.device', 'provision', function (allowedDatastreams, definedSchemas) {
                return new _DeviceBuilder2['default'](this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout);
            });
        }

        /**
         * Get a AssetBuilder for operate with entities of type asset
         * @example
         * ogapi.assetsBuilder('orgname').then(function(assetBuilder){//...}).catch()
         * @param {string} organization - required field
         * @param {!number} [timeout] - timeout on request
         * @return {Promise}
         */
    }, {
        key: 'assetsBuilder',
        value: function assetsBuilder(organization, timeout) {
            return this._genericBuilder(organization, 'entity.asset', 'provision', function (allowedDatastreams, definedSchemas) {
                return new _AssetBuilder2['default'](this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout);
            });
        }

        /**
         * Get a TicketBuilder for operate with entities of type ticket
         * @example
         * ogapi.ticketsBuilder('orgname').then(function(ticketBuilder){//...}).catch()
         * @param {string} organization - required field
         * @param {!number} [timeout] - timeout on request
         * @return {Promise}
         */
    }, {
        key: 'ticketsBuilder',
        value: function ticketsBuilder(organization, timeout) {
            return this._genericBuilder(organization, 'ticket', 'provision', function (allowedDatastreams, definedSchemas) {
                return new _TicketBuilder2['default'](this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout);
            });
        }

        /**
         * Get a SubscriberBuilder for operate with entities of type subscriber
         * @example
         * ogapi.subscribersBuilder('orgname').then(function(subscriberBuilder){//...}).catch()
         * @param {string} organization - required field
         * @param {!number} [timeout] - timeout on request
         * @return {Promise}
         */
    }, {
        key: 'subscribersBuilder',
        value: function subscribersBuilder(organization, timeout) {
            return this._genericBuilder(organization, 'entity.subscriber', 'provision', function (allowedDatastreams, definedSchemas) {
                return new _SubscriberBuilder2['default'](this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout);
            });
        }

        /**
         * Get a SubscriptionBuilder for operate with entities of type subscription
         * @example
         * ogapi.subscriptionsBuilder('orgname').then(function(subscriptionBuilder){//...}).catch()
         * @param {string} organization - required field
         * @param {!number} [timeout] - timeout on request
         * @return {Promise}
         */
    }, {
        key: 'subscriptionsBuilder',
        value: function subscriptionsBuilder(organization, timeout) {
            return this._genericBuilder(organization, 'entity.subscription', 'provision', function (allowedDatastreams, definedSchemas) {
                return new _SubscriptionBuilder2['default'](this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout);
            });
        }

        /**
         * Get a new CsvBulkBuilder 
         * @example 
         *  ogapi.newCsvBulkBuilder('orgname', 'entities', 10000, false)
         *  ogapi.newCsvBulkBuilder('orgname', 'entities', 10000, true)
         * @param {string} organization - required field. 
         * @param {string} resource - required field. Type of resource: entities or tickets
         * @param {number} [timeout] - timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception
         * @param {boolean} [async] - forces async execution for the bulk operation
         * @return {CsvBulkBuilder}
         */
    }, {
        key: 'newCsvBulkBuilder',
        value: function newCsvBulkBuilder(organization, resource, timeout, async) {
            this._validateBulk(organization, resource);
            return new _CsvBulkBuilder2['default'](this._ogapi, organization, resource, timeout, async);
        }

        /**
         * Get a new JsonBulkBuilder 
         * @example 
         *  ogapi.newJsonBulkBuilder('orgname', 'entities', 10000)
         * @param {string} organization - required field. 
         * @param {string} resource - required field. Type of resource: entities or tickets
         * @param {number} [timeout] - timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception
         * @param {boolean} [async] - forces async execution for the bulk operation
         * @return {JsonBulkBuilder}
         */
    }, {
        key: 'newJsonBulkBuilder',
        value: function newJsonBulkBuilder(organization, resource, timeout, async) {
            this._validateBulk(organization, resource);
            return new _JsonBulkBuilder2['default'](this._ogapi, organization, resource, timeout, async);
        }

        /**
         * Get a new JsonFlattenedBulkBuilder 
         * @example 
         *  ogapi.newJsonFlattenedBulkBuilder('orgname', 'entities', 10000)
         * @param {string} organization - required field. 
         * @param {string} resource - required field. Type of resource: entities or tickets
         * @param {number} [timeout] - timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception
         * @param {boolean} [async] - forces async execution for the bulk operation
         * @return {JsonFlattenedBulkBuilder}
         */
    }, {
        key: 'newJsonFlattenedBulkBuilder',
        value: function newJsonFlattenedBulkBuilder(organization, resource, timeout, async) {
            this._validateBulk(organization, resource);
            return new _JsonFlattenedBulkBuilder2['default'](this._ogapi, organization, resource, timeout, async);
        }
    }, {
        key: '_validateBulk',
        value: function _validateBulk(organization, resource) {
            if (!organization) {
                throw new Error(ERROR_ORGANIZATION);
            }
            if (!resource || BULK_RESOURCES.indexOf(resource) === -1) {
                throw new Error(ERROR_BULK_RESOURCE);
            }
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
