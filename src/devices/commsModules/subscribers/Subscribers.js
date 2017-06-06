'use strict';

import q from 'q';
import HttpStatus from 'http-status-codes';

import BaseProvision from '../../../provision/BaseProvision';

/**
 * This is a base object that contains all you can do about Subscribers.
 */
export default class Subscribers extends BaseProvision {

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
     * @return {Subscribers}
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
     * @return {Subscribers}
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
     * @return {Subscribers}
     */
    withSpecificType(specificType) {
        if (typeof specificType !== 'string' || specificType.length > 50)
            throw new Error('Parameter specificType must be a string and has a maximum length of 50');
        this._specificType = specificType;
        return this;
    }

    /**
     * Set the ICC attribute
     * @param {string} icc 
     * @return {Subscribers}
     */
    withIcc(icc) {
        if (typeof icc !== 'string' || icc.length > 250)
            throw new Error('Parameter icc must be a string and has a maximum length of 250');
        this._icc = icc;
    }

    /**
     * Sets the organization attribute
     * @param {string} organization 
     * @return {Subscribers}
     */
    withOrganization(organization) {
        if (typeof organization !== 'string' || organization.length > 250)
            throw new Error('Parameter organization must be a string and has a maximum length of 250');
        this._organization = organization;
        this._resource = "provision/organizations/" + this._organization + "/entities/subscribers";
        return this;
    }

    /**
     * Sets the channel attribute
     * @param {string} channel 
     * @return {Subscribers}
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
     * @return {Subscribers}
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
     * @return {Subscribers}
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
     * @return {Subscribers}
     */
    withEntityKey(entityKey) {
        if (typeof entityKey !== 'string' || entityKey.length > 200)
            throw new Error('Parameter entityKey must be a string and has a maximum length of 200');
        this._entityKey = entityKey;
        return this;
    }


    /**
     * The request will have a specific time out if it will be exceeded then the promise throw an exception
     * @param {number} ms - timeout in milliseconds    
     * @return {Subscribers} 
     */
    withTimeout(ms) {
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
    create() {
        let defered = q.defer();
        let promise = defered.promise;
        this._validate().catch(function(err) {
            defered.reject(err);
            throw new Error(err);
        }).done(function(res) {
            super.create().then(function(res) {
                defered.resolve(res);
            }).catch(function(err) {
                defered.reject({ errors: err.data.errors, statusCode: err.statusCode });
            });
        }, function(err) {

        });
        return promise;
    }


    _create() {
        let _this = this;
        let defered = q.defer();
        let promise = defered.promise;
        this._validate().then(function(prevOk) {
            return super.create().then(function(res) {
                if (res.statusCode === 201) {
                    defered.resolve(res);
                } else {
                    defered.reject({ errors: res.data.errors, statusCode: response.statusCode });
                }
            });
        }).catch(function(err) {
            defered.reject({ errors: res.data.errors, statusCode: response.statusCode });
        });
        return promise;
    }

    _composeElement() {
        var entityData = {
            "subscriber": {
                "id": this._entityKey,
                "provision": {
                    "customId": [this._entityKey],
                    "template": this._template,
                    "specificType": (this._specificType !== undefined) ? [this._specificType] : undefined,
                    "name": (this._name !== undefined) ? [this._name] : undefined,
                    "description": (this._description !== undefined) ? [this._description] : undefined,
                    "icc": (this._icc !== undefined) ? [this._icc] : undefined,
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

    _buildURL() {
        let organization = this._organization;
        if (organization === undefined || this._entityKey === undefined) {
            throw new Error('Parameters organization and entityKey must be defined');
        }
        this._resource = "provision/organizations/" + organization + "/entities/subscribers";
        var url = this._resource + "/" + this._entityKey;
        return url;
    }

    _validate() {
        this._checkRequiredParameters();
        let previousValidations = [];

        if (this._administrativeState) {
            let administrativeStateBuilder = this._ogapi.administrativeStateSearchBuilder()
                .withEntityType("SUBSCRIBER").withId(this._administrativeState).build();
            previousValidations.push(administrativeStateBuilder.execute().then(function(okh) {
                if (okh.statusCode === 204) {
                    throw new Error("Administrative State not found");
                }
            }));
        }

        if (this._specificType) {
            let specificTypeBuilder = this._ogapi.specificTypeSearchBuilder()
                .withEntityType("SUBSCRIBER").withId(this._specificType).build();
            previousValidations.push(specificTypeBuilder.execute().then(function(okh) {
                if (okh.statusCode === 204) {
                    throw new Error("Specific Type not found");
                }
            }));
        }
        return q.all(previousValidations);
    }


}