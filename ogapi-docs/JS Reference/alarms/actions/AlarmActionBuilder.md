+++
title = "Alarm Action Builder"
weight = 10
+++

AlarmActionBuilder

### AlarmActionBuilder Objects

```javascript
class AlarmActionBuilder()
```

Defines the builder to execute alarm actions


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is configuration about Opengate North API.
- `action` _string_  - This action can be ATTEND or CLOSE


---

##### addAlarmId


```javascript
function addAlarmId(alarmId: string) -> 'AlarmActionBuilder'
```

Add alarmId to operation

**Arguments**:

- `alarmId` _string_  - AlarmId of Alarm

**Returns**:


- _`AlarmActionBuilder`_ 


**Example**:

~~~javascript
ogapi.alarms.builderFactory.newAlarmCloseBuilder().addAlarmId("")
~~~

---

##### build


```javascript
function build() -> 'Operation'
```

Build a instance of Operation 


**Returns**:


- _`Operation`_ 


**Example**:

~~~javascript
ogapi.operations.builderFactory.newAlarmCloseBuilder().build()
~~~

---

##### withNotes


```javascript
function withNotes(notes: string) -> 'AlarmActionBuilder'
```

Add notes to operation

**Arguments**:

- `notes` _string_  - Notes about operation

**Returns**:


- _`AlarmActionBuilder`_ 


**Example**:

~~~javascript
ogapi.operations.builderFactory.newAlarmCloseBuilder().withNotes("")
~~~

---

