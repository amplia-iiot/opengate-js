export default {
    "definitions": {
        "jobDefaultParameters": {
            "id": "/og_basic_types.json#/definitions/jobDefaultParameters",
            "type": "object",
            "properties": {
                "job.request.operationParameters.ackTimeout": {
                    "type": "integer",
                    "title": "Operation ACK Timeout (milliseconds)",
                    "description": "",
                    "default": 5000
                },
                "job.request.operationParameters.timeout": {
                    "type": "integer",
                    "title": "Operation Timeout (milliseconds)",
                    "description": "",
                    "default": 60000
                },
                "job.request.operationParameters.retries": {
                    "type": "integer",
                    "title": "Operation Retries",
                    "description": "",
                    "default": 1
                },
                "job.request.operationParameters.retriesDelay": {
                    "type": "integer",
                    "title": "Operation Retries Delay (milliseconds)",
                    "description": "",
                    "default": 1000
                }
            }
        },
        "parametersEmpty": {
            "id": "/og_basic_types.json#/definitions/parametersEmpty",
            "type": "object",
            "properties": {}
        },
        "stepsEmpty": {
            "id": "/og_basic_types.json#/definitions/stepsEmpty",
            "type": "object",
            "properties": {}
        },
        "stepsResult": {
            "id": "/og_basic_types.json#/definitions/stepsResult",
            "type": "string",
            "title": "Step Name",
            "description": "",
            "enum": [
                "ERROR",
                "SUCCESSFUL",
                "SKIPPED",
                "NOT_EXECUTED"
            ]
        },
        "stepNoResponseData": {
            "id": "/og_basic_types.json#/definitions/stepNoResponseData",
            "type": "object",
            "properties": {
                "result": {
                    "$ref": "/og_basic_types.json#/definitions/stepsResult"
                },
                "timestamp": {
                    "$ref": "/og_basic_types.json#/definitions/timestamp"
                }
            },
            "required": [
                "name",
                "result",
                "timestamp"
            ]
        },
        "date": {
            "id": "/og_basic_types.json#/definitions/date",
            "type": "string",
            "format": "date",
            "title": "date",
            "description": "date in ISO 8601",
            "pattern": "^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])$"
        },
        "time": {
            "id": "/og_basic_types.json#/definitions/time",
            "type": "string",
            "format": "time",
            "title": "time",
            "description": "time in ISO 8601",
            "pattern": "^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])$"
        },
        "timezone": {
            "id": "/og_basic_types.json#/definitions/timezone",
            "type": "integer",
            "title": "timezone",
            "minimum": 0,
            "maximum": 14,
            "default": 0
        },
        "dst": {
            "id": "/og_basic_types.json#/definitions/dst",
            "type": "integer",
            "title": "DST",
            "minimum": 0,
            "default": 0
        },
        "datetime": {
            "id": "/og_basic_types.json#/definitions/datetime",
            "type": "object",
            "properties": {
                "date": {
                    "$ref": "/og_basic_types.json#/definitions/date"
                },
                "time": {
                    "$ref": "/og_basic_types.json#/definitions/time"
                },
                "timezone": {
                    "$ref": "/og_basic_types.json#/definitions/timezone"
                },
                "dst": {
                    "$ref": "/og_basic_types.json#/definitions/dst"
                }
            },
            "required": [
                "date",
                "time",
                "timezone",
                "dst"
            ]
        },
        "timestamp": {
            "id": "/og_basic_types.json#/definitions/timestamp",
            "type": "string",
            "format": "date-time",
            "title": "timestamp",
            "description": "date & time in ISO 8601",
            "pattern": "^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])$"
        },
        "datamodelResultCode": {
            "id": "/og_basic_types.json#/definitions/datamodelResultCode",
            "type": "string",
            "title": "Result Code",
            "description": "Result code of Get Operation",
            "enum": [
                "SUCCESS",
                "PARAM_NOT_SUPPORTED",
                "INVALID_FORMAT",
                "WRONG_VALUE",
                "UNKNOWN"
            ]
        },
        "datamodelParamName": {
            "id": "/og_basic_types.json#/definitions/datamodelParamName",
            "type": "string",
            "title": "Id",
            "description": "Id of the parameter"
        },
        "datamodelParamNameValue": {
            "id": "/og_basic_types.json#/definitions/datamodelParamNameValue",
            "type": "object",
            "properties": {
                "name": {
                    "$ref": "/og_basic_types.json#/definitions/datamodelParamName"
                },
                "value": {
                    "type": "string",
                    "title": "Value",
                    "description": "Value of the parameter"
                }
            },
            "required": [
                "name",
                "value"
            ]
        },
        "datamodelResponse": {
            "id": "/og_basic_types.json#/definitions/datamodelResponse",
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "title": "Id",
                    "description": "Id of the parameter"
                },
                "value": {
                    "type": "string",
                    "title": "type",
                    "description": "value of the parameter"
                },
                "resultCode": {
                    "$ref": "/og_basic_types.json#/definitions/datamodelResultCode"
                },
                "resultDescription": {
                    "type": "string",
                    "title": "Result Description",
                    "description": "Result description of Get Operation"
                }
            },
            "required": [
                "name",
                "value"
            ]
        },
        "coordinates": {
            "id": "/og_basic_types.json#/definitions/coordinates",
            "description": "A geographical coordinates",
            "type": "array",
            "maxItems": 2,
            "items": {
                "type": "number"
            }
        },
        "location": {
            "id": "/og_basic_types.json#/definitions/location",
            "description": "A geojson enriched for OpenGate",
            "type": "object",
            "properties": {
                "position": {
                    "type": "object",
                    "description": "compatible with geojson format",
                    "properties": {
                        "type": {
                            "type": "string",
                            "default": "Point"
                        },
                        "coordinates": {
                            "type": "array",
                            "description": "Format [longitude, latitude]",
                            "minItems": 2,
                            "items": {
                                "type": "number"
                            },
                            "additionalItems": false
                        }
                    },
                    "required": [
                        "coordinates"
                    ]
                },
                "country": {
                    "type": "string"
                },
                "region": {
                    "type": "string"
                },
                "province": {
                    "type": "string"
                },
                "town": {
                    "type": "string"
                },
                "postal": {
                    "type": "string"
                },
                "source": {
                    "type": "string",
                    "enum": [
                        "MOBILE",
                        "GPS",
                        "GLONASS",
                        "RTK",
                        "RFID",
                        "WIFI",
                        "ZIGBEE",
                        "LORA",
                        "SIGFOX-BASIC",
                        "SIGFOX-SPOTIT",
                        "UNKNOWN"
                    ]
                },
                "accuracy": {
                    "type": "number",
                    "description": "position accuracy in meters"
                }
            }
        },
        "ipv4": {
            "id": "/og_basic_types.json#/definitions/ipv4",
            "type": "string",
            "format": "ipv4",
            "title": "ipv4",
            "description": "IPV4 format"
        },
        "ipv6": {
            "id": "/og_basic_types.json#/definitions/ipv6",
            "type": "string",
            "format": "ipv6",
            "title": "ipv6",
            "description": "IPV6 format"
        },
        "mac48": {
            "id": "/og_basic_types.json#/definitions/mac48",
            "type": "string",
            "title": "mac48",
            "description": "MAC48 format",
            "pattern": "(([0-9A-Fa-f]{2}[-:]){5}[0-9A-Fa-f]{2})|(([0-9A-Fa-f]{4}){2}[0-9A-Fa-f]{4})"
        },
        "msisdn": {
            "id": "/og_basic_types.json#/definitions/msisdn",
            "type": "string",
            "minLength": 7,
            "maxLength": 15
        },
        "address": {
            "id": "/og_basic_types.json#/definitions/address",
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "IPV4",
                        "IPV6",
                        "MAC48",
                        "UNKNOWN"
                    ]
                },
                "value": {
                    "type": "string",
                    "title": "type",
                    "description": "value of the parameter"
                },
                "apn": {
                    "type": "string"
                }
            }
        },
        "percentage": {
            "id": "/og_basic_types.json#/definitions/percentage",
            "type": "number",
            "minimum": 0,
            "maximum": 100
        },
        "entityType": {
            "id": "/og_basic_types.json#/definitions/entityType",
            "type": "string",
            "title": "Entity Type",
            "description": "",
            "enum": [
                "GATEWAY",
                "ASSET",
                "COMMUNICATIONS_MODULE",
                "SUBSCRIPTION",
                "SUBSCRIBER"
            ]
        },
        "deviceOperationalStatus": {
            "id": "/og_basic_types.json#/definitions/deviceOperationalStatus",
            "type": "string",
            "title": "Operational Status",
            "description": "",
            "enum": [
                "NORMAL",
                "SAFE_MODE",
                "TAMPER",
                "TEST",
                "DOWN",
                "ALARM",
                "UNKNOWN"
            ]
        },
        "commsModuleOperationalStatus": {
            "id": "/og_basic_types.json#/definitions/commsModuleOperationalStatus",
            "type": "string",
            "title": "Operational Status",
            "description": "",
            "enum": [
                "STOPPED",
                "STOPPING",
                "STARTING",
                "RUNNING",
                "DISABLED",
                "ERROR"
            ]
        },
        "ipStatus": {
            "id": "/og_basic_types.json#/definitions/ipStatus",
            "type": "string",
            "title": "IP Reachability Status",
            "description": "",
            "enum": [
                "OK",
                "NOK"
            ]
        },
        "administrativeState": {
            "id": "/og_basic_types.json#/definitions/administrativeState",
            "type": "string",
            "title": "Operational Status",
            "description": "",
            "enum": [
                "REQUESTED",
                "READY",
                "REPAIR",
                "TESTING",
                "ACTIVE",
                "SUSPENDED",
                "DELETED",
                "RETIRED"
            ]
        },
        "model": {
            "id": "/og_basic_types.json#/definitions/model",
            "type": "object",
            "title": "Model",
            "description": "",
            "properties": {
                "name": {
                    "type": "string"
                },
                "version": {
                    "type": "string"
                },
                "manufacturer": {
                    "type": "string"
                },
                "manufacturerOUI": {
                    "type": "string"
                }
            }
        },
        "software": {
            "id": "/og_basic_types.json#/definitions/software",
            "type": "object",
            "title": "Software",
            "description": "",
            "properties": {
                "name": {
                    "type": "string"
                },
                "version": {
                    "type": "string"
                },
                "type": {
                    "type": "string",
                    "enum": [
                        "SOFTWARE",
                        "FIRMWARE"
                    ]
                }
            }
        },
        "softwareList": {
            "id": "/og_basic_types.json#/definitions/softwareList",
            "type": "array",
            "items": {
                "$ref": "/og_basic_types.json#/definitions/software"
            }
        },
        "topologyPath": {
            "id": "/og_basic_types.json#/definitions/topologyPath",
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "clock": {
            "id": "/og_basic_types.json#/definitions/clock",
            "type": "object",
            "title": "Software",
            "description": "",
            "properties": {
                "datetime": {
                    "$ref": "/og_basic_types.json#/definitions/timestamp"
                },
                "timezone": {
                    "type": "number"
                },
                "dst": {
                    "type": "object",
                    "properties": {
                        "enabled": {
                            "type": "boolean"
                        },
                        "deviation": {
                            "type": "number"
                        },
                        "begin": {
                            "$ref": "/og_basic_types.json#/definitions/timestamp"
                        },
                        "end": {
                            "$ref": "/og_basic_types.json#/definitions/timestamp"
                        }
                    }
                }
            }
        },
        "outage": {
            "id": "/og_basic_types.json#/definitions/outage",
            "type": "object",
            "properties": {
                "started": {
                    "$ref": "/og_basic_types.json#/definitions/timestamp"
                },
                "duration": {
                    "type": "number"
                }
            }
        },
        "unifiedPresence": {
            "id": "/og_basic_types.json#/definitions/unifiedPresence",
            "type": "string",
            "enum": ["IP", "GPRS", "GSM", "NOT_REGISTERED", "UNKNOWN"]
        },
        "cpuStatus": {
            "id": "/og_basic_types.json#/definitions/cpuStatus",
            "type": "string",
            "enum": [
                "IDLE",
                "IDLE/WORKING",
                "WORKING",
                "STRESSED",
                "OVERLOAD"
            ]
        },
        "batteryStatus": {
            "id": "/og_basic_types.json#/definitions/batteryStatus",
            "type": "string",
            "enum": [
                "CHARGING",
                "CHARGED",
                "UNPLUGGED",
                "ERROR",
                "UNKNOWN"
            ]
        },
        "signalQualityStatus": {
            "id": "/og_basic_types.json#/definitions/signalQualityStatus",
            "type": "string",
            "enum": ["LOW_CRITICAL", "LOW_WARNING", "NORMAL", "EXCELENT"]

        },
        "certificateList": {
            "id": "/og_basic_types.json#/definitions/certificateList",
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "presenceIp": {
            "id": "/og_basic_types.json#/definitions/presenceIp",
            "type": "string",
            "enum": ["OK", "NOK"]
        },
        "presenceGprs": {
            "id": "/og_basic_types.json#/definitions/presenceGprs",
            "type": "string",
            "enum": ["START", "STOP", "INTERIM_UPDATE", "ON", "OFF", "NOK"]
        },
        "presenceGsm": {
            "id": "/og_basic_types.json#/definitions/presenceGsm",
            "type": "string",
            "enum": ["OK", "NOK", "UNCONFIG", "UNKNOWN"]
        },
        "temperatureStatus": {
            "id": "/og_basic_types.json#/definitions/temperatureStatus",
            "type": "string",
            "enum": ["LOW_CRITICAL", "LOW_WARNING", "NORMAL", "HIGH_WARNING", "HIGH_CRITICAL"]
        },
        "powerSupplyStatus": {
            "id": "/og_basic_types.json#/definitions/powerSupplyStatus",
            "type": "string",
            "enum": ["PLUGGED_CHARGING", "PLUGGED_CHARGED", "OUTAGE", "UNPLUGGED", "UNKNOWN"]
        },
        "powerSupplySource": {
            "id": "/og_basic_types.json#/definitions/powerSupplySource",
            "type": "string",
            "enum": ["BATTERY", "DIESEL_GENERATOR", "NETWORK_PLUGGED", "SOLAR", "OTHER"]
        },
        "antennaStatus": {
            "id": "/og_basic_types.json#/definitions/antennaStatus",
            "type": "string",
            "enum": ["NORMAL", "OPEN", "SHORT_CIRCUIT", "UNKNOWN"]
        },
        "signalStrengthStatus": {
            "id": "/og_basic_types.json#/definitions/signalStrengthStatus",
            "type": "string",
            "enum": ["LOW_CRITICAL", "LOW_WARNING", "NORMAL", "EXCELENT"]
        },
        "trafficSession": {
            "id": "/og_basic_types.json#/definitions/trafficSession",
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "sentBytes": {
                    "type": "number"
                },
                "receivedBytes": {
                    "type": "number"
                },
                "sentPackets": {
                    "type": "number"
                },
                "receivedPackets": {
                    "type": "number"
                },
                "duration": {
                    "type": "number"
                },
                "address": {
                    "$ref": "/og_basic_types.json#/definitions/address"
                },
                "status": {
                    "type": "string",
                    "enum": [
                        "TERMINATED",
                        "IN_PROGRESS",
                        "UNKNOWN"
                    ]
                },
                "terminateCause": {
                    "type": "string"
                }
            }
        },
        "deviceSpecificType": {
            "id": "/og_basic_types.json#/definitions/deviceSpecificType",
            "type": "string",
            "enum": ["BLOODPRESSURE_SENSOR", "COMHUB", "CONCENTRATOR", "CONTAINER", "COORDINATOR", "GENERIC", "GLUCOMETER_SENSOR", "METER", "MODEM", "ROUTER", "SENSOR", "TPV", "VEHICLE", "VENDING", "WEIGHT_SENSOR"]
        },
        "commsModuleSpecificType": {
            "id": "/og_basic_types.json#/definitions/commsModuleSpecificType",
            "type": "string",
            "enum": ["ADSL", "CAN", "ETH", "GENERIC", "GSM", "HAN", "I2C", "LOWPAN", "MESH"]
        },
        "subscriberSpecificType": {
            "id": "/og_basic_types.json#/definitions/subscriberSpecificType",
            "type": "string",
            "enum": ["ADSL", "CAN", "ETH", "GENERIC", "GSM", "HAN", "I2C", "LOWPAN", "MESH"]
        },
        "subscriptionSpecificType": {
            "id": "/og_basic_types.json#/definitions/subscriptionSpecificType",
            "type": "string",
            "enum": ["ADSL", "CAN", "ETH", "GENERIC", "GSM", "HAN", "I2C", "LOWPAN", "MESH", "MOBILE", "PLC", "RS232", "RS422", "RS485", "SIGFOX", "UMTS", "WIFI", "ZIGBEE"]
        }

    }
}