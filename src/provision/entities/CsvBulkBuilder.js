'use strict';

import BulkBuilder from './BulkBuilder';

/**
 * Csv builder. This builder give you the necessary tools to create a csv bulk using our OpenGate REST.
 */
export default class CsvBulkBuilder extends BulkBuilder {

    /**
     * @param {InternalOpenGateAPI} ogapi - required field. This is ogapi instance
     * @param {string} organization - required field. This is the organization name where entities will be created, updated or deleted
     * @param {resource} resource - required field. This is the resource used for the bulk provision
     * @param {number} [timeout] - timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception
     */
    constructor(ogapi, organization, resource, timeout) {
        super(ogapi, 'provision/organizations/' + organization + '/bulk/' + resource + '?action=#actionName#', 'text/plain', timeout);
    }
}