'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Search2 = require('./Search');

var _Search3 = _interopRequireDefault(_Search2);

/** 
 * This extends Search and it allow make request to any available resource into /entities resource at Opengate North API
 */

var EntitySearch = (function (_Search) {
    _inherits(EntitySearch, _Search);

    /**
     * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     * @param {!string} url - this define a specific resource to make the search
     * @param {object} filter - this is the filter
     * @param {object} limit - this is the pagination about the search
     * @param {object} sort - this defined parameters to order the result of search
     */

    function EntitySearch(ogapi, url, filter, limit, sort, timeout) {
        _classCallCheck(this, EntitySearch);

        _get(Object.getPrototypeOf(EntitySearch.prototype), 'constructor', this).call(this, ogapi, "/entities" + url, filter, limit, sort, timeout);
    }

    _createClass(EntitySearch, [{
        key: '_appendData',
        value: function _appendData(data) {
            var _this = this;
            var entities = data.subscribers || data.subscriptions || data.communicationsModules || data.devices;
            if (typeof entities === "object" && typeof entities.every === "function") {
                entities.every(function (entity) {
                    _this._appendEntityData(entity);
                    return true;
                });
            }
        }
    }, {
        key: '_createSearch',
        value: function _createSearch(searchBuilder, ids) {
            return searchBuilder.onCollected().onProvisioned().withTimeout(10000).limit(1000).filter(this._createFilter(ids)).build();
        }
    }, {
        key: '_createDatamodelSearch',
        value: function _createDatamodelSearch(id) {
            return this._ogapi.datastreamsSearchBuilder().filter(this._createDatamodelFilter(id)).build();
        }
    }, {
        key: '_createFilter',
        value: function _createFilter(ids) {
            return this._ogapi.newFilterBuilder().and(this._ogapi.EX['in']("prov.customId", ids));
        }
    }, {
        key: '_createDatamodelFilter',
        value: function _createDatamodelFilter(id) {
            return this._ogapi.newFilterBuilder().and(this._ogapi.EX.eq("datastream.device", id));
        }
    }, {
        key: '_appendEntityData',
        value: function _appendEntityData(entity) {
            var _this = this;
            var sourceList = ['provision', 'collection'];
            sourceList.every(function (item) {
                var subscriberIds = [];
                var subscriptionIds = [];
                var commsModuleIds = [];
                if (typeof entity[item] === "object" && typeof entity[item].relations === "object" && typeof entity[item].relations.every === "function") {
                    entity[item].relations.every(function (rels) {
                        rels.relation.every(function (link) {
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
                            entity[item].$related.subscribers = function () {
                                return _this._createSearch(_this._ogapi.subscribersSearchBuilder(), subscriberIds).execute();
                            };
                        }
                        if (subscriptionIds.length > 0) {
                            entity[item].$related.subscriptions = function () {
                                return _this._createSearch(_this._ogapi.subscriptionsSearchBuilder(), subscriptionIds).execute();
                            };
                        }
                        if (commsModuleIds.length > 0) {
                            entity[item].$related.communicationsModules = function () {
                                return _this._createSearch(_this._ogapi.communicationsModulesSearchBuilder(), commsModuleIds).execute();
                            };
                        }
                    }
                }
                return true;
            });

            // Add iot data
            var entityId = entity.id;
            entity.$datastreams = function () {
                return _this._createDatamodelSearch(entityId).execute();
            };
        }
    }]);

    return EntitySearch;
})(_Search3['default']);

exports['default'] = EntitySearch;
module.exports = exports['default'];
//# sourceMappingURL=EntitySearch.js.map
