import NorthAmpliaREST from './NorthAmpliaREST';

/**
 * This is a constructor of a Rest api javascript
 * @param {{ url: string,port: string,version: string,apiKey: string,jwt: string}} _options - this is configuration about Opengate North API.
 * @param {function} backend - this is a backend selected to manage a request to Opengate North API.
 */
export default class SouthAmpliaREST extends NorthAmpliaREST {

    constructor(_options, headers) {
        super(_options, headers);
        this._isSouth = true
    }

    _url(options) {
        return options.south.url;
    }
}