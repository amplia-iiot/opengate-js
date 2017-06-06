'use strict';

import SearchWithSummaryBuilder from './SearchWithSummaryBuilder'
import EntitySearch from '../EntitySearch'

/**
 * Defined a search over entities. Devices/Subscriptions/Subscribers/CommunicationModules
 */
export default class EntitySearchBuilder extends SearchWithSummaryBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     * 	@param {!string} url - Base url of Opengate North API resource
     */
    constructor(parent, url, fieldFinder) {
        super(parent, {
            onProvisioned: '/provision',
            onCollected: '/collection'
        }, fieldFinder);
        if (this.constructor === EntitySearchBuilder) {
            throw new Error("Cannot construct Abstract instances directly");
        }
        this._url = url;
    }

    /**
     * Add provisioned source
     * @return EntitySearchBuilder
     */
    onProvisioned() {
        return super.onProvisioned();
    }

    /**
     * Add collected source
     * @return EntitySearchBuilder
     */
    onCollected() {
        return super.onCollected();
    }

    _buildUrl() {
        this._checkConstraintRoutes(true);
        if (this._builderParams.onProvisioned && this._builderParams.onCollected) {
            //Do nothing. Because if onProvision and onCollected is activated the url must be /devices
        } else if (this._builderParams.onProvisioned) {
            this._url = this._url + this._routes.onProvisioned;
        } else {
            this._url = this._url + this._routes.onCollected;
        }

        return super._buildUrl();
    }

    /**
     * Build a instance of Search 
     *
     * @example
     *	ogapi.devicesSearchBuilder().onProvisioned().build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {Search} 
     */
    build() {
        return new EntitySearch(this._parent,
            this._buildUrl(),
            this._buildFilter(),
            this._buildLimit(),
            this._buildSort(),
            this._builderParams.timeout);
    }
}