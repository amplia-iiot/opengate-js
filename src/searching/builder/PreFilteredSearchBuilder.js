'use strict';

import FlattenedSearchBuilder from './FlattenedSearchBuilder'

/**
 * This is a abstract class. It is a class that extends from base to make all kind of summary search request to OpenGate North API.
 */
export default class PreFilteredSearchBuilder extends FlattenedSearchBuilder {
    /**
     * @param {!InternalOpenGateAPI} parent - this is ogapi instance
     * @param {!object} routes - this defined the routes. One of those routes must be called on Builder before call build method.
     */
    constructor(parent, routes, fieldFinder) {
        super(parent, routes, fieldFinder);
        if (this.constructor === PreFilteredSearchBuilder) {
            throw new Error("Cannot construct Abstract instances directly");
        }
    }

    /**
     * This option forces search api to add a filter of provisioned content
     * @example
     *	ogapi.subscribersSearchBuilder().provisioned() 
     * @return {PreFilteredSearchBuilder} 
     */
    provisioned() {
        this._provisioned = true;

        return this;
    }

    /**
     * This option forces search api to add a filter of collected content
     * @example
     *	ogapi.subscribersSearchBuilder().collected() 
     * @return {PreFilteredSearchBuilder} 
     */
    collected() {
        this._collected = true;

        return this;
    }

    /**
     * The search request will have this filter 
     * @example
     *  ogapi.devicesSearchBuilder().select(
     *      ogapi.newSelectBuilder().add(SE.element("provision.device.identifier", ["value"], "id"), SE.add("device.temperature.value", ["value"]))
     *  ) // Setting SelectBuilder
     *  ogapi.devicesSearchBuilder().select({
     *      "elements": [
     *          {"name": "provision.device.identifier","fields": ["value"],"alias": "id"},
     *          {"name": "device.temperature.value","fields": ["value"]}
     *      ]
     *  }) //Custom select
     * @param {!(SelectBuilder|object)} select
     * @return {SearchBuilder} 
     */
    select(select) {
        this._builderParams.select = (select || []);
        return this;
    }

}