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
        super(ogapi, "/organizations", undefined, ["name", "organization"]);
        this._ogapi = ogapi;
    }

    _buildURL() {
        var url = 'provision/organizations/' + this._organization + '/pipelines/' + this._name;
        return url;
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

    addAction(action) {
        if (typeof action !== 'object' 
            || !action.name || typeof action.name !== 'string' || !action.type || typeof action.type !== 'string')
            throw new Error({ message: "Parameter action requires name and type", parameter: 'action' });

        if(!this._actions) {
            this._actions = []
        }

        this._actions.push(action)
    }


    _composeElement() {
        this._checkRequiredParameters();
        this._resource = 'provision/organizations/' + this._organization + '/pipelines';
        var pipeline = {
            "pipeline": {
                name: this._name || undefined,
                actions:  this._actions || undefined,
            }
        };
        return pipeline;
    }

    _composeUpdateElement() {
        let pipeline = super._composeUpdateElement();
        delete pipeline.pipeline.name;
        return pipeline;
    }

    _getVersion() {
        return 'v1'
    }
}