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

var PRE_RESOURCE = '/organizations';
exports.PRE_RESOURCE = PRE_RESOURCE;
var POST_RESOURCE = '/profiles';

exports.POST_RESOURCE = POST_RESOURCE;
/**
 * This is a base object for update and delete a IoT Profile
 */

var IoTProfilesHelper = (function (_IoTProvision) {
    _inherits(IoTProfilesHelper, _IoTProvision);

    /**
     * @param {!InternalOpenGateAPI} ogapi - this is ogapi instance
     * @param {!string} organization - Organization where the IoT profile was create
     * @param {!object} profile - Json object of IoT profile to modify or delete. 
     */

    function IoTProfilesHelper(ogapi, organization, profile) {
        _classCallCheck(this, IoTProfilesHelper);

        _get(Object.getPrototypeOf(IoTProfilesHelper.prototype), 'constructor', this).call(this, ogapi, PRE_RESOURCE);
        this._isValidString(organization, 'organization', 50);
        this._organization = organization;

        //no modificar este objeto, es solo para comprobaciones
        this._profile = profile;
        this._name = this._profile.name;
        this._isValidString(this._name, 'name of object IoT profile', 100);
        this._version = this._profile.version;
        this._isValidString(this._version, 'version of object IoT profile', 100);
        this._description = this._profile.description;
        this._flavours = this._profile.flavours;
        if (!this._flavours) {
            throw new Error('Malformed IoT profile, flavours not exists.');
        }
        this._id = this._profile.id;
    }

    /**
     * Set the name attribute
     * @param {!string} name - required field
     * @return {IoTProfilesHelper}
     */

    _createClass(IoTProfilesHelper, [{
        key: 'withName',
        value: function withName(name) {
            this._isValidString(name, 'name', 100);
            this._name = name;
            return this;
        }

        /**
         * Set the version attribute
         * @param {!string} version - required field
         * @return {IoTProfilesHelper}
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
         * @return {IoTProfilesHelper}
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
         * @param {Array} datastreams
         * @return {IoTProfilesHelper}
         */
    }, {
        key: 'addFlavour',
        value: function addFlavour(flavour, datastreams) {
            this._isValidString(flavour, 'flavour', 100);
            this._flavours.forEach(function (_flavour, index) {
                if (_flavour.name === flavour) {
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
         * @return {IoTProfilesHelper}
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

        /**
         * Remove flavour
         * @param {!string} flavour
         * @return {IoTProfilesHelper}
         */
    }, {
        key: 'removeFlavour',
        value: function removeFlavour(flavour) {
            this._isValidString(flavour, 'flavour', 100);
            var remove_index = -1;
            this._flavours.forEach(function (_flavour, index) {
                if (_flavour.name === flavour) remove_index = index;
            });
            if (remove_index === -1) {
                throw new Error('Flavour ' + flavour + ' not exists for this profile');
            }
            if (this._flavours.length === 1) {
                throw new Error('Flavour ' + flavour + ' can\'t remove, profile can\'t be empty');
            }
            this._flavours.splice(remove_index, 1);
            return this;
        }

        /**
         * Remove datastream to the indicated flavour
         * @param {!string} flavour
         * @param {!string} id_datastream of datastream
         * @return {IoTProfilesHelper}
         */
    }, {
        key: 'removeDatastream',
        value: function removeDatastream(flavour, id_datastream) {
            this._isValidString(flavour, 'flavour', 100);
            var remove_flavour_index = -1;
            var remove_datastream_index = -1;
            this._flavours.forEach(function (_flavour, flavour_index) {
                if (_flavour.name === flavour) {
                    remove_flavour_index = flavour_index;
                    _flavour.datastreams.forEach(function (datastream, datastream_index) {
                        if (datastream.id === id_datastream) {
                            remove_datastream_index = datastream_index;
                        }
                    });
                }
            });
            if (remove_flavour_index === -1) {
                throw new Error('Flavour ' + flavour + ' not exists for this profile');
            }
            if (remove_datastream_index === -1) {
                throw new Error('Datastream ' + id_datastream + ' not exists for this profile and flavour ' + flavour);
            }
            if (this._flavours[remove_flavour_index].datastreams.length === 1) {
                throw new Error('Datastream ' + id_datastream + ' can\'t remove, flavour ' + flavour + ' can\'t be empty');
            }
            this._flavours[remove_flavour_index].datastreams.splice(remove_datastream_index, 1);
            var _flavour = new _catalogIoTFlavour2['default'](this._ogapi, flavour, this._flavours[remove_flavour_index].datastreams);
            this._flavours.splice(remove_flavour_index, 1);
            this._flavours.push(_flavour._composeElement());
            return this;
        }

        /**
         * Update flavour name
         * @param {!string} old_flavour name
         * @param {!string} new_flavour name
         * @return {IoTProfilesHelper}
         */
    }, {
        key: 'updateFlavour',
        value: function updateFlavour(old_flavour, new_flavour) {
            this._isValidString(new_flavour, 'new flavour', 100);
            this._isValidString(old_flavour, 'old flavour', 100);
            var old_flavour_index = -1;
            var new_flavour_index = -1;
            this._flavours.forEach(function (flavour, index) {
                switch (flavour.name) {
                    case old_flavour:
                        old_flavour_index = index;
                        break;
                    case new_flavour:
                        new_flavour_index = index;
                        break;
                }
            });
            if (new_flavour_index != -1) {
                throw new Error('New flavour ' + flavour + ' already exists.');
            }
            if (old_flavour_index === -1) {
                throw new Error('Flavour ' + old_flavour + ' not exists for this profile.');
            }
            this._flavours[old_flavour_index].name = new_flavour;
            return this;
        }

        /**
         * Update datastream to the indicated flavour
         * @param {!string} flavour
         * @param {!string} id_datastream of datastream
         * @param {!Object} datastream json object
         * @return {IoTProfilesHelper}
         */
    }, {
        key: 'updateDatastream',
        value: function updateDatastream(flavour, id_datastream, datastream) {
            this._isValidString(flavour, 'flavour', 100);
            this._isValidString(id_datastream, 'id datastream', 100);
            if (!datastream || typeof datastream !== 'object') {
                throw new Error('Datastream must be an object');
            }
            var update_flavour_index = -1;
            var update_datastream_index = -1;
            this._flavours.forEach(function (_flavour, flavour_index) {
                if (_flavour.name === flavour) {
                    update_flavour_index = flavour_index;
                    _flavour.datastreams.forEach(function (_datastream, datastream_index) {
                        if (_datastream.id === id_datastream) {
                            update_datastream_index = datastream_index;
                        }
                    });
                }
            });
            if (update_flavour_index === -1) {
                throw new Error('Flavour ' + flavour + ' not exists for this profile. Create it, use method addFlavour instead');
            }
            if (update_datastream_index === -1) {
                throw new Error('Datastream ' + id_datastream + ' not exists for this profile and flavour ' + flavour + '. Create it, use method addDatastream instead.');
            }
            this._flavours[update_flavour_index].datastreams[update_datastream_index] = datastream;
            return this;
        }
    }, {
        key: '_composeElement',
        value: function _composeElement() {

            if (this._flavours.length === 0) {
                var _flavour = new _catalogIoTFlavour2['default'](this._ogapi, this._name + 'ExampleFlavour');
                var _datastream = this._ogapi.IoTDatastreamsBuilder();
                _datastream.withId(this._name + 'ExampleDatastream');
                _datastream.withName(this._name + 'ExampleDatastream');
                _datastream.withDescription('Example datastream');
                _datastream.withPeriod('INSTANT');
                _datastream.withUnit('EG', 'example', 'e.g.');
                _datastream.withTags(['example']);
                _flavour.addDatastream(_datastream.build());
                this._flavours.push(_flavour._composeElement());
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
            return this._resource + '/' + this._organization + POST_RESOURCE + '/' + this._id;
        }

        /**
         * Create not supported on this builder. Use IoTProfileHelper instead.
         */
    }, {
        key: 'create',
        value: function create() {
            throw new Error('Create not supported on this builder. Use IoTProfilesBuilder instead.');
        }
    }, {
        key: '_isValidString',
        value: function _isValidString(string, param_name, max_length) {
            if (typeof string !== 'string' || string.length === 0 || string.length > max_length) throw new Error('Parameter ' + param_name + ' must be a string, cannot be empty and has a maximum length of ' + max_length + ' on IoTProfilesHelper');
        }
    }]);

    return IoTProfilesHelper;
})(_IoTProvision3['default']);

exports['default'] = IoTProfilesHelper;
//# sourceMappingURL=IoTProfilesHelper.js.map
