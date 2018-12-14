'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';

import q from 'q';
import HttpStatus from 'http-status-codes';

import {
    MIME_TYPES_ENUM
} from './MIME_TYPES_ENUM';

/**
 *   This class allow make get request to certificate resource into Opengate North API.
 */
export default class CertificateFinder extends ProvisionGenericFinder {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'security/certificates', 'certificate', 'Certificate not found');
    }

    /**
     * Download a specific certificate by id. This execute a GET http method
     * @test
     *   ogapi.newCertificateFinder().findById('xxx-xx-xxx-xxx').then().catch();
     * @param {string} id - Id of the certificate.
     * @return {Promise} 
     */
    findById(id) {
        this._id = id;
        return this._execute();
    }

    /**
     * @return {String} This returns a string with the download URL of the request.
     * @private
     */
    _downloadUrl() {
        this._setUrlParameters({
            format: this._type
        });
        return this._composeUrl();
    }

    /**
     * Download a certificate using id and in a specific format. This execute a GET http method
     * @test
     *   ogapi.newCertificateFinder().findByIdAndType('xxx-xx-xxx-xxx', 'mimetype').then().catch();
     * @param {string} id - Id of the certificate.
     * @param {string} mimetype - Certificate format mimetype.
     * @return {Promise} 
     */
    findByIdAndFormat(id, mimetype) {
        let not_found = '';
        let found = MIME_TYPES_ENUM.find(function (mime_type) {
            return mime_type == this;
        }, mimetype);
        if (typeof found === "undefined") {
            not_found = mimetype;
        }

        if (not_found !== '') {
            throw new Error("Parameter mimetype is not allowed. Parameter value <'" +
                JSON.stringify(not_found) + "'>, mimetype allowed <'" + JSON.stringify(MIME_TYPES_ENUM) + "'>");
        }

        this._id = id;

        this._type = mimetype;

        return this._download();
    }


    /**
     * @return {Promise}* @private
     */
    _download() {
        let defered = q.defer();
        let promise = defered.promise;
        let _error_not_found = this._error_not_found;
        this._api.get(this._downloadUrl(), undefined, this._getExtraHeaders(), this._getUrlParameters())
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