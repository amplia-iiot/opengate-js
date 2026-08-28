'use strict';

import { buildResponse, headersToObject, parseRawHeaders, toError } from './response';
import { buildFormData, packFormData } from './multipart';
import { match as matchMock, respond as respondMock } from './mockRouter';

/**
 * A request builder with superagent's shape, running on fetch.
 *
 * It exists so the migration off superagent does not become a rewrite of everything that used it.
 * `NorthAmpliaREST._createPromiseRequest` and `_prepareMultipartForm` drive a request through
 * `.set()`, `.send()`, `.field()`, `.attach()`, `.timeout()`, `.on()`, `.responseType()` and
 * `.end()`; keeping those methods means those two functions did not change, and anything that
 * subclassed or overrode them keeps working.
 *
 * **It also has to be complete, not merely sufficient.** `hooks.beforeStart` hands this object to
 * application code, and the OpenGate web GUI is built on this library and ships to production
 * regularly. So the whole public surface of superagent's browser `Request` is reproduced here, not
 * just the parts this library happens to call. The methods fall into three groups, and which group
 * a method is in is stated on the method itself:
 *
 *   1. Honoured for real: set, unset, get, getHeader, type, accept, auth, query, send, field,
 *      attach, timeout, clearTimeout, abort, on, off, ok, serialize, parse, responseType,
 *      withCredentials, use, toJSON, end.
 *   2. Chainable and inert, because they were already inert in a browser -- which is where the GUI
 *      runs -- or because they configure a Node transport that no longer exists: agent, buffer, ca,
 *      maxResponseSize, redirects, retry, sortQuery.
 *   3. Deliberately absent: pipe, write, then, callback, crossDomainError. These stream or resolve a
 *      request, and a silent no-op would be worse than a loud failure. Nothing in the library calls
 *      them and they are meaningless on a request that has not been sent.
 *
 * Where fetch cannot do the job, it steps aside:
 *
 *   - **Upload progress.** fetch reports none, in any browser. `withProgressEvent` is public API on
 *     `ManufacturerMedia`, `ModelMedia` and `DeploymentElement`, so dropping it would quietly
 *     break progress bars on firmware and media uploads. In a browser the request goes over
 *     XMLHttpRequest, which does report it. In Node the body is streamed through a counter, which
 *     reports it for real rather than faking one event at the end.
 */

let beforeStart;

/**
 * Registers the `hooks.beforeStart` callback. Module-level, as the superagent monkey-patch it
 * replaces was: one callback for the whole process, last registration wins.
 * @param {?function} callback - called with the request just before it leaves.
 */
export function setBeforeStart(callback) {
    beforeStart = callback;
}

/** superagent's own shorthand map, so `.type('json')` keeps meaning what it meant. */
const TYPES = {
    html: 'text/html',
    json: 'application/json',
    xml: 'text/xml',
    urlencoded: 'application/x-www-form-urlencoded',
    form: 'application/x-www-form-urlencoded',
    'form-data': 'application/x-www-form-urlencoded'
};

function _isObject(value) {
    return value !== null && typeof value === 'object';
}

function _isBlobLike(value) {
    return !!value && typeof value.stream === 'function' && typeof value.size === 'number';
}

/** superagent's `_isHost`: a body the transport must pass through untouched. */
function _isRawBody(value) {
    if (!value) return false;
    if (typeof FormData !== 'undefined' && value instanceof FormData) return true;
    if (typeof URLSearchParams !== 'undefined' && value instanceof URLSearchParams) return true;
    if (typeof ArrayBuffer !== 'undefined' && (value instanceof ArrayBuffer || ArrayBuffer.isView(value))) return true;
    return _isBlobLike(value);
}

function _base64(string) {
    if (typeof btoa === 'function') return btoa(string);
    if (typeof Buffer !== 'undefined') return Buffer.from(string).toString('base64');
    throw new Error('Cannot use basic auth, btoa is not a function');
}

/**
 * Streams a Blob while reporting how much of it has gone out. Only used in Node: streaming a
 * request body needs `duplex: 'half'`, which browsers support unevenly, and there XHR does better.
 * @param {!Blob} blob - the body.
 * @param {!function} onProgress - receives superagent's progress event shape.
 * @return {ReadableStream}
 */
function _countingStream(blob, onProgress) {
    const total = blob.size;
    let loaded = 0;
    const reader = blob.stream().getReader();
    return new ReadableStream({
        async pull(controller) {
            const { done, value } = await reader.read();
            if (done) {
                controller.close();
                return;
            }
            loaded += value.byteLength;
            onProgress({ direction: 'upload', loaded: loaded, total: total, percent: total ? (loaded * 100) / total : 0 });
            controller.enqueue(value);
        },
        cancel(reason) {
            return reader.cancel(reason);
        }
    });
}

export default class RequestSpec {
    /**
     * @param {!string} method - the HTTP verb.
     * @param {!string} url - the whole URL, query string included.
     */
    constructor(method, url) {
        this.method = String(method).toUpperCase();
        this.url = url;
        // Two views of the outgoing headers, as superagent kept: `header` in the case the caller
        // used, `_header` lower-cased for lookups. They are the same data, and `headers` is an
        // alias of `header` so both names read alike.
        this.header = {};
        this.headers = this.header;
        this._header = {};
        this.aborted = false;
        this._data = undefined;
        this._parts = [];
        this._timeout = 0;
        this._responseTimeout = 0;
        this._listeners = {};
        this._responseType = undefined;
        this._withCredentials = false;
        this._serializer = undefined;
        this._parser = undefined;
        this._okCallback = undefined;
        this._controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        this._xhr = null;
        this._deadlineTimer = null;
        this._responseTimer = null;
        this.timedout = false;
    }

    // ---------------------------------------------------------------- headers

    /**
     * Sets one header, or every header in an object.
     * @param {!(string|object)} field
     * @param {*} value
     * @return {RequestSpec} itself, for chaining.
     */
    set(field, value) {
        if (_isObject(field)) {
            Object.keys(field).forEach(name => this.set(name, field[name]));
            return this;
        }
        this._header[String(field).toLowerCase()] = value;
        this.header[field] = value;
        return this;
    }

    /**
     * Removes a header, whatever case it was set in.
     * @param {!string} field
     * @return {RequestSpec}
     */
    unset(field) {
        const lower = String(field).toLowerCase();
        delete this._header[lower];
        Object.keys(this.header)
            .filter(name => name.toLowerCase() === lower)
            .forEach(name => delete this.header[name]);
        return this;
    }

    /**
     * Reads a header back, case-insensitively.
     * @param {!string} field
     * @return {*}
     */
    get(field) {
        return this._header[String(field).toLowerCase()];
    }

    /**
     * superagent's alias for `get`.
     * @param {!string} field
     * @return {*}
     */
    getHeader(field) {
        return this.get(field);
    }

    /**
     * Sets Content-Type, accepting superagent's shorthands (`json`, `form`, …).
     * @param {!string} type
     * @return {RequestSpec}
     */
    type(type) {
        return this.set('Content-Type', TYPES[type] || type);
    }

    /**
     * Sets Accept, accepting the same shorthands.
     * @param {!string} type
     * @return {RequestSpec}
     */
    accept(type) {
        return this.set('Accept', TYPES[type] || type);
    }

    /**
     * Sets an Authorization header. Basic by default, as in a browser; `{ type: 'bearer' }` sends
     * the first argument as a token.
     * @param {!string} user
     * @param {(string|object)=} pass
     * @param {object=} options
     * @return {RequestSpec}
     */
    auth(user, pass, options) {
        let password = pass;
        let opts = options;
        if (arguments.length === 1) password = '';
        if (_isObject(password)) {
            opts = password;
            password = '';
        }
        if (!opts) opts = { type: 'basic' };

        if (opts.type === 'bearer') return this.set('Authorization', 'Bearer ' + user);
        return this.set('Authorization', 'Basic ' + _base64(user + ':' + password));
    }

    // ---------------------------------------------------------------- the url

    /**
     * Appends to the query string. Takes an object or an already-encoded string.
     * @param {!(string|object)} value
     * @return {RequestSpec}
     */
    query(value) {
        let encoded;
        if (typeof value === 'string') {
            encoded = value.replace(/^[?&]/, '');
        } else if (_isObject(value)) {
            encoded = Object.keys(value)
                .filter(key => value[key] !== undefined && value[key] !== null)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(value[key]))
                .join('&');
        }
        if (encoded) this.url += (this.url.indexOf('?') === -1 ? '?' : '&') + encoded;
        return this;
    }

    // ---------------------------------------------------------------- the body

    /**
     * Attaches a body, and picks the Content-Type the way superagent did -- at this point, not at
     * send time, so a `hooks.beforeStart` callback reading `get('Content-Type')` sees what it
     * always saw. Repeated calls merge.
     * @param {*} data
     * @return {RequestSpec}
     */
    send(data) {
        const isObj = _isObject(data) && !_isRawBody(data);
        const existing = this._header['content-type'];

        if (isObj && _isObject(this._data) && !_isRawBody(this._data)) {
            Object.keys(data).forEach(key => {
                this._data[key] = data[key];
            });
        } else if (typeof data === 'string') {
            if (!existing) this.type('form');
            if (this._header['content-type'] === 'application/x-www-form-urlencoded') {
                this._data = this._data ? this._data + '&' + data : data;
            } else {
                this._data = (this._data || '') + data;
            }
        } else if (isObj) {
            this._data = Array.isArray(data) ? data.slice() : Object.assign({}, data);
        } else {
            this._data = data;
        }

        if (isObj && !this._header['content-type']) this.type('json');
        return this;
    }

    /**
     * Replaces the serializer used for an object body.
     * @param {!function} fn - receives the body, returns a string.
     * @return {RequestSpec}
     */
    serialize(fn) {
        this._serializer = fn;
        return this;
    }

    /**
     * Replaces the parser used on the response body.
     * @param {!function} fn - receives the response text, returns the body.
     * @return {RequestSpec}
     */
    parse(fn) {
        this._parser = fn;
        return this;
    }

    /**
     * Adds a plain multipart field.
     * @param {!string} name
     * @param {*} value
     * @return {RequestSpec}
     */
    field(name, value) {
        if (Array.isArray(value)) {
            value.forEach(item => this.field(name, item));
            return this;
        }
        this._parts.push({ kind: 'field', name: name, value: value });
        return this;
    }

    /**
     * Adds a multipart file. A string is a path, as it was under superagent.
     * @param {!string} name
     * @param {*} file
     * @param {(string|object)=} options - `{ filename, contentType }`, or just a filename.
     * @return {RequestSpec}
     */
    attach(name, file, options) {
        if (file) this._parts.push({ kind: 'attach', name: name, value: file, options: options });
        return this;
    }

    // ---------------------------------------------------------------- control

    /**
     * Sets the deadline for the whole request, or `{ deadline, response }` for both that and the
     * time allowed before a response starts arriving.
     * @param {!(number|object)} options
     * @return {RequestSpec}
     */
    timeout(options) {
        if (!_isObject(options)) {
            this._timeout = options;
            this._responseTimeout = 0;
            return this;
        }
        if ('deadline' in options) this._timeout = options.deadline;
        if ('response' in options) this._responseTimeout = options.response;
        return this;
    }

    /**
     * Cancels the timers without cancelling the request.
     * @return {RequestSpec}
     */
    clearTimeout() {
        if (this._deadlineTimer) clearTimeout(this._deadlineTimer);
        if (this._responseTimer) clearTimeout(this._responseTimer);
        this._deadlineTimer = null;
        this._responseTimer = null;
        return this;
    }

    /**
     * Cancels the request. Works before `end()` too, in which case it never leaves.
     * @return {RequestSpec}
     */
    abort() {
        if (this.aborted) return this;
        this.aborted = true;
        this.clearTimeout();
        if (this._xhr) this._xhr.abort();
        else if (this._controller) this._controller.abort(new Error('Request aborted'));
        this.emit('abort');
        return this;
    }

    // ------------------------------------------------------------- events
    //
    // A real emitter, not a single-callback shim. superagent's request was an EventEmitter in Node
    // and a component-emitter in the browser, and a caller reaching it through `hooks.beforeStart`
    // may use any of that surface. `progress`, `abort`, `response`, `error` and `end` are emitted
    // here; anything else is stored and only fires if something emits it.
    //
    // One deliberate difference: emitting `error` with no listener never throws, which is what the
    // browser build did. Node's EventEmitter would have thrown, and turning a failed request into an
    // uncaught exception is not a behaviour worth reproducing.

    /**
     * @param {!string} event
     * @param {!function} callback
     * @return {RequestSpec}
     */
    on(event, callback) {
        (this._listeners[event] = this._listeners[event] || []).push({ fn: callback, once: false });
        return this;
    }

    /**
     * @param {!string} event
     * @param {!function} callback
     * @return {RequestSpec}
     */
    once(event, callback) {
        (this._listeners[event] = this._listeners[event] || []).push({ fn: callback, once: true });
        return this;
    }

    /**
     * superagent's alias for `on`.
     * @param {!string} event
     * @param {!function} callback
     * @return {RequestSpec}
     */
    addListener(event, callback) {
        return this.on(event, callback);
    }

    /**
     * @param {!string} event
     * @param {!function} callback
     * @return {RequestSpec}
     */
    prependListener(event, callback) {
        (this._listeners[event] = this._listeners[event] || []).unshift({ fn: callback, once: false });
        return this;
    }

    /**
     * @param {!string} event
     * @param {!function} callback
     * @return {RequestSpec}
     */
    prependOnceListener(event, callback) {
        (this._listeners[event] = this._listeners[event] || []).unshift({ fn: callback, once: true });
        return this;
    }

    /**
     * Removes one listener, or every listener for the event when no function is given -- which is
     * what component-emitter's `off(event)` did.
     * @param {!string} event
     * @param {function=} callback
     * @return {RequestSpec}
     */
    off(event, callback) {
        if (!this._listeners[event]) return this;
        if (!callback) delete this._listeners[event];
        else this._listeners[event] = this._listeners[event].filter(entry => entry.fn !== callback);
        return this;
    }

    /**
     * superagent's alias for `off`.
     * @param {!string} event
     * @param {function=} callback
     * @return {RequestSpec}
     */
    removeListener(event, callback) {
        return this.off(event, callback);
    }

    /**
     * @param {string=} event - every event when omitted.
     * @return {RequestSpec}
     */
    removeAllListeners(event) {
        if (event === undefined) this._listeners = {};
        else delete this._listeners[event];
        return this;
    }

    /**
     * @param {!string} event
     * @param {...*} args
     * @return {boolean} whether anything was listening.
     */
    emit(event) {
        const entries = this._listeners[event];
        if (!entries || !entries.length) return false;
        const args = Array.prototype.slice.call(arguments, 1);
        this._listeners[event] = entries.filter(entry => !entry.once);
        entries.forEach(entry => entry.fn.apply(this, args));
        return true;
    }

    /**
     * @param {!string} event
     * @return {Array<function>}
     */
    listeners(event) {
        return (this._listeners[event] || []).map(entry => entry.fn);
    }

    /**
     * superagent's alias for `listeners`.
     * @param {!string} event
     * @return {Array<function>}
     */
    rawListeners(event) {
        return this.listeners(event);
    }

    /**
     * @param {!string} event
     * @return {number}
     */
    listenerCount(event) {
        return this.listeners(event).length;
    }

    /**
     * @return {Array<string>} the events with at least one listener.
     */
    eventNames() {
        return Object.keys(this._listeners).filter(event => this._listeners[event].length);
    }

    /** Inert: there is no listener ceiling to raise. @return {RequestSpec} */
    setMaxListeners() {
        return this;
    }

    /** Inert, for symmetry with setMaxListeners. @return {number} */
    getMaxListeners() {
        return Infinity;
    }

    /**
     * Overrides what counts as a successful response.
     * @param {!function} fn - receives the response, returns whether to resolve.
     * @return {RequestSpec}
     */
    ok(fn) {
        if (typeof fn !== 'function') throw new Error('ok() requires a function');
        this._okCallback = fn;
        return this;
    }

    /**
     * Sends cookies and HTTP auth on cross-origin requests.
     * @param {boolean=} on - defaults to true, as superagent's did.
     * @return {RequestSpec}
     */
    withCredentials(on) {
        this._withCredentials = on === undefined ? true : !!on;
        return this;
    }

    /**
     * @param {!string} type - `blob` is the only value the library uses.
     * @return {RequestSpec}
     */
    responseType(type) {
        this._responseType = type;
        return this;
    }

    /**
     * Applies a plugin, superagent's extension point.
     * @param {!function} fn - receives this request.
     * @return {RequestSpec}
     */
    use(fn) {
        fn(this);
        return this;
    }

    /**
     * @return {object} the request as data, as superagent's `toJSON` did.
     */
    toJSON() {
        return { method: this.method, url: this.url, data: this._data, headers: this._header };
    }

    // -------------------------------------------------- chainable and inert
    //
    // Kept so a caller that configures them keeps working rather than hitting a TypeError. Each was
    // already inert in a browser, which is where the GUI runs, or it configured a Node HTTP agent
    // that no longer exists. None of them changes what goes on the wire.

    /** Inert: XHR and fetch always follow redirects; superagent could not disable that in a browser. */
    redirects() {
        return this;
    }

    /** Inert: retrying is not reproduced, because half a retry policy is worse than none. */
    retry() {
        return this;
    }

    /** Inert: buffering was a Node response concern. */
    buffer() {
        return this;
    }

    /** Inert: there is no Node HTTP agent to configure. */
    agent() {
        return this;
    }

    /** Inert: TLS material belonged to the Node agent. */
    ca() {
        return this;
    }

    /** Inert: TLS material belonged to the Node agent. */
    cert() {
        return this;
    }

    /** Inert: TLS material belonged to the Node agent. */
    key() {
        return this;
    }

    /** Inert: TLS material belonged to the Node agent. */
    pfx() {
        return this;
    }

    /** Inert: the response is read whole, as it was in a browser. */
    maxResponseSize() {
        return this;
    }

    /** Inert: the query string is built by the caller, in order. */
    sortQuery() {
        return this;
    }

    // ---------------------------------------------------------------- sending

    /**
     * @return {boolean} whether the response should come back as a Blob.
     */
    get _asBlob() {
        return this._responseType === 'blob';
    }

    /**
     * Sends the request.
     * @param {!function} callback - `(error, response)`, superagent's signature.
     * @return {RequestSpec}
     */
    end(callback) {
        const done = typeof callback === 'function' ? callback : () => {};
        if (beforeStart && beforeStart.call) beforeStart(this);

        this._execute().then(
            response => {
                this.emit('response', response);
                this.emit('end');
                done(null, response);
            },
            error => {
                this.emit('error', error);
                done(error, null);
            }
        );
        return this;
    }

    /**
     * @param {!object} response
     * @return {boolean} whether to resolve, honouring an `ok()` override.
     */
    _isResponseOK(response) {
        if (this._okCallback) return !!this._okCallback(response);
        return response.ok;
    }

    async _execute() {
        // Checked here rather than relying on the transport to honour the signal: `abort()` may have
        // been called from a `beforeStart` hook, before anything was sent.
        if (this.aborted) throw new Error('Request aborted');

        const mocked = matchMock(this.method, this.url);
        if (mocked) {
            const lowerCased = {};
            Object.keys(this._header).forEach(key => {
                if (this._header[key] !== undefined) lowerCased[key] = this._header[key];
            });
            return respondMock(mocked, {
                // `{}` rather than undefined when nothing was sent: the mocks in
                // features/support/mocks index straight into req.body.
                body: this._data === undefined || this._data === null ? {} : this._data,
                headers: lowerCased,
                query: {}
            });
        }

        const headers = {};
        Object.keys(this.header).forEach(key => {
            if (this.header[key] !== undefined) headers[key] = String(this.header[key]);
        });

        let body = await this._buildBody(headers);
        const onProgress = this.listenerCount('progress') ? event => this.emit('progress', event) : null;

        if (onProgress && typeof XMLHttpRequest !== 'undefined' && typeof document !== 'undefined') {
            return this._sendOverXhr(headers, body, onProgress);
        }

        if (onProgress && typeof FormData !== 'undefined' && body instanceof FormData) {
            const packed = await packFormData(body);
            headers['Content-Type'] = packed.contentType;
            body = packed.blob;
        }

        let duplex;
        if (onProgress && _isBlobLike(body)) {
            body = _countingStream(body, onProgress);
            duplex = 'half';
        }

        return this._sendOverFetch(headers, body, duplex);
    }

    /**
     * Works out the request body. The Content-Type was already chosen by `send()`, as superagent
     * chose it there; this only removes one that a multipart body has to own itself.
     * @param {!object} headers - mutated in place when a Content-Type has to go.
     * @return {Promise<*>} whatever fetch should be handed as `body`.
     */
    async _buildBody(headers) {
        if (this.method === 'GET' || this.method === 'HEAD') return undefined;

        const dropContentType = () => {
            Object.keys(headers)
                .filter(key => key.toLowerCase() === 'content-type')
                .forEach(key => delete headers[key]);
        };

        if (this._parts.length) {
            // A FormData built here carries its own boundary, so any Content-Type the caller set
            // has to go: keeping it would name a boundary that is not the one in the body.
            const form = await buildFormData(this._parts);
            dropContentType();
            return form;
        }

        const data = this._data;
        if (data === undefined || data === null) return undefined;

        if (_isRawBody(data)) {
            if (typeof FormData !== 'undefined' && data instanceof FormData) dropContentType();
            return data;
        }

        if (typeof data === 'string') return data;

        return this._serializer ? this._serializer(data) : JSON.stringify(data);
    }

    /**
     * Starts the deadline and response timers.
     *
     * They **reject on their own**, and only then ask the transport to cancel. superagent worked the
     * same way, and the difference matters: an engine whose fetch ignores `AbortSignal` would
     * otherwise drop the timeout silently and let a request hang for as long as the server takes.
     * Measured, not assumed -- Obscura 0.2.1 honours neither `AbortSignal` nor `xhr.timeout`, and a
     * cancellation-dependent timeout simply stopped applying there.
     *
     * @param {!function} onExpired - called with the message; rejects the pending request.
     */
    _startTimers(onExpired) {
        if (this._timeout && this._timeout > 0) {
            this._deadlineTimer = setTimeout(() => onExpired('Timeout of ' + this._timeout + 'ms exceeded'), this._timeout);
        }
        if (this._responseTimeout && this._responseTimeout > 0) {
            this._responseTimer = setTimeout(
                () => onExpired('Response timeout of ' + this._responseTimeout + 'ms exceeded'),
                this._responseTimeout
            );
        }
    }

    /**
     * Builds the promise that loses the race when a timer fires. It never resolves.
     * @return {{promise: Promise, expire: function}}
     */
    _expiry() {
        let expire;
        const promise = new Promise((resolve, reject) => {
            expire = message => {
                const error = new Error(message);
                error.timeout = true;
                error.code = 'ECONNABORTED';
                this.timedout = true;
                // Best effort, and only after the rejection is already on its way.
                if (this._xhr) this._xhr.abort();
                else if (this._controller) this._controller.abort(error);
                reject(error);
            };
        });
        // Nothing observes this promise when no timer fires, and an unobserved rejection would be
        // reported as unhandled.
        promise.catch(() => {});
        return { promise: promise, expire: expire };
    }

    async _sendOverFetch(headers, body, duplex) {
        const controller = this._controller;
        const expiry = this._expiry();
        this._startTimers(expiry.expire);

        try {
            const init = { method: this.method, headers: headers };
            if (body !== undefined) init.body = body;
            if (duplex) init.duplex = duplex;
            if (controller) init.signal = controller.signal;
            if (this._withCredentials) init.credentials = 'include';

            const raw = await Promise.race([fetch(this.url, init), expiry.promise]);

            // The headers are in, so the response timer has done its job; the deadline keeps running
            // while the body is read.
            if (this._responseTimer) {
                clearTimeout(this._responseTimer);
                this._responseTimer = null;
            }

            const text = this._asBlob ? undefined : await Promise.race([raw.text(), expiry.promise]);
            const blob = this._asBlob ? await Promise.race([this._readBlob(raw), expiry.promise]) : undefined;

            const response = buildResponse({
                status: raw.status,
                statusText: raw.statusText,
                headers: headersToObject(raw.headers),
                text: text,
                blob: blob,
                asBlob: this._asBlob,
                parser: this._parser
            });

            if (!this._isResponseOK(response)) throw toError(response);
            return response;
        } finally {
            this.clearTimeout();
        }
    }

    /**
     * Reads a binary body the way each runtime used to deliver it: a Blob in a browser, a Buffer in
     * Node. superagent already differed between the two, and a caller unwrapping one would not
     * survive being handed the other.
     * @param {!Response} raw
     * @return {Promise<*>}
     */
    async _readBlob(raw) {
        if (typeof document !== 'undefined') return raw.blob();
        const buffer = await raw.arrayBuffer();
        return typeof Buffer !== 'undefined' ? Buffer.from(buffer) : new Uint8Array(buffer);
    }

    _sendOverXhr(headers, body, onProgress) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            this._xhr = xhr;
            if (this.aborted) {
                reject(new Error('Request aborted'));
                return;
            }
            const expiry = this._expiry();
            expiry.promise.catch(reject);
            this._startTimers(expiry.expire);

            xhr.open(this.method, this.url, true);
            if (this._timeout && this._timeout > 0) xhr.timeout = this._timeout;
            if (this._withCredentials) xhr.withCredentials = true;
            if (this._asBlob) xhr.responseType = 'blob';
            Object.keys(headers).forEach(key => {
                // The boundary belongs to the FormData the browser is about to serialise.
                if (key.toLowerCase() === 'content-type' && typeof FormData !== 'undefined' && body instanceof FormData) return;
                xhr.setRequestHeader(key, headers[key]);
            });

            const report = direction => event => {
                onProgress({
                    direction: direction,
                    loaded: event.loaded,
                    total: event.total,
                    percent: event.total ? (event.loaded * 100) / event.total : 0
                });
            };
            if (xhr.upload) xhr.upload.onprogress = report('upload');
            xhr.onprogress = report('download');

            xhr.onload = () => {
                this.clearTimeout();
                let response;
                try {
                    response = buildResponse({
                        status: xhr.status,
                        statusText: xhr.statusText,
                        headers: parseRawHeaders(xhr.getAllResponseHeaders()),
                        text: this._asBlob ? undefined : xhr.responseText,
                        blob: this._asBlob ? xhr.response : undefined,
                        asBlob: this._asBlob,
                        parser: this._parser
                    });
                } catch (error) {
                    reject(error);
                    return;
                }
                if (!this._isResponseOK(response)) reject(toError(response));
                else resolve(response);
            };
            xhr.onerror = () => reject(new Error('Network error'));
            xhr.ontimeout = () => reject(new Error('Timeout of ' + this._timeout + 'ms exceeded'));
            xhr.onabort = () => reject(new Error('Request aborted'));

            xhr.send(body === undefined ? null : body);
        });
    }
}
