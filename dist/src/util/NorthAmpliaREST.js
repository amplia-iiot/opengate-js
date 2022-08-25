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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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
        if (!_lodash2['default'].isEmpty(_options.mocks)) {
            this._applyMocks(_options.mocks);
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

    _createClass(NorthAmpliaREST, [{
        key: '_applyMocks',
        value: function _applyMocks(mocks) {
            var _this = this;

            var methods = Object.keys(mocks).filter(function (method) {
                return !_lodash2['default'].isEmpty(mocks[method]);
            });
            methods.forEach(function (method) {
                console.log('Mocking ' + method.toLocaleUpperCase() + ' requests');
                Object.keys(mocks[method]).forEach(function (url) {
                    console.log('Mocking url:', url);
                    var methodByUrl = mocks[method][url];
                    mock[method](_this._options.url + url, function (req) {
                        if (typeof methodByUrl === 'function') {
                            console.log('Function returned');
                            return methodByUrl(req);
                        } else {
                            var data = mocks[method][url];
                            console.log('Data returned:', data);
                            if (!data.headers) data.headers = {};
                            return data;
                        }
                    });
                });
            });
        }

        /**
         * This return a default configuration object
         * @return {object}
         */
    }, {
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
         * @param {boolean} asBlob - response body as Blob
         * @return {Promise} 
         */
    }, {
        key: 'get',
        value: function get(url, timeout, headers, parameters, asBlob, serviceBaseURL) {
            var _url = this._createUrl(url, parameters, serviceBaseURL);
            console.info('GET', _url);
            var req = _superagent2['default'].get(_url);
            return this._createPromiseRequest(req, null, timeout, headers, asBlob);
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
    }, {
        key: 'patch',
        value: function patch(url, data, timeout, headers, parameters, serviceBaseURL) {
            var _url = this._createUrl(url, parameters, serviceBaseURL);
            console.info('PATCH', _url);
            var req = _superagent2['default'].patch(_url).send(data);

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
        value: function post(url, data, timeout, headers, parameters, serviceBaseURL) {
            var _url = this._createUrl(url, parameters, serviceBaseURL);
            console.info('POST', _url);
            var req = _superagent2['default'].post(_url).send(data);

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
        value: function post_multipart(url, formData, events, timeout, headers, parameters, serviceBaseURL) {
            var _url = this._createUrl(url, parameters, serviceBaseURL);
            console.info('POST_MULTIPART', _url);
            var req = _superagent2['default'].post(_url);

            var sendFormData = true;
            var formDataKeys = Object.keys(formData);
            formDataKeys.forEach(function (key) {
                switch (key) {
                    case 'meta':
                    case 'json':
                    case 'file':
                        req.field(key, formData[key]);
                        delete formData[key];
                        break;
                    case 'certificate':
                    case 'processorBulkFile':
                        req.attach('file', formData.processorBulkFile);
                        sendFormData = false;
                        break;
                    case 'bulkFile':
                        req.set('Content-Type', formData.ext);
                        formData = formData.bulkFile;
                        break;
                    default:
                        break;
                }
            });
            if (sendFormData) req.send(formData);
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
        value: function put(url, data, timeout, headers, parameters, serviceBaseURL) {
            var _url = this._createUrl(url, parameters, serviceBaseURL);
            console.info('PUT', _url);
            var req = _superagent2['default'].put(_url).send(data);

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
         * @param {object} body - body of request
         * @param {string} serviceBaseURL - base of the uri petition
         * @return {Promise} 
         */
    }, {
        key: 'delete',
        value: function _delete(url, timeout, headers, parameters, body, serviceBaseURL) {
            var _url = this._createUrl(url, parameters, serviceBaseURL);
            console.info('DELETE', _url);
            var req;
            if (body) {
                req = _superagent2['default'].del(_url).send(body);
                //req = request('DELETE', url)
            } else {
                    req = _superagent2['default'].del(_url);
                }
            return this._createPromiseRequest(req, null, timeout, headers);
        }
    }, {
        key: '_createUrl',
        value: function _createUrl(relativeUrl, parameters, serviceBaseURL) {
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

            relativeUrlSplit.forEach(function (item, index) {
                if (index === length - 1 && item.indexOf("?") > 0) {
                    var parameters = item.substring(item.indexOf("?"), item.length);
                    var _item = item.substring(0, item.indexOf("?"));
                    encode.push((0, _urlencode2['default'])(_item) + parameters);
                } else {
                    encode.push((0, _urlencode2['default'])(item));
                }
            });

            return this._url(this._options) + "/" + this._getDefaultBaseURL(serviceBaseURL) + '/' + encode.join("/");
        }
    }, {
        key: '_getDefaultBaseURL',
        value: function _getDefaultBaseURL(serviceBaseURL) {
            if (!serviceBaseURL) {
                if (this._isSouth) {
                    return 'v80';
                } else {
                    return 'north/v80';
                }
            }

            return serviceBaseURL;
        }
    }, {
        key: '_createPromiseRequest',
        value: function _createPromiseRequest(req, events, timeout, headers, asBlob) {
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
            if (asBlob) {
                req.responseType('blob');
            }
            _req = _req.end(function (err, res) {
                if (err !== null) {
                    console.error("OGAPI ERROR: ");
                    console.error(err);
                    var data = undefined;
                    var _status = err.status ? err.status : undefined;
                    var errorMessage = {
                        errors: [{
                            code: _status,
                            message: 'OGAPI: Something is broken. Please contact with your administrator.'
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
