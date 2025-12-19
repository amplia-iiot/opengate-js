+++
title = "Timeseries Finder"
weight = 10
+++

TimeseriesFinder

### TimeseriesFinder Objects

```javascript
class TimeseriesFinder()
```

  This class allow make get request to TimeseriesFinder resource into Opengate North API.


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
function findByOrganization(organization: string,expand: Array,dataStreams: Array) -> 'Promise'
```

Performs a get that returns list of timeseries

**Arguments**:

- `organization` _string_  - organization
- `expand` _Array_  - [&#x27;columns&#x27;, &#x27;context&#x27;]
- `dataStreams` _Array_  - [&quot;ds_id_1&quot;,&quot;ds_id_2&quot;]

**Returns**:


- _`Promise`_ 


---

##### findByOrganizationAndName


```javascript
function findByOrganizationAndName(organization: string,name: string) -> 'Promise'
```

Performs a get that returns a definition of timeserie

**Arguments**:

- `organization` _string_  - organization
- `name` _string_  - timeserie name

**Returns**:


- _`Promise`_ 


---

##### findByOrganizationAndTimeserieId


```javascript
function findByOrganizationAndTimeserieId(organization: string,timeserieId: string) -> 'Promise'
```

Performs a get that returns a definition of timeserie

**Arguments**:

- `organization` _string_  - organization
- `timeserieId` _string_  - timeserie identifier

**Returns**:


- _`Promise`_ 


---

