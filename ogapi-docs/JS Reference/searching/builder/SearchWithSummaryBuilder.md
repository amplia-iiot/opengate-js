+++
title = "Search With Summary Builder"
weight = 10
+++

SearchWithSummaryBuilder

### SearchWithSummaryBuilder Objects

```javascript
class SearchWithSummaryBuilder()
```

This is a abstract class. It is a class that extends from base to make all kind of summary search request to OpenGate North API.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `parent` _InternalOpenGateAPI_  - this is ogapi instance
- `routes` _object_  - this defined the routes. One of those routes must be called on Builder before call build method.


---

##### summary


```javascript
function summary() -> 'SearchWithSummaryBuilder'
```

The response will only have a summary information 


**Returns**:


- _`SearchWithSummaryBuilder`_ 


**Example**:

~~~javascript
ogapi.subscriptionsSearchBuilder().summary() 
~~~

---

