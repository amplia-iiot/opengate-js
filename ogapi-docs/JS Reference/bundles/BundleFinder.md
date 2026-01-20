+++
title = "Bundle Finder"
weight = 10
+++

BundleFinder

### BundleFinder Objects

```javascript
class BundleFinder()
```

  This class allow make get request to certificate resource into Opengate North API.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `Reference` _InternalOpenGateAPI_  - to the API object.


---

##### findByNameAndVersion


```javascript
function findByNameAndVersion(name: string,version: string) -> 'Promise'
```

Download a specific bundle by its name and version. This execute a GET http method

**Arguments**:

- `name` _string_  - bundle name .
- `version` _string_  - bundle version.

**Returns**:


- _`Promise`_ 


---

