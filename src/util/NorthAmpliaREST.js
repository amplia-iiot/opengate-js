'use strict';

import merge from 'merge';
import urlencode from 'urlencode';
import request from 'superagent';
import q from 'q';
import fs from 'fs';
//  MOCK user searching
import _mock from 'superagent-mocker';
const mock = _mock(request);
//

/**
 * This is a wrapper of a Rest api javascript
 */
export default class NorthAmpliaREST {
    /**
     * @param {{ url: string,port: string,version: string,apiKey: string}} _options - this is configuration about Opengate North API.
     * @param {function} backend - this is a backend selected to manage a request to Opengate North API.
     */
    constructor(_options, headers) {
        this._options = merge.recursive(true, this.default(), _options);
        this._headers = headers;


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
    default() {
        return {
            url: 'http://172.19.18.96:25281/v80',
            timeout: 5000,
            apiKey: '2829be88-a7d7-4f51-aefc-3cc2385b6506',
            south: {
                url: 'http://172.19.18.96:9955/v80',
            }
        }
    }

    _url(options) {
        return options.url;
    }

    /**
     * Invoke GET action to url specified
     * @param {!string} url - url to execute GET
     * @param {number} timeout - timeout in milliseconds    
     * @return {Promise} 
     */
    get(url, timeout) {
        var req = request.get(this._createUrl(url));
        return this._createPromiseRequest(req, null, timeout);
    }

    /**
     * Invoke POST action to url and data specified
     * @param {!string} url - url to execute POST
     * @param {object} data - attach data to request POST
     * @param {number} timeout - timeout in milliseconds       
     * @return {Promise} 
     */
    post(url, data, timeout) {
        var req = request.post(this._createUrl(url))
            .send(data);
            
        return this._createPromiseRequest(req, null, timeout);
    }
    post_bulk(url, data, events, timeout) {
        var req = request.post(this._createUrl(url))
            .send(data)
            .set('Content-Type', 'text/plain');
        return this._createPromiseRequest(req, null, timeout);
    }

    /**
     * Invoke POST multipart action to url and data specified
     * @param {!string} url - url to execute POST
     * @param {FormData} formData - attach data to request POST
     * @param {object} events - events allowed, xhr.process 
     * @param {number} timeout - timeout in milliseconds       
     * @return {Promise} 
     */
    post_multipart(url, formData, events, timeout) {
        var req = request.post(this._createUrl(url));
        
        if (formData && (formData.meta || formData.file || formData.json || formData.certificate)) {
            if (formData.meta) {
                req.field('meta', formData.meta);
                delete formData['Fmeta'];
            }
            if (formData.json) {
                req.field('json', formData.json);
                delete formData['json'];
            }

            if (formData.file) {
                req.field('file', formData.file);
                delete formData['file'];
            }

            if (formData.certificate) {
                req.attach('certificate', formData.certificate);
                delete formData['certificate'];
            }
            
        }
        else if (formData.bulkFile) {
            req.set('Content-Type', formData.ext);
            formData = formData.bulkFile
        }
        req.send(formData);

        
        return this._createPromiseRequest(req, events, timeout);
    }

    /**
     * Invoke PUT action to url and data specified
     * @param {!string} url - url to execute PUT
     * @param {object} data - attach data to request PUT
     * @param {number} timeout - timeout in milliseconds       
     * @return {Promise} 
     */
    put(url, data, timeout) {
        var url = this._createUrl(url);
        var req = request.put(url)
            .set('Content-Type', 'application/json')
            .send(data);
        return this._createPromiseRequest(req, null, timeout);
    }

    put_multipart(url, data, timeout) {
        var req = request.put(this._createUrl(url))
            .send(data);
        return this._createPromiseRequest(req, null, timeout);
    }

    /**
     * Invoke DELETE action to url specified
     * @param {!string} url - url to execute DELETE
     * @param {number} timeout - timeout in milliseconds    
     * @return {Promise} 
     */
    delete(url, timeout) {
        var req = request.delete(this._createUrl(url));
        return this._createPromiseRequest(req, null, timeout);
    }

    _createUrl(relativeUrl) {
        var encode = [];
        var relativeUrlSplit = relativeUrl.split("/");
        var length = relativeUrlSplit.length;
        relativeUrlSplit.forEach(function (item, index) {
            if (index === (length - 1) && item.indexOf("?") > 0) {
                var parameters = item.substring(item.indexOf("?"), item.length);
                var _item = item.substring(0, item.indexOf("?"));
                encode.push(urlencode(_item) + parameters);
            } else {
                encode.push(urlencode(item));
            }
        });
        return this._url(this._options) + "/" + encode.join("/");
    }

    _createPromiseRequest(req, events, timeout) {
        let _timeout = timeout;
        if (typeof _timeout === "undefined" || _timeout === null) {
            _timeout = this._options.timeout;
        }
        let defered = q.defer();
        let promise = defered.promise;
        let _req = req
            .set('x-apikey', this._options.apiKey)
            .timeout(_timeout);

        if (events) {
            for (let event in events) {
                _req = _req.on(event, events[event]);
            }
        }
        _req = _req.end(function (err, res) {
            if (err !== null) {
                let data;
                let status;
                if (typeof err.response !== "undefined") {
                    data = err.response.body;
                    status = err.status;
                } else {
                    data = err.message;
                    status = 408;
                }
                defered.reject({ statusCode: status, 'data': data });
            } else {
                defered.resolve(res);
            }
        });

        return promise;
    }
}