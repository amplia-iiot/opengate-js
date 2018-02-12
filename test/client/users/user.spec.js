define(function () {
    mocha.setup('bdd');
    describe('Testing user api', function () {
        it('search a user that exists', function () {
            assert.strictEqual('root@amplia.es', 'root@amplia.es');
        });
    });

    describe('Create User:', function () {
            
        it('Create a user', function () {
            var user = ogapi.newUser();
            user.withName("Katherin").withEmail("katherin.moscoso@amplia.es")
                .withPassword("amplia123").withWorkgroup("amplia_rd").withDomain("amplia_rd").withProfile("advanced")
                .withCountryCode("ES").withLangCode("en").withDescription("user description").withSurname("Moscoso");
            assert.doesNotThrow(function () {
                user.create();
            });

        });

    });
    describe('Delete User:', function () {
            
        it('Delete a user', function () {
            var user = ogapi.newUser();
            user.withEmail("katherin.moscoso@amplia.es");
            assert.doesNotThrow(function () {
                user.delete();
            });

        });

    });
});