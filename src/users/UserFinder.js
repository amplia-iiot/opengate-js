'use strict';

import ProvisionGenericFinder from '../ProvisionGenericFinder';

/**
 *   This class allow make get request to user resource into Opengate North API.
 */
export default class UserFinder extends ProvisionGenericFinder {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, 'users', 'user', 'User not found');
    }

    /**
     * Find a specify user by a email. This execute a GET http method
     * @test
     *   ogapi.newUserFinder().findByEmail('myuser@amplia.es').then().catch();
     * @param {string} email - Email of the user.
     * @return {Promise} 
     */
    findByEmail(email) {
        this._id = email;
        return this._execute();
    }
    
}
