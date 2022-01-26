'use strict';

import GenericFinder from '../GenericFinder';

import q from 'q';
import HttpStatus from 'http-status-codes';
export const MIME_TYPES_ENUM = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

/**
 *   This class allow make get request to bulk executions resource into Opengate North API.
 */
export default class BulkExecutionFinder extends GenericFinder {

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
        return this._baseUrl + '/' + this._organization + '/bulk/' + this._id + (this._details ? "/details" : '');
    }
    /**
     * Download a specific entity by its organization and id. This execute a GET http method
     * @test
     *   ogapi.newBulkExecutionFinder().findByOrganizationAndId('orgname', xxx-xx-xxx-xxx').then().catch();
     *   ogapi.newBulkExecutionFinder().findByOrganizationAndId('orgname', xxx-xx-xxx-xxx', true).then().catch();
     * @param {string} organization - organization.
     * @param {string} id - bulk id.
     * @param {string} mimetype - Format of file when get the result details of previously created bulk process.
     * @return {Promise} 
     */
     findByOrganizationAndId(organization, id, mimetype) {
         this._organization = organization;
         this._id = id;
         this._details = false

         if (mimetype) {
             let not_found = '';
             let found = MIME_TYPES_ENUM.find(function (mime_type) {
                 return mime_type == this;
             }, mimetype)
             if (typeof found === "undefined") {
                 not_found = mimetype;
             }
             if (not_found !== '') {
                 throw new Error("Parameter mimetype is not allowed. Parameter value <'" +
                     JSON.stringify(not_found) + "'>, mimetype allowed <'" + JSON.stringify(MIME_TYPES_ENUM) + "'>");
             }
             this._details = true
             this._setExtraHeaders({
                 'accept': mimetype
             });
             return this._download();
         }
         this._details = false
         this._setExtraHeaders({
             'accept': undefined
         });
         return this._execute();
     }

    /**
     * @return {Promise}* @private
     */
    _download() {
        let defered = q.defer();
        let promise = defered.promise;
        let _error_not_found = this._error_not_found;
        this._api.get(this._composeUrl(), undefined, this._getExtraHeaders(), this._getUrlParameters(), true)
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