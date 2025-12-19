+++
title = "Image Execution"
weight = 10
+++

ImageExecution

### ImageExecution Objects

```javascript
class ImageExecution()
```

This is a base object that contains all you can do about Bundles.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `Reference` _InternalOpenGateAPI_  - to the API object.


---

##### toJson


```javascript
function toJson() -> '*'
```



**Returns**:


- _`*`_ 


---

##### update


```javascript
function update()
```




---

##### withEnvFrom


```javascript
function withEnvFrom(imageExecutionEnvFrom: array) -> 'ImageExecution'
```

Sets the env from for imageExecution

**Arguments**:

- `imageExecutionEnvFrom` _array_  

**Returns**:


- _`ImageExecution`_ 


---

##### withEnvVars


```javascript
function withEnvVars(imageExecutionEnvVars: object) -> 'ImageExecution'
```

Sets the env vars for imageExecution

**Arguments**:

- `imageExecutionEnvVars` _object_  

**Returns**:


- _`ImageExecution`_ 


---

##### withIdentifier


```javascript
function withIdentifier(identifier: string) -> 'ImageExecution'
```

Sets the identifier attribute

**Arguments**:

- `identifier` _string_  

**Returns**:


- _`ImageExecution`_ 


---

##### withMaxTimeToWaitCallback


```javascript
function withMaxTimeToWaitCallback(asyncResponseMaxTimeToWaitCallback: string) -> 'ImageExecution'
```

Sets the async response with selected timeout

**Arguments**:

- `asyncResponseMaxTimeToWaitCallback` _string_  

**Returns**:


- _`ImageExecution`_ 


---

##### withName


```javascript
function withName(imageExecutionName: string) -> 'ImageExecution'
```

Sets the name for imageExecution

**Arguments**:

- `imageExecutionName` _string_  

**Returns**:


- _`ImageExecution`_ 


---

##### withOrganization


```javascript
function withOrganization(organization: string) -> 'Channels'
```

Set the organization attribute

**Arguments**:

- `organization` _string_  

**Returns**:


- _`Channels`_ 


---

##### withScheduleCronExpression


```javascript
function withScheduleCronExpression(cronExpression: string) -> 'ImageExecution'
```

Sets the crontab expression for schedule

**Arguments**:

- `cronExpression` _string_  

**Returns**:


- _`ImageExecution`_ 


---

##### withScheduleImmediateExecution


```javascript
function withScheduleImmediateExecution(isImmediateExecution: boolean) -> 'ImageExecution'
```

Sets the isImmediateExecution attribute for schedule

**Arguments**:

- `isImmediateExecution` _boolean_  

**Returns**:


- _`ImageExecution`_ 


---

##### withTag


```javascript
function withTag(imageExecutionTag: string) -> 'ImageExecution'
```

Sets the tag for imageExecution

**Arguments**:

- `imageExecutionTag` _string_  

**Returns**:


- _`ImageExecution`_ 


---

##### withTimeout


```javascript
function withTimeout(timeout: string) -> 'ImageExecution'
```

Sets the execution timeout for imageExecution

**Arguments**:

- `timeout` _string_  

**Returns**:


- _`ImageExecution`_ 


---

