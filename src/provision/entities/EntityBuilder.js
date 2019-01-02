'use strict';

import q, {
    timeout
} from 'q';
import jp from 'jsonpath';

import jsonschema from 'jsonschema';
import AssetBuilder from './AssetBuilder';
import DeviceBuilder from './DeviceBuilder';
import TicketBuilder from './TicketBuilder';
import SubscriberBuilder from './SubscriberBuilder';
import SubscriptionBuilder from './SubscriptionBuilder';
import CsvBulkBuilder from './CsvBulkBuilder';
import JsonFlattenedBulkBuilder from './JsonFlattenedBulkBuilder';
import JsonBulkBuilder from './JsonBulkBuilder';


const jsonSchemaValidator = new jsonschema.Validator();
const ERROR_ORGANIZATION = 'Parameters organization must be defined';
const ERROR_BULK_RESOURCE = 'The parameters resources must be defined and must be some of these values: entities or tickets';
const BULK_RESOURCES = ['entities', 'tickets'];
const schema_base = '/og_basic_types.json';

/**
 * This is a base object that contains all you can do about Devices.
 */
export default class EntityBuilder {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        const _this = this;
        this._ogapi = ogapi;
    }

    _loadAllowedDatastreams(filterElement, organization, resourceType) {
        let _this = this;
        let defered = q.defer();
        let promise = defered.promise;
        let f = _this._ogapi.newFilterBuilder();
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

        let allowedDatastreamsBuilder = this._ogapi.datamodelsSearchBuilder().filter(f).build();

        allowedDatastreamsBuilder.execute().then(function(okh) {
            _this.schema = {};
            return okh;
        }).then(function(data) {
            if (data.statusCode !== 200) {
                defered.reject({
                    data: 'OGAPI_DATASTREAM_NOT_FOUND',
                    statusCode: 204
                });
            }
            _this._getJsonPathElements().then(function() {
                data.data = _this._setDevicesProperties(data.data, filterElement);
                defered.resolve(data);
            }).catch(function(err) {
                defered.reject(err);
            });
        }).catch(function(err) {
            defered.reject(err);
        });
        return promise;
    }

    _getJsonPathElements() {
        let defered = q.defer();
        let promise = defered.promise;

        let basicTypesSearchBuilder = this._ogapi.basicTypesSearchBuilder();

        basicTypesSearchBuilder.withPath('$').build().execute().then(function(res) {
            jsonSchemaValidator.addSchema(res.data, schema_base);
            defered.resolve();
        }).catch(function(err) {
            defered.reject(err);
        });
        return promise;
    }

    _setDevicesProperties(data, filter) {
        let _this = this;
        //http://jekyll.amplia.es/OpenGateDoc/LATEST/opengate-doc-api/api-north/opengate-api-north.html#iotDatastreamTemplate - field calculated (OUW-1679)
        let allowedDatastreams = jp.query(data, "$.datamodels[*].categories[*].datastreams[?(@.calculated === false)]");
        let response = {
            allowedDatastreams: [],
            schemas: {}
        };
        _this.complexFunctions = [];
        _this.simpleFunctions = [];

        allowedDatastreams.forEach(function(element, index) {
            let _id = element.identifier;
            if (_id.startsWith('provision.administration') || _id.startsWith(filter)) {
                response.allowedDatastreams.push(element);
                if (_id.includes('communicationModules')) {
                    var includeSubscriberOrSubscription = filter.includes('subscriber') || filter.includes('subscription');
                    _this.schema[_id] = {
                        value: element.schema,
                        complex: includeSubscriberOrSubscription ? false : true,
                        function: includeSubscriberOrSubscription ? 'with' : 'withComplex'
                    };
                } else {
                    _this.schema[_id] = {
                        value: element.schema,
                        complex: false,
                        function: 'with'
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
     * @return {Promise}
     */
    devicesBuilder(organization, timeout) {
        return this._genericBuilder(organization, 'entity.device', 'provision', function(allowedDatastreams, definedSchemas) {
            return new DeviceBuilder(this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout);
        });
    }

    /**
     * Get a AssetBuilder for operate with entities of type asset
     * @example
     * ogapi.assetsBuilder('orgname').then(function(assetBuilder){//...}).catch()
     * @param {string} organization - required field
     * @return {Promise}
     */
    assetsBuilder(organization, timeout) {
        return this._genericBuilder(organization, 'entity.asset', 'provision', function(allowedDatastreams, definedSchemas) {
            return new AssetBuilder(this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout);
        });
    }

    /**
     * Get a TicketBuilder for operate with entities of type ticket
     * @example
     * ogapi.ticketsBuilder('orgname').then(function(ticketBuilder){//...}).catch()
     * @param {string} organization - required field
     * @return {Promise}
     */
    ticketsBuilder(organization, timeout) {
        return this._genericBuilder(organization, 'ticket', 'provision', function(allowedDatastreams, definedSchemas) {
            return new TicketBuilder(this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout);
        });
    }

    /**
     * Get a SubscriberBuilder for operate with entities of type subscriber
     * @example
     * ogapi.subscribersBuilder('orgname').then(function(subscriberBuilder){//...}).catch()
     * @param {string} organization - required field
     * @return {Promise}
     */
    subscribersBuilder(organization, timeout) {
            return this._genericBuilder(organization, 'entity.subscriber', 'provision.device.communicationModules[].subscriber', function(allowedDatastreams, definedSchemas) {
                return new SubscriberBuilder(this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout);
            });
        }
        /**
         * Get a SubscriptionBuilder for operate with entities of type subscription
         * @example
         * ogapi.subscriptionsBuilder('orgname').then(function(subscriptionBuilder){//...}).catch()
         * @param {string} organization - required field
         * @return {Promise}
         */
    subscriptionsBuilder(organization, timeout) {
            return this._genericBuilder(organization, 'entity.subscription', 'provision', function(allowedDatastreams, definedSchemas) {
                return new SubscriptionBuilder(this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout);
            });
        }
        /**
         * Get a new CsvBulkBuilder 
         * @example 
         *  ogapi.newCsvBulkBuilder('orgname', 'entities', 10000)
         * @param {string} organization - required field. 
         * @param {string} resource - required field. Type of resource: entities or tickets
         * @param {number} [timeout] - timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception
         * @return {CsvBulkBuilder}
         */
    newCsvBulkBuilder(organization, resource, timeout) {
            this._validateBulk(organization, resource);
            return new CsvBulkBuilder(this._ogapi, organization, resource, timeout);
        }
        /**
         * Get a new JsonBulkBuilder 
         * @example 
         *  ogapi.newJsonBulkBuilder('orgname', 'entities', 10000)
         * @param {string} organization - required field. 
         * @param {string} resource - required field. Type of resource: entities or tickets
         * @param {number} [timeout] - timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception
         * @return {JsonBulkBuilder}
         */
    newJsonBulkBuilder(organization, resource, timeout) {
            this._validateBulk(organization, resource);
            return new JsonBulkBuilder(this._ogapi, organization, resource, timeout);
        }
        /**
         * Get a new JsonFlattenedBulkBuilder 
         * @example 
         *  ogapi.newJsonFlattenedBulkBuilder('orgname', 'entities', 10000)
         * @param {string} organization - required field. 
         * @param {string} resource - required field. Type of resource: entities or tickets
         * @param {number} [timeout] - timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception
         * @return {JsonFlattenedBulkBuilder}
         */
    newJsonFlattenedBulkBuilder(organization, resource, timeout) {
        this._validateBulk(organization, resource);
        return new JsonFlattenedBulkBuilder(this._ogapi, organization, resource, timeout);
    }

    _validateBulk(organization, resource) {
        if (!organization) {
            throw new Error(ERROR_ORGANIZATION);
        }
        if (!resource || BULK_RESOURCES.indexOf(resource) === -1) {
            throw new Error(ERROR_BULK_RESOURCE);
        }
    }

    _genericBuilder(organization, resourceType, field, onFindAllowedDatastreams) {
        let _this = this;
        let defered = q.defer();
        if (!organization) {
            throw new Error(ERROR_ORGANIZATION);
        }
        this._loadAllowedDatastreams(field, organization, resourceType)
            .then(function(data) {
                if (data.statusCode === 200) {
                    defered.resolve(onFindAllowedDatastreams.call(_this, data.data.allowedDatastreams, data.data.schemas));
                } else {
                    defered.reject('OGAPI_DATASTREAM_NOT_FOUND');
                }
            }).catch(function(err) {
                defered.reject(err);
            });
        return defered.promise;
    }
}