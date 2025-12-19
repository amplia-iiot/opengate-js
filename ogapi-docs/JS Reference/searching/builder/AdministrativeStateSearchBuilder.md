+++
title = "Administrative State Search Builder"
weight = 10
+++

AdministrativeStateSearchBuilder

### AdministrativeStateSearchBuilder Objects

```javascript
class AdministrativeStateSearchBuilder()
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
  ogapi.administrativeStateSearchBuilder().filter({and:[]}).build()
~~~

---

##### customFilters


```javascript
function customFilters()
```




---

##### withEntityType


```javascript
function withEntityType(entityType: string) -> 'AdministrativeStateSearchBuilder'
```

Set entityType to search

**Arguments**:

- `entityType` _string_  - model name

**Returns**:


- _`AdministrativeStateSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.administrativeStateSearchBuilder().withEntityType('myEntityType').build()
~~~

---

##### withId


```javascript
function withId(administrativeStateId: string) -> 'AdministrativeStateSearchBuilder'
```

Sets id to search

**Arguments**:

- `administrativeStateId` _string_  - specific type id

**Returns**:


- _`AdministrativeStateSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.administrativeStateSearchBuilder().withId('myId').build()
~~~

---

