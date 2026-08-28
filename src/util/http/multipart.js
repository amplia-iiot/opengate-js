'use strict';

import mime from 'mime-types';

/**
 * Turns the parts collected by `.field()` and `.attach()` into a real `FormData`.
 *
 * The awkward part is that callers pass files three different ways, and superagent gave each a
 * different meaning that has to be preserved:
 *
 *   - A **string** passed to `.attach()` is a file *path*, not the file's contents. That is
 *     superagent's rule, and the library relies on it: `Certificates.create` sends
 *     `form.certificate = rawFile` precisely when `rawFile` is a string, and the platform receives a
 *     file. Read it from disk.
 *   - A **stream** (anything with `.path`, i.e. `fs.createReadStream()`) is read from that path.
 *     `fs.openAsBlob` does it without buffering the whole file, and only when we are in Node.
 *   - A **Blob or File** is used as it stands. The library builds these itself in `Certificates`,
 *     `ModelMedia` and `TimeseriesFunction`.
 *
 * A string passed to `.field()` stays a plain field, which is the other half of the rule.
 */

/**
 * @return {boolean} whether we are running somewhere with a filesystem.
 */
function _isNode() {
    return typeof process !== 'undefined' && !!process.versions && !!process.versions.node;
}

function _basename(pathLike) {
    return String(pathLike).replace(/^.*[\\/]/, '');
}

/**
 * Reads a path into a Blob, preferring the API that does not pull the file into memory.
 * @param {!string} path - the file to read.
 * @param {?string} contentType - the type to stamp on the Blob.
 * @return {Promise<Blob>}
 */
async function _blobFromPath(path, contentType) {
    const fs = await import('node:fs');
    if (typeof fs.openAsBlob === 'function') {
        const blob = await fs.openAsBlob(path, contentType ? { type: contentType } : undefined);
        return blob;
    }
    const buffer = await fs.promises.readFile(path);
    return new Blob([buffer], contentType ? { type: contentType } : undefined);
}

/**
 * Coerces one attachment into something `FormData.append` accepts.
 * @param {*} file - a path, a stream, a Blob, a Buffer or a typed array.
 * @param {object} options - `{ filename, contentType }`, as superagent's third argument.
 * @return {Promise<{value: Blob, filename: ?string}>}
 */
async function _toFilePart(file, options) {
    const opts = typeof options === 'string' ? { filename: options } : options || {};

    if (typeof file === 'string') {
        if (!_isNode()) {
            // In a browser there is no path to read, and silently sending the string as a field
            // would upload the wrong thing under a name that says otherwise.
            throw new Error('OGAPI_ATTACH_PATH_UNSUPPORTED_IN_BROWSER');
        }
        const filename = opts.filename || _basename(file);
        const contentType = opts.contentType || mime.lookup(filename) || undefined;
        return { value: await _blobFromPath(file, contentType), filename: filename };
    }

    if (file && typeof file.stream === 'function' && typeof file.size === 'number') {
        // Already a Blob or a File.
        return { value: file, filename: opts.filename || file.name || undefined };
    }

    if (file && typeof file.path === 'string') {
        // A read stream. Read from its path rather than draining it, so the file is streamed.
        const filename = opts.filename ? _basename(opts.filename) : _basename(file.path);
        const contentType = opts.contentType || mime.lookup(filename) || undefined;
        return { value: await _blobFromPath(file.path, contentType), filename: filename };
    }

    if (file && (typeof ArrayBuffer !== 'undefined' ? ArrayBuffer.isView(file) || file instanceof ArrayBuffer : false)) {
        return { value: new Blob([file], opts.contentType ? { type: opts.contentType } : undefined), filename: opts.filename || undefined };
    }

    if (file && typeof file.pipe === 'function') {
        // A stream with no path: there is nothing to do but collect it.
        const chunks = [];
        for await (const chunk of file) chunks.push(chunk);
        return { value: new Blob(chunks, opts.contentType ? { type: opts.contentType } : undefined), filename: opts.filename || undefined };
    }

    return {
        value: new Blob([String(file)], opts.contentType ? { type: opts.contentType } : undefined),
        filename: opts.filename || undefined
    };
}

/**
 * Builds the request body for a multipart request.
 * @param {!Array<object>} parts - what `.field()` and `.attach()` recorded, in order.
 * @return {Promise<FormData>}
 */
export async function buildFormData(parts) {
    const form = new FormData();
    for (const part of parts) {
        if (part.kind === 'field') {
            // A Blob given to .field() is still a file part -- that is how ManufacturerMedia sends
            // its JSON metadata -- so it is appended as it is rather than stringified.
            if (part.value && typeof part.value.stream === 'function' && typeof part.value.size === 'number') {
                form.append(part.name, part.value);
            } else {
                form.append(part.name, String(part.value));
            }
            continue;
        }
        const file = await _toFilePart(part.value, part.options);
        if (file.filename) form.append(part.name, file.value, file.filename);
        else form.append(part.name, file.value);
    }
    return form;
}

/**
 * Serialises a FormData into a Blob plus the Content-Type that describes it, boundary included.
 * Needed only when upload progress has to be reported in Node: the body must be a stream we can
 * count bytes through, and once it is a stream the boundary is ours to declare.
 * @param {!FormData} form
 * @return {Promise<{blob: Blob, contentType: string}>}
 */
export async function packFormData(form) {
    const packed = new Response(form);
    const contentType = packed.headers.get('content-type');
    return { blob: await packed.blob(), contentType: contentType };
}
