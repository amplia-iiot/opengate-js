'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _IoTProvision2 = require('../IoTProvision');

var _IoTProvision3 = _interopRequireDefault(_IoTProvision2);

var _catalogIoTFlavour = require('../catalog/IoTFlavour');

var _catalogIoTFlavour2 = _interopRequireDefault(_catalogIoTFlavour);

var _catalogIoTDatastream = require('../catalog/IoTDatastream');

var _catalogIoTDatastream2 = _interopRequireDefault(_catalogIoTDatastream);

var _jsonPath = require('json-path');

var _jsonPath2 = _interopRequireDefault(_jsonPath);

var PRE_RESOURCE = '/organizations';
exports.PRE_RESOURCE = PRE_RESOURCE;
var PROFILE_RESOURCE = '/profiles';
exports.PROFILE_RESOURCE = PROFILE_RESOURCE;
/**
 * This is a base object for create a IoT Profile
 */

var IoTProfiles = (function (_IoTProvision) {
    _inherits(IoTProfiles, _IoTProvision);

    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - Organization where the IoT profile will be created
     */

    function IoTProfiles(ogapi, organization) {
        _classCallCheck(this, IoTProfiles);

        _get(Object.getPrototypeOf(IoTProfiles.prototype), 'constructor', this).call(this, ogapi, PRE_RESOURCE);
        this._isValidString(organization, 'organization', 50);
        this._organization = organization;
        this._flavours = [];
        this._resource = this._resource + '/' + this._organization + PROFILE_RESOURCE;
    }

    /**
     * Set the name attribute
     * @param {!string} name - required field
     * @return {IoTProfiles}
     */

    _createClass(IoTProfiles, [{
        key: 'withName',
        value: function withName(name) {
            this._isValidString(name, 'name', 100);
            this._name = name;
            return this;
        }

        /**
         * Set the version attribute
         * @param {!string} version - required field
         * @return {IoTProfiles}
         */
    }, {
        key: 'withVersion',
        value: function withVersion(version) {
            this._isValidString(version, 'version', 100);
            this._version = version;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description
         * @return {IoTProfiles}
         */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
            if (description) this._isValidString(description, 'description', 100);
            this._description = description;
            return this;
        }

        /**
         * Add a flavor. If the field datastreams have value, they will add to this flavor
         * @param {!string} flavour
         * @param {!Array} datastreams
         * @return {IoTProfiles}
         */
    }, {
        key: 'addFlavour',
        value: function addFlavour(flavour, datastreams) {
            this._isValidString(flavour, 'flavour', 100);
            this._flavours.forEach(function (_flavour, index) {
                if (flavour.name === _flavour) {
                    throw new Error('Flavour ' + flavour + ' already exists.');
                }
            });
            var _flavour = new _catalogIoTFlavour2['default'](this._ogapi, flavour);
            if (datastreams && datastreams.length > 0) _flavour.addDatastreams(datastreams);
            this._flavours.push(_flavour._composeElement());
            return this;
        }

        /**
         * Add a datastream to the indicated flavour
         * @param {!string} flavour
         * @param {!object} datastream
         * @return {IoTProfiles}
         */
    }, {
        key: 'addDatastream',
        value: function addDatastream(flavour, datastream) {
            this._isValidString(flavour, 'flavour', 100);
            //Buscamos flavour y si existe se añade a la lista de flavours
            var exists_flavour = -1;
            this._flavours.forEach(function (_flavour, index) {
                if (_flavour.name === flavour) {
                    exists_flavour = index;
                }
            });
            if (exists_flavour === -1) {
                throw new Error('Flavour ' + flavour + ' not exists for this profile. Use addFlavour instead.');
            }
            this._flavours[exists_flavour].datastreams.push(datastream);
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {
            if (!this._name) {
                throw new Error('Name is required on IoTProfile');
            }

            if (!this._version) {
                throw new Error('Version is required on IoTProfile');
            }

            if (this._flavours.length === 0) {
                var _datastream = this._ogapi.IoTDatastreamsBuilder();
                _datastream.withId(this._name + 'ExampleDatastream');
                _datastream.withName(this._name + 'ExampleDatastream');
                _datastream.withDescription('Example datastream');
                _datastream.withPeriod('INSTANT');
                _datastream.withUnit('EG', 'example', 'e.g.');
                _datastream.withTags(['example']);
                this.addFlavour(this._name + 'ExampleFlavour', [_datastream.build()]);
            }

            return {
                'name': this._name,
                'version': this._version,
                'description': this._description,
                'flavours': this._flavours
            };
        }
    }, {
        key: '_buildURL',
        value: function _buildURL() {
            var url = this._resource + '/' + this._organization + PROFILE_RESOURCE;
            console.log('URL: ' + url);
            return url;
        }

        /**
         * Update not supported on this builder. Use IoTProfileHelper instead.
         */
    }, {
        key: 'update',
        value: function update() {
            throw new Error('Update not supported on this builder. Use IoTProfileHelper instead.');
        }

        /**
         * Delete not supported on this builder. Use IoTProfileHelper instead.
         */
    }, {
        key: 'delete',
        value: function _delete() {
            throw new Error('Delete not supported on this builder. Use IoTProfileHelper instead.');
        }
    }, {
        key: '_isValidString',
        value: function _isValidString(string, param_name, max_length) {
            if (typeof string !== 'string' || string.length === 0 || string.length > max_length) throw new Error('Parameter ' + param_name + ' must be a string, cannot be empty and has a maximum length of ' + max_length + 'on IoTProfile');
        }
    }]);

    return IoTProfiles;
})(_IoTProvision3['default']);

exports['default'] = IoTProfiles;
//# sourceMappingURL=IoTProfiles.js.map
