'use strict';

import HttpStatus from 'http-status-codes';
import BaseProvision from '../BaseProvision';
import q from 'q';

const ERROR_VALUE_NOT_ALLOWED = 'The value is not allowed. The value should be formatted as follows: ';
const ERROR_DATASTREAM_NOT_ALLOWED = 'Datastream is not allowed.';
const ERROR_ORGANIZATION = 'Parameters organization must be defined';


/**
 * This class allow set simple values.
 */
export default class BulkBuilder extends BaseProvision {

    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - this is the organization where can be create/delete/update the entity
     */
    constructor(ogapi, resource, extension, timeout) {
        super(ogapi, resource);
        this._timeout = timeout;
        this._resource = resource;
        this._extension = extension;

    }


    _composeElement() {
        return this;
    }

    _buildURL() {
        return this._resource;
    }


    create(rawFile) {
        return this._executeOperation(rawFile, 'CREATE');
    }

    delete(rawFile) {
        return this._executeOperation(rawFile, 'DELETE');
    }

    deleteAll(rawFile) {
        return this._executeOperation(rawFile, 'DELETE&full=true');
    }

    update(rawFile) {
        return this._executeOperation(rawFile, 'UPDATE');
    }



    _executeOperation(rawFile, action) {
        let form;
        if (typeof rawFile !== 'string') {
            form = {};
            if (rawFile) {
                let bulkFile = new Blob([rawFile]);
                form.bulkFile = bulkFile;
            }
        } else {
            form = {};

            if (rawFile) {
                form.bulkFile = rawFile;
            }
        }
        let defer = q.defer();
        form.ext = this._extension;

        var petitionUrl = this._buildURL().replace("#actionName#", action);
        this._ogapi.Napi.post_multipart(petitionUrl, form, {}, this._timeout)
            .then((response) => {
                let statusCode = response.statusCode;
                if (statusCode === 200) {
                    defer.resolve(response);
                } else {
                    defer.reject({ errors: response.data.errors, statusCode: response.statusCode });
                }
            })
            .catch((error) => {
                defer.reject(error);
            });
        return defer.promise;
    }
}