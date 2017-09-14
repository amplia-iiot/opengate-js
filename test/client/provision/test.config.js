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
    '../../../dist/opengate-api-bower-1.14.0.js',
    'devices.provision.spec.js'
    // FILE(S) BEING TESTED
], function(chai, chaiAsPromised, Ex, WB) {
    chai.use(chaiAsPromised);
    window.assert = chai.assert;
    window.ogapi = new window.OpenGateAPI({
        apiKey: "2829be88-a7d7-4f51-aefc-3cc2385b6506",
        url: 'http://172.19.18.96:25281/v80'
    });
    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }
});