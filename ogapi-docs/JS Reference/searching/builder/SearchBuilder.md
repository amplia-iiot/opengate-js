+++
title = "Search Builder"
weight = 10
+++

SearchBuilder

### SearchBuilder Objects

```javascript
class SearchBuilder()
```

This is a abstract class. It is a base to make all kind of search request to OpenGate North API.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `parent` _InternalOpenGateAPI_  - this is ogapi instance
- `routes` _object_  - this defined the routes. One of those routes must be called on Builder before call build method.


---

##### [route]


```javascript
function [route]()
```




---

##### addSortAscendingBy


```javascript
function addSortAscendingBy(filterField: string) -> 'SearchBuilder'
```

Add ascending param into the sort search object

**Arguments**:

- `filterField` _string_  - This field must be allowed into the specific resource

**Returns**:


- _`SearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.subscriptionsSearchBuilder().addSortAscendingBy('prov.customid') // Order by prov.customid Ascending  
~~~

---

##### addSortBy


```javascript
function addSortBy(filterField: string,typeSort: string) -> 'SearchBuilder'
```

Add ascending/descending param into the sort search object 

**Arguments**:

- `filterField` _string_  - This field must be allowed into the specific resource
- `typeSort` _string_  

**Returns**:


- _`SearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.subscriptionsSearchBuilder().addSortBy('prov.customid','ASCENDING') // Order by prov.customid Ascending
 ogapi.devicesSearchBuilder().addSortBy('prov.customid','DESCENDING') // Order by prov.customid Descending 
~~~

---

##### addSortDescendingBy


```javascript
function addSortDescendingBy(filterField: string) -> 'SearchBuilder'
```

Add descending param into the sort search object 

**Arguments**:

- `filterField` _string_  - This field must be allowed into the specific resource

**Returns**:


- _`SearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.devicesSearchBuilder().addSortDescendingBy('prov.customid') // Order by prov.customid Descending
~~~

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
 ogapi.devicesSearchBuilder().onProvisioned().build()
~~~

---

##### filter


```javascript
function filter(filter: FilterBuilder,object) -> 'SearchBuilder'
```

The search request will have this filter 

**Arguments**:

- `filter` _FilterBuilder,object_  

**Returns**:


- _`SearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.subscriptionsSearchBuilder().filter(
     ogapi.newFilterBuilder().and(Ex.like('prov.customid', 'SN32'), Ex.neq('entityId', '1124'))
 ) // Setting FilterBuilder
 ogapi.subscriptionsSearchBuilder().filter(
      {"and": [{"like": {"entityId": "0000000000000001"}}]}
 ) // Custom filter
~~~

---

##### findAllFields


```javascript
function findAllFields(input: *) -> 'Promise'
```

Return a promise which it will contains an array with fields recommended with complete structure

**Arguments**:

- `input` _*_  

**Returns**:


- _`Promise`_ 


---

##### findFieldPath


```javascript
function findFieldPath(field: *) -> 'Promise'
```

Return a promise which it will contains an string with the path of a field

**Arguments**:

- `field` _*_  

**Returns**:


- _`Promise`_ 


---

##### findFields


```javascript
function findFields(input: *) -> 'Promise'
```

Return a promise which it will contains an array with fields recommended with only identifier

**Arguments**:

- `input` _*_  

**Returns**:


- _`Promise`_ 


---

##### limit


```javascript
function limit(size: number,start: number) -> 'SearchBuilder'
```

Set reponse pagination.

**Arguments**:

- `size` _number_  - Defined the number of elements on response
- `start` _number_ (optional) - Defined the offset on response

**Returns**:


- _`SearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.subscribersSearchBuilder().limit(10) // Without offset
 ogapi.subscribersSearchBuilder().limit(25,50) //With offset value 50
~~~

---

##### removeSortBy


```javascript
function removeSortBy(filterField: string) -> 'SearchBuilder'
```

Remove sort param from the search object 

**Arguments**:

- `filterField` _string_  - This field must be allowed into the specific resource

**Returns**:


- _`SearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.subscriptionsSearchBuilder().removeSortBy('prov.customid') // Remove order by prov.customid
 ogapi.subscriptionsSearchBuilder().removeSortBy() // Remove all order by parameters
~~~

---

##### withTimeout


```javascript
function withTimeout(ms: number) -> 'SearchBuilder'
```

The request will have a specific time out if it will be exceeded then the promise throw an exception

**Arguments**:

- `ms` _number_  - timeout in milliseconds

**Returns**:


- _`SearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.subscriptionsSearchBuilder().withTimeout(2000) 
~~~

---

