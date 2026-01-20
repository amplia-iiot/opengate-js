+++
title = "Rest Request"
weight = 10
+++

RestRequest

### RestRequest Objects

```javascript
class RestRequest()
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

##### withAsyncResponseMaxTimeToWaitCallback


```javascript
function withAsyncResponseMaxTimeToWaitCallback(asyncResponseMaxTimeToWaitCallback: string) -> 'RestRequest'
```

Sets the async response with selected timeout

**Arguments**:

- `asyncResponseMaxTimeToWaitCallback` _string_  

**Returns**:


- _`RestRequest`_ 


---

##### withBody


```javascript
function withBody(restRequestBody: string) -> 'RestRequest'
```

Sets the body for restRequest

**Arguments**:

- `restRequestBody` _string_  

**Returns**:


- _`RestRequest`_ 


---

##### withHeaders


```javascript
function withHeaders(restRequestHeaders: string) -> 'RestRequest'
```

Sets the header for restRequest

**Arguments**:

- `restRequestHeaders` _string_  

**Returns**:


- _`RestRequest`_ 


---

##### withIdentifier


```javascript
function withIdentifier(identifier: string) -> 'RestRequest'
```

Sets the identifier attribute

**Arguments**:

- `identifier` _string_  

**Returns**:


- _`RestRequest`_ 


---

##### withMethod


```javascript
function withMethod(restRequestMethod: string) -> 'RestRequest'
```

Sets the method for restRequest

**Arguments**:

- `restRequestMethod` _string_  

**Returns**:


- _`RestRequest`_ 


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
function withScheduleCronExpression(cronExpression: string) -> 'RestRequest'
```

Sets the crontab expression for schedule

**Arguments**:

- `cronExpression` _string_  

**Returns**:


- _`RestRequest`_ 


---

##### withScheduleImmediateExecution


```javascript
function withScheduleImmediateExecution(isImmediateExecution: boolean) -> 'RestRequest'
```

Sets the isImmediateExecution attribute for schedule

**Arguments**:

- `isImmediateExecution` _boolean_  

**Returns**:


- _`RestRequest`_ 


---

##### withSyncResponseTimeout


```javascript
function withSyncResponseTimeout(syncResponseTimeout: string) -> 'RestRequest'
```

Sets the sync response with selected timeout

**Arguments**:

- `syncResponseTimeout` _string_  

**Returns**:


- _`RestRequest`_ 


---

##### withUrl


```javascript
function withUrl(restRequestUrl: string) -> 'RestRequest'
```

Sets the url for restRequest

**Arguments**:

- `restRequestUrl` _string_  

**Returns**:


- _`RestRequest`_ 


---

