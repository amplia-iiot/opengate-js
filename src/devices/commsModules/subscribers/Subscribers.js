'use strict';

import q from 'q';

import BaseProvision from '../../../provision/BaseProvision';
const ENTITY_ID = 'provision.device.communicationModules[].subscriber.identifier';
/**
 * This is a base object that contains all you can do about Subscribers.
 */
export default class Subscribers extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi, organization, allowedDatastreams, definedSchemas) {
        super(ogapi, "/organizations/", undefined, undefined);
        let _this = this;
        this._organization = organization;
        this._filter = "provision.device.communicationModules[].subscriber";
        this._entity = {};
        this._allowedDatastreams = allowedDatastreams;
        this._definedSchemas = definedSchemas;
    }

    /**
     * Return the allowed datastream for subscriber
     * @example
     *  ogapi.entityBuilder.subscribersBuilder().getAllowedDatastreams()
     * @return {Promise} 
     */
    getAllowedDatastreams() {
        let _this = this;
        let defered = q.defer();
        let promise = defered.promise;
        if (this._allowedDatastreams) {
            defered.resolve({ statusCode: 200, data: this._allowedDatastreams });
        } else {
            defered.resolve({ statusCode: 204, data: 'no content' });
        }
        return promise;
    }





    /**
     * Create the subscriber
     * @example
     *  ogapi.entityBuilder.subscriberBuilder().create()
     * @return {Promise} 
     */
    create() {
        this._resource = "provision/organizations/" + this._organization + "/subscribers?flattened=true";
        let _this = this;
        let defered = q.defer();
        let promise = defered.promise;
        if (this._validate()) {
            super.create().then(function(res) {
                defered.resolve({ data: res.data, statusCode: res.statusCode });
            }).catch(function(err) {
                defered.reject(err);
            });
        } else {
            let error = { 'errors': 'Bad Request', "statusCode": 400 };
            defered.reject(error);
            throw new Error(error);
        }

        return promise;
    }

    _composeElement() {
        this._getEntityKey();
        this._entity["provision.administration.organization"] = {
            '_value': this._organization
        }
        return this._entity;

    }


    _buildURL() {
        this._getEntityKey();
        if (this._organization === undefined || this._entityKey === undefined) {
            throw new Error('Parameters organization, entityKey must be defined');
        }
        this._resource = "provision/organizations/" + this._organization + "/subscribers";
        var url = this._resource + "/" + this._entityKey + "?flattened=true";
        return url;
    }


    _validate() {
        if (!this._entityKey) {
            throw new Error('Parameter entityKey must defined. Please use withEntityKey method');
        }
        let _this = this;
        try {
            JSON.parse(JSON.stringify(this._entity));
        } catch (e) {
            return false;
        }
        return true;
    }

    _getEntityKey() {
        if (this._entity[ENTITY_ID]) {
            this._entityKey = this._entity[ENTITY_ID]._value;
        } else {
            throw new Error('Parameter entityKey must defined. Please define datastream: ' + ENTITY_ID);
        }
    }


}