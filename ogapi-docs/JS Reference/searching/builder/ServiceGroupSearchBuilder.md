+++
title = "Service Group Search Builder"
weight = 10
+++

ServiceGroupSearchBuilder

### ServiceGroupSearchBuilder Objects

```javascript
class ServiceGroupSearchBuilder()
```

Defined a search over service group catalogs    


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `parent` _InternalOpenGateAPI_  - Instance of our InternalOpenGateAPI


---

##### build


```javascript
function build() -> 'StaticSearch'
```

Build a instance of StaticSearch 


**Returns**:


- _`StaticSearch`_ 


**Example**:

~~~javascript
  ogapi.serviceGroupSearchBuilder().filter({and:[]}).build()
~~~

---

##### customFilters


```javascript
function customFilters()
```




---

##### withEntityType


```javascript
function withEntityType(entityType: string) -> 'ServiceGroupSearchBuilder'
```

Set entityType to search

**Arguments**:

- `entityType` _string_  - entity type

**Returns**:


- _`ServiceGroupSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.serviceGroupSearchBuilder().withEntityType('myEntityType').build()
~~~

---

