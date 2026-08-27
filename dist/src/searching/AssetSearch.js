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

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

/** 
 * This extends Search and allow make request to any available resource into Opengate North API.
 */

var AssetSearch = (function (_Search) {
    _inherits(AssetSearch, _Search);

    /**
     * Constructor
     * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     * @param {!string} url - this define a specific resource to make the search
     * @param {object} filter - this is the filter
     * @param {object} limit - this is the pagination about the search
     * @param {object} sort - this defined parameters to order the result of search
     * @param {object} group - this defined the group by
     */

    function AssetSearch(ogapi, url, filter, limit, sort, group, select, timeout, urlParams) {
        _classCallCheck(this, AssetSearch);

        _get(Object.getPrototypeOf(AssetSearch.prototype), 'constructor', this).call(this, ogapi, url, filter, limit, sort, group, select, timeout, urlParams);
    }

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     */

    _createClass(AssetSearch, [{
        key: 'execute',
        value: function execute() {
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            var parameters = this._getUrlParameters();

            this._ogapi.Napi.post(this._resource, this._filter(), this._timeout, this._getExtraHeaders(), parameters).then(function (response) {
                var resultQuery = response.body;
                var statusCode = response.statusCode;

                if (statusCode === 200) {
                    resultQuery.assets = resultQuery.entities;
                    delete resultQuery.entities;
                }
                defered.resolve({
                    data: resultQuery,
                    statusCode: statusCode
                });
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }
    }]);

    return AssetSearch;
})(_Search3['default']);

exports['default'] = AssetSearch;
module.exports = exports['default'];
//# sourceMappingURL=AssetSearch.js.map
