+++
title = "Base Provision"
weight = 10
+++

BaseProvision

### BaseProvision Objects

```javascript
class BaseProvision()
```

This is an abstract class, it must be extended to another class that defines the different actions of a specific provision.
This class is responsible for managing the request to execute Norte OpenGate API


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `ogapi` _InternalOpenGateAPI_  - this is ogapi instance
- `resource` _string_  - this is a base url resource
- `timeout` _number_ (optional) - timeout on request
- `requiredParameters` _array_  
- `serviceBaseURL` _string_  - base of the uri petition


---

##### create


```javascript
function create() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function create a entity of provision


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
 ogapi.organizationsBuilder().create()
~~~

---

##### delete


```javascript
function delete(body: *) -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function deletes a entity of provision

**Arguments**:

- `body` _*_  

**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
ogapi.organizationsBuilder().withName('delete_organization').delete();
ogapi.usersBuilder().withEmail('delete@user.com').delete();
ogapi.certificatesBuilder().withId('d3l3t3-c3rt1f1c4t3').delete();
~~~

---

##### update


```javascript
function update() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function updates a entity of provision


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
 ogapi.organizationsBuilder().update()
~~~

---

