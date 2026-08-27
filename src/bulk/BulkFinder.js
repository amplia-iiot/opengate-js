'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';

import q from 'q';
import HttpStatus from 'http-status-codes';

/**
 * This class allows making GET requests to the bulk resource in the OpenGate North API.
 */
export default class BulkFinder extends ProvisionGenericFinder {
    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'organizations', 'bulk/async', 'Bulk not found');
        this._raw = false;
    }

    /**
     * Downloads a specific entity by its organization and id. This executes a GET HTTP method.
     * @test
     *   ogapi.newBulkFinder().findByOrganizationAndId('orgname', xxx-xx-xxx-xxx').then().catch();
     *   ogapi.newBulkFinder().findByOrganizationAndId('orgname', xxx-xx-xxx-xxx', true).then().catch();
     * @param {string} organization - entity organization .
     * @param {string} id - entity id.
     * @param {string} format - format response flag.
     * @param {string} accept - accept.
     * @return {Promise}
     */
    findByOrganizationAndId(organization, id, format, accept) {
        this._organization = organization;
        this._id = id;
        this._setUrlParameters({
            format: format
        });

        if (accept) {
            this._setExtraHeaders({
                accept: accept
            });
        }
        return this._download(true);
    }

    /**
     * @return {Promise}* @private
     */
    // _download() {
    //     let defered = q.defer();
    //     let promise = defered.promise;
    //     let _error_not_found = this._error_not_found;
    //     this._api.get(this._composeUrl(), undefined, this._getExtraHeaders(), this._getUrlParameters())
    //         .then((req) => {
    //             if (req.statusCode === 204) {
    //                 defered.reject({
    //                     data: _error_not_found,
    //                     statusCode: HttpStatus.NOT_FOUND
    //                 });
    //             } else {
    //                 defered.resolve({
    //                     data: req,
    //                     statusCode: req.statusCode
    //                 });
    //             }
    //         })
    //         .catch((error) => {
    //             defered.reject(error);
    //         });
    //     return promise;
    // }

    _composeUrl() {
        return this._baseUrl + '/' + this._organization + '/' + this._entity + '/' + this._id;
    }
}
