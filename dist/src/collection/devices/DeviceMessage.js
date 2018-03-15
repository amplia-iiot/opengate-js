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

var _collectEvent = require('./collect/Event');

var _collectEvent2 = _interopRequireDefault(_collectEvent);

var _devicesCollectDatastreams = require('../devices/collect/Datastreams');

var _devicesCollectDatastreams2 = _interopRequireDefault(_devicesCollectDatastreams);

/**
 * This is a base object contains methods to send unstructured IoT information to be processed & collected by the platform.
 */

var DeviceMessage = (function (_Event) {
    _inherits(DeviceMessage, _Event);

    /**     
     * @param {InternalOpenGateAPI} Reference to the API object.
     */

    function DeviceMessage(ogapi, resource, timeout) {
        _classCallCheck(this, DeviceMessage);

        _get(Object.getPrototypeOf(DeviceMessage.prototype), 'constructor', this).call(this);
        this._ogapi = ogapi;
        this._resource = 'devices';
        this._iotMessage = undefined;
        this._dmmMessage = undefined;
        this._id = undefined;
        this._version = undefined;
        this._dataStreamVersion = undefined;
        this._deviceId = undefined;
        this._datastreams = [];
    }

    /**
     * Set the id attribute
     * @param {string} id - required field
     * @return {deviceMessages}
     */

    _createClass(DeviceMessage, [{
        key: 'withId',
        value: function withId(id) {
            if (typeof id !== 'string' || id.length > 50) throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'id' });
            this._id = id;
            return this;
        }

        /**
         * Set the dataStream version attribute
         * @param {string} version - required field
         * @return {deviceMessages}
         */
    }, {
        key: 'withDataStreamVersion',
        value: function withDataStreamVersion(version) {
            if (typeof version !== 'string' || version.length > 50) throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'version' });
            this._dataStreamVersion = version;
            return this;
        }

        /**
         * Set the version attribute
         * @param {string} version - required field
         * @return {deviceMessages}
         */
    }, {
        key: 'withDmmVersion',
        value: function withDmmVersion(version) {
            if (typeof version !== 'string' || version.length > 50) throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'version' });
            this._version = version;
            return this;
        }

        /**
         * Set the deviceId attribute
         * @param {string} deviceId - optional field
         * @return {deviceMessages}
         */
    }, {
        key: 'withDeviceId',
        value: function withDeviceId(deviceId) {
            if (typeof deviceId !== 'string' || deviceId.length > 50) throw new Error({ message: "OGAPI_STRING_PARAMETER_MAX_LENGTH_50", parameter: 'device' });
            this._deviceId = deviceId;
            return this;
        }

        /**
         * Set the datastream attribute
         * @param {Datastream} datastream - required field
         * @return {deviceMessages}
         */
    }, {
        key: 'withDataStream',
        value: function withDataStream(datastream) {
            if (datastream instanceof _devicesCollectDatastreams2['default']) {
                this._datastreams.push(datastream.composeElement());
            }
            return this;
        }
    }, {
        key: '_buildIotURL',
        value: function _buildIotURL() {
            if (this._id === undefined) throw new Error('Parameters id must be defined');
            var url = this._resource + "/" + this._id + "/collect/iot";
            return url;
        }
    }, {
        key: '_buildDmmURL',
        value: function _buildDmmURL() {
            if (this._id === undefined) throw new Error('Parameters id must be defined');
            var url = this._resource + "/" + this._id + "/collect/dmm";
            return url;
        }
    }, {
        key: '_composeIotMessage',
        value: function _composeIotMessage() {
            if (this._datastreams === undefined || this._dataStreamVersion === undefined) {
                throw new Error('Parameters datastreams and version must be defined');
            }
            var iotMessage = {
                'version': this._dataStreamVersion,
                'device': this._deviceId,
                'datastreams': this._datastreams
            };
            return iotMessage;
        }
    }, {
        key: '_composeDmmMessage',
        value: function _composeDmmMessage() {
            if (this._version === undefined) {
                throw new Error('Parameters id must be defined');
            }
            var event = _get(Object.getPrototypeOf(DeviceMessage.prototype), 'composeElement', this).call(this);
            var dmmMessage = {
                'version': this._version,
                'event': event
            };
            return dmmMessage;
        }
    }, {
        key: 'create',
        value: function create() {
            var defered = _q2['default'].defer();
            var promises = defered.promise;

            var boxPromises = [];
            if (this._datastreams.length > 0) {
                boxPromises.push(this._ogapi.Sapi.post(this._buildIotURL(), this._composeIotMessage()).then(function (res) {
                    if (res.statusCode !== 201) {
                        throw new Error("IOT NOT CREATED");
                    }
                }));
            }
            if (this._version !== undefined) {

                boxPromises.push(this._ogapi.Sapi.post(this._buildDmmURL(), this._composeDmmMessage()).then(function (res) {
                    if (res.statusCode !== 201) {
                        throw new Error("DMM NOT CREATED");
                    }
                }));
            }

            _q2['default'].all(boxPromises)['catch'](function (errores) {
                defered.reject({ errors: errores, statusCode: 400 });
            }).done(function (response) {
                defered.resolve({ statusCode: 201 });
            });
            return promises;
        }
    }]);

    return DeviceMessage;
})(_collectEvent2['default']);

exports['default'] = DeviceMessage;
module.exports = exports['default'];
//# sourceMappingURL=DeviceMessage.js.map
