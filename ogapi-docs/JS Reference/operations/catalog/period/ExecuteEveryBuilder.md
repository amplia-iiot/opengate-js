+++
title = "Execute Every Builder"
weight = 10
+++

ExecuteEveryBuilder

### ExecuteEveryBuilder Objects

```javascript
class ExecuteEveryBuilder()
```

Defines the builder to configure a period of operation. By this builder you can select period by day, week, month, year.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `parent` _BaseOperationBuilder_  - this is a operationBaseBuilder.
- `date` _Date_  - Date when operation will be executed
- `periodicityName` _string_  - Name associated to periodicity


---

##### day


```javascript
function day() -> 'BaseOperationBuilder'
```

Every day at time defined will be the pattern


**Returns**:


- _`BaseOperationBuilder`_ 


---

##### month


```javascript
function month(months: array) -> 'ByMonth'
```

Each month at time and day defined will be the pattern

**Arguments**:

- `months` _array_  - months on will be execute the operation

**Returns**:


- _`ByMonth`_ 


---

##### week


```javascript
function week()
```




---

##### year


```javascript
function year()
```




---

