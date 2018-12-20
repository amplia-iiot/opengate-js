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

        // mock.post(_options.url + '/search/tasks', function(req) {
        //     return {
        //         body: {
        //             "page": {
        //                 "number": 1
        //             },
        //             "tasks": [{
        //                     "id": "task_1",
        //                     "workgroup": "user_wg",
        //                     "domain": "user_domain",
        //                     "name": "task_1_name",
        //                     "description": "example task request",
        //                     "state": "INACTIVE",
        //                     "schedule": {
        //                         "start": {
        //                             "date": "2010-12-11T10:10:00Z"
        //                         },
        //                         "stop": {
        //                             "executions": 10
        //                         },
        //                         "repeating": {
        //                             "period": {
        //                                 "each": 7,
        //                                 "unit": "DAYS"
        //                             },
        //                             "pattern": {
        //                                 "time": "10:30:00Z",
        //                                 "weekly": {
        //                                     "days": [
        //                                         "MON",
        //                                         "WED"
        //                                     ]
        //                                 }
        //                             }
        //                         }
        //                     },
        //                     "job": {
        //                         "request": {
        //                             "name": "REBOOT_EQUIPMENT",
        //                             "parameters": [{
        //                                 "name": "TYPE",
        //                                 "type": "string",
        //                                 "value": {
        //                                     "string": "HARDWARE"
        //                                 }
        //                             }],
        //                             "schedule": {
        //                                 "stop": {
        //                                     "delayed": 300000
        //                                 }
        //                             },
        //                             "notify": true,
        //                             "user": "user@mail.com",
        //                             "callback": "http://[your_application_address]/[your_URI]",
        //                             "operationParameters": {
        //                                 "ackTimeout": 5000,
        //                                 "timeout": 6000,
        //                                 "retries": 0,
        //                                 "retriesDelay": 1000
        //                             }
        //                         }
        //                     }
        //                 },
        //                 {
        //                     "id": "task_2",
        //                     "workgroup": "user_wg",
        //                     "domain": "user_domain",
        //                     "name": "task_2_name",
        //                     "description": "example task request",
        //                     "state": "ACTIVE",
        //                     "schedule": {
        //                         "start": {
        //                             "date": "2011-01-11T10:10:00Z"
        //                         },
        //                         "stop": {
        //                             "date": "2011-12-31T23:59:59Z"
        //                         },
        //                         "repeating": {
        //                             "period": {
        //                                 "each": 1,
        //                                 "unit": "MONTH"
        //                             }
        //                         }
        //                     },
        //                     "job": {
        //                         "request": {
        //                             "name": "REFRESH_INFO",
        //                             "schedule": {
        //                                 "stop": {
        //                                     "delayed": 300000
        //                                 }
        //                             },
        //                             "notify": true,
        //                             "user": "user@mail.com",
        //                             "callback": "http://[your_application_address]/[your_URI]",
        //                             "operationParameters": {
        //                                 "ackTimeout": 5000,
        //                                 "timeout": 6000,
        //                                 "retries": 0,
        //                                 "retriesDelay": 1000
        //                             }
        //                         }
        //                     }
        //                 }
        //             ]
        //         },
        //         statusCode: 200
        //     }
        // });
        // Mocks for rule configuration clone/delete
        // clone ok
        // mock.post(_options.url + '/provision/organizations/chema_organization/channels/default_channel/ruleconfigurations/batteryEvent/clone', function(req) {
        //     return {
        //         statusCode: 200
        //     };
        // });

        // // delete ok
        // mock.del(_options.url + '/provision/organizations/chema_organization/channels/default_channel/ruleconfigurations/autoprovisionedEntity', function(req) {
        //     return {
        //         statusCode: 200
        //     };
        // });

        /*mock.post(_options.url + '/search/workgroups', function(req) {
            return {
                body: {
                    "workgroups": [{
                            "name": "Workgroup_1",
                            "description": "Workgroup description",
                            "domain": "amplia",
                            "administrative": true
                         },
                        {
                            "name": "Workgroup_2",
                            "description": "Workgroup description",
                            "domain": "amplia",
                            "administrative": true
                        }
                    ]
                },
                statusCode: 200
            }
        });*/

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
            console.log(returnUrl);
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
            var _req = req.timeout(_timeout);

            if (apiKey) {
                _req = _req.set('X-ApiKey', this._options.apiKey);
            }

            if (headers) {
                var keys = Object.keys(headers);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    _req = _req.set(key, headers[key]);
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
                    if (typeof err.response !== "undefined") {
                        data = err.response.body;
                        _status = err.status;
                    } else {
                        data = err.message;
                        _status = 408;
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
