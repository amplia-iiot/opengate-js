+++
title = "Bulk Execution Finder"
weight = 10
+++

BulkExecutionFinder

### BulkExecutionFinder Objects

```javascript
class BulkExecutionFinder()
```

  This class allow make get request to bulk executions resource into Opengate North API.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `Reference` _InternalOpenGateAPI_  - to the API object.


---

##### findByOrganizationAndId


```javascript
function findByOrganizationAndId(organization: string,id: string,mimetype: string) -> 'Promise'
```

Download a specific entity by its organization and id. This execute a GET http method

**Arguments**:

- `organization` _string_  - organization.
- `id` _string_  - bulk id.
- `mimetype` _string_  - Format of file when get the result details of previously created bulk process.

**Returns**:


- _`Promise`_ 


---

