define(function () {
	mocha.setup('bdd'); 
	/** @test {InternalOpenGateAPI#rawSearchBuilder} */
	describe('Check funcionality newRawSearch module:', function(){
		it('Create new RawSearch object', function(){
			assert.isDefined(ogapi.rawSearchBuilder());
		});
		
		/** @test {InternalOpenGateAPI#rawSearchBuilder} */
		it('Set string parameter and get filter', function(){
			var filter = { "filter": { "and": [{ "like": { "entityId": "0000000000000001" } }] } };
			assert.isDefined(ogapi.rawSearchBuilder().filter(filter).from("").build()._filter());
		});

		/** @test {InternalOpenGateAPI#rawSearchBuilder} */
		it('Set string parameter and check filter', function(){
			var filter = {"filter":{"and": [{"like": {"entityId": "0000000000000001"}}]}};
			var rawSearch = ogapi.rawSearchBuilder().from("").filter(filter).build();
			var filterContainer = rawSearch._filter();
			assert.strictEqual(filterContainer.filter, filter);
		});

		/** @test {InternalOpenGateAPI#rawSearchBuilder} */
		it('Set custom url and check', function(){
			var rawSearch = ogapi.rawSearchBuilder().from("/test/resource").build();
			var resource = rawSearch._resource;
			assert.strictEqual(resource, "search/test/resource");
		});

		/** @test {InternalOpenGateAPI#rawSearchBuilder} */
		it('Url is mandatory field', function(){
			assert.throws(function(){ogapi.rawSearchBuilder().from();},"Url parameter is mandatory and must be a string");
			
		});

		/** @test {InternalOpenGateAPI#rawSearchBuilder} */
		it('Url is mandatory field on build', function(){
			assert.throws(function(){ogapi.rawSearchBuilder().build();},"Url parameter is mandatory and must be a string");
			
		});
        /** @test {InternalOpenGateAPI#rawSearchBuilder} */
        it('Set string parameter, check filter and limit', function(){
            var filter = {};
            var limit = {"start":1, "size":1000};
            var rawSearch = ogapi.rawSearchBuilder().from("/catalog/hardwares").filter(filter).limit(limit).build();
            var filterContainer = rawSearch._filter();
			assert.strictEqual(filterContainer.filter, filter);
			assert.strictEqual(filterContainer.limit, limit);
        });

	});
});