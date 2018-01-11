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

/**
 * This is a base object that contains all you can do about Organizations.
 */

var Organizations = (function (_BaseProvision) {
    _inherits(Organizations, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function Organizations(ogapi, url) {
        _classCallCheck(this, Organizations);

        _get(Object.getPrototypeOf(Organizations.prototype), 'constructor', this).call(this, ogapi, "/organizations" + (typeof url === "undefined" ? "" : url));
        this._name = undefined;
        this._description = undefined;
        this._countryCode = undefined;
        this._langCode = undefined;
        this._timeZone = undefined;
        this._zoom = undefined;
        this._location = undefined;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Organizations}
     */

    _createClass(Organizations, [{
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string' || name.length === 0 || name.length > 50) throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'name' });
            this._name = name;
            return this;
        }

        /**
         * Set the parent domain
         * @param {string} domain
         * @return {Organizations}
         */
    }, {
        key: 'withDomain',
        value: function withDomain(domain) {
            if (typeof domain !== 'string' || domain.length > 50) throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'domain' });
            this._domain = domain;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description 
         * @return {Organizations}
         */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
            if (typeof description !== 'string' || description.length > 250) throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_250", parameter: 'description' });
            this._description = description;
            return this;
        }

        /**
         * Set the country code attribute
         * @param {string} countryCode
         * @return {Organizations}
         */
    }, {
        key: 'withCountryCode',
        value: function withCountryCode(countryCode) {
            if (typeof countryCode !== 'string' || countryCode.length === 0) throw new Error({ message: "OGAPI_STRING_PARAMETER", parameter: 'countryCode' });
            this._countryCode = countryCode.toUpperCase();
            return this;
        }

        /**
         * Set the lang code attribute
         * @param {string} langCode
         * @return {Organizations}
         */
    }, {
        key: 'withLangCode',
        value: function withLangCode(langCode) {
            if (typeof langCode !== 'string' || langCode.length === 0) throw new Error({ message: "OGAPI_STRING_PARAMETER", parameter: 'langCode' });
            this._langCode = langCode.toLowerCase();
            return this;
        }

        /**
         * Set the time zone attribute
         * @param {string} timeZone
         * @return {Organizations}
         */
    }, {
        key: 'withTimeZone',
        value: function withTimeZone(timeZone) {
            if (typeof timeZone !== 'string' || timeZone.length === 0) throw new Error({ message: "OGAPI_STRING_PARAMETER", parameter: 'time Zone' });
            this._timeZone = timeZone;
            return this;
        }

        /**
         * Set the plan attribute
         * @param {string} plan
         * @return {Organizations}
         */
    }, {
        key: 'withPlan',
        value: function withPlan(plan) {
            if (typeof plan !== 'string' || plan.length === 0) throw new Error({ message: "OGAPI_STRING_PARAMETER", parameter: 'plan' });
            this._plan = plan;
            return this;
        }

        /**
         * Set the onlyAssignedDomainCertificates attribute
         * @param {boolean} onlyDomainCerts - required field
         * @return {Organizations}
         */
    }, {
        key: 'withOnlyAssignedDomainCertificates',
        value: function withOnlyAssignedDomainCertificates(onlyDomainCerts) {
            if (typeof onlyDomainCerts !== 'boolean' || onlyDomainCerts !== true && onlyDomainCerts !== false) throw new Error('Parameter OnlyAssignedDomainCertificates must be a boolean and cannot be empty');
            this._onlyDomainCerts = onlyDomainCerts;
            return this;
        }

        /**
         * Sets the map zoom attribute
         * @param {number} zoom
         * @return {Organizations} 
         */
    }, {
        key: 'withZoom',
        value: function withZoom(zoom) {
            zoom = zoom * 1;
            if (typeof zoom !== "number" || zoom < 0 || zoom > 19) {
                throw new Error('Parameter zoom must be a number between 0 and 19');
            }
            this._zoom = zoom;
            return this;
        }

        /**
         * Sets the map location attribute
         * @param {number} latitude
         * @param {number} longitude
         * @return {Organizations} 
         */
    }, {
        key: 'withLocation',
        value: function withLocation(latitude, longitude) {
            latitude = latitude * 1;
            longitude = longitude * 1;

            if (typeof latitude !== "number" || typeof longitude !== "number") {
                throw new Error('Latitude and longitude parameters must be numbers');
            }

            if (latitude < -90 || latitude > 90) {
                throw new Error('Parameter latitude value must be between -90 and 90');
            }

            if (longitude < -180 || longitude > 180) {
                throw new Error('Parameter longitude value must be between -180 and 180');
            }

            this._location = {
                'latitude': latitude,
                'longitude': longitude
            };

            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            if (this._name === undefined || this._langCode === undefined || this._countryCode === undefined) throw new Error('Parameters name, country code and lang code must be defined');

            var _mapDefault = {};
            if (this._zoom != undefined) {
                _mapDefault.zoom = this._zoom;
            }

            if (this._location != undefined) {
                _mapDefault.location = this._location;
            }

            var updateData = {
                'organization': {
                    'name': this._name || undefined,
                    'description': this._description || undefined,
                    'plan': this._plan || undefined,
                    'countryCode': this._countryCode || undefined,
                    'langCode': this._langCode || undefined,
                    'timezone': this._timeZone || undefined,
                    'onlyAssignedDomainCertificates': typeof this._onlyDomainCerts !== 'boolean' ? this._onlyDomainCerts : undefined
                }
            };

            if (this._domain) {
                updateData.organization.domain = this._domain;
            }

            if (_mapDefault.zoom || _mapDefault.location) {
                updateData.organization.mapDefault = _mapDefault;
            }

            return updateData;
        }
    }, {
        key: '_composeUpdateElement',
        value: function _composeUpdateElement() {
            if (this._domain) {
                throw new Error('The domain parameter is not allowed in the update');
            }
            var organization = this._composeElement();
            delete organization.organization.name;
            return organization;
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            if (this._name === undefined) throw new Error('Parameter name must be defined');
            var url = this._resource + "/" + this._name;

            return url;
        }
    }]);

    return Organizations;
})(_provisionBaseProvision2['default']);

exports['default'] = Organizations;
module.exports = exports['default'];
//# sourceMappingURL=Organizations.js.map
