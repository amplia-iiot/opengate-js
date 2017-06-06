'use strict';

import q from 'q';
import HttpStatus from 'http-status-codes';
import GenericFinder from './GenericFinder';

/**
 *   This class allow make get request to user resource into Opengate North API.
 */
export default class ProvisionGenericFinder extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     * @param {string} source - Relative url where is located the resource.
     * @param {string} reponseJsonData - Relative url where is located the resource.
     * @param {string} error_not_found - String error which will be thrown on not_found error.
     */
    constructor(ogapi, source, entity, error_not_found) {
        super(ogapi, "provision/" + source, entity, error_not_found);
    }

}