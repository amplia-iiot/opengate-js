+++
title = "Rule Configurations"
weight = 10
+++

RuleConfigurations

### RuleConfigurations Objects

```javascript
class RuleConfigurations()
```

This is a base object that contains all you can do about RulesConfigurations.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `Reference` _InternalOpenGateAPI_  - to the API object.


---

##### create


```javascript
function create() -> 'Promise'
```

Create a new Rule


**Returns**:


- _`Promise`_ 


---

##### delete


```javascript
function delete() -> 'Promise'
```

Deletes the selected RuleConfiguration


**Returns**:


- _`Promise`_ 


---

##### update


```javascript
function update() -> 'Promise'
```

Udpate a Rule


**Returns**:


- _`Promise`_ 


---

##### updateParameters


```javascript
function updateParameters(newParameters: *) -> 'Promise'
```

Udpate a Rule

**Arguments**:

- `newParameters` _*_  

**Returns**:


- _`Promise`_ 


---

##### withActions


```javascript
function withActions(actions: object) -> '_RuleCondition'
```

Allows the modification of the actions

**Arguments**:

- `actions` _object_  

**Returns**:


- _`_RuleCondition`_ 


---

##### withActionsDelay


```javascript
function withActionsDelay(actionsDelay: number) -> 'RulesConfigurations'
```

Set the actions delay attribute

**Arguments**:

- `actionsDelay` _number_  

**Returns**:


- _`RulesConfigurations`_ 


---

##### withActive


```javascript
function withActive(active: boolean) -> 'RulesConfigurations'
```

Set the active attribute

**Arguments**:

- `active` _boolean_  

**Returns**:


- _`RulesConfigurations`_ 


---

##### withChannel


```javascript
function withChannel(channel: string) -> 'RulesConfigurations'
```

Set the channel attribute

**Arguments**:

- `channel` _string_  - required field

**Returns**:


- _`RulesConfigurations`_ 


---

##### withCondition


```javascript
function withCondition(conditionFilter: string) -> '_RuleCondition'
```

Allows the modification of a condition

**Arguments**:

- `conditionFilter` _string_  

**Returns**:


- _`_RuleCondition`_ 


---

##### withDescription


```javascript
function withDescription(description: string) -> 'RulesConfigurations'
```

Set the description attribute

**Arguments**:

- `description` _string_  

**Returns**:


- _`RulesConfigurations`_ 


---

##### withIdentifier


```javascript
function withIdentifier(identifier: string) -> 'RulesConfigurations'
```

Set the identifier attribute

**Arguments**:

- `identifier` _string_  - required field

**Returns**:


- _`RulesConfigurations`_ 


---

##### withJavascript


```javascript
function withJavascript(javascript: string) -> 'RulesConfigurations'
```

Set the javascript attribute

**Arguments**:

- `javascript` _string_  

**Returns**:


- _`RulesConfigurations`_ 


---

##### withMode


```javascript
function withMode(mode: string) -> 'RulesConfigurations'
```

Set the mode attribute

**Arguments**:

- `mode` _string_  

**Returns**:


- _`RulesConfigurations`_ 


---

##### withName


```javascript
function withName(name: string) -> 'RulesConfigurations'
```

Set the name attribute

**Arguments**:

- `name` _string_  - required field

**Returns**:


- _`RulesConfigurations`_ 


---

##### withOrganization


```javascript
function withOrganization(organization: string) -> 'RulesConfigurations'
```

Set the organization attribute

**Arguments**:

- `organization` _string_  - required field

**Returns**:


- _`RulesConfigurations`_ 


---

##### withParameters


```javascript
function withParameters(parameters: array) -> '_RuleCondition'
```

Allows the modification of the actions

**Arguments**:

- `parameters` _array_  

**Returns**:


- _`_RuleCondition`_ 


---

##### withType


```javascript
function withType(type: string) -> 'RulesConfigurations'
```

Set the type attribute

**Arguments**:

- `type` _string_  

**Returns**:


- _`RulesConfigurations`_ 


---

