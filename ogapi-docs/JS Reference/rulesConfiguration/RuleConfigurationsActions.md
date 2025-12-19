+++
title = "Rule Configurations Actions"
weight = 10
+++

RuleConfigurationsActions

### RuleConfigurationsActions Objects

```javascript
class RuleConfigurationsActions()
```




##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is configuration about Opengate North API.
- `name` _string_  - Identifier of the ryule configuration to operate


---

##### cloneTo


```javascript
function cloneTo(newRuleName: string,newRuleOpenAction: boolean,newRuleCloseAction: string,newRuleNotifications: boolean) -> 'Promise'
```

Clones a rule configuration into a new one

**Arguments**:

- `newRuleName` _string_  
- `newRuleOpenAction` _boolean_  
- `newRuleCloseAction` _string_  
- `newRuleNotifications` _boolean_  

**Returns**:


- _`Promise`_ 


---

