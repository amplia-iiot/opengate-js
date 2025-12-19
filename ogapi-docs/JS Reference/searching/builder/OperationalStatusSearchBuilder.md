+++
title = "Operational Status Search Builder"
weight = 10
+++

OperationalStatusSearchBuilder

### OperationalStatusSearchBuilder Objects

```javascript
class OperationalStatusSearchBuilder()
```

Defined a search over operational status catalogs    


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
  ogapi.operationalStatusSearchBuilder().filter({and:[]}).build()
~~~

---

##### customFilters


```javascript
function customFilters()
```




---

##### withEntityType


```javascript
function withEntityType(entityType: string) -> 'OperationalStatusSearchBuilder'
```

Set entityType to search

**Arguments**:

- `entityType` _string_  - model name

**Returns**:


- _`OperationalStatusSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.operationalStatusSearchBuilder().withEntityType('myEntityType').build()
~~~

---

##### withId


```javascript
function withId(operationalStatusId: string) -> 'OperationalStatusSearchBuilder'
```

Sets id to search

**Arguments**:

- `operationalStatusId` _string_  - operational status id

**Returns**:


- _`OperationalStatusSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.operationalStatusSearchBuilder().withId('myId').build()
~~~

---

