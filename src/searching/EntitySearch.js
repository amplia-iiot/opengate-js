'use strict'

import Search from './Search'

/** 
 * This extends Search and it allow make request to any available resource into /entities resource at Opengate North API
 */
export default class EntitySearch extends Search {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     * @param {!string} url - this define a specific resource to make the search
     * @param {object} filter - this is the filter
     * @param {object} limit - this is the pagination about the search
     * @param {object} sort - this defined parameters to order the result of search
     */
    constructor(ogapi, url, filter, limit, sort, timeout) {
        super(ogapi, "/entities" + url, filter, limit, sort, timeout);
    }

    _appendData(data) {
        let _this = this;
        let entities = data.subscribers || data.subscriptions || data.communicationsModules || data.devices;
        if (typeof entities === "object" && typeof entities.every === "function") {
            entities.every(function(entity) {
                _this._appendEntityData(entity);
                return true;
            });
        }
    }

    _createSearch(searchBuilder, ids) {
        return searchBuilder.
        onCollected().onProvisioned().
        withTimeout(10000).
        limit(1000).
        filter(this._createFilter(ids)).
        build();
    }

    _createDatamodelSearch(id) {
        return this._ogapi.datastreamsSearchBuilder().
        filter(
            this._createDatamodelFilter(id)
        ).build();
    }

    _createFilter(ids) {
        return this._ogapi.newFilterBuilder().
        and(
            this._ogapi.EX.in("prov.customId", ids)
        );
    }

    _createDatamodelFilter(id) {
        return this._ogapi.newFilterBuilder().
        and(
            this._ogapi.EX.eq("datastream.device", id)
        );
    }

    _appendEntityData(entity) {
        let _this = this;
        let sourceList = ['provision', 'collection'];
        sourceList.every(function(item) {
            let subscriberIds = [];
            let subscriptionIds = [];
            let commsModuleIds = [];
            if (typeof entity[item] === "object" && typeof entity[item].relations === "object" && typeof entity[item].relations.every === "function") {
                entity[item].relations.every(function(rels) {
                    rels.relation.every(function(link) {
                        if (link.entityType === "SUBSCRIBER") {
                            subscriberIds.push(link.id);
                        }
                        if (link.entityType === "COMMUNICATIONS_MODULE") {
                            commsModuleIds.push(link.id);
                        }
                        if (link.entityType === "SUBSCRIPTION") {
                            subscriptionIds.push(link.id);
                        }
                        return true;
                    });
                    return true;
                });
                if (subscriberIds.length > 0 || subscriptionIds.length > 0 || commsModuleIds.length > 0) {
                    entity[item].$related = {};
                    if (subscriberIds.length > 0) {
                        entity[item].$related.subscribers = function() {
                            return _this._createSearch(_this._ogapi.subscribersSearchBuilder(), subscriberIds).execute();
                        };
                    }
                    if (subscriptionIds.length > 0) {
                        entity[item].$related.subscriptions = function() {
                            return _this._createSearch(_this._ogapi.subscriptionsSearchBuilder(), subscriptionIds).execute();
                        };
                    }
                    if (commsModuleIds.length > 0) {
                        entity[item].$related.communicationsModules = function() {
                            return _this._createSearch(_this._ogapi.communicationsModulesSearchBuilder(), commsModuleIds).execute();
                        };
                    }
                }
            }
            return true;
        });

        // Add iot data
        let entityId = entity.id;
        entity.$datastreams = function() {
            return _this._createDatamodelSearch(entityId).
            execute();
        }
    }
}