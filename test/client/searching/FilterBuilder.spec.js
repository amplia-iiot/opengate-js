
define(function () {
	mocha.setup('bdd'); 
	/** @test {InternalOpenGateAPI#newFilterBuilder} */
	describe('Check funcionality FilterBuilder module:', function(){						
		it('Create new FilterBuilder object', function(){			
			assert.isDefined(ogapi.newFilterBuilder);
		});
		/** @test {FilterBuilder#or} */
		it('Creating a logical operator \"or\"', function(){		
			assert.strictEqual(JSON.stringify(ogapi.newFilterBuilder().or()._filterTemplate), "{\"filter\":{\"or\":[]}}")
		});
		/** @test {FilterBuilder#and} */
		it('Creating a logical operator \"and\"', function(){		
			assert.strictEqual(JSON.stringify(ogapi.newFilterBuilder().and()._filterTemplate), "{\"filter\":{\"and\":[]}}")
		});
		/** @test {FilterBuilder#and} */
		it('Creating like inside the and', function(){
			assert.strictEqual(JSON.stringify(ogapi.newFilterBuilder().and(ogapi.EX.like("hello", "world"))._filterTemplate), "{\"filter\":{\"and\":[{\"like\":{\"hello\":\"world\"}}]}}")
		});
		/** @test {FilterBuilder#and} */
		it('Creating two operators inside the and', function(){
			var resul =  "{\"filter\":{\"and\":[{\"like\":{\"hello\":\"world\"}},{\"neq\":{\"hello\":\"world\"}}]}}"
			assert.strictEqual(JSON.stringify(ogapi.newFilterBuilder().and(ogapi.EX.like("hello", "world"), ogapi.EX.neq("hello", "world"))._filterTemplate), resul)
		});
	});
});