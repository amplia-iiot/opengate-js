+++
title = "Model Finder"
weight = 10
+++

ModelFinder

### ModelFinder Objects

```javascript
class ModelFinder()
```

  This class allow make get request to hardware models resource into Opengate North API.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `Reference` _InternalOpenGateAPI_  - to the API object.


---

##### findByManufacturer


```javascript
function findByManufacturer(manufacturer: string) -> 'Promise'
```

Download all models from a manufacturer. This execute a GET http method

**Arguments**:

- `manufacturer` _string_  - manufacturer id .

**Returns**:


- _`Promise`_ 


---

##### findByManufacturerAndId


```javascript
function findByManufacturerAndId(manufacturer: string,identifier: string) -> 'Promise'
```

Download a specific model by its id. This execute a GET http method

**Arguments**:

- `manufacturer` _string_  - manufacturer id .
- `identifier` _string_  - model name .

**Returns**:


- _`Promise`_ 


---

##### findMediaByManufacturerAndModelAndId


```javascript
function findMediaByManufacturerAndModelAndId(manufacturer: string,modelId: string,mediaIdentifier: string) -> 'Promise'
```

Download a specific model media by its ids. This execute a GET http method

**Arguments**:

- `manufacturer` _string_  - manufacturer id .
- `modelId` _string_  - model identifier .
- `mediaIdentifier` _string_  - media identifier.

**Returns**:


- _`Promise`_ 


---

##### findMediasByManufacturerAndModel


```javascript
function findMediasByManufacturerAndModel(manufacturer: string,identifier: string) -> 'Promise'
```

Download a specific model media by its ids. This execute a GET http method

**Arguments**:

- `manufacturer` _string_  - manufacturer id .
- `identifier` _string_  - model identifier .

**Returns**:


- _`Promise`_ 


---

