'use strict';

import EntityFinder from './EntityFinder';

/**
 *   This class allow make get request to device provisioned resource into Opengate North API.
 */
export default class DeviceFinder extends EntityFinder {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'organizations', 'device', 'Device not found');
    }
}
