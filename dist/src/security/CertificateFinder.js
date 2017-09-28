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

var _MIME_TYPES_ENUM = require('./MIME_TYPES_ENUM');

/**
 *   This class allow make get request to certificate resource into Opengate North API.
 */

var CertificateFinder = (function (_ProvisionGenericFinder) {
    _inherits(CertificateFinder, _ProvisionGenericFinder);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function CertificateFinder(ogapi) {
        _classCallCheck(this, CertificateFinder);

        _get(Object.getPrototypeOf(CertificateFinder.prototype), 'constructor', this).call(this, ogapi, 'security/certificates', 'certificate', 'Certificate not found');
    }

    /**
     * Download a specific certificate by id. This execute a GET http method
     * @test
     *   ogapi.newCertificateFinder().findById('xxx-xx-xxx-xxx').then().catch();
     * @param {string} id - Id of the certificate.
     * @return {Promise} 
     */

    _createClass(CertificateFinder, [{
        key: 'findById',
        value: function findById(id) {
            this._id = id;
            return this._execute();
        }

        /**
         * @return {String} This returns a string with the download URL of the request.
         * @private
         */
    }, {
        key: '_downloadUrl',
        value: function _downloadUrl() {
            return this._composeUrl() + "?format=" + this._type;
        }

        /**
         * Download a certificate using id and in a specific format. This execute a GET http method
         * @test
         *   ogapi.newCertificateFinder().findByIdAndType('xxx-xx-xxx-xxx', 'mimetype').then().catch();
         * @param {string} id - Id of the certificate.
         * @param {string} mimetype - Certificate format mimetype.
         * @return {Promise} 
         */
    }, {
        key: 'findByIdAndFormat',
        value: function findByIdAndFormat(id, mimetype) {
            var not_found = '';
            var found = _MIME_TYPES_ENUM.MIME_TYPES_ENUM.find(function (mime_type) {
                return mime_type == this;
            }, mimetype);
            if (typeof found === "undefined") {
                not_found = mimetype;
            }

            if (not_found !== '') {
                throw new Error("Parameter mimetype is not allowed. Parameter value <'" + JSON.stringify(not_found) + "'>, mimetype allowed <'" + JSON.stringify(_MIME_TYPES_ENUM.MIME_TYPES_ENUM) + "'>");
            }

            this._id = id;

            this._type = mimetype;

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
            this._api.get(this._downloadUrl()).then(function (req) {
                if (req.statusCode === 204) {
                    defered.reject({ data: _error_not_found, statusCode: _httpStatusCodes2['default'].NOT_FOUND });
                } else {
                    defered.resolve({ data: req, statusCode: req.statusCode });
                }
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }
    }]);

    return CertificateFinder;
})(_ProvisionGenericFinder3['default']);

exports['default'] = CertificateFinder;
module.exports = exports['default'];
//# sourceMappingURL=CertificateFinder.js.map
