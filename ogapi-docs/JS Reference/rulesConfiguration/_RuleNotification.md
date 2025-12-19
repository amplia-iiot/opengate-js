+++
title = "_Rule Notification"
weight = 10
+++

_RuleNotification

### _RuleNotification Objects

```javascript
class _RuleNotification()
```

Defines the builder to configure a _RuleNotification


##### constructor


```javascript
function  -> '_RuleNotification'
```

Constructor

**Arguments**:

- `parent` _RuleConfigurations_  - RuleConfiguration object
- `notificationData` _Object_  - notification data to manage

**Returns**:


- _`_RuleNotification`_ 


---

##### disableBearer


```javascript
function disableBearer(bearerName: string) -> '_RuleNotification'
```

Disables selected bearer

**Arguments**:

- `bearerName` _string_  

**Returns**:


- _`_RuleNotification`_ 


---

##### enableBearer


```javascript
function enableBearer(bearerName: string,bearerEnabled: boolean) -> '_RuleNotification'
```

Enables selected bearer

**Arguments**:

- `bearerName` _string_  
- `bearerEnabled` _boolean_  

**Returns**:


- _`_RuleNotification`_ 


---

##### parent


```javascript
function parent() -> 'RuleConfiguration'
```

Returns parent


**Returns**:


- _`RuleConfiguration`_ 


---

##### setBearerRecipients


```javascript
function setBearerRecipients(bearerName: string,bearerRecipients: Array) -> '_RuleNotification'
```

Sets recipients to the selected bearer

**Arguments**:

- `bearerName` _string_  
- `bearerRecipients` _Array_  

**Returns**:


- _`_RuleNotification`_ 


---

##### setEnabled


```javascript
function setEnabled(enabled: boolean) -> '_RuleNotification'
```

Set the delay of the notification

**Arguments**:

- `enabled` _boolean_  

**Returns**:


- _`_RuleNotification`_ 


---

