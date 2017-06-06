'use strict';

import SearchBuilder from './SearchBuilder';
import { IOT_URL } from '../IotSearch';
import IotSearch from '../IotSearch';
import FieldFinder from '../../util/searchingFields/FieldFinder';

const BASE_URL = '/devices';
/**
 * Defined a search over Datastreams	
 * @example ogapi.ioTDevicesSearchBuilder()
 */
export default class IoTDevicesSearchBuilder extends SearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, IOT_URL + BASE_URL));
        this._url = BASE_URL;
    }

    /**
     * Build a instance of IotSearch 
     *
     * @example
     *	ogapi.ioTDevicesSearchBuilder().filter({and:[]}).build()
     * @throws {SearchBuilderError} Throw error on url build
     * @return {IotSearch} 
     */
    build() {
        return new IotSearch(this._parent,
            this._buildUrl(),
            this._buildFilter(),
            this._buildLimit(),
            this._buildSort(),
            this._builderParams.timeout);
    }

}