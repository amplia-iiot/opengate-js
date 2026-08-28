'use strict';

/**
 * Builds the response object the library has always resolved with.
 *
 * Callers read `statusCode` in 140 places, `header.location` in 25, `status`, `body` and `text` in
 * dozens more. None of that may move, so this reproduces superagent's shape rather than inventing a
 * cleaner one -- including the parts that look wrong:
 *
 *   - `body` is `{}`, not null, when there was nothing to parse.
 *   - `body` is the empty *string* when the response is JSON with an empty body.
 *   - `text` is `undefined`, not '', for a binary content type.
 *   - `header` and `headers` are the same object, with lower-cased keys.
 *
 * Each of those was measured against superagent 3.8 before being written down here; the
 * characterisation tests in test/unit/util/http-response.test.js hold them in place.
 */

const JSON_TYPE = /[/+]json($|[^+\w])/;
const TEXT_TYPE = /^text\//;

const REASONS = {
    200: 'OK',
    201: 'Created',
    204: 'No Content',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    408: 'Request Timeout',
    409: 'Conflict',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout'
};

/**
 * Splits a Content-Type into the mime type and the charset, either of which may be absent.
 * @param {?string} contentType - the raw header value.
 * @return {{type: string, charset: string}}
 */
export function parseContentType(contentType) {
    if (!contentType) return { type: '', charset: '' };
    const parts = contentType.split(';');
    const type = parts.shift().trim().toLowerCase();
    let charset = '';
    parts.forEach(part => {
        const [key, value] = part.split('=');
        if (key && key.trim().toLowerCase() === 'charset' && value) charset = value.trim().replace(/^"|"$/g, '');
    });
    return { type: type, charset: charset };
}

/**
 * Whether a content type is one superagent would have buffered into `text`. An absent type counts:
 * a response with no Content-Type still arrived with its text populated.
 * @param {!string} type - the mime type, without the charset.
 * @return {boolean}
 */
function _isTextLike(type) {
    return type === '' || TEXT_TYPE.test(type) || JSON_TYPE.test(type) || /xml/.test(type) || type === 'application/x-www-form-urlencoded';
}

/**
 * Assembles the resolved response.
 *
 * @param {{status: number, headers: object, text: ?string, blob: *, asBlob: boolean}} raw
 * @return {object} the response object callers receive.
 * @throws {Error} when the body claims to be JSON and will not parse, which is what superagent did.
 */
export function buildResponse(raw) {
    const status = raw.status;
    const statusType = Math.floor(status / 100);
    const headers = raw.headers || {};
    const contentType = parseContentType(headers['content-type']);

    let body = {};
    let text;

    if (raw.asBlob) {
        body = raw.blob;
    } else if (raw.parser) {
        // A parser installed through `.parse()` replaces the type-driven choice entirely, as it did
        // in superagent.
        text = raw.text;
        body = raw.parser(text);
    } else if (JSON_TYPE.test(contentType.type)) {
        text = raw.text;
        // `text && JSON.parse(text)` is superagent's own expression: an empty body short-circuits
        // to the empty string rather than becoming null or {}.
        body = text && JSON.parse(text);
    } else if (_isTextLike(contentType.type)) {
        text = raw.text;
    }

    const response = {
        status: status,
        statusCode: status,
        statusType: statusType,
        info: statusType === 1,
        ok: statusType === 2,
        redirect: statusType === 3,
        clientError: statusType === 4,
        serverError: statusType === 5,
        created: status === 201,
        accepted: status === 202,
        noContent: status === 204 || status === 1223,
        badRequest: status === 400,
        unauthorized: status === 401,
        notAcceptable: status === 406,
        forbidden: status === 403,
        notFound: status === 404,
        unprocessableEntity: status === 422,
        statusText: raw.statusText === undefined ? '' : raw.statusText,
        type: contentType.type,
        charset: contentType.charset,
        headers: headers,
        // The same object under both names, as superagent exposed it. `res.header.location` is
        // read on 25 code paths, and none of them would survive these drifting apart.
        header: headers,
        body: body,
        text: text,
        links: parseLinks(headers.link),
        files: {},
        redirects: []
    };

    // Defined rather than assigned so they stay out of `Object.keys(res)`, where superagent kept
    // them by putting them on the prototype. Anything walking a response must see the same keys.
    Object.defineProperty(response, 'get', {
        // Reads one response header, case-insensitively. superagent's `Response.get`.
        value: field => headers[String(field).toLowerCase()],
        enumerable: false
    });
    Object.defineProperty(response, 'toError', {
        // The Error this response would be reported as. superagent's `Response.toError`.
        value: () => toError(response),
        enumerable: false
    });

    response.error = statusType === 4 || statusType === 5 ? toError(response) : false;

    return response;
}

/**
 * Parses a Link header into the object superagent exposed as `res.links`.
 * @param {?string} value - the raw header.
 * @return {object} rel name to URL, empty when there was no header.
 */
export function parseLinks(value) {
    const links = {};
    if (!value) return links;
    String(value)
        .split(/,\s*(?=<)/)
        .forEach(part => {
            const url = /<([^>]*)>/.exec(part);
            const rel = /rel\s*=\s*"?([^";]+)"?/.exec(part);
            if (url && rel) links[rel[1].trim()] = url[1];
        });
    return links;
}

/**
 * The Error superagent hung off a failing response, and which the transport throws so that the
 * error mapping in NorthAmpliaREST keeps seeing what it always saw.
 * @param {!object} response - a response built by `buildResponse`.
 * @return {Error} carrying `status` and `response`.
 */
export function toError(response) {
    const error = new Error(REASONS[response.status] || 'Unsuccessful HTTP response');
    error.status = response.status;
    error.response = response;
    return error;
}

/**
 * Turns a fetch `Headers` into the plain lower-cased object callers index into.
 * @param {!Headers} headers - the response headers.
 * @return {object}
 */
export function headersToObject(headers) {
    const out = {};
    if (!headers) return out;
    headers.forEach((value, key) => {
        out[key.toLowerCase()] = value;
    });
    // Several cookies arrive as several headers and must not be joined into one string.
    if (typeof headers.getSetCookie === 'function') {
        const cookies = headers.getSetCookie();
        if (cookies && cookies.length) out['set-cookie'] = cookies;
    }
    return out;
}

/**
 * Turns XHR's single header blob into the same object. Used only on the upload-progress path.
 * @param {!string} raw - the value of `getAllResponseHeaders()`.
 * @return {object}
 */
export function parseRawHeaders(raw) {
    const out = {};
    String(raw || '')
        .split(/\r?\n/)
        .forEach(line => {
            const at = line.indexOf(':');
            if (at <= 0) return;
            const key = line.slice(0, at).trim().toLowerCase();
            const value = line.slice(at + 1).trim();
            if (key === 'set-cookie') {
                out[key] = out[key] ? [].concat(out[key], value) : [value];
            } else {
                out[key] = value;
            }
        });
    return out;
}
