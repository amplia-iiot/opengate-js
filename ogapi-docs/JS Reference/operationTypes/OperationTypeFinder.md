+++
title = "Operation Type Finder"
weight = 10
+++

OperationTypeFinder

### OperationTypeFinder Objects

```javascript
class OperationTypeFinder()
```

  This class allow make get request to OperationType resource into Opengate North API.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - Reference to the API object.


---

##### findByOrganizationAndName


```javascript
function findByOrganizationAndName(organization: string,name: string) -> 'Promise'
```

Performs a get that returns operation type

**Arguments**:

- `organization` _string_  - organization
- `name` _string_  - Rule Configuration name

**Returns**:


- _`Promise`_ 


---

