'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Security2 = require('./Security');

var _Security3 = _interopRequireDefault(_Security2);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _ADMINISTRATIVE_STATE_ENUM = require('./ADMINISTRATIVE_STATE_ENUM');

var _USAGES_ENUM = require('./USAGES_ENUM');

var max_length_name = 50;
var max_length_id = 50;
var max_length_description = 200;

/**
 * This is a base object that contains all you can do about Certificates.
 */

var Certificates = (function (_Security) {
    _inherits(Certificates, _Security);

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function Certificates(ogapi) {
        _classCallCheck(this, Certificates);

        _get(Object.getPrototypeOf(Certificates.prototype), 'constructor', this).call(this, ogapi, "/certificates");
    }

    /**
     * Set the id attribute
     * @param {string} id - required field on delete
     * @return {Certificates}
     */

    _createClass(Certificates, [{
        key: 'withId',
        value: function withId(id) {
            if (typeof id !== 'string' || id.length === 0 || id.length > max_length_id) throw new Error('Parameter id must be a string, cannot be empty and has a maximum length of ' + max_length_id);
            this._id = id;
            return this;
        }

        /**
         * Set the name attribute
         * @param {string} name - required field
         * @return {Certificates}
         */
    }, {
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string' || name.length === 0 || name.length > max_length_name) throw new Error('Parameter name must be a string, cannot be empty and has a maximum length of ' + max_length_name);
            this._name = name;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description - optional field
         * @return {Certificates}
         */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
            if (typeof description !== 'string' || description.length === 0 || description.length > max_length_description) throw new Error('Parameter description must be a string, cannot be empty and has a maximum length of ' + max_length_description);
            this._description = description;
            return this;
        }

        /**
         * Set the administrativeState attribute
         * @param {string} administrativeState 
         * @return {Certificates}
         */
    }, {
        key: 'withAdministrativeState',
        value: function withAdministrativeState(administrativeState) {

            if (typeof administrativeState !== 'string' || administrativeState.length <= 0) {
                throw new Error("Parameter administrativeState must be typeof string and cannot be empty");
            }

            var not_found = '';
            var found = _ADMINISTRATIVE_STATE_ENUM.ADMINISTRATIVE_STATE_ENUM.find(function (administrativeState) {
                return administrativeState == this;
            }, administrativeState);
            if (typeof found === "undefined") {
                not_found = administrativeState;
            }

            if (not_found !== '') {
                throw new Error("Parameter in administrativeState is not allowed. Parameter value '" + JSON.stringify(not_found) + "', parameters allowed in administrativeState are: '" + JSON.stringify(_ADMINISTRATIVE_STATE_ENUM.ADMINISTRATIVE_STATE_ENUM) + "'");
            }
            this._administrativeState = administrativeState;
            return this;
        }

        /**
         * Set the usages attribute
         * @param {Array} usages 
         * @return {Certificates}
         */

    }, {
        key: 'withUsages',
        value: function withUsages(usages) {
            if (typeof usages === "undefined" || usages.constructor !== Array || usages.length === 0) {
                throw new Error("Parameter usages must be typeof Array and cannot be empty");
            }
            var not_found = [];
            for (var i = 0; i < usages.length; i++) {
                var found = _USAGES_ENUM.USAGES_ENUM.find(function (usages) {
                    return usages == this;
                }, usages[i]);
                if (typeof found === "undefined") {
                    not_found.push(usages[i]);
                }
            }
            if (not_found.length !== 0) {
                throw new Error("There are not any parameters allowed. Parameters value: '" + JSON.stringify(not_found) + "'. Usages parameters allowed are: '" + JSON.stringify(_USAGES_ENUM.USAGES_ENUM) + "'");
            }
            this._usages = usages;
            return this;
        }
    }, {
        key: '_checkHardware',
        value: function _checkHardware(hardware) {
            if (typeof hardware === 'string') {
                hardware = eval('(' + hardware + ')');
            }

            var length = Object.keys(hardware).length;

            var valid = false;

            if (length === 1 && hardware.hardwareId && typeof hardware.hardwareId === 'string' && hardware.hardwareId.length > 0) {
                valid = true;
            } else if (length === 3 && hardware.manufacturer && hardware.model && hardware.modelVersion && typeof hardware.manufacturer === 'string' && typeof hardware.model === 'string' && typeof hardware.modelVersion === 'string' && hardware.manufacturer.length > 0 && hardware.model.length > 0 && hardware.modelVersion.length > 0) {
                valid = true;
            }
            return valid;
        }

        /**
         * Set the tags attribute
         * @param {Array} tags 
         * @return {Certificates}
         */

    }, {
        key: 'withTags',
        value: function withTags(tags) {
            if (typeof tags === "undefined" || tags.constructor !== Array || tags.length <= 0) {
                throw new Error("Parameter tags must be typeof Array and cannot be empty");
            }
            var not_correct = [];
            for (var i = 0; i < tags.length; i++) {
                if (typeof tags[i] === "undefined" || typeof tags[i] !== 'string' || typeof tags[i].length <= 0) {
                    not_correct.push(tags[i]);
                }
            }
            if (not_correct.length !== 0) {
                throw new Error("The following tags values are not allowed:" + JSON.stringify(not_correct));
            }

            this._tags = tags;
            return this;
        }

        /**
         * Set the parameters attribute
         * @param {string} parameters - optional field
         * @return {Certificates}
         */
    }, {
        key: 'withParameters',
        value: function withParameters(parameters) {
            if (typeof parameters !== 'string' || parameters.length === 0) throw new Error('Parameter parameters must be a string, cannot be empty');
            this._parameters = parameters;
            return this;
        }

        /**
         * Set the domains attribute
         * @param {Array} domains 
         * @return {Certificates}
         */

    }, {
        key: 'withDomains',
        value: function withDomains(domains) {
            if (typeof domains === "undefined" || domains.constructor !== Array || domains.length <= 0) {
                throw new Error("Parameter domains must be typeof Array and cannot be empty");
            }
            var not_correct = [];
            for (var i = 0; i < domains.length; i++) {
                if (typeof domains[i] === "undefined" || typeof domains[i] !== 'string' || typeof domains[i].length <= 0) {
                    not_correct.push(domains[i]);
                }
            }
            if (not_correct.length !== 0) {
                throw new Error("The following domains values are not allowed:" + JSON.stringify(not_correct));
            }

            this._domains = domains;
            return this;
        }

        /**
         * Compose json message to create a certificate
         * @return {String} This returns a message with certificate's parameters
         * @private
         */
    }, {
        key: '_composeElement',
        value: function _composeElement() {

            if (this._name === undefined || this._administrativeState === undefined || this._usages === undefined) throw new Error('Parameters name, usages, administrativeState  must be defined');

            var data = {
                certificate: {
                    id: this._id || undefined,
                    name: this._name || undefined,
                    description: this._description || undefined,
                    administrativeState: this._administrativeState || undefined,
                    usages: this._usages || undefined,
                    hardware: this._hardware || undefined,
                    tags: this._tags || undefined,
                    parameters: this._parameters || undefined,
                    domains: this._domains || undefined
                }
            };
            return data;
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This method create an element certificate
         * @param {File} rawFile - this File is the certificate
         * @property {function (result:object, statusCode:number)} then - When request it is OK
         * @property {function (error:string)} catch - When request it is NOK
         * @return {Promise}     
         */
    }, {
        key: 'create',
        value: function create(rawFile) {
            var _this = this;

            var form = undefined;
            if (typeof rawFile !== 'string') {
                form = new FormData();
                var blob = new Blob([JSON.stringify(this._composeElement())], {
                    type: "application/json"
                });
                form.append('json', blob);

                var certificate = new Blob([rawFile], {
                    type: "application/x-pem-file"
                });

                if (rawFile) {
                    form.append('certificate', certificate);
                    //form.append('certificate', rawFile);
                }
            } else {
                    form = {};
                    form.json = JSON.stringify(this._composeElement());

                    form.certificate = rawFile;
                }

            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._ogapi.Napi.post_multipart(this._resource, form, {
                // onprogress: this._progressEvent
            }, this._timeout, this._getExtraHeaders(), this._getUrlParameters()).then(function (response) {
                var statusCode = response.statusCode;
                if (statusCode === 201) {
                    if (typeof _this._onCreated === "function") {
                        _this._onCreated(response.header.location);
                    }
                    defered.resolve({
                        location: response.header.location,
                        statusCode: statusCode
                    });
                } else {
                    defered.reject({
                        errors: response.errors,
                        statusCode: statusCode
                    });
                }
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }
    }, {
        key: '_onCreated',
        value: function _onCreated(location) {
            var id = location.split('/').pop(-1);
            this.withId(id);
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This method update an element certificate
         * @property {function (result:object, statusCode:number)} then - When request it is OK
         * @property {function (error:string)} catch - When request it is NOK
         * @return {Promise}     
         */

    }, {
        key: 'update',
        value: function update() {

            var form = this._composeElement();
            delete form.certificate.id;

            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._ogapi.Napi.put(this._buildURL(), form, undefined, this._getExtraHeaders(), this._getUrlParameters()).then(function (response) {
                var data = response.body;
                if (typeof data === "undefined") defered.reject("Cannot update the certificate");else defered.resolve(data, response.statusCode);
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            if (this._id === undefined) throw new Error('Parameters id must be defined');
            var url = this._resource + "/" + this._id;

            return url;
        }
    }]);

    return Certificates;
})(_Security3['default']);

exports['default'] = Certificates;
module.exports = exports['default'];
//# sourceMappingURL=Certificates.js.map
