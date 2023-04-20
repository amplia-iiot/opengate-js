'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _provisionBaseProvision = require('../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

/**
 * This is a base object that contains all you can do about OperationTypeScript.
 */

var OperationTypeScript = (function (_BaseProvision) {
    _inherits(OperationTypeScript, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function OperationTypeScript(ogapi, organization, operationIdentifier, script) {
        _classCallCheck(this, OperationTypeScript);

        _get(Object.getPrototypeOf(OperationTypeScript.prototype), 'constructor', this).call(this, ogapi, "/organizations");

        // Required
        this.withOrganization(organization);
        this.withIdentifier(operationIdentifier);

        if (script) {
            this.withScript(script);
        }
    }

    /**
     * Set the operation type identifier for update attribute
     * @param {string} name - required field
     * @return {OperationTypeScript}
     */

    _createClass(OperationTypeScript, [{
        key: 'withIdentifier',
        value: function withIdentifier(name) {
            if (typeof name !== 'string' || name.length === 0) throw new Error('Parameter identifier must be a string, cannot be empty and has a maximum length of 50');
            this._identifier = name;
            return this;
        }

        /**
         * Set the organization attribute
         * @param {string} organization - required field
         * @return {OperationTypeScript}
         */
    }, {
        key: 'withOrganization',
        value: function withOrganization(organization) {
            if (typeof organization !== 'string' || organization.length === 0 || organization.length > 50) throw new Error('Parameter organization must be a string, cannot be empty and has a maximum length of 50');
            this._organization = organization;
            return this;
        }

        /**
         * Set the script attribute
         * @param {string} script - required field
         * @return {OperationTypeScript}
         */
    }, {
        key: 'withScript',
        value: function withScript(script) {
            if (!script) throw new Error('Parameter script cannot be empty');
            this._script = script;
            return this;
        }
    }, {
        key: '_checkRequiredParameters',
        value: function _checkRequiredParameters() {
            if (this._identifier === undefined || this._organization === undefined || this._script === undefined) throw new Error('Parameters organization, operation type identifier and script must be defined');
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            return "operationTypes/" + this._resource + "/" + this._organization + "/" + this._identifier + "/scripts";
        }

        /** 
         * Create a new Rule
         * @return {Promise}
         * @throws {Error} 
         */
    }, {
        key: 'create',
        value: function create() {
            this._checkRequiredParameters();

            var form = undefined;
            if (typeof this._script === 'string') {
                form = new Blob([this._script]);
            } else {
                form = this._script;
            }
            var defer = _q2['default'].defer();

            var petitionUrl = this._buildURL();

            this._ogapi.Napi.post_multipart(petitionUrl, form, {}, this._timeout, this._getExtraHeaders(), this._getUrlParameters()).then(function (response) {
                var statusCode = response.statusCode;
                if (statusCode === 200 || statusCode === 201 || statusCode === 204) {
                    defer.resolve(response);
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

        /** 
         * Udpate a Rule
         * @return {Promise}
         * @throws {Error} 
         */
    }, {
        key: 'update',
        value: function update() {
            this._checkRequiredParameters();

            var form = undefined;
            if (typeof this._script === 'string') {
                form = new Blob([this._script]);
            } else {
                form = this._script;
            }
            var defer = _q2['default'].defer();

            var petitionUrl = this._buildURL();

            this._ogapi.Napi.put_multipart(petitionUrl, form, {}, this._timeout, this._getExtraHeaders(), this._getUrlParameters()).then(function (response) {
                var statusCode = response.statusCode;
                if (statusCode === 200 || statusCode === 201 || statusCode === 204) {
                    defer.resolve(response);
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

        /** 
         * Deletes the selected RuleConfiguration
         * @return {Promise}
         * @throws {Error} 
         */
    }, {
        key: 'delete',
        value: function _delete() {
            if (this._identifier === undefined || this._organization === undefined) throw new Error('Parameters organization and identifier must be defined');

            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._ogapi.Napi['delete'](this._buildURL()).then(function (res) {
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
    }]);

    return OperationTypeScript;
})(_provisionBaseProvision2['default']);

exports['default'] = OperationTypeScript;
module.exports = exports['default'];
//# sourceMappingURL=OperationTypeScript.js.map
