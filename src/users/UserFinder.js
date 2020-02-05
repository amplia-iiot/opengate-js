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

    /**
     * Find a specific user with apiKey by a email and password. This execute a GET http method
     * @test
     *  ogapi.newUserFinder().findByEmail('mysuer@amplia.es', 'pass').then().catch();
     * @param {string} email - Email of the user.
     * @param {string} password - password of the user.
     * @return {Promise}
     */
    findByEmailAndPassword(email, password) {
        this._id = email;
        this._setExtraHeaders({ 'X-ApiPass': password });
        return this._execute();
    }

}