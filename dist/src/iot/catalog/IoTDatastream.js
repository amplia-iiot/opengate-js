'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _IoTQrating = require('./IoTQrating');

var _IoTQrating2 = _interopRequireDefault(_IoTQrating);

/**
 * Defines the builder to configure a datatastream of IoT profile. With this builder you can configure a datastream
 */

var IoTDatastream = (function () {
    function IoTDatastream() {
        _classCallCheck(this, IoTDatastream);
    }

    /**
     * Set the id attribute
     * @param {!string} id - required field
     * @return {IoTDatastream}
     */

    _createClass(IoTDatastream, [{
        key: 'withId',
        value: function withId(id) {
            this._isValidString(id, 'id', 100);
            this._id = id;
            return this;
        }

        /**
         * Set the name attribute
         * @param {!string} name - required field
         * @return {IoTDatastream}
         */
    }, {
        key: 'withName',
        value: function withName(name) {
            this._isValidString(name, 'name', 100);
            this._name = name;
            return this;
        }

        /**
         * Set the description attribute
         * @param {string} description
         * @return {IoTDatastream}
         */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
            if (description) this._isValidString(description, 'description', 500);
            this._description = description;
            return this;
        }

        /**
         * Set the unit object attribute
         * @param {!string} type - required field
         * @param {!string} label - required field
         * @param {!string} symbol - required field
         * @return {IoTDatastream}
         */
    }, {
        key: 'withUnit',
        value: function withUnit(type, label, symbol) {
            this._isValidString(type, 'type', 500);
            this._isValidString(label, 'label', 500);
            this._isValidString(symbol, 'symbol', 10);
            this._unit = {
                type: type,
                label: label,
                symbol: symbol
            };
            return this;
        }

        /**
         * Set the period attribute. Possible values: PULSE, CUMULATIVE, INSTANT
         * @param {!string} period - required field
         * @return {IoTDatastream}
         */
    }, {
        key: 'withPeriod',
        value: function withPeriod(period) {
            this._isValidString(period, 'period', 500);
            this._period = period;
            return this;
        }

        /**
         * Set the format object attribute.
         * @param {!string} type
         * @param {string} subtype
         * @param {Object} attributes
         * @return {IoTDatastream}
         */
    }, {
        key: 'withFormat',
        value: function withFormat(type, subtype, attributes) {
            if (type || subtype || attributes) {
                this._isValidString(type, 'type', 500);
                if (attributes) {
                    if (typeof attributes !== 'object') {
                        throw new Error('Attributes must be an object on IoTDatastream');
                    }
                }
                this._format = {
                    type: type,
                    subtype: subtype,
                    attributes: attributes
                };
            }
            return this;
        }

        /**
         * Set the tags attribute.
         * @param {Array} tags
         * @return {IoTDatastream}
         */
    }, {
        key: 'withTags',
        value: function withTags(tags) {
            if (tags) {
                if (!Array.isArray(tags)) {
                    throw new Error('Tags must be an array on IoTDatastream');
                }
                this._tags = tags;
            }
            return this;
        }

        /**
         * Set the qrating attribute. Use {IoTQrating} utility for create this object
         * @param {Object} qrating
         * @return {IoTDatastream}
         */
    }, {
        key: 'addQrating',
        value: function addQrating(qrating) {
            if (!qrating || typeof qrating !== 'object') {
                throw new Error('Qrating must be an instance of object on IoTDatastream');
            }
            this._qrating = qrating;
            return this;
        }

        /**
         * Set the storage object.
         * @param {!string} period
         * @param {!number} total
         * @return {IoTDatastream}
         */
    }, {
        key: 'withStorage',
        value: function withStorage(period, total) {
            this._isValidString(period, 'period', 500);
            if (!total || typeof total !== 'number') {
                throw new Error('Total must be a number on IoTDatastream');
            }
            this._storage = {
                total: total,
                period: period
            };
            return this;
        }

        /**
         * Set the access object. Possible values: [READ, WRITE], [READ], [WRITE], []
         * @param {Array} access
         * @return {IoTDatastream}
         */
    }, {
        key: 'withAccess',
        value: function withAccess(access) {
            if (access) {
                if (!Array.isArray(access)) {
                    throw new Error('Access must be an array on IoTDatastream');
                }
            }
            this._access = access;
            return this;
        }

        /**
         * Set the hardwaresIds object.
         * @param {Array} hardwaresIds
         * @return {IoTDatastream}
         */
    }, {
        key: 'withHardwaresIds',
        value: function withHardwaresIds(hardwaresIds) {
            if (hardwaresIds) {
                if (!Array.isArray(hardwaresIds)) {
                    throw new Error('hardware Ids must be an array on IoTDatastream');
                }
            }
            this._hardwares = hardwaresIds;
            return this;
        }

        /**
         * Build a Datastream json object
         * 
         * @example
         * ogapi.IoTDatastreamsBuilder().build()
         * @throws {Error} Throw error if there is not id, name, unit and period
         * @return {Object}  Datastream json object
         */
    }, {
        key: 'build',
        value: function build() {
            if (!this._id) {
                throw new Error('Id is required on IoTDatastream');
            }
            if (!this._name) {
                throw new Error('Name is required on IoTDatastream');
            }
            if (!this._unit) {
                throw new Error('Unit is required on IoTDatastream');
            }
            if (!this._period) {
                throw new Error('Period is required on IoTDatastream');
            }

            return {
                id: this._id,
                name: this._name,
                description: this._description,
                period: this._period,
                tags: this._tags,
                unit: this._unit,
                format: this._format,
                qrating: this._qrating,
                storage: this._storage,
                hardwareIds: this._hardwares,
                access: this._access
            };
        }
    }, {
        key: '_isValidString',
        value: function _isValidString(string, param_name, max_length) {
            if (typeof string !== 'string' || string.length === 0 || string.length > max_length) throw new Error('Parameter ' + param_name + ' must be a string, cannot be empty and has a maximum length of ' + max_length + ' on IoTDatastream');
        }
    }]);

    return IoTDatastream;
})();

exports['default'] = IoTDatastream;
module.exports = exports['default'];
//# sourceMappingURL=IoTDatastream.js.map
