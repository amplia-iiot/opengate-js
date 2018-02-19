'use strict';

import ComplexBuilder from './ComplexBuilder';
import {
    SubscriberID
} from './SubscriberBuilder';
import {
    SubscriptionID
} from './SubscriptionBuilder';
import HttpStatus from 'http-status-codes';
import q from 'q';
import jp from 'jsonpath';

const ID = 'provision.device.identifier',
    PUT_METHOD = 'PUT',
    POST_METHOD = 'POST';

class BoxBuilder {
    constructor(ogapi, obj, url, key) {
        let _this = this;
        let subscribers = {};
        let subscriptions = {};

        this._obj = obj;
        this._url = url;
        this._ogapi = ogapi;
        this._key = key;
        this._deviceKeys = Object.keys(obj).filter(function(dsName) {
            return dsName.indexOf('subscriber') === -1 && dsName.indexOf('subscription') === -1;
        });
        this._subscriberKeys = Object.keys(obj).filter(function(dsName) {
            return dsName.indexOf('subscriber') !== -1;
        });
        this._subscriptionKeys = Object.keys(obj).filter(function(dsName) {
            return dsName.indexOf('subscription') !== -1;
        });
        this._administrationKeys = Object.keys(obj).filter(function(dsName) {
            return dsName.indexOf('provision.administration') !== -1;
        });
        this._wrappers = [];

        this._subscriberKeys.forEach((key) => {
            _this._obj[key].forEach((value) => {
                if (!subscribers[value._index.value]) {
                    subscribers[value._index.value] = {};
                }
                subscribers[value._index.value][key] = {
                    _value: value._value
                };
            });
        });

        this._subscriptionKeys.forEach((key) => {
            _this._obj[key].forEach((value) => {
                if (!subscriptions[value._index.value]) {
                    subscriptions[value._index.value] = {};
                }
                subscriptions[value._index.value][key] = {
                    _value: value._value
                };
            });
        });

        Object.keys(subscriptions).forEach((commsId) => {
            let obj = subscriptions[commsId];
            _this._administrationKeys.forEach((key) => {
                obj[key] = _this._obj[key];
            });
            _this._wrappers.push(new WrapperBuilder(_this._ogapi, obj, _this._url.replace('devices', 'subscriptions').replace('/' + _this._key._value._current.value, ''), obj[SubscriptionID]._value._current.value));
        });
        Object.keys(subscribers).forEach((commsId) => {
            let obj = subscribers[commsId];
            _this._administrationKeys.forEach((key) => {
                obj[key] = _this._obj[key];
            });
            _this._wrappers.push(new WrapperBuilder(_this._ogapi, obj, _this._url.replace('devices', 'subscribers').replace('/' + _this._key._value._current.value, ''), obj[SubscriberID]._value._current.value));
        });
    }

    _urlWithKey() {
        let splitted = this._url.split('?');
        return splitted[0] + '/' + this._key._value._current.value + '?' + splitted[1];
    }

    create() {
        let defer = q.defer();
        let postObj = {};
        let putObj = this._obj;
        let childEntityPromises = [];
        let _this = this;

        Object.keys(putObj).filter((key) => {
            return key.indexOf('subscriber') === -1 && key.indexOf('subscription') === -1;
        }).forEach((deviceKey) => {
            postObj[deviceKey] = putObj[deviceKey];
        });

        this._wrappers.forEach((wrapper) => {
            childEntityPromises.push({
                wrapper: wrapper,
                promise: wrapper.execute(defer, 10)
            });
        });

        q.allSettled(
            childEntityPromises.reduce(function(previousValue, current) {
                previousValue.push(current.promise);
                return previousValue;
            }, [])).then(() => {
            defer.notify({
                message: 'OGAPI_201_ENTITIES_CREATED',
                type: 'success',
                percentage: 20
            });
            defer.notify({
                entity: _this._key._value._current.value,
                message: 'OGAPI_CREATING_DEVICE',
                type: 'success',
                percentage: 25
            });
            return _this._ogapi.Napi.post(_this._url, postObj)
                .then((res) => {
                    defer.notify({
                        entity: _this._key._value._current.value,
                        message: 'OGAPI_DEVICE_CREATED',
                        type: 'success',
                        percentage: 50
                    });
                    if (_this._wrappers.length > 0) {
                        defer.notify({
                            message: 'OGAPI_ADDING_RELATED_ENTITIES',
                            type: 'success',
                            percentage: 55
                        });
                        return _this._ogapi.Napi.put(_this._urlWithKey(), putObj)
                            .then((res) => {
                                if (res.statusCode === HttpStatus.OK) {
                                    console.log("CREATEOK: " + JSON.stringify(res));
                                    if (typeof _this._onCreated === "function") {
                                        _this._onCreated(res.header.location);
                                    }
                                    defer.notify({
                                        entity: _this._key._value._current.value,
                                        message: 'OGAPI_DEVICE_CREATED ',
                                        type: 'success',
                                        percentage: 75
                                    });
                                    defer.resolve({
                                        location: res.header.location,
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
                        if (res.statusCode === HttpStatus.CREATED) {
                            console.log("CREATEOK: " + JSON.stringify(res));
                            if (typeof _this._onCreated === "function") {
                                _this._onCreated(res.header.location);
                            }
                            defer.notify({
                                entity: _this._key._value._current.value,
                                message: 'OGAPI_DEVICE_CREATED',
                                type: 'success',
                                percentage: 75
                            });
                            defer.resolve({
                                location: res.header.location,
                                statusCode: res.statusCode
                            });
                        } else {
                            defer.reject({
                                errors: res.errors,
                                statusCode: res.statusCode
                            });
                        }
                    }

                })
                .catch((errores) => {
                    console.log("mostrando errores");
                    console.log(JSON.stringify(errores));

                    if (errores.statusCode === HttpStatus.BAD_REQUEST) {
                        let ms = jp.query(errores, '$..message')[0];

                        if (ms.includes('Entity duplicated')) {
                            defer.reject({
                                errors: errores.data.errors,
                                statusCode: errores.statusCode
                            });
                        } else {
                            defer.reject({
                                errors: errores.data.errors,
                                statusCode: errores.statusCode
                            });
                        }

                    }
                });
        }).catch((err) => {
            err.data.errors.forEach((err) => {
                var error = err.description;
                if (err.label)
                    error += ":" + err.label;
                defer.notify({
                    message: 'Error: ' + error,
                    type: 'error',
                    percentage: 80
                });
            });
            let deletePromises = [_this.delete(defer, 90)];
            childEntityPromises.forEach((item) => {
                deletePromises.push(item.wrapper.delete(defer, 90));
            });
            q.allSettled(deletePromises).then(() => {
                defer.reject(err);
            }).catch(() => {
                defer.reject(err);
            });
        });
        return defer.promise;
    }
    update() {
        let defer = q.defer();
        let putObj = this._obj;
        let childEntityPromises = [];
        let _this = this;

        this._wrappers.forEach((wrapper) => {
            childEntityPromises.push({
                wrapper: wrapper,
                promise: wrapper.execute(defer, 20)
            });
        });

        q.allSettled(
            childEntityPromises.reduce(function(previousValue, current) {
                previousValue.push(current.promise);
                return previousValue;
            }, [])).then(() => {
            defer.notify({
                message: 'OGAPI_201_ENTITIES_CREATED',
                type: 'success',
                percentage: 40
            });
            defer.notify({
                entity: _this._key._value._current.value,
                message: 'OGAPI_ADDING_RELATED_ENTITIES',
                type: 'success',
                percentage: 45
            });
            return _this._ogapi.Napi.put(_this._url, putObj)
                .then((res) => {
                    if (res.statusCode === HttpStatus.OK) {
                        console.log("CREATEOK: " + JSON.stringify(res));
                        if (typeof _this._onCreated === "function") {
                            _this._onCreated(res.header.location);
                        }
                        defer.notify({
                            entity: _this._key._value._current.value,
                            message: 'OGAPI_DEVICE_UPDATED',
                            type: 'success',
                            percentage: 90
                        });
                        defer.resolve({
                            location: res.header.location,
                            statusCode: res.statusCode
                        });
                    } else {
                        defer.reject({
                            errors: res.errors,
                            statusCode: res.statusCode
                        });
                    }
                });
        }).catch((err) => {
            console.error(err);
            defer.notify('OGAPI_SOMETHING_WRONG_UPDATING_DEVICE');
            defer.reject(err);
        });
        return defer.promise;
    }

    delete(defered, percentage) {
        let _this = this;
        return this._ogapi.Napi.delete(this._urlWithKey())
            .then((res) => {
                defered.notify({
                    entity: _this._key,
                    message: 'OGAPI_ENTITY_DELETED',
                    type: 'warning',
                    percentage: percentage
                });
            });
    }
}

class WrapperBuilder {
    constructor(ogapi, obj, url, key) {
        this._obj = obj;
        this._url = url;
        this._ogapi = ogapi;
        this._key = key;
        this._created = false;
    }

    _urlWithKey() {
        let splitted = this._url.split('?');
        return splitted[0] + '/' + this._key + '?' + splitted[1];
    }

    _checkExists() {
        return this._ogapi.Napi.get(this._urlWithKey()).then(function(response) {
            return response.statusCode === HttpStatus.OK;
        }).catch((err) => {
            console.warn(err);
            return false;
        });
    }


    execute(defered, percentage) {
        let defer = q.defer();
        let _this = this;
        this._checkExists().then((exists) => {
            if (!exists) {
                create(defered, defer, percentage);
            } else {
                defer.resolve({ message: 'OGAPI_ENTITY_ALREADY_CREATED', entity: _this._key });
            }
        }).catch((exists) => {
            if (!exists) {
                create(defered, defer, percentage);
            } else {
                defer.resolve({ message: 'OGAPI_ENTITY_ALREADY_CREATED', entity: _this._key });
            }
        });
        return defer.promise;

        function create(defered, defer, percentage) {
            _this._ogapi.Napi.post(_this._url, _this._obj)
                .then((res) => {
                    _this._created = true;
                    defered.notify({
                        entity: _this._key,
                        message: 'OGAPI_ENTITY_CREATED',
                        type: 'success',
                        percentage: percentage
                    });
                    defer.resolve({ message: 'OGAPI_ENTITY_CREATED', entity: _this._key });
                }).catch((err) => {
                    console.error(err);
                    defered.notify({
                        entity: _this._key,
                        message: 'OGAPI_ENTITY_CREATED',
                        type: 'warning',
                        percentage: percentage
                    });
                    defer.reject({
                        entity: _this._key,
                        message: 'OGAPI_SOMETHING_WRONG_CREATING',
                    });
                });
        }
    }

    delete(defered, percentage) {
        let _this = this;
        if (this._created) {
            return this._ogapi.Napi.delete(this._urlWithKey())
                .then((res) => {
                    defered.notify({
                        entity: _this._key,
                        message: 'OGAPI_ENTITY_DELETED',
                        type: 'warning',
                        percentage: percentage
                    });
                });
        }
        return Q.fcall(() => {
            return;
        });
    }

}

/**
 * Device builder. This builder give you the necessary tools to create a device using our OpenGate REST.
 */
export default class DeviceBuilder extends ComplexBuilder {

    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - this is the organization name where device will be created
     * @param {!array} [allowedDatastreams] - Allowed datastreams to add into the new device
     * @param {!array} [definedSchemas] - Jsonschema about all OpenGate specific types
     * @param {!Validator} [jsonSchemaValidator] - Json schema validator tool
     */
    constructor(ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator) {
        super(ogapi, organization + '/devices', allowedDatastreams, definedSchemas, jsonSchemaValidator);
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
    create() {
        this._checkRequiredParameters();
        return (new BoxBuilder(this._ogapi, this._composeElement(), this._resource, this._getEntityKey())).create();
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
    update() {
        return (new BoxBuilder(this._ogapi, this._composeElement(), this._buildURL(), this._getEntityKey())).update();
    }

    _getEntityKey() {
        return this._entity[ID];
    }

    initFromFlattened(_flattenedEntityData) {
        let _this = this;
        if (_flattenedEntityData && Object.keys(_flattenedEntityData).length > 0) {
            Object.keys(_flattenedEntityData).forEach(function(_id) {
                if (_id.toLowerCase().startsWith("provision")) {
                    var _content = _flattenedEntityData[_id];

                    if (_content.forEach) {
                        _content.forEach(function(_relation) {
                            if (_relation._index.value && _relation._value && _relation._value._current) {
                                _this.withComplex(_id, _relation._index.value._current.value, _relation._value._current.value);
                            }
                        });
                    } else {
                        _this.with(_id, _content._value._current.value);
                    }
                }
            });
        }
    }
}