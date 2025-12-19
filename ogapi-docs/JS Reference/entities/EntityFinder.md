+++
title = "Entity Finder"
weight = 10
+++

EntityFinder

### EntityFinder Objects

```javascript
class EntityFinder()
```

  *   This class allow make get request to entity provisioned resource into Opengate North API.


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
function findByOrganizationAndId(organization: string,id: string,flattened: string) -> 'Promise'
```

Download a specific entity by its organization and id. This execute a GET http method

**Arguments**:

- `organization` _string_  - entity organization .
- `id` _string_  - entity id.
- `flattened` _string_  - flattened response flag.

**Returns**:


- _`Promise`_ 


---

