'use strict';

import { TYPE_ENUM } from './TYPE_ENUM';

import q from 'q';
import moment from 'moment';
import HttpStatus from 'http-status-codes';

import BaseProvision from '../provision/BaseProvision'


/**
 * This is a base object that contains all you can do about Devices.
 */
export default class Devices extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/organizations/", undefined, ["organization", "type", "entityKey"]);
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Devices}
     */
    withName(name) {
        if (typeof name !== 'string' || name.length > 50)
            throw new Error('Parameter name must be a string and has a maximum length of 50');
        this._name = name;
        return this;
    }

    /**
     * Set the description attribute
     * @param {string} description 
     * @return {Devices}
     */
    withDescription(description) {
        if (typeof description !== 'string' || description.length > 250)
            throw new Error('Parameter description must be a string and has a maximum length of 250');
        this._description = description;
        return this;
    }

    /**
     * Set the type attribute
     * @param {string} type 
     * @return {Devices}
     */
    withType(type) {
        this._type = this._checkType(type);
        return this;
    }

    /**
     * Set the specific type attribute
     * @param {string} specificType 
     * @return {Devices}
     */
    withSpecificType(specificType) {
        this._specificType = specificType;
        return this;
    }

    /**
     * Set the operationalStatus attribute
     * @param {string} operationalStatus 
     * @return {Devices}
     */
    withOperationalStatus(operationalStatus) {
        this._operationalStatus = operationalStatus;
        return this;
    }

    /***************************ADMINISTRACION************************************/
    /**
     * Sets the organization attribute
     * @param {string} organization 
     * @return {Devices}
     */
    withOrganization(organization) {
        if (typeof organization !== 'string' || organization.length > 250)
            throw new Error('Parameter organization must be a string and has a maximum length of 250');
        this._organization = organization;

        this._resource = "provision/organizations/" + this._organization + "/entities/devices";

        return this;
    }

    /**
     * Sets the channel attribute
     * @param {string} channel 
     * @return {Devices}
     */
    withChannel(channel) {
        if (typeof channel !== 'string' || channel.length > 250)
            throw new Error('Parameter channel must be a string and has a maximum length of 250');
        this._channel = channel;
        return this;
    }

    /**
     * Sets the administrative state attribute
     * @param {string} administrativeState 
     * @return {Devices}
     */
    withAdministrativeState(administrativeState) {
        if (typeof administrativeState !== 'string' || administrativeState.length > 250)
            throw new Error('Parameter administrativeState must be a string and has a maximum length of 250');
        this._administrativeState = administrativeState;
        return this;
    }

    /**
     * Sets the serviceGroup attribute
     * @param {string} serviceGroup 
     * @return {Devices}
     */
    withServiceGroup(serviceGroup) {
        if (typeof serviceGroup !== 'string' || serviceGroup.length > 250)
            throw new Error('Parameter serviceGroup must be a string and has a maximum length of 250');
        this._serviceGroup = serviceGroup;
        return this;
    }

    /***************************!ADMINISTRACION************************************/

    /**
     * Sets the entityKey attribute
     * @param {string} entityKey 
     * @return {Devices}
     */
    withEntityKey(entityKey) {
        if (typeof entityKey !== 'string' || entityKey.length > 200)
            throw new Error('Parameter entityKey must be a string and has a maximum length of 200');
        this._entityKey = entityKey;
        return this;
    }

    /**
     * Sets the serialNumber attribute
     * @param {string} serialNumber 
     * @return {Devices}
     */
    withSerialNumber(serialNumber) {
        if (typeof serialNumber !== 'string' || serialNumber.length > 200)
            throw new Error('Parameter serialNumber must be a string and has a maximum length of 200');
        this._serialNumber = serialNumber;
        return this;
    }

    /**
     * Sets the trustedBoot attribute
     * @param {string} trustedBoot 
     * @return {Devices}
     */
    withTrustedBoot(trustedBoot) {
        if (typeof trustedBoot !== 'string')
            throw new Error('Parameter trustedBoot must be a string');
        this._trustedBoot = trustedBoot;
        return this;
    }

    /**
     * Set the hardware attribute
     * @param {string} hardware 
     * @return {Devices}
     */
    withHardware(hardware) {
        if (typeof hardware !== 'string')
            throw new Error('Parameter hardware must be a string');
        this._hardware = hardware;
        return this;
    }

    /**
     * Set the software attribute
     * @param {string} software 
     * @return {Devices}
     */
    withSoftware(software) {
        if (typeof software !== 'string')
            throw new Error('Parameter software must be a string');

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
    withTimeout(ms) {
        if (typeof ms !== "number") throw new Error('Parameter ms must be a number');
        this._timeout = ms;
        return this;
    }

    /**
     * Set the certificate attribute
     * @param {Array} certificates 
     * @return {Devices}
     */
    withCertificate(certificates) {
        if (typeof certificates === "string") {
            if (certificates.length < 2 || certificates.length > 50)
                throw new Error('Parameter certificate must be a string and has a maximum length of 50');
        } else if (typeof certificates === "object" && certificates.constructor === Array) {
            certificates.forEach(function(cert) {
                if (cert.length < 2 || cert.length > 50)
                    throw new Error('Parameter certificate must be a string and has a maximum length of 50');
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
    withLocation(longitude, latitude, timestamp) {
        if (typeof longitude !== 'number' || typeof latitude !== 'number')
            throw new Error('Parameter longitude/latitude must be a number');

        if (timestamp) {
            let finalDate = moment(timestamp);

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
    withPostalCode(postalCode) {
        if (typeof postalCode !== 'string')
            throw new Error('Parameter postalCode must be a string');

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
    withDefaultFeed(defaultFeed) {
        if (typeof defaultFeed !== 'string')
            throw new Error('Parameter defaultFeed must be a string');
        this._defaultFeed = defaultFeed;
        return this;
    }


    _composeElement() {
        var deviceData = {
            "device": {
                "id": this._entityKey,
                "provision": {
                    "customId": [this._entityKey],
                    "template": "default",
                    "type": this._type,
                    "specificType": (this._specificType !== undefined) ? [this._specificType] : undefined,
                    "name": (this._name !== undefined) ? [this._name] : undefined,
                    "defaultFeed": (this._defaultFeed !== undefined) ? this._defaultFeed : undefined,
                    "description": (this._description !== undefined) ? [this._description] : undefined,
                    "admin": {
                        "organization": this._organization,
                        "channel": (this._channel !== undefined) ? this._channel : "default_channel",
                        "administrativeState": (this._administrativeState !== undefined) ? this._administrativeState : undefined,
                        "serviceGroup": (this._serviceGroup !== undefined) ? this._serviceGroup : "emptyServiceGroup"
                    },
                    "serialNumber": (this._serialNumber !== undefined) ? [this._serialNumber] : undefined,
                    "trustedBoot": (this._trustedBoot !== undefined) ? this._trustedBoot : undefined,
                    "operationalStatus": (this._operationalStatus !== undefined) ? [this._operationalStatus] : undefined,
                    "hardware": (this._hardware !== undefined) ? [this._hardware] : undefined,
                    "software": (this._software !== undefined) ? this._software : undefined,
                    "certificates": (this._certificate !== undefined) ? this._certificate : undefined,
                    "location": (this._location !== undefined) ? [this._location] : undefined
                }
            }
        }
        return deviceData;
    }

    _buildURL() {
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
    create() {
        let _this = this;
        let defered = q.defer();
        let promise = defered.promise;
        this._validate().catch(function(err2) {
            let error;
            if (err2.data) {
                error = { "errors": err2.data, "statusCode": 400 };
            } else if (err2.errors) {
                error = { "errors": err2.errors, "statusCode": 400 };
            } else {
                error = { "errors": err2, "statusCode": 400 };
            }
            defered.reject(error);
            throw new Error(error);
        }).done(function(prevOk) {
            super.create().then(function(res) {
                defered.resolve({ data: res.data, statusCode: res.statusCode });
            }).catch(function(err) {
                defered.reject(err);
            });
        }, function(err) {

        });
        return promise;
    }

    _validate() {
        let _this = this;
        this._checkRequiredParameters();
        let previousValidations = [];

        if (this._administrativeState) {
            let administrativeStateBuilder = this._ogapi.administrativeStateSearchBuilder()
                .withEntityType(this._type.toUpperCase()).withId(this._administrativeState).build();

            previousValidations.push(administrativeStateBuilder.execute().then(function(okh) {
                if (okh.statusCode === 204) {
                    throw new Error("Administrative State not found");
                }
            }));
        }

        if (this._specificType) {
            let specificTypeBuilder = this._ogapi.specificTypeSearchBuilder()
                .withEntityType(this._type.toUpperCase()).withId(this._specificType).build();

            previousValidations.push(specificTypeBuilder.execute().then(function(okh) {
                if (okh.statusCode === 204) {
                    throw new Error("Specific Type not found");
                }
            }));
        }

        if (this._operationalStatus) {
            let operationalStatusBuilder = this._ogapi.operationalStatusSearchBuilder()
                .withEntityType(this._type.toUpperCase()).withId(this._operationalStatus).build();
            previousValidations.push(operationalStatusBuilder.execute().then(function(okh) {
                if (okh.statusCode === 204) {
                    throw new Error("Operational Status not found");
                }
            }));
        }

        if (this._hardware) {
            let hardwareBuilder = this._ogapi.hardwaresSearchBuilder().withId(this._hardware).build();
            previousValidations.push(hardwareBuilder.execute().then(function(okh) {
                if (okh.statusCode === 204) {
                    throw new Error("Hardware not found");
                }
            }));
        }

        if (this._software) {
            for (let softIdTmp in this._software) {
                let softwareId = this._software[softIdTmp];
                let softwareBuilder = this._ogapi.softwaresSearchBuilder().withId(softwareId).build();
                previousValidations.push(softwareBuilder.execute().then(function(okh) {
                    if (okh.statusCode === 204) {
                        throw new Error("Software " + softwareId + " not found");
                    }
                }));
            }
        }

        if (this._certificate) {
            for (let certIdTmp in this._certificate) {
                let certificateId = this._certificate[certIdTmp];
                let certificateFinder = this._ogapi.newCertificateFinder();
                previousValidations.push(certificateFinder.findById(certificateId).then(function(okh) {
                    if (okh[1] === 204) {
                        throw new Error("Certificate " + certificateId + " not found");
                    }
                }));
            }
        }
        // validación de canal y organizacion
        let channelFinder = this._ogapi.newChannelFinder();
        previousValidations.push(channelFinder.findByOrganizationAndName(this._organization, this._channel).then(function(okh) {
            if (okh.statusCode === 204) {
                throw new Error("Organization and channel combination not found");
            }
        }));

        // validación de dispositivo
        let entityKey = this._entityKey;
        let deviceFinder = this._ogapi.newDeviceFinder().findByOrganizationAndId(this._organization, entityKey);
        previousValidations.push(deviceFinder.then(function(okh) {
            throw new Error("Device " + entityKey + " already exists");
        }).catch(function(devErr) {
            if (!devErr.statusCode || (devErr.statusCode && devErr.statusCode !== HttpStatus.NOT_FOUND)) {
                throw new Error("Device " + entityKey + " already exists");
            }
        }));

        return q.all(previousValidations);
    }


    /* fields validations */
    _checkType(type) {
        type = type.toLowerCase();
        let not_found = [];
        let found = TYPE_ENUM.find(function(type) {
            return type == this;
        }, type);

        if (typeof found === "undefined") {
            not_found.push(type);
        }
        if (not_found.length !== 0) {
            throw new Error("Parameter type value not allowed <'" + JSON.stringify(not_found) + "'>, allowed <'" + JSON.stringify(TYPE_ENUM) + "'>")
        }
        return type;
    }

}