'use strict';

import InternalOpenGateAPI from './src/InternalOpenGateAPI';
import NorthAmpliaREST from './src/util/NorthAmpliaREST';
import SouthAmpliaREST from './src/util/SouthAmpliaREST';

/**
 * OpenGateAPI
 * @class
 * @extends InternalOpenGateAPI
 * @example
 * const api = new OpenGateAPI({
 *     url: 'http://localhost:8080',
 *     port: '8080',
 *     version: 'v80',
 *     apiKey: 'apiKey',
 *     jwt: 'jwt',
 *     south: {
 *         url: 'http://localhost:8080'
 *     }
 * });
 */
export default class OpenGateAPI extends InternalOpenGateAPI {
    constructor(_options) {
        super(
            new NorthAmpliaREST(_options, {
                'Content-type': "application/json;charset=utf8"
            }),
            new SouthAmpliaREST(_options, {
                'Content-type': "application/json;charset=utf8"
            }),
            _options
        );
    }
}