+++
title = "Operation Type"
weight = 10
+++

OperationType

### OperationType Objects

```javascript
class OperationType()
```

This is a base object that contains all you can do about OperationType.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `Reference` _InternalOpenGateAPI_  - to the API object.


---

##### applicableTo


```javascript
function applicableTo(applicableTo: array) -> 'OperationType'
```

Allows the modification of the applicableTo

**Arguments**:

- `applicableTo` _array_  

**Returns**:


- _`OperationType`_ 


---

##### create


```javascript
function create() -> 'Promise'
```

Create a new Rule


**Returns**:


- _`Promise`_ 


---

##### delete


```javascript
function delete() -> 'Promise'
```

Deletes the selected RuleConfiguration


**Returns**:


- _`Promise`_ 


---

##### fromCatalog


```javascript
function fromCatalog(fromCatalog: string) -> 'OperationType'
```

Set the catalog

**Arguments**:

- `fromCatalog` _string_  

**Returns**:


- _`OperationType`_ 


---

##### update


```javascript
function update() -> 'Promise'
```

Udpate a Rule


**Returns**:


- _`Promise`_ 


---

##### withDescription


```javascript
function withDescription(description: string) -> 'OperationType'
```

Set the description attribute

**Arguments**:

- `description` _string_  

**Returns**:


- _`OperationType`_ 


---

##### withIdentifier


```javascript
function withIdentifier(name: string) -> 'OperationType'
```

Set the name for update attribute

**Arguments**:

- `name` _string_  - required field

**Returns**:


- _`OperationType`_ 


---

##### withModels


```javascript
function withModels(models: array) -> 'OperationType'
```

Allows the modification of the allowed models

**Arguments**:

- `models` _array_  

**Returns**:


- _`OperationType`_ 


---

##### withName


```javascript
function withName(name: string) -> 'OperationType'
```

Set the name attribute

**Arguments**:

- `name` _string_  - required field

**Returns**:


- _`OperationType`_ 


---

##### withOrganization


```javascript
function withOrganization(organization: string) -> 'OperationType'
```

Set the organization attribute

**Arguments**:

- `organization` _string_  - required field

**Returns**:


- _`OperationType`_ 


---

##### withParameters


```javascript
function withParameters(parameters: array) -> 'OperationType'
```

Allows the modification of the parameters

**Arguments**:

- `parameters` _array_  

**Returns**:


- _`OperationType`_ 


---

##### withProfiles


```javascript
function withProfiles(profiles: array) -> 'OperationType'
```

Allows the modification of the profiles allowed

**Arguments**:

- `profiles` _array_  

**Returns**:


- _`OperationType`_ 


---

##### withSteps


```javascript
function withSteps(steps: array) -> 'OperationType'
```

Allows the modification of the steps

**Arguments**:

- `steps` _array_  

**Returns**:


- _`OperationType`_ 


---

##### withTitle


```javascript
function withTitle(title: string) -> 'OperationType'
```

Set the title attribute

**Arguments**:

- `title` _string_  - required field

**Returns**:


- _`OperationType`_ 


---

