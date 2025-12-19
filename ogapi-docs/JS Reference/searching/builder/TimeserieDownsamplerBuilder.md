+++
title = "Timeserie Downsampler Builder"
weight = 10
+++

TimeserieDownsamplerBuilder

### TimeserieDownsamplerBuilder Objects

```javascript
class TimeserieDownsamplerBuilder()
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
function addColumn(name: string,interpolation: string,aggregation: string,alias: string) -> 'TimeserieDownsamplerBuilder'
```

Add column that will be requested

**Arguments**:

- `name` _string_  
- `interpolation` _string_  
- `aggregation` _string_  
- `alias` _string_  

**Returns**:


- _`TimeserieDownsamplerBuilder`_ 


---

##### bucketTime


```javascript
function bucketTime(bucketTime: number) -> 'TimeserieDownsamplerBuilder'
```

The bucket for the downsampling (must be higher than the time series bucket)

**Arguments**:

- `bucketTime` _number_  

**Returns**:


- _`TimeserieDownsamplerBuilder`_ 


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
 ogapi.timeserieDownsamplerBuilder(organization, timeserieId).build()
~~~

---

##### columns


```javascript
function columns(columns: array) -> 'TimeserieDownsamplerBuilder'
```

Add columns that will be requested

**Arguments**:

- `columns` _array_  

**Returns**:


- _`TimeserieDownsamplerBuilder`_ 


---

##### filter


```javascript
function filter()
```




---

##### findFields


```javascript
function findFields()
```




---

##### select


```javascript
function select(select: object) -> 'TimeserieDownsamplerBuilder'
```

The search request will have this select 

**Arguments**:

- `select` _object_  

**Returns**:


- _`TimeserieDownsamplerBuilder`_ 


---

##### sort


```javascript
function sort()
```




---

##### start


```javascript
function start(start: string) -> 'TimeserieDownsamplerBuilder'
```

The start time for the downsampling

**Arguments**:

- `start` _string_  

**Returns**:


- _`TimeserieDownsamplerBuilder`_ 


---

