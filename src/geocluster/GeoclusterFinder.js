'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';

/**
 *   This class allow make get request to user resource into Opengate North API.
 */
export default class GeoclusterFinder extends ProvisionGenericFinder {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'geocluster', 'geocluster', 'Geocluster not found');
    }

    /**
     * Find a specify geocluster by an identifier. This execute a GET http method
     * @test
     *   ogapi.newGeoclusterFinder().findById('entities.default').then().catch();
     * @param {string} id - Identifier of the geocluster.
     * @return {Promise} 
     */
    findById(id) {
        this._id = id;
        this._setUrlParameters()
        return this._execute();
    }

    /**
     * Find all available geocluster. This execute a GET http method
     * @test
     *   ogapi.newGeoclusterFinder().findAll().then().catch();
     * @return {Promise} 
     */
    findAll() {
        this._id = undefined;
        this._setUrlParameters()
        return this._execute();
    }

    /**
 * Find features inside the coordinates. This execute a GET http method
 * @test
 *   ogapi.newGeoclusterFinder().findFeatures('entities.default',{zoom:3,topRight:[1,2],bottomLeft:[2,3]}).then().catch();
 * @param {string} id - Identifier of the geocluster.
 * @param {Object} coordinates - square defined by the coordinates and the zoom used to find the inside features .
 * @return {Promise} 
 */
    findFeatures(id, { zoom, topRight, bottomLeft }) {
        this._id = id;
        this._setUrlParameters({ zoom, topRight, bottomLeft })
        return this._execute();
    }

    /**
 * @return {String} This returns a string with the URL of the request.
 * @private
 */
    _composeUrl() {
        if (!this._id) return this._baseUrl
        if (!this._getUrlParameters()) return this._baseUrl + "/" + this._id;
        return this._baseUrl + "/" + this._id + "/view";
    }

}