'use strict';

import FlattenedSearchBuilder from './FlattenedSearchBuilder'
import FieldFinder from '../../util/searchingFields/FieldFinder'

const BASE_URL = '/devices';
/**
 * Defined a search over Devices	
 * @example ogapi.devicesSearchBuilder()
 */
export default class DevicesSearchBuilder extends FlattenedSearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, BASE_URL));
        this._url = BASE_URL;
    }

    /**
     * The response will only have a summary information 
     * @example
     *	ogapi.devicesSearchBuilder().summary() 
     * @return {DevicesSearchBuilder} 
     */
    summary() {
        this._url = this._url + '/summary';

        return this;
    }

    _buildFilter() {
        let finalFilter = {
            "and": [{
                "exists": {
                    "provision.device.identifier": true
                }
            }]
        };

        if (this._builderParams.filter && Object.keys(this._builderParams.filter).length > 0) {
            let filter = this._builderParams.filter;
            if (typeof filter._filterTemplate !== "undefined") {
                //return filter._filterTemplate;
                finalFilter["and"].push(filter._filterTemplate.filter);
            } else {
                finalFilter["and"].push(filter);
            }
        }

        return {
            filter: finalFilter
        };
    }
}