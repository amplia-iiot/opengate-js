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

var _utilFormatsCheck_types = require('../util/formats/check_types');

var _utilFormatsCheck_types2 = _interopRequireDefault(_utilFormatsCheck_types);

/**
 * This is a base object that contains all you can do about Provision Processors.
 */

var ProvisionProcessors = (function (_BaseProvision) {
    _inherits(ProvisionProcessors, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function ProvisionProcessors(ogapi) {
        _classCallCheck(this, ProvisionProcessors);

        _get(Object.getPrototypeOf(ProvisionProcessors.prototype), 'constructor', this).call(this, ogapi, "organizations/", undefined, ['name', 'organization', 'configurationParams', 'scriptProcessor']);
    }

    //solo put o delete se llama

    _createClass(ProvisionProcessors, [{
        key: '_buildURL',
        value: function _buildURL() {
            var url = "provisionProcessors/provision/organizations/" + this._organization + '/' + this._identifier;
            return url;
        }

        /**
         * Set the organization attribute
         * @param {string} organization - required field
         * @return {ProvisionPrecessors}
         */
    }, {
        key: 'withOrganization',
        value: function withOrganization(organization) {
            _utilFormatsCheck_types2['default']._checkString(organization, 50, 'organization');
            this._organization = organization;
            return this;
        }

        /**
         * Set the identifier attribute
         * @param {string} identifier - required field
         * @return {ProvisionPrecessors}
         */
    }, {
        key: 'withIdentifier',
        value: function withIdentifier(identifier) {
            _utilFormatsCheck_types2['default']._checkString(identifier, 50, 'identifier');
            this._identifier = identifier;
            return this;
        }

        /**
         * Set the name attribute
         * @param {string} name - required field
         * @return {ProvisionPrecessors}
         */
    }, {
        key: 'withName',
        value: function withName(name) {
            _utilFormatsCheck_types2['default']._checkString(name, 50, 'name');
            this._name = name;
            return this;
        }

        /**
         * Set the columns attribute
         * @param {object} configurationParams - required field
         * @return {ProvisionPrecessors}
         */
    }, {
        key: 'withConfigurationParams',
        value: function withConfigurationParams(configurationParams) {
            _utilFormatsCheck_types2['default']._checkObject(configurationParams, 'configurationParams');
            this._configurationParams = configurationParams;
            return this;
        }

        /**
         * Set the columns attribute
         * @param {object} scriptProcessor - required field
         * @return {ProvisionPrecessors}
         */
    }, {
        key: 'withScriptProcessor',
        value: function withScriptProcessor(scriptProcessor) {
            _utilFormatsCheck_types2['default']._checkObject(scriptProcessor, 'scriptProcessor');
            this._scriptProcessor = scriptProcessor;
            return this;
        }

        //create y update
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._resource = "provisionProcessors/provision/organizations/" + this._organization;
            var provisionProcessor = {
                name: this._name,
                configurationParams: this._configurationParams,
                scriptProcessor: this._scriptProcessor
            };
            return provisionProcessor;
        }
    }]);

    return ProvisionProcessors;
})(_provisionBaseProvision2['default']);

exports['default'] = ProvisionProcessors;
module.exports = exports['default'];
//# sourceMappingURL=provisionProcessors.js.map
