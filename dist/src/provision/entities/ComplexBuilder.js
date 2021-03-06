'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SimpleBuilder2 = require('./SimpleBuilder');

var _SimpleBuilder3 = _interopRequireDefault(_SimpleBuilder2);

/**
 * This class extends SimpleBuilder to allow set complex values. What is a complex value? It is simple, It is a value 
 * that need a communications module identifier to allow set into the box.
 */

var ComplexBuilder = (function (_SimpleBuilder) {
    _inherits(ComplexBuilder, _SimpleBuilder);

    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} resource - this is the resource url where can be create/delete/update/read the entity
     * @param {!array} [allowedDatastreams] - Allowed datastreams to add into the new entity
     * @param {!array} [definedSchemas] - Jsonschema about all OpenGate specific types
     * @param {!Validator} [jsonSchemaValidator] - Json schema validator tool
     */

    function ComplexBuilder(ogapi, resource, allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout) {
        _classCallCheck(this, ComplexBuilder);

        _get(Object.getPrototypeOf(ComplexBuilder.prototype), 'constructor', this).call(this, ogapi, resource, allowedDatastreams, definedSchemas, jsonSchemaValidator, timeout);
    }

    _createClass(ComplexBuilder, [{
        key: 'initFromFlattened',
        value: function initFromFlattened(_flattenedEntityData) {
            var _this = this;
            if (_flattenedEntityData && Object.keys(_flattenedEntityData).length > 0) {
                Object.keys(_flattenedEntityData).forEach(function (_id) {
                    if (_id.toLowerCase().startsWith("provision")) {
                        var _content = _flattenedEntityData[_id];

                        if (_content.forEach) {
                            _content.forEach(function (_relation) {
                                if (_relation._index.value && _relation._value && _relation._value._current) {
                                    _this.withComplex(_id, _relation._index.value._current.value, _relation._value._current.value);
                                }
                            });
                        } else {
                            _this['with'](_id, _content._value._current.value);
                        }
                    }
                });
            }
        }
    }, {
        key: '_initFormJson',
        value: function _initFormJson(_jsonEntityData, _path, complex) {
            var _this = this;
            if (_jsonEntityData) {
                var keys = Object.keys(_jsonEntityData);
                keys.forEach(function (key) {
                    var obj = _jsonEntityData[key];
                    var _current = obj._current;
                    var path = _path ? _path + '.' + key : key;
                    if (_current) {
                        var value = _current.value;
                        if (complex) {
                            _this.withComplex(path, complex, value);
                        } else {
                            _this['with'](path, value);
                        }
                    } else {
                        if (Array.isArray(obj)) {
                            obj.forEach(function (cm) {
                                _this._initFromJson(cm, path + '[]', cm.identifier._current.value);
                            });
                        } else _this._initFromJson(obj, path, complex);
                    }
                });
            }
        }
    }, {
        key: 'initFromJson',
        value: function initFromJson(_jsonEntityData) {
            var _this = this;
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
    }, {
        key: 'withComplex',
        value: function withComplex(_id, idCommunicationModules, val) {
            if (!idCommunicationModules) {
                console.warn('Communication module identifier not defined. This value wil be ignored');
                return this;
            }
            if (this.getAllowedDatastreams().filter(function (ds) {
                return ds.identifier === _id;
            }).length !== 1) {
                console.warn('Datastream not found or operations can not be performed on it. This value will be ignored. Datastream Name: ' + _id);
                return this;
            }
            if (!this._entity[_id]) this._entity[_id] = [];

            var _found = false;

            for (var _idx = 0; _idx < this._entity[_id].length; _idx++) {
                var _rel = this._entity[_id][_idx];
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
    }]);

    return ComplexBuilder;
})(_SimpleBuilder3['default']);

exports['default'] = ComplexBuilder;
module.exports = exports['default'];
//# sourceMappingURL=ComplexBuilder.js.map
