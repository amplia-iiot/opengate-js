import NorthAmpliaREST from './NorthAmpliaREST';

export default class SouthAmpliaREST extends NorthAmpliaREST {
    constructor(_options, headers) {
        super(_options, headers);
        this._isSouth = true;
    }

    _url(options) {
        if (!options.south || !options.south.url) {
            // Without this the failure is a TypeError about reading url of undefined, thrown deep
            // inside URL composition, which says nothing about what the caller got wrong.
            throw new Error('OGAPI_SOUTH_URL_NOT_CONFIGURED');
        }
        return options.south.url;
    }
}
