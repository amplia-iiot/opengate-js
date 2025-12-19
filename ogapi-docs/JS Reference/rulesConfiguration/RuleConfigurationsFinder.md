+++
title = "Rule Configurations Finder"
weight = 10
+++

RuleConfigurationsFinder

### RuleConfigurationsFinder Objects

```javascript
class RuleConfigurationsFinder()
```

  This class allow make get request to RuleConfigurations resource into Opengate North API.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - Reference to the API object.


---

##### findByOrganizationAndChannelAndName


```javascript
function findByOrganizationAndChannelAndName(organization: string,channel: string,name: string) -> 'Promise'
```

Performs a get that returns organizations related

**Arguments**:

- `organization` _string_  - organization
- `channel` _string_  - channel.
- `name` _string_  - Rule Configuration name

**Returns**:


- _`Promise`_ 


---

