+++
title = "North Amplia REST"
weight = 10
+++

NorthAmpliaREST

### NorthAmpliaREST Objects

```javascript
class NorthAmpliaREST()
```

This is a wrapper of a Rest api javascript


##### constructor


```javascript
function constructor()
```

This is a constructor of a Rest api javascript

**Arguments**:

- `_options` _{ url: string,port: string,version: string,apiKey: string,JTW: string}_  - this is configuration about Opengate North API.
- `backend` _function_  - this is a backend selected to manage a request to Opengate North API.


---

##### default


```javascript
function default() -> 'object'
```

This return a default configuration object


**Returns**:


- _`object`_ 


---

##### delete


```javascript
function delete(url: string,timeout: number,headers: object,parameters: object,body: object,serviceBaseURL: string) -> 'Promise'
```

Invoke DELETE action to url specified

**Arguments**:

- `url` _string_  - url to execute DELETE
- `timeout` _number_  - timeout in milliseconds
- `headers` _object_  - headers of request
- `parameters` _object_  - parameters of request
- `body` _object_  - body of request
- `serviceBaseURL` _string_  - base of the uri petition

**Returns**:


- _`Promise`_ 


---

##### get


```javascript
function get(url: string,timeout: number,headers: object,parameters: object,asBlob: boolean,serviceBaseURL: string) -> 'Promise'
```

Invoke GET action to url specified

**Arguments**:

- `url` _string_  - url to execute GET
- `timeout` _number_  - timeout in milliseconds
- `headers` _object_  - headers of request
- `parameters` _object_  - parameters of request
- `asBlob` _boolean_  - response body as Blob
- `serviceBaseURL` _string_  - base of the uri petition

**Returns**:


- _`Promise`_ 


---

##### patch


```javascript
function patch(url: string,data: object,timeout: number,headers: object,parameters: object,serviceBaseURL: string) -> 'Promise'
```

Invoke PATCH action to url and data specified

**Arguments**:

- `url` _string_  - url to execute PATCH
- `data` _object_  - attach data to request PATCH
- `timeout` _number_  - timeout in milliseconds
- `headers` _object_  - headers of request
- `parameters` _object_  - parameters of request
- `serviceBaseURL` _string_  - base of the uri petition

**Returns**:


- _`Promise`_ 


---

##### post


```javascript
function post(url: string,data: object,timeout: number,headers: object,parameters: object,serviceBaseURL: string) -> 'Promise'
```

Invoke POST action to url and data specified

**Arguments**:

- `url` _string_  - url to execute POST
- `data` _object_  - attach data to request POST
- `timeout` _number_  - timeout in milliseconds
- `headers` _object_  - headers of request
- `parameters` _object_  - parameters of request
- `serviceBaseURL` _string_  - base of the uri petition

**Returns**:


- _`Promise`_ 


---

##### post_multipart


```javascript
function post_multipart(url: string,formData: FormData,events: object,timeout: number,headers: object,parameters: object,serviceBaseURL: string) -> 'Promise'
```

Invoke POST multipart action to url and data specified

**Arguments**:

- `url` _string_  - url to execute POST
- `formData` _FormData_  - attach data to request POST
- `events` _object_  - events allowed, xhr.process
- `timeout` _number_  - timeout in milliseconds
- `headers` _object_  - headers of request
- `parameters` _object_  - parameters of request
- `serviceBaseURL` _string_  - base of the uri petition

**Returns**:


- _`Promise`_ 


---

##### put


```javascript
function put(url: string,data: object,timeout: number,headers: object,parameters: object,serviceBaseURL: string) -> 'Promise'
```

Invoke PUT action to url and data specified

**Arguments**:

- `url` _string_  - url to execute PUT
- `data` _object_  - attach data to request PUT
- `timeout` _number_  - timeout in milliseconds
- `headers` _object_  - headers of request
- `parameters` _object_  - parameters of request
- `serviceBaseURL` _string_  - base of the uri petition

**Returns**:


- _`Promise`_ 


---

##### put_multipart


```javascript
function put_multipart(url: string,formData: FormData,events: object,timeout: number,headers: object,parameters: object,serviceBaseURL: string) -> 'Promise'
```

Invoke put multipart action to url and data specified

**Arguments**:

- `url` _string_  - url to execute POST
- `formData` _FormData_  - attach data to request POST
- `events` _object_  - events allowed, xhr.process
- `timeout` _number_  - timeout in milliseconds
- `headers` _object_  - headers of request
- `parameters` _object_  - parameters of request
- `serviceBaseURL` _string_  - base of the uri petition

**Returns**:


- _`Promise`_ 


---

