'use strict';

import SimpleBuilder from './SimpleBuilder';

/**
 * This class extends SimpleBuilder to allow set complex values. What is a complex value? It is simple, It is a value 
 * that need a communications module identifier to allow set into the box.
 */
export default class ComplexBuilder extends SimpleBuilder {


    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} resource - this is the resource url where can be create/delete/update/read the entity
     * @param {!array} [allowedDatastreams] - Allowed datastreams to add into the new entity
     * @param {!array} [definedSchemas] - Jsonschema about all OpenGate specific types
     * @param {!Validator} [jsonSchemaValidator] - Json schema validator tool
     */
    constructor(ogapi, resource, allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout) {
        super(ogapi, resource, allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout);
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


    _initFormJson(_jsonEntityData, _path, complex) {
        let _this = this;
        if (_jsonEntityData) {
            var keys = Object.keys(_jsonEntityData);
            keys.forEach(function(key) {
                var obj = _jsonEntityData[key];
                var _current = obj._current;
                var path = _path ? (_path + '.' + key) : key;
                if (_current) {
                    var value = _current.value;
                    if (complex) {
                        _this.withComplex(path, complex, value);
                    } else {
                        _this.with(path, value);
                    }
                } else {
                    if (Array.isArray(obj)) {
                        obj.forEach(function(cm) {
                            _this._initFromJson(cm, path + '[]', cm.identifier._current.value);
                        });
                    } else
                        _this._initFromJson(obj, path, complex);
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
     * Set a complex value to entity
     * @param {!string} _id - Datastream identifier
     * @param {!string} idCommunicationModules - Communications module identifier
     * @param {object} val - Value to set.
     */
    withComplex(_id, idCommunicationModules, val) {
        if (!idCommunicationModules) {
            console.warn('Communication module identifier not defined. This value wil be ignored');
            return this;
        }
        if (this.getAllowedDatastreams().filter(function(ds) {
                return ds.identifier === _id;
            }).length !== 1) {
            console.warn('Datastream not found or operations can not be performed on it. This value will be ignored. Datastream Name: ' + _id);
            return this;
        }
        if (!this._entity[_id])
            this._entity[_id] = [];

        let _found = false;

        for (let _idx = 0; _idx < this._entity[_id].length; _idx++) {
            let _rel = this._entity[_id][_idx];
            if (_rel._index && _rel._index.value && _rel._index.value === idCommunicationModules) {
                this._entity[_id][_idx] = {
                    '_index': {
                        'value': idCommunicationModules
                    },
                    '_value': {
                        '_current': {
                            'value': val
                        }
                    }
                };

                _found = true;
            }
        }

        if (!_found) {
            this._entity[_id].push({
                '_index': {
                    'value': idCommunicationModules
                },
                '_value': {
                    '_current': {
                        'value': val
                    }
                }
            });
        }

        return this;
    }
}