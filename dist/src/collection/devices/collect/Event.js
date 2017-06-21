'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _Hardware = require('./Hardware');

var _Hardware2 = _interopRequireDefault(_Hardware);

var _Software = require('./Software');

var _Software2 = _interopRequireDefault(_Software);

var _Usage = require('./Usage');

var _Usage2 = _interopRequireDefault(_Usage);

var _Storage = require('./Storage');

var _Storage2 = _interopRequireDefault(_Storage);

var _PowerSupply = require('./PowerSupply');

var _PowerSupply2 = _interopRequireDefault(_PowerSupply);

var _CommsModuleMessage = require('./CommsModuleMessage');

var _CommsModuleMessage2 = _interopRequireDefault(_CommsModuleMessage);

var _enumTEMPERATURE_STATUS_ENUM = require('./enum/TEMPERATURE_STATUS_ENUM');

var _enumLEVEL_TREND_ENUM = require('./enum/LEVEL_TREND_ENUM');

/**
 * This is a base object that allows the user to create a Event.
 */

var Event = (function () {
    function Event(ogapi) {
        _classCallCheck(this, Event);

        this._ogapi = ogapi;
        this._event_id = undefined;
        this._deviceId = undefined;
        this._path = undefined;
        this._name = undefined;
        this._description = undefined;
        this._hardware = undefined;
        this._operationalStatus = undefined;
        this._softwareList = [];
        this._location = undefined;
        this._temperature = undefined;
        this._cpuUsage = undefined;
        this._ram = undefined;
        this._volatilStorage = undefined;
        this._nonVolatilStorage = undefined;
        this._powerSupply = undefined;
        this._communicationsModulesList = [];
    }

    /**
     * Set the id attribute
     * @param {string} id - optionals field
     * @return {Event}
     */

    _createClass(Event, [{
        key: 'withEventId',
        value: function withEventId(id) {
            if (typeof id !== 'string') throw new Error('Parameter id must be a string and has a maximum length of ');
            this._event_id = id;
            return this;
        }

        /**
         * Set the deviceId attribute
         * @param {string} deviceId - optionals field
         * @return {Event}
         */
    }, {
        key: 'withDeviceId',
        value: function withDeviceId(deviceId) {
            if (typeof deviceId !== 'string') throw new Error('deviceId cannot be empty');
            this._deviceId = deviceId;
            return this;
        }

        /**
         * Set the path attribute
         * @param {string} path - optionals field
         * @return {Event}
         */
    }, {
        key: 'withPath',
        value: function withPath(path) {
            if (path.constructor !== Array || path.length === 0) throw new Error('Parameter path must be an Array and cannot be empty');
            this._path = path;
            return this;
        }

        /**
         * Set the name attribute
         * @param {string} name - optionals field
         * @return {Event}
         */
    }, {
        key: 'withEventName',
        value: function withEventName(name) {
            if (typeof name !== 'string' || name.length === 0) throw new Error('Parameter name must be String type and cannot be empty');
            this._name = name;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description - optionals field
         * @return {Event}
         */
    }, {
        key: 'withEventDescription',
        value: function withEventDescription(description) {
            if (typeof description !== 'string' || description.length === 0) throw new Error('Parameter description must be String type and cannot be empty');
            this._description = description;
            return this;
        }

        /**
         * Set the hardware attribute
         * @param {Hardware} hardware - optionals field
         * @return {Event}
         */
    }, {
        key: 'withHardware',
        value: function withHardware(hardware) {
            if (!(hardware instanceof _Hardware2['default'])) {
                throw new Error('Parameter hardware must be Hardware type');
            }
            this._hardware = hardware;
            return this;
        }

        /**
         * Set the operationalStatus attribute
         * @param {string} operationalStatus 
         * @return {Event}
         */
    }, {
        key: 'withOperationalStatus',
        value: function withOperationalStatus(operationalStatus) {

            var operationalStatusBuilder = this._ogapi.operationalStatusSearchBuilder().withEntityType("ASSET").withId(operationalStatus).build();

            operationalStatusBuilder.execute().then(function (res) {
                if (res.statusCode === 204) {
                    throw new Error("Operational Status not found");
                }
            });

            this._operationalStatus = operationalStatus;

            return this;
        }

        /**
         * Set the software attribute
         * @param {software} software - optionals field
         * @return {Event}
         */
    }, {
        key: 'withSoftware',
        value: function withSoftware(software) {
            if (!(software instanceof _Software2['default'])) {
                throw new Error('Parameter software must be software type');
            }
            this._softwareList.push(software.composeElement());
            /*var software =  new Software();
            software.withName(name);
            software.withType(type);
            software.withVersion(version);
            software.withDate(date);
            if(this._softwareList === undefined)
                this._softwareList = [];
            this._softwareList.push(software.composeElement());*/
            return this;
        }

        /**
         * Set the date attribute
         * @param {string} date - optionals field
         * @return {Event}
         */
    }, {
        key: 'withDateLocation',
        value: function withDateLocation(date) {
            if (typeof date !== 'string' || date.length === 0) throw new Error('Parameter date must be String type and cannot be empty');
            if (this._location === undefined) {
                this._location = {
                    "coordinates": {}
                };
            }
            this._location.timestamp = date;
            return this;
        }

        /**
         * Set the latitude attribute
         * @param {number} latitude - optionals field
         * @return {Event}
         */
    }, {
        key: 'withLatitude',
        value: function withLatitude(latitude) {
            if (typeof latitude !== 'number' || latitude.length === 0) throw new Error('Parameter latitude must be number type and cannot be empty');
            if (this._location === undefined) {
                this._location = {
                    "coordinates": {}
                };
            }
            this._location.coordinates.latitude = latitude;
            return this;
        }

        /**
         * Set the longitude attribute
         * @param {number} longitude - optionals field
         * @return {Event}
         */
    }, {
        key: 'withLongitude',
        value: function withLongitude(longitude) {
            if (typeof longitude !== 'number' || longitude.length === 0) throw new Error('Parameter longitude must be number type and cannot be empty');
            if (this._location === undefined) {
                this._location = {
                    "coordinates": {}
                };
            }
            this._location.coordinates.longitude = longitude;
            return this;
        }

        /**
         * Set the currentTemperature attribute
         * @param {string} currentTemperature - optionals field
         * @return {Event}
         */
    }, {
        key: 'withCurrentTemperature',
        value: function withCurrentTemperature(currentTemperature) {
            if (typeof currentTemperature !== 'string' || currentTemperature.length === 0) throw new Error('Parameter currentTemperature must be string type and cannot be empty');
            if (this._temperature === undefined) {
                this._temperature = {};
            }
            this._temperature.current = currentTemperature;
            return this;
        }

        /**
         * Set the unitTemperature attribute
         * @param {string} unitTemperature - optionals field
         * @return {Event}
         */
    }, {
        key: 'withUnitTemperature',
        value: function withUnitTemperature(unitTemperature) {
            if (typeof unitTemperature !== 'string' || unitTemperature.length === 0) throw new Error('Parameter unitTemperature must be string type and cannot be empty');
            if (this._temperature === undefined) {
                this._temperature = {};
            }
            this._temperature.unit = unitTemperature;
            return this;
        }

        /**
         * Set the unitTemperature attribute
         * @param {string} unitTemperature - optionals field
         * @return {Event}
         */
    }, {
        key: 'withStatusTemperature',
        value: function withStatusTemperature(unitTemperature) {
            if (typeof unitTemperature !== 'string' || unitTemperature.length === 0) throw new Error('Parameter unitTemperature must be string type and cannot be empty');
            if (this._temperature === undefined) {
                this._temperature = {};
            }
            this._temperature.status = this._checkValues(unitTemperature, _enumTEMPERATURE_STATUS_ENUM.TEMPERATURE_STATUS_ENUM);;
            return this;
        }

        /**
         * Set the unitTemperature attribute
         * @param {string} unitTemperature - optionals field
         * @return {Event}
         */
    }, {
        key: 'withTrendTemperature',
        value: function withTrendTemperature(unitTemperature) {
            if (typeof unitTemperature !== 'string' || unitTemperature.length === 0) throw new Error('Parameter unitTemperature must be string type and cannot be empty');
            if (this._temperature === undefined) {
                this._temperature = {};
            }
            this._temperature.trend = this._checkValues(unitTemperature, _enumLEVEL_TREND_ENUM.LEVEL_TREND_ENUM);
            return this;
        }

        /**
         * Set the average attribute
         * @param {string} averageTemperature - optionals field
         * @return {Event}
         */
    }, {
        key: 'withTemperatureAverage',
        value: function withTemperatureAverage(averageTemperature) {
            if (typeof averageTemperature !== 'string' || averageTemperature.length === 0) throw new Error('Parameter averageTemperature must be string type and cannot be empty');
            if (this._temperature === undefined) {
                this._temperature = {};
            }
            this._temperature.average = averageTemperature;
            return this;
        }

        /**
         * Set the minimum attribute
         * @param {string} minimumTemperature - optionals field
         * @return {Event}
         */
    }, {
        key: 'withMinimumTemperature',
        value: function withMinimumTemperature(minimumTemperature) {
            if (typeof minimumTemperature !== 'string' || minimumTemperature.length === 0) throw new Error('Parameter minimumTemperature must be string type and cannot be empty');
            if (this._temperature === undefined) {
                this._temperature = {};
            }
            this._temperature.minimum = minimumTemperature;
            return this;
        }

        /**
         * Set the maximum attribute
         * @param {string} maximumTemperature - optionals field
         * @return {Event}
         */
    }, {
        key: 'withMaximumTemperature',
        value: function withMaximumTemperature(maximumTemperature) {
            if (typeof maximumTemperature !== 'string' || maximumTemperature.length === 0) throw new Error('Parameter maximumTemperature must be string type and cannot be empty');
            if (this._temperature === undefined) {
                this._temperature = {};
            }
            this._temperature.maximum = maximumTemperature;
            return this;
        }

        /**
         * Set the cpuUsage attribute
         * @return {Usage}
         */
    }, {
        key: 'withCpuUsage',
        value: function withCpuUsage(cpuUsage) {
            if (!(cpuUsage instanceof _Usage2['default'])) {
                throw new Error('Parameter cpuUsage must be Usage type');
            }
            this._cpuUsage = cpuUsage;
            return this;
        }

        /**
         * Set the Ram attribute
         * @return {Storage}
         */
    }, {
        key: 'withRam',
        value: function withRam(ram) {
            if (!(ram instanceof _Storage2['default'])) {
                throw new Error('Parameter ram must be Storage type');
            }
            this._ram = ram;
            return this;
        }

        /**
         * Set the volatilStorage attribute
         * @return {Storage}
         */
    }, {
        key: 'withVolatilStorage',
        value: function withVolatilStorage(volatilStorage) {
            if (!(volatilStorage instanceof _Storage2['default'])) {
                throw new Error('Parameter volatilStorage must be Storage type');
            }
            this._volatilStorage = volatilStorage;
            return this;
        }

        /**
         * Set the nonVolatilStorage attribute
         * @return {Storage}
         */
    }, {
        key: 'withNonVolatilStorage',
        value: function withNonVolatilStorage(nonVolatilStorage) {
            if (!(nonVolatilStorage instanceof _Storage2['default'])) {
                throw new Error('Parameter nonVolatilStorage must be Storage type');
            }
            this._nonVolatilStorage = nonVolatilStorage;
            return this;
        }

        /**
         * Set the powerSupply attribute
         * @return {Storage}
         */
    }, {
        key: 'withPowerSupply',
        value: function withPowerSupply(powerSupply) {
            if (!(powerSupply instanceof _PowerSupply2['default'])) {
                throw new Error('Parameter powerSupply must be PowerSupply type');
            }
            this._powerSupply = powerSupply;
            return this;
        }

        /**
         * Set the powerSupply attribute
         * @return {Storage}
         */
    }, {
        key: 'withCommsModule',
        value: function withCommsModule(communicationsModules) {
            if (!(communicationsModules instanceof _CommsModuleMessage2['default'])) {
                throw new Error('Parameter communicationsModules must be CommsModuleMessage type');
            }
            this._communicationsModulesList.push(communicationsModules.composeElement());
            return this;
        }
    }, {
        key: '_checkValues',
        value: function _checkValues(value, enumName) {
            var not_found = [];
            var found = enumName.find(function (value) {
                return value == this;
            }, value);

            if (typeof found === "undefined") {
                not_found.push(value);
            }
            if (not_found.length !== 0) {
                console.warn("Parameter value not allowed <'" + JSON.stringify(not_found) + "'>, allowed <'" + JSON.stringify(enumName) + "'>");
            }
            return value;
        }
    }, {
        key: 'composeElement',
        value: function composeElement() {

            var event = {
                'id': this._event_id,
                'device': {
                    'id': this._deviceId,
                    'path': this._path,
                    'name': this._name,
                    'description': this._description,
                    'operationalStatus': this._operationalStatus
                }
            };
            if (this._hardware !== undefined) {
                event.device.hardware = this._hardware.composeElement();
            }
            if (this._softwareList.length > 0) {
                event.device.softwareList = this._softwareList;
            }
            if (this._location !== undefined) {
                event.device.location = this._location;
            }
            if (this._temperature !== undefined) {
                event.device.temperature = this._temperature;
            }
            if (this._cpuUsage !== undefined) {
                event.device.cpuUsage = this._cpuUsage.composeElement();
            }
            if (this._ram !== undefined) {
                event.device.ram = this._ram.composeElement();
            }
            if (this._volatilStorage !== undefined) {
                event.device.volatilStorage = this._volatilStorage.composeElement();
            }
            if (this._nonVolatilStorage !== undefined) {
                event.device.nonVolatilStorage = this._nonVolatilStorage.composeElement();
            }
            if (this._powerSupply !== undefined) {
                event.device.powerSupply = this._powerSupply.composeElement();
            }
            if (this._communicationsModulesList.length > 0) {
                event.device.communicationsModules = this._communicationsModulesList;
            }

            return event;
        }
    }]);

    return Event;
})();

exports['default'] = Event;
module.exports = exports['default'];
//# sourceMappingURL=Event.js.map
