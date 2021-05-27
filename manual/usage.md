# Examples about how to use our OpengateJS

## Search into entities data

### Search provision devices info

The first that you need obtain is a new Builder instance: 

``` javascript
	ogapi.
	devicesSearchBuilder()
```

If you need information about collected data:

``` javascript
	ogapi.
	devicesSearchBuilder().
	onCollected().....
```

Or you need information about provisioned data:

``` javascript
	ogapi.
	devicesSearchBuilder().
	onProvisioned().....
```

Uhmm, If you need all information, provisioned and collected, because you want to be enlightened:

``` javascript
	ogapi.
	devicesSearchBuilder().
	onProvisioned().
	onCollected()....
```

Well, Now you only want summary information:

``` javascript
// Collected Data
	ogapi.
	devicesSearchBuilder().
	onProvisioned().
	summary()....
// Provisioned Data
	ogapi.
	devicesSearchBuilder().
	onProvisioned().
	summary()....
// Provisioned and Collected Data
	ogapi.
	devicesSearchBuilder().
	onProvisioned().
	summary()....

```

Now, we can only make the invoke to build method and catch the response

``` javascript
	var builder = 
	ogapi.
	devicesSearchBuilder().
	onProvisioned();
	var search;
	try{
		search = builder.build();
	}catch(builderError){
		console.log(builderError);
	}
	search.
	execute().
	then(function(response,statusCode){
		//Here you could search all you want into response object
	}).
	catch(function(error){
		alert(error);
	})
```

### Search provision subscribers info
Is the same that device info, You only change this:
```javascript
	ogapi.
	devicesSearchBuilder().
```
To this:
```javascript
	ogapi.
	subscribersSearchBuilder().
```
### Search provision subscriptions info
Is the same that device info, You only change this:
```javascript
	ogapi.
	devicesSearchBuilder().
```
To this:
```javascript
	ogapi.
	subscriptionsSearchBuilder().
```


## Search into executions data of a operation 


The first that you need obtain is a new Builder instance: 

``` javascript
	ogapi.
	executionsSearchBuilder()
```

If you need select the source about executions data of a operation :

``` javascript
	ogapi.
	executionsSearchBuilder().
	onDevices().....
	// Or
	ogapi.
	executionsSearchBuilder().
	onSubscribers().....
	// Or
	ogapi.
	executionsSearchBuilder().
	onSubscriptions().....
	// Or
	ogapi.
	executionsSearchBuilder().
	onCommunicationsModules().....

```
Important, You only can select one of this resources. If you select more than one, a exception will be thrown when you invoke build method.


If you need summary information:

``` javascript
	ogapi.
	executionsSearchBuilder().
	onCommunicationsModules().
	summary()...
```

Now, we can only make the invoke to build method and catch the response

``` javascript
	var builder = 
	ogapi.
	executionsSearchBuilder().
	onCommunicationsModules();
	var search;
	try{
		search = builder.build();
	}catch(builderError){
		console.log(builderError);
	}
	search.
	execute().
	then(function(response,statusCode){
		//Here you could search all you want into response object
	}).
	catch(function(error){
		alert(error);
	})
```

## Search into alarms data

Is the same that execution info of a operation, You only change this:
```javascript
	ogapi.
	executionsSearchBuilder().
```
To this:
```javascript
	ogapi.
	alarmsSearchBuilder().
```

## Search into iot data

### Search into datastreams and profiles collections

The first that you need obtain is a new Builder instance: 

``` javascript
	var builder = ogapi.
	datastreamsSearchBuilder()
```
or 

``` javascript
	var builder = ogapi.
	profilesSearchBuilder()
```

If you want you can create a filter to restrict the response much as you want.
``` javascript
	builder.filter(ogapi.newFilterBuilder().and(ogapi.EX.eq('myparam','myvalue')))
```

Now, we can only make the invoke to build method and catch the response

``` javascript
	var builder = 
	ogapi.
	profilesSearchBuilder().
	.filter(ogapi.newFilterBuilder().and(ogapi.EX.eq('myparam','myvalue')))
	var search;
	try{
		search = builder.build();
	}catch(builderError){
		console.log(builderError);
	}
	search.
	execute().
	then(function(response,statusCode){
		//Here you could search all you want into response object
	}).
	catch(function(error){
		alert(error);
	})
```
### Search into datapoints collections

The first that you need obtain is a new Builder instance: 

``` javascript
	var builder = ogapi.
	datapointsSearchBuilder()
```

If you want you can create a filter to restrict the response much as you want.
``` javascript
	builder.filter(ogapi.newFilterBuilder().and(ogapi.EX.eq('myparam','myvalue')))
```
or you can use the way filter fluent to make a filter more straightforward
``` javascript
	builder.betweenDates(new Date(),new Date()).withFeed('myFeed').withDeviceId('myDevice')....
```

Now, we can only make the invoke to build method and catch the response

``` javascript
	var builder = 
	ogapi.
	datapointsSearchBuilder().
	.betweenDates(new Date(),new Date()).withFeed('myFeed').withDeviceId('myDevice');
	var search;
	try{
		search = builder.build();
	}catch(builderError){
		console.log(builderError);
	}
	search.
	execute().
	then(function(response,statusCode){
		//Here you could search all you want into response object
	}).
	catch(function(error){
		alert(error);
	})
```


## Setting timeout in all searches

We can configure the request timeout in all request.
How can i do it ?

It is very simple, we must only invoke a _withTimeout_ method. Here there is a example:

``` javascript
	ogapi.
	devicesSearchBuilder().
	withTimeout(2000).....
```
Then, if timeout is exceeded. The promise throw an exception with a message like this: "Timeout exceeded"

## Execute an operation

Here `ogapi.operations` is where you can find all you need to execute an operation.

At this point `ogapi.operations`, you have access to:
* builderByOperationName(operation_name) -> It will return a promise and into then callback you will have the builder as a function argument but if anything gone wrong the catch callback would tell you what happens by error 
* getOperationList() -> It will return an array with available operations


### OK I have an operation builder but now. What could i do ?

Might be two kinds of builder:
* Attend or close alarms
* Operations defined into user catalog

It is a builder factory, Here will have all operations that the user have available

Examples:

* `ogapi.operations.builderByOperationName('ALARM_CLOSE')`
* `ogapi.operations.builderByOperationName('ADMINISTRATIVE_STATUS_CHANGE')`

Methods available to attend or close alarms:
* withNotes()
* addAlarmId()
* build()

Methods available to others operations:
* withNotes()
* withCallback()
* withAckTimeout()
* withDelayedStop()
* withDelayedStart()
* withScatteringMaxSpread()
* withScatteringStrategy()
* executeImmediately()
* executeIDLE()
* executeLater()
* withTimeout() 
* withRetriesDelay()
* withRetries() 
* appendEntitiesBy.filter(newFilterBuilder().build())
* appendEntitiesBy.list() 
* appendEntitiesBy.tag()

#### How can i add a specific parameter ?

Access:
```
    		var builder = ogapi.operations.builderFactory.newSetClockEquipmentBuilder();
    		//Acceso a los parámetros de esta operación
    		builder.paramBuilderFactory
```

The paramBuilderFactory element will have an catalog and it will have inside a list about allowed parameters.     	
This parameters can be as a simple type, array type, array of simple type, a complex type, etc. Every parameter will have their own builder.

Examples:
* Simple type with default value `builder.paramBuilderFactory.newAdministrativeStatusParamBuilder().buildAndAppend()`
* This parameter have defined an enumeration with allowed values `builder.paramBuilderFactory.newChannelParamBuilder().withChannel('channelName')`. If channelName is not defined into enumeration, the builder throw an error
* Array of complex object `builder.paramBuilderFactory.newVariableListParamBuilder().addVariableList({'variableName':'nombre','variableValue':'valor'}).addVariableList({'variableName':'nombre','variableValue':'valor'})`
* String array `builder.paramBuilderFactory.newApnParamBuilder().addApn('apn1').addApn('apn2').buildAndAppend()`


## Execute actions on the executions

When you create an operation, it creates a "run" that groups each of the operations per entity that are generated.
`ogapi.newExecutionActions(execution_id)` offers a series of actions to activate, paused and cancel these executions:

### Active

`ogapi.newExecutionActions(execution_id).active();`

We can activate a execution that is in the IDLE or PAUSED state.
Once the execution is activated it will go to one of the following states: 

* SCHEDULE if the previous state was IDLE
* IN_PROGRESS if the previous state was PAUSED or IDLE (if the timing forces the start)

### Pause

`ogapi.newExecutionActions(execution_id).pause();`

We can pause an execution.
Once the execution is paused it will go to one of the following states: 

* IDLE if the previous state was SCHEDULE
* PAUSED if the previous state was IN_PROGRESS

### Cancel

`ogapi.newExecutionActions(execution_id).cancel();`

We can cancel an execution at any time.
The status of execution passes through two states: CANCELLING and CANCELLED

