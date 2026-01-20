+++
title = "Domain Finder"
weight = 10
+++

DomainFinder

### DomainFinder Objects

```javascript
class DomainFinder()
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

##### findByName


```javascript
function findByName(name: string) -> 'Promise'
```

Constructor

**Arguments**:

- `name` _string_  - domain name .

**Returns**:


- _`Promise`_ 


---

##### findByNameWithHierarchy


```javascript
function findByNameWithHierarchy(name: string) -> 'Promise'
```

Constructor

**Arguments**:

- `name` _string_  - domain name.

**Returns**:


- _`Promise`_ 


---

