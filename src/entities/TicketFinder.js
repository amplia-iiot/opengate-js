'use strict';

import EntityFinder from './EntityFinder';

/**
 * This class allows you to make GET requests to the provisioned ticket resource in the OpenGate North API.
 */
export default class TicketFinder extends EntityFinder {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'ticket', 'Ticket not found', 'tickets');
    }
}