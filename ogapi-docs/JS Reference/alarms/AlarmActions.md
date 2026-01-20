+++
title = "Alarm Actions"
weight = 10
+++

AlarmActions

### AlarmActions Objects

```javascript
class AlarmActions()
```

This class contains all alarms actions builders


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is configuration about Opengate North API.


---

##### newAttendBuilder


```javascript
function newAttendBuilder() -> 'AlarmAttendBuilder'
```

Create alarm attend action builder


**Returns**:


- _`AlarmAttendBuilder`_ 


**Example**:

~~~javascript
ogapi.alarms.newAttendBuilder()
~~~

---

##### newCloseBuilder


```javascript
function newCloseBuilder() -> 'AlarmCloseBuilder'
```

Create alarm close action builder


**Returns**:


- _`AlarmCloseBuilder`_ 


**Example**:

~~~javascript
ogapi.alarms.newCloseBuilder()
~~~

---

