'use strict';


import BaseProvision from '../provision/BaseProvision';
import checkType from '../util/formats/check_types'
/**
 * This is a base object that contains all you can do about geocluster.
 */

export default class Geocluster extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, undefined, ['identifier']);
    }

    _buildURL() {
        let url = 'provision/geocluster/' + this._identifier + '/clustering';
        return url;
    }

    /**
     * Set the identifier attribute
     * @param {string} identifier - required field
     * @return {Geocluster}
     */

    withGeoclusterid(identifier) {
        checkType._checkString(identifier, 50, 'identifier');
        this._identifier = identifier;
        return this;
    }

    _composeElement() {
        this._resource = 'provision/geocluster/' + this._identifier + '/clustering';
    }

    /**
 * This invoke a request to OpenGate North API and the callback is managed by promises
 * This function updates a entity of provision
 * @return {Promise}
 * @property {function (result:object, statusCode:number)} then - When request it is OK
 * @property {function (error:string)} catch - When request it is NOK
 * @example
 *  ogapi.regenerateGeocluster().update()
 */
    update() {
        var defered = q.defer();
        var promise = defered.promise;

        this._ogapi.Napi.put(this._buildURL(), this._composeUpdateElement(), this._timeout, this._getExtraHeaders(), this._getUrlParameters())
            .then((res) => {
                if (res.statusCode === 200) {
                    defered.resolve({
                        statusCode: res.statusCode
                    });
                } else if (res.status === 200) {
                    defered.resolve({
                        statusCode: res.status
                    });
                } else {
                    defered.reject({
                        errors: res.errors,
                        statusCode: res.statusCode
                    });
                }
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }

    _composeUpdateElement() {
        let geocluster = super._composeUpdateElement();
        return geocluster;
    }

}