'use strict';

import BaseProvision from '../BaseProvision';
import q from 'q';
export const TYPES = {
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

/**
 * This builder give you the necessary tools to create a bulk with provision processors using our OpenGate REST
 */
export default class BulkProcessorBuilder extends BaseProvision {

    /**
     * @param {InternalOpenGateAPI} ogapi - required field. This is ogapi instance
     * @param {string} organization - required field. This is the organization name
     * @param {string} processorId - required field. This is the provision processor use for bulk provision
     * @param {number} [timeout] - timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception
     */
    constructor(ogapi, organization, processorId, timeout) {
        super(ogapi, '/provisionProcessors/provision/organizations/' + organization + '/' + processorId + '/', tiemout, ['organization', 'processorId']);
        this._timeout = timeout;
        this._resource = resource;
        this._organization  = organization;
        this._processorId = processorId;

    }

    _composeElement() {
        return this;
    }

    _buildURL() {
        return this._resource + this._type;
    }

    /**
     * Instead of creating a bulk process, return the provision process planning for specified entries. This is is synch process that does not cause changes in the database
     * @example 
     *  ogapi.newBulkProcessorBuilder('orgname', 'processorId', 10000).plan(rawFile, extension)
     *  ogapi.newBulkProcessorBuilder('orgname', 'processorId', 10000).plan(rawFile, extension, numberOfEntriesToProcess)
     * @param {string|Blob} rawFile - File with format string or Blob 
     * @param {string} [extension] - File format
     * @param {number} [numberOfEntriesToProcess] - Number of entries to be processed.
     */
    plan(rawFile, extension, numberOfEntriesToProcess) {
        if(typeof extension !== 'string')
            throw new Error('Parameter extension must be a string (xls or xlsx) and cannot be empty')
        this._extension = TYPES[extension]
        this._setUrlParameters({
            numberOfEntriesToProcess: numberOfEntriesToProcess || 1
        });
        this._type = 'plan'
        return this._executeOperation(rawFile);
    }

    /**
     * Do a bulk using specific Provision Processor.
     * @example 
     *  ogapi.newBulkProcessorBuilder('orgname', 'processorId', 10000).bulk(rawFile, extension)
     * @param {string|Blob} rawFile - File with format string or Blob 
     * @param {string} [extension] - File format
     */
     bulk(rawFile, extension) {
        this._extension = TYPES[extension]
        if(typeof this._extension !== 'string')
            throw new Error('Parameter extension must be a string (xls or xlsx) and cannot be empty')
        this._type = 'bulk'
        return this._executeOperation(rawFile);
    }
    _executeOperation(rawFile) {
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