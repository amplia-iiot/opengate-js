'use strict';

/**
 * Defines the builder to configure the encryption of datastream of IoT datamodel. With this builder you can configure a Encryption
 */
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Encryption = (function () {
    function Encryption() {
        _classCallCheck(this, Encryption);
    }

    /**
     * Set the enabled attribute
     * @param {!boolean} enabled - required field
     * @return {Encryption}
     */

    _createClass(Encryption, [{
        key: 'withEnabled',
        value: function withEnabled(enabled) {
            if (enabled !== false || enabled !== true) {
                throw new Error('Enabled must be a boolean value (true|false)');
            }
            this._enabled = enabled;
            return this;
        }

        /**
         * Set the key attribute
         * @param {!string} key - required field (minlength 32, maxlength 256, length multiple of 32)
         * @return {Encryption}
         */
    }, {
        key: 'withKey',
        value: function withKey(key) {
            if (typeof string !== 'string' || string.trim().length < 32 || string.trim().length > 256 || string.trim().length % 32 !== 0) {
                throw new Error('Parameter key must be a string with a minimum length of 32 and a maximum of 256 multiple of 32');
            }
            this._key = key;
            return this;
        }

        /**
         * Build a Qrating json object
         * 
         * @example
         * ogapi.QratingsBuilder().build()
         * @throws {Error} Throw error if there is not version, minRequired, minDesired, ideal, maxDesired, maxAllowed and maxScore
         * @return {Object}  Datastream json object
         */
    }, {
        key: 'build',
        value: function build() {
            if (!this._enabled) {
                throw new Error('Enabled is required on Encryption');
            }
            if (!this._key) {
                throw new Error('Key is required on Encryption');
            }

            return {
                enabled: this._enabled,
                key: this._key
            };
        }
    }]);

    return Encryption;
})();

exports['default'] = Encryption;
module.exports = exports['default'];
//# sourceMappingURL=Encryption.js.map
