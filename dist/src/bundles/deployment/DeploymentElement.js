'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _OPERATION_ENUM = require('./OPERATION_ENUM');

var _OPTION_ENUM = require('./OPTION_ENUM');

var _TYPE_ENUM = require('./TYPE_ENUM');

var _TYPE_VALIDATORS_ENUM = require('./TYPE_VALIDATORS_ENUM');

var _MODE_VALIDATORS_ENUM = require('./MODE_VALIDATORS_ENUM');

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _provisionBaseProvision = require('../../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

/**
 * This is a base object that contains all you can do about Deployment Element.
 */

var DeploymentElement = (function (_BaseProvision) {
    _inherits(DeploymentElement, _BaseProvision);

    function DeploymentElement(context, ogapi, url, progressEvent) {
        _classCallCheck(this, DeploymentElement);

        _get(Object.getPrototypeOf(DeploymentElement.prototype), 'constructor', this).call(this, ogapi, url + "/deploymentElements");
        // this.Napi = Napi;
        this._progressEvent = progressEvent;

        this._resource = url + "/deploymentElements";
        //console.log(this._resource);
        this.validation = false;
        this._name = undefined;
        this._version = undefined;
        this._type = undefined;
        this._path = undefined;
        this._order = undefined;
        this._operation = undefined;
        this._option = undefined;
        this._fileName = undefined;
        this._downloadUrl = undefined;
        this._validators = undefined;
        this._oldName = undefined;
        this._oldVersion = undefined;
        this._oldPath = undefined;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {DeploymentElement}
     */

    _createClass(DeploymentElement, [{
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string' || name.length > 50) throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'name' });
            this._name = name;
            return this;
        }

        /**
         * Set the version attribute
         * @param {string} version - required field
         * @return {DeploymentElement}
         */
    }, {
        key: 'withVersion',
        value: function withVersion(version) {
            if (typeof version !== 'string' || version.length > 50) throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'version' });
            this._version = version;
            return this;
        }

        /**
         * Set the type attribute
         * @param {string} type - required field
         * @return {DeploymentElement}
         */
    }, {
        key: 'withType',
        value: function withType(type) {
            if (typeof type === "undefined" || typeof type !== 'string') {
                throw new Error({ message: 'OGAPI_STRING_PARAMETER', parameter: 'type' });
            }
            var not_found = '';
            var found = _TYPE_ENUM.TYPE_ENUM.find(function (action) {
                return action == this;
            }, type);
            if (typeof found === "undefined") {
                not_found = type;
            }

            if (not_found !== '') {
                throw new Error({ message: "OGAPI_NOT_ALLOWED_PARAMETER", parameter: JSON.stringify(not_found), allowed: JSON.stringify(_TYPE_ENUM.TYPE_ENUM) });
            }
            this._type = type;
            return this;
        }

        /**
         * Set the path attribute
         * @param {string} path - required field
         * @return {DeploymentElement}
         */
    }, {
        key: 'withPath',
        value: function withPath(path) {
            if (typeof path !== 'string') throw new Error({ message: 'OGAPI_STRING_PARAMETER', parameter: 'path' });
            this._path = path;
            return this;
        }

        /**
         * Set the order attribute
         * @param {string} order - required field
         * @return {DeploymentElement}
         */
    }, {
        key: 'withOrder',
        value: function withOrder(order) {
            /*if (typeof order !== 'string')
                throw new Error('Parameter order must be a string');*/
            this._order = order;
            return this;
        }

        /**
         * Set the operation attribute
         * @param {string} operation - required field
         * @return {DeploymentElement}
         */
    }, {
        key: 'withOperation',
        value: function withOperation(operation) {
            if (typeof operation === "undefined" || typeof operation !== 'string') {
                throw new Error({ message: "OGAPI_STRING_PARAMETER", parameter: "operation" });
            }

            var not_found = '';
            var found = _OPERATION_ENUM.OPERATION_ENUM.find(function (operation) {
                return operation == this;
            }, operation);

            if (typeof found === "undefined") {
                not_found = operation;
            }

            if (not_found !== '') {
                throw new Error("Parameter operation is not allowed. Parameter value <'" + JSON.stringify(not_found) + "'>, operation allowed <'" + JSON.stringify(_OPERATION_ENUM.OPERATION_ENUM) + "'>");
            }
            this._operation = operation;
            return this;
        }

        /**
         * Set the option attribute
         * @param {string} option 
         * @return {DeploymentElement}
         */
    }, {
        key: 'withOption',
        value: function withOption(option) {
            if (typeof option === "undefined" || typeof option !== 'string') {
                throw new Error({ message: "OGAPI_STRING_PARAMETER", parameter: "option" });
            }

            var not_found = '';
            var found = _OPTION_ENUM.OPTION_ENUM.find(function (option) {
                return option == this;
            }, option);
            if (typeof found === "undefined") {
                not_found = option;
            }

            if (not_found !== '') {
                throw new Error("Parameter option is not allowed. Parameter value <'" + JSON.stringify(not_found) + "'>, option allowed <'" + JSON.stringify(_OPTION_ENUM.OPTION_ENUM) + "'>");
            }
            this._option = option;
            return this;
        }

        /**
         * Set the validators attribute
         * @param {Array} validators 
         * @return {DeploymentElement}
         */
    }, {
        key: 'withValidators',
        value: function withValidators(validators) {
            var validator = {};
            var validatorsArray = [];

            if (typeof validators === "undefined" || validators.constructor !== Array) {
                throw new Error("Parameter validators must be typeof Array");
            }

            // Validar si los validators son correctos, solo se permite un firmware

            var trustedBootExists = false;
            for (var i = 0; i < validators.length; i++) {
                validator = this._checkValidator(validators[i]);

                if (validator.mode === 'TRUSTED_BOOT') {
                    if (!trustedBootExists) {
                        trustedBootExists = true;
                    } else {
                        throw new Error("OGAPI_422_ONE_TRUSTED_BOOT_ALLOWED_DEPLOY_ELEMENT");
                    }
                }
                validatorsArray.push(validator);
            }
            this._validators = validatorsArray;

            return this;
        }
    }, {
        key: '_checkValidator',
        value: function _checkValidator(validator) {

            var validatorElement = {};

            if (validator.mode) {
                var not_found = '';
                var mode = validator.mode;

                if (typeof mode === "undefined" || typeof mode !== 'string') {
                    throw new Error({ message: "OGAPI_STRING_PARAMETER", parameter: "type" });
                }

                var foundMode = _MODE_VALIDATORS_ENUM.MODE_VALIDATORS_ENUM.find(function (action) {
                    return action == this;
                }, mode);

                if (typeof foundMode === "undefined") {
                    not_found = mode;
                }

                if (not_found !== '') {
                    throw new Error("Parameter type is not allowed. Parameter value <'" + JSON.stringify(not_found) + "'>, type allowed <'" + JSON.stringify(_MODE_VALIDATORS_ENUM.MODE_VALIDATORS_ENUM) + "'>");
                }

                // Se valida que TRUSTED_BOOT sea sólo para firmwares
                if (mode !== 'TRUSTED_BOOT' || mode === 'TRUSTED_BOOT' && this._type === 'FIRMWARE') {
                    validatorElement.mode = mode;
                } else {
                    throw new Error("TRUSTED_BOOT validator only allowed for FIRMWARE deployment element");
                }
            } else {
                // por defecto se pone el primero de la lista
                validatorElement.mode = _MODE_VALIDATORS_ENUM.MODE_VALIDATORS_ENUM[0];
            }

            // Type es obligatorio
            if (validator.type) {
                var not_found = '';
                var type = validator.type;
                if (typeof type === "undefined" || typeof type !== 'string') {
                    throw new Error({ message: "OGAPI_STRING_PARAMETER", parameter: "type" });
                }

                var found = _TYPE_VALIDATORS_ENUM.TYPE_VALIDATORS_ENUM.find(function (action) {
                    return action == this;
                }, type);

                if (typeof found === "undefined") {
                    not_found = type;
                }

                if (not_found !== '') {
                    throw new Error("Parameter type is not allowed. Parameter value <'" + JSON.stringify(not_found) + "'>, type allowed <'" + JSON.stringify(_TYPE_VALIDATORS_ENUM.TYPE_VALIDATORS_ENUM) + "'>");
                }

                validatorElement.type = type;
            } else {
                throw new Error("Parameter type is required");
            }

            // si el validador es el primero de la lista (PLATFORM)
            if (validatorElement.mode === _MODE_VALIDATORS_ENUM.MODE_VALIDATORS_ENUM[0]) {
                if (validator.value) {
                    var value = validator.value;
                    if (typeof value !== 'string') throw new Error('Parameter value must be a string');

                    validatorElement.value = value;
                } else {
                    throw new Error("Parameter value is required when mode is " + _MODE_VALIDATORS_ENUM.MODE_VALIDATORS_ENUM[0]);
                }
            }

            return validatorElement;
        }

        /**
         * Set the downloadUrl attribute
         * @param {string} downloadUrl 
         * @return {DeploymentElement}
         */
    }, {
        key: 'withDownloadUrl',
        value: function withDownloadUrl(downloadUrl) {
            if (typeof downloadUrl !== 'string') throw new Error('Parameter downloadUrl must be a string');
            this._downloadUrl = downloadUrl;
            return this;
        }

        /**
         * Set the fileName attribute
         * @param {string} fileName 
         * @return {DeploymentElement}
         */
    }, {
        key: 'withFileName',
        value: function withFileName(fileName) {
            if (typeof fileName !== 'string') throw new Error('Parameter fileName must be a string');
            this._fileName = fileName;
            return this;
        }

        /**
         * Set the validation attribute
         * @param {string} validation 
         * @return {DeploymentElement}
         */
    }, {
        key: 'withValidation',
        value: function withValidation(validation) {
            if (typeof validation !== 'boolean') throw new Error('Parameter validation must be a boolean');
            this.validation = validation;
            return this;
        }

        /**
         * Sets the old name attribute
         * @param {string} name 
         * @return {DeploymentElement}
         */
    }, {
        key: 'withOldName',
        value: function withOldName(name) {
            if (typeof name !== 'string') throw new Error('Parameter old name must be a string');
            this._oldName = name;
            return this;
        }

        /**
         * Sets the old version attribute
         * @param {string} version 
         * @return {DeploymentElement}
         */
    }, {
        key: 'withOldVersion',
        value: function withOldVersion(version) {
            if (typeof version !== 'string') throw new Error('Parameter old version must be a string');
            this._oldVersion = version;
            return this;
        }

        /**
         * Sets the old path attribute
         * @param {string} path 
         * @return {DeploymentElement}
         */
    }, {
        key: 'withOldPath',
        value: function withOldPath(path) {
            if (typeof path !== 'string') throw new Error('Parameter old path must be a string');
            this._oldPath = path;
            return this;
        }

        /**
         * Sets the file to upload
         * @param {object} rawFile 
         * @return {DeploymentElement}
         */
    }, {
        key: 'withFile',
        value: function withFile(rawFile) {
            //console.log(rawFile);
            this._rawFile = rawFile;
            return this;
        }

        /**
         * @return {String} This returns a json with the element for create a deployment element.
         * @private
         */
    }, {
        key: '_composeUrlCreate',
        value: function _composeUrlCreate() {
            if (this._name === undefined || this._version === undefined || this._name === '' || this._version === '') throw new Error('Method not allowed - You must to define the name and version');
            return this._resource + "?fileValidationRequired=" + this.validation;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            if (this._name === undefined || this._version === undefined || this._type === undefined || this._path === undefined || this._order === undefined || this._operation === undefined || this._option === undefined) throw new Error('Method not allowed - You must define the basic element [name, version, type, path, order, option and operation]');
            var meta = {
                deploymentElement: {
                    name: this._name || undefined,
                    version: this._version || undefined,
                    type: this._type || undefined,
                    path: this._path || undefined,
                    order: this._order || undefined,
                    operation: this._operation || undefined,
                    option: this._option || undefined,
                    fileName: this._fileName || undefined,
                    downloadUrl: this._downloadUrl || undefined,
                    validators: this._validators || undefined,
                    oldName: this._oldName || undefined,
                    oldVersion: this._oldVersion || undefined,
                    oldPath: this._oldPath || undefined
                }
            };
            //console.log(JSON.stringify(meta));
            return meta;
        }

        /**
         * The request will have a specific time out if it will be exceeded then the promise throw an exception
         * @param {number} ms - timeout in milliseconds    
         * @return {Bundles} 
         */
    }, {
        key: 'withTimeout',
        value: function withTimeout(ms) {
            if (typeof ms !== "number") throw new Error('Parameter ms must be a number');
            this._timeout = ms;
            return this;
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            if (this._name === undefined || this._version === undefined) throw new Error('Parameters name, version must be defined');
            return this._resource + "/" + this._name + "/version/" + this._version;;
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
        key: 'createWithFile',
        value: function createWithFile(rawFile) {
            var form = undefined;
            if (typeof rawFile !== 'string') {
                form = new FormData();
                var blob = new Blob([JSON.stringify(this._composeElement())], { type: "application/octet-stream" });

                form.append('meta', blob);

                if (rawFile) {
                    form.append('file', rawFile);
                }
            } else {
                form = {};
                form.meta = JSON.stringify(this._composeElement());

                if (rawFile) {
                    form.file = rawFile;
                }
            }

            var petitionOpts = {};

            if (this._progressEvent != undefined) {
                petitionOpts = { 'progress': this._progressEvent };
            }

            var defered = _q2['default'].defer();
            var promise = defered.promise;

            this._ogapi.Napi.post_multipart(this._composeUrlCreate(), form, petitionOpts, this._timeout).then(function (res) {
                if (res.statusCode === 201) {
                    defered.resolve({ location: res.header['location'], statusCode: res.statusCode });
                } else {
                    defered.reject({ errors: res.errors, statusCode: res.statusCode });
                }
            })['catch'](function (error) {
                defered.reject(error);
            });

            return promise;
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This method create an element deploymentElement with previously assignated file
         * @property {function (result:object, statusCode:number)} then - When request it is OK
         * @property {function (error:string)} catch - When request it is NOK
         * @return {Promise}     
         */
    }, {
        key: 'deploy',
        value: function deploy() {
            //console.log("creando antes file: " + this._rawFile);
            return this.createWithFile(this._rawFile);
        }

        /**
         * This method invalidates the update option
         * @throws {Allways} Deployment elements cannot be updated.
         */
    }, {
        key: 'update',
        value: function update() {
            throw new Error("OGAPI_DEPLOYMENT_ELEMENT_NOT_UPDATED");
        }
    }]);

    return DeploymentElement;
})(_provisionBaseProvision2['default']);

exports['default'] = DeploymentElement;
module.exports = exports['default'];
//# sourceMappingURL=DeploymentElement.js.map
