+++
title = "Entities Search Builder"
weight = 10
+++

EntitiesSearchBuilder

### EntitiesSearchBuilder Objects

```javascript
class EntitiesSearchBuilder()
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
 ogapi.entitiesSearchBuilder()
~~~

---

##### disableCaseSensitive


```javascript
function disableCaseSensitive(flag: *) -> 'EntitiesSearchBuilder'
```

The response will return a response by applying the filter with likes case-no-sensitive

**Arguments**:

- `flag` _*_  

**Returns**:


- _`EntitiesSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.entitiesSearchBuilder().disableCaseSensitive() 
~~~

---

##### disableDefaultSorted


```javascript
function disableDefaultSorted() -> 'EntitiesSearchBuilder'
```

The response will return a response without sorted


**Returns**:


- _`EntitiesSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.entitiesSearchBuilder().disableDefaultSorted() 
~~~

---

##### flattened


```javascript
function flattened() -> 'EntitiesSearchBuilder'
```

The response will return a flattened response


**Returns**:


- _`EntitiesSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.entitiesSearchBuilder().flattened() 
~~~

---

##### group


```javascript
function group(group: object) -> 'EntitiesSearchBuilder'
```

The search request will have this group by 

**Arguments**:

- `group` _object_  

**Returns**:


- _`EntitiesSearchBuilder`_ 


**Example**:

~~~javascript

~~~

---

##### removeCaseSensitive


```javascript
function removeCaseSensitive() -> 'EntitiesSearchBuilder'
```

The response will return a response by deleteing the parameters with likes case-no-sensitive


**Returns**:


- _`EntitiesSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.entitiesSearchBuilder().disableCaseSensitive() 
~~~

---

##### select


```javascript
function select(select: SelectBuilder,object) -> 'EntitiesSearchBuilder'
```

The search request will have this filter 

**Arguments**:

- `select` _SelectBuilder,object_  

**Returns**:


- _`EntitiesSearchBuilder`_ 


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

