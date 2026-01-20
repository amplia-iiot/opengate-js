+++
title = "Operation Finder"
weight = 10
+++

OperationFinder

### OperationFinder Objects

```javascript
class OperationFinder()
```

  This class allow make get request to operation resource into Opengate North API.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - Reference to the API object.


---

##### findById


```javascript
function findById(id: string) -> 'Promise'
```

Download a specific operation by its id. This execute a GET http method

**Arguments**:

- `id` _string_  - Operation id.

**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
  ogapi.newOperationFinder().findById('xxx-xx-xxx-xxx').then().catch();
~~~

---

##### findExecutionsById


```javascript
function findExecutionsById(id: string,size: number,start: number) -> 'Promise'
```

Download a specific executions of an operation by its id. This execute a GET http method

**Arguments**:

- `id` _string_  - Operation id.
- `size` _number_  - Defined the number of elements on response
- `start` _number_ (optional) - Defined the offset on response

**Returns**:


- _`Promise`_ 


---

##### findPeriodicityById


```javascript
function findPeriodicityById(id: string) -> 'Promise'
```

Download information of peridodicitiy of a specific operation by its id. This execute a GET http method

**Arguments**:

- `id` _string_  - Operation id.

**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
  ogapi.newOperationFinder().findPeriodicityById('xxx-xx-xxx-xxx').then().catch();
~~~

---

##### findPeriodicityByPeriodicityId


```javascript
function findPeriodicityByPeriodicityId(periodicityId: string) -> 'Promise'
```

Download information of periodicitiy  by its id. This execute a GET http method

**Arguments**:

- `periodicityId` _string_  - Periodicity id.

**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
  ogapi.newOperationFinder().findPeriodicityByPeriodicityId('xxx-xx-xxx-xxx').then().catch();
~~~

---

