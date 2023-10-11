'use strict';

import merge from 'merge';
import urlencode from 'urlencode';
import request, { mkcol } from 'superagent';
import q from 'q';
import _ from 'lodash'
import mime from 'mime-types'

//  MOCK user searching
import _mock from 'superagent-mocker';
const mock = _mock(request);
//

/**
 * This is a wrapper of a Rest api javascript
 */
export default class NorthAmpliaREST {
    /**
     * @param {{ url: string,port: string,version: string,apiKey: string,JTW: string}} _options - this is configuration about Opengate North API.
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
    }

    _applyMocks (mocks) {
        const methods = Object.keys(mocks).filter((method) => !_.isEmpty(mocks[method]))
        methods.forEach(method => {
            console.log(`Mocking ${method.toLocaleUpperCase()} requests`);
            Object.keys(mocks[method]).forEach(url => {
                console.log('Mocking url:', url);
                const methodByUrl = mocks[method][url]
                mock[method](this._options.url + url, (req) => {
                    if(typeof methodByUrl  === 'function'){
                        console.log('Function returned')
                        return methodByUrl(req)
                    } else{
                        const data = mocks[method][url]
                        console.log('Data returned:', data)
                        if (!data.headers) data.headers = {}
                        return data
                    }
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
     * @param {boolean} asBlob - response body as Blob
     * @param {string} serviceBaseURL - base of the uri petition
     * @return {Promise} 
     */
    get(url, timeout, headers, parameters, asBlob, serviceBaseURL) {
        const _url = this._createUrl(url, parameters, serviceBaseURL)
        console.info('GET', _url)
        var req = request.get(_url);
        return this._createPromiseRequest(req, null, timeout, headers, asBlob);
    }

    /**
     * Invoke PATCH action to url and data specified
     * @param {!string} url - url to execute PATCH
     * @param {object} data - attach data to request PATCH
     * @param {number} timeout - timeout in milliseconds
     * @param {object} headers - headers of request
     * @param {object} parameters - parameters of request
     * @param {string} serviceBaseURL - base of the uri petition
     * @return {Promise} 
     */
    patch(url, data, timeout, headers, parameters, serviceBaseURL) {
        const _url = this._createUrl(url, parameters, serviceBaseURL)
        console.info('PATCH', _url)
        var req = request.patch(_url)
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
     * @param {string} serviceBaseURL - base of the uri petition
     * @return {Promise} 
     */
    post(url, data, timeout, headers, parameters, serviceBaseURL) {
        const _url = this._createUrl(url, parameters, serviceBaseURL)
        console.info('POST', _url)
        var req = request.post(_url)
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
     * @param {string} serviceBaseURL - base of the uri petition
     * @return {Promise} 
     */
    post_multipart(url, formData, events, timeout, headers, parameters, serviceBaseURL) {
        const _url = this._createUrl(url, parameters, serviceBaseURL)
        console.info('POST_MULTIPART', _url)
        let req = request.post(_url);

        let sendFormData = true

        // Esta parte es sólo para cuando viene de tests o node
        const formDataKeys = Object.keys(formData)
        formDataKeys.forEach(key => {
            switch (key) {
                case 'meta':
                case 'json':
                case 'file':
                    req.field(key, formData[key]);    
                    delete formData[key]
                    break
                case 'hardwareMedia': 
                case 'certificate': 
                case 'processorBulkFile':
                    req.attach('file', formData[key]);
                    sendFormData = false
                    break
                case 'files':
                    formData[key].forEach((item, index) => {
                        // Esto controla si viene de node (con path) o de web (sin path)
                        if (item.path) {
                            var fileName = item.path.replace(/^.*[\\\/]/, '')

                            var contentType = mime.lookup(fileName);
                            if (contentType) {
                                req.attach(key, item, {filename: fileName, contentType: contentType});    
                            } else if (fileName.endsWith('.py')) {
                                req.attach(key, item, {filename: fileName, contentType: 'text/x-python'});    
                            } else {
                                req.attach(key, item, {filename: fileName});    
                            }    
                        } else {
                            req.attach(key, item);
                        }
                    })
                    
                    delete formData[key]
                    sendFormData = false
                    break
                case 'modelFile':
                    req.field(key, formData[key]);
                    delete formData[key]
                    sendFormData = false
                    break
                case 'bulkFile':
                    req.set('Content-Type', formData.ext);
                    formData = formData.bulkFile;
                    break
                default:
                    break;
            }
        })
        if(sendFormData)
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
     * @param {string} serviceBaseURL - base of the uri petition
     * @return {Promise} 
     */
    put(url, data, timeout, headers, parameters, serviceBaseURL) {
        const _url = this._createUrl(url, parameters, serviceBaseURL)
        console.info('PUT', _url)
        var req = request.put(_url).send(data);

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
     * Invoke put multipart action to url and data specified
     * @param {!string} url - url to execute POST
     * @param {FormData} formData - attach data to request POST
     * @param {object} events - events allowed, xhr.process 
     * @param {number} timeout - timeout in milliseconds       
     * @param {object} headers - headers of request
     * @param {object} parameters - parameters of request
     * @param {string} serviceBaseURL - base of the uri petition
     * @return {Promise} 
     */
    put_multipart(url, formData, events, timeout, headers, parameters, serviceBaseURL) {
        const _url = this._createUrl(url, parameters, serviceBaseURL)
        console.info('PUT_MULTIPART', _url)
        let req = request.put(_url);

        let sendFormData = true

        // Esta parte es sólo para cuando viene de tests o node
        const formDataKeys = Object.keys(formData)
        formDataKeys.forEach(key => {
            switch (key) {
                case 'meta':
                case 'json':
                case 'file':
                    req.field(key, formData[key]);    
                    delete formData[key]
                    break
                case 'hardwareMedia': 
                case 'certificate': 
                case 'processorBulkFile':
                    req.attach('file', formData[key]);
                    sendFormData = false
                    break
                case 'files':
                    formData[key].forEach((item, index) => {
                        console.log(item.name)
                        req.attach(key, item);
                    })
                   
                    delete formData[key]
                    sendFormData = false
                    break
                case 'modelFile':
                    req.field(key, formData[key]);
                    delete formData[key]
                    sendFormData = false
                    break
                case 'bulkFile':
                    req.set('Content-Type', formData.ext);
                    formData = formData.bulkFile;
                    break
                default:
                    break;
            }
        })
        if(sendFormData)
            req.send(formData);
        return this._createPromiseRequest(req, events, timeout, headers);
    }
    /**
     * Invoke DELETE action to url specified
     * @param {!string} url - url to execute DELETE
     * @param {number} timeout - timeout in milliseconds    
     * @param {object} headers - headers of request
     * @param {object} parameters - parameters of request
     * @param {object} body - body of request
     * @param {string} serviceBaseURL - base of the uri petition
     * @return {Promise} 
     */
    delete(url, timeout, headers, parameters, body, serviceBaseURL) {
        const _url = this._createUrl(url, parameters, serviceBaseURL)
        console.info('DELETE', _url)
        var req
        if(body){
            req = request.del(_url).send(body);
            //req = request('DELETE', url)
        }else{
            req = request.del(_url);
        }
        return this._createPromiseRequest(req, null, timeout, headers);
    }

    _createUrl(relativeUrl, parameters, serviceBaseURL) {
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
            // console.log(JSON.stringify(parameters));
        }

        // console.log(relativeUrl);

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

        return this._url(this._options) +  "/" + this._getDefaultBaseURL(serviceBaseURL) + '/' + encode.join("/");
    }

    _getDefaultBaseURL(serviceBaseURL) {
        if (!serviceBaseURL) {
            if (this._isSouth) {
                return 'v80'
            } else {
                return 'north/v80'
            }
        } 

        return serviceBaseURL
    }

    _createPromiseRequest(req, events, timeout, headers, asBlob) {
        let _timeout = timeout;
        if (typeof _timeout === "undefined" || _timeout === null) {
            _timeout = this._options.timeout;
        }
        let defered = q.defer();
        let promise = defered.promise;
        let apiKey = this._options.apiKey;
        let JWT = this._options.jwt;
        let _req = _timeout === -1 ? req : req.timeout(_timeout);
        
        if(JWT && !this._isSouth) {
            _req = _req.set('Authorization', 'Bearer ' + JWT);
        }
        else if(apiKey) {
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
        if(asBlob){
            req.responseType('blob')
        }
        _req = _req.end(function(err, res) {
            if (err !== null) {
                console.error("OGAPI ERROR: ")
                console.error(err)
                let data;
                let headers;
                let status = err.status ? err.status : undefined;
                let errorMessage = {
                    errors: [{
                        code: status,
                        message: 'OGAPI: Something is broken. Please contact with your administrator.'
                    }]
                };
                
                if (typeof err.response !== "undefined") {
                    data = err.response.body ? err.response.body : errorMessage;
                    headers = err.response.headers
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
                    'data': data,
                    headers: headers
                });
            } else {
                
                defered.resolve(res);
            }
        });

        return promise;
    }
}