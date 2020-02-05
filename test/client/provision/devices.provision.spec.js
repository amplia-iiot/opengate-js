define(function() {
    mocha.setup('bdd');
    /** @test {InternalOpenGateAPI#datapointsSearchBuilder} */
    describe('Check funcionality devicesBuilder module:', function() {
        it('Create new devicesBuilder object', function() {
            var entity = null;
            ogapi.entityBuilder.devicesBuilder("base_organization")
                .then(function(res) {
                    console.log(res);
                    entity = res;
                    entity.with("provision.administration.channel", "default_channel");
                    entity.with("provision.administration.organization", "base_organization");
                    entity.with("provision.administration.serviceGroup", "emptyServiceGroup");
                    entity.with("provision.device.identifier", "device_oux");
                })
                .catch(function(err) {
                    console.log(err);
                });

            //assert.isDefined(ogapi.entityBuilder.devicesBuilder("organization_Dani"));

        });
    });

    /**
     * 
     * var user = ogapi.usersBuilder();
user.withEmail("katherin.moscoso@amplia.es").withPassword("amplia")
.updatePassword("amplia123")
.then(function(res){console.log(res)})
.catch(function(err){console.log(err)})
    */
    /*

       
        describe('Check funcionality devicesBuilder module:', function() {
            it('Create new subscribersBuilder object', function() {
                var entity = null;
                ogapi.entityBuilder.subscribersBuilder("organization_UX")
                    .then(function(res) {
                        console.log(res);
                        entity = res;
                        entity.with("provision.administration.channel", "channel_1");
                        entity.with("provision.administration.organization", "organization_UX");
                        entity.with("provision.administration.serviceGroup", "emptyServiceGroup");
                        entity.with("provision.device.communicationModules[].subscriber.identifier", "s_1");
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
                        entity.with("provision.administration.channel", "channel_1");
                        entity.with("provision.administration.organization", "organization_UX");
                        entity.with("provision.administration.serviceGroup", "emptyServiceGroup");
                        entity.with("provision.device.communicationModules[].subscriber.identifier", "s_1");
                    })
                    .catch(function(err) {
                        console.log(err);
                    });

                //device.with("", "");
                assert.isDefined(ogapi.entityBuilder.devicesBuilder("organization_Dani"));

            });
        });

    */

    /*  describe('Check funcionality devicesBuilder module:', function() {
        it('Create new datamodel object', function() {
            var datamodel =  ogapi.datamodelsBuilder("organization_UX");
            datamodel.withName("name1").withIdentifier("id_2").withVersion("1.0.0")


        });
    });*/
});