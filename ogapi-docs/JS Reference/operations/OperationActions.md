+++
title = "Operation Actions"
weight = 10
+++

OperationActions

### OperationActions Objects

```javascript
class OperationActions()
```




##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is configuration about Opengate North API.
- `operationId` _string_  - Identifier of the operation on which the action will be carried out


---

##### active


```javascript
function active() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function active an operation


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
ogapi.newOperationActions("xxxxx-xxx-xxxx-xxxxx").active()
~~~

---

##### activePeriodicity


```javascript
function activePeriodicity() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function active periodicity of an operation


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
ogapi.newOperationActions("xxxxx-xxx-xxxx-xxxxx").activePeriodicity()
~~~

---

##### cancel


```javascript
function cancel() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function cancela operation


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
Actions("xxxxx-xxx-xxxx-xxxxx").cancel();
~~~

---

##### cancelPeriodicity


```javascript
function cancelPeriodicity() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function cancel the periodicity of an operation


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx").cancelPeriodicity();
~~~

---

##### changeCallback


```javascript
function changeCallback(url: string) -> 'promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function pauses (if it was active), updates the callback and passes the operation to the initial state (if activated, activated again)

**Arguments**:

- `url` _string_  

**Returns**:


- _`promise`_ 


**Example**:

~~~javascript
ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx").changeCallback("http://[your_application_address]/[your_URI]")
~~~

---

##### executeLater


```javascript
function executeLater(minutes: number) -> 'promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function pauses (if it was active), updates the delay and passes the operation to the initial state (if activated, activated again)

**Arguments**:

- `minutes` _number_  

**Returns**:


- _`promise`_ 


**Example**:

~~~javascript
ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx").executeLater(10)
~~~

---

##### executeNow


```javascript
function executeNow() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function pause, update its delay and active an operation for execute immediately


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx").executeNow()
~~~

---

##### pause


```javascript
function pause() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function pause an operation


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx").pause()
~~~

---

##### pausePeriodicity


```javascript
function pausePeriodicity() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function pause periodicity of an operation


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
ogapi.OperationActions("xxxxx-xxx-xxxx-xxxxx").pausePeriodicity()
~~~

---

