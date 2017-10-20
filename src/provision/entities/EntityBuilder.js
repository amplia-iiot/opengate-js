'use strict';

import q from 'q';
import JSONPath from 'JSONPath';
import jsonschema from 'jsonschema';
import DeviceBuilder from './DeviceBuilder';
import SubscriberBuilder from './SubscriberBuilder';
import SubscriptionBuilder from './SubscriptionBuilder';


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

    _loadAllowedDatastreams(filterElement, organization) {
        let _this = this;
        let defered = q.defer();
        let promise = defered.promise;
        let data = {};
        let f = _this._ogapi.newFilterBuilder();
        f.and({
            "like": {
                'datamodels.categories.datastreams.name': 'provision'
            }
        }).and({
            "eq": {
                "datamodels.organizationName": organization
            }
        });

        let allowedDatastreams = [];
        let allowedDatastreamsBuilder = this._ogapi.datamodelsSearchBuilder().filter(f).build();

        allowedDatastreamsBuilder.execute().then(function(okh) {
            _this.schema = {};
            return okh;
        }).then(function(data) {
            if (data.statusCode !== 200) {
                defered.reject({ data: 'No content: Datastreams not found', statusCode: 204 });
            }
            _this._getJsonPathElements().then(function() {
                data.data = _this._setDevicesProperties(data.data, filterElement);
                defered.resolve(data);
            })
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
        /*with jsonpath
        let allowedDatastreams = jp.query(data, "$.datamodels[*].categories[*].datastreams[*]");*/
        let allowedDatastreams = JSONPath({ json: data, path: "$.datamodels[*].categories[*].datastreams[*]" });
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
        response['schemas'] = _this.schema;

        return response;

    }

    devicesBuilder(organization) {
        return this._genericBuilder(organization, 'provision.device', function(allowedDatastreams, definedSchemas) {
            return new DeviceBuilder(this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator);
        });
    }

    subscribersBuilder(organization) {
        return this._genericBuilder(organization, 'provision.device.communicationModules[].subscriber', function(allowedDatastreams, definedSchemas) {
            return new SubscriberBuilder(this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator);
        });
    }

    subscriptionsBuilder(organization) {
        return this._genericBuilder(organization, 'provision.device.communicationModules[].subscription', function(allowedDatastreams, definedSchemas) {
            return new SubscriptionBuilder(this._ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator);
        });
    }

    _genericBuilder(organization, field, onFindAllowedDatastreams) {
        let _this = this;
        let defered = q.defer();
        if (!organization) {
            throw new Error(ERROR_ORGANIZATION);
        }
        this._loadAllowedDatastreams(field, organization)
            .then(function(data) {
                if (data.statusCode === 200) {
                    defered.resolve(onFindAllowedDatastreams.call(_this, data.data.allowedDatastreams, data.data.schemas));
                } else {
                    defered.reject('Datamodels not found on ' + organization + ' organization.');
                }
            }).catch(function(err) {
                defered.reject(err);
            });
        return defered.promise;
    }
}