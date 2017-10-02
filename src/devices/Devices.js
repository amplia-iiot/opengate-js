'use strict';

import q from 'q';
import BaseProvision from '../provision/BaseProvision';

const ENTITY_ID = 'provision.device.identifier';
/**
 * This is a base object that contains all you can do about Devices.
 */
export default class Devices extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi, organization, allowedDatastreams, definedSchemas) {
        super(ogapi, "/organizations/", undefined, undefined);
        let _this = this;
        this._organization = organization;
        this._filter = "provision.device";
        this._entity = {};
        this._allowedDatastreams = allowedDatastreams;
        this._definedSchemas = definedSchemas;
    }



    _buildURL() {
        this._getEntityKey();
        if (this._organization === undefined || this._entity[ENTITY_ID] === undefined) {
            throw new Error('Parameters organization, entityKey must be defined');
        }
        this._resource = "provision/organizations/" + this._organization + "/devices";
        var url = this._resource + "/" + this._entityKey + "?flattened=true";
        return url;
    }

    /**
     * Return the allowed datastream for subscriber
     * @example
     *  ogapi.entityBuilder.devicesBuilder().getAllowedDatastreams()
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
     * Create a device
     *
     * @example
     *  ogapi.entityBuilder.devicesBuilder().create()
     * @return {Devices} 
     */
    create() {
        this._resource = "provision/organizations/" + this._organization + "/devices?flattened=true";
        let _this = this;
        let defered = q.defer();
        let promise = defered.promise;
        if (this._validate()) {
            super.create().then(function (res) {
                defered.resolve({ data: res.data, statusCode: res.statusCode });
            }).catch(function (err) {
                defered.reject(err);
            });
        } else {
            let error = { 'errors': 'Bad Request', "statusCode": 400 };
            defered.reject(error);
            throw new Error(error);
        }

        return promise;
    }

    _validate() {
        let _this = this;
        try {
            JSON.parse(JSON.stringify(this._entity));
        } catch (e) {
            return false;
        }
        return true;
    }

    _composeElement() {
        this._getEntityKey();
        this._entity["provision.administration.organization"] = {
            "_value": {
                "_received": {
                    "value": this._organization
                }
            }
        }
        return this._entity;

    }

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * This function deletes a entity of provision
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     */
    deleteAll() {
        var defered = q.defer();
        var promise = defered.promise;
        this._getEntityKey();
        var url = "provision/organizations/" + this._organization + "/devices/" + this._entityKey + "?full=true";
        this._ogapi.Napi.delete(url)
            .then((res) => {
                if (res.statusCode === 200) {
                    defered.resolve({ statusCode: res.statusCode });
                } else {
                    defered.reject({ errors: res.errors, statusCode: res.statusCode });
                }
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }

    _getEntityKey() {
        if (this._entity[ENTITY_ID]) {
            this._entityKey = this._entity[ENTITY_ID]._value._received.value;
        } else {
            throw new Error('Parameter entityKey must defined. Please define datastream: ' + ENTITY_ID);
        }
    }


}