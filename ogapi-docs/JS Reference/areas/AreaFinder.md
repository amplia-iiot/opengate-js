+++
title = "Area Finder"
weight = 10
+++

AreaFinder

### AreaFinder Objects

```javascript
class AreaFinder()
```

  This class allow make get request to area resource into Opengate North API.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - Reference to the API object.


---

##### findByOrganizationAndIdentifier


```javascript
function findByOrganizationAndIdentifier(organization: string,identifier: string) -> 'Promise'
```

Download a specific area by its organization and identifier. This execute a GET http method

**Arguments**:

- `organization` _string_  - area organization .
- `identifier` _string_  - area name.

**Returns**:


- _`Promise`_ 


---

