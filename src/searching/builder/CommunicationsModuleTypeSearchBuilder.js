'use strict';

import SearchBuilder from './SearchBuilder';
import StaticSearch from '../StaticSearch';

/**
 * Defined a search over operational status catalogs    
 * @example ogapi.communicationsModuleTypeSearchBuilder()
 */
export default class CommunicationsModuleTypeSearchBuilder extends SearchBuilder {
    /**
     *  @param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {});
        this._url = '/communicationsModuleType';
        this.customFilters = {};
    }

    /**
     * Build a instance of StaticSearch 
     *
     * @example
     *   ogapi.administrativeStateSearchBuilder().filter({and:[]}).build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {StaticSearch}  
     */
    build() {
        return new StaticSearch(this._parent,
            this._buildUrl(),
            this._buildFilter(),
            this._builderParams.timeout,
            'communicationsModuleType', this.customFilters);
    }


    /**
     * Sets id to search
     *
     * @description
     * The list of types of communication modules is as follows:
     * "GENERIC", "WIFI", "EHTERNET", "BLUETOOTH", "MESH", "LOWPAN", "LTE_M", PLC", "ZIGBEE", "ADSL", "MOBILE", "NARROWBAND", "GSM", "UMTS", "CAN", "I2C", "RS232", "RS422", "RS485"
     * @example
     *  ogapi.communicationsModuleTypeSearchBuilder().withType('GENERIC').build()
     * @param {!string} communicationsModuleType - specific type
     * @throws {Error} throw error when type is not typeof string
     * @return {CommunicationsModuleTypeSearchBuilder}
     */
    withType(communicationsModuleType) {
        if (typeof communicationsModuleType !== 'string') {
            throw new Error('Parameter type must be a string');
        }

        this.customFilters.type = communicationsModuleType;
        return this;
    }


}