'use strict';

import BaseProvision from '../provision/BaseProvision';
import checkType from '../util/formats/check_types'
/**
 * This is a base object that contains all you can do about Provision Processors.
 */

export default class ProvisionProcessors extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "organizations/", undefined, ['name', 'organization', 'configurationParams', 'scriptProcessor']);
    }

    //solo put o delete se llama
    _buildURL() {
        let url = "provisionProcessors/provision/organizations/" + this._organization + '/' + this._identifier;
        return url;
    }

    /**
     * Set the organization attribute
     * @param {string} organization - required field
     * @return {ProvisionPrecessors}
     */
    withOrganization(organization) {
        checkType._checkString(organization, 50, 'organization');
        this._organization = organization;
        return this;
    }

    /**
     * Set the identifier attribute
     * @param {string} identifier - required field
     * @return {ProvisionPrecessors}
     */
     withIdentifier(identifier) {
        checkType._checkString(identifier, 50, 'identifier');
        this._identifier = identifier;
        return this;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {ProvisionPrecessors}
     */
    withName(name) {
        checkType._checkString(name, 50, 'name');
        this._name = name;
        return this;
    }

    /**
     * Set the columns attribute
     * @param {object} configurationParams - required field
     * @return {ProvisionPrecessors}
     */
    withConfigurationParams(configurationParams) {
        checkType._checkObject(configurationParams, 'configurationParams');
        this._configurationParams = configurationParams;
        return this;
    }

    /**
     * Set the columns attribute
     * @param {object} scriptProcessor - required field
     * @return {ProvisionPrecessors}
     */
     withScriptProcessor(scriptProcessor) {
        checkType._checkObject(scriptProcessor, 'scriptProcessor');
        this._scriptProcessor = scriptProcessor;
        return this;
    }
    
    //create y update
    _composeElement() {
        this._resource = "provisionProcessors/provision/organizations/" + this._organization;
        let provisionProcessor = {
            name: this._name,
            configurationParams: this._configurationParams,
            scriptProcessor: this._scriptProcessor
        };
        return provisionProcessor;
    }
}