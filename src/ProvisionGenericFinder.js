'use strict';

import GenericFinder from './GenericFinder';

/**
 * This class allows making GET requests to a resource in the OpenGate North API.
 */
export default class ProvisionGenericFinder extends GenericFinder {
    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     * @param {string} source - Relative url where is located the resource.
     * @param {string} reponseJsonData - Relative url where is located the resource.
     * @param {string} error_not_found - String error which will be thrown on not_found error.
     */
    constructor(ogapi, source, entity, error_not_found) {
        super(ogapi, 'provision/' + source, entity, error_not_found);
    }
}
