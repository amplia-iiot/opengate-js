'use strict';

import InternalOpenGateAPI from './src/InternalOpenGateAPI';
import NorthAmpliaREST from './src/util/NorthAmpliaREST';
import SouthAmpliaREST from './src/util/SouthAmpliaREST';

/** @typedef {import('./src/InternalOpenGateAPI').OpenGateOptions} OpenGateOptions */

export default class OpenGateAPI extends InternalOpenGateAPI {
    /**
     * @param {import('./src/InternalOpenGateAPI').OpenGateOptions & Record<string, unknown>} _options - the client's
     * configuration; see the README's Configuration section.
     */
    constructor(_options) {
        super(
            new NorthAmpliaREST(_options, {
                'Content-type': 'application/json;charset=utf8'
            }),
            new SouthAmpliaREST(_options, {
                'Content-type': 'application/json;charset=utf8'
            }),
            _options
        );
    }
}
