'use strict';

import InternalOpenGateAPI from './src/InternalOpenGateAPI';
import NorthAmpliaREST from './src/util/NorthAmpliaREST';
import SouthAmpliaREST from './src/util/SouthAmpliaREST';

export default class OpenGateAPI extends InternalOpenGateAPI {
    constructor(_options) {
        super(new NorthAmpliaREST(_options), new SouthAmpliaREST(_options), _options);
    }
}

// Guarded so the bundle can be imported where there is no window -- a Nuxt or Next server render,
// for one. Assigning unconditionally made `import 'opengate-js/dist/opengate-api-bower-X.Y.Z'` throw
// `window is not defined` on the server, which is a strange way for a browser bundle to behave when
// the alternative is one line.
if (typeof window !== 'undefined') {
    window.OpenGateAPI = OpenGateAPI;
}
