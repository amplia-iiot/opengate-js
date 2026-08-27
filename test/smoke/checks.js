/**
 * Read-only smoke checks against a live OpenGate.
 *
 * **Every check here is a read.** Nothing in this file provisions, updates or deletes anything, and
 * nothing may be added that does. The Cucumber suite under features/ is the one that creates and
 * deletes entities, and it must never be pointed at production; this file exists precisely so that
 * a real platform can be used as proof without that risk.
 *
 * The same file runs under Node, against `dist/opengate-api-npm.js`, and inside a real browser,
 * against the IIFE bundle. That is the point: a transport change is only proven when both runtimes
 * agree, and comparing two different scripts would prove nothing.
 *
 * Loaded as a CommonJS module by Node and as a classic script by the browser, where it defines
 * `window.__ogapiSmoke`. Lightpanda does not share `window` between `evaluate` calls, so the browser
 * runner must load this with a real `<script src>` and then call it in a single round-trip.
 */
(function (root, factory) {
    if (typeof module === 'object' && module.exports) module.exports = factory();
    else root.__ogapiSmoke = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    function describeError(error) {
        if (!error) return String(error);
        if (error.statusCode !== undefined) {
            return 'statusCode=' + error.statusCode + ' data=' + JSON.stringify(error.data).slice(0, 200);
        }
        return error.message || String(error);
    }

    async function check(results, name, fn) {
        const started = Date.now();
        try {
            const detail = await fn();
            results.push({ name: name, ok: true, ms: Date.now() - started, detail: detail });
        } catch (error) {
            results.push({ name: name, ok: false, ms: Date.now() - started, detail: describeError(error) });
        }
        return results[results.length - 1].ok;
    }

    /**
     * @param {Function} OpenGateAPI - the constructor, however this runtime got hold of it.
     * @param {{url: string, user: string, password: string, organization: string}} config
     * @return {Promise<{runtime: string, results: Array}>}
     */
    return async function runSmoke(OpenGateAPI, config) {
        const results = [];
        const runtime = typeof window !== 'undefined' && window.document ? 'browser' : 'node';

        const bootstrap = new OpenGateAPI({ url: config.url, timeout: 30000 });
        let apiKey;

        // Exchanges user + password for the user's api key, over X-ApiPass. A GET, and the only
        // call that can run before there is a key to authenticate with.
        await check(results, 'authenticate with user and password', async function () {
            const res = await bootstrap.newUserFinder().findByEmailAndPassword(config.user, config.password);
            if (res.statusCode !== 200) throw new Error('expected 200, got ' + res.statusCode);
            const user = res.data && (res.data.user || res.data);
            apiKey = user && (user.apiKey || (user.apikey && user.apikey.value) || user.api_key);
            if (!apiKey) throw new Error('no api key in the response: ' + JSON.stringify(res.data).slice(0, 200));
            return 'api key received, ' + String(apiKey).length + ' characters';
        });

        if (!apiKey) return { runtime: runtime, results: results };

        const ogapi = new OpenGateAPI({ url: config.url, apiKey: apiKey, timeout: 30000 });

        await check(results, 'read the organization by name', async function () {
            const res = await ogapi.newOrganizationFinder().findByName(config.organization);
            if (res.statusCode !== 200) throw new Error('expected 200, got ' + res.statusCode);
            return 'organization found, body keys: ' + Object.keys(res.data || {}).join(',');
        });

        // A search is a POST, but a read: it selects, it never writes. It is worth exercising
        // because it is the only path that puts a JSON body on the wire.
        await check(results, 'search devices, limited to three', async function () {
            const res = await ogapi.devicesSearchBuilder().limit(3, 1).build().execute();
            if (res.statusCode !== 200 && res.statusCode !== 204) throw new Error('expected 200 or 204, got ' + res.statusCode);
            const devices = (res.data && (res.data.devices || res.data.entities)) || [];
            return res.statusCode + ', ' + devices.length + ' device(s) returned';
        });

        // The failure contract, against the real platform rather than a stub.
        //
        // There is more than one. The HTTP layer rejects with { statusCode, data, headers }, but a
        // finder that receives 204 rejects on its own with { error, statusCode } -- and
        // SchedulePipelineFinder, for the same case, uses { data, statusCode }. Three shapes, so a
        // consumer catching an OpenGate failure has to handle all three. OpenGate answers 204 for a
        // name that does not exist, so this path is the GenericFinder one.
        //
        // Pinned as it actually behaves, not as it ought to: unifying these is a deliberate,
        // breaking change that belongs with OpenGateError.
        await check(results, 'a missing organization rejects the way GenericFinder does', async function () {
            try {
                await ogapi.newOrganizationFinder().findByName('no-such-organization-smoke-check');
                throw new Error('expected a rejection, got a resolution');
            } catch (error) {
                if (error instanceof Error) throw error;
                const keys = Object.keys(error).sort().join(',');
                if (keys !== 'error,statusCode') throw new Error('unexpected rejection keys: ' + keys);
                if (error.statusCode !== 404) throw new Error('expected 404, got ' + error.statusCode);
                return 'rejected with 404 and keys ' + keys;
            }
        });

        return { runtime: runtime, results: results };
    };
});
