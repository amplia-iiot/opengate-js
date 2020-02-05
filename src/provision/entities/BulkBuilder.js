'use strict';

import BaseProvision from '../BaseProvision';
import q from 'q';


/**
 * This class allow set simple values.
 */
export default class BulkBuilder extends BaseProvision {

    /**
     * @param {InternalOpenGateAPI} ogapi - required field. This is ogapi instance
     * @param {resource} resource - required field. This is the resource used for the bulk provision
     * @param {extension} extension - required field. Type of file to send
     * @param {number} [timeout] - timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception
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
     *  Execute the bulk creation operation
     * @example 
     *  ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).create(rawFile)
     *  ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).create(new Blob(), true)
     * @param {string|Blob} rawFile - File with format string or Blob 
     * @param {boolean} [csv_response] - true if you want a response on format csv. False or null if you want a response on format json
     */
    create(rawFile, csv_response) {
        return this._executeOperation(rawFile, 'CREATE', csv_response);
    }

    /**
     *  Execute the bulk delete operation
     * @example 
     *  ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).delete(rawFile)
     *  ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).delete(new Blob(), true)
     * @param {string|Blob} rawFile - File with format string or Blob 
     * @param {boolean} [csv_response] - true if you want a response on format csv. False or null if you want a response on format json
     */
    delete(rawFile, csv_response) {
        return this._executeOperation(rawFile, 'DELETE', csv_response);
    }

    /**
     *  Execute the bulk delete full operation
     * @example 
     *  ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).deleteAll(rawFile)
     *  ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).deleteAll(new Blob(), true)
     * @param {string|Blob} rawFile - File with format string or Blob 
     * @param {boolean} [csv_response] - true if you want a response on format csv. False or null if you want a response on format json
     */
    deleteAll(rawFile, csv_response) {
        return this._executeOperation(rawFile, 'DELETE&full=true', csv_response);
    }

    /**
     *  Execute the bulk update operation
     * @example 
     *  ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).update(rawFile)
     *  ogapi.newCsvBulkBuilder('orgname', 'entities', 10000).update(new Blob(), true)
     * @param {string|Blob} rawFile - File with format string or Blob 
     * @param {boolean} [csv_response] - true if you want a response on format csv. False or null if you want a response on format json
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

        var petitionUrl = this._buildURL();
        //url, formData, events, timeout, headers, parameters
        if (csv_response)
            this._setExtraHeaders({
                'accept': 'text/plain'
            });
        this._setUrlParameters({
            action: action
        });
        this._ogapi.Napi.post_multipart(petitionUrl, form, {}, this._timeout, this._getExtraHeaders(), this._getUrlParameters())
            .then((response) => {
                let statusCode = response.statusCode;
                if (statusCode === 200 || statusCode === 201) {
                    if (csv_response && !response.location) {
                        //Se hace esto para que la respuesta sea igual que al searching con resultado en csv
                        let resultQuery = response;
                        let statusCode = response.statusCode;
                        defer.resolve({
                            data: resultQuery,
                            statusCode: statusCode
                        });
                    } else
                        defer.resolve(response);
                } else if (statusCode === 204) {
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