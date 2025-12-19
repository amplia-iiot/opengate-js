+++
title = "Simple Builder"
weight = 10
+++

SimpleBuilder

### SimpleBuilder Objects

```javascript
class SimpleBuilder()
```

This class allow set simple values.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is ogapi instance
- `resource` _string_  - this is the resource url where can be create/delete/update/read the entity
- `allowedDatastreams` _array_ (optional) - Allowed datastreams to add into the new entity
- `definedSchemas` _array_ (optional) - Jsonschema about all OpenGate specific types
- `jsonSchemaValidator` _Validator_ (optional) - Json schema validator tool


---

##### deleteAll


```javascript
function deleteAll() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function deletes a entity of provision


**Returns**:


- _`Promise`_ 


---

##### getAllowedDatastreams


```javascript
function getAllowedDatastreams() -> 'array'
```



**Returns**:


- _`array`_ - Allowed Datastream definition array


---

##### getEntityKey


```javascript
function getEntityKey() -> 'string'
```



**Returns**:


- _`string`_ - Entity identifier


---

##### initFromFlattened


```javascript
function initFromFlattened()
```


**Arguments**:

- `_flattenedEntityData` _*_  


---

##### initFromJson


```javascript
function initFromJson()
```


**Arguments**:

- `_jsonEntityData` _*_  


---

##### patch


```javascript
function patch() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function patch a entity of provision


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
 ogapi.organizationsBuilder().update()
~~~

---

##### update


```javascript
function update() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function updates a entity of provision


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
 ogapi.organizationsBuilder().update()
~~~

---

##### with


```javascript
function with(_id: string,val: objecr) -> '*'
```

Set new datastream value

**Arguments**:

- `_id` _string_  - Datastream identifier
- `val` _objecr_  - Datastream value. If this value is null then datastream value will be removed.

**Returns**:


- _`*`_ 


---

