+++
title = "Timeseries Function Finder"
weight = 10
+++

TimeseriesFunctionFinder

### TimeseriesFunctionFinder Objects

```javascript
class TimeseriesFunctionFinder()
```

  This class allow make get request to TimeseriesFunction resource into Opengate North API.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - Reference to the API object.


---

##### findByOrganization


```javascript
function findByOrganization(organization: string) -> 'Promise'
```

Performs a get that returns a list of timeseries function

**Arguments**:

- `organization` _string_  - organization

**Returns**:


- _`Promise`_ 


---

##### findByOrganizationAndName


```javascript
function findByOrganizationAndName(organization: string,name: string,script: boolean) -> 'Promise'
```

Performs a get that returns a timeseries function metadata

**Arguments**:

- `organization` _string_  - organization
- `name` _string_  - Timeseries function Configuration name
- `script` _boolean_  - If true script content will be downloaded

**Returns**:


- _`Promise`_ 


---

