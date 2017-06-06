'use strict';

import q from 'q';
import BaseProvision from '../../provision/BaseProvision'

/**
 * This is a base object that contains all you can do about CommunicationsModules.
 */
export default class CommunicationsModules extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/organizations/", undefined, ["organization", "entityKey"]);
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {CommunicationsModules}
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
     * @return {CommunicationsModules}
     */
    withDescription(description) {
        if (typeof description !== 'string' || description.length > 250)
            throw new Error('Parameter description must be a string and has a maximum length of 250');
        this._description = description;
        return this;
    }

    /**
     * Set the imei attribute
     * @param {string} imei 
     * @return {CommunicationsModules}
     */
    withImei(imei) {
        if (typeof imei !== 'string' || imei.length > 250)
            throw new Error('Parameter imei must be a string and has a maximum length of 250');
        this._imei = imei;
        return this;
    }


    /**
     * Set the mac attribute
     * @param {string} mac 
     * @return {CommunicationsModules}
     */
    withMac(mac) {
        if (typeof mac !== 'string' || mac.length > 250)
            throw new Error('Parameter mac must be a string and has a maximum length of 250');
        this._mac = mac;
        return this;
    }

    /**
     * Set the specific type attribute
     * @param {string} specificType 
     * @return {CommunicationsModules}
     */
    withSpecificType(specificType) {
        if (typeof specificType !== 'string' || specificType.length > 50)
            throw new Error('Parameter specificType must be a string and has a maximum length of 50');
        this._specificType = specificType;
        return this;
    }

    /**
     * Set the operationalStatus attribute
     * @param {string} operationalStatus 
     * @return {CommunicationsModules}
     */
    withOperationalStatus(operationalStatus) {
        if (typeof operationalStatus !== 'string' || operationalStatus.length > 50)
            throw new Error('Parameter operationalStatus must be a string and has a maximum length of 50');
        this._operationalStatus = operationalStatus;
        return this;
    }

    /***************************ADMINISTRACION************************************/
    /**
     * Sets the organization attribute
     * @param {string} organization 
     * @return {CommunicationsModules}
     */
    withOrganization(organization) {
        if (typeof organization !== 'string' || organization.length > 250)
            throw new Error('Parameter organization must be a string and has a maximum length of 250');
        this._organization = organization;
        this._resource = "provision/organizations/" + this._organization + "/entities/communicationsModules";
        return this;
    }

    /**
     * Sets the channel attribute
     * @param {string} channel 
     * @return {CommunicationsModules}
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
     * @return {CommunicationsModules}
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
     * @return {CommunicationsModules}
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
     * @return {CommunicationsModules}
     */
    withEntityKey(entityKey) {
        if (typeof entityKey !== 'string' || entityKey.length > 200)
            throw new Error('Parameter entityKey must be a string and has a maximum length of 200');
        this._entityKey = entityKey;
        return this;
    }

    /**
     * Set the hardware attribute
     * @param {string} hardware 
     * @return {CommunicationsModules}
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
     * @return {CommunicationsModules}
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
     * @return {CommunicationsModules} 
     */
    withTimeout(ms) {
        if (typeof ms !== "number") throw new Error('Parameter ms must be a number');
        this._timeout = ms;
        return this;
    }


    _composeElement() {
        var deviceData = {
            "communicationsModule": {
                "id": this._entityKey,
                "provision": {
                    "customId": [this._entityKey],
                    "template": "default",
                    "specificType": (this._specificType !== undefined) ? [this._specificType] : undefined,
                    "name": (this._name !== undefined) ? [this._name] : undefined,
                    "description": (this._description !== undefined) ? [this._description] : undefined,
                    "admin": {
                        "organization": this._organization,
                        "channel": (this._channel !== undefined) ? this._channel : "default_channel",
                        "administrativeState": (this._administrativeState !== undefined) ? this._administrativeState : undefined,
                        "serviceGroup": (this._serviceGroup !== undefined) ? this._serviceGroup : "emptyServiceGroup"
                    },
                    "operationalStatus": (this._operationalStatus !== undefined) ? [this._operationalStatus] : undefined,
                    "hardware": (this._hardware !== undefined) ? [this._hardware] : undefined,
                    "software": (this._software !== undefined) ? this._software : undefined,
                    "imei": (this._imei !== undefined) ? [this._imei] : undefined,
                    "mac": (this._mac !== undefined) ? [this._mac] : undefined
                }
            }
        }
        return deviceData;
    }

    _buildURL() {
        let organization = this._organization;
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
    create() {
        let defered = q.defer();
        let promise = defered.promise;
        this._validate().catch(function(err) {
            defered.reject(err);
            throw new Error(err);
        }).done(function(res) {
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
        this._checkRequiredParameters();
        let previousValidations = [];

        if (this._administrativeState) {
            let administrativeStateBuilder = this._ogapi.administrativeStateSearchBuilder()
                .withEntityType("COMMUNICATIONS_MODULE").withId(this._administrativeState).build();
            previousValidations.push(administrativeStateBuilder.execute().then(function(okh) {
                if (okh.statusCode === 204) {
                    throw new Error("Administrative State not found");
                }
            }));
        }

        if (this._specificType) {
            let specificTypeBuilder = this._ogapi.specificTypeSearchBuilder()
                .withEntityType("COMMUNICATIONS_MODULE").withId(this._specificType).build();

            previousValidations.push(specificTypeBuilder.execute().then(function(okh) {
                if (okh.statusCode === 204) {
                    throw new Error("Specific Type not found");
                }
            }));
        }

        if (this._operationalStatus) {
            let operationalStatusBuilder = this._ogapi.operationalStatusSearchBuilder()
                .withEntityType("COMMUNICATIONS_MODULE").withId(this._operationalStatus).build();
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
        return q.all(previousValidations);
    }

}