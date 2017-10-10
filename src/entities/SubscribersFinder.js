'use strict';

import EntityFinder from './EntityFinder';

/**
 *   This class allow make get request to subscribers provisioned resource into Opengate North API.
 */
export default class SubscribersFinder extends EntityFinder {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'organizations', 'subscriber', 'Subscriber not found');
    }

}