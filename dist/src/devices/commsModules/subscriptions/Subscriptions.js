'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var _provisionBaseProvision = require('../../../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

var ADDRESS_TYPE_ENUM = ["MAC", "IPV4", "IPV6"];
/**
 * This is a base object that contains all you can do about Subscriptions.
 */

var Subscriptions = (function (_BaseProvision) {
    _inherits(Subscriptions, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function Subscriptions(ogapi) {
        _classCallCheck(this, Subscriptions);

        _get(Object.getPrototypeOf(Subscriptions.prototype), 'constructor', this).call(this, ogapi, "/organizations/", undefined, ["channel", "organization", "specificType", "entityKey"]);
        this._template = "default";
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Subscriptions}
     */

    _createClass(Subscriptions, [{
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string' || name.length > 50) throw new Error('Parameter name must be a string and has a maximum length of 50');
            this._name = name;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description 
         * @return {Subscriptions}
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
         * @return {Subscriptions}
         */
    }, {
        key: 'withSpecificType',
        value: function withSpecificType(specificType) {
            if (typeof specificType !== 'string' || specificType.length > 50) throw new Error('Parameter specificType must be a string and has a maximum length of 50');
            this._specificType = specificType;
            return this;
        }

        /**
         * Sets the organization attribute
         * @param {string} organization 
         * @return {Subscriptions}
         */
    }, {
        key: 'withOrganization',
        value: function withOrganization(organization) {
            if (typeof organization !== 'string' || organization.length > 250) throw new Error('Parameter organization must be a string and has a maximum length of 250');
            this._organization = organization;

            this._resource = "provision/organizations/" + this._organization + "/entities/subscriptions";

            return this;
        }

        /**
         * Sets the channel attribute
         * @param {string} channel 
         * @return {Subscriptions}
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
         * @return {Subscriptions}
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
         * @return {Subscriptions}
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
         * @return {Subscriptions}
         */
    }, {
        key: 'withEntityKey',
        value: function withEntityKey(entityKey) {
            if (typeof entityKey !== 'string' || entityKey.length > 200) throw new Error('Parameter entityKey must be a string and has a maximum length of 200');
            this._entityKey = entityKey;
            return this;
        }

        /**
         * Sets the location attribute
         * @param {number} longitude
         * @param {number} latitude
         * @param {string} timestamp
         * @return {Subscriptions}
         */
    }, {
        key: 'withLocation',
        value: function withLocation(longitude, latitude, timestamp) {
            if (typeof longitude !== 'number' || typeof latitude !== 'number') throw new Error('Parameter longitude/latitude must be a number');

            if (timestamp) {
                var finalDate = moment(timestamp);

                if (!finalDate.isValid()) {
                    //console.warn("Error parsing location timestamp '" + timestamp + "'");
                    throw new Error('Parameter timestamp must be an ISO 8601 string or a date');
                } else {
                    if (!this._location) {
                        this._location = {};
                    }

                    this._location['coordinates'] = {
                        'latitude': latitude,
                        'longitude': longitude
                    };
                    this._location["timestamp"] = finalDate.format();
                }
            } else {
                if (!this._location) {
                    this._location = {};
                }

                this._location['coordinates'] = {
                    'latitude': latitude,
                    'longitude': longitude
                };
            }

            return this;
        }

        /**
         * Sets the postal code attribute
         * @param {string} postalCode
         * @return {Subscriptions}
         */
    }, {
        key: 'withPostalCode',
        value: function withPostalCode(postalCode) {
            if (typeof postalCode !== 'string') throw new Error('Parameter postalCode must be a string');

            if (!this._location) {
                this._location = {};
            }

            this._location["postal"] = postalCode;

            return this;
        }

        /**
         * The request will have a specific time out if it will be exceeded then the promise throw an exception
         * @param {number} ms - timeout in milliseconds    
         * @return {Subscriptions} 
         */
    }, {
        key: 'withTimeout',
        value: function withTimeout(ms) {
            if (typeof ms !== "number") throw new Error('Parameter ms must be a number');
            this._timeout = ms;
            return this;
        }

        /**
         *   Sets the ip addres attribute
         *   @param {string} ipAddress - Address ip
         *   @param {string} [type="IPV4"] - Type. It can be IPV4 or IPV6 or MAC
         *   @return {Subscriptions}  
         **/
    }, {
        key: 'withIpAddress',
        value: function withIpAddress(ipAddress) {
            var type = arguments.length <= 1 || arguments[1] === undefined ? "IPV4" : arguments[1];

            if (typeof ipAddress !== 'string' || ipAddress.length > 200) throw new Error('Parameter ipAddress must be a string and has a maximum length of 200');
            this._checkAddressType(type);
            this._address = (0, _merge2['default'])(this._address || {}, { type: type, value: ipAddress });
            return this;
        }

        /**
         * Sets the apn attribute
         * @param {string} apn 
         * @return {Subscriptions}  
         **/
    }, {
        key: 'withApn',
        value: function withApn(apn) {
            if (typeof apn !== 'string' || apn.length > 200) throw new Error('Parameter apn must be a string and has a maximum length of 200');
            this._address = (0, _merge2['default'])(this._address || {}, { apn: apn });
            return this;
        }

        /**
         * Sets the registeredOperator attribute
         * @param {string} registeredOperator 
         * @return {Subscriptions}
         */
    }, {
        key: 'withRegisteredOperator',
        value: function withRegisteredOperator(registeredOperator) {
            if (typeof registeredOperator !== 'string' || registeredOperator.length > 200) throw new Error('Parameter registeredOperator must be a string and has a maximum length of 200');
            this._registeredOperator = registeredOperator;
            return this;
        }

        /**
         * Sets the homeOperator attribute
         * @param {string} homeOperator 
         * @return {Subscriptions}
         */
    }, {
        key: 'withHomeOperator',
        value: function withHomeOperator(homeOperator) {
            if (typeof homeOperator !== 'string' || homeOperator.length > 200) throw new Error('Parameter homeOperator must be a string and has a maximum length of 200');
            this._homeOperator = homeOperator;
            return this;
        }

        /**
         * Sets the imsi attribute
         * @param {string} imsi 
         * @return {Subscriptions}
         */
    }, {
        key: 'withImsi',
        value: function withImsi(imsi) {
            if (typeof imsi !== 'string' || imsi.length > 200) throw new Error('Parameter imsi must be a string and has a maximum length of 200');
            this._imsi = imsi;
            return this;
        }

        /**
         * Sets the msisdn attribute
         * @param {string} msisdn 
         * @return {Subscriptions}
         */
    }, {
        key: 'withMsisdn',
        value: function withMsisdn(msisdn) {
            if (typeof msisdn !== 'string' || msisdn.length > 200) throw new Error('Parameter msisdn must be a string and has a maximum length of 200');
            this._msisdn = msisdn;
            return this;
        }

        /**
         * Create the subscription
         * @example
         *  ogapi.subscriptionBuilder().create()
         * @return {Promise} 
         */
    }, {
        key: 'create',
        value: function create() {
            var _this = this;

            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._validate()['catch'](function (err) {
                defered.reject(err);
                throw new Error(err);
            }).done(function (res) {
                _get(Object.getPrototypeOf(Subscriptions.prototype), 'create', _this).call(_this).then(function (res) {
                    defered.resolve(res);
                })['catch'](function (err) {
                    defered.reject(err);
                });
            }, function (err) {});
            return promise;
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            var organization = this._organization;
            if (organization === undefined || this._entityKey === undefined) {
                throw new Error('Parameters organization and entityKey must be defined');
            }
            this._resource = "provision/organizations/" + organization + "/entities/subscriptions";
            var url = this._resource + "/" + this._entityKey;
            return url;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            var entityData = {
                "subscription": {
                    "id": this._entityKey,
                    "provision": {
                        "customId": [this._entityKey],
                        "template": this._template,
                        "specificType": this._specificType !== undefined ? [this._specificType] : undefined,
                        "name": this._name !== undefined ? [this._name] : undefined,
                        "location": this._location !== undefined ? [this._location] : undefined,
                        "msisdn": this._msisdn !== undefined ? [this._msisdn] : undefined,
                        "imsi": this._imsi !== undefined ? [this._imsi] : undefined,
                        "homeOperator": this._homeOperator !== undefined ? [this._homeOperator] : undefined,
                        "registeredOperator": this._registeredOperator !== undefined ? [this._registeredOperator] : undefined,
                        "address": this._address !== undefined ? [this._address] : undefined,
                        "description": this._description !== undefined ? [this._description] : undefined,
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
        key: '_validate',
        value: function _validate() {
            this._checkRequiredParameters();
            var previousValidations = [];

            if (this._administrativeState) {
                var administrativeStateBuilder = this._ogapi.administrativeStateSearchBuilder().withEntityType("SUBSCRIPTION").withId(this._administrativeState).build();
                previousValidations.push(administrativeStateBuilder.execute().then(function (okh) {
                    if (okh.statusCode === 204) {
                        throw new Error("Administrative State not found");
                    }
                }));
            }

            var specificTypeBuilder = this._ogapi.specificTypeSearchBuilder().withEntityType("SUBSCRIPTION").withId(this._specificType).build();
            previousValidations.push(specificTypeBuilder.execute().then(function (okh) {
                if (okh.statusCode === 204) {
                    throw new Error("Specific Type not found");
                }
            }));

            var mobilePhoneProviderSearchBuilder = this._ogapi.mobilePhoneProviderSearchBuilder().build();
            var registeredOperator = this._registeredOperator;
            if (typeof registeredOperator !== "undefined") {
                previousValidations.push(mobilePhoneProviderSearchBuilder.execute().then(function (mobilePhoneProvider) {
                    var mobilePhoneProviderList = mobilePhoneProvider.data.mobilePhoneProvider;
                    var not_found = [];
                    var found = mobilePhoneProviderList.find(function (registeredOperator) {
                        return registeredOperator == this;
                    }, registeredOperator);

                    if (typeof found === "undefined") {
                        not_found.push(registeredOperator);
                    }

                    if (not_found.length !== 0) {
                        throw new Error("Parameter mobilePhoneProvider value not allowed <'" + JSON.stringify(not_found) + "'>, allowed <'" + JSON.stringify(mobilePhoneProviderList) + "'>");
                    }
                }));
            }
            var homeOperator = this._homeOperator;
            if (typeof homeOperator !== "undefined") {
                previousValidations.push(mobilePhoneProviderSearchBuilder.execute().then(function (mobilePhoneProvider) {
                    var mobilePhoneProviderList = mobilePhoneProvider.data.mobilePhoneProvider;
                    var not_found = [];
                    var found = mobilePhoneProviderList.find(function (homeOperator) {
                        return homeOperator == homeOperator;
                    }, homeOperator);

                    if (typeof found === "undefined") {
                        not_found.push(homeOperator);
                    }

                    if (not_found.length !== 0) {
                        throw new Error("Parameter mobilePhoneProvider value not allowed <'" + JSON.stringify(not_found) + "'>, allowed <'" + JSON.stringify(mobilePhoneProviderList) + "'>");
                    }
                }));
            }
            return _q2['default'].all(previousValidations);
        }
    }, {
        key: '_checkAddressType',
        value: function _checkAddressType(type) {
            var not_found = [];
            var found = ADDRESS_TYPE_ENUM.find(function (type) {
                return type == this;
            }, type);

            if (typeof found === "undefined") {
                not_found.push(type);
            }

            if (not_found.length !== 0) {
                throw new Error("Parameter address type value not allowed <'" + JSON.stringify(not_found) + "'>, allowed <'" + JSON.stringify(ADDRESS_TYPE_ENUM) + "'>");
            }
        }
    }]);

    return Subscriptions;
})(_provisionBaseProvision2['default']);

exports['default'] = Subscriptions;
module.exports = exports['default'];
//# sourceMappingURL=Subscriptions.js.map
