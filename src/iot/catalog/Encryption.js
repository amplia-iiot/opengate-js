'use strict';

/**
 * Defines the builder to configure the encryption of datastream of IoT datamodel. With this builder you can configure a Encryption
 */
export default class Encryption {

    constructor() {}

    /**
     * Set the enabled attribute
     * @param {!boolean} enabled - required field
     * @return {Encryption}
     */
    withEnabled(enabled) {
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
    withKey(key) {
        if (typeof string !== 'string' || string.trim().length < 32 || string.trim().length > 256 || string.trim().length%32 !== 0) {
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
    build() {
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
}