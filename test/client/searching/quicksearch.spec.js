define(function () {
	mocha.setup('bdd'); 
	/** @test {InternalOpenGateAPI} */
	describe('Check funcionality newQuickSearch module:', function(){
		/** @test {InternalOpenGateAPI#newQuickSearch} */
		it('Create new QuickSearch object', function(){
			assert.isDefined(ogapi.newQuickSearch());
		});
		/** @test {InternalOpenGateAPI#newQuickSearch} */
		it('Set string parameter and get filter', function(){
			assert.isDefined(ogapi.newQuickSearch("myDevice")._filter());
		});
		/** @test {InternalOpenGateAPI#newQuickSearch} */
		it('Set string parameter and check filter', function(){
			var quickSearch = ogapi.newQuickSearch('myDevice');
			var filterContainer = quickSearch._filter();		
			for (var i = 0; i < filterContainer.filter.or.length; i++) {
				var likeItem = filterContainer.filter.or[i];                
				for(var prop in likeItem.like){                                 
					assert.include(quickSearch._defaultParameters(), prop);                           
					assert.strictEqual(likeItem.like[prop], 'myDevice');
				}               
			}
		});	
	});
});
