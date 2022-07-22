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

var Pipelines = (function (_BaseProvision) {
    _inherits(Pipelines, _BaseProvision);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function Pipelines(ogapi) {
        _classCallCheck(this, Pipelines);

        _get(Object.getPrototypeOf(Pipelines.prototype), 'constructor', this).call(this, ogapi, "/organizations", undefined, ["name", "organization"]);
        this._ogapi = ogapi;
    }

    _createClass(Pipelines, [{
        key: '_buildURL',
        value: function _buildURL() {
            var url = 'provision/organizations/' + this._organization + '/pipelines/' + this._name;
            return url;
        }

        /**
         * Set the name attribute
         * @param {string} name - required field
         * @return {Pipelines}
         */
    }, {
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string' || name.length > 50) throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'name' });
            this._name = name;
            return this;
        }

        /**
         * Set the organization attribute
         * @param {string} organization 
         * @return {Pipelines}
         */
    }, {
        key: 'withOrganization',
        value: function withOrganization(organization) {
            if (typeof organization !== 'string' || organization.length > 50) throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'organization' });
            this._organization = organization;
            return this;
        }
    }, {
        key: 'addAction',
        value: function addAction(action) {
            if (typeof action !== 'object' || !action.name || typeof action.name !== 'string' || !action.type || typeof action.type !== 'string') throw new Error({ message: "Parameter action requires name and type", parameter: 'action' });

            if (!this._actions) {
                this._actions = [];
            }

            this._actions.push(action);
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            this._checkRequiredParameters();
            this._resource = 'provision/organizations/' + this._organization + '/pipelines';
            var pipeline = {
                "pipeline": {
                    name: this._name || undefined,
                    actions: this._actions || undefined
                }
            };
            return pipeline;
        }
    }, {
        key: '_composeUpdateElement',
        value: function _composeUpdateElement() {
            var pipeline = _get(Object.getPrototypeOf(Pipelines.prototype), '_composeUpdateElement', this).call(this);
            delete pipeline.pipeline.name;
            return pipeline;
        }
    }, {
        key: '_getVersion',
        value: function _getVersion() {
            return 'v1';
        }
    }]);

    return Pipelines;
})(_provisionBaseProvision2['default']);

exports['default'] = Pipelines;
module.exports = exports['default'];
//# sourceMappingURL=Pipelines.js.map
