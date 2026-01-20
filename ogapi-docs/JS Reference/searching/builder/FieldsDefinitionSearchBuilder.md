+++
title = "Fields Definition Search Builder"
weight = 10
+++

FieldsDefinitionSearchBuilder

### FieldsDefinitionSearchBuilder Objects

```javascript
class FieldsDefinitionSearchBuilder()
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
  ogapi.FieldsDefinitionSearchBuilder().build()
~~~

---

##### customFilters


```javascript
function customFilters()
```




---

##### withType


```javascript
function withType(fieldDefinitionType: string) -> 'fieldsDefinitionSearchBuilder'
```

Sets id to search

**Arguments**:

- `fieldDefinitionType` _string_  - specific type

**Returns**:


- _`fieldsDefinitionSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.fieldsDefinitionSearchBuilder().withType('string').build()
~~~

---

