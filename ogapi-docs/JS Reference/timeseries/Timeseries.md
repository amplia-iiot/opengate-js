+++
title = "Timeseries"
weight = 10
+++

Timeseries

### Timeseries Objects

```javascript
class Timeseries()
```

This is a base object that contains all you can do about Timeseries.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `Reference` _InternalOpenGateAPI_  - to the API object.


---

##### onlyPlan


```javascript
function onlyPlan() -> '*'
```



**Returns**:


- _`*`_ 


---

##### withBucketColumn


```javascript
function withBucketColumn(bucketColumn: string) -> 'Timeseries'
```

Name of generated column with bucket date.Required if timeBucket &gt; 0.

**Arguments**:

- `bucketColumn` _string_  - pattern: ^[a-zA-Z0-9 _-]*$

**Returns**:


- _`Timeseries`_ 


---

##### withBucketInitColumn


```javascript
function withBucketInitColumn(bucketInitColumn: string) -> 'Timeseries'
```

Name of generated column with bucket init date.

**Arguments**:

- `bucketInitColumn` _string_  - pattern: ^[a-zA-Z0-9 _-]*$

**Returns**:


- _`Timeseries`_ 


---

##### withColumns


```javascript
function withColumns(columns: array) -> 'Timeseries'
```

List of data that is needed for each entity.

**Arguments**:

- `columns` _array_  - required field

**Returns**:


- _`Timeseries`_ 


---

##### withContext


```javascript
function withContext(context: array) -> 'Timeseries'
```

List of data that is needed for each entity.

**Arguments**:

- `context` _array_  

**Returns**:


- _`Timeseries`_ 


---

##### withDescription


```javascript
function withDescription(description: string) -> 'Timeseries'
```

Long text to explain timeserie definition

**Arguments**:

- `description` _string_  

**Returns**:


- _`Timeseries`_ 


---

##### withIdentifier


```javascript
function withIdentifier(identifier: string) -> 'Timeseries'
```

Set the identifier attribute

**Arguments**:

- `identifier` _string_  - required field

**Returns**:


- _`Timeseries`_ 


---

##### withIdentifierColumn


```javascript
function withIdentifierColumn(identifierColumn: string) -> 'Datasets'
```

Set the identifierColumn attribute

**Arguments**:

- `identifierColumn` _string_  - required field

**Returns**:


- _`Datasets`_ 


---

##### withName


```javascript
function withName(name: string) -> 'Timeseries'
```

Name which will be unique in each organization

**Arguments**:

- `name` _string_  - required field

**Returns**:


- _`Timeseries`_ 


---

##### withOrganization


```javascript
function withOrganization(organization: string) -> 'Timeseries'
```

Set the organization attribute

**Arguments**:

- `organization` _string_  - required field

**Returns**:


- _`Timeseries`_ 


---

##### withOrigin


```javascript
function withOrigin(origin: string) -> 'Timeseries'
```

Initial date to first bucket with ISO date time format. Next bucket will be calcullated from this date. Default value is created date with time equals 00:00:00.000Z

**Arguments**:

- `origin` _string_  

**Returns**:


- _`Timeseries`_ 


---

##### withRetention


```javascript
function withRetention(retention: number) -> 'Timeseries'
```

Time that a row is stored to be got in searching.  Default value is 1 month

**Arguments**:

- `retention` _number_  

**Returns**:


- _`Timeseries`_ 


---

##### withTimeBucket


```javascript
function withTimeBucket(timeBucket: integer) -> 'Timeseries'
```

Duration of buckets in seconds.

**Arguments**:

- `timeBucket` _integer_  - required field

**Returns**:


- _`Timeseries`_ 


---

