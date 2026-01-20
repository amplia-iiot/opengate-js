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

##### findByOrganizationAndManufacturerAndId


```javascript
function findByOrganizationAndManufacturerAndId(organization: string,manufacturer: string,identifier: string) -> 'Promise'
```

Download a specific model by its id. This execute a GET http method

**Arguments**:

- `organization` _string_  - model organization .
- `manufacturer` _string_  - model manufacturer .
- `identifier` _string_  - model name .

**Returns**:


- _`Promise`_ 


---

