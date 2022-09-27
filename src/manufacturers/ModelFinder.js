'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';
import q from 'q';
import HttpStatus from 'http-status-codes';

/**
 *   This class allow make get request to hardware models resource into Opengate North API.
 */
export default class ModelFinder extends ProvisionGenericFinder {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'models', 'model', 'Model not found');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _composeUrl() {
        return this._baseUrl + "/" + this._identifier + (this._mediaIdentifier? "/media/" + this._mediaIdentifier + '?format=raw': '');
    }

    /**
     * Download a specific model by its id. This execute a GET http method
     * @test
     *   ogapi.newModelFinder().findById('modelname').then().catch();
     * @param {string} identifier - model name .
     * @return {Promise} 
     */
    findById(identifier) {
        this._identifier = identifier;
        return this._execute();
    }

    /**
     * Download a specific model media by its ids. This execute a GET http method
     * @test
     *   ogapi.newModelFinder().findMediaById('modelname').then().catch();
     * @param {string} identifier - model name .
     * @return {Promise} 
     */
    findMediaById(modelId, mediaIdentifier) {
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
