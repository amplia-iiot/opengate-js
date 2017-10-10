'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BaseProvision2 = require('../BaseProvision');

var _BaseProvision3 = _interopRequireDefault(_BaseProvision2);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var ERROR_VALUE_NOT_ALLOWED = 'The value is not allowed. The value should be formatted as follows: ';
var ERROR_DATASTREAM_NOT_ALLOWED = 'Datastream is not allowed.';
var ERROR_ORGANIZATION = 'Parameters organization must be defined';

/**
 * This class allow set simple values.
 */

var SimpleBuilder = (function (_BaseProvision) {
    _inherits(SimpleBuilder, _BaseProvision);

    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} resource - this is the resource url where can be create/delete/update/read the entity
     * @param {!array} [allowedDatastreams] - Allowed datastreams to add into the new entity
     * @param {!array} [definedSchemas] - Jsonschema about all OpenGate specific types
     * @param {!Validator} [jsonSchemaValidator] - Json schema validator tool
     */

    function SimpleBuilder(ogapi, resource, allowedDatastreams, definedSchemas, jsonSchemaValidator) {
        _classCallCheck(this, SimpleBuilder);

        _get(Object.getPrototypeOf(SimpleBuilder.prototype), 'constructor', this).call(this, ogapi, "/organizations/" + resource + '?flattened=true');
        if (typeof this._getEntityKey !== "function") {
            throw new Error("Must override method:  _getEntityKey");
        }
        this._entity = {};
        this._allowedDatastreams = allowedDatastreams;
        this._definedSchemas = definedSchemas;
        this._jsonSchemaValidator = jsonSchemaValidator;
    }

    _createClass(SimpleBuilder, [{
        key: '_buildURL',
        value: function _buildURL() {
            var url = this._resource.split('?');
            return url[0] + "/" + this.getEntityKey() + '?' + url[1];
        }
    }, {
        key: '_validate',
        value: function _validate() {
            var _this = this;
            var errors = [];
            Object.keys(this._entity).forEach(function (_id) {
                if (!_this._definedSchemas[_id]) {
                    throw new Error(ERROR_DATASTREAM_NOT_ALLOWED);
                }
                var jSchema = _this._definedSchemas[_id].value;
                var value = _this._entity[_id]._value._current.value;
                if (!_this._jsonSchemaValidator.validate(value, jSchema).valid) {
                    errors.push(ERROR_VALUE_NOT_ALLOWED + JSON.stringify(jSchema));
                }
            });

            if (errors.length > 0) {
                throw new Error(JSON.stringify(errors).replace(new RegExp("\"", 'g'), ""));
            }
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._validate();
            return this._entity;
        }

        /**
         * @return {string} - Entity identifier
         */
    }, {
        key: 'getEntityKey',
        value: function getEntityKey() {
            return this._getEntityKey() !== null ? this._getEntityKey()._value._current.value : null;
        }

        /**
         * Set new datastream value
         * 
         * @param {!string} _id - Datastream identifier
         * @param {!objecr} val - Datastream value. If this value is null then datastream value will be removed.
         */
    }, {
        key: 'with',
        value: function _with(_id, val) {
            if (!val) {
                delete this._entity[_id];
                return this;
            }
            if (this.getAllowedDatastreams().filter(function (ds) {
                return ds.identifier === _id;
            }).length !== 1) {
                console.warn('Datastream not found. This value will be ignored. Datastream Name: ' + _id);
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
    }, {
        key: 'getAllowedDatastreams',
        value: function getAllowedDatastreams() {
            return this._allowedDatastreams;
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function deletes a entity of provision
         * @return {Promise}
         * @property {function (result:object, statusCode:number)} then - When request it is OK
         * @property {function (error:string)} catch - When request it is NOK
         */
    }, {
        key: 'deleteAll',
        value: function deleteAll() {
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            var url = this._buildURL().split('?')[0] + "?full=true";
            this._ogapi.Napi['delete'](url).then(function (res) {
                if (res.statusCode === 200) {
                    defered.resolve({ statusCode: res.statusCode });
                } else {
                    defered.reject({ errors: res.errors, statusCode: res.statusCode });
                }
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }
    }]);

    return SimpleBuilder;
})(_BaseProvision3['default']);

exports['default'] = SimpleBuilder;
module.exports = exports['default'];
//# sourceMappingURL=SimpleBuilder.js.map