+++
title = "Periodicity Update Builder"
weight = 10
+++

PeriodicityUpdateBuilder

### PeriodicityUpdateBuilder Objects

```javascript
class PeriodicityUpdateBuilder()
```




##### constructor


```javascript
function constructor()
```


**Arguments**:

- `ogapi` _*_  
- `taskId` _*_  
- `taskObj` _*_  


---

##### build


```javascript
function build() -> '*'
```



**Returns**:


- _`*`_ 


---

##### executeEach


```javascript
function executeEach(date: Date,end: number or Date) -> 'ExecuteEach'
```

The operation will execute with a period that you must define with ExecuteEachBuilder 

**Arguments**:

- `date` _Date_  - Date when operation will be executed
- `end` _number or Date_  - When periodicity ends. By repetitions or by date

**Returns**:


- _`ExecuteEach`_ 


---

##### executeEvery


```javascript
function executeEvery(date: Date,end: number or Date) -> 'ExecuteEvery'
```

The operation will execute with a period that you must define with ExecuteEveryBuilder 

**Arguments**:

- `date` _Date_  - Date when operation will be executed
- `end` _number or Date_  - When periodicity ends. By repetitions or by date

**Returns**:


- _`ExecuteEvery`_ 


---

##### task_id


```javascript
function task_id()
```




---

