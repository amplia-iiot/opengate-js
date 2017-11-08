'use strict';

import Se from './../util/SelectElement';
import JSONPath from 'JSONPath';
export default class SelectBuilder {

    /**
     * @example
     * var sb = ogapi.newSelectBuilder()
     */
    constructor() {
        this._selectTemplate = { select: [] }
    }

    /**
     * @example
     * sb.add(Se.element('provision.device.identifier', ['value'], 'identifier'), sb.add(Se.element('device.temperature.value', ['value'])))
     * @param {SelectElement} args - The parameters will be operators of the class SelectElement
     */
    add(...args) {
        for (var i = 0; i < args.length; i++) {
            var input_element = args[i];
            var elements = this._selectTemplate.select;
            if (elements.length === 0) {
                this._selectTemplate.select.push(input_element);
            } else {
                var exists_element = false;
                for (var j = 0; j < elements.length; j++) {
                    var element = elements[j];
                    if (element.datastreamId === input_element.datastreamId) {
                        exists_element = true;
                        var input_fields = input_element.fields;
                        for (var k = 0; k < input_fields.length; k++) {
                            var input_field = input_fields[i];
                            if (element.fields.indexOf(input_field) == -1) {
                                this._selectTemplate.select[j].fields.push(input_field);
                            }
                        }
                    }
                }
                if (!exists_element) {
                    this._selectTemplate.select.push(input_element);
                }
            }
        }
        return this;
    }

}