'use strict';

import PreFilteredSearchBuilder from './PreFilteredSearchBuilder'
import FieldFinder from '../../util/searchingFields/FieldFinder'

const BASE_URL = '/devices';
/**
 * Defined a search over Subscriptions	
 * @example ogapi.subscriptionsSearchBuilder()
 */
export default class SubscriptionsSearchBuilder extends PreFilteredSearchBuilder {
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
                "or": []
            }]
        };

        if (this._provisioned || !this._collected) {
            finalFilter.and[0].or.push({
                "exists": {
                    "provision.device.communicationModules[].subscription.identifier": true
                }
            });
        }

        if (this._collected || !this._provisioned) {
            finalFilter.and[0].or.push({
                "exists": {
                    "device.communicationModules[].subscription.identifier": true
                }
            });
        }

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