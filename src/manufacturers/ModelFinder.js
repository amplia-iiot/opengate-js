'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';
import q from 'q';
import HttpStatus from 'http-status-codes';

// import { MANUFACTURERS_RESOURCE } from './Manufacturer'; 
import { MODELS_RESOURCE } from './Model';


/**
 *   This class allow make get request to hardware models resource into Opengate North API.
 */
export default class ModelFinder extends ProvisionGenericFinder {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'manufacturers', undefined, 'Model not found');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + "/" + this._manufacturer + MODELS_RESOURCE + (this._identifier? "/" + this._identifier + (this._media? "/media" + (this._mediaIdentifier? "/" + this._mediaIdentifier + '?format=raw': '') : ""):"");
    }

    /**
     * Download all models from a manufacturer. This execute a GET http method
     * @test
     *   ogapi.newModelFinder().findByManufacturer('manufacturer').then().catch();
     * @param {string} manufacturer - manufacturer id .
     * @return {Promise} 
     */
    findByManufacturer(manufacturer) {
        this._manufacturer = manufacturer;
        return this._execute();
    }

    /**
     * Download a specific model by its id. This execute a GET http method
     * @test
     *   ogapi.newModelFinder().findByManufacturerAndId('manufacturer', 'modelname').then().catch();
     * @param {string} manufacturer - manufacturer id .
     * @param {string} identifier - model name .
     * @return {Promise} 
     */
    findByManufacturerAndId(manufacturer, identifier) {
        this._manufacturer = manufacturer;
        this._identifier = identifier;
        return this._execute();
    }

    /**
     * Download a specific model media by its ids. This execute a GET http method
     * @test
     *   ogapi.newModelFinder().findMediasByManufacturerAndModel('manufacturer', 'modelId').then().catch();
     * @param {string} manufacturer - manufacturer id .
     * @param {string} identifier - model identifier .
     * @return {Promise} 
     */
    findMediasByManufacturerAndModel(manufacturer, identifier) {
        this._media = true
        this._manufacturer = manufacturer;
        this._identifier = identifier;
        return this._execute();
    }

    /**
     * Download a specific model media by its ids. This execute a GET http method
     * @test
     *   ogapi.newModelFinder().findMediaByManufacturerAndModelAndId('modelId', 'mediaIdentifier').then().catch();
     * @param {string} manufacturer - manufacturer id .
     * @param {string} modelId - model identifier .
     * @param {string} mediaIdentifier - media identifier.
     * @return {Promise} 
     */
    findMediaByManufacturerAndModelAndId(manufacturer, modelId, mediaIdentifier) {
        this._media = true
        this._manufacturer = manufacturer;
        this._identifier = modelId;
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
