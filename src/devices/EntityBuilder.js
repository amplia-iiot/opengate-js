'use strict';


import q from 'q';
import moment from 'moment';
import HttpStatus from 'http-status-codes';

import Devices from '../devices/Devices'
import Subscribers from '../devices/commsModules/subscribers/Subscribers'
import Subscriptions from '../devices/commsModules/subscriptions/Subscriptions'

let jp = require('jsonpath');
let Validator = require('jsonschema').Validator;
let v = new Validator();
let ERROR_VALUE_NOT_ALLOWED = 'The value is not allowed. The value should be formatted as follows:';
let ERROR_DATASTREAM_NOT_ALLOWED = 'The datastream is not allowed.';


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
        var f = _this._ogapi.newFilterBuilder();
        f.and({
            "like": {
                'datamodel.categories.datastreams.name': 'provision'
            }
        }).and({
            "eq": {
                "datamodel.organizationName": organization
            }
        });

        let allowedDatastreams = [];
        let allowedDatastreamsBuilder = this._ogapi.datamodelsSearchBuilder().filter(f).build();

        allowedDatastreamsBuilder.execute().then(function(okh) {
            if (okh.statusCode === 200) {
                _this.schema = {};
                return okh;
            } else {
                defered.resolve({ data: 'No content', statusCode: 204 });
            }
        }).then(function(data) {
            _this._getJsonPathElements(data.data).then(function() {
                data.data = _this._setDevicesProperties(data.data, filterElement);
                defered.resolve(data);
            })
        }).catch(function(err) {
            defered.reject(err);
        });
        return promise;
    }

    _getJsonPathElements(data) {
        var promises = [];
        let allowedDatastreams = jp.nodes(data, '$.datamodels[*].categories[*].datastreams[*]..["$ref"]');
        let jsonSchemaSearchBuilder = this._ogapi.jsonSchemaSearchBuilder();

        allowedDatastreams.forEach(function(element, index) {
            var deferred = q.defer();
            element.path.pop();
            let jsonSchemaPath = jp.stringify(element.path);
            jsonSchemaSearchBuilder.withPath(element.value).build().execute().then(function(res) {
                    var newnodes = jp.apply(data, jsonSchemaPath, function(value) {
                        return res.data;
                    });
                    deferred.resolve(res);
                })
                .catch(function(err) {
                    throw new Error(err);
                });
            promises.push(deferred.promise);
        });
        return q.all(promises, data);


    }

    _setDevicesProperties(data, filter) {
        let _this = this;
        let allowedDatastreams = jp.query(data, "$.datamodels[*].categories[*].datastreams[*]");
        let response = { allowedDatastreams: [], schemas: {} };
        _this.complexFunctions = [];
        _this.simpleFunctions = [];

        allowedDatastreams.forEach(function(element, index) {
            let _id = element.id;
            if (_id.startsWith('provision.administration') || _id.startsWith(filter)) {
                response.allowedDatastreams.push(element);
                if (_id.includes('communicationModules')) {
                    _this.schema[_id] = { value: element.schema, complex: true };
                } else {
                    _this.schema[_id] = { value: element.schema, complex: false };

                }
            }
        });
        response['schemas'] = _this.schema;

        return response;

    }
    _createComplexFunction(parent) {
        let _this = parent;
        _this['withComplex'] = function(_id, idCommunicationModules, val) {
            if (!idCommunicationModules || !val) {
                throw new Error('Parameter id and value must be defined');
            }

            if (!_this._definedSchemas[_id] && !_this._definedSchemas[_id].complex) {
                throw new Error(ERROR_DATASTREAM_NOT_ALLOWED);
            }

            var cmElement = {
                '_index': {
                    'value': idCommunicationModules
                }
            };
            if (_id.includes('identifier')) {
                cmElement['_value'] = val;
            } else {
                cmElement['_value'] = {
                    '_received': {
                        'value': val
                    }
                };

            }
            let jSchema = _this._definedSchemas[_id].value;
            if (v.validate(val, jSchema).valid) {
                _this._entity[_id] = _this._entity[_id] ? _this._entity[_id] : [];
                _this._entity[_id].push(cmElement);
            } else {
                throw new Error(ERROR_VALUE_NOT_ALLOWED + JSON.stringify(jSchema));
            }
            return _this;
        };

    }
    _createSimplefunction(parent) {
        let _this = parent;
        _this['with'] = function(_id, val) {
            if (!_this._definedSchemas[_id] && _this._definedSchemas[_id].complex) {
                throw new Error(ERROR_DATASTREAM_NOT_ALLOWED);
            }
            let jSchema = _this._definedSchemas[_id].value;
            if (v.validate(val, jSchema).valid) {
                if (_id.includes('administration') || _id.includes('identifier')) {
                    _this._entity[_id] = {
                        '_value': val
                    };
                } else {
                    _this._entity[_id] = {
                        '_value': {
                            '_received': {
                                'value': val
                            }
                        }
                    };
                }
            } else {
                throw new Error(ERROR_VALUE_NOT_ALLOWED + JSON.stringify(jSchema));
            }
            return _this;
        };
    }

    devicesBuilder(organization) {
        let _this = this;
        let defered = q.defer();
        let promise = defered.promise;
        if (!organization) {
            throw new Error('Parameters organization must be defined');
        }
        this._loadAllowedDatastreams('provision.device', organization)
            .then(function(data) {
                if (data.statusCode === 200) {
                    let allowedDatastreams = data.data.allowedDatastreams;
                    let definedSchemas = data.data.schemas;
                    var device = new Devices(_this._ogapi, organization, allowedDatastreams, definedSchemas);
                    _this._createSimplefunction(device);
                    _this._createComplexFunction(device);
                    defered.resolve(device);
                }
            }).catch(function(err) {
                defered.resolve(err);
            });
        return promise;
    }



    subscribersBuilder(organization) {
        let _this = this;
        let defered = q.defer();
        let promise = defered.promise;
        if (!organization) {
            throw new Error('Parameters organization must be defined');
        }
        this._loadAllowedDatastreams('provision.device.communicationModules[].subscriber', organization)
            .then(function(data) {
                if (data.statusCode === 200) {
                    let allowedDatastreams = data.data.allowedDatastreams;
                    let definedSchemas = data.data.schemas;
                    var subscribers = new Subscribers(_this._ogapi, organization, allowedDatastreams, definedSchemas);
                    _this._createSimplefunction(subscribers);
                    _this._createComplexFunction(subscribers);
                    defered.resolve(subscribers);
                }
            }).catch(function(err) {
                defered.resolve(err);
            });
        return promise;
    }


    subscriptionsBuilder(organization) {
        let _this = this;
        let defered = q.defer();
        let promise = defered.promise;
        if (!organization) {
            throw new Error('Parameters organization must be defined');
        }
        this._loadAllowedDatastreams('provision.device.communicationModules[].subscription', organization)
            .then(function(data) {
                if (data.statusCode === 200) {
                    let allowedDatastreams = data.data.allowedDatastreams;
                    let definedSchemas = data.data.schemas;
                    var subscriptions = new Subscriptions(_this._ogapi, organization, allowedDatastreams, definedSchemas);
                    _this._createSimplefunction(subscriptions);
                    _this._createComplexFunction(subscriptions);
                    defered.resolve(subscriptions);
                }
            }).catch(function(err) {
                defered.resolve(err);
            });
        return promise;
    }





}