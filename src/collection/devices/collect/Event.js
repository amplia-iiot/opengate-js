'use strict';

import q from 'q';
import Hardware from './Hardware';
import Software from './Software';
import Usage from './Usage';
import Storage from './Storage';
import PowerSupply from './PowerSupply';
import CommsModuleMessage from './CommsModuleMessage';
import {
    TEMPERATURE_STATUS_ENUM
} from './enum/TEMPERATURE_STATUS_ENUM';
import {
    LEVEL_TREND_ENUM
} from './enum/LEVEL_TREND_ENUM';

/**
 * This is a base object that allows the user to create a Event.
 */
export default class Event {

    constructor(ogapi) {
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
        this._upTime = undefined;
        this._communicationsModulesList = [];
    }




    /**
     * Set the id attribute
     * @param {string} id - optionals field
     * @return {Event}
     */
    withEventId(id) {
        if (typeof id !== 'string')
            throw new Error({
                message: "OGAPI_STRING_PARAMETER",
                parameter: 'EventId'
            });
        this._event_id = id;
        return this;
    }

    /**
     * Set the deviceId attribute
     * @param {string} deviceId - optionals field
     * @return {Event}
     */
    withDeviceId(deviceId) {
        if (typeof deviceId !== 'string')
            throw new Error('deviceId cannot be empty');
        this._deviceId = deviceId;
        return this;
    }

    /**
     * Set the path attribute
     * @param {string} path - optionals field
     * @return {Event}
     */
    withPath(path) {
        if (path.constructor !== Array || path.length === 0)
            throw new Error('Parameter path must be an Array and cannot be empty');
        this._path = path;
        return this;
    }

    /**
     * Set the name attribute
     * @param {string} name - optionals field
     * @return {Event}
     */
    withEventName(name) {
        if (typeof name !== 'string' || name.length === 0)
            throw new Error('Parameter name must be String type and cannot be empty');
        this._name = name;
        return this;
    }

    /**
     * Set the description attribute
     * @param {string} description - optionals field
     * @return {Event}
     */
    withEventDescription(description) {
        if (typeof description !== 'string' || description.length === 0)
            throw new Error('Parameter description must be String type and cannot be empty');
        this._description = description;
        return this;
    }

    /**
     * Set the hardware attribute
     * @param {Hardware} hardware - optionals field
     * @return {Event}
     */
    withHardware(hardware) {
        if (!(hardware instanceof Hardware)) {
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
    withOperationalStatus(operationalStatus) {

        let operationalStatusBuilder = this._ogapi.operationalStatusSearchBuilder()
            .withEntityType("ASSET").withId(operationalStatus).build();

        operationalStatusBuilder.execute().then(
            function (res) {
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
    withSoftware(software) {
        if (!(software instanceof Software)) {
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
    withDateLocation(date) {
        if (typeof date !== 'string' || date.length === 0)
            throw new Error('Parameter date must be String type and cannot be empty');
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
    withLatitude(latitude) {
        if (typeof latitude !== 'number' || latitude.length === 0)
            throw new Error('Parameter latitude must be number type and cannot be empty');
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
    withLongitude(longitude) {
        if (typeof longitude !== 'number' || longitude.length === 0)
            throw new Error('Parameter longitude must be number type and cannot be empty');
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
    withCurrentTemperature(currentTemperature) {
        if (typeof currentTemperature !== 'string' || currentTemperature.length === 0)
            throw new Error('Parameter currentTemperature must be string type and cannot be empty');
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
    withUnitTemperature(unitTemperature) {
        if (typeof unitTemperature !== 'string' || unitTemperature.length === 0)
            throw new Error('Parameter unitTemperature must be string type and cannot be empty');
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
    withStatusTemperature(unitTemperature) {
        if (typeof unitTemperature !== 'string' || unitTemperature.length === 0)
            throw new Error('Parameter unitTemperature must be string type and cannot be empty');
        if (this._temperature === undefined) {
            this._temperature = {};
        }
        this._temperature.status = this._checkValues(unitTemperature, TEMPERATURE_STATUS_ENUM);;
        return this;
    }

    /**
     * Set the unitTemperature attribute
     * @param {string} unitTemperature - optionals field
     * @return {Event}
     */
    withTrendTemperature(unitTemperature) {
        if (typeof unitTemperature !== 'string' || unitTemperature.length === 0)
            throw new Error('Parameter unitTemperature must be string type and cannot be empty');
        if (this._temperature === undefined) {
            this._temperature = {};
        }
        this._temperature.trend = this._checkValues(unitTemperature, LEVEL_TREND_ENUM);
        return this;
    }

    /**
     * Set the average attribute
     * @param {string} averageTemperature - optionals field
     * @return {Event}
     */
    withTemperatureAverage(averageTemperature) {
        if (typeof averageTemperature !== 'string' || averageTemperature.length === 0)
            throw new Error('Parameter averageTemperature must be string type and cannot be empty');
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
    withMinimumTemperature(minimumTemperature) {
        if (typeof minimumTemperature !== 'string' || minimumTemperature.length === 0)
            throw new Error('Parameter minimumTemperature must be string type and cannot be empty');
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
    withMaximumTemperature(maximumTemperature) {
        if (typeof maximumTemperature !== 'string' || maximumTemperature.length === 0)
            throw new Error('Parameter maximumTemperature must be string type and cannot be empty');
        if (this._temperature === undefined) {
            this._temperature = {};
        }
        this._temperature.maximum = maximumTemperature;
        return this;
    }

    /**
     * Set the cpuUsage attribute
     * @return {Event}
     */
    withCpuUsage(cpuUsage) {
        if (!(cpuUsage instanceof Usage)) {
            throw new Error('Parameter cpuUsage must be Usage type');
        }
        this._cpuUsage = cpuUsage;
        return this;
    }


    /**
     * Set the Ram attribute
     * @return {Event}
     */
    withRam(ram) {
        if (!(ram instanceof Storage)) {
            throw new Error('Parameter ram must be Storage type');
        }
        this._ram = ram;
        return this;
    }



    /**
     * Set the volatilStorage attribute
     * @return {Event}
     */
    withVolatilStorage(volatilStorage) {
        if (!(volatilStorage instanceof Storage)) {
            throw new Error('Parameter volatilStorage must be Storage type');
        }
        this._volatilStorage = volatilStorage;
        return this;
    }

    /**
     * Set the nonVolatilStorage attribute
     * @return {Event}
     */
    withNonVolatilStorage(nonVolatilStorage) {
        if (!(nonVolatilStorage instanceof Storage)) {
            throw new Error('Parameter nonVolatilStorage must be Storage type');
        }
        this._nonVolatilStorage = nonVolatilStorage;
        return this;
    }

    /**
     * Set the powerSupply attribute
     * @return {Event}
     */
    withPowerSupply(powerSupply) {
        if (!(powerSupply instanceof PowerSupply)) {
            throw new Error('Parameter powerSupply must be PowerSupply type');
        }
        this._powerSupply = powerSupply;
        return this;
    }

    /**
     * Set the powerSupply attribute
     * @return {Event}
     */
    withCommsModule(communicationsModules) {
        if (!(communicationsModules instanceof CommsModuleMessage)) {
            throw new Error('Parameter communicationsModules must be CommsModuleMessage type');
        }
        this._communicationsModulesList.push(communicationsModules.composeElement());
        return this;

    }

    /**
     * Set the upTime  attribute
     * @param {number} upTime  
     * @return {Event}
     */
    withUpTime(upTime) {
        if (typeof upTime !== 'number' || upTime.length === 0)
            throw new Error('Parameter upTime must be number type and cannot be empty');
        this._upTime = upTime;
        return this;
    }

    _checkValues(value, enumName) {
        let not_found = [];
        let found = enumName.find(function (value) {
            return value == this;
        }, value);

        if (typeof found === "undefined") {
            not_found.push(value);
        }
        if (not_found.length !== 0) {
            console.warn("Parameter value not allowed <'" + JSON.stringify(not_found) + "'>, allowed <'" + JSON.stringify(enumName) + "'>")
        }
        return value;
    }



    composeElement() {

        var event = {
            'id': this._event_id,
            'device': {
                'id': this._deviceId,
                'path': this._path,
                'name': this._name,
                'description': this._description,
                'operationalStatus': this._operationalStatus
            }
        }
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
        if (this._upTime !== undefined) {
            event.device.upTime = this._upTime;
        }

        return event;
    }




}