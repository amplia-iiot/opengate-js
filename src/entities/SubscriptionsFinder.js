'use strict';

import EntityFinder from './EntityFinder';

/**
 *   This class allow make get request to subscription provisioned resource into Opengate North API.
 */
export default class SubscriptionsFinder extends EntityFinder {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'subscription', 'Subscription not found');
    }
}