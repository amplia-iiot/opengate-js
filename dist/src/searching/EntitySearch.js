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
 * This extends Search and it allow make request to any available resource into /entities resource at Opengate North API
 */

var EntitySearch = (function (_Search) {
    _inherits(EntitySearch, _Search);

    /**
     * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     * @param {!string} url - this define a specific resource to make the search
     * @param {object} filter - this is the filter
     * @param {object} limit - this is the pagination about the search
     * @param {object} sort - this define parameters to order the result of search
     * @param {object} group - this define parameters to group
     * @param {object} select - this define fields to retrieve
     */

    function EntitySearch(ogapi, url, filter, limit, sort, group, select, timeout) {
        _classCallCheck(this, EntitySearch);

        _get(Object.getPrototypeOf(EntitySearch.prototype), 'constructor', this).call(this, ogapi, url, filter, limit, sort, group, select, timeout);
    }

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     */

    _createClass(EntitySearch, [{
        key: 'execute',
        value: function execute() {
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            console.log(JSON.stringify(this._filter()));
            this._ogapi.Napi.post(this._resource, this._filter(), this._timeout).then(function (response) {
                var resultQuery = response.body;
                var statusCode = response.statusCode;

                if (statusCode === 200 && resultQuery.entities && resultQuery.entities.length > 0) {
                    // OUW-944
                    var ele,
                        flattened = false;

                    if (resultQuery.entities[0]['provision.administration.identifier']) {
                        flattened = true;
                    }

                    for (ele = 0; ele < resultQuery.entities.length; ele++) {
                        if (flattened) {
                            if (resultQuery.entities[ele]['device.identifier']) {
                                var dato = resultQuery.entities[ele]['device.identifier'];
                                if (!dato._value || dato._value && !dato._value._current) {
                                    delete resultQuery.entities[ele]['device.identifier'];
                                }
                            }
                        } else {
                            if (resultQuery.entities[ele].device && resultQuery.entities[ele].device.identifier && !resultQuery.entities[ele].device.identifier._current) {
                                delete resultQuery.entities[ele].device.identifier;
                            }
                        }
                    }
                }
                defered.resolve({ data: resultQuery, statusCode: statusCode });
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }
    }]);

    return EntitySearch;
})(_Search3['default']);

exports['default'] = EntitySearch;
module.exports = exports['default'];
//# sourceMappingURL=EntitySearch.js.map
