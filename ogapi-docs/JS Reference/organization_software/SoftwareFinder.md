+++
title = "Software Finder"
weight = 10
+++

SoftwareFinder

### SoftwareFinder Objects

```javascript
class SoftwareFinder()
```

  This class allow make get request to hardware softwares resource into Opengate North API.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `Reference` _InternalOpenGateAPI_  - to the API object.


---

##### administrable


```javascript
function administrable() -> 'this'
```

Marks visibility administrable for software list retrieval


**Returns**:


- _`this`_ 


---

##### assignable


```javascript
function assignable() -> 'this'
```

Marks visibility assignable for software list retrieval


**Returns**:


- _`this`_ 


---

##### findByOrganization


```javascript
function findByOrganization(organization: string) -> 'Promise'
```

Retrieves all software from a organization

**Arguments**:

- `organization` _string_  - organization name .

**Returns**:


- _`Promise`_ 


---

##### findByOrganizationAndId


```javascript
function findByOrganizationAndId(organization: string,identifier: string) -> 'Promise'
```

Retrieves a specific software

**Arguments**:

- `organization` _string_  - organization name .
- `identifier` _string_  - software name .

**Returns**:


- _`Promise`_ 


---

