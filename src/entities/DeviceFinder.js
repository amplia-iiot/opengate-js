'use strict';

import EntityFinder from './EntityFinder';

/**
 * This class allows you to make GET requests to the provisioned device resource in the OpenGate North API.
 */
export default class DeviceFinder extends EntityFinder {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'device', 'Device not found');
    }
}
