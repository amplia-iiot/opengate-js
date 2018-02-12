'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var LIMIT_SIZE_DEF_VALUE = 1000;

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
        this._headers = undefined;
    }

    _createClass(BaseSearch, [{
        key: '_getExtraHeaders',
        value: function _getExtraHeaders() {
            return this._headers;
        }
    }, {
        key: '_setExtraHeaders',
        value: function _setExtraHeaders(headers) {
            if (this._headers) {
                var keys = Object.keys(headers);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    this._headers[key] = headers[key];
                }
            } else {
                this._headers = headers;
            }
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * @return {Promise}
         * @property {function (result:object, statusCode:number)} then - When request it is OK
         * @property {function (error:string)} catch - When request it is NOK
         */
    }, {
        key: 'execute',
        value: function execute() {
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._ogapi.Napi.post(this._resource, this._filter(), this._timeout, this._getExtraHeaders()).then(function (response) {
                var resultQuery = response.body;
                var statusCode = response.statusCode;
                defered.resolve({ data: resultQuery, statusCode: statusCode });
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * @return {Promise} - Promise with data with format csv
         * @property {function (result:object, statusCode:number)} then - When request it is OK
         * @property {function (error:string)} catch - When request it is NOK
         */
    }, {
        key: 'downloadCsv',
        value: function downloadCsv() {
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            var filter = this._filter();

            if (filter && filter.limit) {
                delete filter.limit;
            }
            this._setExtraHeaders({ 'Accept': 'text/plain' });

            this._ogapi.Napi.post(this._resource, filter, this._timeout, this._getExtraHeaders()).then(function (response) {
                var resultQuery = response;
                var statusCode = response.statusCode;
                defered.resolve({ data: resultQuery, statusCode: statusCode });
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }

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
        key: 'cancelAsyncPaging',
        value: function cancelAsyncPaging(message) {
            if (typeof message === 'string' && message.length > 0) {
                this.cancel = message;
            } else this.cancel = true;
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
                if (_this.cancel || typeof _this.cancel === 'string') {
                    var message = typeof _this.cancel === 'string' ? _this.cancel : 'Cancel process';
                    defered.reject({ data: message, statusCode: 403 });
                } else {
                    _this._ogapi.Napi.post(_this._resource, filter, _this._timeout, _this._getExtraHeaders()).then(function (response) {
                        var statusCode = response.statusCode;
                        var body = response.body;
                        if (!body && response.text) {
                            try {
                                var parsedResult = JSON.parse(response.text);

                                if (parsedResult) {
                                    body = parsedResult;
                                }
                            } catch (ignoreError) {
                                console.error("Impossible to parse text from response");
                            }
                        }

                        if (statusCode === 200 || statusCode === 200) {
                            paging = true;
                            var result = body.data ? body.data[resource] : body[resource];
                            defered.notify(result);
                            //Se permite devolver un boolean o un string que reemplazará el mensaje por defecto
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
            }
            loadAll();
            return defered.promise;
        }

        /**
         * This invokes a request for asynchronous paging to the OpenGate North API and the return of the pages is managed by promises and its notify object
         * To cancel the process in the notify method return false or string with custom message for response
         * In case of canceling the process, the response will be 403: Forbidden -> {data: 'Cancel process'|| custom_message, statusCode: 403}
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
    }]);

    return BaseSearch;
})();

exports['default'] = BaseSearch;
module.exports = exports['default'];
//# sourceMappingURL=BaseSearch.js.map
