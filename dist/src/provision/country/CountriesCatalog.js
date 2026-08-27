'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ProvisionGenericFinder2 = require('../../ProvisionGenericFinder');

var _ProvisionGenericFinder3 = _interopRequireDefault(_ProvisionGenericFinder2);

var _jsonpath = require('jsonpath');

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

/**
 *   This class allow make get request to countries catalog resource into Opengate North API.
 *   //IMPORTANTE: ver tarea OUW-3924 para entender la realización de esta clase
 */

var CountriesCatalog = (function (_ProvisionGenericFinder) {
    _inherits(CountriesCatalog, _ProvisionGenericFinder);

    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
     */

    function CountriesCatalog(ogapi) {
        _classCallCheck(this, CountriesCatalog);

        _get(Object.getPrototypeOf(CountriesCatalog.prototype), 'constructor', this).call(this, ogapi, 'organizations', "entity", 'Countries not found');
        this.__filter = this._api._options._internalCountriesFilter;
    }

    /**
     * Performs a get that returns countries
     * @test
     *   ogapi.newCountriesCatalog().getCountries();
     * @return {Promise} 
     */

    _createClass(CountriesCatalog, [{
        key: 'getCountries',
        value: function getCountries() {
            return this._execute();
        }
    }, {
        key: '_composeUrl',
        value: function _composeUrl() {
            return this._baseUrl + "/" + this.__filter.organization + "/entities/" + this.__filter.identifier;
        }

        /**
         * @return {Promise}
         * @private
         */
    }, {
        key: '_execute',
        value: function _execute() {
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            var _this = this;
            var _error_not_found = this._error_not_found;
            this._api.get(this._composeUrl(), undefined, this._getExtraHeaders(), this._getUrlParameters(), false, this._getServiceBaseURL()).then(function (req) {
                if (req.statusCode === 204) {
                    defered.reject({
                        error: _error_not_found,
                        statusCode: _httpStatusCodes2['default'].NOT_FOUND
                    });
                } else {
                    var data = (_jsonpath2['default'].query(req.body, '$.' + _this.__filter.ds + '._current.value') || [])[0];
                    defered.resolve({
                        data: data,
                        statusCode: req.statusCode
                    });
                    // }
                }
            })['catch'](function (error) {
                // BUG RELACIONADO (http://cm.amplia.es/jira/browse/OGODM-3250)
                if (error.statusCode === 400) {
                    error.statusCode = _httpStatusCodes2['default'].NOT_FOUND;
                }
                defered.reject(error);
            });
            return promise;
        }
    }]);

    return CountriesCatalog;
})(_ProvisionGenericFinder3['default']);

exports['default'] = CountriesCatalog;
module.exports = exports['default'];
//# sourceMappingURL=CountriesCatalog.js.map
