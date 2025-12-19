+++
title = "provision Processors Finder"
weight = 10
+++

provisionProcessorsFinder

### provisionProcessorsFinder Objects

```javascript
class provisionProcessorsFinder()
```

  This class allow make get request to ProvisionProcessors Finder resource into Opengate North API.


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

Performs a get that returns list of provision processors

**Arguments**:

- `organization` _string_  - organization

**Returns**:


- _`Promise`_ 


---

##### findByOrganizationAndProvisionProcessorId


```javascript
function findByOrganizationAndProvisionProcessorId(organization: string,identifier: string) -> 'Promise'
```

Performs a get that returns a definition of provision Processors

**Arguments**:

- `organization` _string_  - organization
- `identifier` _string_  - Provision Processors identifier

**Returns**:


- _`Promise`_ 


---

