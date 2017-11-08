'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Search = require('../Search');

var _Search2 = _interopRequireDefault(_Search);

var _errorSearchBuilderError = require('../error/SearchBuilderError');

var _errorSearchBuilderError2 = _interopRequireDefault(_errorSearchBuilderError);

var LIMIT_START_DEF_VALUE = 1;
var LIMIT_SIZE_DEF_VALUE = 1000;

/**
 * This is a abstract class. It is a base to make all kind of search request to OpenGate North API.
 */

var SearchBuilder = (function () {
    /**
     * @param {!InternalOpenGateAPI} parent - this is ogapi instance
     * @param {!object} routes - this defined the routes. One of those routes must be called on Builder before call build method.
     */

    function SearchBuilder(parent, routes, fieldFinder) {
        var _this = this;

        _classCallCheck(this, SearchBuilder);

        if (this.constructor === SearchBuilder) {
            throw new Error("Cannot construct Abstract instances directly");
        }
        this._url = '';
        this._fieldFinder = fieldFinder;
        this._parent = parent;
        this._routes = routes;
        this._routesName = [];
        this._builderParams = {
            summary: false,
            sort: [],
            filter: {},
            limit: undefined,
            group: undefined,
            select: undefined
        };

        var _loop = function (route) {
            _this._routesName.push(route);
            _this._builderParams[route] = false;
            _this[route] = function () {
                var _route = arguments.length <= 0 || arguments[0] === undefined ? route : arguments[0];

                _this._builderParams[_route] = true;
                return _this;
            };
        };

        for (var route in this._routes) {
            _loop(route);
        }
    }

    /**
     * Return a promise which it will contains an array with fields recommended
     * @return {Promise}
     */

    _createClass(SearchBuilder, [{
        key: 'findFields',
        value: function findFields(input) {
            return this._fieldFinder.find(input);
        }

        /**
         * The request will have a specific time out if it will be exceeded then the promise throw an exception
         * @example
         *  ogapi.subscriptionsSearchBuilder().withTimeout(2000) 
         * @param {number} ms - timeout in milliseconds
         * @return {SearchBuilder} 
         */
    }, {
        key: 'withTimeout',
        value: function withTimeout() {
            var ms = arguments.length <= 0 || arguments[0] === undefined ? 2000 : arguments[0];

            if (typeof ms !== "number") throw new Error('Parameter ms must be a number');
            this._builderParams.timeout = ms;
            return this;
        }

        /**
         * The search request will have this filter 
         * @example
         *  ogapi.subscriptionsSearchBuilder().filter(
         *      ogapi.newFilterBuilder().and(Ex.like('prov.customid', 'SN32'), Ex.neq('entityId', '1124'))
         *  ) // Setting FilterBuilder
         *  ogapi.subscriptionsSearchBuilder().filter(
         *       {"and": [{"like": {"entityId": "0000000000000001"}}]}
         *  ) // Custom filter
         * @param {!(FilterBuilder|object)} filter 
         * @return {SearchBuilder} 
         */
    }, {
        key: 'filter',
        value: function filter(_filter) {
            this._builderParams.filter = _filter || {};
            return this;
        }

        /**
         * Add ascending param into the sort search object
         * @example
         *  ogapi.subscriptionsSearchBuilder().addSortAscendingBy('prov.customid') // Order by prov.customid Ascending  
         * @param {!string} filterField - This field must be allowed into the specific resource
         * @return {SearchBuilder} 
         */
    }, {
        key: 'addSortAscendingBy',
        value: function addSortAscendingBy(filterField) {
            var ASC = 'ASCENDING';
            return this.addSortBy(filterField, ASC);
        }

        /**
         * Add descending param into the sort search object 
         * @example
         *  ogapi.communicationsModulesSearchBuilder().addSortDescendingBy('prov.customid') // Order by prov.customid Descending
         * @param {!string} filterField - This field must be allowed into the specific resource
         * @return {SearchBuilder} 
         */
    }, {
        key: 'addSortDescendingBy',
        value: function addSortDescendingBy(filterField) {
            var DESC = 'DESCENDING';
            return this.addSortBy(filterField, DESC);
        }

        /**
         * Add ascending/descending param into the sort search object 
         * @example
         *  ogapi.subscriptionsSearchBuilder().addSortBy('prov.customid','ASCENDING') // Order by prov.customid Ascending
         *  ogapi.communicationsModulesSearchBuilder().addSortBy('prov.customid','DESCENDING') // Order by prov.customid Descending 
         * @param {!string} filterField - This field must be allowed into the specific resource
         * @param {!string} typeSort
         * @return {SearchBuilder} 
         */
    }, {
        key: 'addSortBy',
        value: function addSortBy(filterField, typeSort) {
            if (filterField && typeSort) {
                if (this._builderParams.sort.length > 0) {
                    var ele = 0;
                    var found = false;
                    for (ele = 0; ele < this._builderParams.sort.length; ele++) {
                        if (this._builderParams.sort[ele].name === filterField) {
                            this._builderParams.sort[ele].type = typeSort;
                            found = true;
                        }
                    }

                    if (!found) this._builderParams.sort.push({ name: filterField, type: typeSort });
                } else {
                    this._builderParams.sort.push({ name: filterField, type: typeSort });
                }
            }
            return this;
        }

        /**
         * Remove sort param from the search object 
         * @example
         *  ogapi.subscriptionsSearchBuilder().removeSortBy('prov.customid') // Remove order by prov.customid
         *  ogapi.subscriptionsSearchBuilder().removeSortBy() // Remove all order by parameters
         * @param {string} filterField - This field must be allowed into the specific resource
         * @return {SearchBuilder} 
         */
    }, {
        key: 'removeSortBy',
        value: function removeSortBy(filterField) {
            if (!filterField) {
                this._builderParams.sort = [];
            } else {
                if (this._builderParams.sort.length > 0) {
                    var ele = 0;
                    for (ele = 0; ele < this._builderParams.sort.length; ele++) {
                        if (this._builderParams.sort[ele].name === filterField) {
                            this._builderParams.sort.splice(ele, ele + 1);
                            ele--;
                        }
                    }
                }
            }

            return this;
        }

        /**
         * Set reponse pagination.
         * @example
         *  ogapi.subscribersSearchBuilder().limit(10) // Without offset
         *  ogapi.subscribersSearchBuilder().limit(25,50) //With offset value 50
         * @param {!number} size - Defined the number of elements on response
         * @param {number} [start=0] - Defined the offset on response
         * @return {SearchBuilder} 
         */
    }, {
        key: 'limit',
        value: function limit(size) {
            var start = arguments.length <= 1 || arguments[1] === undefined ? LIMIT_START_DEF_VALUE : arguments[1];

            if (typeof size !== "number") throw new Error('size parameter must be a number');
            if (typeof start !== "number" || start < 1) start = LIMIT_START_DEF_VALUE;
            this._builderParams.limit = { size: size, start: start };
            return this;
        }

        /**
         * Build a instance of Search 
         *
         * @example
         *  ogapi.devicesSearchBuilder().onProvisioned().build()
         * @throws {SearchBuilderError} Throw error on url build
         * @return {Search} 
         */
    }, {
        key: 'build',
        value: function build() {
            return new _Search2['default'](this._parent, this._buildUrl(), this._buildFilter(), this._buildLimit(), this._buildSort(), this._buildSelect(), this._builderParams.timeout);
        }
    }, {
        key: '_buildFilter',
        value: function _buildFilter() {
            var filter = this._builderParams.filter;
            if (typeof filter._filterTemplate !== "undefined") return filter._filterTemplate;
            return {
                filter: filter
            };
        }
    }, {
        key: '_buildSelect',
        value: function _buildSelect() {
            var select = this._builderParams.select;
            if (typeof select !== "undefined" && typeof select._selectTemplate !== "undefined") return select._selectTemplate;
            return {
                select: select
            };
        }
    }, {
        key: '_buildGroup',
        value: function _buildGroup() {
            var group = this._builderParams.group;
            if (typeof group !== "undefined" && typeof group._groupTemplate !== "undefined") return group._groupTemplate;
            return {
                group: group
            };
        }
    }, {
        key: '_buildLimit',
        value: function _buildLimit() {
            if (typeof this._builderParams.limit === "undefined") return {
                limit: {
                    size: LIMIT_SIZE_DEF_VALUE,
                    start: LIMIT_START_DEF_VALUE
                }
            };

            return { limit: this._builderParams.limit };
        }
    }, {
        key: '_buildSort',
        value: function _buildSort() {
            if (this._builderParams.sort.length === 0) return undefined;
            return {
                sort: {
                    parameters: this._builderParams.sort
                }
            };
        }
    }, {
        key: '_buildUrl',
        value: function _buildUrl() {
            if (typeof this._url !== "string" || this._url.trim().length === 0) throw new Error('Error on extends SearchBuilder, this._url is not defined.');
            return this._url;
        }
    }, {
        key: '_checkConstraintRoutes',
        value: function _checkConstraintRoutes() {
            var isMultipleRouteEnabled = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            var atLeastOneTrue = false;
            for (var route in this._routes) {
                if (atLeastOneTrue && this._builderParams[route] && !isMultipleRouteEnabled) {
                    throw new Error("Must select only one of this:" + JSON.stringify(this._routesName));
                }
                atLeastOneTrue = atLeastOneTrue || this._builderParams[route];
            }
            if (!atLeastOneTrue) throw new Error('Must select one at least: ' + JSON.stringify(this._routesName));
        }
    }]);

    return SearchBuilder;
})();

exports['default'] = SearchBuilder;
module.exports = exports['default'];
//# sourceMappingURL=SearchBuilder.js.map
