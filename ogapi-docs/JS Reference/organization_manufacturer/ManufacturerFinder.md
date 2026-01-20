+++
title = "Manufacturer Finder"
weight = 10
+++

ManufacturerFinder

### ManufacturerFinder Objects

```javascript
class ManufacturerFinder()
```

  This class allow make get request to hardware manufacturers resource into Opengate North API.


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

Marks visibility administrable for manufacturer list retrieval


**Returns**:


- _`this`_ 


---

##### assignable


```javascript
function assignable() -> 'this'
```

Marks visibility assignable for manufacturer list retrieval


**Returns**:


- _`this`_ 


---

##### findByOrganization


```javascript
function findByOrganization(organization: string) -> 'Promise'
```

Retrieves all manufacturer from a organization

**Arguments**:

- `organization` _string_  - organization name .

**Returns**:


- _`Promise`_ 


---

##### findByOrganizationAndId


```javascript
function findByOrganizationAndId(organization: string,identifier: string) -> 'Promise'
```

Retrieves a specific manufacturer

**Arguments**:

- `organization` _string_  - organization name .
- `identifier` _string_  - manufacturer name .

**Returns**:


- _`Promise`_ 


---

