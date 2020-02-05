'use strict';
import {
    ADDRESS_TYPE_ENUM
} from './enum/ADDRESS_TYPE_ENUM';

/**
 * This is a base object that allows the user to create a Subscription.
 */
export default class Subscription {

    constructor() {
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
    withId(id) {
        if (typeof id !== 'string' || id.length === 0)
            throw new Error('Parameter id must be a string and cannot be empty');
        this._id = id;
        return this;
    }

    /**
     * Set the name attribute
     * @param {string} name - optional field
     * @return {Subscription}
     */
    withName(name) {
        if (typeof name !== 'string' || name.length === 0)
            throw new Error('Parameter name must be a string and cannot be empty');
        this._name = name;
        return this;
    }

    /**
     * Set the type attribute
     * @param {string} type - optional field
     * @return {Subscription}
     */
    withType(type) {
        if (typeof type !== 'string' || type.length === 0)
            throw new Error('Parameter type must be a string and cannot be empty');
        this._type = type;
        return this;
    }

        /**
     * Set the description attribute
     * @param {string} description - optional field
     * @return {Subscription}
     */
    withDescription(description) {
        if (typeof description !== 'string' || description.length === 0)
            throw new Error('Parameter description must be a string and cannot be empty');
        this._description = description;
        return this;
    }

        /**
     * Set the operator attribute
     * @param {string} operator - optional field
     * @return {Subscription}
     */
    withOperator(operator) {
        if (typeof operator !== 'string' || operator.length === 0)
            throw new Error('Parameter operator must be a string and cannot be empty');
        this._operator = operator;
        return this;
    }

    /**
     * Set the imsi attribute
     * @param {string} imsi - optional field
     * @return {Subscription}
     */
    withImsi(imsi) {
        if (typeof imsi !== 'string' || imsi.length === 0)
            throw new Error('Parameter imsi must be a string and cannot be empty');
        this._imsi = imsi;
        return this;
    }

    /**
     * Set the msisdn attribute
     * @param {string} msisdn - optional field
     * @return {Subscription}
     */
    withMsisdn(msisdn) {
        if (typeof msisdn !== 'string' || msisdn.length === 0)
            throw new Error('Parameter msisdn must be a string and cannot be empty');
        this._msisdn = msisdn;
        return this;
    }

        /**
     * Set the addressType attribute
     * @param {string} addressType - optional field
     * @return {Subscription}
     */
    withAddressType(addressType) {
        if (typeof addressType !== 'string' || addressType.length === 0)
            throw new Error('Parameter addressType must be a string and cannot be empty');
         this._addressType = this._checkValues(addressType, ADDRESS_TYPE_ENUM);
        return this;
    }

    /**
     * Set the addressValue attribute
     * @param {string} addressValue - optional field
     * @return {Subscription}
     */
    withAddressValue(addressValue) {
        if (typeof addressValue !== 'string' || addressValue.length === 0)
            throw new Error('Parameter addressValue must be a string and cannot be empty');
        this._addressValue = addressValue;
        return this;
    }

        /**
     * Set the addressApn attribute
     * @param {string} addressApn - optional field
     * @return {Subscription}
     */
    withAddressApn(addressApn) {
        if (typeof addressApn !== 'string' || addressApn.length === 0)
            throw new Error('Parameter addressApn must be a string and cannot be empty');
        this._addressApn = addressApn;
        return this;
    }

    _checkValues(value, enumName) {
        let not_found = [];
        let found = enumName.find(function(value) {
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



    composeElement(){
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

 
    
}
