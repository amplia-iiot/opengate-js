define(function() {
    mocha.setup('bdd');
    /** @test {InternalOpenGateAPI#datapointsSearchBuilder} */
    describe('Check funcionality devicesBuilder module:', function() {
        it('Create new devicesBuilder object', function() {
            var device = null;
            ogapi.entityBuilder.deviceBuilder("organization_Dani")
                .then(function(res) {
                    console.log(res);
                    device = res;
                    device.with("provision.administration.channel", "default_channel");
                    device.with("provision.administration.organization", "organization_Dani");
                    device.with("provision.administration.serviceGroup", "emptyServiceGroup");
                    device.withEntityKey("KateDevice");
                    device.with("provision.device.description", "dev-description");
                })
                .catch(function(err) {
                    console.log(err);
                });

            //device.with("", "");
            assert.isDefined(ogapi.entityBuilder.devicesBuilder("organization_Dani"));

        });
    });


    describe('Check funcionality devicesBuilder module:', function() {
        it('Create new subscribersBuilder object', function() {
            var entity = null;
            ogapi.entityBuilder.subscribersBuilder("organization_Dani")
                .then(function(res) {
                    console.log(res);
                    entity = res;
                    entity.with("provision.administration.channel", "default_channel");
                    entity.with("provision.administration.organization", "organization_Dani");
                    entity.with("provision.administration.serviceGroup", "emptyServiceGroup");
                })
                .catch(function(err) {
                    console.log(err);
                });

            //device.with("", "");
            assert.isDefined(ogapi.entityBuilder.devicesBuilder("organization_Dani"));

        });
    });


    describe('Check funcionality devicesBuilder module:', function() {
        it('Create new subscribersBuilder object', function() {
            var entity = null;
            ogapi.entityBuilder.subscriptionsBuilder("organization_Dani")
                .then(function(res) {
                    console.log(res);
                    entity = res;
                })
                .catch(function(err) {
                    console.log(err);
                });

            //device.with("", "");
            assert.isDefined(ogapi.entityBuilder.devicesBuilder("organization_Dani"));

        });
    });



    /*  it('Check urls:', function() {
          assert.strictEqual(ogapi.datapointsSearchBuilder()
              .withDeviceId('myDevice')
              .build()._resource, 'search/iot/datapoints');
      });*/
});