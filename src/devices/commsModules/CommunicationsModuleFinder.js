'use strict';

import EntityFinder from '../EntityFinder';

/**
 *   This class allow make get request to certificate resource into Opengate North API.
 */
export default class CommunicationsModuleFinder extends EntityFinder {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'organizations', 'communicationsModule', 'Communications Module not found');
    }
}
