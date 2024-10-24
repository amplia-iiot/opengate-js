'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';
import q from 'q';
import HttpStatus from 'http-status-codes';

/**
 *   This class allow make get request to hardware manufacturers resource into Opengate North API.
 */
export default class ManufacturerFinder extends ProvisionGenericFinder {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'manufacturers', 'manufacturer', 'Manufacturer not found');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + (this._identifier ? "/" + this._identifier + (this._media? "/media" + (this._mediaIdentifier? "/" + this._mediaIdentifier + '?format=raw': '') : ''):'');
    }

    /**
     * Download a specific manufacturer by its id. This execute a GET http method
     * @test
     *   ogapi.newManufacturerFinder().findAll().then().catch();
     * @return {Promise} 
     */
    findAll() {
        return this._execute();
    }


    /**
     * Download a specific manufacturer by its id. This execute a GET http method
     * @test
     *   ogapi.newManufacturerFinder().findById('manufacturerIdentifier').then().catch();
     * @param {string} identifier - manufacturer identifier .
     * @return {Promise} 
     */
    findById(identifier) {
        this._identifier = identifier;
        return this._execute();
    }

    /**
     * Download manufacturer medias. This execute a GET http method
     * @test
     *   ogapi.newManufacturerFinder().findMedias('manufacturerId', 'mediaIdentifier').then().catch();
     * @param {string} manufacturerId - manufacturer identifier .
     * @return {Promise} 
     */
    findMedias(manufacturerId) {
        this._media = true
        this._identifier = manufacturerId;
        return this._execute();
    }

    /**
     * Download a specific manufacturer media by its ids. This execute a GET http method
     * @test
     *   ogapi.newManufacturerFinder().findMediaById('manufacturerId', 'mediaIdentifier').then().catch();
     * @param {string} manufacturerId - manufacturer identifier .
     * @param {string} mediaIdentifier - media identifier.
     * @return {Promise} 
     */
    findMediaById(manufacturerId, mediaIdentifier) {
        this._media = true
        this._identifier = manufacturerId;
        this._mediaIdentifier = mediaIdentifier;
        return this._download();
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
