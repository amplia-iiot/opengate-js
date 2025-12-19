+++
title = "_Rule Condition"
weight = 10
+++

_RuleCondition

### _RuleCondition Objects

```javascript
class _RuleCondition()
```

Defines the builder to configure a _RuleCondition


##### constructor


```javascript
function  -> '_RuleCondition'
```

Constructor

**Arguments**:

- `parent` _RuleConfigurations_  - RuleConfiguration object
- `conditionData` _Object_  - condition data to manage

**Returns**:


- _`_RuleCondition`_ 


---

##### deactivateDelay


```javascript
function deactivateDelay() -> '_RuleCondition'
```

Deactivates the delay of the condition


**Returns**:


- _`_RuleCondition`_ 


---

##### parent


```javascript
function parent() -> 'RuleConfiguration'
```

Returns parent


**Returns**:


- _`RuleConfiguration`_ 


---

##### setDelay


```javascript
function setDelay(delay: number) -> '_RuleCondition'
```

Set the delay, in seconds, of the condition

**Arguments**:

- `delay` _number_  

**Returns**:


- _`_RuleCondition`_ 


---

##### setParameterValue


```javascript
function setParameterValue(parameterName: string,parameterValue: string) -> '_RuleCondition'
```

Sets a value to the selected parameter

**Arguments**:

- `parameterName` _string_  
- `parameterValue` _string_  

**Returns**:


- _`_RuleCondition`_ 


---

