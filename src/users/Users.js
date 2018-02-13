'use strict';

import BaseProvision from '../provision/BaseProvision';
import q from 'q';

const _length_name = 100;
const _length_surname = 100;
const _length_email = 100;
const _length_password = 50;
/**
 *   This class allow make get request to user resource into Opengate North API.
 */
export default class User extends BaseProvision {


    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */
    constructor(ogapi) {
        super(ogapi, "/users", undefined, ["email", "workgroup", "domain", "profile", "countryCode", "langCode"]);
    }



    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {User}
     */
    withName(name) {
        if (typeof name !== 'string' || name.length > _length_name)
            throw new Error('Parameter name must be a string and has a maximum length of ' + _length_name);
        this._name = name;
        return this;
    }

    /**
     * Set the surname attribute
     * @param {string} surname - required field
     * @return {User}
     */
    withSurname(surname) {
        if (typeof surname !== 'string' || surname.length > _length_surname)
            throw new Error('Parameter surname must be a string and has a maximum length of ' + _length_surname);
        this._surname = surname;
        return this;
    }

    /**
     * Set the email attribute
     * @param {string} email - required field
     * @return {User}
     */
    withEmail(email) {
        if (typeof email !== 'string' || email.length > _length_email)
            throw new Error('Parameter email must be a string and has a maximum length of ' + _length_email);
        this._email = email;
        return this;
    }

    /**
     * Set the password attribute
     * @param {string} password - required field
     * @return {User}
     */
    withPassword(password) {
        if (typeof password !== 'string' || password.length > _length_password)
            throw new Error('Parameter password must be a string and has a maximum length of ' + _length_password);
        this._password = password;
        return this;
    }

    /**
     * Set the workgroup attribute
     * @param {string} workgroup - required field
     * @return {User}
     */
    withWorkgroup(workgroup) {
        if (typeof workgroup !== 'string')
            throw new Error('OGAPI_STRING_PARAMETER_WORKGROUP');
        this._workgroup = workgroup;
        return this;
    }

    /**
     * Set the domain attribute
     * @param {string} domain - required field
     * @return {User}
     */
    withDomain(domain) {
        if (typeof domain !== 'string')
            throw new Error('OGAPI_STRING_PARAMETER_DOMAIN');
        this._domain = domain;
        return this;
    }

    /**
     * Set the profile attribute
     * @param {string} profile - required field
     * @return {User}
     */
    withProfile(profile) {
        if (typeof profile !== 'string')
            throw new Error('OGAPI_STRING_PARAMETER_PROFILE');
        this._profile = profile;
        return this;
    }

    /**
     * Set the countryCode attribute
     * @param {string} countryCode - required field
     * @return {User}
     */
    withCountryCode(countryCode) {
        if (typeof countryCode !== 'string')
            throw new Error('OGAPI_STRING_PARAMETER_COUNTRY_CODE');
        this._countryCode = countryCode;
        return this;
    }

    /**
     * Set the langCode attribute
     * @param {string} langCode - required field
     * @return {User}
     */
    withLangCode(langCode) {
        if (typeof langCode !== 'string')
            throw new Error('OGAPI_STRING_PARAMETER_LANGUAGE');
        this._langCode = langCode;
        return this;
    }


    /**
     * Set the description attribute
     * @param {string} description - required field
     * @return {User}
     */
    withDescription(description) {
        if (typeof description !== 'string')
            throw new Error('OGAPI_STRING_PARAMETER_DESCRIPTION');
        this._description = description;
        return this;

    }

    /**
     * Compose url to delete an user
     * @return {String} This returns a string with the URL of the request.
     * @private
     */
    _buildURL() {
        if (this._email === undefined)
            throw new Error('OGAPI_EMAIL_MUST_BE_DEFINED');
        var url = this._resource + "/" + this._email;

        return url;

    }

    /**
     * Compose json message to create a user
     * @return {String} This returns a message with user's parameters
     * @private
     */
    _composeElement() {

        var data = {
            user: {
                name: this._name || undefined,
                surname: this._surname || undefined,
                password: this._password || undefined,
                description: this._description || undefined,
                email: this._email || undefined,
                workgroup: this._workgroup || undefined,
                domain: this._domain || undefined,
                profile: this._profile || undefined,
                countryCode: this._countryCode || undefined,
                langCode: this._langCode || undefined
            }
        };

        return data;

    }

    /**
     * Compose json message to update a user
     * @return {String} This returns a message with user's parameters
     * @private
     */
    _composeUpdateElement() {
        if (this._password) {
            throw new Error('OGAPI_PASSWORD_NOT_ALLOWED');
        }
        if (this._email === undefined ||
            (this._workgroup === undefined && this._domain !== undefined) ||
            (this._workgroup !== undefined && this._domain === undefined))
            throw new Error('OGAPI_USER_UPDATE_PARAMETER_MUST_BE_DEFINED');

        var data = {
            user: {
                name: this._name || undefined,
                surname: this._surname || undefined,
                description: this._description || undefined,
                email: this._email || undefined,
                workgroup: this._workgroup || undefined,
                domain: this._domain || undefined,
                profile: this._profile || undefined,
                countryCode: this._countryCode || undefined,
                langCode: this._langCode || undefined
            }
        };
        return data;
    }

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * This function updates a password of a user
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     * @example
     *  ogapi.organizationsBuilder().withEmail(example@example.es).withPassword(oldPassword).updatePassword(newPassword);
     */
    updatePassword(newPassword) {
        this._newPassword = newPassword;
        if (this._email === undefined || this._password === undefined || this._newPassword === undefined) {
            throw new Error('OGAPI_USER_UPDATE_PASSWORD_PARAMETER_MUST_BE_DEFINED');
        }

        var data = {
            user: {
                password: this._newPassword
            }
        };

        var defered = q.defer();
        var promise = defered.promise;
        this._setExtraHeaders({ 'X-ApiPass': this._password });

        this._ogapi.Napi.put(this._buildURL(), data, this._getExtraHeaders())
            .then((res) => {
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
            })
            .catch((error) => {
                defered.reject(error);
            });
        return promise;

    }
}