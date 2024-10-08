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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _uuid = require('uuid');

var _length_name = 100;
var _length_surname = 100;
var _length_email = 100;
var _length_twoFaType = 100;
var _length_password = 50;
/**
 *   This class allow make get request to user resource into Opengate North API.
 */

var User = (function (_BaseProvision) {
    _inherits(User, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function User(ogapi) {
        _classCallCheck(this, User);

        _get(Object.getPrototypeOf(User.prototype), 'constructor', this).call(this, ogapi, "/users", undefined, ["email", "workgroup", "domain", "profile", "countryCode", "langCode"]);
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {User}
     */

    _createClass(User, [{
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string' || name.length > _length_name) throw new Error('Parameter name must be a string and has a maximum length of ' + _length_name);
            this._name = name;
            return this;
        }

        /**
         * Set the surname attribute
         * @param {string} surname - required field
         * @return {User}
         */
    }, {
        key: 'withSurname',
        value: function withSurname(surname) {
            if (typeof surname !== 'string' || surname.length > _length_surname) throw new Error('Parameter surname must be a string and has a maximum length of ' + _length_surname);
            this._surname = surname;
            return this;
        }

        /**
         * Set the email attribute
         * @param {string} email - required field
         * @return {User}
         */
    }, {
        key: 'withEmail',
        value: function withEmail(email) {
            if (typeof email !== 'string' || email.length > _length_email) throw new Error('Parameter email must be a string and has a maximum length of ' + _length_email);
            this._email = email;
            return this;
        }

        /**
         * Set the password attribute
         * @param {string} password - required field
         * @return {User}
         */
    }, {
        key: 'withPassword',
        value: function withPassword(password) {
            if (typeof password !== 'string' || password.length > _length_password) throw new Error('Parameter password must be a string and has a maximum length of ' + _length_password);
            this._password = password;
            return this;
        }

        /**
         * Set the apiKey attribute. Only on update user
         * @param {string} apiKey - required field
         * @return {User}
         */
    }, {
        key: 'withApiKey',
        value: function withApiKey(apiKey) {
            if (!this._validateUUID(apiKey)) {
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
    }, {
        key: 'withWorkgroup',
        value: function withWorkgroup(workgroup) {
            if (typeof workgroup !== 'string') throw new Error('OGAPI_STRING_PARAMETER_WORKGROUP');
            this._workgroup = workgroup;
            return this;
        }

        /**
         * Set the domain attribute
         * @param {string} domain - required field
         * @return {User}
         */
    }, {
        key: 'withDomain',
        value: function withDomain(domain) {
            if (typeof domain !== 'string') throw new Error('OGAPI_STRING_PARAMETER_DOMAIN');
            this._domain = domain;
            return this;
        }

        /**
         * Set the profile attribute
         * @param {string} profile - required field
         * @return {User}
         */
    }, {
        key: 'withProfile',
        value: function withProfile(profile) {
            if (typeof profile !== 'string') throw new Error('OGAPI_STRING_PARAMETER_PROFILE');
            this._profile = profile;
            return this;
        }

        /**
         * Set the countryCode attribute
         * @param {string} countryCode - required field
         * @return {User}
         */
    }, {
        key: 'withCountryCode',
        value: function withCountryCode(countryCode) {
            if (typeof countryCode !== 'string') throw new Error('OGAPI_STRING_PARAMETER_COUNTRY_CODE');
            this._countryCode = countryCode;
            return this;
        }

        /**
         * Set the langCode attribute
         * @param {string} langCode - required field
         * @return {User}
         */
    }, {
        key: 'withLangCode',
        value: function withLangCode(langCode) {
            if (typeof langCode !== 'string') throw new Error('OGAPI_STRING_PARAMETER_LANGUAGE');
            this._langCode = langCode;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description - required field
         * @return {User}
         */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
            if (typeof description !== 'string') throw new Error('OGAPI_STRING_PARAMETER_DESCRIPTION');
            this._description = description;
            return this;
        }

        /**
         * Set the timezone attribute
         * @param {string} timezone - required field
         * @return {User}
         */
    }, {
        key: 'withTimezone',
        value: function withTimezone(timezone) {
            if (typeof timezone !== 'string') throw new Error('OGAPI_STRING_PARAMETER_TIMEZONE');
            this._timezone = timezone;
            return this;
        }

        /**
         * Set the 2FaType attribute
         * @param {string} twoFaType - required field
         * @return {User}
         */
    }, {
        key: 'with2FaType',
        value: function with2FaType(twoFaType) {
            if (typeof twoFaType !== 'string' || twoFaType.length > _length_twoFaType) throw new Error('Parameter twoFaType must be a string and has a maximum length of ' + _length_twoFaType);
            this._twoFaType = twoFaType;
            return this;
        }

        /**
         * Set the forcePasswordChange: if true Forces you to reset your password on your next login attempt.
         * @param {boolean} forcePasswordChange
         * @return {User}
         * 
         */
    }, {
        key: 'withForcePasswordChange',
        value: function withForcePasswordChange(forcePasswordChange) {
            if (typeof forcePasswordChange !== 'boolean') throw new Error('Parameter forcePasswordChange must be a boolean');
            this._forcePasswordChange = forcePasswordChange;
            return this;
        }

        /**
         * Compose url to delete an user
         * @return {String} This returns a string with the URL of the request.
         * @private
         */
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            if (this._email === undefined) throw new Error('OGAPI_EMAIL_MUST_BE_DEFINED');
            var url = this._resource + "/" + this._email;

            return url;
        }

        /**
         * Compose json message to create a user
         * @return {String} This returns a message with user's parameters
         * @private
         */
    }, {
        key: '_composeElement',
        value: function _composeElement() {

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
                    "2FaType": this._twoFaType || undefined,
                    forcePasswordChange: typeof this._forcePasswordChange === 'boolean' ? this._forcePasswordChange : undefined
                }
            };

            return data;
        }

        /**
         * Compose json message to update a user
         * @return {String} This returns a message with user's parameters
         * @private
         */
    }, {
        key: '_composeUpdateElement',
        value: function _composeUpdateElement() {
            if (this._email === undefined) throw new Error('OGAPI_USER_UPDATE_PARAMETER_MUST_BE_DEFINED');

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
                    "2FaType": this._twoFaType || undefined,
                    forcePasswordChange: typeof this._forcePasswordChange === 'boolean' ? this._forcePasswordChange : undefined
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
    }, {
        key: 'changePassword',
        value: function changePassword(newPassword) {
            this._newPassword = newPassword;
            if (_lodash2['default'].isEmpty(this._email) || _lodash2['default'].isEmpty(this._password) || _lodash2['default'].isEmpty(this._newPassword)) {
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
    }, {
        key: '_validateUUID',
        value: function _validateUUID(UUID) {
            return (0, _uuid.validate)(UUID) && (0, _uuid.version)(UUID) === 4;
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
    }, {
        key: 'changeApiKey',
        value: function changeApiKey(apiKey) {
            this._apiKey = apiKey;
            if (_lodash2['default'].isEmpty(this._email) || _lodash2['default'].isEmpty(this._password) || _lodash2['default'].isEmpty(this._apiKey)) {
                throw new Error('OGAPI_USER_UPDATE_APIKEY_PARAMETER_MUST_BE_DEFINED');
            }

            if (!this._validateUUID(apiKey)) {
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
    }, {
        key: 'requestResetPassword',
        value: function requestResetPassword() {
            if (_lodash2['default'].isEmpty(this._email)) {
                throw new Error('OGAPI_USER_MAIL_RESET_PASSWORD_PARAMETER_MUST_BE_DEFINED');
            }
            var url = this._buildURL() + '/reset';
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
    }, {
        key: 'updatePassword',
        value: function updatePassword(newPassword, tokenId) {
            this._newPassword = newPassword;
            this._tokenId = tokenId;
            if (_lodash2['default'].isEmpty(this._email)) {
                throw new Error('OGAPI_USER_MAIL_RESET_PASSWORD_PARAMETER_MUST_BE_DEFINED');
            }
            if (_lodash2['default'].isEmpty(this._newPassword)) {
                throw new Error('OGAPI_USER_PASSWORD_RESET_PASSWORD_PARAMETER_MUST_BE_DEFINED');
            }

            if (_lodash2['default'].isEmpty(tokenId)) {
                throw new Error('OGAPI_USER_TOKENID_RESET_PASSWORD_PARAMETER_MUST_BE_DEFINED');
            }

            var data = {
                password: this._newPassword
            };

            var url = this._buildURL() + '/reset/' + tokenId;

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
    }, {
        key: 'login',
        value: function login(email, password, twoFaCode) {
            this._email = email;
            this._password = password;
            this._twoFaCode = twoFaCode;
            if (_lodash2['default'].isEmpty(this._email) || _lodash2['default'].isEmpty(this._password)) {
                throw new Error('OGAPI_USER_LOGIN_EMAIL_AND_PASSWORD_PARAMETER_MUST_BE_DEFINED');
            }
            var data = {
                email: this._email,
                password: this._password,
                "2FaCode": this._twoFaCode || undefined
            };

            var url = this._resource + '/login';

            return this._doNorthPost(url, data, true);
        }
    }, {
        key: 'generateApiKey',
        value: function generateApiKey() {
            return (0, _uuid.v4)();
        }
    }]);

    return User;
})(_provisionBaseProvision2['default']);

exports['default'] = User;
module.exports = exports['default'];
//# sourceMappingURL=Users.js.map
