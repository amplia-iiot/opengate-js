+++
title = "Pipeline Finder"
weight = 10
+++

PipelineFinder

### PipelineFinder Objects

```javascript
class PipelineFinder()
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

Download a complete list of pipelins for the organization. This executes a GET http method

**Arguments**:

- `organization` _*_  

**Returns**:


- _`Promise`_ 


---

