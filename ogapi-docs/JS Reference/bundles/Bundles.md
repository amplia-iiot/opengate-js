+++
title = "Bundles"
weight = 10
+++

Bundles

### Bundles Objects

```javascript
class Bundles()
```

This is a base object that contains all you can do about Bundles.


##### constructor


```javascript
function constructor()
```

Constructor

**Arguments**:

- `Reference` _InternalOpenGateAPI_  - to the API object.


---

##### activate


```javascript
function activate() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function activates a bundle


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
 ogapi.bundlesBuilder().activate()
~~~

---

##### addDeploymentElement


```javascript
function addDeploymentElement(progressEvent: *) -> 'DeploymentElement'
```

Create deployment element that is asociated to the Bundle

**Arguments**:

- `progressEvent` _*_  

**Returns**:


- _`DeploymentElement`_ 


**Example**:

~~~javascript
 ogapi.bundlesBuilder().newDeploymentElement()
~~~

---

##### create


```javascript
function create() -> 'Promise'
```

Creates a new bundle


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
 ogapi.bundlesBuilder().create()
~~~

---

##### deactivate


```javascript
function deactivate() -> 'Promise'
```

This invoke a request to OpenGate North API and the callback is managed by promises
This function deactivates a bundle


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
 ogapi.bundlesBuilder().deactivate()
~~~

---

##### deployAndActivate


```javascript
function deployAndActivate() -> 'DeploymentElement'
```

Deploy all elements of a bundle in only one method


**Returns**:


- _`DeploymentElement`_ 


**Example**:

~~~javascript
 ogapi.bundlesBuilder().deployAndActivate()
~~~

---

##### update


```javascript
function update() -> 'Promise'
```

Updates a bundle


**Returns**:


- _`Promise`_ 


**Example**:

~~~javascript
 ogapi.bundlesBuilder().update()
~~~

---

##### withActive


```javascript
function withActive(active: string) -> 'Bundles'
```

Set the active attribute

**Arguments**:

- `active` _string_  

**Returns**:


- _`Bundles`_ 


---

##### withDescription


```javascript
function withDescription(description: string) -> 'Bundles'
```

Set the description attribute

**Arguments**:

- `description` _string_  

**Returns**:


- _`Bundles`_ 


---

##### withHardware


```javascript
function withHardware(hardware: string) -> 'Bundles'
```

Set the hardware attribute

**Arguments**:

- `hardware` _string_  

**Returns**:


- _`Bundles`_ 


---

##### withName


```javascript
function withName(name: string) -> 'Bundles'
```

Set the name attribute

**Arguments**:

- `name` _string_  - required field

**Returns**:


- _`Bundles`_ 


---

##### withPostaction


```javascript
function withPostaction(postactions: string) -> 'Bundles'
```

Set the postactions attribute

**Arguments**:

- `postactions` _string_  

**Returns**:


- _`Bundles`_ 


---

##### withPreaction


```javascript
function withPreaction(preaction: string) -> 'Bundles'
```

Set the preaction attribute

**Arguments**:

- `preaction` _string_  

**Returns**:


- _`Bundles`_ 


---

##### withTimeout


```javascript
function withTimeout(ms: number) -> 'Bundles'
```

The request will have a specific time out if it will be exceeded then the promise throw an exception

**Arguments**:

- `ms` _number_  - timeout in milliseconds

**Returns**:


- _`Bundles`_ 


---

##### withUserNotes


```javascript
function withUserNotes(userNotes: string) -> 'Bundles'
```

Set the userNotes attribute

**Arguments**:

- `userNotes` _string_  

**Returns**:


- _`Bundles`_ 


---

##### withVersion


```javascript
function withVersion(version: string) -> 'Bundles'
```

Set the version attribute

**Arguments**:

- `version` _string_  

**Returns**:


- _`Bundles`_ 


---

##### withWorkgroup


```javascript
function withWorkgroup(workgroup: string) -> 'Bundles'
```

Set the workgroup attribute

**Arguments**:

- `workgroup` _string_  

**Returns**:


- _`Bundles`_ 


---

