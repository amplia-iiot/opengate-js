'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _provisionBaseProvision = require('../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

/**
 * This is a base object that contains all you can do about Bundles.
 */

var AIModels = (function (_BaseProvision) {
    _inherits(AIModels, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function AIModels(ogapi) {
        _classCallCheck(this, AIModels);

        _get(Object.getPrototypeOf(AIModels.prototype), 'constructor', this).call(this, ogapi, "/ai", undefined, ["organization", "file"], 'north/ai');
        this._ogapi = ogapi;
    }

    _createClass(AIModels, [{
        key: '_buildURL',
        value: function _buildURL() {
            var url = this._organization + '/models/' + this._identifier;
            return url;
        }

        /**
         * Set the identifier attribute
         * @param {string} identifier
         * @return {Transformers}
         */
    }, {
        key: 'withIdentifier',
        value: function withIdentifier(identifier) {
            if (typeof identifier !== 'string' || identifier.length > 50) throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'identifier' });
            this._identifier = identifier;
            return this;
        }

        /**
         * Set the organization attribute
         * @param {string} organization 
         * @return {Transformers}
         */
    }, {
        key: 'withOrganization',
        value: function withOrganization(organization) {
            if (typeof organization !== 'string' || organization.length > 50) throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'organization' });
            this._organization = organization;
            return this;
        }
    }, {
        key: 'withFile',
        value: function withFile(file) {
            // if (typeof file !== 'object')
            //     throw new Error({ message: "Parameter action requires name and type", parameter: 'action' });
            this._file = file;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._checkRequiredParameters();
            this._resource = this._organization + '/models';

            var transformer = {
                modelFile: this._file || undefined
            };
            return transformer;
        }
    }, {
        key: '_composeUpdateElement',
        value: function _composeUpdateElement() {
            var model = _get(Object.getPrototypeOf(AIModels.prototype), '_composeUpdateElement', this).call(this);
            return model;
        }
    }, {
        key: 'prediction',
        value: function prediction(body_data) {
            var defered = _q2['default'].defer();
            var promise = defered.promise;

            //En muchas clases se genera this._resource en la llamada a la funcion this._composeElement()

            this._ogapi.Napi.post(this._buildURL() + '/prediction', body_data, this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL()).then(function (res) {
                defered.resolve({
                    statusCode: res.statusCode,
                    body: res.body
                });
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }
    }, {
        key: 'create',
        value: function create() {
            var _postElement = this._composeElement();

            var defer = _q2['default'].defer();

            this._ogapi.Napi.post_multipart(this._resource, { 'modelFile': _postElement.modelFile }, {}, this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL()).then(function (response) {
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
                            var _location = response.header && response.header.location;
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
    }, {
        key: 'update',
        value: function update() {
            var _postElement = this._composeElement();

            var defer = _q2['default'].defer();

            this._ogapi.Napi.put_multipart(this._buildURL(), { 'modelFile': _postElement.modelFile }, {}, this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL()).then(function (response) {
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

    return AIModels;
})(_provisionBaseProvision2['default']);

exports['default'] = AIModels;
module.exports = exports['default'];
//# sourceMappingURL=AIModels.js.map
