'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

/**
 * This is an abstract class, it must be extended to another class that defines the different actions of a specific provision.
 * This class is responsible for managing the request to execute Norte OpenGate API
 */

var BaseProvision = (function () {
    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} resource - this is a base url resource
     * @param {!number} [timeout] - timeout on request
     * @param {array} requiredParameters
     * @param {string} serviceBaseURL - base of the uri petition
     */

    function BaseProvision(ogapi, resource, timeout, requiredParameters, serviceBaseURL) {
        if (requiredParameters === undefined) requiredParameters = [];

        _classCallCheck(this, BaseProvision);

        if (this.constructor === BaseProvision) {
            throw new Error("Cannot construct Abstract instances directly");
        }
        if (typeof this._composeElement !== "function") {
            throw new Error("Must override method:  composeElement");
        }
        if (typeof this._buildURL !== "function") {
            throw new Error("Must override method:  _buildURL");
        }
        if (timeout) {
            if (typeof timeout !== 'number') {
                this._timeout = ogapi.Napi._options.timeout;
            } else {
                this._timeout = timeout;
            }
        }

        this._ogapi = ogapi;
        this._resource = 'provision' + resource;
        this._requiredParameters = requiredParameters;
        this._headers = undefined;
        this._urlParameters = undefined;
        this._serviceBaseURL = serviceBaseURL;
    }

    _createClass(BaseProvision, [{
        key: '_checkRequiredParameters',
        value: function _checkRequiredParameters() {
            var parametersNotFound = [];
            if (this._requiredParameters && this._requiredParameters.length > 0) {
                for (var i = 0; i < this._requiredParameters.length; i++) {
                    if (this[this._requiredParameters[i]] === undefined && this["_" + this._requiredParameters[i]] === undefined) {
                        parametersNotFound.push(this._requiredParameters[i]);
                    }
                }

                if (parametersNotFound.length > 0) {
                    throw new Error("There are required parameters that have not been set. Missing parameters: " + JSON.stringify(parametersNotFound).replace(new RegExp("\"", 'g'), ""));
                }
            }
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function create a entity of provision
         * @return {Promise}
         * @property {function (result:object, statusCode:number)} then - When request it is OK
         * @property {function (error:string)} catch - When request it is NOK
         * @example
         *  ogapi.organizationsBuilder().create()
         */
    }, {
        key: 'create',
        value: function create() {
            var _this = this;

            this._checkRequiredParameters();

            var defered = _q2['default'].defer();
            var promise = defered.promise;

            //En muchas clases se genera this._resource en la llamada a la funcion this._composeElement()

            var _postElement = this._composeElement();
            this._ogapi.Napi.post(this._resource, _postElement, this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL()).then(function (res) {
                if (res.statusCode === 201) {
                    if (typeof _this._onCreated === "function") {
                        _this._onCreated(res.header.location);
                    }
                    defered.resolve({
                        location: res.header.location,
                        statusCode: res.statusCode
                    });
                } else {
                    defered.reject({
                        errors: res.errors,
                        statusCode: res.statusCode
                    });
                }
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function deletes a entity of provision
         * @return {Promise}
         * @property {function (result:object, statusCode:number)} then - When request it is OK
         * @property {function (error:string)} catch - When request it is NOK
         * @example
         * ogapi.organizationsBuilder().withName('delete_organization').delete();
         * ogapi.usersBuilder().withEmail('delete@user.com').delete();
         * ogapi.certificatesBuilder().withId('d3l3t3-c3rt1f1c4t3').delete();
         */
    }, {
        key: 'delete',
        value: function _delete(body) {
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._ogapi.Napi['delete'](this._buildURL(), this._timeout, this._getExtraHeaders(), this._getUrlParameters(), body, this._getServiceBaseURL()).then(function (res) {
                if (res.statusCode === 200) {
                    defered.resolve({
                        statusCode: res.statusCode
                    });
                } else {
                    defered.reject({
                        errors: res.errors,
                        statusCode: res.statusCode
                    });
                }
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function updates a entity of provision
         * @return {Promise}
         * @property {function (result:object, statusCode:number)} then - When request it is OK
         * @property {function (error:string)} catch - When request it is NOK
         * @example
         *  ogapi.organizationsBuilder().update()
         */
    }, {
        key: 'update',
        value: function update() {
            var defered = _q2['default'].defer();
            var promise = defered.promise;

            this._ogapi.Napi.put(this._buildURL(), this._composeUpdateElement(), this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL()).then(function (res) {
                if (res.statusCode === 200) {
                    defered.resolve({
                        statusCode: res.statusCode
                    });
                } else if (res.status === 200) {
                    defered.resolve({
                        statusCode: res.status
                    });
                } else {
                    defered.reject({
                        errors: res.errors,
                        statusCode: res.statusCode
                    });
                }
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }
    }, {
        key: '_composeUpdateElement',
        value: function _composeUpdateElement() {
            return this._composeElement();
        }
    }, {
        key: '_doNorthPut',
        value: function _doNorthPut(resource, element) {
            var defered = _q2['default'].defer();
            var promise = defered.promise;

            this._ogapi.Napi.put(resource, element, this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL()).then(function (res) {
                if (res.statusCode === 200) {
                    defered.resolve({
                        statusCode: res.statusCode
                    });
                } else if (res.status === 200) {
                    defered.resolve({
                        statusCode: res.status
                    });
                } else {
                    defered.reject({
                        errors: res.errors,
                        statusCode: res.statusCode
                    });
                }
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }
    }, {
        key: '_doNorthPost',
        value: function _doNorthPost(resource, element) {
            var _this2 = this;

            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._ogapi.Napi.post(resource, element, this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL()).then(function (res) {
                if (res.statusCode === 201) {
                    if (typeof _this2._onCreated === "function") {
                        _this2._onCreated(res.header.location);
                    }
                    defered.resolve({
                        location: res.header.location,
                        statusCode: res.statusCode
                    });
                } else if (res.statusCode === 200) {
                    defered.resolve({
                        statusCode: res.statusCode
                    });
                } else {
                    defered.reject({
                        errors: res.errors,
                        statusCode: res.statusCode
                    });
                }
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }
    }, {
        key: '_getExtraHeaders',
        value: function _getExtraHeaders() {
            return this._headers;
        }
    }, {
        key: '_setExtraHeaders',
        value: function _setExtraHeaders(headers) {
            if (this._headers) {
                var keys = Object.keys(headers);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    this._headers[key] = headers[key];
                }
            } else {
                this._headers = headers;
            }
        }
    }, {
        key: '_getUrlParameters',
        value: function _getUrlParameters() {
            return this._urlParameters;
        }
    }, {
        key: '_setUrlParameters',
        value: function _setUrlParameters(parameters) {
            if (this._urlParameters) {
                var keys = Object.keys(parameters);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    this._urlParameters[key] = parameters[key];
                }
            } else {
                this._urlParameters = parameters;
            }
        }
    }, {
        key: '_checkValues',
        value: function _checkValues(value, enumName) {
            var not_found = [];
            var found = enumName.find(function (value) {
                return value == this;
            }, value);

            if (typeof found === "undefined") {
                not_found.push(value);
            }
            if (not_found.length !== 0) {
                console.warn("Parameter value not allowed <'" + JSON.stringify(not_found) + "'>, allowed <'" + JSON.stringify(enumName) + "'>");
            }
            return value;
        }
    }, {
        key: '_getServiceBaseURL',
        value: function _getServiceBaseURL() {
            return this._serviceBaseURL;
        }
    }]);

    return BaseProvision;
})();

exports['default'] = BaseProvision;
module.exports = exports['default'];
//# sourceMappingURL=BaseProvision.js.map
