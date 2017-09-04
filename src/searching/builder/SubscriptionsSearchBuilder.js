'use strict';

import FlattenedSearchBuilder from './FlattenedSearchBuilder'
import FieldFinder from '../../util/searchingFields/FieldFinder'

const BASE_URL = '/devices';
/**
 * Defined a search over Subscriptions	
 * @example ogapi.subscriptionsSearchBuilder()
 */
export default class SubscriptionsSearchBuilder extends FlattenedSearchBuilder {
    /**
     *	@param {!InternalOpenGateAPI} parent - Instance of our InternalOpenGateAPI
     */
    constructor(parent) {
        super(parent, {}, new FieldFinder(parent, '/subscriptions'));
        this._url = BASE_URL;
    }

    _buildFilter() {
        let finalFilter = {
            "and": [{
                "exists": {
                    "provision.device.communicationModules[].subscription.identifier": true
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