+++
title = "Allowed Resource Type Search Builder"
weight = 10
+++

AllowedResourceTypeSearchBuilder

### AllowedResourceTypeSearchBuilder Objects

```javascript
class AllowedResourceTypeSearchBuilder()
```

Defined a search over mobile phone provider catalog


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
  ogapi.AllowedResourceTypeSearchBuilder().build()
~~~

---

##### customFilters


```javascript
function customFilters()
```




---

##### withType


```javascript
function withType(type: string) -> 'AllowedResourceTypeSearchBuilder'
```

Sets type to search

**Arguments**:

- `type` _string_  - type to searcg

**Returns**:


- _`AllowedResourceTypeSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.AllowedResourceTypeSearchBuilder().withType('device').build()
~~~

---

