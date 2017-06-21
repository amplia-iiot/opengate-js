'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

<<<<<<< HEAD
=======
var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var LIMIT_SIZE_DEF_VALUE = 1000;

>>>>>>> release_branch
/** 
 * This is a abstract class, it must be extended to another class that defined the specific search.
 * This class is responsible to manage execute request to OpenGate North API
 */

var BaseSearch = (function () {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} resource - this is a base url resource
     * @param {!number} [timeout] - timeout on request
     */

    function BaseSearch(ogapi, resource, timeout) {
        _classCallCheck(this, BaseSearch);

        if (this.constructor === BaseSearch) {
            throw new Error("Cannot construct Abstract instances directly");
        }
        if (typeof this._filter !== "function") {
            throw new Error("Must override method: filter");
        }
        if (typeof timeout !== 'number') {
            this._timeout = ogapi.Napi._options.timeout;
        } else {
            this._timeout = timeout;
        }
        this._ogapi = ogapi;
        this._resource = 'search' + resource;
    }

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     */

    _createClass(BaseSearch, [{
        key: 'execute',
        value: function execute() {
<<<<<<< HEAD
            var _this = this;

            var defered = _q2['default'].defer();
            var promise = defered.promise;
            //console.log("RESOURCE: " + this._resource);
=======
            var _this2 = this;

            var defered = _q2['default'].defer();
            var promise = defered.promise;
>>>>>>> release_branch
            this._ogapi.Napi.post(this._resource, this._filter(), this._timeout).then(function (response) {
                var resultQuery = response.body;
                var statusCode = response.statusCode;
                if (typeof resultQuery === "undefined") defered.reject("Data not found");else {
<<<<<<< HEAD
                    if (typeof _this._appendData === "function" && statusCode === 200) _this._appendData(resultQuery);
=======
                    if (typeof _this2._appendData === "function" && statusCode === 200) _this2._appendData(resultQuery);
>>>>>>> release_branch
                    defered.resolve({ data: resultQuery, statusCode: statusCode });
                }
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }
<<<<<<< HEAD
=======

        //Se debera fijar simpre un objeto limit en la paginacion asincrona
        //Si no existiera el objeto limit se creara uno por defecto
        //Si tuviera se modficara para que siempre comience en la primera pagina
    }, {
        key: '_asyncPagingFilter',
        value: function _asyncPagingFilter() {
            var filter = this._filter();

            if (!filter.limit || !filter.limit.size) {
                filter.limit = { size: LIMIT_SIZE_DEF_VALUE, start: 1 };
            } else {
                filter.limit.start = 1;
            }
            return filter;
        }
    }, {
        key: '_loadData',
        value: function _loadData(resource) {
            var _this = this;
            var defered = _q2['default'].defer();
            var filter = _this._asyncPagingFilter();
            var paging = false;
            //Funcion que realizara la llamada al search paginado y, de forma recursiva, llamara a todas las paginas
            function loadAll() {
                console.log(JSON.stringify(filter));
                _this._ogapi.Napi.post(_this._resource, filter, _this._timeout).then(function (response) {
                    var statusCode = response.statusCode;
                    var body = response.body;
                    if (statusCode === 200 || statusCode === 200) {
                        paging = true;
                        if (typeof _this._appendData === "function") _this._appendData(body);
                        var result = body.data ? body.data[resource] : body[resource];
                        defered.notify(result);
                        if (result.length === filter.limit.size) {
                            filter.limit.start += 1;
                            loadAll();
                        } else {
                            defered.resolve({ data: 'DONE', statusCode: 200 });
                        }
                    } else {
                        if (paging) {
                            defered.resolve({ data: 'DONE', statusCode: 200 });
                        } else defered.reject({ data: body, statusCode: statusCode });
                    }
                })['catch'](function (error) {
                    defered.reject(error);
                });
            }
            loadAll();
            return defered.promise;
        }

        /**
        * This invokes a request for asynchronous paging to the OpenGate North API and the return of the pages is managed by promises and its notify object
        * @param {string} resource - resource to find.
        * @return {Promise}
        * @property {function (), null, function ()} then - When request it is OK
        * @property {function (error:string)} catch - When request it is NOK
        */
    }, {
        key: 'executeWithAsyncPaging',
        value: function executeWithAsyncPaging(resource) {
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            //Comenzamos con la carga asincrona
            this._loadData(resource).then(function (response) {
                defered.resolve(response);
            }, null, function (notify) {
                defered.notify(notify);
            })['catch'](function (error) {
                defered.reject(error);
            });

            return promise;
        }
>>>>>>> release_branch
    }]);

    return BaseSearch;
})();

exports['default'] = BaseSearch;
module.exports = exports['default'];
//# sourceMappingURL=BaseSearch.js.map
