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
 * This class is responsible to manage execute operations request to OpenGate North API
 */

var Operation = (function () {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} resource - this is a base url resource
     * @param {!object} postObj - it will be sent as a data on post action 
     */

    function Operation(ogapi, resource, postObj) {
        _classCallCheck(this, Operation);

        this._ogapi = ogapi;
        this._resource = 'operation' + resource;
        this._postObj = postObj;
        //console.log("C_OPERATION: " + JSON.stringify(this._postObj));
    }

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     */

    _createClass(Operation, [{
        key: 'updatePeriodicity',
        value: function updatePeriodicity() {
            var _this = this;

            var defered = _q2['default'].defer();
            var id = this._resource.substring(this._resource.lastIndexOf("/") + 1);
            //console.log("UP_OPERATION: " + JSON.stringify(this._postObj));
            //console.log("RESOURCE: " + this._resource);
            this._ogapi.Napi.put(this._resource, this._postObj).then(function (response) {
                //console.log("UPDATE: " + JSON.stringify(response));
                var data = undefined;
                try {
                    data = JSON.parse(response.text);
                } catch (err) {
                    console.warn("Error parsing response data when execute post action to " + _this._resource);
                }
                //console.log("RESPONSE: " + JSON.stringify(response));
                defered.resolve({
                    data: data ? data : {},
                    statusCode: response.statusCode,
                    id: id
                });
            })['catch'](function (error) {
                //console.log("ERROR: " + JSON.stringify(error));
                if (!error.data) {
                    error.data = {};
                }
                if (!error.data.errors) {
                    error.data.errors = [typeof error === "string" ? {
                        message: error
                    } : error];
                }
                defered.reject(error);
            });
            return defered.promise;
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
            var _this2 = this;

            var defered = _q2['default'].defer();
            //console.log("OPERATIONS: " + JSON.stringify(this._postObj));
            this._ogapi.Napi.post(this._resource, this._postObj).then(function (response) {
                var data = undefined;
                try {
                    data = JSON.parse(response.text);
                } catch (err) {
                    console.warn("Error parsing response data when execute post action to " + _this2._resource);
                }
                defered.resolve({
                    data: data ? data : {},
                    statusCode: response.statusCode,
                    location: response.header.location
                });
            })['catch'](function (error) {
                if (!error.data) {
                    error.data = {};
                }
                if (!error.data.errors) {
                    error.data.errors = [typeof error === "string" ? {
                        message: error
                    } : error];
                }
                defered.reject(error);
            });
            return defered.promise;
        }
    }]);

    return Operation;
})();

exports['default'] = Operation;
module.exports = exports['default'];
//# sourceMappingURL=Operation.js.map
