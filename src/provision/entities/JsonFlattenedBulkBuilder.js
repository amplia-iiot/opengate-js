'use strict';

import BulkBuilder from './BulkBuilder';

/**
 * Json builder. This builder give you the necessary tools to create a json bulk using our OpenGate REST.
 */
export default class JsonFlattenedBulkBuilder extends BulkBuilder {

    /**
     * @param {InternalOpenGateAPI} ogapi - required field. This is ogapi instance
     * @param {string} organization - required field. This is the organization name where entities will be created, updated or deleted
     * @param {resource} resource - required field. This is the resource used for the bulk provision
     * @param {number} [timeout] - timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception
     * @param {boolean} [async] - forces async execution for the bulk operation
     */
    constructor(ogapi, organization, resource, timeout, async) {
        super(ogapi, 'provision/organizations/' + organization + '/bulk/' + (async ? 'async' : resource.toLowerCase()), 'application/json', timeout);

        this._setUrlParameters({
            flattened: true,
        });
        if (async) {
            this._setUrlParameters({
                flattened: true,
                type: resource.toUpperCase()
            });
        }
    }

}