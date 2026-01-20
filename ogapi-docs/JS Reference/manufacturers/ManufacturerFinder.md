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

##### findAll


```javascript
function findAll() -> 'Promise'
```

Download a specific manufacturer by its id. This execute a GET http method


**Returns**:


- _`Promise`_ 


---

##### findById


```javascript
function findById(identifier: string) -> 'Promise'
```

Download a specific manufacturer by its id. This execute a GET http method

**Arguments**:

- `identifier` _string_  - manufacturer identifier .

**Returns**:


- _`Promise`_ 


---

##### findMediaById


```javascript
function findMediaById(manufacturerId: string,mediaIdentifier: string) -> 'Promise'
```

Download a specific manufacturer media by its ids. This execute a GET http method

**Arguments**:

- `manufacturerId` _string_  - manufacturer identifier .
- `mediaIdentifier` _string_  - media identifier.

**Returns**:


- _`Promise`_ 


---

##### findMedias


```javascript
function findMedias(manufacturerId: string) -> 'Promise'
```

Download manufacturer medias. This execute a GET http method

**Arguments**:

- `manufacturerId` _string_  - manufacturer identifier .

**Returns**:


- _`Promise`_ 


---

