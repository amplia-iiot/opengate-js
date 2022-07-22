'use strict';

import BaseProvision from '../provision/BaseProvision';

/**
 * This is a base object that contains all you can do about Bundles.
 */
export default class AIModels extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/organizations", undefined, ["name", "organization", "files"], 'v1');
        this._ogapi = ogapi;
    }

    _buildURL() {
        var url = this._organization + '/models/' + this._name;
        return url;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Transformers}
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
     * @return {Transformers}
     */
    withOrganization(organization) {
        if (typeof organization !== 'string' || organization.length > 50)
            throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'organization' });
        this._organization = organization;
        return this;
    }

    addFile(file) {
        // if (typeof file !== 'object')
        //     throw new Error({ message: "Parameter action requires name and type", parameter: 'action' });

        if(!this._files) {
            this._files = []
        }

        this._files.push(file)
    }


    _composeElement() {
        this._checkRequiredParameters();
        this._resource = this._organization + '/models';

        var transformer = {
            "model": {
                name: this._name || undefined,
                files:  this._files || undefined,
            }
        };
        return transformer;
    }

    _composeUpdateElement() {
        let model = super._composeUpdateElement();
        delete model.model.name;
        return model;
    }
}