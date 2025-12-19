+++
title = "History Finder"
weight = 10
+++

HistoryFinder

### HistoryFinder Objects

```javascript
class HistoryFinder()
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

##### findByOrganization


```javascript
function findByOrganization(organization: *) -> 'Promise'
```

Download a complete list of scheduler history for the organization. This execute a GET http method

**Arguments**:

- `organization` _*_  

**Returns**:


- _`Promise`_ 


---

##### findByOrganizationAndSchedulerId


```javascript
function findByOrganizationAndSchedulerId(organization: *,schedulerId: *) -> 'Promise'
```

Download a complete list of scheduler history for the organization and type selected. This execute a GET http method

**Arguments**:

- `organization` _*_  
- `schedulerId` _*_  

**Returns**:


- _`Promise`_ 


---

##### findByOrganizationAndType


```javascript
function findByOrganizationAndType(organization: *,type: *) -> 'Promise'
```

Download a complete list of scheduler history for the organization and type selected. This execute a GET http method

**Arguments**:

- `organization` _*_  
- `type` _*_  

**Returns**:


- _`Promise`_ 


---

##### withLimit


```javascript
function withLimit(limit: *) -> 'this'
```

Marks results limit

**Arguments**:

- `limit` _*_  

**Returns**:


- _`this`_ 


---

##### withSchedulerId


```javascript
function withSchedulerId(schedulerId: *) -> 'this'
```

Set parameter schedulerIds

**Arguments**:

- `schedulerId` _*_  

**Returns**:


- _`this`_ 


---

##### withSchedulerType


```javascript
function withSchedulerType(schedulerType: *) -> 'this'
```

Set parameter schedulerIds

**Arguments**:

- `schedulerType` _*_  

**Returns**:


- _`this`_ 


---

