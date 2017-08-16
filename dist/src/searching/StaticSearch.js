'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Search2 = require('./Search');

var _Search3 = _interopRequireDefault(_Search2);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

/**
 * This extends Search and it allow make request to any available resource into static resources for Opengate North API
 */

var StaticSearch = (function (_Search) {
    _inherits(StaticSearch, _Search);

    /**
     * @param {!InternalOpenGateAPI} ogapi - this is configuration about Opengate North API.
     * @param {!string} url - this define a specific resource to make the search
     * @param {object} filter - this is the filter
     */

    function StaticSearch(ogapi, url, filter, timeout, contentType, customFilters) {
        _classCallCheck(this, StaticSearch);

        _get(Object.getPrototypeOf(StaticSearch.prototype), 'constructor', this).call(this, ogapi, "/catalog" + url, filter, null, null, timeout);
        this._contentType = contentType;
        this._customFilters = customFilters;
    }

    /**
     * This invoke a dummy request to OpenGate North API and the callback is managed by promises
     * @return {Promise}
     * @property {function (result:object, statusCode:number)} then - When request it is OK
     * @property {function (error:string)} catch - When request it is NOK
     */

    _createClass(StaticSearch, [{
        key: 'execute',
        value: function execute() {
            var _this = this;
            var finalContent = [];

            var ENTITY_TYPE = "entityType";
            var TYPE = "type";

            var defered = _q2['default'].defer();
            var promise = defered.promise;

            //recuperamos el catalogo pedido
            var content = _this._content(_this._contentType);
            //algunos catalogos van en función del tipo de entidad. Recuperamos la entidad por la que filtrar
            var entityType = _this._customFilters && _this._customFilters[ENTITY_TYPE];

            //A parte del tipo de entidad, recuperamos el resto de filtros
            var count_filters = Object.keys(_this._customFilters).length;
            var isFilter = count_filters > 1 || count_filters === 1 && !entityType;

            //Objeto donde se guardaran los objetos recuperados del primer prefiltro - por tipo de entidad
            var collection = {};
            if (entityType) {
                collection[entityType] = content[entityType];
            } else {
                collection = content;
            }

            switch (_this._contentType) {
                case 'operationalStatus':
                case 'specificType':
                    for (var contentTmp in collection) {
                        collection[contentTmp].forEach(function (finalValue) {
                            if (!_this._customFilters.id || _this._customFilters.id && _this._customFilters.id === finalValue) {
                                finalContent.push({
                                    'entityType': contentTmp,
                                    'id': finalValue
                                });
                            }
                        });
                    }
                    break;
                case 'administrativeState':
                    var createAndAddFileObj = function createAndAddFileObj(obj) {
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
                        defered.resolve({ error: "Filters not allowed", statusCode: 400 });
                        break;
                    }
                    var result = filter ? collection[filter] : collection;
                    finalContent = result;
                    break;
                case 'userProfile':
                    for (var profileTmp in collection) {
                        if (!_this._customFilters.id || _this._customFilters.id && _this._customFilters.id === profileTmp) {
                            if (collection[profileTmp].length > 0) {
                                finalContent.push({
                                    'id': profileTmp,
                                    'managed': collection[profileTmp]
                                });
                            }
                        }
                    }
                    break;
                case 'mobilePhoneProvider':
                case 'ruleConfigurationSeverity':
                case 'ioTDatastreamPeriod':
                case 'ioTDatastreamAccess':
                case 'ioTDatastreamStoragePeriod':
                    {
                        if (filter) {
                            defered.resolve({ error: "Filters not supported", statuscode: 400 });
                            break;
                        }
                        finalContent = finalContent.concat(collection);
                        break;
                    }
                default:
                    //No existe el catalogo
                    defered.resolve({ data: {}, statusCode: 400 });
            }
            if (finalContent && Object.keys(finalContent).length > 0) {
                var resultContent = {};
                resultContent[_this._contentType] = finalContent;
                defered.resolve({ data: resultContent, statusCode: 200 });
            } else {
                //Existe el catalogo pero no hay datos
                defered.resolve({ data: {}, statusCode: 204 });
            }

            return promise;
        }
    }, {
        key: '_content',
        value: function _content(contentType) {
            return ({
                'administrativeState': {
                    'ASSET': [{
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
                'specificType': {
                    'COMMUNICATIONS_MODULE': ['ADSL', 'CAN', 'ETH', 'GENERIC', 'GSM', 'I2C', 'LOWPAN', 'PLC', 'RS232', 'RS422', 'RS485', 'UMTS', 'WIFI', 'ZIGBEE', 'MOBILE', 'MESH', 'SIGFOX'],
                    'SUBSCRIBER': ['ADSL', 'ETH', 'GENERIC', 'LOWPAN', 'PLC', 'GSM', 'UMTS', 'SIM', 'WIFI', 'ZIGBEE', 'MOBILE'],
                    'SUBSCRIPTION': ['ADSL', 'ETH', 'GENERIC', 'LOWPAN', 'PLC', 'GSM', 'UMTS', 'WIFI', 'ZIGBEE', 'MOBILE'],
                    'ASSET': ['CONTAINER', 'GENERIC', 'METER', 'SENSOR', 'TPV', 'VEHICLE', 'VENDING', 'GLUCOMETER_SENSOR', 'WEIGHT_SENSOR', 'BLOODPRESSURE_SENSOR'],
                    'GATEWAY': ['CONCENTRATOR', 'COORDINATOR', 'GENERIC', 'MODEM', 'ROUTER', 'COMHUB', 'GLUCOMETER_SENSOR', 'WEIGHT_SENSOR', 'BLOODPRESSURE_SENSOR']
                },
                'communicationsModuleType': {
                    "GENERIC": {
                        "COMMUNICATIONS_MODULE": {
                            "mandatory": ["generatedEntityKey"],
                            "optional": ["administrativeState", "IMEI", "MAC", "HARDWARE", "SOFTWARE"]
                        },
                        "SUBSCRIPTION": {
                            "mandatory": ["generatedEntityKey"],
                            "optional": ["administrativeState", "IMSI", "ADDRESS", "HOME_OPERATOR", "REGISTER_OPERATOR", "MSISDN", "LOCATION"]
                        },
                        "SUBSCRIBER": {
                            "mandatory": ["generatedEntityKey"],
                            "optional": ["administrativeState", "ICC"]
                        }
                    },
                    "WIFI": {
                        "COMMUNICATIONS_MODULE": {
                            "mandatory": ["generatedEntityKey", "MAC"],
                            "optional": ["administrativeState", "HARDWARE", "SOFTWARE"]
                        },
                        "SUBSCRIPTION": {
                            "mandatory": ["generatedEntityKey"],
                            "optional": ["administrativeState", "ADDRESS"]
                        }
                    },
                    "ETH": {
                        "COMMUNICATIONS_MODULE": {
                            "mandatory": ["generatedEntityKey", "MAC"],
                            "optional": ["administrativeState", "HARDWARE", "SOFTWARE"]
                        },
                        "SUBSCRIPTION": {
                            "mandatory": ["generatedEntityKey"],
                            "optional": ["administrativeState", "ADDRESS"]
                        }
                    },
                    /*"BLUETOOTH": {
                        "COMMUNICATIONS_MODULE": {
                            "mandatory": ["generatedEntityKey",MAC"],
                            "optional": ["administrativeState", "HARDWARE", "SOFTWARE"]
                        }
                    },*/
                    "MESH": {
                        "COMMUNICATIONS_MODULE": {
                            "mandatory": ["generatedEntityKey", "MAC"],
                            "optional": ["administrativeState", "HARDWARE", "SOFTWARE"]
                        }
                    },
                    "LOWPAN": {
                        "COMMUNICATIONS_MODULE": {
                            "mandatory": ["generatedEntityKey", "MAC"],
                            "optional": ["administrativeState", "HARDWARE", "SOFTWARE"]
                        },
                        "SUBSCRIPTION": {
                            "mandatory": ["generatedEntityKey"],
                            "optional": ["administrativeState"]
                        }
                    },
                    "PLC": {
                        "COMMUNICATIONS_MODULE": {
                            "mandatory": ["generatedEntityKey", "MAC"],
                            "optional": ["administrativeState", "HARDWARE", "SOFTWARE"]
                        },
                        "SUBSCRIPTION": {
                            "mandatory": ["generatedEntityKey"],
                            "optional": ["administrativeState"]
                        }
                    },
                    "ZIGBEE": {
                        "COMMUNICATIONS_MODULE": {
                            "mandatory": ["generatedEntityKey", "MAC"],
                            "optional": ["administrativeState", "HARDWARE", "SOFTWARE"]
                        },
                        "SUBSCRIPTION": {
                            "mandatory": ["generatedEntityKey"],
                            "optional": ["administrativeState"]
                        }
                    },
                    "ADSL": {
                        "COMMUNICATIONS_MODULE": {
                            "mandatory": ["generatedEntityKey"],
                            "optional": ["administrativeState", "IMEI", "MAC", "HARDWARE", "SOFTWARE"]
                        },
                        "SUBSCRIPTION": {
                            "mandatory": ["generatedEntityKey"],
                            "optional": ["administrativeState", "ADDRESS", "HOME_OPERATOR", "LOCATION"]
                        }
                    },
                    "MOBILE": {
                        "COMMUNICATIONS_MODULE": {
                            "mandatory": ["generatedEntityKey"],
                            "optional": ["administrativeState", "IMEI", "MAC", "HARDWARE", "SOFTWARE"]
                        },
                        "SUBSCRIPTION": {
                            "mandatory": ["generatedEntityKey"],
                            "optional": ["administrativeState", "IMSI", "ADDRESS", "HOME_OPERATOR", "REGISTER_OPERATOR", "MSISDN", "LOCATION"]
                        },
                        "SUBSCRIBER": {
                            "mandatory": ["generatedEntityKey"],
                            "optional": ["administrativeState", "ICC"]
                        }
                    },
                    "GSM": {
                        "COMMUNICATIONS_MODULE": {
                            "mandatory": ["generatedEntityKey"],
                            "optional": ["administrativeState", "IMEI", "MAC", "HARDWARE", "SOFTWARE"]
                        },
                        "SUBSCRIPTION": {
                            "mandatory": ["generatedEntityKey"],
                            "optional": ["administrativeState", "IMSI", "ADDRESS", "HOME_OPERATOR", "REGISTER_OPERATOR", "MSISDN", "LOCATION"]
                        },
                        "SUBSCRIBER": {
                            "mandatory": ["generatedEntityKey"],
                            "optional": ["administrativeState", "ICC"]
                        }
                    },
                    "CAN": {
                        "COMMUNICATIONS_MODULE": {
                            "mandatory": ["entityKey"],
                            "optional": ["administrativeState"]
                        }
                    },
                    "I2C": {
                        "COMMUNICATIONS_MODULE": {
                            "mandatory": ["entityKey"],
                            "optional": ["administrativeState"]
                        }
                    },
                    "RS232": {
                        "COMMUNICATIONS_MODULE": {
                            "mandatory": ["entityKey"],
                            "optional": ["administrativeState"]
                        }
                    },
                    "RS422": {
                        "COMMUNICATIONS_MODULE": {
                            "mandatory": ["entityKey"],
                            "optional": ["administrativeState"]
                        }
                    },
                    "RS485": {
                        "COMMUNICATIONS_MODULE": {
                            "mandatory": ["entityKey"],
                            "optional": ["administrativeState"]
                        }
                    },
                    "SIGFOX": {
                        "COMMUNICATIONS_MODULE": {
                            "mandatory": ["entityKey"],
                            "optional": ["administrativeState"]
                        }
                    }
                },
                "mobilePhoneProvider": ["Telefónica Móviles España, SAU", "Vodafone España, SAU", "France Telecom España, SA", "Xfera Móviles, SA", "Euskaltel, SA", "BT España Compañia de Servicios Globales de Telecable de Asturias, SAU", "R Cable y Telecomunicaciones Galicia, SA", "Cableuropa, SAU", "E-Plus Móviles, SL", "Fonyou Telecom, SL", "Jazz Telecom, SAU", "Best Spain Telecom, SL", "Barablu Móvil España, SLU", "Vizzavi España, SL", "Lycamobile, SL", "Lleida Networks Serveis Telemátics, SL", "Vivo, SA"],
                "ruleConfigurationSeverity": ["INFORMATIVE", "URGENT", "CRITICAL"],
                'userProfile': {
                    'root': ['admin_domain', 'admin', 'advanced', 'viewer'],
                    'admin_domain': ['admin_domain', 'admin', 'advanced', 'viewer'],
                    'admin': ['admin', 'advanced', 'viewer'],
                    'advanced': [],
                    'viewer': []
                },
                'ioTDatastreamAccess': ['READ', 'WRITE'],
                'ioTDatastreamStoragePeriod': ['DAYS', 'MONTHS', 'YEARS', 'FOREVER', 'NEVER'],
                'ioTDatastreamPeriod': ['PULSE', 'CUMULATIVE', 'INSTANT'],
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
                }

            })[contentType];
        }
    }]);

    return StaticSearch;
})(_Search3['default']);

exports['default'] = StaticSearch;
module.exports = exports['default'];
//# sourceMappingURL=StaticSearch.js.map
