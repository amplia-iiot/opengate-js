+++
title = "Datamodels Finder"
weight = 10
+++

DatamodelsFinder

### DatamodelsFinder Objects

```javascript
class DatamodelsFinder()
```

  This class allow make get request to organization resource into Opengate North API.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `Reference` _InternalOpenGateAPI_  - to the API object.


---

##### findByOrganizationAndId


```javascript
function findByOrganizationAndId(organization: string,id: string) -> 'Promise'
```

Download a specific IoT Datamodel by its organization and id. This execute a GET http method

**Arguments**:

- `organization` _string_  - datamodel organization .
- `id` _string_  - datamodel id.

**Returns**:


- _`Promise`_ 


---

