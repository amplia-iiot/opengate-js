'use strict';

import BaseProvision from '../provision/BaseProvision';
import _ from 'lodash';
import { version as uuidVersion} from 'uuid';
import { validate as uuidValidate} from 'uuid';

const _length_name = 100;
const _length_surname = 100;
const _length_email = 100;
const _length_twoFaType = 100;
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
     * Set the apiKey attribute. Only on update user
     * @param {string} apiKey - required field
     * @return {User}
     */
    withApiKey(apiKey) {
        if(!this._validateUUID(apiKey)){
            throw new Error({ message: "OGAPI_USER_UPDATE_APIKEY_PARAMETER_INVALID", parameter: 'apiKey' });
        }
        this._apiKey = apiKey;
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
     * Set the timezone attribute
     * @param {string} timezone - required field
     * @return {User}
     */
    withTimezone(timezone) {
        if (typeof timezone !== 'string')
            throw new Error('OGAPI_STRING_PARAMETER_TIMEZONE');
        this._timezone = timezone;
        return this;

    }

    /**
     * Set the 2FaType attribute
     * @param {string} twoFaType - required field
     * @return {User}
     */
    with2FaType(twoFaType) {
        if (typeof twoFaType !== 'string' || twoFaType.length > _length_twoFaType)
            throw new Error('Parameter twoFaType must be a string and has a maximum length of ' + _length_twoFaType);
        this._twoFaType = twoFaType;
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
                langCode: this._langCode || undefined,
                timezone: this._timezone || undefined,
                "2FaType": this._twoFaType || undefined
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
        if (this._email === undefined)
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
                langCode: this._langCode || undefined,
                timezone: this._timezone || undefined,
                apiKey: this._apiKey || undefined,
                password: this._password || undefined,
                "2FaType": this._twoFaType || undefined
            }
        };
        return data;
    }

   
    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * This function updates a password of a user
     * @return {Promise}
     * @param {String} newPassword - required field
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     * @example
     *  ogapi.usersBuilder().withEmail(example@example.es).withPassword(oldPassword).changePassword(newPassword);
     */
    changePassword(newPassword) {
        this._newPassword = newPassword;
        if (_.isEmpty(this._email) || _.isEmpty(this._password) || _.isEmpty(this._newPassword)) {
            throw new Error('OGAPI_USER_UPDATE_PASSWORD_PARAMETER_MUST_BE_DEFINED');
        }

        var data = {
            user: {
                password: this._newPassword
            }
        };

        this._setExtraHeaders({
            'X-ApiPass': this._password
        });

        return this._doNorthPut(this._buildURL(), data);
    }

    _validateUUID(UUID){
        return uuidValidate(UUID) && uuidVersion(UUID) === 4
    }
    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * This function updates a apiKey of a user
     * @return {Promise}
     * @param {String} apiKey - required field
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     * @example
     *  ogapi.usersBuilder().withEmail(example@example.es).withPassword(oldPassword).changeApiKey(newPassword);
     */
    changeApiKey(apiKey) {
        this._apiKey = apiKey;
        if (_.isEmpty(this._email) || _.isEmpty(this._password) || _.isEmpty(this._apiKey)) {
            throw new Error('OGAPI_USER_UPDATE_APIKEY_PARAMETER_MUST_BE_DEFINED');
        }

        if(!this._validateUUID(apiKey)){
            throw new Error({ message: "OGAPI_USER_UPDATE_APIKEY_PARAMETER_INVALID", parameter: 'apiKey' });
        }

        var data = {
            user: {
                apiKey: this._apiKey
            }
        };

        this._setExtraHeaders({
            'X-ApiPass': this._password
        });

        return this._doNorthPut(this._buildURL(), data);
    }

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * This function request for new password when the user forgets it. 
     * Sends a password recovery email
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     * @example
     *  ogapi.usersBuilder().withEmail(example@example.es).requestResetPassword()
     */
    requestResetPassword() {
        if (_.isEmpty(this._email)) {
            throw new Error('OGAPI_USER_MAIL_RESET_PASSWORD_PARAMETER_MUST_BE_DEFINED');
        }
        var url = this._buildURL() + '/reset'
        return this._doNorthPost(url);
    }

    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * This function updates a password of a user with a tokenId
     * @param {String} newPassword - required field
     * @param {String} tokenId - required field
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     * @example
     *  ogapi.usersBuilder().withEmail(example@example.es).updatePassword(newPassword, tokenid);
     */
     updatePassword(newPassword, tokenId) {
        this._newPassword = newPassword;
        this._tokenId = tokenId;
        if (_.isEmpty(this._email)){
            throw new Error('OGAPI_USER_MAIL_RESET_PASSWORD_PARAMETER_MUST_BE_DEFINED');
        }
        if(_.isEmpty(this._newPassword)){
            throw new Error('OGAPI_USER_PASSWORD_RESET_PASSWORD_PARAMETER_MUST_BE_DEFINED');
        }

        if(_.isEmpty(tokenId)){
            throw new Error('OGAPI_USER_TOKENID_RESET_PASSWORD_PARAMETER_MUST_BE_DEFINED');
        }

        var data = {
            password: this._newPassword
        };


        var url = this._buildURL() + '/reset/' + tokenId
        
        return this._doNorthPost(url, data);
    }
    /**
     * This invoke a request to OpenGate North API and the callback is managed by promises
     * This function get a JWT for user with Two Factor Authorithation (optional)
     * @param {String} email - required field
     * @param {String} password - required field
     * @param {String} twoFaCode - optional field
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     * @example
     *  ogapi.usersBuilder().login(email, password);
     *  ogapi.usersBuilder().login(email, password, twoFaCode);
     */
    login(email, password, twoFaCode) {
        this._email = email;
        this._password = password;
        this._twoFaCode = twoFaCode;
        if (_.isEmpty(this._email) || _.isEmpty(this._password)) {
            throw new Error('OGAPI_USER_LOGIN_EMAIL_AND_PASSWORD_PARAMETER_MUST_BE_DEFINED');
        }
        const data = {
            email: this._email,
            password: this._password,
            "2FaCode": this._twoFaCode || undefined
        }
        
        const url = this._resource + '/login';

        return this._doNorthPost(url, data, true)
    }
}