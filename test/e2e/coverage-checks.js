/**
 * Broad end-to-end coverage of the client API against a live OpenGate, from a real browser.
 *
 * The read-only smoke (test/smoke) answers "can it reach the platform at all" in four checks. The
 * browser transport checks (test/browser) answer "does the transport behave in a browser". Neither
 * answers "does the *API surface* still work", which is the question that matters when validating a
 * release of a library that 51 search builders, 40 finders and 39 provisioning builders hang off.
 *
 * This walks that surface. Factories are **discovered from the client**, not listed here, so a new
 * one is covered the day it is added; only the exceptions carry a recipe. Reads are chained: ids
 * harvested from the search lane feed the finders that need one, so the second tier is exercised
 * with real identifiers rather than invented ones.
 *
 * **Every check in the default lanes is a read.** Searches are POSTs, but a search selects and never
 * writes, and each is capped at one row. A write lane exists and is off unless `allowWrites` is set;
 * see WRITE_LANE below for what it does and why it was scoped that way.
 *
 * Outcomes are deliberately finer than pass/fail, because "the platform says there is nothing there"
 * and "the library is broken" are different facts:
 *
 *   pass    2xx.
 *   empty   204, or a 404 whose body says the resource does not exist. The call worked.
 *   denied  401 or 403. The call worked; this credential may not do that.
 *   absent  404 from an endpoint this platform does not serve at all.
 *   blocked the request never left the browser. Almost always the CORS preflight: several OpenGate
 *           service paths answer OPTIONS with 401 or 403, and a preflight carries no credentials by
 *           design, so no browser can call them cross-origin. Node has no preflight and reaches them
 *           fine, which is why the runner re-runs the same suite there and compares.
 *   fail    anything else, including an exception thrown before the request left.
 *   skip    not attempted, with the reason.
 *
 * Loaded as a CommonJS module by Node and as a classic script by the browser, where it defines
 * window.__ogapiCoverage.
 */
(function (root, factory) {
    if (typeof module === 'object' && module.exports) module.exports = factory();
    else root.__ogapiCoverage = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';

    // ---------------------------------------------------------------- helpers

    /** Walks a dotted path, returning undefined rather than throwing. */
    function at(obj, path) {
        var parts = path.split('.');
        var node = obj;
        for (var i = 0; i < parts.length; i++) {
            if (node === null || node === undefined) return undefined;
            node = node[parts[i]];
        }
        return node;
    }

    /** Unwraps OpenGate's `{ _current: { value } }` envelope when it is there. */
    function value(node) {
        if (node && node._current && node._current.value !== undefined) return node._current.value;
        return node;
    }

    function body(response) {
        if (!response) return undefined;
        return response.data !== undefined ? response.data : response.body;
    }

    /** The first array in a response body, whatever the platform decided to call it. */
    function firstList(response) {
        var d = body(response);
        if (Array.isArray(d)) return d;
        if (!d || typeof d !== 'object') return [];
        var keys = Object.keys(d);
        for (var i = 0; i < keys.length; i++) {
            if (Array.isArray(d[keys[i]])) return d[keys[i]];
        }
        return [];
    }

    function methodsOf(obj) {
        var names = {};
        var proto = Object.getPrototypeOf(obj);
        while (proto && proto !== Object.prototype) {
            Object.getOwnPropertyNames(proto).forEach(function (n) {
                names[n] = true;
            });
            proto = Object.getPrototypeOf(proto);
        }
        // Routes such as onDevices() are installed as own properties, not on the prototype.
        Object.keys(obj).forEach(function (n) {
            if (typeof obj[n] === 'function') names[n] = true;
        });
        return Object.keys(names).filter(function (n) {
            return n !== 'constructor' && n.charAt(0) !== '_' && typeof obj[n] === 'function';
        });
    }

    var IN_BROWSER = typeof window !== 'undefined' && !!window.document;

    /** The shape the transport rejects with when the request never reached a server at all. */
    function isNetworkFailure(error) {
        if (!error || error.statusCode !== 500) return false;
        var errors = error.data && error.data.errors;
        return !!(errors && errors[0] && /OGAPI: Something is broken/.test(errors[0].message || ''));
    }

    /** Classifies a rejection so a bare environment fact is not reported as a defect. */
    function classify(error) {
        if (!error) return { outcome: 'fail', note: 'rejected with ' + String(error) };
        if (error.statusCode === undefined && error.message) {
            return { outcome: 'fail', note: error.message.slice(0, 160) };
        }
        if (IN_BROWSER && isNetworkFailure(error)) {
            return {
                outcome: 'blocked',
                note: 'the request never left the browser; check the CORS preflight for this path'
            };
        }
        var code = error.statusCode;
        var payload = error.data !== undefined ? error.data : error.error;
        var text = '';
        try {
            text = typeof payload === 'string' ? payload : JSON.stringify(payload);
        } catch (e) {
            text = '<unserialisable>';
        }
        text = String(text || '').slice(0, 150);
        if (code === 204) return { outcome: 'empty', note: '204' };
        if (code === 401 || code === 403) return { outcome: 'denied', note: code + ' ' + text };
        if (code === 404) {
            if (text.indexOf('No static resource') !== -1) return { outcome: 'absent', note: '404, endpoint not served here' };
            return { outcome: 'empty', note: '404 ' + text };
        }
        return { outcome: 'fail', note: code + ' ' + text };
    }

    function summarise(response) {
        if (!response) return 'no response';
        var code = response.statusCode !== undefined ? response.statusCode : '?';
        var list = firstList(response);
        if (list.length) return code + ', ' + list.length + ' item(s)';
        var d = body(response);
        if (d && typeof d === 'object') return code + ', keys: ' + Object.keys(d).slice(0, 5).join(',');
        return String(code);
    }

    // ---------------------------------------------------------------- recipes
    //
    // Only the search builders that do not answer to `.limit(1, 1).build().execute()`. Everything
    // else is discovered and driven by the default recipe, so a new builder needs no entry here.

    var SEARCH_RECIPES = {
        // No limit in its chain at all.
        basicTypesSearchBuilder: function (b) {
            return b.build();
        },
        // Needs one of its routes chosen; without it, build() throws and says so.
        executionsSearchBuilder: function (b) {
            return b.onDevices().limit(1, 1).build();
        },
        // Addresses an arbitrary URL, which is the caller's to supply.
        rawSearchBuilder: null,
        // Both need an entity to hang off, harvested from the device search.
        datapointsSearchBuilder: function (b, ctx) {
            return ctx.deviceId ? b.withDeviceId(ctx.deviceId).limit(1, 1).build() : null;
        },
        datastreamsSearchBuilder: function (b) {
            return b.limit(1, 1).build();
        },
        // Scoped to one time series, harvested from the time series finder.
        timeserieSearchBuilder: function (b, ctx) {
            return ctx.timeserieId ? b.limit(1, 1).build() : null;
        }
    };

    var DEFAULT_SEARCH = function (b) {
        return b.limit(1, 1).build();
    };

    /**
     * The finders that take an identifier, and where that identifier comes from. `needs` names a key
     * in the harvested context; when it is missing the check is skipped and says so, rather than
     * being invented and failing for the wrong reason.
     */
    var ID_FINDERS = [
        {
            factory: 'newDeviceFinder',
            method: 'findByOrganizationAndId',
            needs: 'deviceId',
            args: function (c) {
                return [c.org, c.deviceId];
            }
        },
        {
            factory: 'newEntityFinder',
            method: 'findByOrganizationAndId',
            needs: 'entityId',
            args: function (c) {
                return [c.org, c.entityId];
            }
        },
        {
            factory: 'newChannelFinder',
            method: 'findByOrganizationAndName',
            needs: 'channelName',
            args: function (c) {
                return [c.org, c.channelName];
            }
        },
        {
            factory: 'newWorkgroupFinder',
            method: 'findByDomainAndName',
            needs: 'workgroupName',
            args: function (c) {
                return [c.domain, c.workgroupName];
            }
        },
        {
            factory: 'newWorkgroupRelationsFinder',
            method: 'findByDomainAndName',
            needs: 'workgroupName',
            args: function (c) {
                return [c.domain, c.workgroupName];
            }
        },
        {
            factory: 'newDomainsFinder',
            method: 'findByNameWithHierarchy',
            needs: 'domain',
            args: function (c) {
                return [c.domain];
            }
        },
        {
            factory: 'newManufacturersFinder',
            method: 'findById',
            needs: 'manufacturerId',
            args: function (c) {
                return [c.manufacturerId];
            }
        },
        {
            factory: 'newManufacturersFinder',
            method: 'findMedias',
            needs: 'manufacturerId',
            args: function (c) {
                return [c.manufacturerId];
            }
        },
        {
            factory: 'newModelFinder',
            method: 'findByManufacturer',
            needs: 'manufacturerId',
            args: function (c) {
                return [c.manufacturerId];
            }
        },
        {
            factory: 'newDatamodelsFinder',
            method: 'findByOrganizationAndId',
            needs: 'datamodelId',
            args: function (c) {
                return [c.org, c.datamodelId];
            }
        },
        {
            factory: 'newProvisionProcessorsFinder',
            method: 'findByOrganizationAndProvisionProcessorId',
            needs: 'processorId',
            args: function (c) {
                return [c.org, c.processorId];
            }
        },
        {
            factory: 'newTimeserieFinder',
            method: 'findByOrganizationAndName',
            needs: 'timeserieName',
            args: function (c) {
                return [c.org, c.timeserieName];
            }
        },
        {
            factory: 'newTimeserieFinder',
            method: 'findByOrganizationAndTimeserieId',
            needs: 'timeserieId',
            args: function (c) {
                return [c.org, c.timeserieId];
            }
        },
        {
            factory: 'newOrganizationPlansFinder',
            method: 'findByOrganizationAndId',
            needs: 'orgPlanId',
            args: function (c) {
                return [c.org, c.orgPlanId];
            }
        },
        {
            factory: 'newDevicePlansFinder',
            method: 'findByOrganizationAndId',
            needs: 'devicePlanId',
            args: function (c) {
                return [c.org, c.devicePlanId];
            }
        },
        {
            factory: 'newTicketFinder',
            method: 'findByOrganizationAndId',
            needs: 'ticketId',
            args: function (c) {
                return [c.org, c.ticketId];
            }
        },
        {
            factory: 'newAreaFinder',
            method: 'findByOrganizationAndIdentifier',
            needs: 'areaId',
            args: function (c) {
                return [c.org, c.areaId];
            }
        },
        {
            factory: 'newBulkFinder',
            method: 'findByOrganizationAndId',
            needs: 'bulkId',
            args: function (c) {
                return [c.org, c.bulkId];
            }
        },
        {
            factory: 'newBulkExecutionFinder',
            method: 'findByOrganizationAndId',
            needs: 'bulkExecutionId',
            args: function (c) {
                return [c.org, c.bulkExecutionId];
            }
        },
        {
            factory: 'newOperationFinder',
            method: 'findById',
            needs: 'operationId',
            args: function (c) {
                return [c.operationId];
            }
        },
        {
            factory: 'newSubscribersFinder',
            method: 'findByOrganizationAndId',
            needs: 'subscriberId',
            args: function (c) {
                return [c.org, c.subscriberId];
            }
        },
        {
            factory: 'newSubscriptionsFinder',
            method: 'findByOrganizationAndId',
            needs: 'subscriptionId',
            args: function (c) {
                return [c.org, c.subscriptionId];
            }
        },
        {
            factory: 'newCertificateFinder',
            method: 'findById',
            needs: 'certificateId',
            args: function (c) {
                return [c.certificateId];
            }
        },
        {
            factory: 'newOperationTypeFinder',
            method: 'findByOrganizationAndName',
            needs: 'operationTypeName',
            args: function (c) {
                return [c.org, c.operationTypeName];
            }
        },
        {
            factory: 'newSoftwareFinder',
            method: 'findByOrganizationAndId',
            needs: 'softwareId',
            args: function (c) {
                return [c.org, c.softwareId];
            }
        },
        {
            factory: 'newDatasetFinder',
            method: 'findByOrganizationAndName',
            needs: 'datasetName',
            args: function (c) {
                return [c.org, c.datasetName];
            }
        },
        {
            factory: 'newUserFinder',
            method: 'findByEmail',
            needs: 'userEmail',
            args: function (c) {
                return [c.userEmail];
            }
        },
        {
            factory: 'newOrganizationManufacturersFinder',
            method: 'findByOrganizationAndId',
            needs: 'orgManufacturerId',
            args: function (c) {
                return [c.org, c.orgManufacturerId];
            }
        }
    ];

    /** How each harvestable identifier is read out of a search result. */
    var HARVEST = {
        deviceId: function (r) {
            return value(at(firstList(r)[0], 'provision.device.identifier'));
        },
        entityId: function (r) {
            return value(at(firstList(r)[0], 'provision.device.identifier'));
        },
        channelName: function (r) {
            return value(at(firstList(r)[0], 'provision.administration.identifier'));
        },
        workgroupName: function (r) {
            return at(firstList(r)[0], 'name');
        },
        manufacturerId: function (r) {
            return at(firstList(r)[0], 'id');
        },
        datamodelId: function (r) {
            return at(firstList(r)[0], 'identifier');
        },
        ticketId: function (r) {
            return value(at(firstList(r)[0], 'ticket.identifier')) || at(firstList(r)[0], 'identifier');
        },
        areaId: function (r) {
            return at(firstList(r)[0], 'identifier') || value(at(firstList(r)[0], 'area.identifier'));
        },
        bulkId: function (r) {
            return at(firstList(r)[0], 'id') || at(firstList(r)[0], 'identifier');
        },
        bulkExecutionId: function (r) {
            return at(firstList(r)[0], 'id') || at(firstList(r)[0], 'identifier');
        },
        operationId: function (r) {
            return value(at(firstList(r)[0], 'operation.job.id')) || at(firstList(r)[0], 'id');
        },
        subscriberId: function (r) {
            return value(at(firstList(r)[0], 'provision.administration.identifier'));
        },
        subscriptionId: function (r) {
            return value(at(firstList(r)[0], 'provision.administration.identifier'));
        },
        certificateId: function (r) {
            return at(firstList(r)[0], 'id') || at(firstList(r)[0], 'identifier');
        },
        operationTypeName: function (r) {
            return at(firstList(r)[0], 'name');
        },
        processorId: function (r) {
            return at(firstList(r)[0], 'provisionProcessorId');
        },
        timeserieId: function (r) {
            return at(firstList(r)[0], 'identifier');
        },
        timeserieName: function (r) {
            return at(firstList(r)[0], 'name');
        },
        orgPlanId: function (r) {
            return at(firstList(r)[0], 'identifier') || at(firstList(r)[0], 'id');
        },
        devicePlanId: function (r) {
            return at(firstList(r)[0], 'identifier') || at(firstList(r)[0], 'id');
        },
        softwareId: function (r) {
            return at(firstList(r)[0], 'id') || at(firstList(r)[0], 'identifier');
        },
        datasetName: function (r) {
            return at(firstList(r)[0], 'name') || at(firstList(r)[0], 'identifier');
        },
        orgManufacturerId: function (r) {
            return at(firstList(r)[0], 'id');
        }
    };

    /** Which search or finder feeds each identifier. */
    var HARVEST_SOURCE = {
        deviceId: 'devicesSearchBuilder',
        entityId: 'entitiesSearchBuilder',
        channelName: 'channelsSearchBuilder',
        workgroupName: 'workgroupsSearchBuilder',
        datamodelId: 'datamodelsSearchBuilder',
        ticketId: 'ticketsSearchBuilder',
        areaId: 'areasSearchBuilder',
        bulkId: 'bulkSearchBuilder',
        bulkExecutionId: 'bulkExecutionSearchBuilder',
        operationId: 'operationsSearchBuilder',
        subscriberId: 'subscribersSearchBuilder',
        subscriptionId: 'subscriptionsSearchBuilder',
        certificateId: 'certificatesSearchBuilder',
        operationTypeName: 'operationTypesSearchBuilder'
    };

    // ---------------------------------------------------------------- the run

    /**
     * @param {!Function} OpenGateAPI - the constructor, however this runtime got hold of it.
     * @param {{url: string, user: string, password: string, organization: string, allowWrites: boolean, delayMs: number}} config
     * @param {function=} onEvent - called with each result as it lands, so a page can draw progress.
     * @return {Promise<object>}
     */
    async function run(OpenGateAPI, config, onEvent) {
        var results = [];
        var requests = 0;
        var delayMs = config.delayMs === undefined ? 30 : config.delayMs;
        var runtime = typeof window !== 'undefined' && window.document ? 'browser' : 'node';

        function sleep(ms) {
            return new Promise(function (r) {
                setTimeout(r, ms);
            });
        }

        function record(lane, name, detail, outcome, ms, note) {
            var row = { lane: lane, name: name, detail: detail, outcome: outcome, ms: ms, note: note };
            results.push(row);
            if (onEvent) {
                try {
                    onEvent(row, results.length);
                } catch (e) {
                    /* a reporting failure must not stop the run */
                }
            }
            return row;
        }

        /** Runs one asynchronous check, classifying whatever comes back. */
        async function check(lane, name, detail, fn) {
            if (delayMs) await sleep(delayMs);
            var started = Date.now();
            try {
                var response = await fn();
                var row = record(lane, name, detail, 'pass', Date.now() - started, summarise(response));
                // Kept so the chained lane can harvest an identifier from it. Stripped before the
                // results are handed back, so a page never has to carry the payloads.
                row.__response = response;
                return row;
            } catch (error) {
                var verdict = classify(error);
                return record(lane, name, detail, verdict.outcome, Date.now() - started, verdict.note);
            }
        }

        function skip(lane, name, detail, why) {
            return record(lane, name, detail, 'skip', 0, why);
        }

        // Counting through the library's own hook, which is what it is for.
        var countRequests = function () {
            requests++;
        };

        // ------------------------------------------------------------ lane 1: offline
        //
        // No network at all: does the surface exist, and does it compose URLs and filters correctly?

        var offline = new OpenGateAPI({ url: 'https://offline.invalid', apiKey: 'x', logger: false });

        var factories = methodsOf(offline).filter(function (n) {
            return /SearchBuilder$|Builder$|^new[A-Z]|Catalog$|Helper$/.test(n);
        });
        var built = 0;
        var needArgs = 0;
        var broke = [];
        factories.forEach(function (name) {
            try {
                offline[name]();
                built++;
            } catch (error) {
                // Several legitimately require an argument; that is not a defect.
                if (/Parameter|must be|mandatory|required/i.test(error.message || '')) needArgs++;
                else broke.push(name + ': ' + (error.message || '').slice(0, 60));
            }
        });
        record(
            'offline',
            'every factory can be constructed',
            factories.length + ' factories',
            broke.length ? 'fail' : 'pass',
            0,
            built + ' built, ' + needArgs + ' need an argument' + (broke.length ? ', BROKEN: ' + broke.join(' | ') : '')
        );

        record(
            'offline',
            'url composition',
            "_createUrl('provision/devices', {name: 'a name'})",
            (function () {
                var url = offline.Napi._createUrl('provision/devices', { name: 'a name' }, undefined);
                return url === 'https://offline.invalid/north/v80/provision/devices?name=a%20name' ? 'pass' : 'fail';
            })(),
            0,
            offline.Napi._createUrl('provision/devices', { name: 'a name' }, undefined)
        );

        var ex = offline.EX;
        var expressions = [
            ['eq', JSON.stringify(ex.eq('a', 1)), '{"eq":{"a":1}}'],
            ['like', JSON.stringify(ex.like('a', 'b')), '{"like":{"a":"b"}}'],
            ['and', JSON.stringify(ex.and(ex.eq('a', 1), ex.eq('b', 2))), '{"and":[{"eq":{"a":1}},{"eq":{"b":2}}]}'],
            ['or', JSON.stringify(ex.or(ex.eq('a', 1), ex.eq('b', 2))), '{"or":[{"eq":{"a":1}},{"eq":{"b":2}}]}']
        ];
        expressions.forEach(function (e) {
            record(
                'offline',
                'expression ' + e[0],
                e[1],
                e[1] === e[2] ? 'pass' : 'fail',
                0,
                e[1] === e[2] ? 'as documented' : 'expected ' + e[2]
            );
        });

        // FilterBuilder has no build(): and()/or() return the composed template directly.
        var filterOut = '';
        var filterOk = false;
        try {
            filterOut = JSON.stringify(offline.newFilterBuilder().and(ex.eq('a', 1), ex.like('b', 'c')));
            filterOk = filterOut === '{"_filterTemplate":{"filter":{"and":[{"eq":{"a":1}},{"like":{"b":"c"}}]}}}';
        } catch (error) {
            filterOut = 'threw: ' + (error.message || '').slice(0, 90);
        }
        record('offline', 'filter builder', 'newFilterBuilder().and(EX.eq, EX.like)', filterOk ? 'pass' : 'fail', 0, filterOut);

        var selectOut = '';
        var selectOk = false;
        try {
            var sb = offline.newSelectBuilder();
            sb.add(offline.SE.element('provision.device.identifier', ['value']), offline.SE.element('device.temperature', ['value']));
            selectOut = JSON.stringify(sb._selectTemplate || sb);
            selectOk = selectOut.indexOf('provision.device.identifier') !== -1 && selectOut.indexOf('device.temperature') !== -1;
        } catch (error) {
            selectOut = 'threw: ' + (error.message || '').slice(0, 90);
        }
        record(
            'offline',
            'select builder',
            'newSelectBuilder().add(SE.element x 2)',
            selectOk ? 'pass' : 'fail',
            0,
            selectOut.slice(0, 140)
        );

        // ------------------------------------------------------------ lane 2: authenticate

        if (!config.url) {
            skip('auth', 'authenticate', 'no platform configured', 'set the url, user, password and organization to run the live lanes');
            return { runtime: runtime, requests: requests, results: results, context: {} };
        }

        var apiKey = null;
        var bootstrap = new OpenGateAPI({ url: config.url, timeout: 30000, logger: false, hooks: { beforeStart: countRequests } });
        await check('auth', 'newUserFinder', 'findByEmailAndPassword(user, password)', async function () {
            var response = await bootstrap.newUserFinder().findByEmailAndPassword(config.user, config.password);
            var user = body(response);
            user = (user && (user.user || user)) || {};
            apiKey = user.apiKey || (user.apikey && user.apikey.value) || null;
            if (!apiKey) throw new Error('authenticated but no api key in the response');
            return response;
        });
        if (!apiKey) {
            skip('auth', 'the rest of the run', 'no api key', 'nothing further can be attempted without a key');
            return { runtime: runtime, requests: requests, results: results, context: {} };
        }

        var api = new OpenGateAPI({
            url: config.url,
            apiKey: apiKey,
            timeout: 30000,
            logger: false,
            hooks: { beforeStart: countRequests }
        });

        var ctx = { org: config.organization, userEmail: config.user, domain: null };

        await check('auth', 'newOrganizationFinder', 'findByName(organization)', async function () {
            var response = await api.newOrganizationFinder().findByName(config.organization);
            var org = body(response) || {};
            ctx.domain = org.domain || config.organization;
            return response;
        });

        // ------------------------------------------------------------ lane 3: every search builder

        var searchNames = methodsOf(api)
            .filter(function (n) {
                return /SearchBuilder$/.test(n);
            })
            .sort();

        for (var i = 0; i < searchNames.length; i++) {
            var name = searchNames[i];
            var recipe = Object.prototype.hasOwnProperty.call(SEARCH_RECIPES, name) ? SEARCH_RECIPES[name] : DEFAULT_SEARCH;
            if (recipe === null) {
                skip(
                    'search',
                    name,
                    'needs a caller-supplied target',
                    'addresses an arbitrary URL, so there is nothing generic to ask for'
                );
                continue;
            }
            await runSearch(name, recipe);
        }

        async function runSearch(name, recipe) {
            var search;
            try {
                search = recipe(api[name](), ctx);
            } catch (error) {
                record('search', name, 'build()', 'fail', 0, 'build threw: ' + (error.message || '').slice(0, 140));
                return;
            }
            if (!search) {
                skip('search', name, 'needs a harvested identifier', 'nothing in this organization to scope it to');
                return;
            }
            var row = await check('search', name, 'limit(1,1).build().execute()', function () {
                return search.execute();
            });
            // Harvest whatever this search can contribute to the finder lane.
            Object.keys(HARVEST_SOURCE).forEach(function (key) {
                if (HARVEST_SOURCE[key] !== name || ctx[key]) return;
                if (row.outcome !== 'pass') return;
                try {
                    var found = HARVEST[key](row.__response);
                    if (found !== undefined && found !== null && found !== '') ctx[key] = found;
                } catch (e) {
                    /* nothing to harvest */
                }
            });
        }

        // ------------------------------------------------------------ lane 4: catalogues and helpers

        var catalogueNames = methodsOf(api)
            .filter(function (n) {
                return /Catalog$|Helper$/.test(n);
            })
            .sort();

        for (var c = 0; c < catalogueNames.length; c++) {
            var cname = catalogueNames[c];
            var instance = null;
            try {
                instance = api[cname]();
            } catch (error) {
                skip('catalogue', cname, 'factory', 'needs an argument: ' + (error.message || '').slice(0, 90));
                continue;
            }
            var getters = methodsOf(instance).filter(function (m) {
                return /^get/.test(m) && instance[m].length === 0;
            });
            if (!getters.length) {
                skip('catalogue', cname, 'no zero-argument getter', 'nothing to call without inventing arguments');
                continue;
            }
            for (var g = 0; g < getters.length; g++) {
                await callGetter(cname, instance, getters[g]);
            }
        }

        async function callGetter(cname, instance, getter) {
            await check('catalogue', cname, getter + '()', function () {
                return instance[getter]();
            });
        }

        // ------------------------------------------------------------ lane 5: finders, organization level

        var finderNames = methodsOf(api)
            .filter(function (n) {
                return /^new.*Finder$/.test(n);
            })
            .sort();

        for (var f = 0; f < finderNames.length; f++) {
            await runOrgFinder(finderNames[f]);
        }

        async function runOrgFinder(fname) {
            var instance;
            try {
                instance = api[fname]();
            } catch (error) {
                skip('finder', fname, 'factory', 'needs an argument: ' + (error.message || '').slice(0, 90));
                return;
            }
            var ms = methodsOf(instance);
            if (ms.indexOf('findByOrganization') !== -1) {
                var row = await check('finder', fname, 'findByOrganization(org)', function () {
                    return instance.findByOrganization(ctx.org);
                });
                harvestFromFinder(fname, row);
            }
            if (ms.indexOf('findAll') !== -1) {
                var all = await check('finder', fname, 'findAll()', function () {
                    return api[fname]().findAll();
                });
                harvestFromFinder(fname, all);
            }
        }

        function harvestFromFinder(fname, row) {
            if (!row || row.outcome !== 'pass' || !row.__response) return;
            var mapping = {
                newManufacturersFinder: 'manufacturerId',
                newProvisionProcessorsFinder: 'processorId',
                newTimeserieFinder: 'timeserieId',
                newOrganizationPlansFinder: 'orgPlanId',
                newDevicePlansFinder: 'devicePlanId',
                newSoftwareFinder: 'softwareId',
                newDatasetFinder: 'datasetName',
                newOrganizationManufacturersFinder: 'orgManufacturerId'
            };
            var key = mapping[fname];
            if (!key || ctx[key]) return;
            try {
                var found = HARVEST[key](row.__response);
                if (found !== undefined && found !== null && found !== '') ctx[key] = found;
            } catch (e) {
                /* nothing to harvest */
            }
            if (fname === 'newTimeserieFinder' && !ctx.timeserieName) {
                try {
                    ctx.timeserieName = HARVEST.timeserieName(row.__response);
                } catch (e) {
                    /* nothing to harvest */
                }
            }
        }

        // ------------------------------------------------------------ lane 6: finders that need an id

        for (var d = 0; d < ID_FINDERS.length; d++) {
            await runIdFinder(ID_FINDERS[d]);
        }

        async function runIdFinder(spec) {
            var label = spec.method + '(' + spec.needs + ')';
            if (!ctx[spec.needs]) {
                skip('chained', spec.factory, label, 'no ' + spec.needs + ' found in this organization to chain from');
                return;
            }
            var instance;
            try {
                instance = api[spec.factory]();
            } catch (error) {
                skip('chained', spec.factory, label, 'factory needs an argument');
                return;
            }
            if (typeof instance[spec.method] !== 'function') {
                record('chained', spec.factory, label, 'fail', 0, spec.method + ' is not a function on this finder');
                return;
            }
            await check('chained', spec.factory, spec.method + '(' + [].concat(spec.args(ctx)).join(', ') + ')', function () {
                return instance[spec.method].apply(instance, spec.args(ctx));
            });
        }

        // ------------------------------------------------------------ lane 7: writes, off by default
        //
        // Scoped to an Area on purpose: it is metadata, so nothing here touches a device, a
        // datastream or data collection. The full cycle is create, read back, update, read back,
        // delete, confirm gone -- which is the only way to cover POST, PUT, DELETE and the Location
        // header against the real platform. The name carries a timestamp so a failed run leaves
        // something identifiable rather than colliding with the next one.

        if (!config.allowWrites) {
            skip(
                'write',
                'the write lane',
                'create, update and delete an Area',
                'off unless allowWrites is set; the default run writes nothing'
            );
        } else {
            await runWriteLane();
        }

        async function runWriteLane() {
            var identifier = 'e2e-verify-' + Date.now();
            var created = await check('write', 'areasBuilder', 'create() ' + identifier, function () {
                return api
                    .areasBuilder()
                    .withOrganization(ctx.org)
                    .withIdentifier(identifier)
                    .withName(identifier)
                    .withDescription('Temporary area created by the opengate-js e2e run. Safe to delete.')
                    .create();
            });
            if (created.outcome !== 'pass') {
                skip('write', 'the rest of the write lane', 'nothing was created', 'skipped so nothing is left behind');
                return;
            }
            await check('write', 'newAreaFinder', 'findByOrganizationAndIdentifier() after create', function () {
                return api.newAreaFinder().findByOrganizationAndIdentifier(ctx.org, identifier);
            });
            await check('write', 'areasBuilder', 'update() ' + identifier, function () {
                return api
                    .areasBuilder()
                    .withOrganization(ctx.org)
                    .withIdentifier(identifier)
                    .withDescription('Updated by the e2e run.')
                    .update();
            });
            await check('write', 'newAreaFinder', 'findByOrganizationAndIdentifier() after update', function () {
                return api.newAreaFinder().findByOrganizationAndIdentifier(ctx.org, identifier);
            });
            await check('write', 'areasBuilder', 'delete() ' + identifier, function () {
                return api.areasBuilder().withOrganization(ctx.org).withIdentifier(identifier).delete();
            });
            var gone = await check('write', 'newAreaFinder', 'findByOrganizationAndIdentifier() after delete', function () {
                return api.newAreaFinder().findByOrganizationAndIdentifier(ctx.org, identifier);
            });
            // Gone means the read must NOT succeed. A pass here is the failure.
            record(
                'write',
                'cleanup',
                'the area is gone',
                gone.outcome === 'pass' ? 'fail' : 'pass',
                0,
                gone.outcome === 'pass' ? 'the area still exists after delete()' : 'confirmed removed (' + gone.outcome + ')'
            );
        }

        results.forEach(function (row) {
            delete row.__response;
        });
        return { runtime: runtime, requests: requests, results: results, context: ctx };
    }

    return { run: run };
});
