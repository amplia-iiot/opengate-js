'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var _urlencode = require('urlencode');

var _urlencode2 = _interopRequireDefault(_urlencode);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

//  MOCK user searching

var _superagentMocker = require('superagent-mocker');

var _superagentMocker2 = _interopRequireDefault(_superagentMocker);

var mock = (0, _superagentMocker2['default'])(_superagent2['default']);
//

/**
 * This is a wrapper of a Rest api javascript
 */

var NorthAmpliaREST = (function () {
    /**
     * @param {{ url: string,port: string,version: string,apiKey: string}} _options - this is configuration about Opengate North API.
     * @param {function} backend - this is a backend selected to manage a request to Opengate North API.
     */

    function NorthAmpliaREST(_options, headers) {
        _classCallCheck(this, NorthAmpliaREST);

        this._options = _merge2['default'].recursive(true, this['default'](), _options);
        this._headers = headers;

        // mock.post(_options.url + '/search/datasets/catalog', function(req, res) {
        //     return {
        //         body: {
        //             "page": {
        //                 "number": 1
        //             },
        //             "datasets": [{
        //                     "identifier": "dataset_identifier",
        //                     "organization": "organizationName",
        //                     "description": "dataset de ejemplo",
        //                     "creationDate": "2017-12-01T08:52:37.643Z",
        //                     "updatedDate": "2017-12-01T08:52:37.643Z"
        //                 },
        //                 {
        //                     "identifier": "Dataset_1555328208451",
        //                     "organization": "chemacorp",
        //                     "description": "dataset bueno",
        //                     "creationDate": "2019-05-01T10:52:37.643Z",
        //                     "updatedDate": "2019-05-10T08:52:37.643Z"
        //                 }
        //             ]
        //         },
        //         statusCode: 200
        //     };
        // });

        // mock.post(_options.url + '/search/datasets/chemacorp/Dataset_1555328208451?defaultSorted=true', function(req, res) {
        //     return {
        //         body: { "page": { "number": 1 }, "entities": [{ "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_1" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_2" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_3" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_4" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_5" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_6" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_7" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_8" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_9" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_10" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_11" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_12" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_13" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_14" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_15" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_16" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_17" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_18" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_19" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_20" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_21" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_22" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_23" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_24" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_25" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_26" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_27" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_28" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_29" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_30" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_31" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_32" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_33" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_34" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_35" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_36" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_37" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_38" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_39" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_40" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_41" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_42" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_43" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_44" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_45" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_46" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_47" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_48" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_49" } }, "organization": { "_current": { "value": "chemacorp" } } } } }, { "resourceType": { "_current": { "value": "entity.device" } }, "provision": { "administration": { "channel": { "_current": { "value": "default_channel" } }, "identifier": { "_current": { "value": "CHD_BULK_50" } }, "organization": { "_current": { "value": "chemacorp" } } } } }] },
        //         statusCode: 200
        //     };
        // });

        // mock.post(_options.url + '/provision/organizations/:organizationName/bulk/async?type=ENTITIES&action=CREATE', function(req, res) {
        //     return {
        //         location: _options.url + '/provision/organizations/' + req.params.organizationName + '/bulk/async/' + new Date().getTime(),
        //         statusCode: 201
        //     };
        // });

        // mock.get(_options.url + '/provision/organizations/:organizationName/bulk/async/:id', function(req, res) {
        //     return {
        //         body: {
        //             "id": "76796426-ec3e-11e1-aff1-0800200c9a66",
        //             "organizarion": "chamcorp",
        //             "request": {
        //                 "fileName": "bulk.json",
        //                 "userEmail": "admin@bulk.es",
        //                 "header": {
        //                     "Accept": "text/plain",
        //                     "Content-type": "application/json"
        //                 },
        //                 "params": {
        //                     "type": "ENTITIES",
        //                     "flattened": true,
        //                     "action": "DELETE",
        //                     "full": true,
        //                 }
        //             },
        //             "status": "IN_PROGRESS",
        //             "startedDate": "2010-12-11T10:11:00Z",
        //             "finishedDate": "2010-12-11T10:30:00Z",
        //             "summary": {
        //                 "processed": 10,
        //                 "successful": 8,
        //                 "error": 2
        //             }
        //         },
        //         statusCode: 200
        //     };
        // });

        // mock.get(_options.url + '/provision/organizations/:organizationName/bulk/async/:id?format=raw', function(req, res) {
        //     return {
        //         data: "asldkfjadfkjladkjsflkasdfjkl",
        //         statusCode: 200
        //     };
        // });

        // // delete ok
        // mock.del(_options.url + '/provision/organizations/chema_organization/channels/default_channel/ruleconfigurations/autoprovisionedEntity', function(req) {
        //     return {
        //         statusCode: 200
        //     };
        // });

        // mock.post(_options.url + '/search/bulk/async', function(req) {
        //     return {
        //         body: {
        //             "bulks": [{
        //                     "id": "76796426-ec3e-11e1-aff1-0800200c9a66",
        //                     "organizarion": "chamcorp",
        //                     "request": {
        //                         "fileName": "bulk.json",
        //                         "userEmail": "admin@bulk.es",
        //                         "header": {
        //                             "Accept": "text/plain",
        //                             "Content-type": "application/json"
        //                         },
        //                         "params": {
        //                             "type": "ENTITIES",
        //                             "flattened": true,
        //                             "action": "DELETE",
        //                             "full": true,
        //                         }
        //                     },
        //                     "status": "IN_PROGRESS",
        //                     "startedDate": "2010-12-11T10:11:00Z",
        //                     "finishedDate": "2010-12-11T10:30:00Z",
        //                     "summary": {
        //                         "processed": 10,
        //                         "successful": 8,
        //                         "error": 2
        //                     }
        //                 },
        //                 {
        //                     "id": "76796426-ec3e-11e1-aff1-SDFSDFSDF",
        //                     "organizarion": "chamcorp",
        //                     "request": {
        //                         "fileName": "bulk.json",
        //                         "userEmail": "admin@bulk.es",
        //                         "header": {
        //                             "Accept": "text/plain",
        //                             "Content-type": "application/json"
        //                         },
        //                         "params": {
        //                             "type": "TICKETS",
        //                             "flattened": true,
        //                             "action": "UPDATE"
        //                         }
        //                     },
        //                     "status": "WAITING",
        //                     "startedDate": "2010-12-11T10:11:00Z",
        //                     "summary": {
        //                         "processed": 10,
        //                         "successful": 8,
        //                         "error": 2
        //                     }
        //                 },
        //                 {
        //                     "id": "76796426-ec3e-11e1-aff1-0800200c9a66",
        //                     "organizarion": "chamcorp",
        //                     "request": {
        //                         "fileName": "bulk2.csv",
        //                         "userEmail": "admin@bulk.es",
        //                         "header": {
        //                             "Accept": "text/plain",
        //                             "Content-type": "text/plain",
        //                             "CsvFormat": "qouteChar=\""
        //                         },
        //                         "params": {
        //                             "type": "ENTITIES",
        //                             "action": "CREATE"
        //                         }
        //                     },
        //                     "status": "FINISHED",
        //                     "startedDate": "2010-12-10T10:11:00Z",
        //                     "finishedDate": "2010-12-10T10:30:00Z",
        //                     "summary": {
        //                         "processed": "10",
        //                         "successful": "8",
        //                         "error": "2"
        //                     }
        //                 }
        //             ]
        //         },
        //         statusCode: 200
        //     }
        // });

        // ----------------------------------
        // MOCK domain searching
        /*mock.post(_options.url + '/search/domains', function(req) {
            return {
                body: {
                    "domains": [{
                        "name": "Domain_3",
                        "description": "Domain description",
                        "parentDomain": "Domain_2"
                    }]
                },
                statusCode: 200
            };
        });
        */
        /*mock.get(_options.url + '/provision/domains/root?hierarchy=true', function(req) {
            return {
                body: {
                    "domain": {
                        "name": "opengate",
                        "description": "Domain description",
                        "parentDomain": req.params.id,
                        "domains": [{
                                "name": "Domain_1_2",
                                "description": "Domain description",
                                "parentDomain": "opengate",
                                "domains": [{
                                        "name": "Domain_1_2_1",
                                        "description": "Domain description",
                                        "parentDomain": "Domain_1_2",
                                        "domains": [{
                                            "name": "Domain_1_2_1_1",
                                            "description": "Domain description",
                                            "parentDomain": "Domain_1_2_1",
                                            "domains": [{
                                                "name": "Domain_1_2_1_1_1",
                                                "description": "Domain description",
                                                "parentDomain": "Domain_1_2_1_1"
                                            }]
                                        }]
                                    },
                                    {
                                        "name": "Domain_1_2_2",
                                        "description": "Domain description",
                                        "parentDomain": "Domain_1_2",
                                        "domains": [{
                                                "name": "Domain_1_2_2_1",
                                                "description": "Domain description",
                                                "parentDomain": "Domain_1_2_2",
                                                "domains": [{
                                                    "name": "Domain_1_2_2_1_1",
                                                    "description": "Domain description",
                                                    "parentDomain": "Domain_1_2_2_1"
                                                }]
                                            },
                                            {
                                                "name": "Domain_1_2_2_2",
                                                "description": "Domain description",
                                                "parentDomain": "Domain_1_2_2",
                                                "domains": [{
                                                        "name": "Domain_1_2_2_2_1",
                                                        "description": "Domain description",
                                                        "parentDomain": "Domain_1_2_2_2"
                                                    },
                                                    {
                                                        "name": "Domain_1_2_2_2_2",
                                                        "description": "Domain description",
                                                        "parentDomain": "Domain_1_2_2_2"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "Domain_1_3",
                                "description": "Domain description",
                                "parentDomain": "opengate",
                                "domains": [{
                                        "name": "Domain_1_3_1",
                                        "description": "Domain description",
                                        "parentDomain": "Domain_1_3",
                                        "domains": [{
                                            "name": "Domain_1_3_1_1",
                                            "description": "Domain description",
                                            "parentDomain": "Domain_1_3_1",
                                            "domains": [{
                                                "name": "Domain_1_3_1_1_1",
                                                "description": "Domain description",
                                                "parentDomain": "Domain_1_3_1_1"
                                            }]
                                        }]
                                    },
                                    {
                                        "name": "Domain_1_3_2",
                                        "description": "Domain description",
                                        "parentDomain": "Domain_1_3",
                                        "domains": [{
                                                "name": "Domain_1_3_2_1",
                                                "description": "Domain description",
                                                "parentDomain": "Domain_1_3_2",
                                                "domains": [{
                                                    "name": "Domain_1_3_2_1_1",
                                                    "description": "Domain description",
                                                    "parentDomain": "Domain_1_3_2_1"
                                                }]
                                            },
                                            {
                                                "name": "Domain_1_3_2_2",
                                                "description": "Domain description",
                                                "parentDomain": "Domain_1_3_2",
                                                "domains": [{
                                                        "name": "Domain_1_3_2_2_1",
                                                        "description": "Domain description",
                                                        "parentDomain": "Domain_1_3_2_2"
                                                    },
                                                    {
                                                        "name": "Domain_1_3_2_2_2",
                                                        "description": "Domain description",
                                                        "parentDomain": "Domain_1_3_2_2"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },
                statusCode: 200
            };
        });*/
        /*
        mock.post(_options.url + '/search/channels', function(req) {
            return {
                body: {
                    "channels": [{
                        "name": "default_channel",
                        "description": "Automatic channel",
                        "organization": "organization_GetSetParam",
                        "certificates": []
                    }]
                },
                statusCode: 200
            };
        });        
        */
        // ----------------------------------
    }

    /**
     * This return a default configuration object
     * @return {object}
     */

    _createClass(NorthAmpliaREST, [{
        key: 'default',
        value: function _default() {
            return {
                timeout: 5000
            };
        }
    }, {
        key: '_url',
        value: function _url(options) {
            return options.url;
        }

        /**
         * Invoke GET action to url specified
         * @param {!string} url - url to execute GET
         * @param {number} timeout - timeout in milliseconds    
         * @param {object} headers - headers of request
         * @param {object} parameters - parameters of request
         * @return {Promise} 
         */
    }, {
        key: 'get',
        value: function get(url, timeout, headers, parameters) {
            var req = _superagent2['default'].get(this._createUrl(url, parameters));
            return this._createPromiseRequest(req, null, timeout, headers);
        }

        /**
         * Invoke POST action to url and data specified
         * @param {!string} url - url to execute POST
         * @param {object} data - attach data to request POST
         * @param {number} timeout - timeout in milliseconds
         * @param {object} headers - headers of request
         * @param {object} parameters - parameters of request
         * @return {Promise} 
         */
    }, {
        key: 'post',
        value: function post(url, data, timeout, headers, parameters) {
            var req = _superagent2['default'].post(this._createUrl(url, parameters)).send(data);

            return this._createPromiseRequest(req, null, timeout, headers);
        }

        /**
         * Invoke POST multipart action to url and data specified
         * @param {!string} url - url to execute POST
         * @param {FormData} formData - attach data to request POST
         * @param {object} events - events allowed, xhr.process 
         * @param {number} timeout - timeout in milliseconds       
         * @param {object} headers - headers of request
         * @param {object} parameters - parameters of request
         * @return {Promise} 
         */
    }, {
        key: 'post_multipart',
        value: function post_multipart(url, formData, events, timeout, headers, parameters) {
            var req = _superagent2['default'].post(this._createUrl(url, parameters));

            if (formData && (formData.meta || formData.file || formData.json || formData.certificate)) {
                if (formData.meta) {
                    req.field('meta', formData.meta);
                    delete formData.Fmeta;
                }
                if (formData.json) {
                    req.field('json', formData.json);
                    delete formData.json;
                }

                if (formData.file) {
                    req.field('file', formData.file);
                    delete formData.file;
                }

                if (formData.certificate) {
                    req.attach('certificate', formData.certificate);
                    delete formData.certificate;
                }
            } else if (formData.bulkFile) {
                req.set('Content-Type', formData.ext);
                formData = formData.bulkFile;
            }

            req.send(formData);

            return this._createPromiseRequest(req, events, timeout, headers);
        }

        /**
         * Invoke PUT action to url and data specified
         * @param {!string} url - url to execute PUT
         * @param {object} data - attach data to request PUT
         * @param {number} timeout - timeout in milliseconds       
         * @param {object} headers - headers of request
         * @param {object} parameters - parameters of request
         * @return {Promise} 
         */
    }, {
        key: 'put',
        value: function put(url, data, timeout, headers, parameters) {
            var req = _superagent2['default'].put(this._createUrl(url, parameters)).send(data);

            if (headers) {
                headers['Content-Type'] = 'application/json';
            } else {
                headers = {
                    'Content-Type': 'application/json'
                };
            }

            return this._createPromiseRequest(req, null, timeout, headers);
        }

        /**
         * Invoke DELETE action to url specified
         * @param {!string} url - url to execute DELETE
         * @param {number} timeout - timeout in milliseconds    
         * @param {object} headers - headers of request
         * @param {object} parameters - parameters of request
         * @return {Promise} 
         */
    }, {
        key: 'delete',
        value: function _delete(url, timeout, headers, parameters) {
            var req = _superagent2['default']['delete'](this._createUrl(url, parameters));
            return this._createPromiseRequest(req, null, timeout, headers);
        }
    }, {
        key: '_createUrl',
        value: function _createUrl(relativeUrl, parameters) {
            var encode = [];

            if (parameters) {
                var keys = Object.keys(parameters);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    var queryParameter = key + '=' + parameters[key];
                    if (i === 0) {
                        relativeUrl = relativeUrl + '?' + queryParameter;
                    } else {
                        relativeUrl = relativeUrl + '&' + queryParameter;
                    }
                }
                console.log(JSON.stringify(parameters));
            }

            console.log(relativeUrl);

            var relativeUrlSplit = relativeUrl.split("/");
            var length = relativeUrlSplit.length;

            relativeUrlSplit.forEach(function (item, index) {
                if (index === length - 1 && item.indexOf("?") > 0) {
                    var parameters = item.substring(item.indexOf("?"), item.length);
                    var _item = item.substring(0, item.indexOf("?"));
                    encode.push((0, _urlencode2['default'])(_item) + parameters);
                } else {
                    encode.push((0, _urlencode2['default'])(item));
                }
            });
            var returnUrl = this._url(this._options) + "/" + encode.join("/");
            return returnUrl;
        }
    }, {
        key: '_createPromiseRequest',
        value: function _createPromiseRequest(req, events, timeout, headers) {
            var _timeout = timeout;
            if (typeof _timeout === "undefined" || _timeout === null) {
                _timeout = this._options.timeout;
            }
            var defered = _q2['default'].defer();
            var promise = defered.promise;
            var apiKey = this._options.apiKey;
            var _req = _timeout === -1 ? req : req.timeout(_timeout);

            if (apiKey) {
                _req = _req.set('X-ApiKey', this._options.apiKey);
            }

            if (headers) {
                var keys = Object.keys(headers);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    if (headers[key] !== undefined) _req = _req.set(key, headers[key]);
                }
            }

            if (events) {
                for (var _event in events) {
                    _req = _req.on(_event, events[_event]);
                }
            }
            _req = _req.end(function (err, res) {
                if (err !== null) {
                    var data = undefined;
                    var _status = undefined;
                    var errorMessage = {
                        errors: [{
                            code: err.status ? err.status : _status,
                            message: 'Something is broken. Please contact with your administrator.'
                        }]
                    };
                    if (typeof err.response !== "undefined") {
                        data = err.response.body ? err.response.body : errorMessage;
                        _status = err.status;
                    } else {
                        if (!_status) {
                            data = errorMessage;
                            _status = 500;
                        } else {
                            data = err.message;
                            _status = 408;
                        }
                    }
                    defered.reject({
                        statusCode: _status,
                        'data': data
                    });
                } else {
                    defered.resolve(res);
                }
            });

            return promise;
        }
    }]);

    return NorthAmpliaREST;
})();

exports['default'] = NorthAmpliaREST;
module.exports = exports['default'];
//# sourceMappingURL=NorthAmpliaREST.js.map
