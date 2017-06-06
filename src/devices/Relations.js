'use strict';

import q from 'q';
import BaseProvision from '../provision/BaseProvision'

/**
 * This is a base object that contains all you can do about relations
 */
export default class Relations extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/organizations/");
    }

    /**
     * Sets the organization attribute
     * @param {string} organization 
     * @return {CommunicationsModules}
     */
    withOrganization(organization) {
        if (typeof organization !== 'string' || organization.length > 250)
            throw new Error('Parameter organization must be a string and has a maximum length of 250');

        this._organization = organization;

        return this;
    }

    /**
     * Set the device attribute
     * @param {string} device - required field
     * @return {Relations}
     */
    withDevice(device) {
        if (typeof device !== 'string' || device.length > 250)
            throw new Error('Parameter device must be a string and has a maximum length of 250');

        this._device = device;
        return this;
    }


    /**
     * Set the communicationsModule attribute
     * @param {string} communicationsModule - required field
     * @return {Relations}
     */
    withCommunicationsModule(communicationsModule) {
        if (typeof communicationsModule !== 'string' || communicationsModule.length > 250)
            throw new Error('Parameter communicationsModule must be a string and has a maximum length of 250');

        this._communicationsModule = communicationsModule;
        return this;
    }


    /**
     * Set the subscription attribute
     * @param {string} subscription - required field
     * @return {Relations}
     */
    withSubscription(subscription) {
        if (typeof subscription !== 'string' || subscription.length > 250)
            throw new Error('Parameter subscription must be a string and has a maximum length of 250');

        this._subscription = subscription;
        return this;
    }

    /**
     * Set the subscriber attribute
     * @param {string} subscriber - required field
     * @return {Relations}
     */
    withSubscriber(subscriber) {
        if (typeof subscriber !== 'string' || subscriber.length > 250)
            throw new Error('Parameter subscriber must be a string and has a maximum length of 250');

        this._subscriber = subscriber;
        return this;
    }

    /**
     * Set the template attribute
     * @param {string} template - optional field
     * @return {Relations}
     */
    withTemplate(template) {
        if (typeof template !== 'string')
            throw new Error('Parameter template must be a string');

        this._template = template;
        return this;
    }

    _composeElement() {
        if (this._deviceInfo && this._deviceInfo._organization) {
            this.withOrganization(this._deviceInfo._organization);
        }

        if (this._organization === undefined) {
            throw new Error('Parameter organization must be defined');
        }

        var relationParts = [];
        if (this._device !== undefined) {
            relationParts.push({ "entityType": "DEVICE", "id": this._device });
        }
        if (this._communicationsModule !== undefined) {
            relationParts.push({ "entityType": "COMMUNICATIONS_MODULE", "id": this._communicationsModule });
        }
        if (this._subscriber !== undefined) {
            relationParts.push({ "entityType": "SUBSCRIBER", "id": this._subscriber });
        }
        if (this._subscription !== undefined) {
            relationParts.push({ "entityType": "SUBSCRIPTION", "id": this._subscription });
        }

        if (this._action !== 'DELETE' && relationParts.length < 2) {
            throw new Error('At least 2 entities required to ' + this._action + ' a relation');
        }

        if (this._action === 'DELETE' && relationParts.length === 0) {
            throw new Error('At least 1 entity is required to ' + this._action);
        }


        var relationData = {
            "relation": {
                "template": this._template ? this._template : "default",
                "links": relationParts
            }
        };

        return relationData;
    }

    _buildURL() {
        if (this._organization === undefined) {
            throw new Error('Parameters organization must be defined');
        }
        this._resource = 'provision/organizations/' + this._organization + '/entities/relations?action=' + this._action;
        return this._resource;
    }

    _executeAction() {
        this._buildURL();
        return super.create();
    }

    create() {
        this._action = "CREATE";
        this._buildURL();
        return super.create();
    }

    _create() {
        let _this = this;
        _this._action = "CREATE";
        _this._buildURL();
        let defered = q.defer();
        let promise = defered.promise;

        var onCreateRelation = function(res) {
            //console.log("relation ok: " + JSON.stringify(res));
            if (res.statusCode === 201) {
                defered.resolve({ "statusCode": res.statusCode });
                _this._exists = true;
            } else {
                onCreateRelationError({ "statusCode": res.statusCode });
            }
        }

        var onCreateRelationError = function(err) {
            //console.log("relation err: " + JSON.stringify(err));
            defered.reject(err);
        }

        _this._executeAction().then(function(prevOk) {
            //super.create().then(onCreateRelation).catch(onCreateRelationError);
            onCreateRelation(prevOk);
        }).catch(function(err2) {
            onCreateRelationError(err2);
        });

        return promise;
    }

    update() {
        let _this = this;
        _this._action = "UPDATE";
        let defered = q.defer();
        let promise = defered.promise;

        var onUpdateRelation = function(res) {
            if (res.statusCode === 200) {
                this._exists = true;
                defered.resolve({ data: {}, statusCode: 200 });
            } else {
                onUpdateRelationError({ "statusCode": res.statusCode });
            }
        }

        var onUpdateRelationError = function(err) {
            if (err.statusCode === 200) {
                this._exists = true;
                defered.resolve({ data: {}, statusCode: 200 });
            } else {
                defered.reject(err);
            }
        }

        _this._executeAction().then(function(prevOk) {
            //super.update().then(onUpdateRelation).catch(onUpdateRelationError);
            onUpdateRelation(prevOk);
        }).catch(function(err2) {
            onUpdateRelationError(err2);
        });

        return promise;
    }

    delete() {
        let _this = this;
        _this._action = "DELETE";
        let defered = q.defer();
        let promise = defered.promise;

        var onDeleteRelation = function(res) {
            if (res.statusCode === 200) {
                defered.resolve({ data: {}, statusCode: 200 });
            } else {
                onDeleteRelationError({ "statusCode": res.statusCode });
            }
        }

        var onDeleteRelationError = function(err) {
            if (err.statusCode === 200) {
                defered.resolve({ data: {}, statusCode: 200 });
            } else {
                defered.reject(err);
            }
        }

        _this._executeAction().then(function(prevOk) {
            //super.delete().then(onDeleteRelation).catch(onDeleteRelationError);
            onDeleteRelation(prevOk);
        }).catch(function(err2) {
            onDeleteRelationError(err2);
        });

        return promise;
    }

    _delete() {
        if (this._exists) {
            //console.log("a borrar");
            return this.delete();
        } else {
            //console.log("no borrar");
            let defered = q.defer();
            let promise = defered.promise;
            defered.resolve({});
            return promise;
        }
    }
}