+++
title = "Channel Finder"
weight = 10
+++

ChannelFinder

### ChannelFinder Objects

```javascript
class ChannelFinder()
```

  This class allow make get request to channel resource into Opengate North API.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - Reference to the API object.


---

##### findByDomainAndWorkgroup


```javascript
function findByDomainAndWorkgroup(domain: string,workgroup: string) -> 'Promise'
```

Performs a get that returns channels related

**Arguments**:

- `domain` _string_  - domain
- `workgroup` _string_  - workgroup.

**Returns**:


- _`Promise`_ 


---

##### findByDomainAndWorkgroupAndOrganization


```javascript
function findByDomainAndWorkgroupAndOrganization(domain: string,workgroup: string,organization: string) -> 'Promise'
```

Performs a get that returns channels related

**Arguments**:

- `domain` _string_  - domain
- `workgroup` _string_  - workgroup.
- `organization` _string_  - organization.

**Returns**:


- _`Promise`_ 


---

##### findByOrganizationAndName


```javascript
function findByOrganizationAndName(organization: string,name: string) -> 'Promise'
```

Download a specific channel by its organization and id. This execute a GET http method

**Arguments**:

- `organization` _string_  - channel organization .
- `name` _string_  - channel name.

**Returns**:


- _`Promise`_ 


---

