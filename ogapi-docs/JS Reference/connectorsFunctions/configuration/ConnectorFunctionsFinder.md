+++
title = "Connector Functions Finder"
weight = 10
+++

ConnectorFunctionsFinder

### ConnectorFunctionsFinder Objects

```javascript
class ConnectorFunctionsFinder()
```

  This class allow make get request to ConnectorFunctions resource into Opengate North API.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - Reference to the API object.


---

##### findByOrganizationAndChannel


```javascript
function findByOrganizationAndChannel(organization: string,channel: string) -> 'Promise'
```

Performs a get that returns connectors functions related

**Arguments**:

- `organization` _string_  - organization
- `channel` _string_  - channel.

**Returns**:


- _`Promise`_ 


---

##### findByOrganizationAndChannelAndName


```javascript
function findByOrganizationAndChannelAndName(organization: string,channel: string,name: string) -> 'Promise'
```

Performs a get that returns connectors functions related

**Arguments**:

- `organization` _string_  - organization
- `channel` _string_  - channel.
- `name` _string_  - Connector function name

**Returns**:


- _`Promise`_ 


---

