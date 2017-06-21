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

var _provisionBaseProvision = require('../../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

/**
 * This is a base object that contains all you can do about CommunicationsModules.
 */

var CommunicationsModules = (function (_BaseProvision) {
    _inherits(CommunicationsModules, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function CommunicationsModules(ogapi) {
        _classCallCheck(this, CommunicationsModules);

        _get(Object.getPrototypeOf(CommunicationsModules.prototype), 'constructor', this).call(this, ogapi, "/organizations/", undefined, ["organization", "entityKey"]);
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {CommunicationsModules}
     */

    _createClass(CommunicationsModules, [{
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string' || name.length > 50) throw new Error('Parameter name must be a string and has a maximum length of 50');
            this._name = name;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description 
         * @return {CommunicationsModules}
         */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
            if (typeof description !== 'string' || description.length > 250) throw new Error('Parameter description must be a string and has a maximum length of 250');
            this._description = description;
            return this;
        }

        /**
         * Set the imei attribute
         * @param {string} imei 
         * @return {CommunicationsModules}
         */
    }, {
        key: 'withImei',
        value: function withImei(imei) {
            if (typeof imei !== 'string' || imei.length > 250) throw new Error('Parameter imei must be a string and has a maximum length of 250');
            this._imei = imei;
            return this;
        }

        /**
         * Set the mac attribute
         * @param {string} mac 
         * @return {CommunicationsModules}
         */
    }, {
        key: 'withMac',
        value: function withMac(mac) {
            if (typeof mac !== 'string' || mac.length > 250) throw new Error('Parameter mac must be a string and has a maximum length of 250');
            this._mac = mac;
            return this;
        }

        /**
         * Set the specific type attribute
         * @param {string} specificType 
         * @return {CommunicationsModules}
         */
    }, {
        key: 'withSpecificType',
        value: function withSpecificType(specificType) {
            if (typeof specificType !== 'string' || specificType.length > 50) throw new Error('Parameter specificType must be a string and has a maximum length of 50');
            this._specificType = specificType;
            return this;
        }

        /**
         * Set the operationalStatus attribute
         * @param {string} operationalStatus 
         * @return {CommunicationsModules}
         */
    }, {
        key: 'withOperationalStatus',
        value: function withOperationalStatus(operationalStatus) {
            if (typeof operationalStatus !== 'string' || operationalStatus.length > 50) throw new Error('Parameter operationalStatus must be a string and has a maximum length of 50');
            this._operationalStatus = operationalStatus;
            return this;
        }

        /***************************ADMINISTRACION************************************/
        /**
         * Sets the organization attribute
         * @param {string} organization 
         * @return {CommunicationsModules}
         */
    }, {
        key: 'withOrganization',
        value: function withOrganization(organization) {
            if (typeof organization !== 'string' || organization.length > 250) throw new Error('Parameter organization must be a string and has a maximum length of 250');
            this._organization = organization;
            this._resource = "provision/organizations/" + this._organization + "/entities/communicationsModules";
            return this;
        }

        /**
         * Sets the channel attribute
         * @param {string} channel 
         * @return {CommunicationsModules}
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
         * @return {CommunicationsModules}
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
         * @return {CommunicationsModules}
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
         * @return {CommunicationsModules}
         */
    }, {
        key: 'withEntityKey',
        value: function withEntityKey(entityKey) {
            if (typeof entityKey !== 'string' || entityKey.length > 200) throw new Error('Parameter entityKey must be a string and has a maximum length of 200');
            this._entityKey = entityKey;
            return this;
        }

        /**
         * Set the hardware attribute
         * @param {string} hardware 
         * @return {CommunicationsModules}
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
         * @return {CommunicationsModules}
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
         * @return {CommunicationsModules} 
         */
    }, {
        key: 'withTimeout',
        value: function withTimeout(ms) {
            if (typeof ms !== "number") throw new Error('Parameter ms must be a number');
            this._timeout = ms;
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            var deviceData = {
                "communicationsModule": {
                    "id": this._entityKey,
                    "provision": {
                        "customId": [this._entityKey],
                        "template": "default",
                        "specificType": this._specificType !== undefined ? [this._specificType] : undefined,
                        "name": this._name !== undefined ? [this._name] : undefined,
                        "description": this._description !== undefined ? [this._description] : undefined,
                        "admin": {
                            "organization": this._organization,
                            "channel": this._channel !== undefined ? this._channel : "default_channel",
                            "administrativeState": this._administrativeState !== undefined ? this._administrativeState : undefined,
                            "serviceGroup": this._serviceGroup !== undefined ? this._serviceGroup : "emptyServiceGroup"
                        },
                        "operationalStatus": this._operationalStatus !== undefined ? [this._operationalStatus] : undefined,
                        "hardware": this._hardware !== undefined ? [this._hardware] : undefined,
                        "software": this._software !== undefined ? this._software : undefined,
                        "imei": this._imei !== undefined ? [this._imei] : undefined,
                        "mac": this._mac !== undefined ? [this._mac] : undefined
                    }
                }
            };
            return deviceData;
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            var organization = this._organization;
            if (organization === undefined || this._entityKey === undefined) {
                throw new Error('Parameters organization and entityKey must be defined');
            }
            this._resource = "provision/organizations/" + organization + "/entities/communicationsModules";
            var url = this._resource + "/" + this._entityKey;
            return url;
        }

        /**
         * Create the communications module
         *
         * @example
         *  ogapi.communicationsModuleBuilder().deployAndActivate()
         * @return {CommunicationsModule} 
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
                _get(Object.getPrototypeOf(CommunicationsModules.prototype), 'create', _this).call(_this).then(function (res) {
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
            var _this2 = this;

            this._checkRequiredParameters();
            var previousValidations = [];

            if (this._administrativeState) {
                var administrativeStateBuilder = this._ogapi.administrativeStateSearchBuilder().withEntityType("COMMUNICATIONS_MODULE").withId(this._administrativeState).build();
                previousValidations.push(administrativeStateBuilder.execute().then(function (okh) {
                    if (okh.statusCode === 204) {
                        throw new Error("Administrative State not found");
                    }
                }));
            }

            if (this._specificType) {
                var specificTypeBuilder = this._ogapi.specificTypeSearchBuilder().withEntityType("COMMUNICATIONS_MODULE").withId(this._specificType).build();

                previousValidations.push(specificTypeBuilder.execute().then(function (okh) {
                    if (okh.statusCode === 204) {
                        throw new Error("Specific Type not found");
                    }
                }));
            }

            if (this._operationalStatus) {
                var operationalStatusBuilder = this._ogapi.operationalStatusSearchBuilder().withEntityType("COMMUNICATIONS_MODULE").withId(this._operationalStatus).build();
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
                    var softwareId = _this2._software[softIdTmp];
                    var softwareBuilder = _this2._ogapi.softwaresSearchBuilder().withId(softwareId).build();
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
            return _q2['default'].all(previousValidations);
        }
    }]);

    return CommunicationsModules;
})(_provisionBaseProvision2['default']);

exports['default'] = CommunicationsModules;
module.exports = exports['default'];
//# sourceMappingURL=CommunicationsModules.js.map
