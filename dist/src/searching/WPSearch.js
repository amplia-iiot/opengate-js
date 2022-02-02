'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BaseSearch2 = require('./BaseSearch');

var _BaseSearch3 = _interopRequireDefault(_BaseSearch2);

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

/** 
 * This extends BaseSearch and allow make request to any available resource into Opengate North API.
 * The resource does not have the 'search' prefix. For this, use class Search
 */

var WPSearch = (function (_BaseSearch) {
    _inherits(WPSearch, _BaseSearch);

    /**
       * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
       * @param {!string} url - this define a specific resource to make the search
       * @param {object} filter - this is the filter
       * @param {object} limit - this is the pagination about the search
       * @param {object} sort - this defined parameters to order the result of search
    * @param {object} group
    * @param {object} select
      	* @param {nubmer} timeout
       */

    function WPSearch(ogapi, url, filter, limit, sort, group, select, timeout, urlParams) {
        if (limit === undefined) limit = { limit: {} };

        _classCallCheck(this, WPSearch);

        _get(Object.getPrototypeOf(WPSearch.prototype), 'constructor', this).call(this, ogapi, url, timeout);
        this._setUrlParameters(urlParams);
        this._postObj = (0, _merge2['default'])(filter, limit, group, select);
        if (typeof sort === 'object') {
            this._postObj = (0, _merge2['default'])(this._postObj, sort);
        }
    }

    _createClass(WPSearch, [{
        key: '_filter',
        value: function _filter() {
            return this._postObj;
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
                    defered.reject({
                        data: message,
                        statusCode: 403
                    });
                } else {
                    _this._ogapi.Napi.post(_this._resource, filter, _this._timeout, _this._getExtraHeaders(), _this._getUrlParameters()).then(function (response) {
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

                        if (statusCode === 200) {
                            paging = true;
                            defered.notify(body);
                            //Se permite devolver un boolean o un string que reemplazará el mensaje por defecto
                            if (body.data.length === filter.limit.size) {
                                filter.limit.start += 1;
                                loadAll();
                            } else {
                                defered.resolve({
                                    data: 'DONE',
                                    statusCode: 200
                                });
                            }
                        } else {
                            if (paging) {
                                defered.resolve({
                                    data: 'DONE',
                                    statusCode: 200
                                });
                            } else defered.reject({
                                data: body,
                                statusCode: statusCode
                            });
                        }
                    })['catch'](function (error) {
                        defered.reject(error);
                    });
                }
            }
            loadAll();
            return defered.promise;
        }
    }]);

    return WPSearch;
})(_BaseSearch3['default']);

exports['default'] = WPSearch;
module.exports = exports['default'];
//# sourceMappingURL=WPSearch.js.map
