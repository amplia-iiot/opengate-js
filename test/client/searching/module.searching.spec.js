define(function () {
	mocha.setup('bdd');
	/** @test {InternalOpenGateAPI} */
	describe('Check if all searching modules exists:', function () {
		/** @test {InternalOpenGateAPI#newQuickSearch} */
		it('Exist newQuickSearch function', function () {
			assert.isFunction(ogapi.newQuickSearch, 'Module newQuickSearch is not loaded');
		});
		/** @test {InternalOpenGateAPI#rawSearchBuilder} */
		it('Exist rawSearchBuilder function', function () {
			assert.isFunction(ogapi.rawSearchBuilder, 'Module rawSearchBuilder is not loaded');
		});
		/** @test {InternalOpenGateAPI#devicesSearchBuilder} */
		it('Exist Builder devicesSearchBuilder function', function () {
			assert.isFunction(ogapi.devicesSearchBuilder, 'Builder devicesSearchBuilder is not loaded');
		});
		/** @test {InternalOpenGateAPI#subscriptionsSearchBuilder} */
		it('Exist Builder subscriptionsSearchBuilder function', function () {
			assert.isFunction(ogapi.subscriptionsSearchBuilder, 'Builder subscriptionsSearchBuilder is not loaded');
		});
		/** @test {InternalOpenGateAPI#subscribersSearchBuilder} */
		it('Exist Builder subscribersSearchBuilder function', function () {
			assert.isFunction(ogapi.subscribersSearchBuilder, 'Builder subscribersSearchBuilder is not loaded');
		});
		/** @test {InternalOpenGateAPI#communicationsModulesSearchBuilder} */
		it('Exist Builder communicationsModulesSearchBuilder function', function () {
			assert.isFunction(ogapi.communicationsModulesSearchBuilder, 'Builder communicationsModulesSearchBuilder is not loaded');
		});
		/** @test {InternalOpenGateAPI#operationsSearchBuilder} */
		it('Exist Builder operationsSearchBuilder function', function () {
			assert.isFunction(ogapi.operationsSearchBuilder, 'Builder operationsSearchBuilder is not loaded');
		});
		/** @test {InternalOpenGateAPI#executionsSearchBuilder} */
		it('Exist Builder executionsSearchBuilder function', function () {
			assert.isFunction(ogapi.executionsSearchBuilder, 'Builder executionsSearchBuilder is not loaded');
		});
		/** @test {InternalOpenGateAPI#alarmsSearchBuilder} */
		it('Exist Builder alarmsSearchBuilder function', function () {
			assert.isFunction(ogapi.alarmsSearchBuilder, 'Builder alarmsSearchBuilder is not loaded');
		});
		/** @test {InternalOpenGateAPI#bundlesSearchBuilder} */
		it('Exist Builder bundlesSearchBuilder function', function () {
			assert.isFunction(ogapi.bundlesSearchBuilder, 'Builder bundlesSearchBuilder is not loaded');
		});
	});
});


