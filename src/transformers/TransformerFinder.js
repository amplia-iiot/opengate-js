'use strict';

import GenericFinder from '../GenericFinder';
import q from 'q';

import HttpStatus from 'http-status-codes';

/**
 *   This class allow make get request to transformer resource into Opengate North API.
 */
export default class TransformerFinder extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'ai', 'list', 'Transformer not found', 'north');
    }

     /**
     * Download a complete list of transformers by its organization. This execute a GET http method
     * @test
     *   ogapi.newTransformerFinder().findByOrganization('orgname').then().catch();
     * @param {string} organization - transformer organization .
     * @return {Promise} 
     */
    findByOrganization(organization) {
        this._organization = organization;
        return this._execute();
    }

    /**
     * Download a specific transformer by its organization and id. This execute a GET http method
     * @test
     *   ogapi.newTransformerFinder().findByOrganizationAndIdentifier('orgname', xxx-xx-xxx-xxx').then().catch();
     * @param {string} organization - transformer organization .
     * @param {string} identifier - transformer identifier.
     * @return {Promise} 
     */
    findByOrganizationAndIdentifier(organization, identifier) {
        this._organization = organization;
        this._identifier = identifier;
        return this._execute();
    }

     /**
     * Download a specific transformer by its organization and id. This execute a GET http method
     * @test
     *   ogapi.newTransformerFinder().downloadByOrganizationAndIdentifierAndFilename('orgname', xxx-xx-xxx-xxx', 'filename').then().catch();
     * @param {string} organization - transformer organization .
     * @param {string} identifier - transformer identifier.
     * @param {string} filename - name of transformer file.
     * @return {Promise} 
     */
    downloadByOrganizationAndIdentifierAndFilename(organization, identifier, filename) {
        this._organization = organization;
        this._identifier = identifier;
        this._filename = filename
        return this._download();
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + "/" + this._organization + "/transformers" + (this._identifier?'/'+ this._identifier + (this._filename?'/'+ this._filename:''):'');
    }
}