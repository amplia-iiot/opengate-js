+++
title = "By Year"
weight = 10
+++

ByYear

### ByYear Objects

```javascript
class ByYear()
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

##### month


```javascript
function month(month: string) -> 'BaseOperationBuilder,ByYear'
```

At this month will be executed the operation

**Arguments**:

- `month` _string_  

**Returns**:


- _`BaseOperationBuilder,ByYear`_ 


---

