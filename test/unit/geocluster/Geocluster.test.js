import { describe, it, expect } from 'vitest';

import Geocluster from '../../../src/geocluster/Geocluster';

const projection = {
    point: '$provision.device.location.current.value.position.coordinates',
    locDate: '$provision.device.location.current.date',
    pid: '$provision.device.identifier.current.value',
    resourceType: '$resourceType.current.value',
    presence: "{$arrayElemAt:['$collected.device.communicationModules.subscription.presence.unifiedPresence.current.value', 0]}"
};

function recordingOgapi(statusCode, body) {
    const calls = [];
    const respond = () => Promise.resolve({ statusCode, header: {}, body });
    const ogapi = {
        Napi: {
            _options: { timeout: 5000 },
            post: (url, sent) => calls.push({ method: 'post', url, body: sent }) && respond(),
            put: (url, sent) => calls.push({ method: 'put', url, body: sent }) && respond(),
            delete: url => calls.push({ method: 'delete', url }) && respond()
        }
    };
    return { calls, ogapi };
}

// What reaches the wire: JSON drops the fields left undefined
const sent = call => JSON.parse(JSON.stringify(call.body));

function france(ogapi) {
    return new Geocluster(ogapi)
        .withIdentifier('entities.france')
        .withName('sc_france')
        .withChannels([{ organization: 'france', name: 'PARIS' }])
        .withProjection(projection);
}

describe('Geocluster.create', () => {
    it('posts the definition to provision/geocluster', async () => {
        const { calls, ogapi } = recordingOgapi(201);
        await france(ogapi).create();
        expect(calls.map(({ method, url }) => ({ method, url }))).toEqual([{ method: 'post', url: 'provision/geocluster' }]);
        expect(sent(calls[0])).toEqual({
            identifier: 'entities.france',
            name: 'sc_france',
            channels: [{ organization: 'france', name: 'PARIS' }],
            projection
        });
    });

    it('needs only identifier and name, as the platform does', async () => {
        const { calls, ogapi } = recordingOgapi(201);
        await new Geocluster(ogapi).withIdentifier('madrid.devices_movistar').withName('devices_movistar').create();
        expect(sent(calls[0])).toEqual({ identifier: 'madrid.devices_movistar', name: 'devices_movistar' });
    });

    it('demands identifier and name, naming the ones missing', () => {
        const { calls, ogapi } = recordingOgapi(201);
        expect(() => new Geocluster(ogapi).withProjection(projection).create()).toThrow(/Missing parameters: \[identifier,name\]/);
        expect(calls).toEqual([]);
    });

    it('sends every optional field that is set', async () => {
        const { calls, ogapi } = recordingOgapi(201);
        const filter = { 'resourceType.current.value': 'ENTITY_DEVICE' };
        await france(ogapi)
            .withTitle('France devices')
            .withFilter(filter)
            .withAggregation(JSON.stringify({ presence: '$mapcount' }))
            .withRegenerationCronPeriod('0 3 * * *')
            .withCollection('c_odm_entities')
            .create();
        expect(sent(calls[0])).toMatchObject({
            title: 'France devices',
            filter,
            aggregation: { presence: '$mapcount' },
            regenerationCronPeriod: '0 3 * * *',
            collection: 'c_odm_entities'
        });
    });
});

describe('Geocluster.update', () => {
    it('replaces the definition with a PUT to provision/geocluster/{identifier}', async () => {
        const { calls, ogapi } = recordingOgapi(200);
        const result = await france(ogapi).update();
        expect(calls.map(({ method, url }) => ({ method, url }))).toEqual([{ method: 'put', url: 'provision/geocluster/entities.france' }]);
        expect(sent(calls[0])).toEqual({
            identifier: 'entities.france',
            name: 'sc_france',
            channels: [{ organization: 'france', name: 'PARIS' }],
            projection
        });
        expect(result.statusCode).toBe(200);
    });

    it('demands a name, since the whole definition is replaced', () => {
        const { calls, ogapi } = recordingOgapi(200);
        expect(() => new Geocluster(ogapi).withIdentifier('entities.france').update()).toThrow(/Missing parameters: \[name\]/);
        expect(calls).toEqual([]);
    });
});

describe('Geocluster.clustering', () => {
    it('enqueues the clustering with a bodiless PUT and resolves with the task', async () => {
        const task = { taskId: 7, session_id: 'entities.france', phases: [], percentage: 0 };
        const { calls, ogapi } = recordingOgapi(200, task);
        const result = await new Geocluster(ogapi).withIdentifier('entities.france').clustering();
        expect(calls).toEqual([{ method: 'put', url: 'provision/geocluster/entities.france/clustering', body: undefined }]);
        expect(result).toEqual({ data: task, statusCode: 200 });
    });

    it('rejects when the geocluster is already being clustered', async () => {
        const { ogapi } = recordingOgapi(409);
        await expect(new Geocluster(ogapi).withIdentifier('entities.france').clustering()).rejects.toMatchObject({ statusCode: 409 });
    });
});

describe('Geocluster.delete', () => {
    it('deletes provision/geocluster/{identifier}', async () => {
        const { calls, ogapi } = recordingOgapi(200);
        const result = await new Geocluster(ogapi).withIdentifier('entities.france').delete();
        expect(calls).toEqual([{ method: 'delete', url: 'provision/geocluster/entities.france' }]);
        expect(result).toEqual({ statusCode: 200 });
    });
});

describe('Geocluster without an identifier', () => {
    it.each([['update'], ['clustering'], ['delete']])('%s sends nothing', method => {
        const { calls, ogapi } = recordingOgapi(200);
        expect(() => new Geocluster(ogapi).withName('sc_france')[method]()).toThrow();
        expect(calls).toEqual([]);
    });
});

describe('Geocluster field limits', () => {
    const builder = () => new Geocluster(recordingOgapi(201).ogapi);

    it('accepts an identifier of up to 100 letters, digits, _ . -', () => {
        expect(builder().withIdentifier('a'.repeat(100))._identifier).toHaveLength(100);
        expect(builder().withIdentifier('madrid.devices_movistar-2')._identifier).toBe('madrid.devices_movistar-2');
    });

    it.each([[''], ['a'.repeat(101)], ['with space'], ['slash/inside'], [42]])('rejects the identifier %j', identifier => {
        expect(() => builder().withIdentifier(identifier)).toThrow();
    });

    it.each([
        ['withName', 255],
        ['withTitle', 255],
        ['withCollection', 120]
    ])('%s accepts %i characters and rejects one more', (method, max) => {
        expect(() => builder()[method]('x'.repeat(max))).not.toThrow();
        expect(() => builder()[method]('x'.repeat(max + 1))).toThrow('OGAPI_STRING_PARAMETER');
    });

    it.each([['withName'], ['withCollection']])('%s rejects an empty string', method => {
        expect(() => builder()[method]('')).toThrow('OGAPI_STRING_PARAMETER');
    });

    it.each([
        [[]],
        [[{ organization: 'france' }]],
        [[{ organization: '', name: 'PARIS' }]],
        [[{ organization: 'france', name: '' }]],
        [[null]]
    ])('withChannels rejects %j', channels => {
        expect(() => builder().withChannels(channels)).toThrow();
    });
});

describe('Geocluster JSON fields', () => {
    const builder = () => new Geocluster(recordingOgapi(201).ogapi);

    it.each([['withProjection'], ['withFilter'], ['withAggregation']])('%s accepts a string holding a JSON object', method => {
        const geocluster = builder()[method](JSON.stringify(projection));
        expect(Object.values(geocluster).filter(value => value && value.point)).toEqual([projection]);
    });

    it.each([['withProjection'], ['withFilter'], ['withAggregation']])('%s rejects what is not a JSON object', method => {
        for (const value of ['not json', '[1, 2]', [1, 2], null, 42]) {
            expect(() => builder()[method](value)).toThrow('OGAPI_OBJECT_PARAMETER');
        }
    });
});

describe('Geocluster.withRegenerationCronPeriod', () => {
    const builder = () => new Geocluster(recordingOgapi(201).ogapi);

    it.each([['0 3 * * *'], ['*/5 * * * *'], ['0 0 3 * * *'], ['0 15 10 ? * MON-FRI'], ['0 0 L * *']])('accepts %j', cron => {
        expect(builder().withRegenerationCronPeriod(cron)._regenerationCronPeriod).toBe(cron);
    });

    it.each([
        ['* * * *'],
        ['0 15 10 ? * MON-FRI 2027'],
        ['every day'],
        ['0 0 * * * ;'],
        ['0 0 * * ' + '1,'.repeat(50) + '2'],
        [''],
        [null],
        [42]
    ])('rejects %j', cron => {
        expect(() => builder().withRegenerationCronPeriod(cron)).toThrow('OGAPI_CRON_EXPRESSION_PARAMETER');
    });
});
