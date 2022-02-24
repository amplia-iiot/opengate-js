'use strict';

import merge from 'merge';
import urlencode from 'urlencode';
import request, { mkcol } from 'superagent';
import q from 'q';
import _ from 'lodash'
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
        if (!_.isEmpty(_options.mocks)) {
            this._applyMocks(_options.mocks)
        }

        // ---------------------------------- EXAMPLE
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
      /*mock.post(_options.url + '/datasets/provision/organizations/:organization/:dataset/data', function(req){
        return {
            body: {
                "page": {
                  "number": 26
                },
                "columns": [
                  "Coll Mobile ICC value",
                  "Coll Mobile ICC date",
                  "Prov Identifier",
                  "Coll manufacturer"
                ],
                "data": [
                  [
                    "icc1",
                    "2021-04-06T12:35:22.784Z",
                    "MyDevice1",
                    "OpenGate"
                  ],
                  [
                    "icc2",
                    "2021-04-06T07:45:57.468Z",
                    "MyDevice2",
                    "OpenGate"
                  ]
                ]
              },
              statusCode: 200
        };
      });
        mock.get(_options.url + '/datasets/provision/organizations/:organization', function(req) {
            return {
                body: {
                    datasets: [
                       {
                           name: 'dataset1',
                           identifier: '111',
                           description: 'mock',
                           type: 'CURRENT'
                       },
                       {
                        name: 'dataset2',
                        identifier: '2222',
                        description: 'mock',
                        type: 'HISTORY'
                        }
                    ]
                },
                statusCode: 200
            };
        });        
        mock.get(_options.url + '/datasets/provision/organizations/:organization/:dataset', function(req) {
            return {
                body: 
                {
                    "name": "dataset_name",
                    "description": "My dataset to get inventory data",
                    "type": "CURRENT",
                    "columns": [
                        {
                            "path": "provision.device.identifier._current.value",
                            "name": "Prov identifier",
                            "filter": "YES",
                            "sort": true
                          },
                          {
                            "path": "device.model._current.value.manufacturer",
                            "name": "Coll manufacturer",
                            "filter": "ALWAYS",
                            "sort": false
                          },
                          {
                            "path": "device.communicationModules[0].subscriber.mobile.icc._current.value",
                            "name": "Coll Mobile ICC value",
                            "filter": "NO",
                            "sort": false
                          },
                          {
                            "path": "device.communicationModules[0].subscriber.mobile.icc._current.at",
                            "name": "Coll Mobile ICC date",
                            "filter": "YES",
                            "sort": false
                          }
                    ]
                  },
                statusCode: 200
             };
        });        
        */

        mock.get(_options.url + '/connectorfunctions/provision/organizations/:organization/channels/:channel', function(req) {
            return {
                body: {
                    connectorFunctions: [
                        {
                            "northCriterias": [
                              {
                                "path": "provision.device.model._current.value.manufacturer",
                                "value": "Siemens"
                              },
                              {
                                "path": "provision.device.model._current.value.name",
                                "value": "Logo"
                              },
                              {
                                "path": "device.powersupply.battery.charge._current.value",
                                "value": 56
                              },
                              {
                                "path": "device.communicationModules[0].name._current.value",
                                "value": "prueba de corchetes"
                              }
                            ],
                            "javascript": "var myPayloadasJson = JSON.parse(message);",
                            "operationName": "ADMINISTRATIVE_STATUS_CHANGE",
                            "type": "REQUEST",
                            "description": "Request test CF",
                            "name": "Connector function 1",
                            "identifier": "1234-1234-1234-1234",
                            "operationalStatus": "PRODUCTION"
                        },
                        {
                            "southCriterias": ['http://url.valida.com?asdfasdf=true', 'mqtt://otra/queesvalida'],
                            "javascript": "var myPayloadasJson = JSON.parse(message);",
                            "type": "RESPONSE",
                            "operationName": "ADMINISTRATIVE_STATUS_CHANGE",
                            "description": "Request test CF",
                            "name": "Connector function 2",
                            "identifier": "4321-4321",
                            "operationalStatus": "TEST"
                        },
                        {
                            "southCriterias": ['http://url.valida.com?asdfasdf=true', 'mqtt://otra/queesvalida'],
                            "javascript": "var myPayloadasJson = JSON.parse(message);",
                            "type": "COLLECTION",
                            "description": "Request test CF COLLECTION",
                            "name": "Connector function 3",
                            "identifier": "666666666-66666",
                            "operationalStatus": "DISABLED"
                        }
                    ]
                },
                statusCode: 200
            };
        });  
    }

    _applyMocks (mocks) {
        const methods = Object.keys(mocks).filter((method) => !_.isEmpty(mocks[method]))
        methods.forEach(method => {
            console.log(`Mocking ${method.toLocaleUpperCase()} requests`);
            Object.keys(mocks[method]).forEach(url => {
                console.log('Mocking url:', url);
                console.log('Data returned:', mocks[method][url])
                mock[method](this._options.url + url, () => {
                    const data = mocks[method][url]
                    if (!data.headers) data.headers = {}
                    return data
                });
            })
        })
    }

    /**
     * This return a default configuration object
     * @return {object}
     */
    default () {
        return {
            timeout: 5000
        };
    }

    _url(options) {
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
    get(url, timeout, headers, parameters) {
        var req = request.get(this._createUrl(url, parameters));
        return this._createPromiseRequest(req, null, timeout, headers);
    }

    /**
     * Invoke PATCH action to url and data specified
     * @param {!string} url - url to execute PATCH
     * @param {object} data - attach data to request PATCH
     * @param {number} timeout - timeout in milliseconds
     * @param {object} headers - headers of request
     * @param {object} parameters - parameters of request
     * @return {Promise} 
     */
    patch(url, data, timeout, headers, parameters) {
        var req = request.patch(this._createUrl(url, parameters))
            .send(data);

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
    post(url, data, timeout, headers, parameters) {
        var req = request.post(this._createUrl(url, parameters))
            .send(data);

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
    post_multipart(url, formData, events, timeout, headers, parameters) {
        let req = request.post(this._createUrl(url, parameters));

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
    put(url, data, timeout, headers, parameters) {
        var req = request.put(this._createUrl(url, parameters))
            .send(data);

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
    delete(url, timeout, headers, parameters) {
        var req = request.delete(this._createUrl(url, parameters));
        return this._createPromiseRequest(req, null, timeout, headers);
    }

    _createUrl(relativeUrl, parameters) {
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

        relativeUrlSplit.forEach(function(item, index) {
            if (index === (length - 1) && item.indexOf("?") > 0) {
                var parameters = item.substring(item.indexOf("?"), item.length);
                var _item = item.substring(0, item.indexOf("?"));
                encode.push(urlencode(_item) + parameters);
            } else {
                encode.push(urlencode(item));
            }
        });
        var returnUrl = this._url(this._options) + "/" + encode.join("/");
        return returnUrl;
    }

    _createPromiseRequest(req, events, timeout, headers) {
        let _timeout = timeout;
        if (typeof _timeout === "undefined" || _timeout === null) {
            _timeout = this._options.timeout;
        }
        let defered = q.defer();
        let promise = defered.promise;
        let apiKey = this._options.apiKey;
        let _req = _timeout === -1 ? req : req.timeout(_timeout);

        if (apiKey) {
            _req = _req.set('X-ApiKey', this._options.apiKey);
        }

        if (headers) {
            var keys = Object.keys(headers);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (headers[key] !== undefined)
                    _req = _req.set(key, headers[key]);
            }
        }

        if (events) {
            for (let event in events) {
                _req = _req.on(event, events[event]);
            }
        }
        _req = _req.end(function(err, res) {
            if (err !== null) {
                let data;
                let status = err.status ? err.status : undefined;
                let errorMessage = {
                    errors: [{
                        code: status,
                        message: 'OGAPI: Something is broken. Please contact with your administrator.'
                    }]
                };
                
                if (typeof err.response !== "undefined") {
                    data = err.response.body ? err.response.body : errorMessage;
                    status = err.status;
                } else {
                    if (!status) {
                        data = errorMessage;
                        status = 500;
                    } else {
                        data = err.message;
                        status = 408;
                    }
                }
                defered.reject({
                    statusCode: status,
                    'data': data
                });
            } else {
                defered.resolve(res);
            }
        });

        return promise;
    }
}