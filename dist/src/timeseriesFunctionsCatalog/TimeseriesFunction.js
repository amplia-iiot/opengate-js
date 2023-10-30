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

var _utilFormatsCheck_types = require('../util/formats/check_types');

var _utilFormatsCheck_types2 = _interopRequireDefault(_utilFormatsCheck_types);

var _TYPES_ENUM = require('./TYPES_ENUM');

/**
 * This is a base object that contains all you can do about TimeseriesFunction.
 */
var URL = 'timeseries/provision/organizations';
exports.URL = URL;

var TimeseriesFunction = (function (_BaseProvision) {
    _inherits(TimeseriesFunction, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function TimeseriesFunction(ogapi, organization, nameForUpdate) {
        _classCallCheck(this, TimeseriesFunction);

        _get(Object.getPrototypeOf(TimeseriesFunction.prototype), 'constructor', this).call(this, ogapi, "timeseries/provision/organizations");

        if (organization) {
            this.withOrganization(organization);

            // only for updates
            if (nameForUpdate) {
                this.withIdentifier(nameForUpdate);
            }
        }
    }

    /**
     * Set the name for update attribute
     * @param {string} name - required field
     * @return {TimeseriesFunction}
     */

    _createClass(TimeseriesFunction, [{
        key: 'withIdentifier',
        value: function withIdentifier(name) {
            _utilFormatsCheck_types2['default']._checkString(name, 'identifier');
            this._identifier = name;
            return this;
        }

        /**
         * Set the organization attribute
         * @param {string} organization - required field
         * @return {TimeseriesFunction}
         */
    }, {
        key: 'withOrganization',
        value: function withOrganization(organization) {
            _utilFormatsCheck_types2['default']._checkStringAndLength(organization, 50, 'organization');
            this._organization = organization;
            return this;
        }

        /**
         * Set the name attribute
         * @param {string} name - required field
         * @return {TimeseriesFunction}
         */
    }, {
        key: 'withName',
        value: function withName(name) {
            _utilFormatsCheck_types2['default']._checkString(name, 'name');
            this._name = name;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description 
         * @return {TimeseriesFunction}
         */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
            _utilFormatsCheck_types2['default']._checkString(description, 'description');
            this._description = description;
            return this;
        }

        /**
         * Set the script attribute
         * @param {string} script 
         * @return {TimeseriesFunction}
         */
    }, {
        key: 'withScript',
        value: function withScript(script) {
            _utilFormatsCheck_types2['default']._checkString(script, 'script');
            this._script = script;
            return this;
        }

        /**
         * Set the valueTypes attribute
         * @param {Array} valueTypes 
         * @return {TimeseriesFunction}
         */
    }, {
        key: 'withValueTypes',
        value: function withValueTypes(valueTypes) {
            _utilFormatsCheck_types2['default']._checkArray(valueTypes, 'valueTypes');

            valueTypes.forEach(function (typeTmp) {
                _utilFormatsCheck_types2['default']._checkType(typeTmp, _TYPES_ENUM.VALUE_TYPES_ENUM);
            });
            this._valueTypes = valueTypes;
            return this;
        }

        /**
         * Set the returnType attribute
         * @param {String} returnType
         * @return {TimeseriesFunction}
         */
    }, {
        key: 'withReturnType',
        value: function withReturnType(returnType) {
            _utilFormatsCheck_types2['default']._checkString(returnType, 'returnType');
            _utilFormatsCheck_types2['default']._checkType(returnType, _TYPES_ENUM.VALUE_TYPES_ENUM);

            this._returnType = returnType;
            return this;
        }
    }, {
        key: 'withMetadataFile',
        value: function withMetadataFile(file) {
            // if (typeof file !== 'object')
            //     throw new Error({ message: "Parameter action requires name and type", parameter: 'action' });
            this._metadataFile = file;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement(isUpdate) {
            this._checkRequiredParameters(isUpdate);

            var updateData = {
                'script': this._script
            };

            if (this._metadataFile) {
                updateData.metadata = this._metadataFile;
            } else {
                var blob = new Blob([JSON.stringify({
                    "name": this._name,
                    "description": this._description,
                    "valueTypes": this._valueTypes || [],
                    "returnType": this._returnType || undefined
                })], {
                    type: "application/json"
                });

                updateData.metadata = blob;
            }

            return updateData;
        }
    }, {
        key: '_checkRequiredParameters',
        value: function _checkRequiredParameters(isUpdate) {
            if (isUpdate) {
                // if (this._script === undefined || this._identifier === undefined || this._organization === undefined || this._name === undefined || this._description === undefined)
                if (!(this._script && (this._metadataFile || this._identifier && this._organization && this._name && this._description))) throw new Error('Parameters organization, identifier, name, description and script must be defined');
            } else {
                //if (this._script === undefined || this._name === undefined || this._organization === undefined || this._description === undefined)
                if (!(this._script && (this._metadataFile || this._organization && this._name && this._description))) throw new Error('Parameters organization, name, description and script must be defined');
            }
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            return URL + "/" + this._organization + "/catalog" + (this._identifier ? '/' + this._identifier : '');
        }
    }, {
        key: 'create',
        value: function create() {
            var defer = _q2['default'].defer();

            this._ogapi.Napi.post_multipart(this._buildURL(), this._composeElement(), {}, this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL()).then(function (response) {
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

        /** 
         * Udpate a Rule
         * @return {Promise}
         * @throws {Error} 
         */
    }, {
        key: 'update',
        value: function update() {
            var defer = _q2['default'].defer();

            this._ogapi.Napi.put_multipart(this._buildURL(), this._composeElement(true), {}, this._timeout, this._getExtraHeaders(), this._getUrlParameters(), this._getServiceBaseURL()).then(function (response) {
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

        /** 
         * Deletes the selected RuleConfiguration
         * @return {Promise}
         * @throws {Error} 
         */
    }, {
        key: 'delete',
        value: function _delete() {
            if (this._identifier === undefined || this._organization === undefined) throw new Error('Parameters organization and name must be defined');

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

    return TimeseriesFunction;
})(_provisionBaseProvision2['default']);

exports['default'] = TimeseriesFunction;
//# sourceMappingURL=TimeseriesFunction.js.map
