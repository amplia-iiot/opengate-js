+++
title = "Base Search"
weight = 10
+++

BaseSearch

### BaseSearch Objects

```javascript
class BaseSearch()
```

This is a abstract class, it must be extended to another class that defined the specific search.
This class is responsible to manage execute request to OpenGate North API


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is ogapi instance
- `resource` _string_  - this is a base url resource
- `timeout` _number_ (optional) - timeout on request
- `serviceBaseURL` _string_  - base of the uri petition


---

##### cancel


```javascript
function cancel()
```




---

##### cancel


```javascript
function cancel()
```




---

##### cancelAsyncPaging


```javascript
function cancelAsyncPaging()
```


**Arguments**:

- `message` _*_  


---

##### downloadCsv


```javascript
function downloadCsv() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises


**Returns**:


- _`Promise`_ - Promise with data with format csv


---

##### execute


```javascript
function execute() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises


**Returns**:


- _`Promise`_ 


---

##### executeWithAsyncPaging


```javascript
function executeWithAsyncPaging(resource: string) -> 'Promise'
```

This invokes a request for asynchronous paging to the OpenGate North API and the return of the pages is managed by promises and its notify object
To cancel the process in the notify method return false or string with custom message for response
In case of canceling the process, the response will be 403: Forbidden -&gt; {data: &#x27;Cancel process&#x27;|| custom_message, statusCode: 403}

**Arguments**:

- `resource` _string_  - resource to find.

**Returns**:


- _`Promise`_ 


---

