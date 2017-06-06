'use strict';

import q from 'q';
import merge from 'merge';
import BaseProvision from '../../../provision/BaseProvision';


const ADDRESS_TYPE_ENUM = ["MAC", "IPV4", "IPV6"];
/**
 * This is a base object that contains all you can do about Subscriptions.
 */
export default class Subscriptions extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/organizations/", undefined, ["channel", "organization", "specificType", "entityKey"]);
        this._template = "default";
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Subscriptions}
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
     * @return {Subscriptions}
     */
    withDescription(description) {
        if (typeof description !== 'string' || description.length > 250)
            throw new Error('Parameter description must be a string and has a maximum length of 250');
        this._description = description;
        return this;
    }


    /**
     * Set the specific type attribute
     * @param {string} specificType 
     * @return {Subscriptions}
     */
    withSpecificType(specificType) {
        if (typeof specificType !== 'string' || specificType.length > 50)
            throw new Error('Parameter specificType must be a string and has a maximum length of 50');
        this._specificType = specificType;
        return this;
    }

    /**
     * Sets the organization attribute
     * @param {string} organization 
     * @return {Subscriptions}
     */
    withOrganization(organization) {
        if (typeof organization !== 'string' || organization.length > 250)
            throw new Error('Parameter organization must be a string and has a maximum length of 250');
        this._organization = organization;

        this._resource = "provision/organizations/" + this._organization + "/entities/subscriptions";

        return this;
    }

    /**
     * Sets the channel attribute
     * @param {string} channel 
     * @return {Subscriptions}
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
     * @return {Subscriptions}
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
     * @return {Subscriptions}
     */
    withServiceGroup(serviceGroup) {
        if (typeof serviceGroup !== 'string' || serviceGroup.length > 250)
            throw new Error('Parameter serviceGroup must be a string and has a maximum length of 250');
        this._serviceGroup = serviceGroup;
        return this;
    }

    /**
     * Sets the entityKey attribute
     * @param {string} entityKey 
     * @return {Subscriptions}
     */
    withEntityKey(entityKey) {
        if (typeof entityKey !== 'string' || entityKey.length > 200)
            throw new Error('Parameter entityKey must be a string and has a maximum length of 200');
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
     * @return {Subscriptions}
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
     * The request will have a specific time out if it will be exceeded then the promise throw an exception
     * @param {number} ms - timeout in milliseconds    
     * @return {Subscriptions} 
     */
    withTimeout(ms) {
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
    withIpAddress(ipAddress, type = "IPV4") {
        if (typeof ipAddress !== 'string' || ipAddress.length > 200)
            throw new Error('Parameter ipAddress must be a string and has a maximum length of 200');
        this._checkAddressType(type);
        this._address = merge(this._address || {}, { type: type, value: ipAddress });
        return this;
    }

    /**
     * Sets the apn attribute
     * @param {string} apn 
     * @return {Subscriptions}  
     **/
    withApn(apn) {
        if (typeof apn !== 'string' || apn.length > 200)
            throw new Error('Parameter apn must be a string and has a maximum length of 200');
        this._address = merge(this._address || {}, { apn: apn });
        return this;
    }

    /**
     * Sets the registeredOperator attribute
     * @param {string} registeredOperator 
     * @return {Subscriptions}
     */
    withRegisteredOperator(registeredOperator) {
        if (typeof registeredOperator !== 'string' || registeredOperator.length > 200)
            throw new Error('Parameter registeredOperator must be a string and has a maximum length of 200');
        this._registeredOperator = registeredOperator;
        return this;
    }

    /**
     * Sets the homeOperator attribute
     * @param {string} homeOperator 
     * @return {Subscriptions}
     */
    withHomeOperator(homeOperator) {
        if (typeof homeOperator !== 'string' || homeOperator.length > 200)
            throw new Error('Parameter homeOperator must be a string and has a maximum length of 200');
        this._homeOperator = homeOperator;
        return this;
    }

    /**
     * Sets the imsi attribute
     * @param {string} imsi 
     * @return {Subscriptions}
     */
    withImsi(imsi) {
        if (typeof imsi !== 'string' || imsi.length > 200)
            throw new Error('Parameter imsi must be a string and has a maximum length of 200');
        this._imsi = imsi;
        return this;
    }

    /**
     * Sets the msisdn attribute
     * @param {string} msisdn 
     * @return {Subscriptions}
     */
    withMsisdn(msisdn) {
        if (typeof msisdn !== 'string' || msisdn.length > 200)
            throw new Error('Parameter msisdn must be a string and has a maximum length of 200');
        this._msisdn = msisdn;
        return this;
    }


    /**
     * Create the subscription
     * @example
     *  ogapi.subscriptionBuilder().create()
     * @return {Promise} 
     */
    create() {
        let defered = q.defer();
        let promise = defered.promise;
        this._validate().catch(function (err) {
            defered.reject(err);
            throw new Error(err);
        }).done(function (res) {
            super.create().then(function (res) {
                defered.resolve(res);
            }).catch(function (err) {
                defered.reject(err);
            });
        }, function (err) {

        });
        return promise;
    }



    _buildURL() {
        let organization = this._organization;
        if (organization === undefined || this._entityKey === undefined) {
            throw new Error('Parameters organization and entityKey must be defined');
        }
        this._resource = "provision/organizations/" + organization + "/entities/subscriptions";
        var url = this._resource + "/" + this._entityKey;
        return url;
    }

    _composeElement() {
        var entityData = {
            "subscription": {
                "id": this._entityKey,
                "provision": {
                    "customId": [this._entityKey],
                    "template": this._template,
                    "specificType": (this._specificType !== undefined) ? [this._specificType] : undefined,
                    "name": (this._name !== undefined) ? [this._name] : undefined,
                    "location": (this._location !== undefined) ? [this._location] : undefined,
                    "msisdn": (this._msisdn !== undefined) ? [this._msisdn] : undefined,
                    "imsi": (this._imsi !== undefined) ? [this._imsi] : undefined,
                    "homeOperator": (this._homeOperator !== undefined) ? [this._homeOperator] : undefined,
                    "registeredOperator": (this._registeredOperator !== undefined) ? [this._registeredOperator] : undefined,
                    "address": (this._address !== undefined) ? [this._address] : undefined,
                    "description": (this._description !== undefined) ? [this._description] : undefined,
                    "admin": {
                        "organization": this._organization,
                        "channel": (this._channel !== undefined) ? this._channel : "default_channel",
                        "administrativeState": (this._administrativeState !== undefined) ? this._administrativeState : undefined,
                        "serviceGroup": (this._serviceGroup !== undefined) ? this._serviceGroup : "emptyServiceGroup"
                    }
                }
            }
        }
        return entityData;
    }


    _validate() {
        this._checkRequiredParameters();
        let previousValidations = [];

        if (this._administrativeState) {
            let administrativeStateBuilder = this._ogapi.administrativeStateSearchBuilder()
                .withEntityType("SUBSCRIPTION").withId(this._administrativeState).build();
            previousValidations.push(administrativeStateBuilder.execute().then(function (okh) {
                if (okh.statusCode === 204) {
                    throw new Error("Administrative State not found");
                }
            }));
        }

        let specificTypeBuilder = this._ogapi.specificTypeSearchBuilder()
            .withEntityType("SUBSCRIPTION").withId(this._specificType).build();
        previousValidations.push(specificTypeBuilder.execute().then(function (okh) {
            if (okh.statusCode === 204) {
                throw new Error("Specific Type not found");
            }
        }));

        let mobilePhoneProviderSearchBuilder = this._ogapi.mobilePhoneProviderSearchBuilder().build();
        let registeredOperator = this._registeredOperator;
        if (typeof registeredOperator !== "undefined") {
            previousValidations.push(mobilePhoneProviderSearchBuilder.execute().then(function (mobilePhoneProvider) {
                let mobilePhoneProviderList = mobilePhoneProvider.data.mobilePhoneProvider;
                let not_found = [];
                let found = mobilePhoneProviderList.find(function (registeredOperator) {
                    return registeredOperator == this;
                }, registeredOperator);

                if (typeof found === "undefined") {
                    not_found.push(registeredOperator);
                }

                if (not_found.length !== 0) {
                    throw new Error("Parameter mobilePhoneProvider value not allowed <'" + JSON.stringify(not_found) + "'>, allowed <'" + JSON.stringify(mobilePhoneProviderList) + "'>")
                }
            }));
        }
        let homeOperator = this._homeOperator;
        if (typeof homeOperator !== "undefined") {
            previousValidations.push(mobilePhoneProviderSearchBuilder.execute().then(function (mobilePhoneProvider) {
                let mobilePhoneProviderList = mobilePhoneProvider.data.mobilePhoneProvider;
                let not_found = [];
                let found = mobilePhoneProviderList.find(function (homeOperator) {
                    return homeOperator == homeOperator;
                }, homeOperator);

                if (typeof found === "undefined") {
                    not_found.push(homeOperator);
                }

                if (not_found.length !== 0) {
                    throw new Error("Parameter mobilePhoneProvider value not allowed <'" + JSON.stringify(not_found) + "'>, allowed <'" + JSON.stringify(mobilePhoneProviderList) + "'>")
                }
            }));
        }
        return q.all(previousValidations);
    }


    _checkAddressType(type) {
        let not_found = [];
        let found = ADDRESS_TYPE_ENUM.find(function (type) {
            return type == this;
        }, type);

        if (typeof found === "undefined") {
            not_found.push(type);
        }

        if (not_found.length !== 0) {
            throw new Error("Parameter address type value not allowed <'" + JSON.stringify(not_found) + "'>, allowed <'" + JSON.stringify(ADDRESS_TYPE_ENUM) + "'>")
        }
    }
}