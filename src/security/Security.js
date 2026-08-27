'use strict';

import BaseProvision from '../provision/BaseProvision';

/**
 * This extends BaseProvision and contains everything you can do with Security.
 * @extends {BaseProvision}
 */
export default class Security extends BaseProvision {

    /**
     * Constructor
     * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     * @param {!string} url - this define a specific resource to make the provision
     */
    constructor(ogapi, url, timeout) {
        super(ogapi, "/security" + (typeof url === "undefined" ? "" : url), timeout);
    }

}