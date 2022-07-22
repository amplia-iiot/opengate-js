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
        super(ogapi, "/organizations", undefined, ["organization", "file"], 'v1');
        this._ogapi = ogapi;
    }

    _buildURL() {
        var url = this._organization + '/models/' + this._identifier;
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

    withFile(file) {
        // if (typeof file !== 'object')
        //     throw new Error({ message: "Parameter action requires name and type", parameter: 'action' });
        this._file = file
    }

    _composeElement() {
        this._checkRequiredParameters();
        this._resource = this._organization + '/models';

        var transformer = {
            modelFile:  this._file || undefined
        };
        return transformer;
    }

    _composeUpdateElement() {
        let model = super._composeUpdateElement();
        return model;
    }
}