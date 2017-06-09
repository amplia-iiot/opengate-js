'use strict';

import Hardware from './Hardware';
/**
 * This is a base object that allows the user to create a Subscription.
 */
export default class Subscriber {

    constructor() {
        this._id = undefined;
        this._name = undefined;
        this._type = undefined;
        this._hardware = undefined;

    }

    /**
     * Set the id attribute
     * @param {string} id - optional field
     * @return {Subscriber}
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
     * @return {Subscriber}
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
     * @return {Subscriber}
     */
    withType(type) {
        if (typeof type !== 'string' || type.length === 0)
            throw new Error('Parameter type must be a string and cannot be empty');
        this._type = type;
        return this;
    }

    /**
* Set the hardware attribute
* @param {Hardware} hardware - optionals field
* @return {Subscriber}
*/
    withHardware(hardware) {
        if (!(hardware instanceof Hardware)) {
            throw new Error('Parameter hardware must be hardware type');
        }
        this._hardware = hardware;
        return this;
    }


    composeElement() {
        var subscriber = {
            "id": this._id,
            "name": this._name,
            "type": this._type


        }
        if (this._hardware !== undefined) {
            subscriber.hardware = this._hardware.composeElement();
        }
        return subscriber;
    }



}
