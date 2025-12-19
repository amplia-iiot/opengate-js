+++
title = "By Month"
weight = 10
+++

ByMonth

### ByMonth Objects

```javascript
class ByMonth()
```




##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `parent` _BaseOperationBuilder_  - this is a operationBaseBuilder.
- `date` _Date_  - Date when operation will be executed
- `periodicityName` _string_  - Name associated to periodicity
- `months` _array_  - Months on will be execute the operation
- `end` _number or Date_  - When periodicity ends. By repetitions or by date


---

##### day


```javascript
function day(day: number) -> 'BaseOperationBuilder'
```

At this day will be executed the operation

**Arguments**:

- `day` _number_  

**Returns**:


- _`BaseOperationBuilder`_ 


---

