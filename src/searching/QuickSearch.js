'use strict';

import merge from 'merge';
import EntitySearch from './EntitySearch';

// 'prov.mac' y 'collected.mac' no se añadirán en el quickSearch por el siguiente bug:  http://cm.amplia.es/jira/browse/OGODM-3144

const DEFAULT_PARAMETERS = [
    'entityId',
    'collected.customId',
    'prov.customId',
    'collected.entityName',
    'prov.entityName',
    'prov.msisdn',
    'collected.msisdn',
    'prov.serialNumber',
    'collected.serialNumber',
    'prov.icc',
    'collected.icc',
    'collected.manufacturer',
    'collected.model',
    'prov.address',
    'collected.address',
    'prov.imsi',
    'collected.imsi'
];

/** 
 * This extends EntitySearch and it allow make request to /device resource with a predefined filter at Opengate North API
 */
export default class QuickSearch extends EntitySearch {
    constructor(ogapi, param, limit, type = 'devices') {
        super(ogapi, '/' + type, _createFilter().filter, limit);

        function _createFilter() {
            let filterTemplate = { filter: { or: [] } };
            let like = { like: {} };
            if (!_checkEmpty()) {
                for (let i = 0; i < DEFAULT_PARAMETERS.length; i++) {
                    let item = DEFAULT_PARAMETERS[i];
                    let fieldLike = merge(true, like);
                    fieldLike.like[item] = param;
                    filterTemplate.filter.or.push(fieldLike);
                }
            }
            return { filter: filterTemplate };

            function _checkEmpty() {
                return !(param !== "undefined" && typeof param === "string" && param.trim() !== "");
            }
        }
    }

    _defaultParameters() {
        return DEFAULT_PARAMETERS;
    }
}
