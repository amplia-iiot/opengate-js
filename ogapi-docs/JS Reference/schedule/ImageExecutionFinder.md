+++
title = "Image Execution Finder"
weight = 10
+++

ImageExecutionFinder

### ImageExecutionFinder Objects

```javascript
class ImageExecutionFinder()
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

