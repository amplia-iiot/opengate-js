+++
title = "Pipeline"
weight = 10
+++

Pipeline

### Pipeline Objects

```javascript
class Pipeline()
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

##### addImageExecution


```javascript
function addImageExecution(imageExecution: ImageExecution) -> 'Pipeline'
```

Adds an Image Execution to the pipeline

**Arguments**:

- `imageExecution` _ImageExecution_  

**Returns**:


- _`Pipeline`_ 


---

##### addRestResquest


```javascript
function addRestResquest(restRequest: RestRequest) -> 'Pipeline'
```

Adds a rest request to the pipeline

**Arguments**:

- `restRequest` _RestRequest_  

**Returns**:


- _`Pipeline`_ 


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

##### withIdentifier


```javascript
function withIdentifier(identifier: string) -> 'Pipeline'
```

Sets the identifier attribute

**Arguments**:

- `identifier` _string_  

**Returns**:


- _`Pipeline`_ 


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
function withScheduleCronExpression(cronExpression: string) -> 'Pipeline'
```

Sets the crontab expression for schedule

**Arguments**:

- `cronExpression` _string_  

**Returns**:


- _`Pipeline`_ 


---

##### withScheduleImmediateExecution


```javascript
function withScheduleImmediateExecution(isImmediateExecution: boolean) -> 'Pipeline'
```

Sets the isImmediateExecution attribute for schedule

**Arguments**:

- `isImmediateExecution` _boolean_  

**Returns**:


- _`Pipeline`_ 


---

