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
 * This is a base object that contains all you can do about ManufacturerMedia.
 */

var ManufacturerMedia = (function (_BaseProvision) {
    _inherits(ManufacturerMedia, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function ManufacturerMedia(ogapi, manufacturerId) {
        _classCallCheck(this, ManufacturerMedia);

        _get(Object.getPrototypeOf(ManufacturerMedia.prototype), 'constructor', this).call(this, ogapi, "/manufacturers/" + manufacturerId + '/media', undefined, ['identifier', 'name']);
    }

    //http://cm.amplia.es/jira/browse/OGODM-3201

    /**
     * Set the identifier attribute
     * @param {string} id - required field
     * @return {ManufacturerMedia}
     */

    _createClass(ManufacturerMedia, [{
        key: 'withIdentifier',
        value: function withIdentifier(id) {
            if (typeof id !== 'string' || id.length > 50) throw new Error("OGAPI_STRING_PARAMETER_MAX_LENGTH_50");
            this._identifier = id;
            return this;
        }

        /**
         * Set the name attribute
         * @param {string} name - required field
         * @return {ManufacturerMedia}
         */
    }, {
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string') throw new Error("OGAPI_STRING_PARAMETER");
            this._name = name;
            return this;
        }

        /**
         * Set the file attribute
         * @param {string} file - required field
         * @return {ManufacturerMedia}
         */
    }, {
        key: 'withFile',
        value: function withFile(file) {
            if (!file) throw new Error("OGAPI_NOT_EMPTY_PARAMETER");
            this._file = file;
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._checkRequiredParameters();

            var updateData = {
                media: {
                    id: this._identifier || undefined,
                    name: this._name || undefined
                }
            };

            return updateData;
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            var url = this._resource + "/" + this._identifier;
            return url;
        }
    }, {
        key: 'update',
        value: function update() {
            // Prevent update operations
            throw new Exception('OGAPI_METHOD_NOT_SUPPORTED');
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This method create an element deploymentElement
         * @param {File} rawFile - this File is the deployment element
         * @property {function (result:object, statusCode:number)} then - When request it is OK
         * @property {function (error:string)} catch - When request it is NOK
         * @return {Promise}     
         */
    }, {
        key: 'create',
        value: function create(rawFile) {
            var form = undefined;

            if (rawFile) {
                if (typeof rawFile !== 'string') {
                    form = new FormData();
                    var blob = new Blob([this._composeElement()], {
                        type: "application/json"
                    });

                    form.append('json', blob);

                    if (rawFile) {
                        form.append('file', rawFile);
                    }
                } else {
                    form = {};
                    form.json = JSON.stringify(this._composeElement());

                    if (rawFile) {
                        form.hardwareMedia = rawFile;
                    }
                }
            } else {
                form = new FormData();
                var blob = new Blob([JSON.stringify(this._composeElement())], {
                    type: "application/octet-stream"
                });

                form.append('json', blob);

                form.append('file', this._file);
            }

            var petitionOpts = {};

            if (this._progressEvent != undefined) {
                petitionOpts = {
                    'progress': this._progressEvent
                };
            }

            var defered = _q2['default'].defer();
            var promise = defered.promise;

            this._ogapi.Napi.post_multipart(this._resource, form, petitionOpts, this._timeout, this._getExtraHeaders(), this._getUrlParameters()).then(function (res) {
                if (res.statusCode === 201) {
                    defered.resolve({
                        location: res.header.location,
                        statusCode: res.statusCode
                    });
                } else {
                    defered.reject({
                        "errors": [{
                            code: res.statusCode,
                            message: "OGAPI_FILE_NOT_CREATE"
                        }],
                        "statusCode": res.statusCode
                    });
                }
            })['catch'](function (error) {
                defered.reject(error);
            });

            return promise;
        }
    }]);

    return ManufacturerMedia;
})(_provisionBaseProvision2['default']);

exports['default'] = ManufacturerMedia;
module.exports = exports['default'];
//# sourceMappingURL=ManufacturerMedia.js.map
