'use strict';

import q from 'q';
import BaseProvision from '../provision/BaseProvision';

/**
 * This is a base object that contains all you can do about Bundles.
 */
export default class Pipelines extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/organizations", undefined, ["name", "actions", "organization"], 'v1/ai');
        this._ogapi = ogapi;
    }

    _buildURL() {
        var url = this._organization + '/pipelines/' + this._identifier;
        return url;
    }

    /**
     * Set the identifier attribute
     * @param {string} identifier
     * @return {Transformers}
     */
    withIdentifier(identifier) {
        if (typeof identifier !== 'string' || identifier.length > 50)
            throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'identifier' });
        this._identifier = identifier;
        return this;
    }
    

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Pipelines}
     */
    withName(name) {
        if (typeof name !== 'string' || name.length > 50)
            throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'name' });
        this._name = name;
        return this;
    }

    /**
     * Set the organization attribute
     * @param {string} organization 
     * @return {Pipelines}
     */
    withOrganization(organization) {
        if (typeof organization !== 'string' || organization.length > 50)
            throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'organization' });
        this._organization = organization;
        return this;
    }

    /**
     * Sets the actions for the pipeline
     * @param {Array} actions
     */
    withActions(actions) {
        if (!(actions instanceof Array))
             throw new Error({ message: "Parameter actions requires an array", parameter: 'actions' });

        this._actions = []

        actions.forEach((actionTmp) => {
            this.addAction(actionTmp)
        })
    }

    /**
     * Adds an action item
     * @param {Object} action to be added
     */
    addAction(action) {
        if (typeof action !== 'object' 
            || !action.name || typeof action.name !== 'string' || !action.type || typeof action.type !== 'string')
            throw new Error({ message: "Parameter action requires name and type", parameter: 'actions' });

        if(!this._actions) {
            this._actions = []
        }

        this._actions.push(action)
    }

    prediction(body_data, deviceId, datastream) {
        var defered = q.defer();
        var promise = defered.promise;

        const finalData = {
            input: {
                data: body_data,
                date: new Date().toISOString()
            }
        }

        if (deviceId && datastream) {
            finalData.collect = {
                deviceId: deviceId,
                datastream: datastream
            }
        }

        //En muchas clases se genera this._resource en la llamada a la funcion this._composeElement()
        var defered = q.defer();
        var promise = defered.promise;

        //En muchas clases se genera this._resource en la llamada a la funcion this._composeElement()

        this._ogapi.Napi.post(this._buildURL() + '/prediction', finalData, this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL())
            .then((res) => {
                defered.resolve({
                    statusCode: res.statusCode,
                    body: res.body
                });
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
       
    }

    _composeElement() {
        this._checkRequiredParameters();
        this._resource = this._organization + '/pipelines';
        var pipeline = {
            name: this._name || undefined,
            actions:  this._actions || undefined,
        };
        return pipeline;
    }

    _composeUpdateElement() {
        let pipeline = super._composeUpdateElement();
        delete pipeline.pipeline.name;
        return pipeline;
    }
}