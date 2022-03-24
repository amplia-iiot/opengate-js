'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _enumADDRESS_TYPE_ENUM = require('./enum/ADDRESS_TYPE_ENUM');

/**
 * This is a base object that allows the user to create a Subscription.
 */

var Subscription = (function () {
    function Subscription() {
        _classCallCheck(this, Subscription);

        this._id = undefined;
        this._name = undefined;
        this._type = undefined;
        this._description = undefined;
        this._operator = undefined;
        this._imsi = undefined;
        this._msisdn = undefined;
        this._addressType = undefined;
        this._addressValue = undefined;
        this._addressApn = undefined;
    }

    /**
     * Set the id attribute
     * @param {string} id - optional field
     * @return {Subscription}
     */

    _createClass(Subscription, [{
        key: 'withId',
        value: function withId(id) {
            if (typeof id !== 'string' || id.length === 0) throw new Error('Parameter id must be a string and cannot be empty');
            this._id = id;
            return this;
        }

        /**
         * Set the name attribute
         * @param {string} name - optional field
         * @return {Subscription}
         */
    }, {
        key: 'withName',
        value: function withName(name) {
            if (typeof name !== 'string' || name.length === 0) throw new Error('Parameter name must be a string and cannot be empty');
            this._name = name;
            return this;
        }

        /**
         * Set the type attribute
         * @param {string} type - optional field
         * @return {Subscription}
         */
    }, {
        key: 'withType',
        value: function withType(type) {
            if (typeof type !== 'string' || type.length === 0) throw new Error('Parameter type must be a string and cannot be empty');
            this._type = type;
            return this;
        }

        /**
        * Set the description attribute
        * @param {string} description - optional field
        * @return {Subscription}
        */
    }, {
        key: 'withDescription',
        value: function withDescription(description) {
            if (typeof description !== 'string' || description.length === 0) throw new Error('Parameter description must be a string and cannot be empty');
            this._description = description;
            return this;
        }

        /**
        * Set the operator attribute
        * @param {string} operator - optional field
        * @return {Subscription}
        */
    }, {
        key: 'withOperator',
        value: function withOperator(operator) {
            if (typeof operator !== 'string' || operator.length === 0) throw new Error('Parameter operator must be a string and cannot be empty');
            this._operator = operator;
            return this;
        }

        /**
         * Set the imsi attribute
         * @param {string} imsi - optional field
         * @return {Subscription}
         */
    }, {
        key: 'withImsi',
        value: function withImsi(imsi) {
            if (typeof imsi !== 'string' || imsi.length === 0) throw new Error('Parameter imsi must be a string and cannot be empty');
            this._imsi = imsi;
            return this;
        }

        /**
         * Set the msisdn attribute
         * @param {string} msisdn - optional field
         * @return {Subscription}
         */
    }, {
        key: 'withMsisdn',
        value: function withMsisdn(msisdn) {
            if (typeof msisdn !== 'string' || msisdn.length === 0) throw new Error('Parameter msisdn must be a string and cannot be empty');
            this._msisdn = msisdn;
            return this;
        }

        /**
        * Set the addressType attribute
        * @param {string} addressType - optional field
        * @return {Subscription}
        */
    }, {
        key: 'withAddressType',
        value: function withAddressType(addressType) {
            if (typeof addressType !== 'string' || addressType.length === 0) throw new Error('Parameter addressType must be a string and cannot be empty');
            this._addressType = this._checkValues(addressType, _enumADDRESS_TYPE_ENUM.ADDRESS_TYPE_ENUM);
            return this;
        }

        /**
         * Set the addressValue attribute
         * @param {string} addressValue - optional field
         * @return {Subscription}
         */
    }, {
        key: 'withAddressValue',
        value: function withAddressValue(addressValue) {
            if (typeof addressValue !== 'string' || addressValue.length === 0) throw new Error('Parameter addressValue must be a string and cannot be empty');
            this._addressValue = addressValue;
            return this;
        }

        /**
        * Set the addressApn attribute
        * @param {string} addressApn - optional field
        * @return {Subscription}
        */
    }, {
        key: 'withAddressApn',
        value: function withAddressApn(addressApn) {
            if (typeof addressApn !== 'string' || addressApn.length === 0) throw new Error('Parameter addressApn must be a string and cannot be empty');
            this._addressApn = addressApn;
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
            var subscription = {
                "id": this._id,
                "name": this._name,
                "type": this._type,
                "description": this._description,
                "operator": this._operator,
                "imsi": this._imsi,
                "msisdn": this._msisdn,
                "address": {
                    "type": this._addressType,
                    "value": this._addressValue,
                    "apn": this._addressApn
                }
            };
            return subscription;
        }
    }]);

    return Subscription;
})();

exports['default'] = Subscription;
module.exports = exports['default'];
//# sourceMappingURL=Subscription.js.map
