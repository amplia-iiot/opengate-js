+++
title = "Execute Each Builder"
weight = 10
+++

ExecuteEachBuilder

### ExecuteEachBuilder Objects

```javascript
class ExecuteEachBuilder()
```

Defines the builder to configure a period of operation. With this builder you can select how repeat the operation. By days, hours or minutes.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `parent` _BaseOperationBuilder_  - this is a operationBaseBuilder.
- `date` _Date_  - Date when operation will be executed
- `periodicityName` _string_  - Name associated to periodicity
- `end` _number or Date_  - When periodicity ends. By repetitions or by date


---

##### days


```javascript
function days(days: number) -> 'BaseOperationBuilder'
```

Set a difference of days in each repetition

**Arguments**:

- `days` _number_  

**Returns**:


- _`BaseOperationBuilder`_ 


---

##### hours


```javascript
function hours(hours: number) -> 'BaseOperationBuilder'
```

Set a difference of hours in each repetition

**Arguments**:

- `hours` _number_  

**Returns**:


- _`BaseOperationBuilder`_ 


---

##### minutes


```javascript
function minutes(minutes: number) -> 'BaseOperationBuilder'
```

Set a difference of minutes in each repetition

**Arguments**:

- `minutes` _number_  

**Returns**:


- _`BaseOperationBuilder`_ 


---

