'use strict';

import Search from './Search';
import q from 'q';


/**
 * This extends Search and it allow make request to any available resource into static resources for Opengate North API
 */
export default class StaticSearch extends Search {

    /**
     * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     * @param {!string} url - this define a specific resource to make the search
     * @param {object} filter - this is the filter
     */
    constructor(ogapi, url, filter, timeout, contentType, customFilters) {
        super(ogapi, '/catalog' + url, filter, null, null, timeout);
        this._contentType = contentType;
        this._customFilters = customFilters;
    }


    /**
     * This invoke a dummy request to OpenGate North API and the callback is managed by promises
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     */
    execute() {
        var _this = this;
        var finalContent = [];

        var ENTITY_TYPE = 'entityType';
        var TYPE = 'type';

        var defered = q.defer();
        var promise = defered.promise;

        //recuperamos el catalogo pedido
        var content = _this._content(_this._contentType);
        //algunos catalogos van en función del tipo de entidad. Recuperamos la entidad por la que filtrar
        var entityType = _this._customFilters && _this._customFilters[ENTITY_TYPE];

        //A parte del tipo de entidad, recuperamos el resto de filtros
        var count_filters = Object.keys(_this._customFilters).length;
        var isFilter = count_filters > 1 || (count_filters === 1 && !entityType);

        //Objeto donde se guardaran los objetos recuperados del primer prefiltro - por tipo de entidad
        var collection = {};
        if (entityType) {
            collection[entityType] = content[entityType];
        } else {
            collection = content;
        }


        switch (_this._contentType) {
            case 'operationalStatus':
                for (var contentTmp in collection) {
                    collection[contentTmp].forEach(function(finalValue) {
                        if (!_this._customFilters.id || (_this._customFilters.id && _this._customFilters.id === finalValue)) {
                            finalContent.push({
                                'entityType': contentTmp,
                                'id': finalValue
                            });
                        }
                    });
                }
                break;
            case 'administrativeState':
                var createAndAddFileObj = function(obj) {
                    var finalObj = obj;
                    finalObj[ENTITY_TYPE] = entityTypeTmp;
                    finalContent.push(finalObj);
                };
                for (var entityTypeTmp in collection) {
                    var typeTmp = collection[entityTypeTmp];
                    for (var dataTmp in typeTmp) {
                        if (isFilter) {
                            for (var filterTmp in _this._customFilters) {
                                if (typeTmp[dataTmp][filterTmp] === _this._customFilters[filterTmp]) {
                                    createAndAddFileObj(typeTmp[dataTmp]);
                                    break;
                                }
                            }
                        } else {
                            createAndAddFileObj(typeTmp[dataTmp]);
                        }
                    }
                }
                break;
            case 'fieldsDefinition':
            case 'communicationsModuleType':
                //Solo filtramos por tipo de modulo de comunicaciones o tipo de field
                var filter = isFilter && _this._customFilters[TYPE];
                if (typeof filter === 'undefined') {
                    defered.resolve({
                        error: 'Filters not allowed',
                        statusCode: 400
                    });
                    break;
                }
                var result = filter ? collection[filter] : collection;
                finalContent = result;
                break;
            case 'userProfile':
                for (var profileTmp in collection) {
                    if (!_this._customFilters.id || (_this._customFilters.id && _this._customFilters.id === profileTmp)) {
                        if (collection[profileTmp].length > 0) {
                            finalContent.push({
                                'id': profileTmp,
                                'managed': collection[profileTmp]
                            });
                        }
                    }
                }
                break;
            case 'serviceGroups':
                if (entityType) {
                    finalContent = collection[entityType];
                }
                break;
            case 'allowedResourceType':
                for (var resourceTypeIdx in collection) {
                    if (!_this._customFilters.type || (_this._customFilters.type && collection[resourceTypeIdx].types.indexOf(_this._customFilters.type) > -1)) {
                        finalContent.push(collection[resourceTypeIdx].resourceType);
                    }
                }
                break;
            case 'ticketSeverity':
            case 'ticketPriority':
            case 'ticketStatus':
            case 'ruleConfigurationSeverity':
            case 'ruleMode':
            case 'ruleType':
            case 'ioTDatastreamPeriod':
            case 'ioTDatastreamAccess':
            case 'resourceType':
            case 'countryCodes':
            case 'timezones':
            case 'userLanguages':
            case 'ioTDatastreamStoragePeriod':
                {
                    if (filter) {
                        defered.resolve({
                            error: 'Filters not supported',
                            statuscode: 400
                        });
                        break;
                    }
                    finalContent = finalContent.concat(collection);
                    break;
                }
            default:
                //No existe el catalogo
                defered.resolve({
                    data: {},
                    statusCode: 400
                });
        }
        if (finalContent && Object.keys(finalContent).length > 0) {
            var resultContent = {};
            resultContent[_this._contentType] = finalContent;
            defered.resolve({
                data: resultContent,
                statusCode: 200
            });
        } else {
            //Existe el catalogo pero no hay datos
            defered.resolve({
                data: {},
                statusCode: 204
            });
        }

        return promise;
    }

    _content(contentType) {
        return {
            'ticketSeverity': [
                'CRITICAL', 'URGENT', 'WARNING', 'NORMAL'
            ],
            'ticketPriority': [
                'MAJOR', 'MINOR', 'CRITICAL', 'BLOCKER'
            ],
            'ticketStatus': [
                'CREATED',
                'ASSIGNED',
                'ANSWERED',
                'RESTORED',
                'RESOLVED',
                'CLOSED'
            ],
            'serviceGroups': {
                'ASSET': ['noUpdate',
                    'emptyServiceGroup',
                    'emptyServiceGroup_onSession',
                    'emptyServiceGroup_onDemand',
                    'level1SecurityServiceGroup',
                    'level2SecurityServiceGroup',
                    'level3SecurityServiceGroup',
                    'trustedNoneSecurityServiceGroup',
                    'trustedNoneSecurityServiceGroup_onDemand',
                    'trustedLevel1SecurityServiceGroup',
                    'trustedLevel2SecurityServiceGroup',
                    'trustedLevel3SecurityServiceGroup'
                ],
                'SUBSCRIBER': ['emptyServiceGroup'],
                'SUBSCRIPTION': ['emptyServiceGroup'],
                'GATEWAY': ['noUpdate',
                    'emptyServiceGroup',
                    'emptyServiceGroup_onSession',
                    'emptyServiceGroup_onDemand',
                    'level1SecurityServiceGroup',
                    'level2SecurityServiceGroup',
                    'level3SecurityServiceGroup',
                    'trustedNoneSecurityServiceGroup',
                    'trustedNoneSecurityServiceGroup_onDemand',
                    'trustedLevel1SecurityServiceGroup',
                    'trustedLevel2SecurityServiceGroup',
                    'trustedLevel3SecurityServiceGroup'
                ]
            },
            'administrativeState': {
                'ASSET': [{
                    'id': 'BANNED',
                    'description': 'Asset banned, It means that received information of this asset is not going to be collected'
                }, {
                    'id': 'DELETED',
                    'description': 'Asset removed from available stock'
                }, {
                    'id': 'IN_MAINTENANCE',
                    'description': 'Asset in maintenance'
                }, {
                    'id': 'IN_STOCK',
                    'description': 'Asset in stock'
                }, {
                    'id': 'IN_TRANSIT',
                    'description': 'Asset in transit'
                }, {
                    'id': 'IN_USE',
                    'description': 'Asset in use'
                }, {
                    'id': 'MISSING',
                    'description': 'Asset missing'
                }, {
                    'id': 'ORDERED',
                    'description': 'Asset ordered'
                }, {
                    'id': 'READY',
                    'description': 'Asset ready for installation'
                }, {
                    'id': 'RETIRED',
                    'description': 'Field entity withdrawal'
                }],
                'GATEWAY': [{
                    'id': 'REQUESTED',
                    'description': 'Entity requested to the supplier'
                }, {
                    'id': 'READY',
                    'description': 'Entity ready for installation'
                }, {
                    'id': 'REPAIR',
                    'description': 'Entity under repair'
                }, {
                    'id': 'TESTING',
                    'description': 'Entity in tests'
                }, {
                    'id': 'ACTIVE',
                    'description': 'Field deployed entity'
                }, {
                    'id': 'SUSPENDED',
                    'description': 'Suspended its operation'
                }, {
                    'id': 'DELETED',
                    'description': 'Entity removed from available stock'
                }, {
                    'id': 'RETIRED',
                    'description': 'Field entity withdrawal'
                }, {
                    'id': 'BANNED',
                    'description': 'Entity banned, It means that received information of this entity is not going to be collected'
                }],
                'COMMUNICATIONS_MODULE': [{
                    'id': 'REQUESTED',
                    'description': 'Entity requested to the supplier'
                }, {
                    'id': 'READY',
                    'description': 'Entity ready for installation'
                }, {
                    'id': 'REPAIR',
                    'description': 'Entity under repair'
                }, {
                    'id': 'TESTING',
                    'description': 'Entity in tests'
                }, {
                    'id': 'ACTIVE',
                    'description': 'Field deployed entity'
                }, {
                    'id': 'SUSPENDED',
                    'description': 'Suspended its operation'
                }, {
                    'id': 'DELETED',
                    'description': 'Entity removed from available stock'
                }, {
                    'id': 'RETIRED',
                    'description': 'Field entity withdrawal'
                }, {
                    'id': 'BANNED',
                    'description': 'Entity banned, It means that received information of this entity is not going to be collected'
                }],
                'SUBSCRIBER': [{
                    'id': 'REQUESTED',
                    'description': 'Entity requested to the supplier'
                }, {
                    'id': 'READY',
                    'description': 'Entity ready for installation'
                }, {
                    'id': 'REPAIR',
                    'description': 'Entity under repair'
                }, {
                    'id': 'TESTING',
                    'description': 'Entity in tests'
                }, {
                    'id': 'ACTIVE',
                    'description': 'Field deployed entity'
                }, {
                    'id': 'SUSPENDED',
                    'description': 'Suspended its operation'
                }, {
                    'id': 'DELETED',
                    'description': 'Entity removed from available stock'
                }, {
                    'id': 'RETIRED',
                    'description': 'Field entity withdrawal'
                }, {
                    'id': 'BANNED',
                    'description': 'Entity banned, It means that received information of this entity is not going to be collected'
                }],
                'SUBSCRIPTION': [{
                    'id': 'REQUESTED',
                    'description': 'Entity requested to the supplier'
                }, {
                    'id': 'READY',
                    'description': 'Entity ready for installation'
                }, {
                    'id': 'REPAIR',
                    'description': 'Entity under repair'
                }, {
                    'id': 'TESTING',
                    'description': 'Entity in tests'
                }, {
                    'id': 'ACTIVE',
                    'description': 'Field deployed entity'
                }, {
                    'id': 'SUSPENDED',
                    'description': 'Suspended its operation'
                }, {
                    'id': 'DELETED',
                    'description': 'Entity removed from available stock'
                }, {
                    'id': 'RETIRED',
                    'description': 'Field entity withdrawal'
                }, {
                    'id': 'BANNED',
                    'description': 'Entity banned, It means that received information of this entity is not going to be collected'
                }],
                'CERTIFICATE': [{
                    'id': 'NOT_ACTIVE',
                    'description': 'NOT_ACTIVE'
                }, {
                    'id': 'ACTIVE',
                    'description': 'ACTIVE'
                }, {
                    'id': 'REVOKED',
                    'description': 'REVOKED'
                }, {
                    'id': 'EXPIRED',
                    'description': 'EXPIRED'
                }]
            },
            'operationalStatus': {
                'ASSET': ['UNKNOWN', 'NORMAL', 'ALARM', 'DOWN', 'SAFE_MODE', 'TAMPER', 'TEST'],
                'GATEWAY': ['UNKNOWN', 'NORMAL', 'ALARM', 'DOWN', 'SAFE_MODE', 'TAMPER', 'TEST'],
                'COMMUNICATIONS_MODULE': ['UNKNOWN', 'STOPPED', 'STARTING', 'RUNNING', 'STOPPING', 'ERROR']
            },
            'communicationsModuleType': {
                'ADSL': {
                    'COMMUNICATIONS_MODULE': {
                        'mandatory': ['generatedEntityKey'],
                        'optional': ['IMEI', 'HARDWARE', 'SOFTWARE']
                    },
                    'SUBSCRIPTION': {
                        'mandatory': [],
                        'optional': ['generatedEntityKey', 'administrativeState', 'description', 'ADDRESS', 'HOME_OPERATOR', 'LOCATION']
                    }
                },
                'CAN': {
                    'COMMUNICATIONS_MODULE': {
                        'mandatory': ['entityKey'],
                        'optional': []
                    }
                },
                'ETH': {
                    'COMMUNICATIONS_MODULE': {
                        'mandatory': ['generatedEntityKey'],
                        'optional': ['HARDWARE', 'SOFTWARE']
                    },
                    'SUBSCRIPTION': {
                        'mandatory': ['generatedEntityKey'],
                        'optional': ['administrativeState', 'description', 'ADDRESS']
                    }
                },
                'GENERIC': {
                    'COMMUNICATIONS_MODULE': {
                        'mandatory': ['generatedEntityKey'],
                        'optional': ['IMEI', 'HARDWARE', 'SOFTWARE']
                    },
                    'SUBSCRIPTION': {
                        'mandatory': [],
                        'optional': ['generatedEntityKey', 'administrativeState', 'description', 'IMSI', 'ADDRESS', 'HOME_OPERATOR', 'REGISTER_OPERATOR', 'MSISDN', 'LOCATION']
                    },
                    'SUBSCRIBER': {
                        'mandatory': [],
                        'optional': ['generatedEntityKey', 'administrativeState', 'description', 'ICC', 'SERIAL_NUMBER']
                    }
                },
                'GSM': {
                    'COMMUNICATIONS_MODULE': {
                        'mandatory': ['generatedEntityKey'],
                        'optional': ['IMEI', 'HARDWARE', 'SOFTWARE']
                    },
                    'SUBSCRIPTION': {
                        'mandatory': [],
                        'optional': ['generatedEntityKey', 'administrativeState', 'description', 'IMSI', 'ADDRESS', 'HOME_OPERATOR', 'REGISTER_OPERATOR', 'MSISDN', 'LOCATION']
                    },
                    'SUBSCRIBER': {
                        'mandatory': [],
                        'optional': ['generatedEntityKey', 'administrativeState', 'description', 'ICC']
                    }
                },
                'HAN': {
                    'COMMUNICATIONS_MODULE': {
                        'mandatory': ['entityKey'],
                        'optional': []
                    }
                },
                'I2C': {
                    'COMMUNICATIONS_MODULE': {
                        'mandatory': ['entityKey'],
                        'optional': []
                    }
                },
                'LOWPAN': {
                    'COMMUNICATIONS_MODULE': {
                        'mandatory': ['generatedEntityKey'],
                        'optional': ['HARDWARE', 'SOFTWARE']
                    },
                    'SUBSCRIPTION': {
                        'mandatory': ['generatedEntityKey'],
                        'optional': ['administrativeState', 'description']
                    }
                },
                'LTE_M': {
                    'COMMUNICATIONS_MODULE': {
                        'mandatory': ['generatedEntityKey'],
                        'optional': ['IMEI', 'HARDWARE', 'SOFTWARE']
                    },
                    'SUBSCRIPTION': {
                        'mandatory': [],
                        'optional': ['generatedEntityKey', 'administrativeState', 'description', 'IMSI', 'ADDRESS', 'HOME_OPERATOR', 'REGISTER_OPERATOR', 'MSISDN', 'LOCATION', 'RADIUS_USERNAME', 'RADIUS_PASSWORD', 'RADIUS_FRAMED_IP_NETMASK', 'MSISDN_VOICE']
                    },
                    'SUBSCRIBER': {
                        'mandatory': [],
                        'optional': ['generatedEntityKey', 'administrativeState', 'description', 'ICC']
                    }
                },
                'MESH': {
                    'COMMUNICATIONS_MODULE': {
                        'mandatory': ['generatedEntityKey'],
                        'optional': ['HARDWARE', 'SOFTWARE']
                    }
                },
                'MOBILE': {
                    'COMMUNICATIONS_MODULE': {
                        'mandatory': ['generatedEntityKey'],
                        'optional': ['IMEI', 'HARDWARE', 'SOFTWARE']
                    },
                    'SUBSCRIPTION': {
                        'mandatory': [],
                        'optional': ['generatedEntityKey', 'administrativeState', 'description', 'IMSI', 'ADDRESS', 'HOME_OPERATOR', 'REGISTER_OPERATOR', 'MSISDN', 'LOCATION', 'RADIUS_USERNAME', 'RADIUS_PASSWORD', 'RADIUS_FRAMED_IP_NETMASK', 'MSISDN_VOICE', 'SUBSCRIPTION_ICC']
                    },
                    'SUBSCRIBER': {
                        'mandatory': [],
                        'optional': ['generatedEntityKey', 'administrativeState', 'description', 'ICC']
                    }
                },
                'MULTIMOBILE': {
                    'COMMUNICATIONS_MODULE': {
                        'mandatory': ['generatedEntityKey'],
                        'optional': ['IMEI', 'HARDWARE', 'SOFTWARE']
                    },
                    'SUBSCRIPTION': {
                        'mandatory': [],
                        'optional': ['generatedEntityKey', 'administrativeState', 'description', 'IMSI', 'ADDRESS', 'HOME_OPERATOR', 'REGISTER_OPERATOR', 'MSISDN', 'LOCATION', 'RADIUS_USERNAME', 'RADIUS_PASSWORD', 'RADIUS_FRAMED_IP_NETMASK', 'MSISDN_VOICE', 'SUBSCRIPTION_ICC']
                    },
                    'SUBSCRIBER': {
                        'mandatory': [],
                        'optional': ['generatedEntityKey', 'administrativeState', 'description', 'ICC']
                    }
                },
                'NARROWBAND': {
                    'COMMUNICATIONS_MODULE': {
                        'mandatory': ['generatedEntityKey'],
                        'optional': ['IMEI', 'HARDWARE', 'SOFTWARE']
                    },
                    'SUBSCRIPTION': {
                        'mandatory': ['generatedEntityKey'],
                        'optional': ['administrativeState', 'description', 'IMSI', 'ADDRESS', 'HOME_OPERATOR', 'REGISTER_OPERATOR', 'LOCATION']
                    },
                    'SUBSCRIBER': {
                        'mandatory': ['generatedEntityKey'],
                        'optional': ['administrativeState', 'description', 'ICC']
                    }
                },
                'PLC': {
                    'COMMUNICATIONS_MODULE': {
                        'mandatory': ['generatedEntityKey'],
                        'optional': ['HARDWARE', 'SOFTWARE']
                    },
                    'SUBSCRIPTION': {
                        'mandatory': ['generatedEntityKey'],
                        'optional': ['administrativeState', 'description']
                    }
                },
                'RS232': {
                    'COMMUNICATIONS_MODULE': {
                        'mandatory': ['entityKey'],
                        'optional': []
                    }
                },
                'RS422': {
                    'COMMUNICATIONS_MODULE': {
                        'mandatory': ['entityKey'],
                        'optional': []
                    }
                },
                'RS485': {
                    'COMMUNICATIONS_MODULE': {
                        'mandatory': ['entityKey'],
                        'optional': []
                    }
                },
                'SIGFOX': {
                    'COMMUNICATIONS_MODULE': {
                        'mandatory': ['entityKey'],
                        'optional': ['PAC']
                    },
                    'SUBSCRIPTION': {
                        'mandatory': ['generatedEntityKey', 'description', 'HOME_OPERATOR', 'administrativeState', 'SIGFOX_DEVICE_TYPE']
                    }
                },
                'ZIGBEE': {
                    'COMMUNICATIONS_MODULE': {
                        'mandatory': ['generatedEntityKey'],
                        'optional': ['HARDWARE', 'SOFTWARE']
                    },
                    'SUBSCRIPTION': {
                        'mandatory': ['generatedEntityKey'],
                        'optional': ['administrativeState', 'description']
                    }
                }
            },
            'ruleMode': [
                'EASY',
                'ADVANCED'
            ],
            'ruleType': [
                'DATASTREAM',
                'OPERATION',
                'EVENT'
            ],
            'ruleConfigurationSeverity': [
                'INFORMATIVE',
                'URGENT',
                'CRITICAL'
            ],
            'userProfile': {
                'root': ['admin_domain', 'admin', 'advanced', 'viewer'],
                'admin_domain': ['admin_domain', 'admin', 'advanced', 'viewer'],
                'admin': ['admin', 'advanced', 'viewer'],
                'advanced': [],
                'viewer': []
            },
            'ioTDatastreamAccess': [
                'READ',
                'WRITE'
            ],
            'ioTDatastreamStoragePeriod': [
                'SECONDS', 'MINUTES', 'HOURS', 'DAYS', 'MONTHS', 'YEARS', 'NEVER'
            ],
            'ioTDatastreamPeriod': [
                'PULSE',
                'CUMULATIVE',
                'INSTANT'
            ],
            'resourceType': [{
                identifier: 'entity.asset'
            }, {
                identifier: 'entity.device'
            }, {
                identifier: 'ticket'
            }],
            'allowedResourceType': [{
                    resourceType: 'entity.asset',
                    types: ['entity', 'asset']
                },
                {
                    resourceType: 'entity.device',
                    types: ['entity', 'device']
                },
                {
                    resourceType: 'entity.subscriber',
                    types: ['entity', 'subscriber']
                },
                {
                    resourceType: 'entity.subscription',
                    types: ['entity', 'subscription']
                },
                {
                    resourceType: 'ticket',
                    types: ['ticket']
                },
                {
                    resourceType: 'organization',
                    types: ['organization']
                },
                {
                    resourceType: 'channel',
                    types: ['channel']
                }
            ],
            'fieldsDefinition': {
                'string': {
                    'description': 'Text based value',
                    'subtype': ['text', 'password']
                },
                'boolean': {
                    'description': 'Boolean based value',
                    'subtype': []
                },
                'calendar': {
                    'description': 'Format is described in the ISO 8601 or in http://www.w3.org/TR/NOTE-datetime',
                    'subtype': ['datetime', 'date', 'time']
                },
                'address': {
                    'description': 'Network address value',
                    'subtype': ['ip', 'ipv4', 'ipv6', 'mac48']
                },
                'number': {
                    'description': 'Numeric value',
                    'subtype': ['integer', 'float', 'percentage']
                },
                'enumeration': {
                    'description': 'Choice list values',
                    'subtype': ['string', 'number']
                },
                'array': {
                    'description': 'Array of values',
                    'subtype': ['string', 'number']
                },
                'coordinates': {
                    'description': 'Object indicating coordinates and timestamp in geotime subtype',
                    'subtype': ['geo', 'geotime', 'geojson']
                },
                'topology': {
                    'description': 'Object indicating relations',
                    'subtype': ['path', 'tree (not supported yet)']
                },
                'object': {
                    'description': 'Not yet supported. For future uses only',
                    'subtype': []
                }
            },
            'userLanguages': [{
                    'code': 'es',
                    'language': 'Español/Spanish'
                },
                {
                    'code': 'en',
                    'language': 'Inglés/English'
                }
            ],
            'countryCodes': [{
                    'code': 'AD',
                    'country': 'Andorra',
                    'zone': 'Europe/Andorra'
                },
                {
                    'code': 'AE',
                    'country': 'United Arab Emirates',
                    'zone': 'Asia/Dubai'
                },
                {
                    'code': 'AF',
                    'country': 'Afghanistan',
                    'zone': 'Asia/Kabul'
                },
                {
                    'code': 'AG',
                    'country': 'Antigua and Barbuda',
                    'zone': 'America/Antigua'
                },
                {
                    'code': 'AI',
                    'country': 'Anguilla',
                    'zone': 'America/Anguilla'
                },
                {
                    'code': 'AL',
                    'country': 'Albania',
                    'zone': 'Europe/Tirane'
                },
                {
                    'code': 'AM',
                    'country': 'Armenia',
                    'zone': 'Asia/Yerevan'
                },
                {
                    'code': 'AN',
                    'country': 'Netherlands Antilles',
                    'zone': 'Netherlands Antilles'
                },
                {
                    'code': 'AO',
                    'country': 'Angola',
                    'zone': 'Africa/Luanda'
                },
                {
                    'code': 'AQ',
                    'country': 'Antarctica',
                    'zone': 'Antarctica/McMurdo'
                },
                {
                    'code': 'AR',
                    'country': 'Argentina',
                    'zone': 'America/Argentina/Buenos_Aires'
                },
                {
                    'code': 'AS',
                    'country': 'American Samoa',
                    'zone': 'Pacific/Pago_Pago'
                },
                {
                    'code': 'AT',
                    'country': 'Austria',
                    'zone': 'Europe/Vienna'
                },
                {
                    'code': 'AU',
                    'country': 'Australia',
                    'zone': 'Australia/Lord_Howe'
                },
                {
                    'code': 'AW',
                    'country': 'Aruba',
                    'zone': 'America/Aruba'
                },
                {
                    'code': 'AX',
                    'country': 'Aland Islands',
                    'zone': 'Europe/Mariehamn'
                },
                {
                    'code': 'AZ',
                    'country': 'Azerbaijan',
                    'zone': 'Asia/Baku'
                },
                {
                    'code': 'BA',
                    'country': 'Bosnia and Herzegovina',
                    'zone': 'Europe/Sarajevo'
                },
                {
                    'code': 'BB',
                    'country': 'Barbados',
                    'zone': 'America/Barbados'
                },
                {
                    'code': 'BD',
                    'country': 'Bangladesh',
                    'zone': 'Asia/Dhaka'
                },
                {
                    'code': 'BE',
                    'country': 'Belgium',
                    'zone': 'Europe/Brussels'
                },
                {
                    'code': 'BF',
                    'country': 'Burkina Faso',
                    'zone': 'Africa/Ouagadougou'
                },
                {
                    'code': 'BG',
                    'country': 'Bulgaria',
                    'zone': 'Europe/Sofia'
                },
                {
                    'code': 'BH',
                    'country': 'Bahrain',
                    'zone': 'Asia/Bahrain'
                },
                {
                    'code': 'BI',
                    'country': 'Burundi',
                    'zone': 'Africa/Bujumbura'
                },
                {
                    'code': 'BJ',
                    'country': 'Benin',
                    'zone': 'Africa/Porto-Novo'
                },
                {
                    'code': 'BL',
                    'country': 'Saint Barthélemy',
                    'zone': 'America/St_Barthelemy'
                },
                {
                    'code': 'BM',
                    'country': 'Bermuda',
                    'zone': 'Atlantic/Bermuda'
                },
                {
                    'code': 'BN',
                    'country': 'Brunei',
                    'zone': 'Asia/Brunei'
                },
                {
                    'code': 'BO',
                    'country': 'Bolivia',
                    'zone': 'America/La_Paz'
                },
                {
                    'code': 'BQ',
                    'country': 'Bonaire, Saint Eustatius and Saba',
                    'zone': 'America/Kralendijk'
                },
                {
                    'code': 'BR',
                    'country': 'Brazil',
                    'zone': 'America/Noronha'
                },
                {
                    'code': 'BS',
                    'country': 'Bahamas',
                    'zone': 'America/Nassau'
                },
                {
                    'code': 'BT',
                    'country': 'Bhutan',
                    'zone': 'Asia/Thimphu'
                },
                {
                    'code': 'BV',
                    'country': 'Bouvet Island',
                    'zone': 'Bouvet Island'
                },
                {
                    'code': 'BW',
                    'country': 'Botswana',
                    'zone': 'Africa/Gaborone'
                },
                {
                    'code': 'BY',
                    'country': 'Belarus',
                    'zone': 'Europe/Minsk'
                },
                {
                    'code': 'BZ',
                    'country': 'Belize',
                    'zone': 'America/Belize'
                },
                {
                    'code': 'CA',
                    'country': 'Canada',
                    'zone': 'America/St_Johns'
                },
                {
                    'code': 'CC',
                    'country': 'Cocos Islands',
                    'zone': 'Indian/Cocos'
                },
                {
                    'code': 'CD',
                    'country': 'Democratic Republic of the Congo',
                    'zone': 'Africa/Kinshasa'
                },
                {
                    'code': 'CF',
                    'country': 'Central African Republic',
                    'zone': 'Africa/Bangui'
                },
                {
                    'code': 'CG',
                    'country': 'Republic of the Congo',
                    'zone': 'Africa/Brazzaville'
                },
                {
                    'code': 'CH',
                    'country': 'Switzerland',
                    'zone': 'Europe/Zurich'
                },
                {
                    'code': 'CI',
                    'country': 'Ivory Coast',
                    'zone': 'Africa/Abidjan'
                },
                {
                    'code': 'CK',
                    'country': 'Cook Islands',
                    'zone': 'Pacific/Rarotonga'
                },
                {
                    'code': 'CL',
                    'country': 'Chile',
                    'zone': 'America/Santiago'
                },
                {
                    'code': 'CM',
                    'country': 'Cameroon',
                    'zone': 'Africa/Douala'
                },
                {
                    'code': 'CN',
                    'country': 'China',
                    'zone': 'Asia/Shanghai'
                },
                {
                    'code': 'CO',
                    'country': 'Colombia',
                    'zone': 'America/Bogota'
                },
                {
                    'code': 'CR',
                    'country': 'Costa Rica',
                    'zone': 'America/Costa_Rica'
                },
                {
                    'code': 'CS',
                    'country': 'Serbia and Montenegro',
                    'zone': 'Serbia and Montenegro'
                },
                {
                    'code': 'CU',
                    'country': 'Cuba',
                    'zone': 'America/Havana'
                },
                {
                    'code': 'CV',
                    'country': 'Cape Verde',
                    'zone': 'Atlantic/Cape_Verde'
                },
                {
                    'code': 'CW',
                    'country': 'Curaçao',
                    'zone': 'America/Curacao'
                },
                {
                    'code': 'CX',
                    'country': 'Christmas Island',
                    'zone': 'Indian/Christmas'
                },
                {
                    'code': 'CY',
                    'country': 'Cyprus',
                    'zone': 'Asia/Nicosia'
                },
                {
                    'code': 'CZ',
                    'country': 'Czech Republic',
                    'zone': 'Europe/Prague'
                },
                {
                    'code': 'DE',
                    'country': 'Germany',
                    'zone': 'Europe/Berlin'
                },
                {
                    'code': 'DJ',
                    'country': 'Djibouti',
                    'zone': 'Africa/Djibouti'
                },
                {
                    'code': 'DK',
                    'country': 'Denmark',
                    'zone': 'Europe/Copenhagen'
                },
                {
                    'code': 'DM',
                    'country': 'Dominica',
                    'zone': 'America/Dominica'
                },
                {
                    'code': 'DO',
                    'country': 'Dominican Republic',
                    'zone': 'America/Santo_Domingo'
                },
                {
                    'code': 'DZ',
                    'country': 'Algeria',
                    'zone': 'Africa/Algiers'
                },
                {
                    'code': 'EC',
                    'country': 'Ecuador',
                    'zone': 'America/Guayaquil'
                },
                {
                    'code': 'EE',
                    'country': 'Estonia',
                    'zone': 'Europe/Tallinn'
                },
                {
                    'code': 'EG',
                    'country': 'Egypt',
                    'zone': 'Africa/Cairo'
                },
                {
                    'code': 'EH',
                    'country': 'Western Sahara',
                    'zone': 'Africa/El_Aaiun'
                },
                {
                    'code': 'ER',
                    'country': 'Eritrea',
                    'zone': 'Africa/Asmara'
                },
                {
                    'code': 'ES',
                    'country': 'Spain',
                    'zone': 'Europe/Madrid'
                },
                {
                    'code': 'ET',
                    'country': 'Ethiopia',
                    'zone': 'Africa/Addis_Ababa'
                },
                {
                    'code': 'FI',
                    'country': 'Finland',
                    'zone': 'Europe/Helsinki'
                },
                {
                    'code': 'FJ',
                    'country': 'Fiji',
                    'zone': 'Pacific/Fiji'
                },
                {
                    'code': 'FK',
                    'country': 'Falkland Islands',
                    'zone': 'Atlantic/Stanley'
                },
                {
                    'code': 'FM',
                    'country': 'Micronesia',
                    'zone': 'Pacific/Chuuk'
                },
                {
                    'code': 'FO',
                    'country': 'Faroe Islands',
                    'zone': 'Atlantic/Faroe'
                },
                {
                    'code': 'FR',
                    'country': 'France',
                    'zone': 'Europe/Paris'
                },
                {
                    'code': 'GA',
                    'country': 'Gabon',
                    'zone': 'Africa/Libreville'
                },
                {
                    'code': 'GB',
                    'country': 'United Kingdom',
                    'zone': 'Europe/London'
                },
                {
                    'code': 'GD',
                    'country': 'Grenada',
                    'zone': 'America/Grenada'
                },
                {
                    'code': 'GE',
                    'country': 'Georgia',
                    'zone': 'Asia/Tbilisi'
                },
                {
                    'code': 'GF',
                    'country': 'French Guiana',
                    'zone': 'America/Cayenne'
                },
                {
                    'code': 'GG',
                    'country': 'Guernsey',
                    'zone': 'Europe/Guernsey'
                },
                {
                    'code': 'GH',
                    'country': 'Ghana',
                    'zone': 'Africa/Accra'
                },
                {
                    'code': 'GI',
                    'country': 'Gibraltar',
                    'zone': 'Europe/Gibraltar'
                },
                {
                    'code': 'GL',
                    'country': 'Greenland',
                    'zone': 'America/Godthab'
                },
                {
                    'code': 'GM',
                    'country': 'Gambia',
                    'zone': 'Africa/Banjul'
                },
                {
                    'code': 'GN',
                    'country': 'Guinea',
                    'zone': 'Africa/Conakry'
                },
                {
                    'code': 'GP',
                    'country': 'Guadeloupe',
                    'zone': 'America/Guadeloupe'
                },
                {
                    'code': 'GQ',
                    'country': 'Equatorial Guinea',
                    'zone': 'Africa/Malabo'
                },
                {
                    'code': 'GR',
                    'country': 'Greece',
                    'zone': 'Europe/Athens'
                },
                {
                    'code': 'GS',
                    'country': 'South Georgia and the South Sandwich Islands',
                    'zone': 'Atlantic/South_Georgia'
                },
                {
                    'code': 'GT',
                    'country': 'Guatemala',
                    'zone': 'America/Guatemala'
                },
                {
                    'code': 'GU',
                    'country': 'Guam',
                    'zone': 'Pacific/Guam'
                },
                {
                    'code': 'GW',
                    'country': 'Guinea-Bissau',
                    'zone': 'Africa/Bissau'
                },
                {
                    'code': 'GY',
                    'country': 'Guyana',
                    'zone': 'America/Guyana'
                },
                {
                    'code': 'HK',
                    'country': 'Hong Kong',
                    'zone': 'Asia/Hong_Kong'
                },
                {
                    'code': 'HM',
                    'country': 'Heard Island and McDonald Islands',
                    'zone': 'Heard Island and McDonald Islands'
                },
                {
                    'code': 'HN',
                    'country': 'Honduras',
                    'zone': 'America/Tegucigalpa'
                },
                {
                    'code': 'HR',
                    'country': 'Croatia',
                    'zone': 'Europe/Zagreb'
                },
                {
                    'code': 'HT',
                    'country': 'Haiti',
                    'zone': 'America/Port-au-Prince'
                },
                {
                    'code': 'HU',
                    'country': 'Hungary',
                    'zone': 'Europe/Budapest'
                },
                {
                    'code': 'ID',
                    'country': 'Indonesia',
                    'zone': 'Asia/Jakarta'
                },
                {
                    'code': 'IE',
                    'country': 'Ireland',
                    'zone': 'Europe/Dublin'
                },
                {
                    'code': 'IL',
                    'country': 'Israel',
                    'zone': 'Asia/Jerusalem'
                },
                {
                    'code': 'IM',
                    'country': 'Isle of Man',
                    'zone': 'Europe/Isle_of_Man'
                },
                {
                    'code': 'IN',
                    'country': 'India',
                    'zone': 'Asia/Kolkata'
                },
                {
                    'code': 'IO',
                    'country': 'British Indian Ocean Territory',
                    'zone': 'Indian/Chagos'
                },
                {
                    'code': 'IQ',
                    'country': 'Iraq',
                    'zone': 'Asia/Baghdad'
                },
                {
                    'code': 'IR',
                    'country': 'Iran',
                    'zone': 'Asia/Tehran'
                },
                {
                    'code': 'IS',
                    'country': 'Iceland',
                    'zone': 'Atlantic/Reykjavik'
                },
                {
                    'code': 'IT',
                    'country': 'Italy',
                    'zone': 'Europe/Rome'
                },
                {
                    'code': 'JE',
                    'country': 'Jersey',
                    'zone': 'Europe/Jersey'
                },
                {
                    'code': 'JM',
                    'country': 'Jamaica',
                    'zone': 'America/Jamaica'
                },
                {
                    'code': 'JO',
                    'country': 'Jordan',
                    'zone': 'Asia/Amman'
                },
                {
                    'code': 'JP',
                    'country': 'Japan',
                    'zone': 'Asia/Tokyo'
                },
                {
                    'code': 'KE',
                    'country': 'Kenya',
                    'zone': 'Africa/Nairobi'
                },
                {
                    'code': 'KG',
                    'country': 'Kyrgyzstan',
                    'zone': 'Asia/Bishkek'
                },
                {
                    'code': 'KH',
                    'country': 'Cambodia',
                    'zone': 'Asia/Phnom_Penh'
                },
                {
                    'code': 'KI',
                    'country': 'Kiribati',
                    'zone': 'Pacific/Tarawa'
                },
                {
                    'code': 'KM',
                    'country': 'Comoros',
                    'zone': 'Indian/Comoro'
                },
                {
                    'code': 'KN',
                    'country': 'Saint Kitts and Nevis',
                    'zone': 'America/St_Kitts'
                },
                {
                    'code': 'KP',
                    'country': 'North Korea',
                    'zone': 'Asia/Pyongyang'
                },
                {
                    'code': 'KR',
                    'country': 'South Korea',
                    'zone': 'Asia/Seoul'
                },
                {
                    'code': 'KW',
                    'country': 'Kuwait',
                    'zone': 'Asia/Kuwait'
                },
                {
                    'code': 'KY',
                    'country': 'Cayman Islands',
                    'zone': 'America/Cayman'
                },
                {
                    'code': 'KZ',
                    'country': 'Kazakhstan',
                    'zone': 'Asia/Almaty'
                },
                {
                    'code': 'LA',
                    'country': 'Laos',
                    'zone': 'Asia/Vientiane'
                },
                {
                    'code': 'LB',
                    'country': 'Lebanon',
                    'zone': 'Asia/Beirut'
                },
                {
                    'code': 'LC',
                    'country': 'Saint Lucia',
                    'zone': 'America/St_Lucia'
                },
                {
                    'code': 'LI',
                    'country': 'Liechtenstein',
                    'zone': 'Europe/Vaduz'
                },
                {
                    'code': 'LK',
                    'country': 'Sri Lanka',
                    'zone': 'Asia/Colombo'
                },
                {
                    'code': 'LR',
                    'country': 'Liberia',
                    'zone': 'Africa/Monrovia'
                },
                {
                    'code': 'LS',
                    'country': 'Lesotho',
                    'zone': 'Africa/Maseru'
                },
                {
                    'code': 'LT',
                    'country': 'Lithuania',
                    'zone': 'Europe/Vilnius'
                },
                {
                    'code': 'LU',
                    'country': 'Luxembourg',
                    'zone': 'Europe/Luxembourg'
                },
                {
                    'code': 'LV',
                    'country': 'Latvia',
                    'zone': 'Europe/Riga'
                },
                {
                    'code': 'LY',
                    'country': 'Libya',
                    'zone': 'Africa/Tripoli'
                },
                {
                    'code': 'MA',
                    'country': 'Morocco',
                    'zone': 'Africa/Casablanca'
                },
                {
                    'code': 'MC',
                    'country': 'Monaco',
                    'zone': 'Europe/Monaco'
                },
                {
                    'code': 'MD',
                    'country': 'Moldova',
                    'zone': 'Europe/Chisinau'
                },
                {
                    'code': 'ME',
                    'country': 'Montenegro',
                    'zone': 'Europe/Podgorica'
                },
                {
                    'code': 'MF',
                    'country': 'Saint Martin',
                    'zone': 'America/Marigot'
                },
                {
                    'code': 'MG',
                    'country': 'Madagascar',
                    'zone': 'Indian/Antananarivo'
                },
                {
                    'code': 'MH',
                    'country': 'Marshall Islands',
                    'zone': 'Pacific/Majuro'
                },
                {
                    'code': 'MK',
                    'country': 'Macedonia',
                    'zone': 'Europe/Skopje'
                },
                {
                    'code': 'ML',
                    'country': 'Mali',
                    'zone': 'Africa/Bamako'
                },
                {
                    'code': 'MM',
                    'country': 'Myanmar',
                    'zone': 'Asia/Yangon'
                },
                {
                    'code': 'MN',
                    'country': 'Mongolia',
                    'zone': 'Asia/Ulaanbaatar'
                },
                {
                    'code': 'MO',
                    'country': 'Macao',
                    'zone': 'Asia/Macau'
                },
                {
                    'code': 'MP',
                    'country': 'Northern Mariana Islands',
                    'zone': 'Pacific/Saipan'
                },
                {
                    'code': 'MQ',
                    'country': 'Martinique',
                    'zone': 'America/Martinique'
                },
                {
                    'code': 'MR',
                    'country': 'Mauritania',
                    'zone': 'Africa/Nouakchott'
                },
                {
                    'code': 'MS',
                    'country': 'Montserrat',
                    'zone': 'America/Montserrat'
                },
                {
                    'code': 'MT',
                    'country': 'Malta',
                    'zone': 'Europe/Malta'
                },
                {
                    'code': 'MU',
                    'country': 'Mauritius',
                    'zone': 'Indian/Mauritius'
                },
                {
                    'code': 'MV',
                    'country': 'Maldives',
                    'zone': 'Indian/Maldives'
                },
                {
                    'code': 'MW',
                    'country': 'Malawi',
                    'zone': 'Africa/Blantyre'
                },
                {
                    'code': 'MX',
                    'country': 'Mexico',
                    'zone': 'America/Mexico_City'
                },
                {
                    'code': 'MY',
                    'country': 'Malaysia',
                    'zone': 'Asia/Kuala_Lumpur'
                },
                {
                    'code': 'MZ',
                    'country': 'Mozambique',
                    'zone': 'Africa/Maputo'
                },
                {
                    'code': 'NA',
                    'country': 'Namibia',
                    'zone': 'Africa/Windhoek'
                },
                {
                    'code': 'NC',
                    'country': 'New Caledonia',
                    'zone': 'Pacific/Noumea'
                },
                {
                    'code': 'NE',
                    'country': 'Niger',
                    'zone': 'Africa/Niamey'
                },
                {
                    'code': 'NF',
                    'country': 'Norfolk Island',
                    'zone': 'Pacific/Norfolk'
                },
                {
                    'code': 'NG',
                    'country': 'Nigeria',
                    'zone': 'Africa/Lagos'
                },
                {
                    'code': 'NI',
                    'country': 'Nicaragua',
                    'zone': 'America/Managua'
                },
                {
                    'code': 'NL',
                    'country': 'Netherlands',
                    'zone': 'Europe/Amsterdam'
                },
                {
                    'code': 'NO',
                    'country': 'Norway',
                    'zone': 'Europe/Oslo'
                },
                {
                    'code': 'NP',
                    'country': 'Nepal',
                    'zone': 'Asia/Kathmandu'
                },
                {
                    'code': 'NR',
                    'country': 'Nauru',
                    'zone': 'Pacific/Nauru'
                },
                {
                    'code': 'NU',
                    'country': 'Niue',
                    'zone': 'Pacific/Niue'
                },
                {
                    'code': 'NZ',
                    'country': 'New Zealand',
                    'zone': 'Pacific/Auckland'
                },
                {
                    'code': 'OM',
                    'country': 'Oman',
                    'zone': 'Asia/Muscat'
                },
                {
                    'code': 'PA',
                    'country': 'Panama',
                    'zone': 'America/Panama'
                },
                {
                    'code': 'PE',
                    'country': 'Peru',
                    'zone': 'America/Lima'
                },
                {
                    'code': 'PF',
                    'country': 'French Polynesia',
                    'zone': 'Pacific/Tahiti'
                },
                {
                    'code': 'PG',
                    'country': 'Papua New Guinea',
                    'zone': 'Pacific/Port_Moresby'
                },
                {
                    'code': 'PH',
                    'country': 'Philippines',
                    'zone': 'Asia/Manila'
                },
                {
                    'code': 'PK',
                    'country': 'Pakistan',
                    'zone': 'Asia/Karachi'
                },
                {
                    'code': 'PL',
                    'country': 'Poland',
                    'zone': 'Europe/Warsaw'
                },
                {
                    'code': 'PM',
                    'country': 'Saint Pierre and Miquelon',
                    'zone': 'America/Miquelon'
                },
                {
                    'code': 'PN',
                    'country': 'Pitcairn',
                    'zone': 'Pacific/Pitcairn'
                },
                {
                    'code': 'PR',
                    'country': 'Puerto Rico',
                    'zone': 'America/Puerto_Rico'
                },
                {
                    'code': 'PS',
                    'country': 'Palestinian Territory',
                    'zone': 'Asia/Gaza'
                },
                {
                    'code': 'PT',
                    'country': 'Portugal',
                    'zone': 'Europe/Lisbon'
                },
                {
                    'code': 'PW',
                    'country': 'Palau',
                    'zone': 'Pacific/Palau'
                },
                {
                    'code': 'PY',
                    'country': 'Paraguay',
                    'zone': 'America/Asuncion'
                },
                {
                    'code': 'QA',
                    'country': 'Qatar',
                    'zone': 'Asia/Qatar'
                },
                {
                    'code': 'RE',
                    'country': 'Reunion',
                    'zone': 'Indian/Reunion'
                },
                {
                    'code': 'RO',
                    'country': 'Romania',
                    'zone': 'Europe/Bucharest'
                },
                {
                    'code': 'RS',
                    'country': 'Serbia',
                    'zone': 'Europe/Belgrade'
                },
                {
                    'code': 'RU',
                    'country': 'Russia',
                    'zone': 'Europe/Kaliningrad'
                },
                {
                    'code': 'RW',
                    'country': 'Rwanda',
                    'zone': 'Africa/Kigali'
                },
                {
                    'code': 'SA',
                    'country': 'Saudi Arabia',
                    'zone': 'Asia/Riyadh'
                },
                {
                    'code': 'SB',
                    'country': 'Solomon Islands',
                    'zone': 'Pacific/Guadalcanal'
                },
                {
                    'code': 'SC',
                    'country': 'Seychelles',
                    'zone': 'Indian/Mahe'
                },
                {
                    'code': 'SD',
                    'country': 'Sudan',
                    'zone': 'Africa/Khartoum'
                },
                {
                    'code': 'SE',
                    'country': 'Sweden',
                    'zone': 'Europe/Stockholm'
                },
                {
                    'code': 'SG',
                    'country': 'Singapore',
                    'zone': 'Asia/Singapore'
                },
                {
                    'code': 'SH',
                    'country': 'Saint Helena',
                    'zone': 'Atlantic/St_Helena'
                },
                {
                    'code': 'SI',
                    'country': 'Slovenia',
                    'zone': 'Europe/Ljubljana'
                },
                {
                    'code': 'SJ',
                    'country': 'Svalbard and Jan Mayen',
                    'zone': 'Arctic/Longyearbyen'
                },
                {
                    'code': 'SK',
                    'country': 'Slovakia',
                    'zone': 'Europe/Bratislava'
                },
                {
                    'code': 'SL',
                    'country': 'Sierra Leone',
                    'zone': 'Africa/Freetown'
                },
                {
                    'code': 'SM',
                    'country': 'San Marino',
                    'zone': 'Europe/San_Marino'
                },
                {
                    'code': 'SN',
                    'country': 'Senegal',
                    'zone': 'Africa/Dakar'
                },
                {
                    'code': 'SO',
                    'country': 'Somalia',
                    'zone': 'Africa/Mogadishu'
                },
                {
                    'code': 'SR',
                    'country': 'Suriname',
                    'zone': 'America/Paramaribo'
                },
                {
                    'code': 'SS',
                    'country': 'South Sudan',
                    'zone': 'Africa/Juba'
                },
                {
                    'code': 'ST',
                    'country': 'Sao Tome and Principe',
                    'zone': 'Africa/Sao_Tome'
                },
                {
                    'code': 'SV',
                    'country': 'El Salvador',
                    'zone': 'America/El_Salvador'
                },
                {
                    'code': 'SX',
                    'country': 'Sint Maarten',
                    'zone': 'America/Lower_Princes'
                },
                {
                    'code': 'SY',
                    'country': 'Syria',
                    'zone': 'Asia/Damascus'
                },
                {
                    'code': 'SZ',
                    'country': 'Swaziland',
                    'zone': 'Africa/Mbabane'
                },
                {
                    'code': 'TC',
                    'country': 'Turks and Caicos Islands',
                    'zone': 'America/Grand_Turk'
                },
                {
                    'code': 'TD',
                    'country': 'Chad',
                    'zone': 'Africa/Ndjamena'
                },
                {
                    'code': 'TF',
                    'country': 'French Southern Territories',
                    'zone': 'Indian/Kerguelen'
                },
                {
                    'code': 'TG',
                    'country': 'Togo',
                    'zone': 'Africa/Lome'
                },
                {
                    'code': 'TH',
                    'country': 'Thailand',
                    'zone': 'Asia/Bangkok'
                },
                {
                    'code': 'TJ',
                    'country': 'Tajikistan',
                    'zone': 'Asia/Dushanbe'
                },
                {
                    'code': 'TK',
                    'country': 'Tokelau',
                    'zone': 'Pacific/Fakaofo'
                },
                {
                    'code': 'TL',
                    'country': 'East Timor',
                    'zone': 'Asia/Dili'
                },
                {
                    'code': 'TM',
                    'country': 'Turkmenistan',
                    'zone': 'Asia/Ashgabat'
                },
                {
                    'code': 'TN',
                    'country': 'Tunisia',
                    'zone': 'Africa/Tunis'
                },
                {
                    'code': 'TO',
                    'country': 'Tonga',
                    'zone': 'Pacific/Tongatapu'
                },
                {
                    'code': 'TR',
                    'country': 'Turkey',
                    'zone': 'Europe/Istanbul'
                },
                {
                    'code': 'TT',
                    'country': 'Trinidad and Tobago',
                    'zone': 'America/Port_of_Spain'
                },
                {
                    'code': 'TV',
                    'country': 'Tuvalu',
                    'zone': 'Pacific/Funafuti'
                },
                {
                    'code': 'TW',
                    'country': 'Taiwan',
                    'zone': 'Asia/Taipei'
                },
                {
                    'code': 'TZ',
                    'country': 'Tanzania',
                    'zone': 'Africa/Dar_es_Salaam'
                },
                {
                    'code': 'UA',
                    'country': 'Ukraine',
                    'zone': 'Europe/Kiev'
                },
                {
                    'code': 'UG',
                    'country': 'Uganda',
                    'zone': 'Africa/Kampala'
                },
                {
                    'code': 'UM',
                    'country': 'United States Minor Outlying Islands',
                    'zone': 'Pacific/Midway'
                },
                {
                    'code': 'US',
                    'country': 'United States',
                    'zone': 'America/New_York'
                },
                {
                    'code': 'UY',
                    'country': 'Uruguay',
                    'zone': 'America/Montevideo'
                },
                {
                    'code': 'UZ',
                    'country': 'Uzbekistan',
                    'zone': 'Asia/Samarkand'
                },
                {
                    'code': 'VA',
                    'country': 'Vatican',
                    'zone': 'Europe/Vatican'
                },
                {
                    'code': 'VC',
                    'country': 'Saint Vincent and the Grenadines',
                    'zone': 'America/St_Vincent'
                },
                {
                    'code': 'VE',
                    'country': 'Venezuela',
                    'zone': 'America/Caracas'
                },
                {
                    'code': 'VG',
                    'country': 'British Virgin Islands',
                    'zone': 'America/Tortola'
                },
                {
                    'code': 'VI',
                    'country': 'U.S. Virgin Islands',
                    'zone': 'America/St_Thomas'
                },
                {
                    'code': 'VN',
                    'country': 'Vietnam',
                    'zone': 'Asia/Ho_Chi_Minh'
                },
                {
                    'code': 'VU',
                    'country': 'Vanuatu',
                    'zone': 'Pacific/Efate'
                },
                {
                    'code': 'WF',
                    'country': 'Wallis and Futuna',
                    'zone': 'Pacific/Wallis'
                },
                {
                    'code': 'WS',
                    'country': 'Samoa',
                    'zone': 'Pacific/Apia'
                },
                {
                    'code': 'XK',
                    'country': 'Kosovo',
                    'zone': 'Kosovo'
                },
                {
                    'code': 'YE',
                    'country': 'Yemen',
                    'zone': 'Asia/Aden'
                },
                {
                    'code': 'YT',
                    'country': 'Mayotte',
                    'zone': 'Indian/Mayotte'
                },
                {
                    'code': 'ZA',
                    'country': 'South Africa',
                    'zone': 'Africa/Johannesburg'
                },
                {
                    'code': 'ZM',
                    'country': 'Zambia',
                    'zone': 'Africa/Lusaka'
                },
                {
                    'code': 'ZW',
                    'country': 'Zimbabwe',
                    'zone': 'Africa/Harare'
                }
            ],
            'timezones': [
                'ACT',
                'AET',
                'Africa/Abidjan',
                'Africa/Accra',
                'Africa/Addis_Ababa',
                'Africa/Algiers',
                'Africa/Asmara',
                'Africa/Asmera',
                'Africa/Bamako',
                'Africa/Bangui',
                'Africa/Banjul',
                'Africa/Bissau',
                'Africa/Blantyre',
                'Africa/Brazzaville',
                'Africa/Bujumbura',
                'Africa/Cairo',
                'Africa/Casablanca',
                'Africa/Ceuta',
                'Africa/Conakry',
                'Africa/Dakar',
                'Africa/Dar_es_Salaam',
                'Africa/Djibouti',
                'Africa/Douala',
                'Africa/El_Aaiun',
                'Africa/Freetown',
                'Africa/Gaborone',
                'Africa/Harare',
                'Africa/Johannesburg',
                'Africa/Juba',
                'Africa/Kampala',
                'Africa/Khartoum',
                'Africa/Kigali',
                'Africa/Kinshasa',
                'Africa/Lagos',
                'Africa/Libreville',
                'Africa/Lome',
                'Africa/Luanda',
                'Africa/Lubumbashi',
                'Africa/Lusaka',
                'Africa/Malabo',
                'Africa/Maputo',
                'Africa/Maseru',
                'Africa/Mbabane',
                'Africa/Mogadishu',
                'Africa/Monrovia',
                'Africa/Nairobi',
                'Africa/Ndjamena',
                'Africa/Niamey',
                'Africa/Nouakchott',
                'Africa/Ouagadougou',
                'Africa/Porto-Novo',
                'Africa/Sao_Tome',
                'Africa/Timbuktu',
                'Africa/Tripoli',
                'Africa/Tunis',
                'Africa/Windhoek',
                'AGT',
                'America/Adak',
                'America/Anchorage',
                'America/Anguilla',
                'America/Antigua',
                'America/Araguaina',
                'America/Argentina/Buenos_Aires',
                'America/Argentina/Catamarca',
                'America/Argentina/ComodRivadavia',
                'America/Argentina/Cordoba',
                'America/Argentina/Jujuy',
                'America/Argentina/La_Rioja',
                'America/Argentina/Mendoza',
                'America/Argentina/Rio_Gallegos',
                'America/Argentina/Salta',
                'America/Argentina/San_Juan',
                'America/Argentina/San_Luis',
                'America/Argentina/Tucuman',
                'America/Argentina/Ushuaia',
                'America/Aruba',
                'America/Asuncion',
                'America/Atikokan',
                'America/Atka',
                'America/Bahia',
                'America/Bahia_Banderas',
                'America/Barbados',
                'America/Belem',
                'America/Belize',
                'America/Blanc-Sablon',
                'America/Boa_Vista',
                'America/Bogota',
                'America/Boise',
                'America/Buenos_Aires',
                'America/Cambridge_Bay',
                'America/Campo_Grande',
                'America/Cancun',
                'America/Caracas',
                'America/Catamarca',
                'America/Cayenne',
                'America/Cayman',
                'America/Chicago',
                'America/Chihuahua',
                'America/Coral_Harbour',
                'America/Cordoba',
                'America/Costa_Rica',
                'America/Creston',
                'America/Cuiaba',
                'America/Curacao',
                'America/Danmarkshavn',
                'America/Dawson',
                'America/Dawson_Creek',
                'America/Denver',
                'America/Detroit',
                'America/Dominica',
                'America/Edmonton',
                'America/Eirunepe',
                'America/El_Salvador',
                'America/Ensenada',
                'America/Fort_Nelson',
                'America/Fort_Wayne',
                'America/Fortaleza',
                'America/Glace_Bay',
                'America/Godthab',
                'America/Goose_Bay',
                'America/Grand_Turk',
                'America/Grenada',
                'America/Guadeloupe',
                'America/Guatemala',
                'America/Guayaquil',
                'America/Guyana',
                'America/Halifax',
                'America/Havana',
                'America/Hermosillo',
                'America/Indiana/Indianapolis',
                'America/Indiana/Knox',
                'America/Indiana/Marengo',
                'America/Indiana/Petersburg',
                'America/Indiana/Tell_City',
                'America/Indiana/Vevay',
                'America/Indiana/Vincennes',
                'America/Indiana/Winamac',
                'America/Indianapolis',
                'America/Inuvik',
                'America/Iqaluit',
                'America/Jamaica',
                'America/Jujuy',
                'America/Juneau',
                'America/Kentucky/Louisville',
                'America/Kentucky/Monticello',
                'America/Knox_IN',
                'America/Kralendijk',
                'America/La_Paz',
                'America/Lima',
                'America/Los_Angeles',
                'America/Louisville',
                'America/Lower_Princes',
                'America/Maceio',
                'America/Managua',
                'America/Manaus',
                'America/Marigot',
                'America/Martinique',
                'America/Matamoros',
                'America/Mazatlan',
                'America/Mendoza',
                'America/Menominee',
                'America/Merida',
                'America/Metlakatla',
                'America/Mexico_City',
                'America/Miquelon',
                'America/Moncton',
                'America/Monterrey',
                'America/Montevideo',
                'America/Montreal',
                'America/Montserrat',
                'America/Nassau',
                'America/New_York',
                'America/Nipigon',
                'America/Nome',
                'America/Noronha',
                'America/North_Dakota/Beulah',
                'America/North_Dakota/Center',
                'America/North_Dakota/New_Salem',
                'America/Ojinaga',
                'America/Panama',
                'America/Pangnirtung',
                'America/Paramaribo',
                'America/Phoenix',
                'America/Port_of_Spain',
                'America/Port-au-Prince',
                'America/Porto_Acre',
                'America/Porto_Velho',
                'America/Puerto_Rico',
                'America/Rainy_River',
                'America/Rankin_Inlet',
                'America/Recife',
                'America/Regina',
                'America/Resolute',
                'America/Rio_Branco',
                'America/Rosario',
                'America/Santa_Isabel',
                'America/Santarem',
                'America/Santiago',
                'America/Santo_Domingo',
                'America/Sao_Paulo',
                'America/Scoresbysund',
                'America/Shiprock',
                'America/Sitka',
                'America/St_Barthelemy',
                'America/St_Johns',
                'America/St_Kitts',
                'America/St_Lucia',
                'America/St_Thomas',
                'America/St_Vincent',
                'America/Swift_Current',
                'America/Tegucigalpa',
                'America/Thule',
                'America/Thunder_Bay',
                'America/Tijuana',
                'America/Toronto',
                'America/Tortola',
                'America/Vancouver',
                'America/Virgin',
                'America/Whitehorse',
                'America/Winnipeg',
                'America/Yakutat',
                'America/Yellowknife',
                'Antarctica/Casey',
                'Antarctica/Davis',
                'Antarctica/DumontDUrville',
                'Antarctica/Macquarie',
                'Antarctica/Mawson',
                'Antarctica/McMurdo',
                'Antarctica/Palmer',
                'Antarctica/Rothera',
                'Antarctica/South_Pole',
                'Antarctica/Syowa',
                'Antarctica/Troll',
                'Antarctica/Vostok',
                'Arctic/Longyearbyen',
                'ART',
                'Asia/Aden',
                'Asia/Almaty',
                'Asia/Amman',
                'Asia/Anadyr',
                'Asia/Aqtau',
                'Asia/Aqtobe',
                'Asia/Ashgabat',
                'Asia/Ashkhabad',
                'Asia/Baghdad',
                'Asia/Bahrain',
                'Asia/Baku',
                'Asia/Bangkok',
                'Asia/Barnaul',
                'Asia/Beirut',
                'Asia/Bishkek',
                'Asia/Brunei',
                'Asia/Calcutta',
                'Asia/Chita',
                'Asia/Choibalsan',
                'Asia/Chongqing',
                'Asia/Chungking',
                'Asia/Colombo',
                'Asia/Dacca',
                'Asia/Damascus',
                'Asia/Dhaka',
                'Asia/Dili',
                'Asia/Dubai',
                'Asia/Dushanbe',
                'Asia/Gaza',
                'Asia/Harbin',
                'Asia/Hebron',
                'Asia/Ho_Chi_Minh',
                'Asia/Hong_Kong',
                'Asia/Hovd',
                'Asia/Irkutsk',
                'Asia/Istanbul',
                'Asia/Jakarta',
                'Asia/Jayapura',
                'Asia/Jerusalem',
                'Asia/Kabul',
                'Asia/Kamchatka',
                'Asia/Karachi',
                'Asia/Kashgar',
                'Asia/Kathmandu',
                'Asia/Katmandu',
                'Asia/Khandyga',
                'Asia/Kolkata',
                'Asia/Krasnoyarsk',
                'Asia/Kuala_Lumpur',
                'Asia/Kuching',
                'Asia/Kuwait',
                'Asia/Macao',
                'Asia/Macau',
                'Asia/Magadan',
                'Asia/Makassar',
                'Asia/Manila',
                'Asia/Muscat',
                'Asia/Nicosia',
                'Asia/Novokuznetsk',
                'Asia/Novosibirsk',
                'Asia/Omsk',
                'Asia/Oral',
                'Asia/Phnom_Penh',
                'Asia/Pontianak',
                'Asia/Pyongyang',
                'Asia/Qatar',
                'Asia/Qyzylorda',
                'Asia/Rangoon',
                'Asia/Riyadh',
                'Asia/Saigon',
                'Asia/Sakhalin',
                'Asia/Samarkand',
                'Asia/Seoul',
                'Asia/Shanghai',
                'Asia/Singapore',
                'Asia/Srednekolymsk',
                'Asia/Taipei',
                'Asia/Tashkent',
                'Asia/Tbilisi',
                'Asia/Tehran',
                'Asia/Tel_Aviv',
                'Asia/Thimbu',
                'Asia/Thimphu',
                'Asia/Tokyo',
                'Asia/Tomsk',
                'Asia/Ujung_Pandang',
                'Asia/Ulaanbaatar',
                'Asia/Ulan_Bator',
                'Asia/Urumqi',
                'Asia/Ust-Nera',
                'Asia/Vientiane',
                'Asia/Vladivostok',
                'Asia/Yakutsk',
                'Asia/Yekaterinburg',
                'Asia/Yerevan',
                'AST',
                'Atlantic/Azores',
                'Atlantic/Bermuda',
                'Atlantic/Canary',
                'Atlantic/Cape_Verde',
                'Atlantic/Faeroe',
                'Atlantic/Faroe',
                'Atlantic/Jan_Mayen',
                'Atlantic/Madeira',
                'Atlantic/Reykjavik',
                'Atlantic/South_Georgia',
                'Atlantic/St_Helena',
                'Atlantic/Stanley',
                'Australia/ACT',
                'Australia/Adelaide',
                'Australia/Brisbane',
                'Australia/Broken_Hill',
                'Australia/Canberra',
                'Australia/Currie',
                'Australia/Darwin',
                'Australia/Eucla',
                'Australia/Hobart',
                'Australia/LHI',
                'Australia/Lindeman',
                'Australia/Lord_Howe',
                'Australia/Melbourne',
                'Australia/North',
                'Australia/NSW',
                'Australia/Perth',
                'Australia/Queensland',
                'Australia/South',
                'Australia/Sydney',
                'Australia/Tasmania',
                'Australia/Victoria',
                'Australia/West',
                'Australia/Yancowinna',
                'BET',
                'Brazil/Acre',
                'Brazil/DeNoronha',
                'Brazil/East',
                'Brazil/West',
                'BST',
                'Canada/Atlantic',
                'Canada/Central',
                'Canada/East-Saskatchewan',
                'Canada/Eastern',
                'Canada/Mountain',
                'Canada/Newfoundland',
                'Canada/Pacific',
                'Canada/Saskatchewan',
                'Canada/Yukon',
                'CAT',
                'CET',
                'Chile/Continental',
                'Chile/EasterIsland',
                'CNT',
                'CST',
                'CST6CDT',
                'CTT',
                'Cuba',
                'EAT',
                'ECT',
                'EET',
                'Egypt',
                'Eire',
                'EST',
                'EST5EDT',
                'Europe/Amsterdam',
                'Europe/Andorra',
                'Europe/Astrakhan',
                'Europe/Athens',
                'Europe/Belfast',
                'Europe/Belgrade',
                'Europe/Berlin',
                'Europe/Bratislava',
                'Europe/Brussels',
                'Europe/Bucharest',
                'Europe/Budapest',
                'Europe/Busingen',
                'Europe/Chisinau',
                'Europe/Copenhagen',
                'Europe/Dublin',
                'Europe/Gibraltar',
                'Europe/Guernsey',
                'Europe/Helsinki',
                'Europe/Isle_of_Man',
                'Europe/Istanbul',
                'Europe/Jersey',
                'Europe/Kaliningrad',
                'Europe/Kiev',
                'Europe/Kirov',
                'Europe/Lisbon',
                'Europe/Ljubljana',
                'Europe/London',
                'Europe/Luxembourg',
                'Europe/Madrid',
                'Europe/Malta',
                'Europe/Mariehamn',
                'Europe/Minsk',
                'Europe/Monaco',
                'Europe/Moscow',
                'Europe/Nicosia',
                'Europe/Oslo',
                'Europe/Paris',
                'Europe/Podgorica',
                'Europe/Prague',
                'Europe/Riga',
                'Europe/Rome',
                'Europe/Samara',
                'Europe/San_Marino',
                'Europe/Sarajevo',
                'Europe/Simferopol',
                'Europe/Skopje',
                'Europe/Sofia',
                'Europe/Stockholm',
                'Europe/Tallinn',
                'Europe/Tirane',
                'Europe/Tiraspol',
                'Europe/Ulyanovsk',
                'Europe/Uzhgorod',
                'Europe/Vaduz',
                'Europe/Vatican',
                'Europe/Vienna',
                'Europe/Vilnius',
                'Europe/Volgograd',
                'Europe/Warsaw',
                'Europe/Zagreb',
                'Europe/Zaporozhye',
                'Europe/Zurich',
                'GB',
                'GB-Eire',
                'GMT',
                'GMT0',
                'Greenwich',
                'Hongkong',
                'HST',
                'Iceland',
                'IET',
                'Indian/Antananarivo',
                'Indian/Chagos',
                'Indian/Christmas',
                'Indian/Cocos',
                'Indian/Comoro',
                'Indian/Kerguelen',
                'Indian/Mahe',
                'Indian/Maldives',
                'Indian/Mauritius',
                'Indian/Mayotte',
                'Indian/Reunion',
                'Iran',
                'Israel',
                'IST',
                'Jamaica',
                'Japan',
                'JST',
                'Kwajalein',
                'Libya',
                'MET',
                'Mexico/BajaNorte',
                'Mexico/BajaSur',
                'Mexico/General',
                'MIT',
                'MST',
                'MST7MDT',
                'Navajo',
                'NET',
                'NST',
                'NZ',
                'NZ-CHAT',
                'Pacific/Apia',
                'Pacific/Auckland',
                'Pacific/Bougainville',
                'Pacific/Chatham',
                'Pacific/Chuuk',
                'Pacific/Easter',
                'Pacific/Efate',
                'Pacific/Enderbury',
                'Pacific/Fakaofo',
                'Pacific/Fiji',
                'Pacific/Funafuti',
                'Pacific/Galapagos',
                'Pacific/Gambier',
                'Pacific/Guadalcanal',
                'Pacific/Guam',
                'Pacific/Honolulu',
                'Pacific/Johnston',
                'Pacific/Kiritimati',
                'Pacific/Kosrae',
                'Pacific/Kwajalein',
                'Pacific/Majuro',
                'Pacific/Marquesas',
                'Pacific/Midway',
                'Pacific/Nauru',
                'Pacific/Niue',
                'Pacific/Norfolk',
                'Pacific/Noumea',
                'Pacific/Pago_Pago',
                'Pacific/Palau',
                'Pacific/Pitcairn',
                'Pacific/Pohnpei',
                'Pacific/Ponape',
                'Pacific/Port_Moresby',
                'Pacific/Rarotonga',
                'Pacific/Saipan',
                'Pacific/Samoa',
                'Pacific/Tahiti',
                'Pacific/Tarawa',
                'Pacific/Tongatapu',
                'Pacific/Truk',
                'Pacific/Wake',
                'Pacific/Wallis',
                'Pacific/Yap',
                'PLT',
                'PNT',
                'Poland',
                'Portugal',
                'PRC',
                'PRT',
                'PST',
                'PST8PDT',
                'ROK',
                'Singapore',
                'SST',
                'SystemV/AST4',
                'SystemV/AST4ADT',
                'SystemV/CST6',
                'SystemV/CST6CDT',
                'SystemV/EST5',
                'SystemV/EST5EDT',
                'SystemV/HST10',
                'SystemV/MST7',
                'SystemV/MST7MDT',
                'SystemV/PST8',
                'SystemV/PST8PDT',
                'SystemV/YST9',
                'SystemV/YST9YDT',
                'Turkey',
                'UCT',
                'Universal',
                'US/Alaska',
                'US/Aleutian',
                'US/Arizona',
                'US/Central',
                'US/East-Indiana',
                'US/Eastern',
                'US/Hawaii',
                'US/Indiana-Starke',
                'US/Michigan',
                'US/Mountain',
                'US/Pacific',
                'US/Pacific-New',
                'US/Samoa',
                'UTC',
                'VST',
                'W-SU',
                'WET',
                'Zulu'
            ]

        }[contentType];
    }
}