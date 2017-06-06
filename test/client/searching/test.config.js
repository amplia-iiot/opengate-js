require.config({
    // ...paths and stuff
    baseUrl: '../../../bower_components',
    paths: {
        'chai': 'chai/chai',
        'chai-as-promised': 'chai-as-promised/lib/chai-as-promised'
    }
});

require([
    'chai', 'chai-as-promised',
    '../../../bower_components/es6-promise/es6-promise.js',
    '../../../dist/opengate-api-bower-1.5.0.js',
    'FilterBuilder.spec.js',
    'module.searching.spec.js',
    'quicksearch.spec.js',
    'rawsearch.spec.js',
    'datapoints.search.spec.js',
    'search.spec.js'
    // FILE(S) BEING TESTED
], function(chai, chaiAsPromised, Ex, WB) {
    chai.use(chaiAsPromised);
    window.assert = chai.assert;
    window.ogapi = new window.OpenGateAPI({
        apiKey: "require-real-apikey"
    });
    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }
});