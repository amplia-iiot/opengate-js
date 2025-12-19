+++
title = "Operation Types Builder"
weight = 10
+++

OperationTypesBuilder

### OperationTypesBuilder Objects

```javascript
class OperationTypesBuilder()
```

Defined a search over operationTypes	


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
 ogapi.devicesSearchBuilder().onProvisioned().build()
~~~

---

