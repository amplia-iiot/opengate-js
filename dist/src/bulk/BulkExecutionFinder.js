'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _GenericFinder2 = require('../GenericFinder');

var _GenericFinder3 = _interopRequireDefault(_GenericFinder2);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var MIME_TYPES_ENUM = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

exports.MIME_TYPES_ENUM = MIME_TYPES_ENUM;
/**
 *   This class allow make get request to bulk executions resource into Opengate North API.
 */

var BulkExecutionFinder = (function (_GenericFinder) {
    _inherits(BulkExecutionFinder, _GenericFinder);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function BulkExecutionFinder(ogapi) {
        _classCallCheck(this, BulkExecutionFinder);

        _get(Object.getPrototypeOf(BulkExecutionFinder.prototype), 'constructor', this).call(this, ogapi, 'provisionProcessors/provision/organizations', 'value', 'Bulk not found');
    }

    /**
     * @return {String} This returns a string with the URL of the request.
     * @private
     */

    _createClass(BulkExecutionFinder, [{
        key: '_composeUrl',
        value: function _composeUrl() {
            return this._baseUrl + '/' + this._organization + '/bulk/' + this._id + (this._details ? "/details" : '');
        }

        /**
         * Download a specific entity by its organization and id. This execute a GET http method
         * @test
         *   ogapi.newBulkExecutionFinder().findByOrganizationAndId('orgname', xxx-xx-xxx-xxx').then().catch();
         *   ogapi.newBulkExecutionFinder().findByOrganizationAndId('orgname', xxx-xx-xxx-xxx', true).then().catch();
         * @param {string} organization - organization.
         * @param {string} id - bulk id.
         * @param {string} mimetype - Format of file when get the result details of previously created bulk process.
         * @return {Promise} 
         */
    }, {
        key: 'findByOrganizationAndId',
        value: function findByOrganizationAndId(organization, id, mimetype) {
            this._organization = organization;
            this._id = id;
            this._details = false;

            if (mimetype) {
                var not_found = '';
                var found = MIME_TYPES_ENUM.find(function (mime_type) {
                    return mime_type == this;
                }, mimetype);
                if (typeof found === "undefined") {
                    not_found = mimetype;
                }
                if (not_found !== '') {
                    throw new Error("Parameter mimetype is not allowed. Parameter value <'" + JSON.stringify(not_found) + "'>, mimetype allowed <'" + JSON.stringify(MIME_TYPES_ENUM) + "'>");
                }
                this._details = true;
                this._setExtraHeaders({
                    'accept': mimetype
                });
                return this._download();
            }
            this._details = false;
            this._setExtraHeaders({
                'accept': undefined
            });
            return this._execute();
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

    return BulkExecutionFinder;
})(_GenericFinder3['default']);

exports['default'] = BulkExecutionFinder;
//# sourceMappingURL=BulkExecutionFinder.js.map
