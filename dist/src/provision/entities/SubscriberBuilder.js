'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SimpleBuilder2 = require('./SimpleBuilder');

var _SimpleBuilder3 = _interopRequireDefault(_SimpleBuilder2);

var SubscriberID = 'provision.device.communicationModules[].subscriber.identifier';
exports.SubscriberID = SubscriberID;
/**
 * Subscriber builder. This builder give you the necessary tools to create a subscriber using our OpenGate REST.
 */

var SubscriberBuilder = (function (_SimpleBuilder) {
    _inherits(SubscriberBuilder, _SimpleBuilder);

    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - this is the organization name where subscriber will be created
     * @param {!array} [allowedDatastreams] - Allowed datastreams to add into the new subscriber
     * @param {!array} [definedSchemas] - Jsonschema about all OpenGate specific types
     * @param {!Validator} [jsonSchemaValidator] - Json schema validator tool
     */

    function SubscriberBuilder(ogapi, organization, allowedDatastreams, definedSchemas, jsonSchemaValidator) {
        _classCallCheck(this, SubscriberBuilder);

        _get(Object.getPrototypeOf(SubscriberBuilder.prototype), 'constructor', this).call(this, ogapi, organization + '/subscribers', allowedDatastreams, definedSchemas, jsonSchemaValidator);
    }

    _createClass(SubscriberBuilder, [{
        key: '_getEntityKey',
        value: function _getEntityKey() {
            return this._entity[SubscriberID];
        }
    }]);

    return SubscriberBuilder;
})(_SimpleBuilder3['default']);

exports['default'] = SubscriberBuilder;
//# sourceMappingURL=SubscriberBuilder.js.map
