+++
title = "Datamodels Helper"
weight = 10
+++

DatamodelsHelper

### DatamodelsHelper Objects

```javascript
class DatamodelsHelper()
```

This is a base object for update and delete a IoT Datamodel


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is ogapi instance
- `organization` _string_  - Organization where the IoT datamodel was create
- `datamodel` _object_  - Json object of IoT datamodel to modify or delete.


---

##### addCategory


```javascript
function addCategory(category: Object,datastreams: Array) -> 'DatamodelsHelper'
```

Add a category. If the field datastreams have value, they will add to this category

**Arguments**:

- `category` _Object_  
- `datastreams` _Array_  

**Returns**:


- _`DatamodelsHelper`_ 


---

##### addDatastream


```javascript
function addDatastream(category: string,datastream: object) -> 'DatamodelsHelper'
```

Add a datastream to the indicated category 

**Arguments**:

- `category` _string_  
- `datastream` _object_  

**Returns**:


- _`DatamodelsHelper`_ 


---

##### create


```javascript
function create()
```

Create not supported on this builder. Use IoTDatamodelHelper instead.



---

##### removeCategory


```javascript
function removeCategory(category: string) -> 'DatamodelsHelper'
```

Remove category

**Arguments**:

- `category` _string_  

**Returns**:


- _`DatamodelsHelper`_ 


---

##### removeDatastream


```javascript
function removeDatastream(category: string,id_datastream: string) -> 'DatamodelsHelper'
```

Remove datastream to the indicated category

**Arguments**:

- `category` _string_  
- `id_datastream` _string_  - of datastream

**Returns**:


- _`DatamodelsHelper`_ 


---

##### updateCategory


```javascript
function updateCategory(old_category: string,new_category: string) -> 'DatamodelsHelper'
```

Update category name

**Arguments**:

- `old_category` _string_  - name
- `new_category` _string_  - name

**Returns**:


- _`DatamodelsHelper`_ 


---

##### updateDatastream


```javascript
function updateDatastream(category: string,id_datastream: string,datastream: Object) -> 'DatamodelsHelper'
```

Update datastream to the indicated category

**Arguments**:

- `category` _string_  
- `id_datastream` _string_  - of datastream
- `datastream` _Object_  - json object

**Returns**:


- _`DatamodelsHelper`_ 


---

##### withDescription


```javascript
function withDescription(description: string) -> 'DatamodelsHelper'
```

Set the description attribute

**Arguments**:

- `description` _string_  

**Returns**:


- _`DatamodelsHelper`_ 


---

##### withIdentifier


```javascript
function withIdentifier(identifier: string) -> 'Datamodels'
```

Set the identifier attribute

**Arguments**:

- `identifier` _string_  - required field

**Returns**:


- _`Datamodels`_ 


---

##### withName


```javascript
function withName(name: string) -> 'DatamodelsHelper'
```

Set the name attribute

**Arguments**:

- `name` _string_  - required field

**Returns**:


- _`DatamodelsHelper`_ 


---

##### withVersion


```javascript
function withVersion(version: string) -> 'DatamodelsHelper'
```

Set the version attribute

**Arguments**:

- `version` _string_  - required field

**Returns**:


- _`DatamodelsHelper`_ 


---

