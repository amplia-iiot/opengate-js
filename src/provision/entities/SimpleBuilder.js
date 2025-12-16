'use strict';

import HttpStatus from 'http-status-codes';
import BaseProvision from '../BaseProvision';
import q from 'q';
import _ from 'lodash'

const ERROR_VALUE_NOT_ALLOWED = 'value is not allowed. The value should be formatted as follows: ';
const ERROR_DATASTREAM_NOT_ALLOWED = 'Datastream is not allowed';
const schema_base = '/og_basic_types.json';

/**
 * This class allow set simple values.
 */
export default class SimpleBuilder extends BaseProvision {

    /**
     * Constructor
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} resource - this is the resource url where can be create/delete/update/read the entity
     * @param {!array} [allowedDatastreams] - Allowed datastreams to add into the new entity
     * @param {!array} [definedSchemas] - Jsonschema about all OpenGate specific types
     * @param {!Validator} [jsonSchemaValidator] - Json schema validator tool
     */
    constructor(ogapi, resource, allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout) {
        super(ogapi, "/organizations/" + resource, timeout);
        if (typeof this._getEntityKey !== "function") {
            throw new Error("Must override method:  _getEntityKey");
        }
        this._setUrlParameters({
            flattened: true
        });
        this._entity = {};
        this._allowedDatastreams = allowedDatastreams;
        this._definedSchemas = definedSchemas;
        this._jsonSchemaValidator = jsonSchemaValidator;
    }

    _buildURL() {
        return this._resource + "/" + this.getEntityKey();
    }

    _validate() {
        let _this = this;
        let errors = [];
        Object.keys(this._entity).forEach(function (_id) {
            if (_id != 'resourceType') {
                if (!_this._definedSchemas[_id]) {
                    throw new Error(ERROR_DATASTREAM_NOT_ALLOWED + ': ' + _id);
                }
                let jSchema = _this._definedSchemas[_id].value;
                if (_this._entity[_id].constructor === Array) {
                    _this._entity[_id].forEach(function (item) {
                        let value = item._value._current.value;
                        if (!_this._jsonSchemaValidator.validate(schema_base, value)) {
                            errors.push(_id + ' [' + value + '] ' + ERROR_VALUE_NOT_ALLOWED + JSON.stringify(jSchema));
                        }
                    });
                } else {
                    let value = _this._entity[_id]._value._current.value;
                    if (!_this._jsonSchemaValidator.validate(schema_base, value)) {
                        errors.push(_id + ' [' + value + '] ' + ERROR_VALUE_NOT_ALLOWED + JSON.stringify(jSchema));
                    }
                }
            }
        });

        if (errors.length > 0) {
            throw new Error(JSON.stringify(errors).replace(new RegExp("\"", 'g'), ""));
        }
    }

    _composeElement() {
        this._validate();
        return this._entity;
    }

    /**
     * @return {string} - Entity identifier
     */
    getEntityKey() {
        return (this._getEntityKey() !== null) ? this._getEntityKey()._value._current.value : null;
    }

    /**
     * Set new datastream value
     * 
     * @param {!string} _id - Datastream identifier
     * @param {!objecr} val - Datastream value. If this value is null then datastream value will be removed.
     */
    with(_id, val) {
        if (val === undefined || val.length === 0) {
            // Si es un array vacío debe continuar
            if (!_.isArray(val)) {
                delete this._entity[_id];
                return this;
            }
        }

        if (this.getAllowedDatastreams().filter(function (ds) {
            return ds.identifier === _id;
        }).length !== 1) {
            console.warn('Datastream not found or operations can not be performed on it. This value will be ignored. Datastream Name: ' + _id);
            return this;
        }
        this._entity[_id] = {
            '_value': {
                '_current': {
                    'value': val
                }
            }
        };
        return this;
    }

    /**
     * @return {array} - Allowed Datastream definition array
     */
    getAllowedDatastreams() {
        return this._allowedDatastreams;
    }

    initFromFlattened(_flattenedEntityData) {
        let _this = this;
        if (_flattenedEntityData && Object.keys(_flattenedEntityData).length > 0) {
            Object.keys(_flattenedEntityData).forEach(function (_id) {
                if (_id.toLowerCase().startsWith("provision")) {
                    var _content = _flattenedEntityData[_id];
                    if (Array.isArray(_content)) {
                        _content = _content[0];
                    }
                    _this.with(_id, _content._value._current.value);
                }
            });
        }
    }

    _initFromJson(_jsonEntityData, _path) {
        let _this = this;
        if (_jsonEntityData) {
            var keys = Object.keys(_jsonEntityData);
            keys.forEach(function (key) {
                var obj = _jsonEntityData[key];
                var _current = obj._current;
                var path = _path ? (_path + '.' + key) : key;
                if (_current) {
                    _this.with(path, _current.value);
                } else {
                    if (Array.isArray(obj)) {
                        _this._initFromJson(obj[0], path + '[]');
                    } else {
                        _this._initFromJson(obj, path);
                    }
                }
            });
        }
    }

    initFromJson(_jsonEntityData) {
        let _this = this;
        var provision = {};
        if (_jsonEntityData && (provision = _jsonEntityData.provision)) {
            _this._initFromJson(provision, 'provision');
        }
    }

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * This function deletes a entity of provision
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     */
    deleteAll() {
        let defered = q.defer();
        let promise = defered.promise;
        this._setUrlParameters({
            full: true
        });
        this._ogapi.Napi.delete(this._buildURL(), this._timeout, this._getExtraHeaders(), this._getUrlParameters())
            .then((res) => {
                if (res.statusCode === HttpStatus.OK) {
                    defered.resolve({
                        statusCode: res.statusCode
                    });
                } else {
                    defered.reject({
                        errors: res.errors,
                        statusCode: res.statusCode
                    });
                }
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * This function updates a entity of provision
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     * @example
     *  ogapi.organizationsBuilder().update()
     */
    update() {
        var defered = q.defer();
        var promise = defered.promise;

        this._ogapi.Napi.put(this._buildURL(), this._composeUpdateElement(), this._timeout, this._getExtraHeaders(), this._getUrlParameters())
            .then((res) => {
                if (res.statusCode === 200) {
                    defered.resolve({
                        statusCode: res.statusCode
                    });
                } else if (res.status === 200) {
                    defered.resolve({
                        statusCode: res.status
                    });
                } else {
                    defered.reject({
                        errors: res.errors,
                        statusCode: res.statusCode
                    });
                }
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * This function patch a entity of provision
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     * @example
     *  ogapi.organizationsBuilder().update()
     */
    patch() {
        var defered = q.defer();
        var promise = defered.promise;

        this._ogapi.Napi.patch(this._buildURL(), this._composeUpdateElement(), this._timeout, this._getExtraHeaders(), this._getUrlParameters())
            .then((res) => {
                if (res.statusCode === 200) {
                    defered.resolve({
                        statusCode: res.statusCode
                    });
                } else if (res.status === 200) {
                    defered.resolve({
                        statusCode: res.status
                    });
                } else {
                    defered.reject({
                        errors: res.errors,
                        statusCode: res.statusCode
                    });
                }
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }
}