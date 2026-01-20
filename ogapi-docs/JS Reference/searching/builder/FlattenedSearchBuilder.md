+++
title = "Flattened Search Builder"
weight = 10
+++

FlattenedSearchBuilder

### FlattenedSearchBuilder Objects

```javascript
class FlattenedSearchBuilder()
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

##### build


```javascript
function build() -> 'Search'
```

Build a instance of Search 


**Returns**:


- _`Search`_ 


**Example**:

~~~javascript
 ogapi.devicesSearchBuilder().onProvisioned().build()
~~~

---

##### flattened


```javascript
function flattened() -> 'FlattenedSearchBuilder'
```

The response will return a flattened response


**Returns**:


- _`FlattenedSearchBuilder`_ 


**Example**:

~~~javascript
ogapi.entitiesSearchBuilder().flattened() 
~~~

---

