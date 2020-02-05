define(function() {
    mocha.setup('bdd');
    /** @test {InternalOpenGateAPI#bundlesBuilder()} */
    describe('Check funcionality bundles module:', function() {
        var bundle;
        before(function() {
            bundle = ogapi.bundlesBuilder();
        });
        /** @test {InternalOpenGateAPI#bundlesBuilder} */
        describe('Check basic parameters:', function() {

            it('Name is not a String', function() {
                assert.throws(function() {
                    ogapi.bundlesBuilder().withName(11);
                }, "Parameter name must be a string and has a maximum length of 255");

            });

         
        });
       


    });
});
