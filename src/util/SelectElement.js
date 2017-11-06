'use strict';

export default class SelectElement {

    /**
     * @example
     *  SE.element('provision.device.identifier', ['value'], 'identifier')
     *  returns:
     *  {
     *      datastreamId : 'provision.device.identifier',
     *      fields: ['value'],
     *      alias: 'identifier
     *  }
     *
     *  SE.element('provision.device.identifier', ['value'])
     *  returns:
     *  {
     *      datastreamId : 'provision.device.identifier',
     *      fields: ['value']
     *  }
     * @return {Object} This returns a json with the object element built.
     * @param {String} datastreamId - Indicates the datastream to show
     * @param {[String]} fields - The fields that you want to show from that datastream
     * @param {String} alias - (Optional) Easiest name given to the datastream.
     */
    static element(datastreamId, fields, alias) {
        return { datastreamId: datastreamId, fields: fields, alias: alias }
    }

}