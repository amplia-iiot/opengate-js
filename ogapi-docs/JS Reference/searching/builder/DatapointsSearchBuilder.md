+++
title = "Datapoints Search Builder"
weight = 10
+++

DatapointsSearchBuilder

### DatapointsSearchBuilder Objects

```javascript
class DatapointsSearchBuilder()
```

Defined a search over Datastreams	


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `parent` _InternalOpenGateAPI_  - Instance of our InternalOpenGateAPI


---

##### betweenDates


```javascript
function betweenDates(fromDate: date,toDate: date) -> 'DatapointsSearchBuilder'
```

Set time window to search

**Arguments**:

- `fromDate` _date_  - Add from date
- `toDate` _date_  - Add to date

**Returns**:


- _`DatapointsSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.datapointsSearchBuilder().withDeviceId('myDevice').build()
~~~

---

##### fluentFilter


```javascript
function fluentFilter()
```




---

##### select


```javascript
function select(select: SelectBuilder,object) -> 'SearchBuilder'
```

The search request will have this filter 

**Arguments**:

- `select` _SelectBuilder,object_  

**Returns**:


- _`SearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.entitiesSearchBuilder().select(
     ogapi.newSelectBuilder().add(SE.element("provision.device.identifier", ["value"], "id"), SE.add("device.temperature.value", ["value"]))
 ) // Setting SelectBuilder
 ogapi.entitiesSearchBuilder().select({ "elements": [{"name": "provision.device.identifier",
	"fields": [{"field": "value","alias": "identifier"}]},
     {"name": "device.temperature.value","fields": [{"field": "value","alias": "identifier"}]}]
  }) //Custom select
~~~

---

##### tagsFilter


```javascript
function tagsFilter()
```




---

##### withDatastream


```javascript
function withDatastream(datastreamId: string) -> 'DatapointsSearchBuilder'
```

Set datastreamId to search

**Arguments**:

- `datastreamId` _string_  - Datastream.id of Datapoint

**Returns**:


- _`DatapointsSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.datapointsSearchBuilder().withDeviceId('myDevice').build()
~~~

---

##### withDeviceId


```javascript
function withDeviceId(deviceId: string) -> 'DatapointsSearchBuilder'
```

Set deviceId to search

**Arguments**:

- `deviceId` _string_  - Prov.customId of Device

**Returns**:


- _`DatapointsSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.datapointsSearchBuilder().withDeviceId('myDevice').build()
~~~

---

##### withFeed


```javascript
function withFeed(feedId: string) -> 'DatapointsSearchBuilder'
```

Set feedName to search

**Arguments**:

- `feedId` _string_  - Datastream.id of Datapoint

**Returns**:


- _`DatapointsSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.datapointsSearchBuilder().withDeviceId('myDevice').build()
~~~

---

