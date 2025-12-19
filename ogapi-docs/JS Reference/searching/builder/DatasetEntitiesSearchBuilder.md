+++
title = "Dataset Entities Search Builder"
weight = 10
+++

DatasetEntitiesSearchBuilder

### DatasetEntitiesSearchBuilder Objects

```javascript
class DatasetEntitiesSearchBuilder()
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
 ogapi.datasetEntitiesSearchBuilder()
~~~

---

##### disableCaseSensitive


```javascript
function disableCaseSensitive(flag: *) -> 'DatasetEntitiesSearchBuilder'
```

The response will return a response by applying the filter with likes case-no-sensitive

**Arguments**:

- `flag` _*_  

**Returns**:


- _`DatasetEntitiesSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.datasetEntitiesSearchBuilder().disableCaseSensitive() 
~~~

---

##### disableDefaultSorted


```javascript
function disableDefaultSorted() -> 'DatasetEntitiesSearchBuilder'
```

The response will return a response without sorted


**Returns**:


- _`DatasetEntitiesSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.datasetEntitiesSearchBuilder().disableDefaultSorted() 
~~~

---

##### flattened


```javascript
function flattened() -> 'DatasetEntitiesSearchBuilder'
```

The response will return a flattened response


**Returns**:


- _`DatasetEntitiesSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.datasetEntitiesSearchBuilder().flattened() 
~~~

---

##### group


```javascript
function group(group: object) -> 'DatasetEntitiesSearchBuilder'
```

The search request will have this group by 

**Arguments**:

- `group` _object_  

**Returns**:


- _`DatasetEntitiesSearchBuilder`_ 


**Example**:

~~~javascript

~~~

---

##### removeCaseSensitive


```javascript
function removeCaseSensitive() -> 'DatasetEntitiesSearchBuilder'
```

The response will return a response by deleteing the parameters with likes case-no-sensitive


**Returns**:


- _`DatasetEntitiesSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.datasetEntitiesSearchBuilder().disableCaseSensitive() 
~~~

---

##### select


```javascript
function select(select: SelectBuilder,object) -> 'DatasetEntitiesSearchBuilder'
```

The search request will have this filter 

**Arguments**:

- `select` _SelectBuilder,object_  

**Returns**:


- _`DatasetEntitiesSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.datasetEntitiesSearchBuilder().select(
     ogapi.newSelectBuilder().add(SE.element("provision.device.identifier", ["value"], "id"), SE.add("device.temperature.value", ["value"]))
 ) // Setting SelectBuilder
 ogapi.datasetEntitiesSearchBuilder().select({ "elements": [{"name": "provision.device.identifier",
	"fields": [{"field": "value","alias": "identifier"}]},
     {"name": "device.temperature.value","fields": [{"field": "value","alias": "identifier"}]}]
  }) //Custom select
~~~

---

