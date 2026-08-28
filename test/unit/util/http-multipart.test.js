/**
 * What the multipart requests actually put on the wire.
 *
 * This had no coverage at all, and it is where a transport swap breaks things without saying so:
 * fetch's FormData accepts only strings and Blobs, while callers pass file paths, read streams and
 * Blobs, and superagent gave each of those a different meaning. `_prepareMultipartForm` maps eleven
 * form keys onto `.field()` and `.attach()`, and those two mean different things -- a string given
 * to `.attach()` is a *path*, which is why `Certificates.create` sends `form.certificate = rawFile`
 * only when `rawFile` is a string.
 *
 * The requests are answered by a loopback server that keeps the raw body, which is then parsed back
 * with `Response.formData()` so the assertions are about bytes that really travelled.
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createServer } from 'node:http';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import NorthAmpliaREST from '../../../src/util/NorthAmpliaREST';

let server;
let origin;
let lastRequest;
let workDir;

beforeAll(async () => {
    server = createServer((req, res) => {
        const chunks = [];
        req.on('data', c => chunks.push(c));
        req.on('end', () => {
            lastRequest = { method: req.method, headers: req.headers, body: Buffer.concat(chunks) };
            res.writeHead(201, { Location: 'https://example.invalid/thing/1' });
            res.end();
        });
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    origin = `http://127.0.0.1:${server.address().port}`;
    workDir = await mkdtemp(path.join(tmpdir(), 'ogapi-multipart-'));
});

afterAll(async () => {
    await new Promise(resolve => server.close(resolve));
    await rm(workDir, { recursive: true, force: true });
});

const api = () => new NorthAmpliaREST({ url: origin, apiKey: 'the-key', timeout: 5000 }, {});

/** Parses the body the server received back into a FormData, so parts can be inspected. */
async function sentForm() {
    const parsed = await new Response(lastRequest.body, { headers: { 'content-type': lastRequest.headers['content-type'] } }).formData();
    const parts = {};
    for (const [key, value] of parsed.entries()) {
        const entry = typeof value === 'string' ? { field: value } : { filename: value.name, type: value.type, text: await value.text() };
        if (parts[key]) parts[key] = [].concat(parts[key], entry);
        else parts[key] = entry;
    }
    return parts;
}

const post = form => api().post_multipart('things', form, {}, 5000, undefined, undefined, 'base');

describe('the keys that become plain fields', () => {
    it('sends meta, json and file as fields', async () => {
        await post({ meta: '{"a":1}', json: '{"b":2}', file: 'contents' });
        const parts = await sentForm();
        expect(parts.meta).toEqual({ field: '{"a":1}' });
        expect(parts.json).toEqual({ field: '{"b":2}' });
        expect(parts.file).toEqual({ field: 'contents' });
    });

    it('sends script and modelFile as fields', async () => {
        await post({ script: 'print(1)', modelFile: 'model' });
        const parts = await sentForm();
        expect(parts.script).toEqual({ field: 'print(1)' });
        expect(parts.modelFile).toEqual({ field: 'model' });
    });

    it('keeps a Blob given to a field key as a file part, which is how the media builders send JSON', async () => {
        await post({ json: new Blob(['{"a":1}'], { type: 'application/json' }) });
        const parts = await sentForm();
        expect(parts.json.type).toBe('application/json');
        expect(parts.json.text).toBe('{"a":1}');
    });
});

describe('the keys that become attachments', () => {
    it('reads a certificate given as a path from disk, because a string is a path', async () => {
        const file = path.join(workDir, 'client.pem');
        await writeFile(file, 'PEM BODY');
        await post({ json: '{"a":1}', certificate: file });
        const parts = await sentForm();
        // Renamed to `file`, as _prepareMultipartForm does for certificate, hardwareMedia and
        // processorBulkFile alike.
        expect(parts.file.filename).toBe('client.pem');
        expect(parts.file.text).toBe('PEM BODY');
        expect(parts.certificate).toBeUndefined();
    });

    it('sends a Blob certificate as it stands', async () => {
        await post({ certificate: new Blob(['PEM BODY'], { type: 'application/x-pem-file' }) });
        const parts = await sentForm();
        expect(parts.file.type).toBe('application/x-pem-file');
        expect(parts.file.text).toBe('PEM BODY');
    });

    it('sends metadata under its own name', async () => {
        await post({ metadata: new Blob(['{"a":1}'], { type: 'application/json' }) });
        const parts = await sentForm();
        expect(parts.metadata.text).toBe('{"a":1}');
    });

    it('attaches each entry of files, naming it and typing it from its extension', async () => {
        const csv = path.join(workDir, 'rows.csv');
        const py = path.join(workDir, 'run.py');
        await writeFile(csv, 'a,b');
        await writeFile(py, 'print(1)');
        await post({ files: [createReadStream(csv), createReadStream(py)] });
        const parts = await sentForm();
        const sent = [].concat(parts.files);
        expect(sent.map(p => p.filename).sort()).toEqual(['rows.csv', 'run.py']);
        expect(sent.find(p => p.filename === 'rows.csv').type).toBe('text/csv');
        expect(sent.find(p => p.filename === 'rows.csv').text).toBe('a,b');
        // mime-types has no answer for .py, so _prepareMultipartForm names the type itself.
        expect(sent.find(p => p.filename === 'run.py').type).toBe('text/x-python');
    });
});

describe('the keys that are not multipart at all', () => {
    it('sends bulkFile as the raw body, under the content type from ext', async () => {
        await post({ bulkFile: 'a,b\n1,2', ext: 'text/csv' });
        expect(lastRequest.headers['content-type']).toBe('text/csv');
        expect(lastRequest.body.toString()).toBe('a,b\n1,2');
    });

    it('sends an unrecognised form as a JSON body', async () => {
        await post({ whatever: 'value' });
        expect(lastRequest.headers['content-type']).toContain('application/json');
        expect(JSON.parse(lastRequest.body.toString())).toEqual({ whatever: 'value' });
    });

    it('passes a FormData built by the caller straight through, as the browser paths build it', async () => {
        const form = new FormData();
        form.append('json', new Blob(['{"a":1}'], { type: 'application/json' }));
        form.append('file', new Blob(['bytes']), 'thing.bin');
        await post(form);
        const parts = await sentForm();
        expect(parts.json.text).toBe('{"a":1}');
        expect(parts.file.filename).toBe('thing.bin');
    });
});

describe('upload progress', () => {
    // fetch reports no upload progress in any runtime, and withProgressEvent is public API on
    // ManufacturerMedia, ModelMedia and DeploymentElement. In Node the body is streamed through a
    // counter so the numbers are real rather than one event faked at the end.
    it('reports bytes as they go out, ending at the full size', async () => {
        const seen = [];
        const payload = 'x'.repeat(200000);
        await api().post_multipart(
            'things',
            { file: payload },
            { progress: event => seen.push(event) },
            5000,
            undefined,
            undefined,
            'base'
        );

        expect(seen.length).toBeGreaterThan(0);
        expect(seen.every(event => event.direction === 'upload')).toBe(true);
        expect(seen.every(event => event.total >= payload.length)).toBe(true);
        const last = seen[seen.length - 1];
        expect(last.loaded).toBe(last.total);
        expect(last.percent).toBe(100);
        // Monotonic, so a consumer driving a progress bar never sees it go backwards.
        expect(seen.map(e => e.loaded)).toEqual([...seen.map(e => e.loaded)].sort((a, b) => a - b));
    });

    it('still sends the right body when progress is being reported', async () => {
        await api().post_multipart('things', { meta: '{"a":1}' }, { progress: () => {} }, 5000, undefined, undefined, 'base');
        const parts = await sentForm();
        expect(parts.meta).toEqual({ field: '{"a":1}' });
    });
});
