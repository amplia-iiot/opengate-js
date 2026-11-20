import { describe, it, expect } from 'vitest';

import GeoclusterFinder from '../../../src/geocluster/GeoclusterFinder';

function recordingOgapi(statusCode, body) {
    const calls = [];
    const get = (url, _body, _headers, parameters) => {
        calls.push({ url, parameters });
        return Promise.resolve({ statusCode, body });
    };
    return { calls, ogapi: { Napi: { get } } };
}

describe('GeoclusterFinder.findEngineStatus', () => {
    const status = { mongoUrl: 'mongodb://mongo:27017', pingMillis: 2, superclusters: ['sc_sessions'] };

    it('reads provision/geocluster/engine/status and resolves with the status', async () => {
        const { calls, ogapi } = recordingOgapi(200, status);
        const result = await new GeoclusterFinder(ogapi).findEngineStatus();
        expect(calls).toEqual([{ url: 'provision/geocluster/engine/status', parameters: undefined }]);
        expect(result).toEqual({ data: status, statusCode: 200 });
    });

    it('does not carry the url parameters of a previous findFeatures', async () => {
        const { calls, ogapi } = recordingOgapi(200, status);
        const finder = new GeoclusterFinder(ogapi);
        await finder.findFeatures('entities.france', { zoom: 3, topRight: [1, 2], bottomLeft: [2, 3] });
        await finder.findEngineStatus();
        expect(calls[1]).toEqual({ url: 'provision/geocluster/engine/status', parameters: undefined });
    });
});
