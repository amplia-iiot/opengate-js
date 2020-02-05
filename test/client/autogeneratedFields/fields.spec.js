define(function () {
    mocha.setup('bdd');

    describe('Testing fields finder api', function () {
        it('search a fields communicationsModulesSearchBuilder', function () {
            return ogapi.communicationsModulesSearchBuilder().findFields("sub").then(function (fields) {
                assert.notEqual(fields.length, 0);
            }).catch(function (err) {
                assert.strictEqual(true, false);
            });
        });

        it('search a fields communicationsModulesSearchBuilder', function () {
            return ogapi.communicationsModulesSearchBuilder().findFields("alarmAttentionDate.a").then(function (fields) {
                console.log(fields);
            }).catch(function (err) {
                assert.strictEqual(true, false);
            });
        });

        it('search a fields devicesSearchBuilder', function () {
            return ogapi.devicesSearchBuilder().findFields("sub").then(function (fields) {
                assert.notEqual(fields.length, 0);
            }).catch(function (err) {
                assert.strictEqual(true, false);
            });
        });

        it('search a fields devicesSearchBuilder with first level nested', function () {
            return ogapi.devicesSearchBuilder().findFields("subscription.asd").then(function (fields) {
                assert.notEqual(fields.length, 0);
            }).catch(function (err) {
                assert.strictEqual(true, false);
            });

        });

        it('search a fields devicesSearchBuilder with different level', function () {
            var fieldsSearching1, fieldsSearching2;
            ogapi.devicesSearchBuilder().findFields("subs").then(function (fields) {
                fieldsSearching1 = fields;
            }).catch(function (err) {
                assert.strictEqual(true, false);
            });

            ogapi.devicesSearchBuilder().findFields("subscription.").then(function (fields) {
                fieldsSearching2 = fields;
                assert.notEqual(fieldsSearching1.length, fieldsSearching2.length);
            }).catch(function (err) {
                assert.strictEqual(true, false);
            });
        });

        it('search a fields devicesSearchBuilder that does not exist', function () {

            ogapi.devicesSearchBuilder().findFields("subscription.relColl.prov").then(function (fields) {
                assert.equal(fields.length, 0);
            }).catch(function (err) {
                assert.strictEqual(true, false);
            });
        });


        it('search a fields devicesSearchBuilder with second level nested', function () {
            return ogapi.devicesSearchBuilder().findFields("subscription.relColl.a").then(function (fields) {
                assert.notEqual(fields.length, 0);
            }).catch(function (err) {
                assert.strictEqual(true, false);
            });
        });

        it('search a fields operationsSearchBuilder', function () {
            return ogapi.operationsSearchBuilder().findFields("sub").then(function (fields) {
                assert.notEqual(fields.length, 0);
            }).catch(function (err) {
                assert.strictEqual(true, false);
            });
        });

        it('search a fields executionsSearchBuilder', function () {
            return ogapi.executionsSearchBuilder().findFields("sub").then(function (fields) {
                assert.notEqual(fields.length, 0);
            }).catch(function (err) {
                assert.strictEqual(true, false);
            });
        });
        it('search a fields alarmsSearchBuilder', function () {
            return ogapi.alarmsSearchBuilder().findFields("sub").then(function (fields) {
                assert.notEqual(fields.length, 0);
            }).catch(function (err) {
                assert.strictEqual(true, false);
            });
        });
        it('search a fields certificatesSearchBuilder', function () {
            return ogapi.certificatesSearchBuilder().findFields("").then(function (fields) {
                assert.notEqual(fields.length, 0);
            }).catch(function (err) {
                assert.strictEqual(true, false);
            });
        });

        it('search a fields bundlesSearchBuilder', function () {
            return ogapi.bundlesSearchBuilder().findFields("sub").then(function (fields) {
                assert.notEqual(fields.length, 0);
            }).catch(function (err) {
                assert.strictEqual(true, false);
            });
        });
    });
});