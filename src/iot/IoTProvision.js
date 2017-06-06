'use strict';

import BaseProvision from '../provision/BaseProvision'

export const IOT_URL = '/iot';

/**
 * This is an abstract class, it must be extended to another class that defines the different actions of a specific IoT provision.
 * This class is responsible for managing the request to execute Norte OpenGate API
 */
export default class IoTProfiles extends BaseProvision {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} resource - this is a base url resource
    */
    constructor(ogapi, resource) {
        super(ogapi, IOT_URL + resource);
    }
}