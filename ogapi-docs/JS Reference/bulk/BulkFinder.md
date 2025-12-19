+++
title = "Bulk Finder"
weight = 10
+++

BulkFinder

### BulkFinder Objects

```javascript
class BulkFinder()
```

  This class allow make get request to bulk resource into Opengate North API.


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
function findByOrganizationAndId(organization: string,id: string,format: string,accept: string) -> 'Promise'
```

Download a specific entity by its organization and id. This execute a GET http method

**Arguments**:

- `organization` _string_  - entity organization .
- `id` _string_  - entity id.
- `format` _string_  - format response flag.
- `accept` _string_  - accept.

**Returns**:


- _`Promise`_ 


---

