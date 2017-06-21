'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _provisionBaseProvision = require('../provision/BaseProvision');

var _provisionBaseProvision2 = _interopRequireDefault(_provisionBaseProvision);

/**
 * This is a base object that contains all you can do about Bundles.
 */

var Channels = (function (_BaseProvision) {
    _inherits(Channels, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function Channels(ogapi) {
        _classCallCheck(this, Channels);

        _get(Object.getPrototypeOf(Channels.prototype), 'constructor', this).call(this, ogapi, "/organizations", undefined, ["name", "organization"]);
        this._ogapi = ogapi;
    }

    _createClass(Channels, [{
        key: '_buildURL',
        value: function _buildURL() {
            var url = 'provision/organizations/' + this._organization + '/channels/' + this._name;
            return url;
        }

        /**
         * Set the name attribute
         * @param {string} name - required field
         * @return {Channels}
         */
    }, {
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string' || name.length > 50) throw new Error('Parameter name must be a string and has a maximum length of 50');
            this._name = name;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description - required field
         * @return {Channels}
         */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
            if (typeof description !== 'string' || description.length > 200) throw new Error('Parameter description must be a string and has a maximum length of 200');
            this._description = description;
            return this;
        }

        /**
         * Set the organization attribute
         * @param {string} organization 
         * @return {Channels}
         */
    }, {
        key: 'withOrganization',
        value: function withOrganization(organization) {
            if (typeof organization !== 'string' || organization.length > 50) throw new Error('Parameter organization must be a string and has a maximum length of 50');
            this._organization = organization;
            return this;
        }

        /**
         * Set the certificate attribute
         * @param {string} certificate 
         * @return {Channels}
         */
    }, {
        key: 'withCertificate',
        value: function withCertificate(certificate) {
            if (typeof certificate !== 'string') throw new Error('Parameter certificate must be a string');

            if (!this._certificates) this._certificates = [];

            this._certificates.push(certificate);
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._checkRequiredParameters();
            this._resource = 'provision/organizations/' + this._organization + '/channels';
            var channel = {
                "channel": {
                    name: this._name || undefined,
                    description: this._description || undefined,
                    certificates: this._certificates || undefined
                }
            };
            return channel;
        }
    }, {
        key: '_composeUpdateElement',
        value: function _composeUpdateElement() {
            var channel = _get(Object.getPrototypeOf(Channels.prototype), '_composeUpdateElement', this).call(this);
            delete channel.channel.name;
            return channel;
        }
    }]);

    return Channels;
})(_provisionBaseProvision2['default']);

exports['default'] = Channels;
module.exports = exports['default'];
//# sourceMappingURL=Channels.js.map
