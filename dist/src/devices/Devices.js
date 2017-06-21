'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _TYPE_ENUM = require('./TYPE_ENUM');

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _provisionBaseProvision = require('../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

/**
 * This is a base object that contains all you can do about Devices.
 */

var Devices = (function (_BaseProvision) {
    _inherits(Devices, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function Devices(ogapi) {
        _classCallCheck(this, Devices);

        _get(Object.getPrototypeOf(Devices.prototype), 'constructor', this).call(this, ogapi, "/organizations/", undefined, ["organization", "type", "entityKey"]);
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Devices}
     */

    _createClass(Devices, [{
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string' || name.length > 50) throw new Error('Parameter name must be a string and has a maximum length of 50');
            this._name = name;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description 
         * @return {Devices}
         */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
            if (typeof description !== 'string' || description.length > 250) throw new Error('Parameter description must be a string and has a maximum length of 250');
            this._description = description;
            return this;
        }

        /**
         * Set the type attribute
         * @param {string} type 
         * @return {Devices}
         */
    }, {
        key: 'withType',
        value: function withType(type) {
            this._type = this._checkType(type);
            return this;
        }

        /**
         * Set the specific type attribute
         * @param {string} specificType 
         * @return {Devices}
         */
    }, {
        key: 'withSpecificType',
        value: function withSpecificType(specificType) {
            this._specificType = specificType;
            return this;
        }

        /**
         * Set the operationalStatus attribute
         * @param {string} operationalStatus 
         * @return {Devices}
         */
    }, {
        key: 'withOperationalStatus',
        value: function withOperationalStatus(operationalStatus) {
            this._operationalStatus = operationalStatus;
            return this;
        }

        /***************************ADMINISTRACION************************************/
        /**
         * Sets the organization attribute
         * @param {string} organization 
         * @return {Devices}
         */
    }, {
        key: 'withOrganization',
        value: function withOrganization(organization) {
            if (typeof organization !== 'string' || organization.length > 250) throw new Error('Parameter organization must be a string and has a maximum length of 250');
            this._organization = organization;

            this._resource = "provision/organizations/" + this._organization + "/entities/devices";

            return this;
        }

        /**
         * Sets the channel attribute
         * @param {string} channel 
         * @return {Devices}
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
         * @return {Devices}
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
         * @return {Devices}
         */
    }, {
        key: 'withServiceGroup',
        value: function withServiceGroup(serviceGroup) {
            if (typeof serviceGroup !== 'string' || serviceGroup.length > 250) throw new Error('Parameter serviceGroup must be a string and has a maximum length of 250');
            this._serviceGroup = serviceGroup;
            return this;
        }

        /***************************!ADMINISTRACION************************************/

        /**
         * Sets the entityKey attribute
         * @param {string} entityKey 
         * @return {Devices}
         */
    }, {
        key: 'withEntityKey',
        value: function withEntityKey(entityKey) {
            if (typeof entityKey !== 'string' || entityKey.length > 200) throw new Error('Parameter entityKey must be a string and has a maximum length of 200');
            this._entityKey = entityKey;
            return this;
        }

        /**
         * Sets the serialNumber attribute
         * @param {string} serialNumber 
         * @return {Devices}
         */
    }, {
        key: 'withSerialNumber',
        value: function withSerialNumber(serialNumber) {
            if (typeof serialNumber !== 'string' || serialNumber.length > 200) throw new Error('Parameter serialNumber must be a string and has a maximum length of 200');
            this._serialNumber = serialNumber;
            return this;
        }

        /**
         * Sets the trustedBoot attribute
         * @param {string} trustedBoot 
         * @return {Devices}
         */
    }, {
        key: 'withTrustedBoot',
        value: function withTrustedBoot(trustedBoot) {
            if (typeof trustedBoot !== 'string') throw new Error('Parameter trustedBoot must be a string');
            this._trustedBoot = trustedBoot;
            return this;
        }

        /**
         * Set the hardware attribute
         * @param {string} hardware 
         * @return {Devices}
         */
    }, {
        key: 'withHardware',
        value: function withHardware(hardware) {
            if (typeof hardware !== 'string') throw new Error('Parameter hardware must be a string');
            this._hardware = hardware;
            return this;
        }

        /**
         * Set the software attribute
         * @param {string} software 
         * @return {Devices}
         */
    }, {
        key: 'withSoftware',
        value: function withSoftware(software) {
            if (typeof software !== 'string') throw new Error('Parameter software must be a string');

            if (this._software === undefined) {
                this._software = [];
            }
            this._software.push(software);
            return this;
        }

        /**
         * The request will have a specific time out if it will be exceeded then the promise throw an exception
         * @param {number} ms - timeout in milliseconds    
         * @return {Devices} 
         */
    }, {
        key: 'withTimeout',
        value: function withTimeout(ms) {
            if (typeof ms !== "number") throw new Error('Parameter ms must be a number');
            this._timeout = ms;
            return this;
        }

        /**
         * Set the certificate attribute
         * @param {Array} certificates 
         * @return {Devices}
         */
    }, {
        key: 'withCertificate',
        value: function withCertificate(certificates) {
            if (typeof certificates === "string") {
                if (certificates.length < 2 || certificates.length > 50) throw new Error('Parameter certificate must be a string and has a maximum length of 50');
            } else if (typeof certificates === "object" && certificates.constructor === Array) {
                certificates.forEach(function (cert) {
                    if (cert.length < 2 || cert.length > 50) throw new Error('Parameter certificate must be a string and has a maximum length of 50');
                });
            } else {
                throw new Error('Parameter certificate must be a array of string or a string and it must has a maximum length of 50');
            }

            if (typeof certificates === "string") {
                this._certificate = [certificates];
            } else {
                this._certificate = certificates;
            }

            return this;
        }

        /**
         * Sets the location attribute
         * @param {number} longitude
         * @param {number} latitude
         * @param {string} timestamp
         * @return {Devices}
         */
    }, {
        key: 'withLocation',
        value: function withLocation(longitude, latitude, timestamp) {
            if (typeof longitude !== 'number' || typeof latitude !== 'number') throw new Error('Parameter longitude/latitude must be a number');

            if (timestamp) {
                var finalDate = (0, _moment2['default'])(timestamp);

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
         * @return {Devices}
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
         * Sets the feed attribute
         * @param {string} defaultFeed 
         * @return {Devices}
         */
    }, {
        key: 'withDefaultFeed',
        value: function withDefaultFeed(defaultFeed) {
            if (typeof defaultFeed !== 'string') throw new Error('Parameter defaultFeed must be a string');
            this._defaultFeed = defaultFeed;
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            var deviceData = {
                "device": {
                    "id": this._entityKey,
                    "provision": {
                        "customId": [this._entityKey],
                        "template": "default",
                        "type": this._type,
                        "specificType": this._specificType !== undefined ? [this._specificType] : undefined,
                        "name": this._name !== undefined ? [this._name] : undefined,
                        "defaultFeed": this._defaultFeed !== undefined ? this._defaultFeed : undefined,
                        "description": this._description !== undefined ? [this._description] : undefined,
                        "admin": {
                            "organization": this._organization,
                            "channel": this._channel !== undefined ? this._channel : "default_channel",
                            "administrativeState": this._administrativeState !== undefined ? this._administrativeState : undefined,
                            "serviceGroup": this._serviceGroup !== undefined ? this._serviceGroup : "emptyServiceGroup"
                        },
                        "serialNumber": this._serialNumber !== undefined ? [this._serialNumber] : undefined,
                        "trustedBoot": this._trustedBoot !== undefined ? this._trustedBoot : undefined,
                        "operationalStatus": this._operationalStatus !== undefined ? [this._operationalStatus] : undefined,
                        "hardware": this._hardware !== undefined ? [this._hardware] : undefined,
                        "software": this._software !== undefined ? this._software : undefined,
                        "certificates": this._certificate !== undefined ? this._certificate : undefined,
                        "location": this._location !== undefined ? [this._location] : undefined
                    }
                }
            };
            return deviceData;
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            if (this._organization === undefined || this._entityKey === undefined) {
                throw new Error('Parameters organization, entityKey must be defined');
            }
            this._resource = "provision/organizations/" + this._organization + "/entities/devices";
            var url = this._resource + "/" + this._entityKey;
            return url;
        }

        /**
         * Create a device
         *
         * @example
         *  ogapi.devicesBuilder().create()
         * @return {Devices} 
         */
    }, {
        key: 'create',
        value: function create() {
            var _this2 = this;

            var _this = this;
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._validate()['catch'](function (err2) {
                var error = undefined;
                if (err2.data) {
                    error = { "errors": err2.data, "statusCode": 400 };
                } else if (err2.errors) {
                    error = { "errors": err2.errors, "statusCode": 400 };
                } else {
                    error = { "errors": err2, "statusCode": 400 };
                }
                defered.reject(error);
                throw new Error(error);
            }).done(function (prevOk) {
                _get(Object.getPrototypeOf(Devices.prototype), 'create', _this2).call(_this2).then(function (res) {
                    defered.resolve({ data: res.data, statusCode: res.statusCode });
                })['catch'](function (err) {
                    defered.reject(err);
                });
            }, function (err) {});
            return promise;
        }
    }, {
        key: '_validate',
        value: function _validate() {
            var _this3 = this;

            var _this = this;
            this._checkRequiredParameters();
            var previousValidations = [];

            if (this._administrativeState) {
                var administrativeStateBuilder = this._ogapi.administrativeStateSearchBuilder().withEntityType(this._type.toUpperCase()).withId(this._administrativeState).build();

                previousValidations.push(administrativeStateBuilder.execute().then(function (okh) {
                    if (okh.statusCode === 204) {
                        throw new Error("Administrative State not found");
                    }
                }));
            }

            if (this._specificType) {
                var specificTypeBuilder = this._ogapi.specificTypeSearchBuilder().withEntityType(this._type.toUpperCase()).withId(this._specificType).build();

                previousValidations.push(specificTypeBuilder.execute().then(function (okh) {
                    if (okh.statusCode === 204) {
                        throw new Error("Specific Type not found");
                    }
                }));
            }

            if (this._operationalStatus) {
                var operationalStatusBuilder = this._ogapi.operationalStatusSearchBuilder().withEntityType(this._type.toUpperCase()).withId(this._operationalStatus).build();
                previousValidations.push(operationalStatusBuilder.execute().then(function (okh) {
                    if (okh.statusCode === 204) {
                        throw new Error("Operational Status not found");
                    }
                }));
            }

            if (this._hardware) {
                var hardwareBuilder = this._ogapi.hardwaresSearchBuilder().withId(this._hardware).build();
                previousValidations.push(hardwareBuilder.execute().then(function (okh) {
                    if (okh.statusCode === 204) {
                        throw new Error("Hardware not found");
                    }
                }));
            }

            if (this._software) {
                var _loop = function (softIdTmp) {
                    var softwareId = _this3._software[softIdTmp];
                    var softwareBuilder = _this3._ogapi.softwaresSearchBuilder().withId(softwareId).build();
                    previousValidations.push(softwareBuilder.execute().then(function (okh) {
                        if (okh.statusCode === 204) {
                            throw new Error("Software " + softwareId + " not found");
                        }
                    }));
                };

                for (var softIdTmp in this._software) {
                    _loop(softIdTmp);
                }
            }

            if (this._certificate) {
                var _loop2 = function (certIdTmp) {
                    var certificateId = _this3._certificate[certIdTmp];
                    var certificateFinder = _this3._ogapi.newCertificateFinder();
                    previousValidations.push(certificateFinder.findById(certificateId).then(function (okh) {
                        if (okh[1] === 204) {
                            throw new Error("Certificate " + certificateId + " not found");
                        }
                    }));
                };

                for (var certIdTmp in this._certificate) {
                    _loop2(certIdTmp);
                }
            }
            // validación de canal y organizacion
            var channelFinder = this._ogapi.newChannelFinder();
            previousValidations.push(channelFinder.findByOrganizationAndName(this._organization, this._channel).then(function (okh) {
                if (okh.statusCode === 204) {
                    throw new Error("Organization and channel combination not found");
                }
            }));

            // validación de dispositivo
            var entityKey = this._entityKey;
            var deviceFinder = this._ogapi.newDeviceFinder().findByOrganizationAndId(this._organization, entityKey);
            previousValidations.push(deviceFinder.then(function (okh) {
                throw new Error("Device " + entityKey + " already exists");
            })['catch'](function (devErr) {
                if (!devErr.statusCode || devErr.statusCode && devErr.statusCode !== _httpStatusCodes2['default'].NOT_FOUND) {
                    throw new Error("Device " + entityKey + " already exists");
                }
            }));

            return _q2['default'].all(previousValidations);
        }

        /* fields validations */
    }, {
        key: '_checkType',
        value: function _checkType(type) {
            type = type.toLowerCase();
            var not_found = [];
            var found = _TYPE_ENUM.TYPE_ENUM.find(function (type) {
                return type == this;
            }, type);

            if (typeof found === "undefined") {
                not_found.push(type);
            }
            if (not_found.length !== 0) {
                throw new Error("Parameter type value not allowed <'" + JSON.stringify(not_found) + "'>, allowed <'" + JSON.stringify(_TYPE_ENUM.TYPE_ENUM) + "'>");
            }
            return type;
        }
    }]);

    return Devices;
})(_provisionBaseProvision2['default']);

exports['default'] = Devices;
module.exports = exports['default'];
//# sourceMappingURL=Devices.js.map
