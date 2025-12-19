+++
title = "Geocluster Finder"
weight = 10
+++

GeoclusterFinder

### GeoclusterFinder Objects

```javascript
class GeoclusterFinder()
```

  This class allow make get request to user resource into Opengate North API.


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

Find all available geocluster. This execute a GET http method


**Returns**:


- _`Promise`_ 


---

##### findById


```javascript
function findById(id: string) -> 'Promise'
```

Find a specify geocluster by an identifier. This execute a GET http method

**Arguments**:

- `id` _string_  - Identifier of the geocluster.

**Returns**:


- _`Promise`_ 


---

##### findFeatures


```javascript
function findFeatures(id: string,coordinates: Object) -> 'Promise'
```

Find features inside the coordinates. This execute a GET http method

**Arguments**:

- `id` _string_  - Identifier of the geocluster.
- `coordinates` _Object_  - square defined by the coordinates and the zoom used to find the inside features .

**Returns**:


- _`Promise`_ 


---

