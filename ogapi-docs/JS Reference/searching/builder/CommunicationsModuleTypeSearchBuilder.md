+++
title = "Communications Module Type Search Builder"
weight = 10
+++

CommunicationsModuleTypeSearchBuilder

### CommunicationsModuleTypeSearchBuilder Objects

```javascript
class CommunicationsModuleTypeSearchBuilder()
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

##### withType


```javascript
function withType(communicationsModuleType: string) -> 'CommunicationsModuleTypeSearchBuilder'
```

Sets id to search

**Arguments**:

- `communicationsModuleType` _string_  - specific type

**Returns**:


- _`CommunicationsModuleTypeSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.communicationsModuleTypeSearchBuilder().withType('GENERIC').build()
~~~

---

