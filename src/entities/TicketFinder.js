'use strict';

import EntityFinder from './EntityFinder';

/**
 *   This class allow make get request to ticket provisioned resource into Opengate North API.
 */
export default class TicketFinder extends EntityFinder {

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'ticket', 'Ticket not found', 'tickets');
    }
}