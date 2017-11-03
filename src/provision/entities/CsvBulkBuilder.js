'use strict';

import BulkBuilder from './BulkBuilder';

/**
 * Csv builder. This builder give you the necessary tools to create a csv bulk using our OpenGate REST.
 */
export default class CsvBulkBuilder extends BulkBuilder {

    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - this is the organization name where entities will be created
     * @param {!extension} [extension] - extension header to send
     */
    constructor(ogapi, organization) {
        super(ogapi, 'provision/organizations/' + organization + '/bulk/entities?action=#actionName#' , 'text/plain');
    }

}