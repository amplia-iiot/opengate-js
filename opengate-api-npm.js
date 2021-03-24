'use strict';

import InternalOpenGateAPI from './src/InternalOpenGateAPI';
import NorthAmpliaREST from './src/util/NorthAmpliaREST';
import SouthAmpliaREST from './src/util/SouthAmpliaREST';


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