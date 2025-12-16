'use strict';

import GenericFinder from '../GenericFinder';
// import ProvisionGenericFinder from '../ProvisionGenericFinder';

/**
 *   This class allow make get request to RuleConfigurations resource into Opengate North API.
 */
export default class RuleConfigurationsCatalog extends GenericFinder {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'rules/catalog', "rulesTemplate", 'Rule templates not found');
    }

    /**
     * Performs a get that returns rule templates
     * @test
     *   ogapi.newRuleConfigurationsCatalog().getTemplates();
     * @return {Promise} 
     */
    getTemplates() {
        return this._execute();
    }

    _composeUrl() {
        return this._baseUrl;
    }
}