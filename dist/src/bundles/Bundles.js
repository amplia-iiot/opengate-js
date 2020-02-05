'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ACTION_ENUM = require('./ACTION_ENUM');

var _deploymentDeploymentElement = require('./deployment/DeploymentElement');

var _deploymentDeploymentElement2 = _interopRequireDefault(_deploymentDeploymentElement);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _provisionBaseProvision = require('../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

/**
 * This is a base object that contains all you can do about Bundles.
 */

var Bundles = (function (_BaseProvision) {
    _inherits(Bundles, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function Bundles(ogapi) {
        _classCallCheck(this, Bundles);

        _get(Object.getPrototypeOf(Bundles.prototype), 'constructor', this).call(this, ogapi, "/bundles");
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Bundles}
     */

    _createClass(Bundles, [{
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string' || name.length > 255) throw new Error("OGAPI_NAME_PARAMETER_MAX_LENGTH_255");
            this._name = name;
            return this;
        }

        /**
         * Set the version attribute
         * @param {string} version 
         * @return {Bundles}
         */
    }, {
        key: 'withVersion',
        value: function withVersion(version) {
            if (typeof version !== 'string' || version.length > 50) throw new Error({
                message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50",
                parameter: 'version'
            });
            this._version = version;
            return this;
        }

        /**
         * Set the hardware attribute
         * @param {string} hardware 
         * @return {Bundles}
         */
    }, {
        key: 'withHardware',
        value: function withHardware(hardware) {
            if (typeof hardware !== 'string') throw new Error('Parameter hardware must be a string');
            this._hardware = hardware;
            return this;
        }

        /**
         * Set the workgroup attribute
         * @param {string} workgroup 
         * @return {Bundles}
         */
    }, {
        key: 'withWorkgroup',
        value: function withWorkgroup(workgroup) {
            if (typeof workgroup !== 'string') throw new Error('Parameter workgroup must be a string');
            this._workgroup = workgroup;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description 
         * @return {Bundles}
         */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
            if (typeof description !== 'string' || description.length > 250) throw new Error({
                message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_250",
                parameter: 'description'
            });
            this._description = description;
            return this;
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
        key: '_checkActions',
        value: function _checkActions(actions, name) {
            if (typeof actions === "undefined" || actions.constructor !== Array) {
                throw new Error("Parameter " + name + " must be typeof Array");
            }
            var not_found = [];
            for (var i = 0; i < actions.length; i++) {
                var found = _ACTION_ENUM.ACTION_ENUM.find(function (action) {
                    return action == this;
                }, actions[i]);
                if (typeof found === "undefined") {
                    not_found.push(actions[i]);
                }
            }
            if (not_found.length !== 0) {
                throw new Error("Any action into parameter " + name + " is not allowed. Parameter value <'" + JSON.stringify(not_found) + "'>, " + name + " allowed <'" + JSON.stringify(_ACTION_ENUM.ACTION_ENUM) + "'>");
            }
            return actions;
        }

        /**
         * Set the preaction attribute
         * @param {string} preaction 
         * @return {Bundles}
         */
    }, {
        key: 'withPreaction',
        value: function withPreaction(preaction) {
            this._preaction = this._checkActions(preaction, 'preaction');
            return this;
        }

        /**
         * Set the postactions attribute
         * @param {string} postactions 
         * @return {Bundles}
         */
    }, {
        key: 'withPostaction',
        value: function withPostaction(postactions) {
            this._postaction = this._checkActions(postactions, 'postaction');
            return this;
        }

        /**
         * Set the userNotes attribute
         * @param {string} userNotes 
         * @return {Bundles}
         */
    }, {
        key: 'withUserNotes',
        value: function withUserNotes(userNotes) {
            if (typeof userNotes !== 'string' || userNotes.length > 250) throw new Error({
                message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_250",
                parameter: 'notes'
            });
            this._userNotes = userNotes;
            return this;
        }

        /**
         * Set the active attribute
         * @param {string} active 
         * @return {Bundles}
         */
    }, {
        key: 'withActive',
        value: function withActive(active) {
            if (typeof active !== 'boolean') throw new Error('Parameter active must be a boolean');
            this._active = active;
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            if (this._name === undefined || this._version === undefined) {
                throw new Error('Parameters name, version must be defined');
            }

            var updateData = {
                bundle: {
                    name: this._name || undefined,
                    version: this._version || undefined,
                    hardware: this._hardware || undefined,
                    workgroup: this._workgroup || undefined,
                    description: this._description || undefined,
                    preaction: this._preaction || undefined,
                    postaction: this._postaction || undefined,
                    userNotes: this._userNotes || undefined,
                    active: this._active || undefined
                }
            };

            return updateData;
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            if (this._name === undefined || this._version === undefined) throw new Error('Parameters name, version must be defined');
            var url = this._resource + "/" + this._name + "/versions/" + this._version;
            return url;
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function activates a bundle
         * @return {Promise}
         * @property {function (result:object, statusCode:number)} then - When request it is OK
         * @property {function (error:string)} catch - When request it is NOK
         * @example
         *  ogapi.bundlesBuilder().activate()
         */
    }, {
        key: 'activate',
        value: function activate() {
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._ogapi.Napi.put(this._buildURL(), {
                bundle: {
                    active: true
                }
            }, undefined, this._getExtraHeaders(), this._getUrlParameters()).then(function (res) {
                if (res.statusCode === 200) {
                    defered.resolve({
                        statusCode: res.statusCode
                    });
                } else {
                    defered.reject({
                        "errors": [{
                            code: res.statusCode,
                            message: "OGAPI_BUNDLE_NOT_ACTIVE"
                        }],
                        "statusCode": res.statusCode
                    });
                }
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }

        /**
         * This invoke a request to OpenGate North API and the callback is managed by promises
         * This function deactivates a bundle
         * @return {Promise}
         * @property {function (result:object, statusCode:number)} then - When request it is OK
         * @property {function (error:string)} catch - When request it is NOK
         * @example
         *  ogapi.bundlesBuilder().deactivate()
         */
    }, {
        key: 'deactivate',
        value: function deactivate() {
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._ogapi.Napi.put(this._buildURL(), {
                bundle: {
                    active: false
                }
            }, undefined, this._getExtraHeaders(), this._getUrlParameters()).then(function (res) {
                //console.log(JSON.stringify(res));
                if (res.statusCode === 200) {
                    defered.resolve({
                        statusCode: res.statusCode
                    });
                } else {
                    defered.reject({
                        "errors": [{
                            code: res.statusCode,
                            message: "OGAPI_BUNDLE_NOT_DEACTIVE"
                        }],
                        "statusCode": res.statusCode
                    });
                }
            })['catch'](function (error) {
                //console.log(error);
                defered.reject(error);
            });
            return promise;
        }

        /**
         * Create deployment element that is asociated to the Bundle
         *
         * @example
         *  ogapi.bundlesBuilder().newDeploymentElement()
         * @return {DeploymentElement} 
         */
    }, {
        key: 'addDeploymentElement',
        value: function addDeploymentElement(progressEvent) {
            if (this._name === undefined || this._version === undefined) {
                throw new Error('Parameters name, version must be defined');
            }

            if (!this._deploymentElements) {
                this._deploymentElements = [];
            }

            //var newDE = new DeploymentElement(this._parent, this._ogapi.Napi, encodeURI(this._buildURL()), progressEvent);
            var newDE = new _deploymentDeploymentElement2['default'](this._parent, this._ogapi, encodeURI(this._buildURL()), progressEvent);
            this._deploymentElements.push(newDE);

            return this._deploymentElements[this._deploymentElements.length - 1];
        }

        /**
         * Deploy all elements of a bundle in only one method
         *
         * @example
         *  ogapi.bundlesBuilder().deployAndActivate()
         * @return {DeploymentElement} 
         */
    }, {
        key: 'deployAndActivate',
        value: function deployAndActivate() {
            var _this = this;

            var defered = _q2['default'].defer();
            var promise = defered.promise;

            if (_this._deploymentElements && _this._deploymentElements.length > 0) {
                //validaciones
                var totalTB = 0;

                var de = 0;
                for (de = 0; de < _this._deploymentElements.length; de++) {
                    var val = 0;
                    //console.log(de + ":" + JSON.stringify(_this._deploymentElements[de]));

                    if (_this._deploymentElements[de]._validators && _this._deploymentElements[de]._validators.length > 0) {
                        for (val = 0; val < _this._deploymentElements[de]._validators.length; val++) {
                            //console.log(JSON.stringify(_this._deploymentElements[de]._validators[val]));
                            if (_this._deploymentElements[de]._validators[val].mode === 'TRUSTED_BOOT') {
                                totalTB += 1;
                            }
                        }
                    }
                }

                if (totalTB > 1) {
                    throw new Error("OGAPI_422_ONE_TRUSTED_BOOT_ALLOWED");
                }
            }

            _this._allPromisesOk = true;
            var onCreateBundle = function onCreateBundle(res) {
                if (res.statusCode === 201) {
                    (function () {
                        var bundleLocation = res;
                        if (_this._deploymentElements && _this._deploymentElements.length > 0) {
                            (function () {
                                //console.log("previa de 2: ");
                                var dePromises = [];
                                _this._deploymentElements.forEach(function (deTmp) {
                                    dePromises.push(deTmp.deploy());
                                });

                                // update de bundle
                                Promise.all(dePromises).then(function () {
                                    if (_this._allPromisesOk) {

                                        _this.activate().then(function (status, data) {
                                            defered.resolve(bundleLocation);
                                        })['catch'](function (err) {
                                            defered.reject(err);
                                        });
                                    }
                                })['catch'](function (err) {
                                    _this._allPromisesOk = false;
                                    onCreateBundleError(err);
                                });
                            })();
                        } else {
                            defered.resolve(bundleLocation);
                        }
                    })();
                } else {
                    onCreateBundleError({
                        "statusCode": res.statusCode
                    });
                }
            };

            var onCreateBundleError = function onCreateBundleError(err) {
                //console.log("Create error: " + JSON.stringify(err));
                //console.log('borrando bundle');
                _this['delete']();
                defered.reject(err);
            };

            _this.create().then(onCreateBundle)['catch'](onCreateBundleError);

            return promise;
        }

        /**
         * Creates a new bundle
         *
         * @example
         *  ogapi.bundlesBuilder().create()
         * @return {Promise}
         */
    }, {
        key: 'create',
        value: function create() {
            var _this2 = this;

            if (this._name === undefined || this._version === undefined || this._hardware === undefined || this._workgroup === undefined) throw new Error('Parameters name, version, hardware and workgroup must be defined');

            //console.log("CREANDO");
            var _this = this;

            var defered = _q2['default'].defer();
            var promise = defered.promise;

            var onCreateBundle = function onCreateBundle(res) {
                if (res.statusCode === 201) {
                    //console.log("OK1: " + JSON.stringify(res));
                    defered.resolve(res);
                } else {
                    onCreateBundleError({
                        "statusCode": res.statusCode
                    });
                }
            };

            var onCreateBundleError = function onCreateBundleError(err) {
                //console.log(JSON.stringify(err));
                //console.log('borrando bundle')
                defered.reject(err);
            };

            // Se intenta crear primero el bundle
            var bundleFinder = _this._ogapi.newBundleFinder().findByNameAndVersion(_this._name, _this._version).then(function (ok) {
                if (ok[1] === 204) {
                    //console.log("asdhflkasdfj 1");
                    _get(Object.getPrototypeOf(Bundles.prototype), 'create', _this2).call(_this2).then(onCreateBundle)['catch'](onCreateBundleError);
                } else {
                    defered.reject({
                        "errors": [{
                            code: 204,
                            message: "OGAPI_400_BUNDLE_EXIST"
                        }],
                        "statusCode": 400
                    });
                }
            })['catch'](function (err) {
                if (err.statusCode === 404) {
                    //console.log("asdhflkasdfj 2");
                    _get(Object.getPrototypeOf(Bundles.prototype), 'create', _this2).call(_this2).then(onCreateBundle)['catch'](onCreateBundleError);
                } else {
                    defered.reject({
                        "errors": [{
                            code: 204,
                            message: "OGAPI_400_BUNDLE_EXIST"
                        }],
                        "statusCode": 400
                    });
                }
            });

            return promise;
        }

        /**
         * Updates a bundle
         *
         * @example
         *  ogapi.bundlesBuilder().update()
         * @return {Promise}
         */
    }, {
        key: 'update',
        value: function update() {
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            var bundleUpdate = this._composeElement();

            delete bundleUpdate.bundle.name;
            delete bundleUpdate.bundle.version;
            delete bundleUpdate.bundle.workgroup;
            delete bundleUpdate.bundle.hardware;

            this._ogapi.Napi.put(this._buildURL(), bundleUpdate, undefined, this._getExtraHeaders(), this._getUrlParameters()).then(function (res) {
                if (res.statusCode === 200) {
                    defered.resolve({
                        statusCode: res.statusCode
                    });
                } else {
                    defered.reject({
                        "errors": [{
                            code: res.statusCode,
                            message: "OGAPI_400_BUNDLE_NOT_UPDATED"
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

    return Bundles;
})(_provisionBaseProvision2['default']);

exports['default'] = Bundles;
module.exports = exports['default'];
//# sourceMappingURL=Bundles.js.map
