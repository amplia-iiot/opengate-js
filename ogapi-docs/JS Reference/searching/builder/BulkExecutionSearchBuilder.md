+++
title = "Bulk Execution Search Builder"
weight = 10
+++

BulkExecutionSearchBuilder

### BulkExecutionSearchBuilder Objects

```javascript
class BulkExecutionSearchBuilder()
```

Searching over all the created bulk process, which are already done or still in progress.	


##### constructor


```javascript
function constructor()
```


**Arguments**:

- `parent` _InternalOpenGateAPI_  - Instance of our InternalOpenGateAPI


---

##### build


```javascript
function build() -> 'WPSearch'
```

Build a instance of WPSearch 


**Returns**:


- _`WPSearch`_ 


**Example**:

~~~javascript
 ogapi.bulkExecutionSearchBuilder().build()
~~~

---

