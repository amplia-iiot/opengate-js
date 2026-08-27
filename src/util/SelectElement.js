'use strict';

export default class SelectElement {

    /**
     * @example
     *  SE.element('provision.device.identifier', ['value'], 'identifier')
     *  returns:
     *  {
     *      name : 'provision.device.identifier',
     *      fields: ['value'],
     *      alias: 'identifier
     *  }
     *
     *  SE.element('provision.device.identifier', ['value'])
     *  returns:
     *  {
     *      name : 'provision.device.identifier',
     *      fields: ['value']
     *  }
     * @return {Object} This returns a json with the object element built.
     * @param {String} name - Indicates the datastream to show
     * @param {[{field: field, alias:alias}]} fields - The fields that you want to show from that datastream
     */
    static element(name, fields) {
        return { name: name, fields: fields };
    }

}