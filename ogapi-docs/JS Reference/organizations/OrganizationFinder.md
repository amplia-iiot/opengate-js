+++
title = "Organization Finder"
weight = 10
+++

OrganizationFinder

### OrganizationFinder Objects

```javascript
class OrganizationFinder()
```

  This class allow make get request to organization resource into Opengate North API.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - Reference to the API object.


---

##### findByDomainAndWorkgroup


```javascript
function findByDomainAndWorkgroup(domain: string,workgroup: string) -> 'Promise'
```

Performs a get that returns organizations related

**Arguments**:

- `domain` _string_  - domain
- `workgroup` _string_  - workgroup.

**Returns**:


- _`Promise`_ 


---

##### findByName


```javascript
function findByName(name: string) -> 'Promise'
```

Find a specify organization by a name. This execute a GET http method

**Arguments**:

- `name` _string_  - Organization name

**Returns**:


- _`Promise`_ 


---

