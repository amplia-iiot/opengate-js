+++
title = "Timeseries Function"
weight = 10
+++

TimeseriesFunction

### TimeseriesFunction Objects

```javascript
class TimeseriesFunction()
```

This is a base object that contains all you can do about TimeseriesFunction.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `Reference` _InternalOpenGateAPI_  - to the API object.


---

##### create


```javascript
function create() -> '*'
```



**Returns**:


- _`*`_ 


---

##### delete


```javascript
function delete() -> 'Promise'
```

Deletes the selected RuleConfiguration


**Returns**:


- _`Promise`_ 


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
function withDescription(description: string) -> 'TimeseriesFunction'
```

Set the description attribute

**Arguments**:

- `description` _string_  

**Returns**:


- _`TimeseriesFunction`_ 


---

##### withIdentifier


```javascript
function withIdentifier(name: string) -> 'TimeseriesFunction'
```

Set the name for update attribute

**Arguments**:

- `name` _string_  - required field

**Returns**:


- _`TimeseriesFunction`_ 


---

##### withMetadataFile


```javascript
function withMetadataFile()
```


**Arguments**:

- `file` _*_  


---

##### withName


```javascript
function withName(name: string) -> 'TimeseriesFunction'
```

Set the name attribute

**Arguments**:

- `name` _string_  - required field

**Returns**:


- _`TimeseriesFunction`_ 


---

##### withOrganization


```javascript
function withOrganization(organization: string) -> 'TimeseriesFunction'
```

Set the organization attribute

**Arguments**:

- `organization` _string_  - required field

**Returns**:


- _`TimeseriesFunction`_ 


---

##### withReturnType


```javascript
function withReturnType(returnType: String) -> 'TimeseriesFunction'
```

Set the returnType attribute

**Arguments**:

- `returnType` _String_  

**Returns**:


- _`TimeseriesFunction`_ 


---

##### withScript


```javascript
function withScript(script: string) -> 'TimeseriesFunction'
```

Set the script attribute

**Arguments**:

- `script` _string_  

**Returns**:


- _`TimeseriesFunction`_ 


---

##### withValueTypes


```javascript
function withValueTypes(valueTypes: Array) -> 'TimeseriesFunction'
```

Set the valueTypes attribute

**Arguments**:

- `valueTypes` _Array_  

**Returns**:


- _`TimeseriesFunction`_ 


---

