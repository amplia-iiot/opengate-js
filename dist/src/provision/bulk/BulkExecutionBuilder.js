'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BaseProvision2 = require('../BaseProvision');

var _BaseProvision3 = _interopRequireDefault(_BaseProvision2);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var TYPES = {
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
};

exports.TYPES = TYPES;
/**
 * This builder give you the necessary tools to create a bulk executions using our OpenGate REST
 */

var BulkExecutionBuilder = (function (_BaseProvision) {
    _inherits(BulkExecutionBuilder, _BaseProvision);

    /**
     * @param {InternalOpenGateAPI} ogapi - required field. This is ogapi instance
     * @param {string} organization - required field. This is the organization name
     * @param {string} processorId - required field. This is the provision processor use for bulk provision
     * @param {number} [timeout] - timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception
     */

    function BulkExecutionBuilder(ogapi, organization, processorId, timeout) {
        _classCallCheck(this, BulkExecutionBuilder);

        _get(Object.getPrototypeOf(BulkExecutionBuilder.prototype), 'constructor', this).call(this, ogapi, undefined, timeout, ['organization', 'processorId']);
        this._timeout = timeout;
        this._organization = organization;
        this._processorId = processorId;
        this._resource = 'provisionProcessors/provision/organizations/' + organization + '/' + processorId + '/';
    }

    _createClass(BulkExecutionBuilder, [{
        key: '_composeElement',
        value: function _composeElement() {
            return this;
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            return this._resource + this._type;
        }

        /**
         * Instead of creating a bulk process, return the provision process planning for specified entries. This is is synch process that does not cause changes in the database
         * @example 
         *  ogapi.newBulkExecutionBuilder('orgname', 'processorId', 10000).plan(rawFile, extension)
         *  ogapi.newBulkExecutionBuilder('orgname', 'processorId', 10000).plan(rawFile, extension, numberOfEntriesToProcess)
         * @param {string|Blob} rawFile - File with format string or Blob 
         * @param {string} [extension] - File format
         * @param {number} [numberOfEntriesToProcess] - Number of entries to be processed.
         */
    }, {
        key: 'plan',
        value: function plan(rawFile, extension, numberOfEntriesToProcess) {
            if (typeof extension !== 'string') throw new Error('Parameter extension must be a string (xls or xlsx) and cannot be empty');
            this._extension = TYPES[extension];
            this._setUrlParameters({
                numberOfEntriesToProcess: numberOfEntriesToProcess || 1
            });
            this._type = 'plan';
            this._setExtraHeaders({
                'accept': 'application/json'
            });
            return this._executeOperation(rawFile);
        }

        /**
         * Do a bulk using specific Provision Processor.
         * @example 
         *  ogapi.newBulkExecutionBuilder('orgname', 'processorId', 10000).bulk(rawFile, extension)
         * @param {File} rawFile - File with data
         * @param {string} [extension] - File format
         */
    }, {
        key: 'bulk',
        value: function bulk(rawFile, extension) {
            this._extension = TYPES[extension];
            if (typeof this._extension !== 'string') throw new Error('Parameter extension must be a string (xls or xlsx) and cannot be empty');
            this._type = 'bulk';
            this._setExtraHeaders({
                'accept': this._extension
            });
            return this._executeOperation(rawFile);
        }
    }, {
        key: '_executeOperation',
        value: function _executeOperation(rawFile) {
            var form = undefined;
            if (typeof rawFile !== 'string') {
                form = new FormData();
                var processorBulkFile = new Blob([rawFile], {
                    type: this._extension
                });
                form.append('processorBulkFile', processorBulkFile);
            } else {
                form = {};
                form.processorBulkFile = rawFile;
            }
            this._setExtraHeaders({
                'Content-Type': 'multipart/form-data'
            });

            var defer = _q2['default'].defer();

            var petitionUrl = this._buildURL();
            //url, formData, events, timeout, headers, parameters
            this._ogapi.Napi.post_multipart(petitionUrl, form, {}, this._timeout, this._getExtraHeaders(), this._getUrlParameters()).then(function (response) {
                var statusCode = response.statusCode;
                switch (statusCode) {
                    case 200:
                        {
                            var resultQuery = response.text != "" ? JSON.parse(response.text) : {};
                            var _statusCode = response.status;
                            defer.resolve({
                                data: resultQuery,
                                statusCode: _statusCode
                            });
                            break;
                        }
                    case 201:
                        {
                            var _statusCode = response.status;
                            var _location = response.location || response.headers.location || response.header.location;
                            defer.resolve({
                                location: _location,
                                statusCode: _statusCode
                            });
                            break;
                        }
                    case 204:
                        defer.resolve(response);
                        break;
                    default:
                        defer.reject({
                            errors: response.data.errors,
                            statusCode: response.statusCode
                        });
                        break;
                }
            })['catch'](function (error) {
                defer.reject(error);
            });
            return defer.promise;
        }
    }]);

    return BulkExecutionBuilder;
})(_BaseProvision3['default']);

exports['default'] = BulkExecutionBuilder;
//# sourceMappingURL=BulkExecutionBuilder.js.map
