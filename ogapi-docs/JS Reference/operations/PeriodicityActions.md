+++
title = "Periodicity Actions"
weight = 10
+++

PeriodicityActions

### PeriodicityActions Objects

```javascript
class PeriodicityActions()
```




##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is configuration about Opengate North API.
- `taskId` _string_  - Identifier of the periodicity on which the action will be carried out


---

##### activate


```javascript
function activate() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function active periodicity of an operation


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
ogapi.newPeriodicityActions("xxxxx-xxx-xxxx-xxxxx").activate()
~~~

---

##### cancel


```javascript
function cancel() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function cancel a periodicity


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
ogapi.periodicityActions("xxxxx-xxx-xxxx-xxxxx").cancelPeriodicity();
~~~

---

##### pause


```javascript
function pause() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function pauses a periodicity


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
ogapi.periodicityActions("xxxxx-xxx-xxxx-xxxxx").pausePeriodicity()
~~~

---

