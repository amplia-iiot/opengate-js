import NorthAmpliaREST from './NorthAmpliaREST';

export default class SouthAmpliaREST extends NorthAmpliaREST {

    constructor(_options, headers) {
        super(_options, headers);
    }

    _url(options) {
        return options.south.url;
    }
}