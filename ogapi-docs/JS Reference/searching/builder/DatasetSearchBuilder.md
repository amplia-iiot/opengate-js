+++
title = "Dataset Search Builder"
weight = 10
+++

DatasetSearchBuilder

### DatasetSearchBuilder Objects

```javascript
class DatasetSearchBuilder()
```

Defined a search over Executions	


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `parent` _InternalOpenGateAPI_  - Instance of our InternalOpenGateAPI


---

##### build


```javascript
function build() -> 'Search'
```

Build a instance of Search 


**Returns**:


- _`Search`_ 


**Example**:

~~~javascript
 ogapi.datasetSearchBuilder(organization, datasetId).build()
~~~

---

##### group


```javascript
function group(group: object) -> 'DatasetSearchBuilder'
```

The search request will have this group by 

**Arguments**:

- `group` _object_  

**Returns**:


- _`DatasetSearchBuilder`_ 


**Example**:

~~~javascript

~~~

---

##### select


```javascript
function select(select: SelectBuilder,object) -> 'DatasetSearchBuilder'
```

The search request will have this filter 

**Arguments**:

- `select` _SelectBuilder,object_  

**Returns**:


- _`DatasetSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.datasetSearchBuilder(organization, datasetId).select(
     ogapi.newSelectBuilder().add(SE.element("provision.device.identifier", ["value"], "id"), SE.add("device.temperature.value", ["value"]))
 ) // Setting SelectBuilder
 ogapi.datasetSearchBuilder(organization, datasetId).select({ "elements": [{"name": "provision.device.identifier",
	"fields": [{"field": "value","alias": "identifier"}]},
     {"name": "device.temperature.value","fields": [{"field": "value","alias": "identifier"}]}]
  }) //Custom select
~~~

---

