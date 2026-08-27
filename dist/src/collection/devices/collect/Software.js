'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _enumSOFTWARE_TYPE_ENUM = require('./enum/SOFTWARE_TYPE_ENUM');

/**
 * This is a base object that allows the user to create a Datapoint.
 */

var Software = (function () {
    function Software() {
        _classCallCheck(this, Software);

        this._name = undefined;
        this._type = undefined;
        this._version = undefined;
        this._date = undefined;
    }

    /**
     * Set the name attribute
     * @param {string} name 
     * @return {Software}
     */

    _createClass(Software, [{
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string' || name.length === 0) throw new Error('Parameter name must be a string and cannot be empty');
            this._name = name;
            return this;
        }

        /**
         * Set the type attribute
         * @param {string} type 
         * @return {Software}
         */
    }, {
        key: 'withType',
        value: function withType(type) {
            if (typeof type !== 'string' || type.length === 0) throw new Error('Parameter type must be a string and cannot be empty');
            this._type = this._checkValues(type, _enumSOFTWARE_TYPE_ENUM.SOFTWARE_TYPE_ENUM);
            return this;
        }

        /**
         * Set the version attribute
         * @param {string} version 
         * @return {Software}
         */
    }, {
        key: 'withVersion',
        value: function withVersion(version) {
            if (typeof version !== 'string' || version.length === 0) throw new Error('Parameter version must be a string and cannot be empty');
            this._version = version;
            return this;
        }

        /**
        * Set the date  attribute
        * @param {string} date  
        * @return {Software}
        */
    }, {
        key: 'withDate',
        value: function withDate(date) {
            if (typeof date !== 'string' || date.length === 0) throw new Error('Parameter date must be a string and cannot be empty');
            this._date = date;
            return this;
        }
    }, {
        key: '_checkValues',
        value: function _checkValues(value, enumName) {
            var not_found = [];
            var found = enumName.find(function (value) {
                return value == this;
            }, value);

            if (typeof found === "undefined") {
                not_found.push(value);
            }
            if (not_found.length !== 0) {
                console.warn("Parameter value not allowed <'" + JSON.stringify(not_found) + "'>, allowed <'" + JSON.stringify(enumName) + "'>");
            }
            return value;
        }
    }, {
        key: 'composeElement',
        value: function composeElement() {

            var software = {
                'name': this._name,
                'type': this._type,
                'version': this._version,
                'date': this._date
            };
            return software;
        }
    }]);

    return Software;
})();

exports['default'] = Software;
module.exports = exports['default'];
//# sourceMappingURL=Software.js.map
