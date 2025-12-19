+++
title = "Basic Types Search Builder"
weight = 10
+++

BasicTypesSearchBuilder

### BasicTypesSearchBuilder Objects

```javascript
class BasicTypesSearchBuilder()
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
- `timeout` _number_ (optional) - timeout on request


---

##### build


```javascript
function build() -> '*'
```



**Returns**:


- _`*`_ 


---

##### execute


```javascript
function execute() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises


**Returns**:


- _`Promise`_ 


---

##### path


```javascript
function path()
```




---

##### publicParameters


```javascript
function publicParameters()
```




---

##### publicParameters


```javascript
function publicParameters()
```




---

##### withPath


```javascript
function withPath(path: string) -> 'BasicTypesSearchBuilder'
```

Sets path to search

**Arguments**:

- `path` _string_  - jsonSchemaPath

**Returns**:


- _`BasicTypesSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.basicTypesSearchBuilder().withPath('string').build()
~~~

---

##### withPublicParameters


```javascript
function withPublicParameters(publicParameters: boolean) -> 'BasicTypesSearchBuilder'
```

Sets publicParameters to search

**Arguments**:

- `publicParameters` _boolean_  - boolean

**Returns**:


- _`BasicTypesSearchBuilder`_ 


**Example**:

~~~javascript
 ogapi.basicTypesSearchBuilder().withPublicParameters(true).build()
~~~

---

