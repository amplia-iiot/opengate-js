'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _IoTDatastream = require('./IoTDatastream');

var _IoTDatastream2 = _interopRequireDefault(_IoTDatastream);

/**
 * Defines the builder to configure a flavour of IoT profile. With this builder you can configure a flavour
 */

var IoTFlavour = (function () {

    /**    
     * @param {!InternalOpenGateAPI} Reference to the API object.
     * @param {!name} name of flavour
     * @param {Array} datastreams of flavour
     */

    function IoTFlavour(ogapi, name, datastreams) {
        _classCallCheck(this, IoTFlavour);

        this._ogapi = ogapi;
        this._isValidString(name, 'name', 50);
        this._name = name;
        this._datastreams = datastreams ? datastreams : [];
    }

    /**
     * Add a datastream to the flavour 
     * @param {!Object} datastream json object
     * @return {IoTProfilesHelper}
     */

    _createClass(IoTFlavour, [{
        key: 'addDatastream',
        value: function addDatastream(datastream) {
            if (!datastream || typeof datastream !== 'object') {
                throw new Error('Datastream must be an object');
            }
            this._datastreams.push(datastream);
            return this;
        }

        /**
         * Add a datastreams to the flavour 
         * @param {!Object} datastreams of datastream json object
         * @return {IoTProfilesHelper}
         */
    }, {
        key: 'addDatastreams',
        value: function addDatastreams(datastreams) {
            var _this = this;
            if (!Array.isArray(datastreams)) {
                throw new Error('Datastreams must be an array');
            }
            var _errors = [];
            datastreams.forEach(function (datastream, index) {
                try {
                    _this.addDatastream(datastream);
                } catch (error) {
                    _errors.push('Error on datastream with index [' + index + ']: ' + error);
                }
            });
            if (_errors.length > 0) {
                throw new Error('Error adding datastreams: ' + JSON.stringify(_errors));
            }
            return this;
        }
    }, {
        key: '_isValidString',
        value: function _isValidString(string, param_name, max_length) {
            if (typeof string !== 'string' || string.length === 0 || string.length > max_length) throw new Error('Parameter ' + param_name + ' must be a string, cannot be empty and has a maximum length of ' + max_length + ' on IoTFlavour');
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            if (!this._name) {
                throw new Error('Name is required on IoTFlavour');
            }

            if (this._datastreams.length === 0) {
                var _datastream = this._ogapi.IoTDatastreamsBuilder();
                _datastream.withId(this._name + '.example.heart.rate');
                _datastream.withName(this._name + '.example.heart.rate');
                _datastream.withDescription('heart rate measurement (example)');
                _datastream.withPeriod('PULSE');
                _datastream.withUnit('SI', 'beats/second', 'bpm');
                _datastream.withTags(['health', 'heart']);
                this.addDatastream(_datastream.build());
            }

            return {
                'name': this._name,
                'datastreams': this._datastreams
            };
        }
    }]);

    return IoTFlavour;
})();

exports['default'] = IoTFlavour;
module.exports = exports['default'];
//# sourceMappingURL=IoTFlavour.js.map
