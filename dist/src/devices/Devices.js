'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _provisionBaseProvision = require('../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

var ENTITY_ID = 'provision.device.identifier';
/**
 * This is a base object that contains all you can do about Devices.
 */

var Devices = (function (_BaseProvision) {
    _inherits(Devices, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function Devices(ogapi, organization, allowedDatastreams, definedSchemas) {
        _classCallCheck(this, Devices);

        _get(Object.getPrototypeOf(Devices.prototype), 'constructor', this).call(this, ogapi, "/organizations/", undefined, undefined);
        var _this = this;
        this._organization = organization;
        this._filter = "provision.device";
        this._entity = {};
        this._allowedDatastreams = allowedDatastreams;
        this._definedSchemas = definedSchemas;
    }

    _createClass(Devices, [{
        key: '_buildURL',
        value: function _buildURL() {
            this._getEntityKey();
            if (this._organization === undefined || this._entity[ENTITY_ID] === undefined) {
                throw new Error('Parameters organization, entityKey must be defined');
            }
            this._resource = "provision/organizations/" + this._organization + "/devices";
            var url = this._resource + "/" + this._entityKey + "?flattened=true";
            return url;
        }

        /**
         * Return the allowed datastream for subscriber
         * @example
         *  ogapi.entityBuilder.devicesBuilder().getAllowedDatastreams()
         * @return {Promise} 
         */
    }, {
        key: 'getAllowedDatastreams',
        value: function getAllowedDatastreams() {
            var _this = this;
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            if (this._allowedDatastreams) {
                defered.resolve({ statusCode: 200, data: this._allowedDatastreams });
            } else {
                defered.resolve({ statusCode: 204, data: 'no content' });
            }
            return promise;
        }

        /**
         * Create a device
         *
         * @example
         *  ogapi.entityBuilder.devicesBuilder().create()
         * @return {Devices} 
         */
    }, {
        key: 'create',
        value: function create() {
            this._resource = "provision/organizations/" + this._organization + "/devices?flattened=true";
            var _this = this;
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            if (this._validate()) {
                _get(Object.getPrototypeOf(Devices.prototype), 'create', this).call(this).then(function (res) {
                    defered.resolve({ data: res.data, statusCode: res.statusCode });
                })['catch'](function (err) {
                    defered.reject(err);
                });
            } else {
                var error = { 'errors': 'Bad Request', "statusCode": 400 };
                defered.reject(error);
                throw new Error(error);
            }

            return promise;
        }
    }, {
        key: '_validate',
        value: function _validate() {
            var _this = this;
            try {
                JSON.parse(JSON.stringify(this._entity));
            } catch (e) {
                return false;
            }
            return true;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._getEntityKey();
            this._entity["provision.administration.organization"] = {
                '_value': this._organization
            };
            return this._entity;
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
            this._getEntityKey();
            var url = "provision/organizations/" + this._organization + "/devices/" + this._entityKey + "?full=true";
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
    }, {
        key: '_getEntityKey',
        value: function _getEntityKey() {
            if (this._entity[ENTITY_ID]) {
                this._entityKey = this._entity[ENTITY_ID]._value;
            } else {
                throw new Error('Parameter entityKey must defined. Please define datastream: ' + ENTITY_ID);
            }
        }
    }]);

    return Devices;
})(_provisionBaseProvision2['default']);

exports['default'] = Devices;
module.exports = exports['default'];
//# sourceMappingURL=Devices.js.map
