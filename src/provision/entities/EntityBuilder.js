'use strict';

import q, { timeout } from 'q';
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
        let data = {};
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

        let allowedDatastreams = [];
        let allowedDatastreamsBuilder = this._ogapi.datamodelsSearchBuilder().filter(f).build();

        allowedDatastreamsBuilder.execute().then(function(okh) {
            _this.schema = {};
            return okh;
        }).then(function(data) {
            if (data.statusCode !== 200) {
                defered.reject({ data: 'OGAPI_DATASTREAM_NOT_FOUND', statusCode: 204 });
            }
            _this._getJsonPathElements().then(function() {
                data.data = _this._setDevicesProperties(data.data, filterElement);
                defered.resolve(data);
            });
        }).catch(function(err) {
            defered.reject(err);
        });
        return promise;
    }

    _getJsonPathElements() {
        let defered = q.defer();
        let promise = defered.promise;
        let jsonSchemaSearchBuilder = this._ogapi.jsonSchemaSearchBuilder();

        jsonSchemaSearchBuilder.withPath('$').build().execute().then(function(res) {
            jsonSchemaValidator.addSchema(res.data, schema_base);
            defered.resolve();
        }).catch(function(err) {
            defered.reject(err);
        });
        return promise;
    }

    _setDevicesProperties(data, filter) {
        let _this = this;
        let allowedDatastreams = jp.query(data, "$.datamodels[*].categories[*].datastreams[*]");
        let response = { allowedDatastreams: [], schemas: {} };
        _this.complexFunctions = [];
        _this.simpleFunctions = [];

        allowedDatastreams.forEach(function(element, index) {
            let _id = element.identifier;
            if (_id.startsWith('provision.administration') || _id.startsWith(filter)) {
                response.allowedDatastreams.push(element);
                if (_id.includes('communicationModules')) {
                    _this.schema[_id] = { value: element.schema, complex: filter.includes('subscriber') || filter.includes('subscription') ? false : true, function: filter.includes('subscriber') || filter.includes('subscription') ? 'with' : 'withComplex' };
                } else {
                    _this.schema[_id] = { value: element.schema, complex: false, function: 'with' };

                }
            }
        });
        response.schemas = _this.schema;

        return response;

    }

    devicesBuilder(organization) {
        return this._genericBuilder(organization, 'entity.device', 'provision', function(allowedDatastreams, definedSchemas) {
            return new DeviceBuilder(this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator);
        });
    }

    assetsBuilder(organization) {
        return this._genericBuilder(organization, 'entity.asset', 'provision', function(allowedDatastreams, definedSchemas) {
            return new AssetBuilder(this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator);
        });
    }

    ticketsBuilder(organization) {
        return this._genericBuilder(organization, 'ticket', 'provision', function(allowedDatastreams, definedSchemas) {
            return new TicketBuilder(this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator);
        });
    }
    subscribersBuilder(organization) {
        return this._genericBuilder(organization, 'entity.subscriber', 'provision.device.communicationModules[].subscriber', function(allowedDatastreams, definedSchemas) {
            return new SubscriberBuilder(this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator);
        });
    }

    subscriptionsBuilder(organization) {
        return this._genericBuilder(organization, 'entity.subscription', 'provision.device.communicationModules[].subscription', function(allowedDatastreams, definedSchemas) {
            return new SubscriptionBuilder(this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator);
        });
    }
    newCsvBulkBuilder(organization, timeout) {
        return new CsvBulkBuilder(this._ogapi, organization, timeout);
    }
    newJsonBulkBuilder(organization, timeout) {
        return new JsonBulkBuilder(this._ogapi, organization, timeout);
    }
    newJsonFlattenedBulkBuilder(organization, timeout) {
        return new JsonFlattenedBulkBuilder(this._ogapi, organization, timeout);
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