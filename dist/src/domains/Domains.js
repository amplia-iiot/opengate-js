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

var Domains = (function (_BaseProvision) {
    _inherits(Domains, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function Domains(ogapi) {
        _classCallCheck(this, Domains);

        _get(Object.getPrototypeOf(Domains.prototype), 'constructor', this).call(this, ogapi, "/domains");
        this._ogapi = ogapi;
    }

    /**
     * Set the name attribute
     * @param {string} name - required field
     * @return {Domains}
     */

    _createClass(Domains, [{
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string' || name.length > 50) throw new Error('Parameter name must be a string and has a maximum length of 50');
            this._name = name;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description - required field
         * @return {Domains}
         */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
            if (typeof description !== 'string' || description.length > 200) throw new Error('Parameter description must be a string and has a maximum length of 200');
            this._description = description;
            return this;
        }

        /**
         * Set the parentDomain attribute
         * @param {string} parentDomain 
         * @return {Domains}
         */
    }, {
        key: 'withParentDomain',
        value: function withParentDomain(parentDomain) {
            if (typeof parentDomain !== 'string' || parentDomain.length > 50) throw new Error('Parameter parentDomain must be a string and has a maximum length of 50');
            this._parentDomain = parentDomain;
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            if (this._name === undefined) {
                throw new Error('Parameters name must be defined');
            }

            var domain = {
                "domain": {
                    name: this._name || undefined,
                    description: this._description || undefined,
                    parentDomain: this._parentDomain || undefined
                }
            };

            return domain;
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            console.log("RESOURCE: " + this._resource);
            console.log("NAME: " + this._name);
            var url = this._resource + '/' + this._name;
            return url;
        }
    }, {
        key: '_composeUpdateElement',
        value: function _composeUpdateElement() {
            var domain = _get(Object.getPrototypeOf(Domains.prototype), '_composeUpdateElement', this).call(this);
            delete domain.domain.name;
            return domain;
        }
    }]);

    return Domains;
})(_provisionBaseProvision2['default']);

exports['default'] = Domains;
module.exports = exports['default'];
//# sourceMappingURL=Domains.js.map
