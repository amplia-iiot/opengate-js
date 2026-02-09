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
 * This is a base object that contains all you can do about workgroups.
 */

var Workgroups = (function (_BaseProvision) {
    _inherits(Workgroups, _BaseProvision);

    /**
     * Constructor
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function Workgroups(ogapi) {
        _classCallCheck(this, Workgroups);

        _get(Object.getPrototypeOf(Workgroups.prototype), 'constructor', this).call(this, ogapi, "/domains", undefined, ["name", "domainName"]);
        this._ogapi = ogapi;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Workgroups}
     */

    _createClass(Workgroups, [{
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string' || name.length > 50) throw new Error({
                message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50",
                parameter: 'name'
            });
            this._name = name;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description - required field
         * @return {Workgroups}
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
         * Set the administrative attribute
         * @param {boolean} administrative 
         * @return {Workgroups}
         */
    }, {
        key: 'withAdministrative',
        value: function withAdministrative(administrative) {
            /*if (typeof administrative !== 'boolean')
                throw new Error('Parameter administrative must be a boolean');*/
            this._administrative = administrative;
            return this;
        }

        /**
         * Set the domain attribute
         * @param {string} domainName - required field
         * @return {Workgroups}
         */
    }, {
        key: 'withDomainName',
        value: function withDomainName(domainName) {
            if (typeof domainName !== 'string' || domainName.length > 50) throw new Error({
                message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50",
                parameter: 'domainName'
            });
            this._domainName = domainName;
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._checkRequiredParameters();
            this._resource = 'provision/domains/' + this._domainName + '/workgroups';

            var workgroup = {
                "workgroup": {
                    name: this._name || undefined,
                    description: this._description || undefined,
                    administrative: this._administrative || false
                }
            };

            return workgroup;
        }
    }, {
        key: '_composeElementUpdate',
        value: function _composeElementUpdate() {
            this._checkRequiredParameters();
            this._resource = 'provision/domains/' + this._domainName + '/workgroups';

            var workgroup = {
                "workgroup": {
                    description: this._description || undefined
                }
            };

            return workgroup;
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            var url = 'provision/domains/' + this._domainName + '/workgroups/' + this._name;
            return url;
        }
    }, {
        key: 'update',
        value: function update() {
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            this._ogapi.Napi.put(this._buildURL(), this._composeElementUpdate(), undefined, this._getExtraHeaders(), this._getUrlParameters()).then(function (res) {
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
            })['catch'](function (error) {
                defered.reject(error);
            });
            return promise;
        }
    }]);

    return Workgroups;
})(_provisionBaseProvision2['default']);

exports['default'] = Workgroups;
module.exports = exports['default'];
//# sourceMappingURL=Workgroups.js.map
