+++
title = "Scheduler Finder"
weight = 10
+++

SchedulerFinder

### SchedulerFinder Objects

```javascript
class SchedulerFinder()
```

  This class allow make get request to planner resource into Opengate North API.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - Reference to the API object.


---

##### findAll


```javascript
function findAll() -> 'Promise'
```

Download a complete list of notebook schedulers for the user. This execute a GET http method


**Returns**:


- _`Promise`_ 


---

