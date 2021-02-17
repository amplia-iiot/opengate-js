'use strict';

import {
    ACTION_ENUM
} from './ACTION_ENUM';
import DeploymentElement from './deployment/DeploymentElement';
import q from 'q';
import BaseProvision from '../provision/BaseProvision';

/**
 * This is a base object that contains all you can do about Bundles.
 */
export default class Bundles extends BaseProvision {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/bundles");

    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Bundles}
     */
    withName(name) {
        if (typeof name !== 'string' || name.length > 255)
            throw new Error("OGAPI_NAME_PARAMETER_MAX_LENGTH_255");
        this._name = name;
        return this;
    }

    /**
     * Set the version attribute
     * @param {string} version 
     * @return {Bundles}
     */
    withVersion(version) {
        if (typeof version !== 'string' || version.length > 50)
            throw new Error({
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
    withHardware(hardware) {
        if (typeof hardware !== 'string')
            throw new Error('Parameter hardware must be a string');
        this._hardware = hardware;
        return this;
    }


    /**
     * Set the workgroup attribute
     * @param {string} workgroup 
     * @return {Bundles}
     */
    withWorkgroup(workgroup) {
            if (typeof workgroup !== 'string')
                throw new Error('Parameter workgroup must be a string');
            this._workgroup = workgroup;
            return this;
        }
        /**
         * Set the description attribute
         * @param {string} description 
         * @return {Bundles}
         */
    withDescription(description) {
        if (typeof description !== 'string' || description.length > 250)
            throw new Error({
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
    withTimeout(ms) {
        if (typeof ms !== "number") throw new Error('Parameter ms must be a number');
        this._timeout = ms;
        return this;
    }

    _checkActions(actions, name) {
        if (typeof actions === "undefined" || actions.constructor !== Array) {
            throw new Error("Parameter " + name + " must be typeof Array");
        }
        let not_found = [];
        for (var i = 0; i < actions.length; i++) {
            let found = ACTION_ENUM.find(function(action) {
                return action == this;
            }, actions[i]);
            if (typeof found === "undefined") {
                not_found.push(actions[i]);
            }
        }
        if (not_found.length !== 0) {
            throw new Error("Any action into parameter " + name + " is not allowed. Parameter value <'" + JSON.stringify(not_found) + "'>, " + name + " allowed <'" + JSON.stringify(ACTION_ENUM) + "'>");
        }
        return actions;
    }

    /**
     * Set the preaction attribute
     * @param {string} preaction 
     * @return {Bundles}
     */
    withPreaction(preaction) {
        this._preaction = this._checkActions(preaction, 'preaction');
        return this;
    }

    /**
     * Set the postactions attribute
     * @param {string} postactions 
     * @return {Bundles}
     */
    withPostaction(postactions) {
        this._postaction = this._checkActions(postactions, 'postaction');
        return this;
    }

    /**
     * Set the userNotes attribute
     * @param {string} userNotes 
     * @return {Bundles}
     */
    withUserNotes(userNotes) {
        if (typeof userNotes !== 'string' || userNotes.length > 250)
            throw new Error({
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
    withActive(active) {
        if (typeof active !== 'boolean')
            throw new Error('Parameter active must be a boolean');
        this._active = active;
        return this;
    }

    _composeElement() {
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

    _buildURL() {
        if (this._name === undefined || this._version === undefined)
            throw new Error('Parameters name, version must be defined');
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
    activate() {
        var defered = q.defer();
        var promise = defered.promise;
        this._ogapi.Napi.put(this._buildURL(), {
                bundle: {
                    active: true
                }
            }, undefined, this._getExtraHeaders(), this._getUrlParameters())
            .then((res) => {
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
            })
            .catch((error) => {
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
    deactivate() {
        var defered = q.defer();
        var promise = defered.promise;
        this._ogapi.Napi.put(this._buildURL(), {
                bundle: {
                    active: false
                }
            }, undefined, this._getExtraHeaders(), this._getUrlParameters())
            .then((res) => {
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
            })
            .catch((error) => {
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
    addDeploymentElement(progressEvent) {
        if (this._name === undefined || this._version === undefined) {
            throw new Error('Parameters name, version must be defined');
        }

        if (!this._deploymentElements) {
            this._deploymentElements = [];
        }

        //var newDE = new DeploymentElement(this._parent, this._ogapi.Napi, encodeURI(this._buildURL()), progressEvent);
        var newDE = new DeploymentElement(this._parent, this._ogapi, encodeURI(this._buildURL()), progressEvent);
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
    deployAndActivate() {
        let _this = this;

        let defered = q.defer();
        let promise = defered.promise;

        if (_this._deploymentElements && _this._deploymentElements.length > 0) { //validaciones
            let totalTB = 0;

            let de = 0;
            for (de = 0; de < _this._deploymentElements.length; de++) {
                let val = 0;
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
        let onCreateBundle = function(res) {
            if (res.statusCode === 201) {
                let bundleLocation = res;
                if (_this._deploymentElements && _this._deploymentElements.length > 0) {
                    //console.log("previa de 2: ");
                    let dePromises = [];
                    _this._deploymentElements.forEach(function(deTmp) {
                        dePromises.push(deTmp.deploy());
                    });

                    // update de bundle
                    Promise.all(dePromises).then(function() {
                        if (_this._allPromisesOk) {

                            _this.activate().then(function(status, data) {
                                defered.resolve(bundleLocation);
                            }).catch(function(err) {
                                defered.reject(err);
                            });

                        }
                    }).catch(function(err) {
                        _this._allPromisesOk = false;
                        onCreateBundleError(err);
                    });
                } else {
                    defered.resolve(bundleLocation);
                }
            } else {
                onCreateBundleError({
                    "statusCode": res.statusCode
                });
            }
        };

        let onCreateBundleError = function(err) {
            //console.log("Create error: " + JSON.stringify(err));
            //console.log('borrando bundle');
            _this.delete();
            defered.reject(err);
        };

        _this.create().then(onCreateBundle).catch(onCreateBundleError);

        return promise;

    }

    /**
     * Creates a new bundle
     *
     * @example
     *  ogapi.bundlesBuilder().create()
     * @return {Promise}
     */
    create() {
        if (this._name === undefined || this._version === undefined ||
            this._hardware === undefined || this._workgroup === undefined)
            throw new Error('Parameters name, version, hardware and workgroup must be defined');

        let defered = q.defer();
        let promise = defered.promise;

        let onCreateBundle = function(res) {
            if (res.statusCode === 201) {
                defered.resolve(res);
            } else {
                onCreateBundleError({
                    "statusCode": res.statusCode
                });
            }
        };

        let onCreateBundleError = function(err) {
            defered.reject(err);
        };

        // Se intenta crear primero el bundle
        this._ogapi.newBundleFinder().findByNameAndVersion(this._name, this._version)
            .then((response) => {
                if (response.statusCode === 204) {
                    super.create().then(onCreateBundle).catch(onCreateBundleError);
                } else {
                    defered.reject({
                        "errors": [{
                            code: 204,
                            message: "OGAPI_400_BUNDLE_EXIST"
                        }],
                        "statusCode": 400
                    });
                }
            }).catch((err) => {
                if (err.statusCode === 404) {
                    super.create().then(onCreateBundle).catch(onCreateBundleError);
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
    update() {
        let defered = q.defer();
        let promise = defered.promise;
        let bundleUpdate = this._composeElement();

        delete bundleUpdate.bundle.name;
        delete bundleUpdate.bundle.version;
        delete bundleUpdate.bundle.workgroup;
        delete bundleUpdate.bundle.hardware;

        this._ogapi.Napi.put(this._buildURL(), bundleUpdate, undefined, this._getExtraHeaders(), this._getUrlParameters())
            .then((res) => {
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
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }
}