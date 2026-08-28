/**
 * The public surface of the request and the response, held against superagent's.
 *
 * `hooks.beforeStart` hands the request object to application code, and the OpenGate web GUI is
 * built on this library and ships to production regularly. A method that quietly stops existing
 * would be a TypeError inside someone's hook, on every request, in production. So the surface is
 * enumerated from superagent's own browser sources and compared, rather than trusted.
 *
 * If this test fails after a superagent upgrade, that is the point: it means the reference moved.
 * superagent stays a devDependency partly for this: the comparison needs something to compare to.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

import RequestSpec from '../../../src/util/http/RequestSpec';
import { buildResponse } from '../../../src/util/http/response';

const require = createRequire(import.meta.url);

/**
 * The names superagent's browser build puts on its request.
 *
 * Reading the source text of client.js and request-base.js is **not enough**, and the first version
 * of this test made exactly that mistake: the browser request is also passed through
 * component-emitter, which mixes its methods in at runtime rather than assigning them to the
 * prototype where a regexp would see them. `addEventListener`, `removeEventListener` and
 * `hasListeners` were missing from this list, and therefore missing from RequestSpec, until Chema
 * spotted it reading the diff. Enumerate the mixin too.
 */
function superagentRequestSurface() {
    const client = readFileSync(require.resolve('superagent/lib/client.js'), 'utf8');
    const base = readFileSync(require.resolve('superagent/lib/request-base.js'), 'utf8');
    const assigned = [
        ...[...client.matchAll(/Request\.prototype\.([A-Za-z_][A-Za-z0-9_]*)\s*=/g)].map(m => m[1]),
        ...[...base.matchAll(/RequestBase\.prototype\.([A-Za-z_][A-Za-z0-9_]*)\s*=/g)].map(m => m[1])
    ];

    // What component-emitter installs, asked of component-emitter itself.
    const Emitter = require('component-emitter');
    const mixedIn = {};
    Emitter(mixedIn);
    const emitted = Object.keys(mixedIn).filter(name => typeof mixedIn[name] === 'function');

    return [...new Set([...assigned, ...emitted])].filter(name => !name.startsWith('_'));
}

/** The names superagent's Node build put on its request, EventEmitter surface included. */
function superagentNodeSurface() {
    const superagent = require('superagent');
    const request = superagent.get('http://example.invalid/x');
    const names = new Set();
    let proto = Object.getPrototypeOf(request);
    while (proto && proto !== Object.prototype) {
        Object.getOwnPropertyNames(proto).forEach(name => names.add(name));
        proto = Object.getPrototypeOf(proto);
    }
    request.abort();
    return [...names].filter(name => !name.startsWith('_') && typeof request[name] === 'function');
}

// Deliberately not reproduced: each streams, resolves or reaches inside a request, and a chainable
// no-op would be worse than a loud failure. Nothing in the library calls them, and they are
// meaningless on a request that has not been sent -- the only state a beforeStart hook ever sees.
const NOT_REPRODUCED = ['pipe', 'write', 'then', 'catch', 'callback', 'crossDomainError', 'request'];

describe('the request surface', () => {
    it('offers every superagent method a caller could reach, bar the documented exceptions', () => {
        const request = new RequestSpec('GET', 'http://example.invalid/x');
        const missing = superagentRequestSurface()
            .filter(name => !NOT_REPRODUCED.includes(name))
            .filter(name => typeof request[name] !== 'function');
        expect(missing).toEqual([]);
    });

    // The package runs server-side too, and superagent's Node request carried more than its browser
    // one -- the whole EventEmitter surface among it. A hook written against Node would break on any
    // of it that went missing.
    it('offers every superagent Node method too, bar the same exceptions', () => {
        const request = new RequestSpec('GET', 'http://example.invalid/x');
        const missing = superagentNodeSurface()
            .filter(name => !NOT_REPRODUCED.includes(name))
            .filter(name => typeof request[name] !== 'function');
        expect(missing).toEqual([]);
    });

    it('does not pretend to offer the ones that cannot work', () => {
        const request = new RequestSpec('GET', 'http://example.invalid/x');
        NOT_REPRODUCED.forEach(name => expect(request[name]).toBeUndefined());
    });

    // The three that were missing. Named individually so a regression is unmistakable.
    it("carries component-emitter's aliases, which the browser request has", () => {
        const request = new RequestSpec('GET', 'http://example.invalid/x');
        ['addEventListener', 'removeEventListener', 'hasListeners'].forEach(name => {
            expect(typeof request[name], name).toBe('function');
        });

        const seen = [];
        const listener = () => seen.push('fired');
        request.addEventListener('thing', listener);
        expect(request.hasListeners('thing')).toBe(true);
        request.emit('thing');
        expect(seen).toEqual(['fired']);

        request.removeEventListener('thing', listener);
        expect(request.hasListeners('thing')).toBe(false);
    });

    it('exposes method, url and both views of the headers', () => {
        const request = new RequestSpec('POST', 'http://example.invalid/x');
        expect(request.method).toBe('POST');
        expect(request.url).toBe('http://example.invalid/x');
        // Same data under both names, as superagent kept it.
        expect(request.headers).toBe(request.header);
    });

    it('keeps every honoured method chainable', () => {
        const request = new RequestSpec('POST', 'http://example.invalid/x');
        const chainable = [
            ['set', 'X-A', '1'],
            ['unset', 'X-A'],
            ['type', 'json'],
            ['accept', 'json'],
            ['auth', 'user', 'pass'],
            ['query', { a: 1 }],
            ['send', { a: 1 }],
            ['field', 'f', 'v'],
            ['attach', 'g', new Blob(['x'])],
            ['timeout', 10],
            ['clearTimeout'],
            ['on', 'progress', () => {}],
            ['off', 'progress'],
            ['ok', () => true],
            ['serialize', String],
            ['parse', String],
            ['responseType', 'blob'],
            ['withCredentials'],
            ['use', () => {}],
            ['redirects', 0],
            ['retry', 2],
            ['buffer', true],
            ['agent', null],
            ['ca', null],
            ['maxResponseSize', 10],
            ['sortQuery']
        ];
        chainable.forEach(([name, ...args]) => expect(request[name](...args), name).toBe(request));
    });
});

describe('the request methods that do something', () => {
    const fresh = () => new RequestSpec('POST', 'http://example.invalid/x');

    it('reads headers back case-insensitively, and removes them', () => {
        const request = fresh().set('X-Thing', 'v');
        expect(request.get('x-thing')).toBe('v');
        expect(request.getHeader('X-THING')).toBe('v');
        request.unset('x-thing');
        expect(request.get('X-Thing')).toBeUndefined();
        expect(Object.keys(request.header)).toEqual([]);
    });

    it('resolves the type shorthands superagent accepted', () => {
        expect(fresh().type('json').get('content-type')).toBe('application/json');
        expect(fresh().type('form').get('content-type')).toBe('application/x-www-form-urlencoded');
        expect(fresh().accept('xml').get('accept')).toBe('text/xml');
        expect(fresh().type('application/x-pem-file').get('content-type')).toBe('application/x-pem-file');
    });

    it('encodes basic auth, and sends a bearer token when asked', () => {
        expect(fresh().auth('u', 'p').get('authorization')).toBe('Basic ' + Buffer.from('u:p').toString('base64'));
        expect(fresh().auth('tok', { type: 'bearer' }).get('authorization')).toBe('Bearer tok');
    });

    it('appends to the query string, whichever way it is given', () => {
        expect(fresh().query({ a: 'a b' }).url).toBe('http://example.invalid/x?a=a%20b');
        expect(fresh().query('a=1').query('b=2').url).toBe('http://example.invalid/x?a=1&b=2');
        expect(new RequestSpec('GET', 'http://e.invalid/x?z=0').query({ a: 1 }).url).toBe('http://e.invalid/x?z=0&a=1');
    });

    // superagent picked the content type inside send(), not at send time, so a hook reading it back
    // saw it already set. Anything inspecting Content-Type in beforeStart depends on that.
    it('chooses the content type inside send, where a hook can already see it', () => {
        expect(fresh().send({ a: 1 }).get('content-type')).toBe('application/json');
        expect(fresh().send('a=1').get('content-type')).toBe('application/x-www-form-urlencoded');
        expect(fresh().type('text/csv').send('a,b').get('content-type')).toBe('text/csv');
    });

    it('merges repeated object sends and concatenates repeated form sends', () => {
        expect(fresh().send({ a: 1 }).send({ b: 2 }).toJSON().data).toEqual({ a: 1, b: 2 });
        expect(fresh().send('a=1').send('b=2').toJSON().data).toBe('a=1&b=2');
    });

    it('reports itself as data, as toJSON did', () => {
        expect(fresh().set('X-A', '1').send({ a: 1 }).toJSON()).toEqual({
            method: 'POST',
            url: 'http://example.invalid/x',
            data: { a: 1 },
            headers: { 'x-a': '1', 'content-type': 'application/json' }
        });
    });

    it('marks itself aborted, and refuses a second abort', () => {
        const request = fresh();
        expect(request.aborted).toBe(false);
        request.abort();
        expect(request.aborted).toBe(true);
        expect(request.abort()).toBe(request);
    });

    it('refuses an ok() that is not a function, rather than silently ignoring it', () => {
        expect(() => fresh().ok('yes')).toThrow();
    });
});

describe('the events, which superagent callers may use through the hook', () => {
    const fresh = () => new RequestSpec('POST', 'http://example.invalid/x');

    it('supports several listeners for one event, in order', () => {
        const seen = [];
        const request = fresh()
            .on('thing', () => seen.push('a'))
            .on('thing', () => seen.push('b'));
        request.emit('thing');
        expect(seen).toEqual(['a', 'b']);
        expect(request.listenerCount('thing')).toBe(2);
    });

    it('fires a once listener exactly once', () => {
        let count = 0;
        const request = fresh().once('thing', () => count++);
        request.emit('thing');
        request.emit('thing');
        expect(count).toBe(1);
        expect(request.listenerCount('thing')).toBe(0);
    });

    it('puts a prepended listener first', () => {
        const seen = [];
        const request = fresh()
            .on('thing', () => seen.push('second'))
            .prependListener('thing', () => seen.push('first'));
        request.emit('thing');
        expect(seen).toEqual(['first', 'second']);
    });

    it('removes one listener, or all of them for the event', () => {
        const kept = () => {};
        const dropped = () => {};
        const request = fresh().on('thing', kept).on('thing', dropped);
        request.removeListener('thing', dropped);
        expect(request.listeners('thing')).toEqual([kept]);
        // component-emitter's off(event) dropped every listener for the event.
        request.off('thing');
        expect(request.listenerCount('thing')).toBe(0);
    });

    it('passes the emitted arguments through', () => {
        let seen;
        const request = fresh().on('progress', event => (seen = event));
        request.emit('progress', { loaded: 1, total: 2 });
        expect(seen).toEqual({ loaded: 1, total: 2 });
    });

    it('lists the events that have listeners', () => {
        const request = fresh()
            .on('a', () => {})
            .on('b', () => {});
        expect(request.eventNames().sort()).toEqual(['a', 'b']);
    });

    it('emitting error with nothing listening does not throw, as the browser build did not', () => {
        expect(() => fresh().emit('error', new Error('boom'))).not.toThrow();
    });

    it('emits abort when the request is cancelled', () => {
        let aborted = false;
        fresh()
            .on('abort', () => (aborted = true))
            .abort();
        expect(aborted).toBe(true);
    });
});

describe('the response surface', () => {
    const build = extra =>
        buildResponse({
            status: 200,
            statusText: 'OK',
            headers: { 'content-type': 'application/json', location: '/thing/1', link: '<http://e.invalid/p2>; rel="next"' },
            text: '{"a":1}',
            asBlob: false,
            ...extra
        });

    it('carries every property superagent set on a browser response', () => {
        const res = build();
        [
            'body',
            'header',
            'headers',
            'statusText',
            'text',
            'status',
            'statusCode',
            'statusType',
            'type',
            'charset',
            'links',
            'ok',
            'info',
            'redirect',
            'clientError',
            'serverError',
            'error',
            'created',
            'accepted',
            'noContent',
            'badRequest',
            'unauthorized',
            'forbidden',
            'notAcceptable',
            'notFound',
            'unprocessableEntity'
        ].forEach(name => expect(name in res, name).toBe(true));
    });

    it('offers get and toError, and keeps them out of Object.keys as the prototype did', () => {
        const res = build();
        expect(res.get('Location')).toBe('/thing/1');
        expect(res.toError()).toBeInstanceOf(Error);
        expect(Object.keys(res)).not.toContain('get');
        expect(Object.keys(res)).not.toContain('toError');
    });

    it('parses the Link header into links', () => {
        expect(build().links).toEqual({ next: 'http://e.invalid/p2' });
        expect(build({ headers: { 'content-type': 'application/json' } }).links).toEqual({});
    });

    it('honours a parser installed through parse()', () => {
        const res = buildResponse({
            status: 200,
            headers: { 'content-type': 'text/plain' },
            text: 'a,b',
            asBlob: false,
            parser: t => t.split(',')
        });
        expect(res.body).toEqual(['a', 'b']);
    });
});
