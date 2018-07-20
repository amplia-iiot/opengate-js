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

    /**
     * @param {!string|!Blob} rawFile - file with format string or Blob 
     * @param {boolean} csv_response - true if you want a response on format csv. False or null if you want a response on format json
     */
    create(rawFile, csv_response) {
        return this._executeOperation(rawFile, 'CREATE', csv_response);
    }

    /**
     * 
     * @param {!string|!Blob} rawFile - file with format string or Blob 
     * @param {boolean} csv_response - true if you want a response on format csv. False or null if you want a response on format json
     */
    delete(rawFile, csv_response) {
        return this._executeOperation(rawFile, 'DELETE', csv_response);
    }

    /**
     * 
     * @param {!string|!Blob} rawFile - file with format string or Blob 
     * @param {boolean} csv_response - true if you want a response on format csv. False or null if you want a response on format json
     */
    deleteAll(rawFile, csv_response) {
        return this._executeOperation(rawFile, 'DELETE&full=true', csv_response);
    }

    /**
     * 
     * @param {!string|!Blob} rawFile - file with format string or Blob 
     * @param {boolean} csv_response - true if you want a response on format csv. False or null if you want a response on format json
     */
    update(rawFile, csv_response) {
        return this._executeOperation(rawFile, 'UPDATE', csv_response);
    }



    _executeOperation(rawFile, action, csv_response) {
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
        this._ogapi.Napi.post_multipart(petitionUrl, form, {}, this._timeout, csv_response ? {
                'accept': 'text/plain'
            } : null)
            .then((response) => {
                let statusCode = response.statusCode;
                if (statusCode === 200) {
                    if (csv_response) {
                        //Se hace esto para que la respuesta sea igual que al searching con resultado en csv
                        let resultQuery = response;
                        let statusCode = response.statusCode;
                        defer.resolve({
                            data: resultQuery,
                            statusCode: statusCode
                        });
                    } else
                        defer.resolve(response);
                } else {
                    defer.reject({
                        errors: response.data.errors,
                        statusCode: response.statusCode
                    });
                }
            })
            .catch((error) => {
                defer.reject(error);
            });
        return defer.promise;
    }
}