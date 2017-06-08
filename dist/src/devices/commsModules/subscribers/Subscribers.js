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

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _provisionBaseProvision = require('../../../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

/**
 * This is a base object that contains all you can do about Subscribers.
 */

var Subscribers = (function (_BaseProvision) {
    _inherits(Subscribers, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function Subscribers(ogapi) {
        _classCallCheck(this, Subscribers);

        _get(Object.getPrototypeOf(Subscribers.prototype), 'constructor', this).call(this, ogapi, "/organizations/", undefined, ["channel", "organization", "specificType", "entityKey"]);
        this._template = "default";
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Subscribers}
     */

    _createClass(Subscribers, [{
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string' || name.length > 50) throw new Error('Parameter name must be a string and has a maximum length of 50');
            this._name = name;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description 
         * @return {Subscribers}
         */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
            if (typeof description !== 'string' || description.length > 250) throw new Error('Parameter description must be a string and has a maximum length of 250');
            this._description = description;
            return this;
        }

        /**
         * Set the specific type attribute
         * @param {string} specificType 
         * @return {Subscribers}
         */
    }, {
        key: 'withSpecificType',
        value: function withSpecificType(specificType) {
            if (typeof specificType !== 'string' || specificType.length > 50) throw new Error('Parameter specificType must be a string and has a maximum length of 50');
            this._specificType = specificType;
            return this;
        }

        /**
         * Set the ICC attribute
         * @param {string} icc 
         * @return {Subscribers}
         */
    }, {
        key: 'withIcc',
        value: function withIcc(icc) {
            if (typeof icc !== 'string' || icc.length > 250) throw new Error('Parameter icc must be a string and has a maximum length of 250');
            this._icc = icc;
        }

        /**
         * Sets the organization attribute
         * @param {string} organization 
         * @return {Subscribers}
         */
    }, {
        key: 'withOrganization',
        value: function withOrganization(organization) {
            if (typeof organization !== 'string' || organization.length > 250) throw new Error('Parameter organization must be a string and has a maximum length of 250');
            this._organization = organization;
            this._resource = "provision/organizations/" + this._organization + "/entities/subscribers";
            return this;
        }

        /**
         * Sets the channel attribute
         * @param {string} channel 
         * @return {Subscribers}
         */
    }, {
        key: 'withChannel',
        value: function withChannel(channel) {
            if (typeof channel !== 'string' || channel.length > 250) throw new Error('Parameter channel must be a string and has a maximum length of 250');
            this._channel = channel;
            return this;
        }

        /**
         * Sets the administrative state attribute
         * @param {string} administrativeState 
         * @return {Subscribers}
         */
    }, {
        key: 'withAdministrativeState',
        value: function withAdministrativeState(administrativeState) {
            if (typeof administrativeState !== 'string' || administrativeState.length > 250) throw new Error('Parameter administrativeState must be a string and has a maximum length of 250');
            this._administrativeState = administrativeState;
            return this;
        }

        /**
         * Sets the serviceGroup attribute
         * @param {string} serviceGroup 
         * @return {Subscribers}
         */
    }, {
        key: 'withServiceGroup',
        value: function withServiceGroup(serviceGroup) {
            if (typeof serviceGroup !== 'string' || serviceGroup.length > 250) throw new Error('Parameter serviceGroup must be a string and has a maximum length of 250');
            this._serviceGroup = serviceGroup;
            return this;
        }

        /**
         * Sets the entityKey attribute
         * @param {string} entityKey 
         * @return {Subscribers}
         */
    }, {
        key: 'withEntityKey',
        value: function withEntityKey(entityKey) {
            if (typeof entityKey !== 'string' || entityKey.length > 200) throw new Error('Parameter entityKey must be a string and has a maximum length of 200');
            this._entityKey = entityKey;
            return this;
        }

        /**
         * The request will have a specific time out if it will be exceeded then the promise throw an exception
         * @param {number} ms - timeout in milliseconds    
         * @return {Subscribers} 
         */
    }, {
        key: 'withTimeout',
        value: function withTimeout(ms) {
            if (typeof ms !== "number") throw new Error('Parameter ms must be a number');
            this._timeout = ms;
            return this;
        }

        /**
         * Create the subscriber
         * @example
         *  ogapi.subscriberBuilder().create()
         * @return {Promise} 
         */
    }, {
        key: 'create',
        value: function create() {
            var _this2 = this;

            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._validate()['catch'](function (err) {
                defered.reject(err);
                throw new Error(err);
            }).done(function (res) {
                _get(Object.getPrototypeOf(Subscribers.prototype), 'create', _this2).call(_this2).then(function (res) {
                    defered.resolve(res);
                })['catch'](function (err) {
                    defered.reject({ errors: err.data.errors, statusCode: err.statusCode });
                });
            }, function (err) {});
            return promise;
        }
    }, {
        key: '_create',
        value: function _create() {
            var _this3 = this;

            var _this = this;
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._validate().then(function (prevOk) {
                return _get(Object.getPrototypeOf(Subscribers.prototype), 'create', _this3).call(_this3).then(function (res) {
                    if (res.statusCode === 201) {
                        defered.resolve(res);
                    } else {
                        defered.reject({ errors: res.data.errors, statusCode: response.statusCode });
                    }
                });
            })['catch'](function (err) {
                defered.reject({ errors: res.data.errors, statusCode: response.statusCode });
            });
            return promise;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            var entityData = {
                "subscriber": {
                    "id": this._entityKey,
                    "provision": {
                        "customId": [this._entityKey],
                        "template": this._template,
                        "specificType": this._specificType !== undefined ? [this._specificType] : undefined,
                        "name": this._name !== undefined ? [this._name] : undefined,
                        "description": this._description !== undefined ? [this._description] : undefined,
                        "icc": this._icc !== undefined ? [this._icc] : undefined,
                        "admin": {
                            "organization": this._organization,
                            "channel": this._channel !== undefined ? this._channel : "default_channel",
                            "administrativeState": this._administrativeState !== undefined ? this._administrativeState : undefined,
                            "serviceGroup": this._serviceGroup !== undefined ? this._serviceGroup : "emptyServiceGroup"
                        }
                    }
                }
            };
            return entityData;
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            var organization = this._organization;
            if (organization === undefined || this._entityKey === undefined) {
                throw new Error('Parameters organization and entityKey must be defined');
            }
            this._resource = "provision/organizations/" + organization + "/entities/subscribers";
            var url = this._resource + "/" + this._entityKey;
            return url;
        }
    }, {
        key: '_validate',
        value: function _validate() {
            this._checkRequiredParameters();
            var previousValidations = [];

            if (this._administrativeState) {
                var administrativeStateBuilder = this._ogapi.administrativeStateSearchBuilder().withEntityType("SUBSCRIBER").withId(this._administrativeState).build();
                previousValidations.push(administrativeStateBuilder.execute().then(function (okh) {
                    if (okh.statusCode === 204) {
                        throw new Error("Administrative State not found");
                    }
                }));
            }

            if (this._specificType) {
                var specificTypeBuilder = this._ogapi.specificTypeSearchBuilder().withEntityType("SUBSCRIBER").withId(this._specificType).build();
                previousValidations.push(specificTypeBuilder.execute().then(function (okh) {
                    if (okh.statusCode === 204) {
                        throw new Error("Specific Type not found");
                    }
                }));
            }
            return _q2['default'].all(previousValidations);
        }
    }]);

    return Subscribers;
})(_provisionBaseProvision2['default']);

exports['default'] = Subscribers;
module.exports = exports['default'];
//# sourceMappingURL=Subscribers.js.map
