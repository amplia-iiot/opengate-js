'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

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
            var _this = this;

            var defered = _q2['default'].defer();
            var promise = defered.promise;
            //console.log("RESOURCE: " + this._resource);
            this._ogapi.Napi.post(this._resource, this._filter(), this._timeout).then(function (response) {
                var resultQuery = response.body;
                var statusCode = response.statusCode;
                if (typeof resultQuery === "undefined") defered.reject("Data not found");else {
                    if (typeof _this._appendData === "function" && statusCode === 200) _this._appendData(resultQuery);
                    defered.resolve({ data: resultQuery, statusCode: statusCode });
                }
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
