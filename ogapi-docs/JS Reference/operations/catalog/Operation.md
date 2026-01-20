+++
title = "Operation"
weight = 10
+++

Operation

### Operation Objects

```javascript
class Operation()
```

This is a abstract class, it must be extended to another class that defined the specific search.
This class is responsible to manage execute operations request to OpenGate North API


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is ogapi instance
- `resource` _string_  - this is a base url resource
- `postObj` _object_  - it will be sent as a data on post action


---

##### execute


```javascript
function execute() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises


**Returns**:


- _`Promise`_ 


---

##### updatePeriodicity


```javascript
function updatePeriodicity() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises


**Returns**:


- _`Promise`_ 


---

