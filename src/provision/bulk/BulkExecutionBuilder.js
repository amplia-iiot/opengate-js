'use strict';

import BaseProvision from '../BaseProvision';
import q from 'q';
export const TYPES = {
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

/**
 * This builder give you the necessary tools to create a bulk executions using our OpenGate REST
 */
export default class BulkExecutionBuilder extends BaseProvision {

    /**
     * @param {InternalOpenGateAPI} ogapi - required field. This is ogapi instance
     * @param {string} organization - required field. This is the organization name
     * @param {string} processorId - required field. This is the provision processor use for bulk provision
     * @param {number} [timeout] - timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception
     */
    constructor(ogapi, organization, processorId, timeout) {
        super(ogapi, undefined, timeout, ['organization', 'processorId']);
        this._timeout = timeout;
        this._organization  = organization;
        this._processorId = processorId;
        this._resource = 'provisionProcessors/provision/organizations/' + organization + '/' + processorId + '/'

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
     *  ogapi.newBulkExecutionBuilder('orgname', 'processorId', 10000).plan(rawFile, extension)
     *  ogapi.newBulkExecutionBuilder('orgname', 'processorId', 10000).plan(rawFile, extension, numberOfEntriesToProcess)
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
        this._setExtraHeaders({
            'accept': 'application/json'
        });
        return this._executeOperation(rawFile);
    }

    /**
     * Do a bulk using specific Provision Processor.
     * @example 
     *  ogapi.newBulkExecutionBuilder('orgname', 'processorId', 10000).bulk(rawFile, extension)
     * @param {File} rawFile - File with data
     * @param {string} [extension] - File format
     */
     bulk(rawFile, extension) {
        this._extension = TYPES[extension]
        if(typeof this._extension !== 'string')
            throw new Error('Parameter extension must be a string (xls or xlsx) and cannot be empty')
        this._type = 'bulk'
        this._setExtraHeaders({
            'accept': this._extension
        });
        return this._executeOperation(rawFile);
    }
    _executeOperation(rawFile) {
        let form;
            if (typeof rawFile !== 'string') {
                form = new FormData();
                const processorBulkFile = new Blob([rawFile ], {
                    type: this._extension
                });
                form.append('processorBulkFile', processorBulkFile);
            } else {
                form = {};
                form.processorBulkFile = rawFile;
            }
            this._setExtraHeaders({
                'Content-Type': 'multipart/form-data'
            })

        const defer = q.defer();
        
        var petitionUrl = this._buildURL();
        //url, formData, events, timeout, headers, parameters
        this._ogapi.Napi.post_multipart(petitionUrl, form, {}, this._timeout, this._getExtraHeaders(), this._getUrlParameters())
            .then((response) => {
                let statusCode = response.statusCode;
                switch (statusCode) {
                    case 200:{
                        const resultQuery = response.text != "" ? JSON.parse(response.text) : {};
                        const _statusCode = response.status;
                        defer.resolve({
                            data: resultQuery,
                            statusCode: _statusCode
                        });
                        break
                    }
                    case 201:{
                        const _statusCode = response.status;
                        const location = response.location || response.headers.location || response.header.location
                        defer.resolve({
                            location: location,
                            statusCode: _statusCode
                        });
                        break
                    }
                    case 204:
                        defer.resolve(response);
                        break
                    default:
                        defer.reject({
                            errors: response.data.errors,
                            statusCode: response.statusCode
                        });
                        break
                }
            })
            .catch((error) => {
                defer.reject(error);
            });
        return defer.promise;
    }
}