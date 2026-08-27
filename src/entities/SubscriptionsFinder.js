'use strict';

import EntityFinder from './EntityFinder';

/**
 * This class allows you to make GET requests to the provisioned subscription resource in the OpenGate North API.
 */
export default class SubscriptionsFinder extends EntityFinder {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'subscription', 'Subscription not found');
    }
}