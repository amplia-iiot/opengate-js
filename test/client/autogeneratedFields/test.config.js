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
    '../../../dist/opengate-api-bower-1.4.3.js',
    'fields.spec.js'
    // FILE(S) BEING TESTED
], function(chai, chaiAsPromised) {
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