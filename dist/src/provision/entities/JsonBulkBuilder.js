'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BulkBuilder2 = require('./BulkBuilder');

var _BulkBuilder3 = _interopRequireDefault(_BulkBuilder2);

/**
 * Json builder. This builder give you the necessary tools to create a json bulk using our OpenGate REST.
 */

var JsonBulkBuilder = (function (_BulkBuilder) {
    _inherits(JsonBulkBuilder, _BulkBuilder);

    /**
     * Constructor
     * @param {InternalOpenGateAPI} ogapi - required field. This is ogapi instance
     * @param {string} organization - required field. This is the organization name where entities will be created, updated or deleted
     * @param {resource} resource - required field. This is the resource used for the bulk provision
     * @param {number} [timeout] - timeout in millisecons. The request will have a specific time out if it will be exceeded then the promise throw an exception
     * @param {boolean} [async] - forces async execution for the bulk operation
     */

    function JsonBulkBuilder(ogapi, organization, resource, timeout, async) {
        _classCallCheck(this, JsonBulkBuilder);

        _get(Object.getPrototypeOf(JsonBulkBuilder.prototype), 'constructor', this).call(this, ogapi, 'provision/organizations/' + organization + '/bulk/' + (async ? 'async' : resource.toLowerCase()), 'application/json', timeout);

        if (async) {
            this._setUrlParameters({
                type: resource.toUpperCase()
            });
        }
    }

    return JsonBulkBuilder;
})(_BulkBuilder3['default']);

exports['default'] = JsonBulkBuilder;
module.exports = exports['default'];
//# sourceMappingURL=JsonBulkBuilder.js.map
