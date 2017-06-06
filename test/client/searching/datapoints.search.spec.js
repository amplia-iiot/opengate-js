define(function () {
	mocha.setup('bdd'); 
	/** @test {InternalOpenGateAPI#datapointsSearchBuilder} */
	describe('Check funcionality datapointsSearchBuilder module:', function(){
		it('Create new datapointsSearchBuilder object', function(){
			assert.isDefined(ogapi.datapointsSearchBuilder());
		});		
	});

	describe('Setting a filter:', function(){
		it('withDeviceId', function(){
			assert.strictEqual(JSON.stringify(ogapi.datapointsSearchBuilder()
			.withDeviceId('myDevice')
			.build()._postObj.filter),'{"and":[{"eq":{"datapoint.device":"myDevice"}}]}');
		});		
		it('withDatastream', function(){
			assert.strictEqual(JSON.stringify(ogapi.datapointsSearchBuilder()
			.withDatastream('myDatastream')
			.build()._postObj.filter),'{"and":[{"eq":{"datapoint.datastream":"myDatastream"}}]}');
		});		
		it('withFeed', function(){
			assert.strictEqual(JSON.stringify(ogapi.datapointsSearchBuilder()
			.withFeed('myDatastream')
			.build()._postObj.filter),'{"and":[{"eq":{"datapoint.feed":"myDatastream"}}]}');
		});	
		it('CustomFilter', function(){
			assert.strictEqual(JSON.stringify(ogapi.datapointsSearchBuilder()
			.filter({filter:{and:[]}})
			.build()._postObj.filter),'{"filter":{"and":[]}}');
		});	
		it('time window', function(){
			assert.strictEqual(JSON.stringify(ogapi.datapointsSearchBuilder()
			.betweenDates(new Date('2015-10-16T10:39:05Z'),new Date('2015-10-16T10:39:06Z'))
			.build()._postObj.filter),'{"and":[{"gt":{"datapoint.at":"2015-10-16T10:39:05.000Z"}},{"lt":{"datapoint.at":"2015-10-16T10:39:06.000Z"}}]}');
		});	
		it('withDatastream and withDeviceId', function(){
			assert.strictEqual(JSON.stringify(ogapi.datapointsSearchBuilder()
			.withDeviceId('myDevice')
			.withDatastream('myDatastream')
			.build()._postObj.filter),'{"and":[{"eq":{"datapoint.device":"myDevice"}},{"eq":{"datapoint.datastream":"myDatastream"}}]}');
		});	
		it('Throw error if set a custom filter and create fluent filter', function(){
			assert.throws(function(){
				ogapi.datapointsSearchBuilder()
				.withDeviceId('myDevice')
				.filter({and:[]})
				.build();
			},'Incompatible filters. You only can create a filter using fluent mode [betweenDates, addTag, withDatastreamId, withDeviceId] methods or custom filter [filter] method');
		});	
	});

	describe('Setting bad parameters creating fluent filter',function(){
		it('not deviceId string parameter',function(){
			assert.throws(function(){
				ogapi.datapointsSearchBuilder()
				.withDeviceId(123)
				.build();
			},'Parameter deviceId must be a string');
		});
		it('not datastreamId string parameter',function(){
			assert.throws(function(){
				ogapi.datapointsSearchBuilder()
				.withDatastream(123)
				.build();
			},'Parameter datastreamId must be a string');

		});
		it('not feedId string parameter',function(){
			assert.throws(function(){
				ogapi.datapointsSearchBuilder()
				.withFeed(123)
				.build();
			},'Parameter feedId must be a string');
		});
		it('not fromDate date parameter',function(){
			assert.throws(function(){
				ogapi.datapointsSearchBuilder()
				.betweenDates(123)
				.build();
			},'Parameter fromDate must be a Date');
		});
		it('not toDate date parameter',function(){
			assert.throws(function(){
				ogapi.datapointsSearchBuilder()
				.betweenDates(new Date(),123)
				.build();
			},'Parameter toDate must be a Date');
		});
	});

	it('Check urls:', function(){
		assert.strictEqual(ogapi.datapointsSearchBuilder()
		.withDeviceId('myDevice')
		.build()._resource,'search/iot/datapoints');
	});
});