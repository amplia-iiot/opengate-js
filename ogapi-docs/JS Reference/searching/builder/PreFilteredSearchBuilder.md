+++
title = "Pre Filtered Search Builder"
weight = 10
+++

PreFilteredSearchBuilder

### PreFilteredSearchBuilder Objects

```javascript
class PreFilteredSearchBuilder()
```

This is a abstract class. It is a class that extends from base to make all kind of summary search request to OpenGate North API.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `parent` _InternalOpenGateAPI_  - this is ogapi instance
- `routes` _object_  - this defined the routes. One of those routes must be called on Builder before call build method.


---

##### collected


```javascript
function collected() -> 'PreFilteredSearchBuilder'
```

This option forces search api to add a filter of collected content


**Returns**:


- _`PreFilteredSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.subscribersSearchBuilder().collected() 
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
function disableDefaultSorted() -> 'PreFilteredSearchBuilder'
```

The response will return a response without sorted


**Returns**:


- _`PreFilteredSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.assetsSearchBuilder().disableDefaultSorted() 
~~~

---

##### provisioned


```javascript
function provisioned() -> 'PreFilteredSearchBuilder'
```

This option forces search api to add a filter of provisioned content


**Returns**:


- _`PreFilteredSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.subscribersSearchBuilder().provisioned() 
~~~

---

##### removeCaseSensitive


```javascript
function removeCaseSensitive() -> 'EntitiesSearchBuilder'
```

The response will return a response by applying the filter with likes case-no-sensitive


**Returns**:


- _`EntitiesSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.entitiesSearchBuilder().removeCaseSensitive() 
~~~

---

##### select


```javascript
function select(select: SelectBuilder,object) -> 'PreFilteredSearchBuilder'
```

The search request will have this filter 

**Arguments**:

- `select` _SelectBuilder,object_  

**Returns**:


- _`PreFilteredSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.devicesSearchBuilder().select(
     ogapi.newSelectBuilder().add(SE.element("provision.device.identifier", ["value"], "id"), SE.add("device.temperature.value", ["value"]))
 ) // Setting SelectBuilder
 ogapi.devicesSearchBuilder().select({
     "elements": [
         {"name": "provision.device.identifier","fields": ["value"],"alias": "id"},
         {"name": "device.temperature.value","fields": ["value"]}
     ]
 }) //Custom select
~~~

---

