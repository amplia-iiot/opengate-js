import NorthAmpliaREST from './NorthAmpliaREST';

export default class SouthAmpliaREST extends NorthAmpliaREST {

    constructor(_options, headers) {
        super(_options, headers);
        this._isSouth = true
    }

    _url(options) {
        return options.south.url;
    }
}