'use strict';

import FlattenedSearchBuilder from './FlattenedSearchBuilder'
import FieldFinder from '../../util/searchingFields/FieldFinder'

const BASE_URL = '/devices';
/**
 * Defined a search over Subscribers	
 * @example ogapi.subscribersSearchBuilder()
 */
export default class SubscribersSearchBuilder extends FlattenedSearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, '/subscribers'));
        this._url = BASE_URL;
    }

    _buildFilter() {
        let finalFilter = {
            "and": [{
                "neq": {
                    "provision.devices.communicationsModule[].subscriber.identifier": null
                }
            }]
        };

        if (this._builderParams.filter && Object.keys(this._builderParams.filter).length > 0) {
            let filter = this._builderParams.filter;
            if (typeof filter._filterTemplate !== "undefined") {
                //return filter._filterTemplate;
                finalFilter["and"].push(filter._filterTemplate);
            } else {
                finalFilter["and"].push(filter);
            }
        }

        return {
            filter: finalFilter
        };
    }
}