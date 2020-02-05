define(function () {
	mocha.setup('bdd');
	/** 
		@test {InternalOpenGateAPI#devicesSearchBuilder} 
		@test {InternalOpenGateAPI#subscribersSearchBuilder} 		
		@test {InternalOpenGateAPI#subscriptionsSearchBuilder} 
		@test {InternalOpenGateAPI#communicationsModulesSearchBuilder}		
		@test {InternalOpenGateAPI#executionsSearchBuilder} 
		@test {InternalOpenGateAPI#operationsSearchBuilder} 
		@test {InternalOpenGateAPI#alarmsSearchBuilder}  
		@test {InternalOpenGateAPI#bundlesSearchBuilder} 
	*/
	describe('Check funcionality newSearchBuilder module:', function () {

		/** @test {SearchBuilder}  */
		describe('Check setting timeout', function (done) {
			/** @test {SearchBuilder#withTimeout}  */
			it('Throw error on exceeded timeout', function () {
				ogapi.devicesSearchBuilder().onProvisioned().addSortBy('prov.customId', 'ASCENDING').summary().withTimeout(10).build().execute().catch(function (err) {
					assert.equal(err.message, "Timeout exceeded");
					done();
				});
			});
			/** @test {SearchBuilder#withTimeout}  */
			it('It is all ok when not exceeded timeout', function () {
				ogapi.devicesSearchBuilder().onProvisioned().addSortBy('prov.customId', 'ASCENDING').summary().withTimeout(10000).build().execute().then(function (response, statusCode) {
					assert.equal(statusCode, 200);
					done();
				});
			});
			/** @test {SearchBuilder#withTimeout}  */
			it('Check default timeout value when it is no setted', function () {
				assert.strictEqual(ogapi.devicesSearchBuilder().onProvisioned().build()._timeout, 5000);
			});
			/** @test {SearchBuilder#withTimeout}  */
			it('withTimeout parameter must be a number', function () {
				assert.throws(function () { ogapi.devicesSearchBuilder().withTimeout("a"); }, "Parameter ms must be a number");
			});
		});
		/** @test {SearchBuilder}*/
		describe('Check on entity searching:', function () {
			/** @test {SearchBuilder#filter}*/
			describe('with empty filter:', function () {

				/** @test {SearchBuilder#build} 
					@test {SearchBuilder#filter}
					@test {EntitySearchBuilder#onProvisioned}
					@test {InternalOpenGateAPI#devicesSearchBuilder}
				*/
				it('devicesSearchBuilder', function () {
					assert.doesNotThrow(function () { ogapi.devicesSearchBuilder().filter().onProvisioned().build(); });
				});

				/** @test {SearchBuilder#build} 
					@test {SearchBuilder#filter}
					@test {EntitySearchBuilder#onProvisioned}
					@test {InternalOpenGateAPI#subscriptionsSearchBuilder}
				*/
				it('subscriptionsSearchBuilder', function () {
					assert.doesNotThrow(function () { ogapi.subscriptionsSearchBuilder().filter().onProvisioned().build(); });
				});

				/** @test {SearchBuilder#build} 
					@test {SearchBuilder#filter}
					@test {EntitySearchBuilder#onProvisioned}
					@test {InternalOpenGateAPI#subscribersSearchBuilder}
				*/
				it('subscribersSearchBuilder', function () {
					assert.doesNotThrow(function () { ogapi.subscribersSearchBuilder().filter().onProvisioned().build(); });
				});
				/** @test {SearchBuilder#build} 
					@test {SearchBuilder#filter}
					@test {EntitySearchBuilder#onProvisioned}
					@test {InternalOpenGateAPI#communicationsModulesSearchBuilder}
				*/
				it('communicationsModulesSearchBuilder', function () {
					assert.doesNotThrow(function () { ogapi.communicationsModulesSearchBuilder().filter().onProvisioned().build(); });
				});
			});
			describe('On sort:', function () {
				/** @test {SearchBuilder#build} 
					@test {SearchBuilder#addSortAscendingBy}
					@test {EntitySearchBuilder#onProvisioned}
					@test {InternalOpenGateAPI#devicesSearchBuilder}
				*/
				it('Ascending sort', function () {
					assert.deepEqual(ogapi.devicesSearchBuilder().onProvisioned().addSortAscendingBy('param').build()._postObj.sort, { parameters: [{ name: 'param', type: 'ASCENDING' }] });
				});
				/** @test {SearchBuilder#build} 
					@test {SearchBuilder#addSortDescendingBy}
					@test {EntitySearchBuilder#onProvisioned}
					@test {InternalOpenGateAPI#devicesSearchBuilder}
				*/
				it('Ascending sort', function () {
					assert.deepEqual(ogapi.devicesSearchBuilder().onProvisioned().addSortDescendingBy('param').build()._postObj.sort, { parameters: [{ name: 'param', type: 'DESCENDING' }] });
				});
				/** @test {SearchBuilder#build} 
					@test {SearchBuilder#addSortBy}
					@test {EntitySearchBuilder#onProvisioned}
					@test {InternalOpenGateAPI#devicesSearchBuilder}
				*/
				it('Generic sort', function () {
					assert.deepEqual(ogapi.devicesSearchBuilder().onProvisioned().addSortBy('param', 'sorting').build()._postObj.sort, { parameters: [{ name: 'param', type: 'sorting' }] });
				});
			});
			describe('with empty filter:', function () {
				/** @test {SearchBuilder#build} 
					@test {SearchBuilder#filter}
					@test {EntitySearchBuilder#onProvisioned}
					@test {InternalOpenGateAPI#devicesSearchBuilder}
				*/
				it('devicesSearchBuilder', function () {
					assert.doesNotThrow(function () { ogapi.devicesSearchBuilder().filter().onProvisioned().build(); });
				});
				/** @test {SearchBuilder#build} 
					@test {SearchBuilder#filter}
					@test {EntitySearchBuilder#onProvisioned}
					@test {InternalOpenGateAPI#subscriptionsSearchBuilder}
				*/
				it('subscriptionsSearchBuilder', function () {
					assert.doesNotThrow(function () { ogapi.subscriptionsSearchBuilder().filter().onProvisioned().build(); });
				});
				/** @test {SearchBuilder#build} 
					@test {SearchBuilder#filter}
					@test {EntitySearchBuilder#onProvisioned}
					@test {InternalOpenGateAPI#subscribersSearchBuilder}
				*/
				it('subscribersSearchBuilder', function () {
					assert.doesNotThrow(function () { ogapi.subscribersSearchBuilder().filter().onProvisioned().build(); });
				});
				/** @test {SearchBuilder#build} 
					@test {SearchBuilder#filter}
					@test {EntitySearchBuilder#onProvisioned}
					@test {InternalOpenGateAPI#communicationsModulesSearchBuilder}
				*/
				it('communicationsModulesSearchBuilder', function () {
					assert.doesNotThrow(function () { ogapi.communicationsModulesSearchBuilder().filter().onProvisioned().build(); });
				});
			});
			/** @test {SearchBuilder#build} 
				@test {SearchBuilder#filter}
				@test {EntitySearchBuilder#onProvisioned}
				@test {InternalOpenGateAPI#devicesSearchBuilder}
			*/
			describe('using filterBuilder:', function () {
				it('simple filter', function () {
					var filterExpected = JSON.parse("{\"and\":[{\"like\":{\"hello\":\"world\"}}]}");
					assert.deepEqual(ogapi.devicesSearchBuilder().
						onProvisioned().
						filter(
							ogapi.newFilterBuilder().
								and(ogapi.EX.like("hello", "world")))
						.build()._postObj.filter, filterExpected);
				});
			});
			/** @test {SearchBuilder#limit}*/
			describe('On limit:', function () {
				it('undefined size parameter', function () {
					assert.throws(function () { ogapi.devicesSearchBuilder().limit(); }, 'size parameter must be a number');
				});
				it('size parameter not a number', function () {
					assert.throws(function () { ogapi.devicesSearchBuilder().limit('5'); }, 'size parameter must be a number');
				});
				it('well build with only size', function () {
					assert.deepEqual(ogapi.devicesSearchBuilder().limit(5).onProvisioned().build()._postObj.limit, { size: 5, start: 1 });
				});
				it('well build with size and offset', function () {
					assert.deepEqual(ogapi.devicesSearchBuilder().limit(5, 15).onProvisioned().build()._postObj.limit, { size: 5, start: 15 });
				});
			});

			/** @test {EntitySearchBuilder#onProvisioned}*/
			describe('On provisioned data:', function () {
				/** @test {DevicesSearchBuilder#onProvisioned}*/
				it('devicesSearchBuilder', function () {
					assert.strictEqual(ogapi.devicesSearchBuilder().onProvisioned().build()._resource, 'search/entities/devices/provision');
				});
				/** @test {SubscriptionsSearchBuilder#onProvisioned}*/
				it('subscriptionsSearchBuilder', function () {
					assert.strictEqual(ogapi.subscriptionsSearchBuilder().onProvisioned().build()._resource, 'search/entities/subscriptions/provision');
				});
				/** @test {SubscribersSearchBuilder#onProvisioned}*/
				it('subscribersSearchBuilder', function () {
					assert.strictEqual(ogapi.subscribersSearchBuilder().onProvisioned().build()._resource, 'search/entities/subscribers/provision');
				});
				/** @test {CommunicationsModulesSearchBuilder#onProvisioned}*/
				it('communicationsModulesSearchBuilder', function () {
					assert.strictEqual(ogapi.communicationsModulesSearchBuilder().onProvisioned().build()._resource, 'search/entities/communicationsModules/provision');
				});
			});
			/** @test {EntitySearchBuilder#onCollected}*/
			describe('On collected data:', function () {
				/** @test {DevicesSearchBuilder#onCollected}*/
				it('devicesSearchBuilder', function () {
					assert.strictEqual(ogapi.devicesSearchBuilder().onCollected().build()._resource, 'search/entities/devices/collection');
				});
				/** @test {SubscriptionsSearchBuilder#onCollected}*/
				it('subscriptionsSearchBuilder', function () {
					assert.strictEqual(ogapi.subscriptionsSearchBuilder().onCollected().build()._resource, 'search/entities/subscriptions/collection');
				});
				/** @test {SubscribersSearchBuilder#onCollected}*/
				it('subscribersSearchBuilder', function () {
					assert.strictEqual(ogapi.subscribersSearchBuilder().onCollected().build()._resource, 'search/entities/subscribers/collection');
				});
				/** @test {CommunicationsModulesSearchBuilder#onCollected}*/
				it('communicationsModulesSearchBuilder', function () {
					assert.strictEqual(ogapi.communicationsModulesSearchBuilder().onCollected().build()._resource, 'search/entities/communicationsModules/collection');
				});
			});
			/** @test {SearchBuilder#build}*/
			describe('On collected and provisioned data:', function () {
				/** @test {DevicesSearchBuilder#build}*/
				it('devicesSearchBuilder', function () {
					assert.strictEqual(ogapi.devicesSearchBuilder().onCollected().onProvisioned().build()._resource, 'search/entities/devices');
				});
				/** @test {SubscriptionsSearchBuilder#build}*/
				it('subscriptionsSearchBuilder', function () {
					assert.strictEqual(ogapi.subscriptionsSearchBuilder().onCollected().onProvisioned().build()._resource, 'search/entities/subscriptions');
				});
				/** @test {SubscribersSearchBuilder#build}*/
				it('subscribersSearchBuilder', function () {
					assert.strictEqual(ogapi.subscribersSearchBuilder().onCollected().onProvisioned().build()._resource, 'search/entities/subscribers');
				});
				/** @test {CommunicationsModulesSearchBuilder#build}*/
				it('communicationsModulesSearchBuilder', function () {
					assert.strictEqual(ogapi.communicationsModulesSearchBuilder().onCollected().onProvisioned().build()._resource, 'search/entities/communicationsModules');
				});
			});
			/** @test {SearchBuilder#summary}*/
			describe('Summary data:', function () {
				describe('without source data:', function () {
					/** 
						@test {DevicesSearchBuilder#summary}
						@test {DevicesSearchBuilder#build}	
					*/
					it('devicesSearchBuilder', function () {
						assert.throws(function () { ogapi.devicesSearchBuilder().summary().build(); }, 'Must select one at least: ["onProvisioned","onCollected"]');
					});
					/** 
						@test {SubscriptionsSearchBuilder#summary}
						@test {SubscriptionsSearchBuilder#build}	
					*/
					it('subscriptionsSearchBuilder', function () {
						assert.throws(function () { ogapi.subscriptionsSearchBuilder().summary().build(); }, 'Must select one at least: ["onProvisioned","onCollected"]');
					});
					/** 
						@test {SubscribersSearchBuilder#summary}
						@test {SubscribersSearchBuilder#build}	
					*/
					it('subscribersSearchBuilder', function () {
						assert.throws(function () { ogapi.subscribersSearchBuilder().summary().build(); }, 'Must select one at least: ["onProvisioned","onCollected"]');
					});
					/** 
						@test {CommunicationsModulesSearchBuilder#summary}
						@test {CommunicationsModulesSearchBuilder#build}	
					*/
					it('communicationsModulesSearchBuilder', function () {
						assert.throws(function () { ogapi.communicationsModulesSearchBuilder().summary().build(); }, 'Must select one at least: ["onProvisioned","onCollected"]');
					});
				});
				/** 
					@test {SearchBuilder#summary}
					@test {EntitySearchBuilder#onProvisioned}
				*/
				describe('On provisioned data:', function () {
					/** 
						@test {DevicesSearchBuilder#summary}
						@test {DevicesSearchBuilder#onProvisioned}
					*/
					it('devicesSearchBuilder', function () {
						assert.strictEqual(ogapi.devicesSearchBuilder().onProvisioned().summary().build()._resource, 'search/entities/devices/provision/summary');
					});
					/** 
						@test {SubscriptionsSearchBuilder#summary}
						@test {SubscriptionsSearchBuilder#onProvisioned}
					*/
					it('subscriptionsSearchBuilder', function () {
						assert.strictEqual(ogapi.subscriptionsSearchBuilder().onProvisioned().summary().build()._resource, 'search/entities/subscriptions/provision/summary');
					});
					/** 
						@test {SubscribersSearchBuilder#summary}
						@test {SubscribersSearchBuilder#onProvisioned}
					*/
					it('subscribersSearchBuilder', function () {
						assert.strictEqual(ogapi.subscribersSearchBuilder().onProvisioned().summary().build()._resource, 'search/entities/subscribers/provision/summary');
					});
					/** 
						@test {CommunicationsModulesSearchBuilder#summary}
						@test {CommunicationsModulesSearchBuilder#onProvisioned}
					*/
					it('communicationsModulesSearchBuilder', function () {
						assert.strictEqual(ogapi.communicationsModulesSearchBuilder().onProvisioned().summary().build()._resource, 'search/entities/communicationsModules/provision/summary');
					});
				});
				describe('On collected data:', function () {
					/** 
						@test {DevicesSearchBuilder#summary}
						@test {DevicesSearchBuilder#onProvisioned}
					*/
					it('devicesSearchBuilder', function () {
						assert.strictEqual(ogapi.devicesSearchBuilder().onCollected().summary().build()._resource, 'search/entities/devices/collection/summary');
					});
					/** 
						@test {SubscriptionsSearchBuilder#summary}
						@test {SubscriptionsSearchBuilder#onProvisioned}
					*/
					it('subscriptionsSearchBuilder', function () {
						assert.strictEqual(ogapi.subscriptionsSearchBuilder().onCollected().summary().build()._resource, 'search/entities/subscriptions/collection/summary');
					});
					/** 
						@test {SubscribersSearchBuilder#summary}
						@test {SubscribersSearchBuilder#onProvisioned}
					*/
					it('subscribersSearchBuilder', function () {
						assert.strictEqual(ogapi.subscribersSearchBuilder().onCollected().summary().build()._resource, 'search/entities/subscribers/collection/summary');
					});
					/** 
						@test {CommunicationsModulesSearchBuilder#summary}
						@test {CommunicationsModulesSearchBuilder#onProvisioned}
					*/
					it('communicationsModulesSearchBuilder', function () {
						assert.strictEqual(ogapi.communicationsModulesSearchBuilder().onCollected().summary().build()._resource, 'search/entities/communicationsModules/collection/summary');
					});
				});
				describe('On collected and provisioned data', function () {
					/** 
						@test {DevicesSearchBuilder#summary}
						@test {DevicesSearchBuilder#build}
					*/
					it('devicesSearchBuilder', function () {
						assert.strictEqual(ogapi.devicesSearchBuilder().onCollected().onProvisioned().summary().build()._resource, 'search/entities/devices/summary');
					});
					/** 
						@test {SubscriptionsSearchBuilder#summary}
						@test {SubscriptionsSearchBuilder#build}
					*/
					it('subscriptionsSearchBuilder', function () {
						assert.strictEqual(ogapi.subscriptionsSearchBuilder().onCollected().onProvisioned().summary().build()._resource, 'search/entities/subscriptions/summary');
					});
					/** 
						@test {SubscribersSearchBuilder#summary}
						@test {SubscribersSearchBuilder#build}
					*/
					it('subscribersSearchBuilder', function () {
						assert.strictEqual(ogapi.subscribersSearchBuilder().onCollected().onProvisioned().summary().build()._resource, 'search/entities/subscribers/summary');
					});
					/** 
						@test {CommunicationsModulesSearchBuilder#summary}
						@test {CommunicationsModulesSearchBuilder#build}
					*/
					it('communicationsModulesSearchBuilder', function () {
						assert.strictEqual(ogapi.communicationsModulesSearchBuilder().onCollected().onProvisioned().summary().build()._resource, 'search/entities/communicationsModules/summary');
					});
				});

			});
			describe('On without source data:', function () {
				/** 
					@test {DevicesSearchBuilder#summary}
					@test {DevicesSearchBuilder#build}
				*/
				it('devicesSearchBuilder', function () {
					assert.throws(function () { ogapi.devicesSearchBuilder().build(); }, 'Must select one at least: ["onProvisioned","onCollected"]');
				});
				/** 
					@test {SubscriptionsSearchBuilder#summary}
					@test {SubscriptionsSearchBuilder#build}
				*/
				it('subscriptionsSearchBuilder', function () {
					assert.throws(function () { ogapi.subscriptionsSearchBuilder().build(); }, 'Must select one at least: ["onProvisioned","onCollected"]');
				});
				/** 
					@test {SubscribersSearchBuilder#summary}
					@test {SubscribersSearchBuilder#build}
				*/
				it('subscribersSearchBuilder', function () {
					assert.throws(function () { ogapi.subscribersSearchBuilder().build(); }, 'Must select one at least: ["onProvisioned","onCollected"]');
				});
				/** 
					@test {CommunicationsModulesSearchBuilder#summary}
					@test {CommunicationsModulesSearchBuilder#build}
				*/
				it('communicationsModulesSearchBuilder', function () {
					assert.throws(function () { ogapi.communicationsModulesSearchBuilder().build(); }, 'Must select one at least: ["onProvisioned","onCollected"]');
				});
			});
		});

		describe('Check on operation searching:', function () {
			/** 				
				@test {ExecutionsSearchBuilder#build}
			*/
			it('without source data', function () {
				assert.throws(function () { ogapi.executionsSearchBuilder().build(); }, 'Must select one at least: ["onDevices","onSubscribers","onSubscriptions","onCommunicationsModules"]');
			});
			/** 				
				@test {ExecutionsSearchBuilder#build}
			*/
			it('single source data', function () {
				assert.doesNotThrow(function () { ogapi.executionsSearchBuilder().onDevices().build(); });
			});
			/** 				
				@test {ExecutionsSearchBuilder#build}
			*/
			it('multiple source data', function () {
				assert.throws(function () { ogapi.executionsSearchBuilder().onDevices().onSubscriptions().build(); }, 'Must select only one of this:["onDevices","onSubscribers","onSubscriptions","onCommunicationsModules"]');
			});

			describe('all kind source data:', function () {
				/** @test {ExecutionsSearchBuilder#onDevices}*/
				it('from devices', function () {
					assert.strictEqual(ogapi.executionsSearchBuilder().onDevices().build()._resource, 'search/entities/devices/operations');
				});
				/** @test {ExecutionsSearchBuilder#onSubscriptions}*/
				it('from subscriptions', function () {
					assert.strictEqual(ogapi.executionsSearchBuilder().onSubscriptions().build()._resource, 'search/entities/subscriptions/operations');
				});
				/** @test {ExecutionsSearchBuilder#onSubscribers}*/
				it('from subscribers', function () {
					assert.strictEqual(ogapi.executionsSearchBuilder().onSubscribers().build()._resource, 'search/entities/subscribers/operations');
				});
				/** @test {ExecutionsSearchBuilder#onCommunicationsModules}*/
				it('from communicationsModules', function () {
					assert.strictEqual(ogapi.executionsSearchBuilder().onCommunicationsModules().build()._resource, 'search/entities/communicationsModules/operations');
				});
				describe('summary:', function () {
					/** @test {ExecutionsSearchBuilder#summary}*/
					it('from devices', function () {
						assert.strictEqual(ogapi.executionsSearchBuilder().onDevices().summary().build()._resource, 'search/entities/devices/operations/summary');
					});
					/** @test {ExecutionsSearchBuilder#summary}*/
					it('from subscriptions', function () {
						assert.strictEqual(ogapi.executionsSearchBuilder().onSubscriptions().summary().build()._resource, 'search/entities/subscriptions/operations/summary');
					});
					/** @test {ExecutionsSearchBuilder#summary}*/
					it('from subscribers', function () {
						assert.strictEqual(ogapi.executionsSearchBuilder().onSubscribers().summary().build()._resource, 'search/entities/subscribers/operations/summary');
					});
					/** @test {ExecutionsSearchBuilder#summary}*/
					it('from communicationsModules', function () {
						assert.strictEqual(ogapi.executionsSearchBuilder().onCommunicationsModules().summary().build()._resource, 'search/entities/communicationsModules/operations/summary');
					});
				});
			});
		});
		describe('Check on alarm searching:', function () {
			/** @test {AlarmsSearchBuilder#build}*/
			it('without source data', function () {
				assert.throws(function () { ogapi.alarmsSearchBuilder().build(); }, 'Must select one at least: ["onDevices","onSubscribers","onSubscriptions","onCommunicationsModules"]');
			});
			/** @test {AlarmsSearchBuilder#build}*/
			it('single source data', function () {
				assert.doesNotThrow(function () { ogapi.alarmsSearchBuilder().onDevices().build(); });
			});
			/** @test {AlarmsSearchBuilder#build}*/
			it('multiple source data', function () {
				assert.throws(function () { ogapi.alarmsSearchBuilder().onDevices().onSubscriptions().build(); }, 'Must select only one of this:["onDevices","onSubscribers","onSubscriptions","onCommunicationsModules"]');
			});

			describe('all kind source data:', function () {
				/** @test {AlarmsSearchBuilder#onDevices}*/
				it('from devices', function () {
					assert.strictEqual(ogapi.alarmsSearchBuilder().onDevices().build()._resource, 'search/entities/devices/alarms');
				});
				/** @test {AlarmsSearchBuilder#onSubscriptions}*/
				it('from subscriptions', function () {
					assert.strictEqual(ogapi.alarmsSearchBuilder().onSubscriptions().build()._resource, 'search/entities/subscriptions/alarms');
				});
				/** @test {AlarmsSearchBuilder#onSubscribers}*/
				it('from subscribers', function () {
					assert.strictEqual(ogapi.alarmsSearchBuilder().onSubscribers().build()._resource, 'search/entities/subscribers/alarms');
				});
				/** @test {AlarmsSearchBuilder#onCommunicationsModules}*/
				it('from communicationsModules', function () {
					assert.strictEqual(ogapi.alarmsSearchBuilder().onCommunicationsModules().build()._resource, 'search/entities/communicationsModules/alarms');
				});
				describe('summary:', function () {
					/** @test {AlarmsSearchBuilder#summary}*/
					it('from devices', function () {
						assert.strictEqual(ogapi.alarmsSearchBuilder().onDevices().summary().build()._resource, 'search/entities/devices/alarms/summary');
					});
					/** @test {AlarmsSearchBuilder#summary}*/
					it('from subscriptions', function () {
						assert.strictEqual(ogapi.alarmsSearchBuilder().onSubscriptions().summary().build()._resource, 'search/entities/subscriptions/alarms/summary');
					});
					/** @test {AlarmsSearchBuilder#summary}*/
					it('from subscribers', function () {
						assert.strictEqual(ogapi.alarmsSearchBuilder().onSubscribers().summary().build()._resource, 'search/entities/subscribers/alarms/summary');
					});
					/** @test {AlarmsSearchBuilder#summary}*/
					it('from communicationsModules', function () {
						assert.strictEqual(ogapi.alarmsSearchBuilder().onCommunicationsModules().summary().build()._resource, 'search/entities/communicationsModules/alarms/summary');
					});
				});
			});
		});
		describe('Check on bundles searching:', function () {
			/** @test {BundlesSearchBuilder#build}*/
			it('bundlesSearchBuilder', function () {
				assert.strictEqual(ogapi.bundlesSearchBuilder().build()._resource, 'search/bundles');
			});
			describe('On Limit:', function () {
				/** @test {bundlesSearchBuilder#build} 
				*/
				it('limit', function () {
					assert.deepEqual(ogapi.bundlesSearchBuilder().limit(5, 1).build()._postObj.limit, { size: 5, start: 1 });
				});
				it('simple filter', function () {
					var filterExpected = JSON.parse("{\"and\":[{\"like\":{\"bundle.Name\":\"bundle_carlos\"}}]}");
					assert.deepEqual(ogapi.bundlesSearchBuilder().filter(ogapi.newFilterBuilder().
						and(ogapi.EX.like("bundle.Name", "bundle_carlos")))
						.build()._postObj.filter, filterExpected);
				});
			});
		});
	});
});