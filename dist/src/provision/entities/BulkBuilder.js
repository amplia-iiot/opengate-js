'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _BaseProvision2 = require('../BaseProvision');

var _BaseProvision3 = _interopRequireDefault(_BaseProvision2);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var ERROR_VALUE_NOT_ALLOWED = 'The value is not allowed. The value should be formatted as follows: ';
var ERROR_DATASTREAM_NOT_ALLOWED = 'Datastream is not allowed.';
var ERROR_ORGANIZATION = 'Parameters organization must be defined';

/**
 * This class allow set simple values.
 */

var BulkBuilder = (function (_BaseProvision) {
    _inherits(BulkBuilder, _BaseProvision);

    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - this is the organization where can be create/delete/update the entity
     */

    function BulkBuilder(ogapi, resource, extension, timeout) {
        _classCallCheck(this, BulkBuilder);

        _get(Object.getPrototypeOf(BulkBuilder.prototype), 'constructor', this).call(this, ogapi, resource);
        this._timeout = timeout;
        this._resource = resource;
        this._extension = extension;
    }

    _createClass(BulkBuilder, [{
        key: '_composeElement',
        value: function _composeElement() {
            return this;
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            return this._resource;
        }

        /**
         * @param {!string|!Blob} rawFile - file with format string or Blob 
         * @param {boolean} csv_response - true if you want a response on format csv. False or null if you want a response on format json
         */
    }, {
        key: 'create',
        value: function create(rawFile, csv_response) {
            return this._executeOperation(rawFile, 'CREATE', csv_response);
        }

        /**
         * 
         * @param {!string|!Blob} rawFile - file with format string or Blob 
         * @param {boolean} csv_response - true if you want a response on format csv. False or null if you want a response on format json
         */
    }, {
        key: 'delete',
        value: function _delete(rawFile, csv_response) {
            return this._executeOperation(rawFile, 'DELETE', csv_response);
        }

        /**
         * 
         * @param {!string|!Blob} rawFile - file with format string or Blob 
         * @param {boolean} csv_response - true if you want a response on format csv. False or null if you want a response on format json
         */
    }, {
        key: 'deleteAll',
        value: function deleteAll(rawFile, csv_response) {
            return this._executeOperation(rawFile, 'DELETE&full=true', csv_response);
        }

        /**
         * 
         * @param {!string|!Blob} rawFile - file with format string or Blob 
         * @param {boolean} csv_response - true if you want a response on format csv. False or null if you want a response on format json
         */
    }, {
        key: 'update',
        value: function update(rawFile, csv_response) {
            return this._executeOperation(rawFile, 'UPDATE', csv_response);
        }
    }, {
        key: '_executeOperation',
        value: function _executeOperation(rawFile, action, csv_response) {
            var form = undefined;
            if (typeof rawFile !== 'string') {
                form = {};
                if (rawFile) {
                    var bulkFile = new Blob([rawFile]);
                    form.bulkFile = bulkFile;
                }
            } else {
                form = {};

                if (rawFile) {
                    form.bulkFile = rawFile;
                }
            }
            var defer = _q2['default'].defer();
            form.ext = this._extension;

            var petitionUrl = this._buildURL().replace("#actionName#", action);
            this._ogapi.Napi.post_multipart(petitionUrl, form, {}, this._timeout, csv_response ? {
                'accept': 'text/plain'
            } : null).then(function (response) {
                var statusCode = response.statusCode;
                if (statusCode === 200) {
                    if (csv_response) {
                        //Se hace esto para que la respuesta sea igual que al searching con resultado en csv
                        var resultQuery = response;
                        var _statusCode = response.statusCode;
                        defer.resolve({
                            data: resultQuery,
                            statusCode: _statusCode
                        });
                    } else defer.resolve(response);
                } else {
                    defer.reject({
                        errors: response.data.errors,
                        statusCode: response.statusCode
                    });
                }
            })['catch'](function (error) {
                defer.reject(error);
            });
            return defer.promise;
        }
    }]);

    return BulkBuilder;
})(_BaseProvision3['default']);

exports['default'] = BulkBuilder;
module.exports = exports['default'];
//# sourceMappingURL=BulkBuilder.js.map
