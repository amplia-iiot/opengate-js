'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ProvisionGenericFinder2 = require('../ProvisionGenericFinder');

var _ProvisionGenericFinder3 = _interopRequireDefault(_ProvisionGenericFinder2);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

/**
 *   This class allow make get request to hardware models resource into Opengate North API.
 */

var ModelFinder = (function (_ProvisionGenericFinder) {
    _inherits(ModelFinder, _ProvisionGenericFinder);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function ModelFinder(ogapi) {
        _classCallCheck(this, ModelFinder);

        _get(Object.getPrototypeOf(ModelFinder.prototype), 'constructor', this).call(this, ogapi, 'models', 'model', 'Model not found');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */

    _createClass(ModelFinder, [{
        key: '_composeUrl',
        value: function _composeUrl() {
            return this._baseUrl + "/" + this._identifier + (this._mediaIdentifier ? "/media/" + this._mediaIdentifier + '?format=raw' : '');
        }

        /**
         * Download a specific model by its id. This execute a GET http method
         * @test
         *   ogapi.newModelFinder().findById('modelname').then().catch();
         * @param {string} identifier - model name .
         * @return {Promise} 
         */
    }, {
        key: 'findById',
        value: function findById(identifier) {
            this._identifier = identifier;
            return this._execute();
        }

        /**
         * Download a specific model media by its ids. This execute a GET http method
         * @test
         *   ogapi.newModelFinder().findMediaById('modelId', 'mediaIdentifier').then().catch();
         * @param {string} modelId - model identifier .
         * @param {string} mediaIdentifier - media identifier.
         * @return {Promise} 
         */
    }, {
        key: 'findMediaById',
        value: function findMediaById(modelId, mediaIdentifier) {
            this._identifier = modelId;
            this._mediaIdentifier = mediaIdentifier;
            return this._download();
        }

        /**
         * @return {Promise}* @private
         */
    }, {
        key: '_download',
        value: function _download() {
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            var _error_not_found = this._error_not_found;
            this._api.get(this._composeUrl(), undefined, this._getExtraHeaders(), this._getUrlParameters(), true).then(function (req) {
                if (req.statusCode === 204) {
                    defered.reject({
                        data: _error_not_found,
                        statusCode: _httpStatusCodes2['default'].NOT_FOUND
                    });
                } else {
                    defered.resolve({
                        data: req,
                        statusCode: req.statusCode
                    });
                }
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }
    }]);

    return ModelFinder;
})(_ProvisionGenericFinder3['default']);

exports['default'] = ModelFinder;
module.exports = exports['default'];
//# sourceMappingURL=ModelFinder.js.map
