'use strict';

import GenericFinder from '../GenericFinder';

import q from 'q';
import HttpStatus from 'http-status-codes';

/**
 *   This class allow make get request to bulk with provision processors resource into Opengate North API.
 */
export default class BulkProcessorsFinder extends GenericFinder {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'provisionProcessors/provision/organizations', 'value', 'Bulk not found');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
     _composeUrl() {
        return this._baseUrl + '/organizations/' + this._organization + '/bulk/' + this._id + (this._details ? "/details" : '');
    }
    /**
     * Download a specific entity by its organization and id. This execute a GET http method
     * @test
     *   ogapi.newBulkProcessorsFinder().findByOrganizationAndId('orgname', xxx-xx-xxx-xxx').then().catch();
     *   ogapi.newBulkProcessorsFinder().findByOrganizationAndId('orgname', xxx-xx-xxx-xxx', true).then().catch();
     * @param {string} organization - organization.
     * @param {string} id - bulk id.
     * @param {string} accept - Format of file when get the result details of previously created bulk process.
     * @return {Promise} 
     */
    findByOrganizationAndId(organization, id, accept) {
        this._organization = organization;
        this._id = id;
        this._details = false
        
        if (accept) {
            this._details = true
            this._setExtraHeaders({
                'accept': accept
            });
            return this._download();
        }
        return this._execute();
    }

    /**
     * @return {Promise}* @private
     */
    _download() {
        let defered = q.defer();
        let promise = defered.promise;
        let _error_not_found = this._error_not_found;
        this._api.get(this._composeUrl(), undefined, this._getExtraHeaders(), this._getUrlParameters())
            .then((req) => {
                if (req.statusCode === 204) {
                    defered.reject({
                        data: _error_not_found,
                        statusCode: HttpStatus.NOT_FOUND
                    });
                } else {
                    defered.resolve({
                        data: req,
                        statusCode: req.statusCode
                    });
                }
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }

}