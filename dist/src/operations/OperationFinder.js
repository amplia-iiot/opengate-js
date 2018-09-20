'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _GenericFinder2 = require('../GenericFinder');

var _GenericFinder3 = _interopRequireDefault(_GenericFinder2);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var LIMIT_START_DEF_VALUE = 1;
var LIMIT_SIZE_DEF_VALUE = 10;

/**
 *   This class allow make get request to operation resource into Opengate North API.
 */

var OperationFinder = (function (_GenericFinder) {
    _inherits(OperationFinder, _GenericFinder);

    /**     
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */

    function OperationFinder(ogapi) {
        _classCallCheck(this, OperationFinder);

        _get(Object.getPrototypeOf(OperationFinder.prototype), 'constructor', this).call(this, ogapi);
        this._limit = undefined;
    }

    /**
     * Download a specific operation by its id. This execute a GET http method
     * @example
     *   ogapi.newOperationFinder().findById('xxx-xx-xxx-xxx').then().catch();
     * @param {string} id - Operation id.
     * @return {Promise} 
     */

    _createClass(OperationFinder, [{
        key: 'findById',
        value: function findById(id) {
            this._id = id;
            console.log("THIS._ID: " + this._id);
            this._baseUrl = 'operation/jobs';
            this._entity = 'job';
            this._error_not_found = 'Operation not found';
            //console.log("FIND_BY_ID: " + id);
            return this._execute();
        }

        /**
         * Download information of peridodicitiy of a specific operation by its id. This execute a GET http method
         * @example
         *   ogapi.newOperationFinder().findPeriodicityById('xxx-xx-xxx-xxx').then().catch();
         * @param {string} id - Operation id.
         * @return {Promise} 
         */
    }, {
        key: 'findPeriodicityById',
        value: function findPeriodicityById(id) {
            this._id = id;
            var _this = this;
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            _this.findById(id).then(function (response) {
                //console.log("1response: " + JSON.stringify(response));
                var data = response.data;
                if (!data || Object.keys(data).length == 0) {
                    //console.log("BUG");
                    //BUG http://cm.amplia.es/jira/browse/ODMQA-1057
                    defered.reject({ errors: _this._error_not_found });
                } else {
                    _this._id = response.data.taskId;
                    _this._baseUrl = 'operation/tasks';
                    _this._entity = "task";
                    _this._error_not_found = "Operation is not periodic!";
                    //console.log("ID: " + _this._id);
                    _this._execute().then(function (response) {
                        //console.log("2response: " + JSON.stringify(response));
                        response.data.id = _this._id;
                        defered.resolve(response);
                    })['catch'](function (error) {
                        //console.log("2error:" + JSON.stringify(error));
                        defered.reject(error);
                    });
                }
            })['catch'](function (error) {
                //console.log("1error:" + JSON.stringify(error));
                defered.reject(error);
            });
            return promise;
        }

        /**
         * Download information of periodicitiy  by its id. This execute a GET http method
         * @example
         *   ogapi.newOperationFinder().findPeriodicityByPeriodicityId('xxx-xx-xxx-xxx').then().catch();
         * @param {string} periodicityId - Periodicity id.
         * @return {Promise} 
         */
    }, {
        key: 'findPeriodicityByPeriodicityId',
        value: function findPeriodicityByPeriodicityId(periodicityId) {
            var _this = this;
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            _this._id = periodicityId;
            _this._baseUrl = 'operation/tasks';
            _this._entity = "task";
            //console.log("ID: " + _this._id);
            _this._execute().then(function (response) {
                //console.log("2response: " + JSON.stringify(response));
                response.data.id = _this._id;
                defered.resolve(response);
            })['catch'](function (error) {
                //console.log("2error:" + JSON.stringify(error));
                defered.reject(error);
            });
            return promise;
        }

        /**
         * Download a specific executions of an operation by its id. This execute a GET http method
         * @test
         *   ogapi.newOperationFinder().findExecutionsById('xxx-xx-xxx-xxx').then().catch();
         *   ogapi.newOperationFinder().findExecutionsById('xxx-xx-xxx-xxx', 10).then().catch(); // Without offset
         *   ogapi.newOperationFinder().findExecutionsById('xxx-xx-xxx-xxx', 20, 50).then().catch(); //With offset value 50
         * @param {string} id - Operation id.
         * @param {number} size - Defined the number of elements on response
         * @param {number} [start=0] - Defined the offset on response
         * @return {Promise} 
         */
    }, {
        key: 'findExecutionsById',
        value: function findExecutionsById(id) {
            var size = arguments.length <= 1 || arguments[1] === undefined ? LIMIT_SIZE_DEF_VALUE : arguments[1];
            var start = arguments.length <= 2 || arguments[2] === undefined ? LIMIT_START_DEF_VALUE : arguments[2];

            this._id = id;
            this._baseUrl = 'operation/jobs';
            this._entity = 'operations';
            this._error_not_found = 'Executions not found';
            if (typeof size !== "number") throw new Error('size parameter must be a number');
            if (typeof start !== "number" || start < 1) start = LIMIT_START_DEF_VALUE;
            this._limit = { size: size, start: start };
            return this._execute();
        }

        /**
         * @return {String} This returns a string with the URL of the request.
         * @private
         */
    }, {
        key: '_composeUrl',
        value: function _composeUrl() {
            if (this._entity === 'operations') {
                var _limit_url = this._limit ? "?start=" + this._limit.start + "&size=" + this._limit.size : "";
                var base_url = this._baseUrl + "/" + this._id + "/operations" + _limit_url;
                console.log("COMPOSE_IF: " + base_url);
                return base_url;
            }
            console.log("COMPOSE: " + this._baseUrl + "/" + this._id);
            return this._baseUrl + "/" + this._id;
        }
    }]);

    return OperationFinder;
})(_GenericFinder3['default']);

exports['default'] = OperationFinder;
module.exports = exports['default'];
//# sourceMappingURL=OperationFinder.js.map
