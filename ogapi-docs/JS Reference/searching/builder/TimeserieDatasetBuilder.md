+++
title = "Timeserie Dataset Builder"
weight = 10
+++

TimeserieDatasetBuilder

### TimeserieDatasetBuilder Objects

```javascript
class TimeserieDatasetBuilder()
```

Defined a search over timeseries	


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `parent` _InternalOpenGateAPI_  - Instance of our InternalOpenGateAPI


---

##### addColumn


```javascript
function addColumn(name: string,aggregation: string,alias: string) -> 'TimeserieDatasetBuilder'
```

Add column that will be requested

**Arguments**:

- `name` _string_  
- `aggregation` _string_  
- `alias` _string_  

**Returns**:


- _`TimeserieDatasetBuilder`_ 


---

##### build


```javascript
function build() -> 'Search'
```

Build a instance of Search 


**Returns**:


- _`Search`_ 


**Example**:

~~~javascript
 ogapi.timeserieDatasetBuilder(organization, timeserieId).build()
~~~

---

##### columns


```javascript
function columns(columns: array) -> 'TimeserieDatasetBuilder'
```

Add columns that will be requested

**Arguments**:

- `columns` _array_  

**Returns**:


- _`TimeserieDatasetBuilder`_ 


---

##### group


```javascript
function group()
```




---

##### select


```javascript
function select(select: object) -> 'TimeserieDatasetBuilder'
```

The search request will have 

**Arguments**:

- `select` _object_  

**Returns**:


- _`TimeserieDatasetBuilder`_ 


---

##### sort


```javascript
function sort()
```




---

