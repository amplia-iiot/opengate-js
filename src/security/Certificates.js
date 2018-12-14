'use strict';

import Security from './Security';
import q from 'q';
import {
    ADMINISTRATIVE_STATE_ENUM
} from './ADMINISTRATIVE_STATE_ENUM';
import {
    USAGES_ENUM
} from './USAGES_ENUM';
const max_length_name = 50;
const max_length_id = 50;
const max_length_description = 200;

/**
 * This is a base object that contains all you can do about Certificates.
 */
export default class Certificates extends Security {

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/certificates");

    }

    /**
     * Set the id attribute
     * @param {string} id - required field on delete
     * @return {Certificates}
     */
    withId(id) {
        if (typeof id !== 'string' || id.length === 0 || id.length > max_length_id)
            throw new Error('Parameter id must be a string, cannot be empty and has a maximum length of ' + max_length_id);
        this._id = id;
        return this;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Certificates}
     */
    withName(name) {
        if (typeof name !== 'string' || name.length === 0 || name.length > max_length_name)
            throw new Error('Parameter name must be a string, cannot be empty and has a maximum length of ' + max_length_name);
        this._name = name;
        return this;
    }

    /**
     * Set the description attribute
     * @param {string} description - optional field
     * @return {Certificates}
     */
    withDescription(description) {
        if (typeof description !== 'string' || description.length === 0 || description.length > max_length_description)
            throw new Error('Parameter description must be a string, cannot be empty and has a maximum length of ' + max_length_description);
        this._description = description;
        return this;
    }



    /**
     * Set the administrativeState attribute
     * @param {string} administrativeState 
     * @return {Certificates}
     */
    withAdministrativeState(administrativeState) {

        if (typeof administrativeState !== 'string' || administrativeState.length <= 0) {
            throw new Error("Parameter administrativeState must be typeof string and cannot be empty");
        }

        let not_found = '';
        let found = ADMINISTRATIVE_STATE_ENUM.find(function (administrativeState) {
            return administrativeState == this;
        }, administrativeState);
        if (typeof found === "undefined") {
            not_found = administrativeState;
        }

        if (not_found !== '') {
            throw new Error("Parameter in administrativeState is not allowed. Parameter value '" +
                JSON.stringify(not_found) + "', parameters allowed in administrativeState are: '" + JSON.stringify(ADMINISTRATIVE_STATE_ENUM) + "'");
        }
        this._administrativeState = administrativeState;
        return this;
    }


    /**
     * Set the usages attribute
     * @param {Array} usages 
     * @return {Certificates}
     */

    withUsages(usages) {
        if (typeof usages === "undefined" || usages.constructor !== Array || usages.length === 0) {
            throw new Error("Parameter usages must be typeof Array and cannot be empty");
        }
        let not_found = [];
        for (let i = 0; i < usages.length; i++) {
            let found = USAGES_ENUM.find(function (usages) {
                return usages == this;
            }, usages[i]);
            if (typeof found === "undefined") {
                not_found.push(usages[i]);
            }
        }
        if (not_found.length !== 0) {
            throw new Error("There are not any parameters allowed. Parameters value: '" + JSON.stringify(not_found) + "'. Usages parameters allowed are: '" + JSON.stringify(USAGES_ENUM) + "'");
        }
        this._usages = usages;
        return this;
    }

    /**
     * Set the hardwares attribute
     * @param {Array} hardware 
     * @return {Certificates}
     */

    withHardware(hardware) {
        let not_found = [];
        if (typeof hardware === "undefined" || hardware.constructor !== Array || hardware.length === 0) {
            throw new Error("Parameter hardwares must be typeof Array and cannot be empty");
        }

        for (let i = 0; i < hardware.length; i++) {
            if (!this._checkHardware(hardware[i])) {
                not_found.push(i + 1);
            } else {
                try {
                    hardware[i] = JSON.parse(hardware[i]);
                } catch (igerr) {

                }
            }
        }
        if (not_found.length !== 0) {

            throw new Error("The hardware attribute is not well formed, the message " +
                JSON.stringify(not_found) + " not correct. Remember: hardwareId or [manufacturer, model and modelVersion] must be defined"
            );
        }
        this._hardware = hardware;
        return this;
    }

    _checkHardware(hardware) {
        if (typeof hardware === 'string') {
            hardware = eval('(' + hardware + ')');
        }

        let length = Object.keys(hardware).length;

        let valid = false;

        if (length === 1 && hardware.hardwareId &&
            typeof hardware.hardwareId === 'string' && hardware.hardwareId.length > 0) {
            valid = true;
        } else if (length === 3 && hardware.manufacturer && hardware.model && hardware.modelVersion &&
            typeof hardware.manufacturer === 'string' &&
            typeof hardware.model === 'string' &&
            typeof hardware.modelVersion === 'string' &&
            hardware.manufacturer.length > 0 && hardware.model.length > 0 &&
            hardware.modelVersion.length > 0) {
            valid = true;
        }
        return valid;
    }
    /**
     * Set the tags attribute
     * @param {Array} tags 
     * @return {Certificates}
     */

    withTags(tags) {
        if (typeof tags === "undefined" || tags.constructor !== Array || tags.length <= 0) {
            throw new Error("Parameter tags must be typeof Array and cannot be empty");
        }
        let not_correct = [];
        for (let i = 0; i < tags.length; i++) {
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
    withParameters(parameters) {
        if (typeof parameters !== 'string' || parameters.length === 0)
            throw new Error('Parameter parameters must be a string, cannot be empty');
        this._parameters = parameters;
        return this;
    }

    /**
     * Set the domains attribute
     * @param {Array} domains 
     * @return {Certificates}
     */

    withDomains(domains) {
        if (typeof domains === "undefined" || domains.constructor !== Array || domains.length <= 0) {
            throw new Error("Parameter domains must be typeof Array and cannot be empty");
        }
        let not_correct = [];
        for (let i = 0; i < domains.length; i++) {
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
    _composeElement() {

        if (this._name === undefined || this._administrativeState === undefined ||
            this._usages === undefined)
            throw new Error('Parameters name, usages, administrativeState  must be defined');

        let data = {
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
    create(rawFile) {
        let form;
        if (typeof rawFile !== 'string') {
            form = new FormData();
            let blob = new Blob([JSON.stringify(this._composeElement())], {
                type: "application/json"
            });
            form.append('json', blob);

            let certificate = new Blob([rawFile], {
                type: "application/x-pem-file"
            });

            if (rawFile) {
                form.append('certificate', certificate);
                //form.append('certificate', rawFile);
            }
        } else {
            //console.log("fileData");
            form = {};
            form.json = JSON.stringify(this._composeElement());

            form.certificate = rawFile;
        }

        let defered = q.defer();
        let promise = defered.promise;
        this._ogapi.Napi.post_multipart(this._resource, form, {
                // onprogress: this._progressEvent
            }, this._timeout, this._getExtraHeaders(), this._getUrlParameters())
            .then((response) => {
                let statusCode = response.statusCode;
                if (statusCode === 201) {
                    if (typeof this._onCreated === "function") {
                        this._onCreated(response.header.location);
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
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;
    }

    _onCreated(location) {
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

    update() {

        var form = this._composeElement();
        delete form.certificate.id;

        let defered = q.defer();
        let promise = defered.promise;
        this._ogapi.Napi.put(this._buildURL(), form)
            .then((response) => {
                let data = response.body;
                if (typeof data === "undefined")
                    defered.reject("Cannot update the certificate");
                else
                    defered.resolve(data, response.statusCode);
            })
            .catch((error) => {
                console.log(error);
                defered.reject(error);
            });
        return promise;
    }

    _buildURL() {
        if (this._id === undefined)
            throw new Error('Parameters id must be defined');
        let url = this._resource + "/" + this._id;

        return url;

    }


}