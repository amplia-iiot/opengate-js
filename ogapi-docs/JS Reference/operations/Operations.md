+++
title = "Operations"
weight = 10
+++

Operations

### Operations Objects

```javascript
class Operations()
```

This class generates all operations builders by a response to search into catalog/operations


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is configuration about Opengate North API.


---

##### builderByOperationName


```javascript
function builderByOperationName(name: String) -> 'Promise'
```

Create a builder to create an operation 

**Arguments**:

- `name` _String_  - name of the operation to be created

**Returns**:


- _`Promise`_ 


---

##### getOperationList


```javascript
function getOperationList() -> '*'
```



**Returns**:


- _`*`_ 


---

##### updatePeriodicityBuilder


```javascript
function updatePeriodicityBuilder(operationId: String) -> 'Promise'
```

Create a builder to update the periodicity of an operation 

**Arguments**:

- `operationId` _String_  - identifier of the operation to be updated~

**Returns**:


- _`Promise`_ 


---

