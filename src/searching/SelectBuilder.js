'use strict';

import Se from './../util/SelectElement'

export default class SelectBuilder {

    /**
     * @example
     * var sb = ogapi.newSelectBuilder()
     */
    constructor() {
        this._selectTemplate = []
    }

    /**
     * @example
     * sb.add(Se.element('provision.device.identifier', ['value'], 'identifier'), sb.add(Se.element('device.temperature.value', ['value'])))
     * @param {SelectElement} args - The parameters will be operators of the class SelectElement
     */
    add(...args) {
        for (var i = 0; i < args.length; i++) {
            this._selectTemplate.push(args[i]);
        }
        return this;
    }

}