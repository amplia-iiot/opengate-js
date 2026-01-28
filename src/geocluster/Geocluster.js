'use strict';

import q from 'q';
import BaseProvision from '../provision/BaseProvision';
import checkType from '../util/formats/check_types'
/**
 * This is a base object that contains all you can do about geocluster.
 */

export default class Geocluster extends BaseProvision {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/geocluster", undefined, 'identifier');
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

    withIdentifier(identifier) {
        checkType._checkStringAndLength(identifier, 50, 'identifier');
        this._identifier = identifier;
        return this;
    }
    _composeElement() {
        this._resource = 'provision/geocluster/' + this._identifier + '/clustering';
    }

    _composeElementUpdate() {
        let geocluster = super._composeUpdateElement();
        return geocluster;
    }
    update() {
        var defered = q.defer();
        var promise = defered.promise;
        this._ogapi.Napi.put(this._buildURL(), this._composeElementUpdate(), undefined, this._getExtraHeaders(), this._getUrlParameters())
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


}