'use strict';

import Se from './../util/SelectElement';
export default class SelectBuilder {

    /**
     * @example
     * var sb = ogapi.newSelectBuilder()
     */
    constructor() {
        this._selectTemplate = { select: [] };
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
                    if (element.name === input_element.name) {
                        exists_element = true;
                        var input_fields = input_element.fields;
                        for (var k = 0; k < input_fields.length; k++) {
                            var input_field = input_fields[i];

                            var fieldExists = false;
                            for (var z = 0; z < element.fields.length; z++) {
                                if (element.fields[z].field === input_field.field) {
                                    fieldExists = true;

                                    if (input_field.alias) {
                                        element.fields[z].alias = input_field.alias;
                                    }

                                     if (input_field.aggregation) {
                                        element.fields[z].aggregation = input_field.aggregation;
                                    }
                                }
                            }

                            if (!fieldExists) {
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