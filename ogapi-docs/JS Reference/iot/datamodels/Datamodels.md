+++
title = "Datamodels"
weight = 10
+++

Datamodels

### Datamodels Objects

```javascript
class Datamodels()
```

This is a base object for create a IoT Datamodel


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is ogapi instance
- `organization` _string_  - Organization where the IoT datamodel will be created


---

##### addAllowedResourceType


```javascript
function addAllowedResourceType(resourceType: string) -> 'Datamodels'
```

Set the addAllowedResourceType attribute

**Arguments**:

- `resourceType` _string_  - required field

**Returns**:


- _`Datamodels`_ 


---

##### addCategory


```javascript
function addCategory(category: Object,datastreams: Array) -> 'Datamodels'
```

Add a flavor. If the field datastreams have value, they will add to this flavor

**Arguments**:

- `category` _Object_  
- `datastreams` _Array_  

**Returns**:


- _`Datamodels`_ 


---

##### addDatastream


```javascript
function addDatastream(category: string,datastream: object) -> 'Datamodels'
```

Add a datastream to the indicated category

**Arguments**:

- `category` _string_  
- `datastream` _object_  

**Returns**:


- _`Datamodels`_ 


---

##### delete


```javascript
function delete()
```

Delete not supported on this builder. Use IoTDatamodelHelper instead.



---

##### update


```javascript
function update()
```

Update not supported on this builder. Use IoTDatamodelHelper instead.



---

##### withDescription


```javascript
function withDescription(description: string) -> 'Datamodels'
```

Set the description attribute

**Arguments**:

- `description` _string_  

**Returns**:


- _`Datamodels`_ 


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
function withName(name: string) -> 'Datamodels'
```

Set the name attribute

**Arguments**:

- `name` _string_  - required field

**Returns**:


- _`Datamodels`_ 


---

##### withVersion


```javascript
function withVersion(version: string) -> 'Datamodels'
```

Set the version attribute

**Arguments**:

- `version` _string_  - required field

**Returns**:


- _`Datamodels`_ 


---

