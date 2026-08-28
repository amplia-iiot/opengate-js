/**
 * The logger, and the silence it buys.
 *
 * A library has no business writing to a host application's console, and this one used to: every
 * request printed its verb and URL, every failed request dumped a serialised error, and two builders
 * logged the string '!errrrror!!!!!!'. The OpenGate web GUI is built on this library, so that noise
 * landed in a production browser console -- URLs and identifiers included.
 *
 * What is kept is the other half: warnings that tell the caller they have misused the API. Losing
 * those would hide real mistakes, so they still print by default.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import logger, { configureLogger } from '../../../src/util/logger';
import OpenGateAPI from '../../../opengate-api-npm';

let spies;

beforeEach(() => {
    spies = {
        debug: vi.spyOn(console, 'debug').mockImplementation(() => {}),
        info: vi.spyOn(console, 'info').mockImplementation(() => {}),
        warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
        error: vi.spyOn(console, 'error').mockImplementation(() => {}),
        log: vi.spyOn(console, 'log').mockImplementation(() => {})
    };
});

afterEach(() => {
    // Process-wide, like hooks.beforeStart, so it has to be put back.
    configureLogger(undefined);
    vi.restoreAllMocks();
});

describe('the default', () => {
    it('says nothing at debug or info, which is where per-request logging lives', () => {
        logger.debug('a request');
        logger.info('GET https://example.invalid/thing?token=secret');
        expect(spies.debug).not.toHaveBeenCalled();
        expect(spies.info).not.toHaveBeenCalled();
        expect(spies.log).not.toHaveBeenCalled();
    });

    it('still reports warnings and errors, because they are the caller misusing the API', () => {
        logger.warn('a value outside the enum');
        logger.error('a response that would not parse');
        expect(spies.warn).toHaveBeenCalledWith('a value outside the enum');
        expect(spies.error).toHaveBeenCalledWith('a response that would not parse');
    });
});

describe('the logger option', () => {
    it('silences everything when false', () => {
        configureLogger(false);
        logger.warn('quiet');
        logger.error('quiet');
        expect(spies.warn).not.toHaveBeenCalled();
        expect(spies.error).not.toHaveBeenCalled();
    });

    it('reports everything when true, for debugging', () => {
        configureLogger(true);
        logger.debug('d');
        logger.info('i');
        expect(spies.debug).toHaveBeenCalledWith('d');
        expect(spies.info).toHaveBeenCalledWith('i');
    });

    it('hands messages to an object, and keeps the levels it omits silent', () => {
        const seen = [];
        configureLogger({ warn: (...args) => seen.push(['warn', ...args]) });
        logger.warn('mine');
        logger.error('dropped');
        expect(seen).toEqual([['warn', 'mine']]);
        // A supplied logger is authoritative: error does not fall back to the console.
        expect(spies.error).not.toHaveBeenCalled();
    });

    it('is wired to the client option', () => {
        const seen = [];
        new OpenGateAPI({ url: 'http://127.0.0.1:1', apiKey: 'k', logger: { info: m => seen.push(m) } });
        logger.info('through the client');
        expect(seen).toEqual(['through the client']);
    });

    it('leaves the default alone when the option is absent', () => {
        new OpenGateAPI({ url: 'http://127.0.0.1:1', apiKey: 'k' });
        logger.warn('still heard');
        expect(spies.warn).toHaveBeenCalledWith('still heard');
    });
});

describe('a request no longer narrates itself', () => {
    it('writes nothing to the console on a failed request', async () => {
        const ogapi = new OpenGateAPI({ url: 'http://127.0.0.1:1', apiKey: 'k', timeout: 500 });
        await expect(ogapi.Napi.get('anything', undefined, undefined, undefined, false, 'base')).rejects.toBeDefined();
        expect(spies.info).not.toHaveBeenCalled();
        expect(spies.log).not.toHaveBeenCalled();
        expect(spies.error).not.toHaveBeenCalled();
    });
});

describe('a search builder that cannot build', () => {
    const ogapi = () => new OpenGateAPI({ url: 'http://127.0.0.1:1', apiKey: 'k' });

    // It used to log '!errrrror!!!!!!' and return undefined, so the failure arrived one line later as
    // `Cannot read properties of undefined (reading 'execute')`. The library had written a perfectly
    // clear message all along -- the catch simply threw it away.
    it('throws the reason it already had instead of returning undefined', () => {
        expect(() => ogapi().executionsSearchBuilder().limit(1, 1).build()).toThrow(/Must select one at least/);
        expect(spies.error).not.toHaveBeenCalled();
    });

    it('builds fine once the route is chosen', () => {
        const search = ogapi().executionsSearchBuilder().onDevices().limit(1, 1).build();
        expect(search).toBeDefined();
        expect(typeof search.execute).toBe('function');
    });
});
