'use strict';

import urlencode from 'urlencode';
import q from 'q';
import _ from 'lodash';
import mime from 'mime-types';

import RequestSpec from './http/RequestSpec';
import { register as registerMock } from './http/mockRouter';
import logger from './logger';

/** What a rejection says when nothing better is known; never repeated in its `message`. */
const BROKEN = 'OGAPI: Something is broken. Please contact with your administrator.';

/**
 * Gives a rejection a readable `message` and `toString()`. Both are non-enumerable, so the object
 * serialises, spreads and compares exactly as before; but code written the usual way,
 * `.catch(e => show(e.message || e))`, no longer shows "[object Object]".
 *
 * It is still a plain object, not an Error: that change waits for a major version.
 * @param {object} rejection
 * @return {object} the same object.
 */
function readable(rejection) {
    const errors = rejection.data && Array.isArray(rejection.data.errors) ? rejection.data.errors : [];
    const first = errors[0] || {};
    let message;
    if (rejection.reason === 'invalid-path' || rejection.reason === 'read-only') {
        message = first.message;
    } else if (rejection.reason) {
        const why = rejection.cause && rejection.cause.message ? ': ' + rejection.cause.message : '';
        message = 'OGAPI: no response (' + rejection.reason + ')' + why;
    } else {
        const known = first.message === BROKEN ? '' : first.message;
        const detail = known || first.description || (typeof rejection.data === 'string' ? rejection.data : '');
        message = 'HTTP ' + rejection.statusCode + (detail ? ': ' + detail : '');
    }
    Object.defineProperty(rejection, 'message', { value: message, writable: true, configurable: true });
    Object.defineProperty(rejection, 'toString', { value: () => message, writable: true, configurable: true });
    return rejection;
}

/**
 * Encodes one query parameter value.
 *
 * Values used to be interpolated raw. A value carrying a space made Node reject the request
 * outright with ERR_UNESCAPED_CHARACTERS, so the request never left the process. Sequences that
 * are already valid percent-escapes are left alone, because pre-encoding was the only way callers
 * could work around that, and double-encoding them would break the callers who did.
 *
 * @param {*} value - the value to place on the right-hand side of the parameter.
 * @return {string} the value, safe to interpolate into a query string.
 */
function _encodeQueryValue(value) {
    return String(value)
        .split(/(%[0-9A-Fa-f]{2})/)
        .map(part => (/^%[0-9A-Fa-f]{2}$/.test(part) ? part : encodeURIComponent(part)))
        .join('');
}

/**
 * This is a JavaScript wrapper around a REST API client.
 */
export default class NorthAmpliaREST {
    /**
     * Constructor of the REST API client.
     * @param {{ url: string,port: string,version: string,apiKey: string,JTW: string}} _options - this is configuration about Opengate North API.
     * @param {function} backend - this is a backend selected to manage a request to Opengate North API.
     */
    constructor(_options, headers) {
        this._options = _.merge({}, this.default(), _options);
        this._headers = headers;
        if (!_.isEmpty(_options.mocks)) {
            this._applyMocks(_options.mocks);
        }
        // ---------------------------------- EXAMPLE
        /*
        mock.post(_options.url + '/north/v80/search/channels', function(req) {
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

        // mock.post(_options.url + '/north/v80/provision/organizations/:organization/software', function(req) {
        //     return {
        //         body: {
        //             "software": []
        //         },
        //         statusCode: 201
        //     };
        // });

        // mock.put(_options.url + '/north/v80/provision/organizations/:organization/software/:id', function(req) {
        //     return {
        //         body: {
        //             "software": []
        //         },
        //         statusCode: 200
        //     };
        // });

        // mock.del(_options.url + '/north/v80/provision//organizations/:organization/software/:id', function(req) {
        //     return {
        //         body: {
        //             "software": []
        //         },
        //         statusCode: 200
        //     };
        // });

        // mock.get(_options.url + '/north/v80/provision//organizations/:organization/software?visibility=administrable', function(req) {
        //     return {
        //         body: {
        //             "software": [{
        //                 "id": "00000-11111-22222-33333",
        //                 "name": "software name 1",
        //                 "type": "SOFTWARE",
        //                 "version": "0.000001",
        //                 "organization": req.params.organization,
        //                 "models": []
        //             },
        //             {
        //                 "id": "00000-11111-22222-44444",
        //                 "name": "software name 2",
        //                 "type": "FIRMWARE",
        //                 "version": "0.000002",
        //                 "organization": req.params.organization,
        //                 "models": []
        //             }]
        //         },
        //         statusCode: 200
        //     };
        // });
    }

    _applyMocks(mocks) {
        const methods = Object.keys(mocks).filter(method => !_.isEmpty(mocks[method]));
        methods.forEach(method => {
            logger.debug(`Mocking ${method.toLocaleUpperCase()} requests`);
            Object.keys(mocks[method]).forEach(url => {
                logger.debug('Mocking url:', url);
                const methodByUrl = mocks[method][url];
                registerMock(method, this._options.url + url, req => {
                    if (typeof methodByUrl === 'function') {
                        logger.debug('Mock handler returned a value');
                        return methodByUrl(req);
                    } else {
                        const data = mocks[method][url];
                        logger.debug('Mock returned data:', data);
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
    default() {
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
        const rejected = this._guard('GET', url, serviceBaseURL);
        if (rejected) return rejected;
        const _url = this._createUrl(url, parameters, serviceBaseURL);
        logger.info('GET', _url);
        var req = new RequestSpec('GET', _url);
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
        const rejected = this._guard('PATCH', url, serviceBaseURL);
        if (rejected) return rejected;
        const _url = this._createUrl(url, parameters, serviceBaseURL);
        logger.info('PATCH', _url);
        var req = new RequestSpec('PATCH', _url).send(data);

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
        const rejected = this._guard('POST', url, serviceBaseURL);
        if (rejected) return rejected;
        const _url = this._createUrl(url, parameters, serviceBaseURL);
        logger.info('POST', _url);
        var req = new RequestSpec('POST', _url).send(data);

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
        const rejected = this._guard('POST', url, serviceBaseURL);
        if (rejected) return rejected;
        const _url = this._createUrl(url, parameters, serviceBaseURL);
        logger.info('POST_MULTIPART', _url);
        let req = new RequestSpec('POST', _url);

        this._prepareMultipartForm(formData, req);

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
        const rejected = this._guard('PUT', url, serviceBaseURL);
        if (rejected) return rejected;
        const _url = this._createUrl(url, parameters, serviceBaseURL);
        logger.info('PUT', _url);
        var req = new RequestSpec('PUT', _url).send(data);

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
        const rejected = this._guard('PUT', url, serviceBaseURL);
        if (rejected) return rejected;
        const _url = this._createUrl(url, parameters, serviceBaseURL);
        logger.info('PUT_MULTIPART', _url);
        let req = new RequestSpec('PUT', _url);

        this._prepareMultipartForm(formData, req);

        return this._createPromiseRequest(req, events, timeout, headers);
    }

    _prepareMultipartForm(formData, req) {
        let sendFormData = true;

        const formDataKeys = Object.keys(formData);
        formDataKeys.forEach(key => {
            switch (key) {
                case 'meta':
                case 'json':
                case 'file':
                    req.field(key, formData[key]);
                    delete formData[key];
                    break;
                case 'metadata':
                    req.attach(key, formData[key]);
                    sendFormData = false;
                    break;
                case 'hardwareMedia':
                case 'certificate':
                case 'processorBulkFile':
                    req.attach('file', formData[key]);
                    sendFormData = false;
                    break;
                case 'files':
                    formData[key].forEach((item, index) => {
                        // Esto controla si viene de node (con path) o de web (sin path)
                        if (item.path) {
                            var fileName = item.path.replace(/^.*[\\\/]/, '');

                            var contentType = mime.lookup(fileName);
                            if (contentType) {
                                req.attach(key, item, { filename: fileName, contentType: contentType });
                            } else if (fileName.endsWith('.py')) {
                                req.attach(key, item, { filename: fileName, contentType: 'text/x-python' });
                            } else {
                                req.attach(key, item, { filename: fileName });
                            }
                        } else {
                            req.attach(key, item);
                        }
                    });

                    delete formData[key];
                    sendFormData = false;
                    break;
                case 'script':
                case 'modelFile':
                    req.field(key, formData[key]);
                    delete formData[key];
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
        const rejected = this._guard('DELETE', url, serviceBaseURL);
        if (rejected) return rejected;
        const _url = this._createUrl(url, parameters, serviceBaseURL);
        logger.info('DELETE', _url);
        var req;
        if (body) {
            req = new RequestSpec('DELETE', _url).send(body);
        } else {
            req = new RequestSpec('DELETE', _url);
        }
        return this._createPromiseRequest(req, null, timeout, headers);
    }

    _createUrl(relativeUrl, parameters, serviceBaseURL) {
        var encode = [];
        if (parameters) {
            var keys = Object.keys(parameters);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var queryParameter = encodeURIComponent(key) + '=' + _encodeQueryValue(parameters[key]);
                if (i === 0) {
                    relativeUrl = relativeUrl + '?' + queryParameter;
                } else {
                    relativeUrl = relativeUrl + '&' + queryParameter;
                }
            }
            // console.log(JSON.stringify(parameters));
        }

        // console.log(relativeUrl);

        var relativeUrlSplit = relativeUrl.split('/');
        var length = relativeUrlSplit.length;

        relativeUrlSplit.forEach(function (item, index) {
            if (index === length - 1 && item.indexOf('?') > 0) {
                var parameters = item.substring(item.indexOf('?'), item.length);
                var _item = item.substring(0, item.indexOf('?'));
                encode.push(urlencode(_item) + parameters);
            } else {
                encode.push(urlencode(item));
            }
        });

        return this._url(this._options) + '/' + this._getDefaultBaseURL(serviceBaseURL) + '/' + encode.join('/');
    }

    /**
     * POST for a search, which reads. The search layer calls this instead of `post` so that a
     * read-only client lets it through; the mark lasts only for the synchronous guard inside `post`.
     * @return {Promise}
     */
    _searchPost(url, data, timeout, headers, parameters, serviceBaseURL) {
        this._searchIntent = true;
        try {
            return this.post(url, data, timeout, headers, parameters, serviceBaseURL);
        } finally {
            this._searchIntent = false;
        }
    }

    /** @return {Promise|null} a rejection to return before sending, or null to go ahead. */
    _guard(method, url, serviceBaseURL) {
        return this._rejectDuplicatedBase(url, serviceBaseURL) || this._rejectWrite(method, url);
    }

    /**
     * With `readOnly`, everything but GET and search POSTs is refused before it leaves: the search
     * builders, and a free `post` to a `search/...` path. It guards against mistakes, not against
     * code that holds the client and means harm -- `_searchPost` and `fetch` are one call away. The
     * server, or a proxy in front of it, remains the boundary.
     * @return {Promise|null}
     */
    _rejectWrite(method, url) {
        if (!this._options.readOnly || method === 'GET') return null;
        const isSearch = this._searchIntent || (typeof url === 'string' && /^\/*search\//.test(url));
        if (method === 'POST' && isSearch) return null;

        const message = 'OGAPI: read-only client refused ' + method + ' ' + url;
        return q.reject(
            readable({
                statusCode: 403,
                data: { errors: [{ code: 403, message: message }] },
                reason: 'read-only',
                cause: new Error(message)
            })
        );
    }

    /**
     * The default base (`north/v80`, or `v80` on South) is prepended to every path, so a path that
     * repeats it, such as `/north/v80/provision/...`, used to reach `north/v80//north/v80/...` and
     * fail with a misleading error. Such a call never worked, so refusing it breaks nothing. A
     * caller-given `serviceBaseURL` is left alone: its paths are its own business.
     * @return {Promise|null} a rejection to return, or null when the path is fine.
     */
    _rejectDuplicatedBase(url, serviceBaseURL) {
        if (serviceBaseURL || typeof url !== 'string') return null;
        const base = this._getDefaultBaseURL();
        const firstSegment = base.split('/')[0];
        if (url.replace(/^\/+/, '').split('/')[0] !== firstSegment) return null;

        const message =
            'OGAPI: the path "' + url + '" already starts with "' + firstSegment + '/", but "' + base +
            '/" is prepended to every path. Pass the path relative to it, or give a serviceBaseURL.';
        return q.reject(
            readable({
                statusCode: 400,
                data: { errors: [{ code: 400, message: message }] },
                reason: 'invalid-path',
                cause: new Error(message)
            })
        );
    }

    _getDefaultBaseURL(serviceBaseURL) {
        if (!serviceBaseURL) {
            if (this._isSouth) {
                return 'v80';
            } else {
                return 'north/v80';
            }
        }

        return serviceBaseURL;
    }

    _createPromiseRequest(req, events, timeout, headers, asBlob) {
        let _timeout = timeout;
        if (typeof _timeout === 'undefined' || _timeout === null) {
            _timeout = this._options.timeout;
        }
        let defered = q.defer();
        let promise = defered.promise;
        let apiKey = this._options.apiKey;
        let JWT = this._options.jwt;
        let _req = _timeout === -1 ? req : req.timeout(_timeout);

        if (JWT && !this._isSouth) {
            _req = _req.set('Authorization', 'Bearer ' + JWT);
        } else if (apiKey) {
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
            for (let event in events) {
                _req = _req.on(event, events[event]);
            }
        }
        if (asBlob) {
            req.responseType('blob');
        }
        _req = _req.end(function (err, res) {
            if (err !== null) {
                logger.debug('OGAPI request failed', err);
                let data;
                let headers;
                let status = err.status ? err.status : undefined;
                let errorMessage = {
                    errors: [
                        {
                            code: status,
                            message: BROKEN
                        }
                    ]
                };

                if (typeof err.response !== 'undefined') {
                    data = err.response.body ? err.response.body : errorMessage;
                    headers = err.response.headers;
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
                const rejection = {
                    statusCode: status,
                    data: data,
                    headers: headers
                };
                // No response arrived. statusCode stays 500, which the web GUI handles as a generic
                // failure; reason and cause say what actually happened.
                if (typeof err.response === 'undefined') {
                    rejection.reason = err.reason || 'unknown';
                    rejection.cause = err;
                }
                defered.reject(readable(rejection));
            } else {
                defered.resolve(res);
            }
        });

        return promise;
    }
}
